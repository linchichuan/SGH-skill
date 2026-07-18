import { describe, expect, it, vi } from 'vitest';
import { HttpSghGateway } from '../src/gateway.js';
import type { AppConfig } from '../src/config.js';

const config: AppConfig = {
  nodeEnv: 'test',
  port: 3000,
  publicUrl: 'https://mcp.example.test',
  oauthIssuer: 'https://auth.example.test',
  oauthAudience: 'https://mcp.example.test',
  oauthJwksUrl: 'https://auth.example.test/jwks',
  serviceApiBaseUrl: 'https://service.example.test/api/service/mcp',
  serviceInternalApiKey: 'test-internal-secret-key',
  allowedOrigins: [],
};

describe('HttpSghGateway', () => {
  it('forwards a stable idempotency key and resolved OAuth subject', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            request_id: 'req_123',
            status: 'QUEUED',
            is_final: false,
            requires_user_action: false,
            display_message: 'queued',
            next_action: null,
            updated_at: '2026-07-18T12:00:00+09:00',
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );
    const gateway = new HttpSghGateway(config, fetchMock);

    await gateway.confirm(
      {
        subject: 'oauth-user-1',
        issuer: 'https://auth.example.test',
        scopes: new Set(['requests:write']),
      },
      'req_123',
      1,
      'confirm:req_123:v1'
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0]!;
    const headers = new Headers(init?.headers);
    expect(headers.get('Idempotency-Key')).toBe('confirm:req_123:v1');
    expect(headers.get('X-SGH-MCP-Subject')).toBe('oauth-user-1');
    expect(headers.get('Authorization')).toBe('Bearer test-internal-secret-key');
    expect(init?.body).toBe(JSON.stringify({ terms_accepted: true, contract_version: 1 }));
  });
});
