import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import type { AppConfig } from '../src/config.js';
import type { SghGateway } from '../src/gateway.js';
import { createApp } from '../src/server.js';

const config: AppConfig = {
  nodeEnv: 'test',
  port: 3000,
  publicUrl: 'https://mcp.example.test',
  oauthIssuer: 'https://auth.example.test',
  oauthAudience: 'https://mcp.example.test',
  oauthJwksUrl: 'https://auth.example.test/jwks',
  serviceApiBaseUrl: 'https://service.example.test/api/service/mcp',
  serviceInternalApiKey: 'test-internal-secret-key',
  allowedOrigins: ['https://chatgpt.com'],
};

const gateway: SghGateway = {
  createDraft: vi.fn(),
  confirm: vi.fn(),
  status: vi.fn(),
  result: vi.fn(),
  cancel: vi.fn(),
  handoff: vi.fn(),
  redeemPass: vi.fn(),
};

describe('MCP HTTP server', () => {
  const app = createApp({
    config,
    gateway,
    tokenVerifier: async () => ({
      subject: 'user-1',
      issuer: config.oauthIssuer,
      scopes: new Set(['profile', 'requests:read', 'requests:write', 'passes:redeem']),
    }),
  });

  it('publishes RFC 9728 protected resource metadata', async () => {
    const response = await request(app).get('/.well-known/oauth-protected-resource');
    expect(response.status).toBe(200);
    expect(response.body.resource).toBe(config.publicUrl);
    expect(response.body.authorization_servers).toEqual([config.oauthIssuer]);
    expect(response.body.scopes_supported).toContain('requests:write');
  });

  it('rejects an untrusted browser origin', async () => {
    const response = await request(app)
      .post('/mcp')
      .set('Origin', 'https://evil.example')
      .send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
    expect(response.status).toBe(403);
  });

  it('initializes over Streamable HTTP JSON', async () => {
    const response = await request(app)
      .post('/mcp')
      .set('Origin', 'https://chatgpt.com')
      .set('Accept', 'application/json, text/event-stream')
      .send({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-11-25',
          capabilities: {},
          clientInfo: { name: 'test-client', version: '1.0.0' },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.result.serverInfo.name).toBe('sgh-japan-assistant');
    expect(response.body.result.serverInfo.version).toBe('0.4.0');
    expect(response.body.result.capabilities.tools).toBeDefined();
    expect(response.body.result.instructions).toContain(
      'paid phone and ordinary-reservation execution module'
    );
    expect(response.body.result.instructions).toContain('cannot send LINE messages');
  });

  it('calls a public tool and returns the universal envelope', async () => {
    const response = await request(app)
      .post('/mcp')
      .set('Accept', 'application/json, text/event-stream')
      .send({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: { name: 'get_sgh_capabilities', arguments: {} },
      });
    expect(response.status).toBe(200);
    expect(response.body.result.structuredContent).toMatchObject({
      request_id: 'capabilities',
      status: 'COMPLETED',
      is_final: true,
      capabilities: {
        full_sgh_service_catalog: false,
        public_query_cost: {
          sgh_call_credits_consumed: 0,
          sgh_human_credits_consumed: 0,
          external_ai_api_called: false,
          sgh_service_api_called: false,
        },
      },
    });
  });

  it('applies the no-cost local support policy without authentication', async () => {
    const response = await request(app)
      .post('/mcp')
      .set('Accept', 'application/json, text/event-stream')
      .send({
        jsonrpc: '2.0',
        id: 6,
        method: 'tools/call',
        params: {
          name: 'check_task_supported',
          arguments: {
            task_type: 'RESERVATION',
            target_name: 'Test Restaurant',
            target_location: 'Fukuoka',
            goal: 'Check ordinary dinner availability.',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.result.structuredContent.support).toMatchObject({
      checked_without_external_service: true,
      supported: true,
      request_creation_allowed: true,
      execution_eligible: false,
      commercial_boundary: {
        free_call_credits_included: 0,
        free_human_credits_included: 0,
      },
    });
  });

  it('advertises all nine tools with explicit safety and auth metadata', async () => {
    const response = await request(app)
      .post('/mcp')
      .set('Accept', 'application/json, text/event-stream')
      .send({ jsonrpc: '2.0', id: 4, method: 'tools/list', params: {} });
    expect(response.status).toBe(200);
    expect(response.body.result.tools).toHaveLength(9);
    const confirmTool = response.body.result.tools.find(
      (tool: { name: string }) => tool.name === 'confirm_assistance_request'
    );
    expect(confirmTool.annotations).toMatchObject({
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    });
    expect(confirmTool._meta.securitySchemes).toEqual([
      { type: 'oauth2', scopes: ['requests:write'] },
    ]);
    expect(confirmTool.inputSchema.required).toEqual(
      expect.arrayContaining(['request_id', 'contract_version', 'idempotency_key'])
    );
    const createTool = response.body.result.tools.find(
      (tool: { name: string }) => tool.name === 'create_assistance_draft'
    );
    expect(createTool.inputSchema.required).toContain('idempotency_key');
    expect(createTool.annotations.idempotentHint).toBe(true);
    const capabilitiesTool = response.body.result.tools.find(
      (tool: { name: string }) => tool.name === 'get_sgh_capabilities'
    );
    expect(capabilitiesTool.description).toContain('not the full SGH service catalog');
    expect(capabilitiesTool.description).toContain('calls no SGH backend or external AI');
  });

  it('rejects a queued execution response that does not prove paid entitlement', async () => {
    vi.mocked(gateway.confirm).mockResolvedValueOnce({
      request_id: 'req_unfunded',
      status: 'QUEUED',
      is_final: false,
      requires_user_action: false,
      display_message: 'queued',
      next_action: null,
      updated_at: new Date().toISOString(),
    });
    const response = await request(app)
      .post('/mcp')
      .set('Accept', 'application/json, text/event-stream')
      .set('Authorization', 'Bearer test-access-token')
      .send({
        jsonrpc: '2.0',
        id: 5,
        method: 'tools/call',
        params: {
          name: 'confirm_assistance_request',
          arguments: {
            request_id: 'req_unfunded',
            contract_version: 1,
            explicit_confirmation: true,
            idempotency_key: 'confirm_unfunded_001',
          },
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.result.isError).toBe(true);
    expect(response.body.result.content[0].text).toContain(
      'INVALID_COMMERCIAL_CONTRACT'
    );
  });

  it('returns an MCP OAuth challenge for a protected tool without a token', async () => {
    const unauthenticated = createApp({
      config,
      gateway,
      tokenVerifier: async () => {
        throw new Error('no token');
      },
    });
    const response = await request(unauthenticated)
      .post('/mcp')
      .set('Accept', 'application/json, text/event-stream')
      .send({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'create_assistance_draft',
          arguments: {
            task_type: 'PHONE_INQUIRY',
            target: { name: 'Test Hotel', phone: '+81312345678' },
            goal: 'Confirm late check-in.',
            result_language: 'en',
            approved_personal_data: {},
            idempotency_key: 'draft_test_hotel_001',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.result.isError).toBe(true);
    expect(response.body.result._meta['mcp/www_authenticate'][0]).toContain(
      '/.well-known/oauth-protected-resource'
    );
  });

  it('returns 405 for standalone GET in stateless mode', async () => {
    const response = await request(app).get('/mcp');
    expect(response.status).toBe(405);
  });
});
