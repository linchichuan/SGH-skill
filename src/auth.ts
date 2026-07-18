import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { Request } from 'express';
import type { AppConfig } from './config.js';
import type { AuthContext } from './contracts.js';

export class AuthError extends Error {
  constructor(
    message: string,
    readonly code: 'missing_token' | 'invalid_token' | 'insufficient_scope',
    readonly requiredScopes: string[] = []
  ) {
    super(message);
  }
}

export type TokenVerifier = (token: string) => Promise<AuthContext>;

export function createTokenVerifier(config: AppConfig): TokenVerifier {
  const jwks = createRemoteJWKSet(new URL(config.oauthJwksUrl));
  return async (token) => {
    try {
      const result = await jwtVerify(token, jwks, {
        issuer: config.oauthIssuer,
        audience: config.oauthAudience,
      });
      return payloadToAuth(result.payload, token);
    } catch {
      throw new AuthError('The OAuth access token is invalid or expired.', 'invalid_token');
    }
  };
}

function payloadToAuth(payload: JWTPayload, token: string): AuthContext {
  if (!payload.sub || !payload.iss) {
    throw new AuthError('The OAuth token is missing subject or issuer.', 'invalid_token');
  }
  const rawScope = typeof payload.scope === 'string' ? payload.scope : '';
  const scopeArray = Array.isArray(payload.scp)
    ? payload.scp.filter((value): value is string => typeof value === 'string')
    : [];
  return {
    subject: payload.sub,
    issuer: payload.iss,
    scopes: new Set([...rawScope.split(/\s+/), ...scopeArray].filter(Boolean)),
    token,
  };
}

export async function optionalAuth(req: Request, verifier: TokenVerifier): Promise<AuthContext | null> {
  const header = req.get('authorization') || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match?.[1]) return null;
  return verifier(match[1]);
}

export function requireScopes(auth: AuthContext | null, requiredScopes: string[]): AuthContext {
  if (!auth) throw new AuthError('OAuth sign-in is required.', 'missing_token', requiredScopes);
  const missing = requiredScopes.filter((scope) => !auth.scopes.has(scope));
  if (missing.length > 0) {
    throw new AuthError(`Missing OAuth scope: ${missing.join(', ')}`, 'insufficient_scope', missing);
  }
  return auth;
}

export function oauthChallenge(config: AppConfig, error: AuthError): string {
  const metadata = `${config.publicUrl}/.well-known/oauth-protected-resource`;
  const scope = error.requiredScopes.length > 0
    ? `, scope="${error.requiredScopes.join(' ')}"`
    : '';
  return `Bearer resource_metadata="${metadata}", error="${error.code}", error_description="${error.message}"${scope}`;
}
