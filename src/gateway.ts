import type {
  AssistanceDraftInput,
  AuthContext,
  GatewayResponse,
} from './contracts.js';
import type { AppConfig } from './config.js';

export interface SghGateway {
  createDraft(auth: AuthContext, input: AssistanceDraftInput, idempotencyKey: string): Promise<GatewayResponse>;
  confirm(auth: AuthContext, requestId: string, contractVersion: number, idempotencyKey: string): Promise<GatewayResponse>;
  status(auth: AuthContext, requestId: string): Promise<GatewayResponse>;
  result(auth: AuthContext, requestId: string): Promise<GatewayResponse>;
  cancel(auth: AuthContext, requestId: string, idempotencyKey: string): Promise<GatewayResponse>;
  handoff(auth: AuthContext, requestId: string, reason: string, idempotencyKey: string): Promise<GatewayResponse>;
  redeemPass(auth: AuthContext, token: string, idempotencyKey: string): Promise<GatewayResponse>;
}

export class GatewayError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly details?: unknown
  ) {
    super(message);
  }
}

export class HttpSghGateway implements SghGateway {
  constructor(
    private readonly config: AppConfig,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  createDraft(auth: AuthContext, input: AssistanceDraftInput, idempotencyKey: string) {
    return this.authed<GatewayResponse>(auth, '/requests', {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(input),
    });
  }

  confirm(auth: AuthContext, requestId: string, contractVersion: number, idempotencyKey: string) {
    return this.authed<GatewayResponse>(auth, `/requests/${encodeURIComponent(requestId)}/confirm`, {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ terms_accepted: true, contract_version: contractVersion }),
    });
  }

  status(auth: AuthContext, requestId: string) {
    return this.authed<GatewayResponse>(auth, `/requests/${encodeURIComponent(requestId)}`, {
      method: 'GET',
    });
  }

  result(auth: AuthContext, requestId: string) {
    return this.authed<GatewayResponse>(auth, `/requests/${encodeURIComponent(requestId)}/result`, {
      method: 'GET',
    });
  }

  cancel(auth: AuthContext, requestId: string, idempotencyKey: string) {
    return this.authed<GatewayResponse>(auth, `/requests/${encodeURIComponent(requestId)}/cancel`, {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: '{}',
    });
  }

  handoff(auth: AuthContext, requestId: string, reason: string, idempotencyKey: string) {
    return this.authed<GatewayResponse>(auth, `/requests/${encodeURIComponent(requestId)}/handoff`, {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ reason }),
    });
  }

  redeemPass(auth: AuthContext, token: string, idempotencyKey: string) {
    return this.authed<GatewayResponse>(auth, '/passes/redeem', {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ token }),
    });
  }

  private authed<T>(auth: AuthContext, path: string, init: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      headers: {
        ...Object.fromEntries(new Headers(init.headers).entries()),
        'X-SGH-MCP-Subject': auth.subject,
        'X-SGH-MCP-Issuer': auth.issuer,
      },
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await this.fetchImpl(`${this.config.serviceApiBaseUrl}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.serviceInternalApiKey}`,
        ...Object.fromEntries(new Headers(init.headers).entries()),
      },
      signal: AbortSignal.timeout(10_000),
    });
    const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (!response.ok) {
      const error = body.error as Record<string, unknown> | undefined;
      throw new GatewayError(
        typeof error?.message === 'string' ? error.message : 'SGH Service request failed',
        response.status,
        typeof error?.code === 'string' ? error.code : 'SGH_SERVICE_ERROR',
        error?.details
      );
    }
    return body.data !== undefined ? (body.data as T) : (body as T);
  }
}
