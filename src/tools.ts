import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { AuthError, oauthChallenge, requireScopes } from './auth.js';
import type { AppConfig } from './config.js';
import {
  AssistanceEnvelopeSchema,
  publicStatuses,
  type AuthContext,
  type GatewayResponse,
} from './contracts.js';
import type { SghGateway } from './gateway.js';
import { GatewayError } from './gateway.js';
import { makeEnvelope } from './status.js';

const envelopeOutput = {
  request_id: z.string(),
  status: z.enum(publicStatuses),
  is_final: z.boolean(),
  requires_user_action: z.boolean(),
  display_message: z.string(),
  next_action: z
    .object({
      type: z.enum([
        'PROVIDE_INFORMATION',
        'CONFIRM_REQUEST',
        'WAIT',
        'VIEW_RESULT',
        'CONTACT_SUPPORT',
        'REVIEW_QUOTE',
        'COMPLETE_PAYMENT',
        'CONTACT_SALES',
        'NONE',
      ]),
      description: z.string(),
    })
    .nullable(),
  updated_at: z.string(),
  commercial: z
    .object({
      service_execution: z.literal('paid'),
      repository_access: z.string().optional(),
      free_call_credits_included: z.literal(0),
      execution_eligible: z.boolean(),
      funding_status: z.string(),
      funding_source: z.string().nullable().optional(),
      requires_quote: z.boolean().optional(),
    })
    .optional(),
  action_blocked: z.boolean().optional(),
  error_code: z.string().optional(),
};

const idempotencyKey = z
  .string()
  .regex(/^[A-Za-z0-9:_-]{8,160}$/)
  .describe('Stable key reused only when retrying this exact action.');

type ToolContext = {
  config: AppConfig;
  gateway: SghGateway;
  auth: AuthContext | null;
};

type ToolResult = {
  content: Array<{ type: 'text'; text: string }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

function success(data: Record<string, unknown>): ToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    structuredContent: data,
  };
}

function normalizeGatewayResponse(value: GatewayResponse): Record<string, unknown> {
  const parsed = AssistanceEnvelopeSchema.safeParse(value);
  if (!parsed.success) {
    throw new GatewayError(
      'SGH Service returned an invalid assistance status contract.',
      502,
      'INVALID_STATUS_CONTRACT',
      parsed.error.flatten()
    );
  }
  return value;
}

function normalizePaidExecutionResponse(value: GatewayResponse): Record<string, unknown> {
  const normalized = normalizeGatewayResponse(value);
  if (
    ['QUEUED', 'CALLING', 'WAITING_FOR_BUSINESS', 'HUMAN_REVIEW'].includes(
      String(normalized.status)
    )
  ) {
    const commercial = normalized.commercial;
    if (
      !commercial ||
      typeof commercial !== 'object' ||
      (commercial as Record<string, unknown>).execution_eligible !== true ||
      (commercial as Record<string, unknown>).free_call_credits_included !== 0
    ) {
      throw new GatewayError(
        'SGH Service did not prove paid entitlement; no execution result was accepted.',
        502,
        'INVALID_COMMERCIAL_CONTRACT'
      );
    }
  }
  return normalized;
}

function failure(error: unknown, context: ToolContext): ToolResult {
  if (error instanceof AuthError) {
    const challenge = oauthChallenge(context.config, error);
    return {
      content: [{ type: 'text', text: error.message }],
      isError: true,
      _meta: { 'mcp/www_authenticate': [challenge] },
    };
  }
  if (error instanceof GatewayError) {
    return {
      content: [{ type: 'text', text: `${error.code}: ${error.message}` }],
      structuredContent: {
        ...makeEnvelope({
          requestId: 'unavailable',
          internalStatus: error.status >= 500 ? 'FAILED' : 'HUMAN_REVIEW',
          message: error.message,
          requiresUserAction: error.status < 500,
        }),
        error_code: error.code,
      },
      isError: true,
    };
  }
  return {
    content: [{ type: 'text', text: 'SGH MCP tool failed safely. No call was placed.' }],
    structuredContent: {
      ...makeEnvelope({
        requestId: 'unavailable',
        internalStatus: 'FAILED',
        message: 'SGH MCP tool failed safely. No call was placed.',
      }),
      error_code: 'INTERNAL_ERROR',
    },
    isError: true,
  };
}

async function run(
  context: ToolContext,
  handler: () => Promise<Record<string, unknown>>
): Promise<ToolResult> {
  try {
    return success(await handler());
  } catch (error) {
    return failure(error, context);
  }
}

