# Deployment

## Prerequisites

- Public HTTPS origin such as `https://mcp.shingihou.com`
- OAuth 2.1 authorization server supporting authorization code + PKCE S256 and MCP resource binding
- Private SGH Service deployment with `/api/service/mcp`
- `20260718150000_sgh_mcp_gateway.sql` applied after the existing Agent Platform migrations
- Secret manager entries for OAuth JWKS configuration and the SGH Service internal credential

## Required environment

Use `env.example` as the key list. Never copy production values into the repository, image, build log or client configuration.

## Container

```bash
docker build -t sgh-japan-assistant-mcp .
docker run --rm -p 3000:3000 --env-file .env sgh-japan-assistant-mcp
```

## Pre-release checks

```bash
npm ci
npm run typecheck
npm run build
npm test
npm audit --omit=dev
```

Then verify:

1. `GET /health`
2. `GET /.well-known/oauth-protected-resource`
3. MCP `initialize` and `tools/list`
4. Anonymous capability tools
5. OAuth login、issuer/audience/scope rejection
6. Draft creates no phone side effect
7. Duplicate confirm returns an idempotent replay and does not create another call attempt
8. Status/result never upgrade queued work to confirmed
9. Pass token is stored as hash only and replay is atomic
10. Signed provider callback replay and out-of-order behavior

## Release gate

Do not enable real-call flags until the SGH Service deployment SHA, database migration state, OAuth flow, SGH Phone callback and a controlled test-number call have been independently verified. Public GitHub publication does not mean the production MCP endpoint is live.
