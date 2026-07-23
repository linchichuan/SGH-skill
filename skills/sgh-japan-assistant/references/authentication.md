# Authentication

Authenticated tools use OAuth 2.1 authorization code + PKCE. The MCP server publishes RFC 9728 protected resource metadata and verifies access-token signature、issuer、audience/resource、expiry and scopes on every request.

Scopes:

- `profile`: identify the linked SGH member profile
- `requests:read`: view the user's status and result
- `requests:write`: draft、confirm、cancel and handoff
- `passes:redeem`: redeem an opaque SGH Pass

OAuth scope does not replace action-specific confirmation. Calls、personal-data sharing、cancellation、rescheduling and payment require a durable consent record.

OAuth also does not prove payment. Execution requires a separate server-side commercial check for an active paid contract, prepaid credit, or issuer-funded service-scoped SGH Pass. Discovery-only and Menu Bridge entitlements must never satisfy this check.

Never place access tokens、refresh tokens、client secrets or internal SGH credentials in the Skill repository.