const publicSecurity = [{ type: 'noauth' }];
const readSecurity = [{ type: 'oauth2', scopes: ['requests:read'] }];
const writeSecurity = [{ type: 'oauth2', scopes: ['requests:write'] }];
const passSecurity = [{ type: 'oauth2', scopes: ['passes:redeem'] }];

export function createSghMcpServer(context: ToolContext): McpServer {
  const server = new McpServer(
    {
      name: 'sgh-japan-assistant',
      version: '0.1.0',
    },
    {
      instructions:
        'The public repository includes zero SGH call or human-service credits. A draft never places a call. Only confirm_assistance_request may queue execution after verified paid entitlement and explicit user confirmation. QUEUED or CALLING never means a reservation is confirmed. Never invent availability or results. Keep personal data minimal and do not accept medical records, card data, passwords, passport data, or emergency requests.',
    }
  );

  server.registerTool(
    'get_sgh_capabilities',
    {
      title: 'Get SGH capabilities',
      description: 'Return supported Japan phone tasks, languages, service area, availability, estimated pricing policy, and exclusions. This does not create a request.',
      inputSchema: {},
      outputSchema: {
        ...envelopeOutput,
        capabilities: z.record(z.string(), z.unknown()),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: publicSecurity },
    },
    async () =>
      run(context, async () => ({
        ...makeEnvelope({
          requestId: 'capabilities',
          internalStatus: 'SUCCEEDED',
          message: 'SGHの対応範囲を取得しました。電話や予約は実行されていません。',
        }),
        capabilities: await context.gateway.capabilities(),
      }))
  );

  server.registerTool(
    'check_task_supported',
    {
      title: 'Check task support',
      description: 'Check whether SGH may handle a proposed non-emergency Japan phone task and identify missing information. This does not create a request or place a call.',
      inputSchema: {
        task_type: z.enum(['PHONE_INQUIRY', 'RESERVATION', 'RESCHEDULE', 'CANCELLATION']),
        target_name: z.string().min(1).max(300),
        target_location: z.string().max(300).optional(),
        goal: z.string().min(3).max(2_000),
      },
      outputSchema: {
        ...envelopeOutput,
        support: z.record(z.string(), z.unknown()),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: publicSecurity },
    },
    async (input) =>
      run(context, async () => ({
        ...makeEnvelope({
          requestId: `check_${randomUUID()}`,
          internalStatus: 'SUCCEEDED',
          message: '対応可否を確認しました。依頼や電話はまだ作成されていません。',
        }),
        support: await context.gateway.checkTaskSupported(input),
      }))
  );

  server.registerTool(
    'create_assistance_draft',
    {
      title: 'Create assistance draft',
      description: 'Idempotently create a reviewable SGH phone-assistance draft. This tool must never place a call or grant service credit. The result shows target, phone, goal, approved personal data, missing data, fee, commercial status, and requires_confirmation=true.',
      inputSchema: {
        task_type: z.enum(['PHONE_INQUIRY', 'RESERVATION', 'RESCHEDULE', 'CANCELLATION']),
        target: z.object({
          name: z.string().min(1).max(300),
          phone: z.string().min(8).max(80),
          location: z.string().max(300).optional(),
          url: z.string().url().max(500).optional(),
        }),
        goal: z.string().min(3).max(2_000),
        preferred_timing: z.string().max(300).optional(),
        deadline: z.string().max(120).optional(),
        result_language: z.enum(['ja', 'zh-TW', 'en']),
        approved_personal_data: z.record(z.string(), z.string().max(500)).default({}),
        constraints: z.array(z.string().max(500)).max(20).optional(),
        idempotency_key: idempotencyKey,
      },
      outputSchema: {
        ...envelopeOutput,
        target: z.record(z.string(), z.unknown()),
        goal: z.string(),
        approved_personal_data: z.record(z.string(), z.string()),
        missing_fields: z.array(z.string()),
        fee: z.record(z.string(), z.unknown()),
        requires_confirmation: z.literal(true),
        contract_version: z.number().int().positive(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: writeSecurity },
    },
    async ({ idempotency_key, ...input }) =>
      run(context, async () =>
        normalizeGatewayResponse(
          await context.gateway.createDraft(
            requireScopes(context.auth, ['requests:write']),
            input,
            idempotency_key
          )
        )
      )
  );

  server.registerTool(
    'confirm_assistance_request',
    {
      title: 'Confirm and queue assistance',
      description: 'After SGH verifies a paid contract, prepaid credit, or issuer-funded service-scoped Pass and the user explicitly approves the exact target, goal, personal data, timing, and fee, atomically reserve entitlement and queue execution. Without entitlement, create no side effect.',
      inputSchema: {
        request_id: z.string().min(1).max(160),
        contract_version: z.number().int().positive(),
        idempotency_key: idempotencyKey,
        explicit_confirmation: z.literal(true),
      },
      outputSchema: envelopeOutput,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
      _meta: { securitySchemes: writeSecurity },
    },
    async ({ request_id, contract_version, idempotency_key }) =>
      run(context, async () =>
        normalizePaidExecutionResponse(
          await context.gateway.confirm(
            requireScopes(context.auth, ['requests:write']),
            request_id,
            contract_version,
            idempotency_key
          )
        )
      )
  );

  server.registerTool(
    'get_assistance_status',
    {
      title: 'Get assistance status',
      description: 'Get the current authoritative status. Never infer confirmation from a queued or calling state.',
      inputSchema: { request_id: z.string().min(1).max(160) },
      outputSchema: envelopeOutput,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: readSecurity },
    },
    async ({ request_id }) =>
      run(context, async () =>
        normalizeGatewayResponse(
          await context.gateway.status(
            requireScopes(context.auth, ['requests:read']),
            request_id
          )
        )
      )
  );

  server.registerTool(
    'get_assistance_result',
    {
      title: 'Get assistance result',
      description: 'Return the verified call summary, reservation outcome, evidence quality, and next step. If no final result exists, return the current non-final status without guessing.',
      inputSchema: { request_id: z.string().min(1).max(160) },
      outputSchema: {
        ...envelopeOutput,
        result: z.record(z.string(), z.unknown()).nullable(),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: readSecurity },
    },
    async ({ request_id }) =>
      run(context, async () =>
        normalizeGatewayResponse(
          await context.gateway.result(
            requireScopes(context.auth, ['requests:read']),
            request_id
          )
        )
      )
  );

  server.registerTool(
    'cancel_assistance_request',
    {
      title: 'Cancel unexecuted assistance',
      description: 'Cancel a request only while it is still cancellable. This does not cancel a reservation already made with a business.',
      inputSchema: {
        request_id: z.string().min(1).max(160),
        idempotency_key: idempotencyKey,
        explicit_confirmation: z.literal(true),
      },
      outputSchema: envelopeOutput,
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: writeSecurity },
    },
    async ({ request_id, idempotency_key }) =>
      run(context, async () =>
        normalizeGatewayResponse(
          await context.gateway.cancel(
            requireScopes(context.auth, ['requests:write']),
            request_id,
            idempotency_key
          )
        )
      )
  );

  server.registerTool(
    'handoff_to_human',
    {
      title: 'Handoff to SGH staff',
      description: 'Request paid SGH staff handling. Public v1 must keep this blocked until service-scoped human entitlement is verified and human credit can be reserved atomically.',
      inputSchema: {
        request_id: z.string().min(1).max(160),
        reason: z.string().min(3).max(1_000),
        idempotency_key: idempotencyKey,
        explicit_confirmation: z.literal(true),
      },
      outputSchema: envelopeOutput,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
      _meta: { securitySchemes: writeSecurity },
    },
    async ({ request_id, reason, idempotency_key }) =>
      run(context, async () =>
        normalizePaidExecutionResponse(
          await context.gateway.handoff(
            requireScopes(context.auth, ['requests:write']),
            request_id,
            reason,
            idempotency_key
          )
        )
      )
  );

  server.registerTool(
    'redeem_sgh_pass',
    {
      title: 'Redeem SGH Pass',
      description: 'Atomically redeem a one-time or limited-use SGH Pass. A Pass must be issuer-funded and restricted by tenant, service scope, validity and allowance; discovery-only Passes never authorize SGH Phone or human handling.',
      inputSchema: {
        token: z.string().min(24).max(512),
        idempotency_key: idempotencyKey,
        explicit_confirmation: z.literal(true),
      },
      outputSchema: envelopeOutput,
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: { securitySchemes: passSecurity },
    },
    async ({ token, idempotency_key }) =>
      run(context, async () =>
        normalizeGatewayResponse(
          await context.gateway.redeemPass(
            requireScopes(context.auth, ['passes:redeem']),
            token,
            idempotency_key
          )
        )
      )
  );

  return server;
}
