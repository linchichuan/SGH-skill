# Deployment

## Prerequisites

- SGH Service Backend deployment prepared to expose the public HTTPS origin
  `https://mcp.shingihou.com/mcp`
- OAuth 2.1 authorization server supporting authorization code + PKCE S256 and MCP resource binding
- Private SGH Service deployment with `/api/service/mcp`
- `20260718150000_sgh_mcp_gateway.sql` and `20260720160000_sgh_mcp_commercial_funding.sql` applied after the existing Agent Platform migrations
- Secret manager entries for OAuth JWKS configuration and the SGH Service internal credential
- An explicit allowlist of paid or sponsor-funded MCP Pass plans; an empty allowlist blocks all execution

## Required environment

Use `env.example` as the key list. Never copy production values into the repository, image, build log or client configuration.

## Current production status

As of 2026-07-22, DNS for `mcp.shingihou.com` resolves to Zeabur and reaches the
SGH Service Backend, but `GET /health`, OAuth protected-resource metadata and
`GET` / `POST /mcp` return HTTP 404. The Remote MCP is therefore **not live**.
Do not publish the URL as a working client connection until the checks below
pass.

## Preferred no-additional-service topology

To avoid paying for another Zeabur service, mount the public Streamable HTTP
gateway in the existing SGH Service Backend process and reuse its private
`/api/service/mcp` control-plane adapter. This repository contains the tested
standalone Express gateway and contract; the equivalent public routes are not
yet mounted in the current SGH Service deployment.

The target SGH Service deployment must expose all of the following from the
same public origin:

- `GET /health`
- `GET /.well-known/oauth-protected-resource`
- `POST /mcp`
- `GET /mcp` and `DELETE /mcp` as explicit HTTP 405 responses for stateless mode

Keep `mcp.shingihou.com` bound to SGH Service only after those routes have been
integrated and tested. Creating a second Zeabur MCP service is optional, not a
requirement, and may add hosting cost.

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
11. An unpaid confirm creates zero call attempts、outbox events and human handoffs
12. `SGH_RESERVE_MEMBER_CALL_CREDITS_ENABLED=false` for public MCP traffic
13. Stripe test authorization cannot fund a real production call
14. A quote from another request、tenant、issuer or expired terms version is rejected
15. Human assignment without reserved human credit is rejected and creates no consume ledger event

Safe OAuth smoke test（does not confirm, redeem, cancel, hand off, or call）:

```bash
MCP_BASE_URL=https://mcp.shingihou.com npm run smoke:mcp-oauth
```

After anonymous metadata/challenge checks pass, provide a short-lived production test token through the deployment secret shell only:

```bash
MCP_BASE_URL=https://mcp.shingihou.com \
MCP_OAUTH_TOKEN='***' \
MCP_SMOKE_REQUEST_ID='a-test-users-existing-request-id' \
npm run smoke:mcp-oauth
```

Do not paste the token into an issue, README, CI log, or shell history shared with others.
The script never prints the token or an authenticated request body and never calls an MCP write tool.

## Release gate

Do not enable real-call flags until the SGH Service deployment SHA, database migration state, OAuth flow, paid entitlement binding, SGH Phone callback and a controlled test-number call have been independently verified. Keep direct public MCP human handoff disabled until human credit is atomically reserved. Public GitHub publication does not mean the production MCP endpoint is live.
