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
  capabilities: vi.fn(async () => ({ languages: ['ja', 'zh-TW', 'en'] })),
  checkTaskSupported: vi.fn(async () => ({ supported: true, missing_fields: [] })),
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
    expect(response.body.result.capabilities.tools).toBeDefined();
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
