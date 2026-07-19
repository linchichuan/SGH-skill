# Safety Rules

1. Draft creation cannot place a call.
2. This public repository and local Skill include zero SGH call credits and zero free human-service credits.
3. Only `confirm_assistance_request` may queue execution, and only after the server atomically verifies and reserves a paid contract, prepaid credit, or issuer-funded service-scoped SGH Pass.
4. Never describe queued、calling or waiting work as confirmed.
5. A confirmed reservation requires evidence supplied by the contacted business.
6. Unknown provider states fail into human review.
7. Do not accept emergency requests、impersonation、harassment、fraud or bypassing business rules.
8. Public Japan Call v1 must not collect diagnosis、symptoms、medical records、passport、payment-card data、passwords or authentication secrets.
9. Share only fields included in the user's explicit consent snapshot.
10. A cancellation tool cancels the SGH task only; it does not imply a third-party reservation has been cancelled.
11. A discovery-only or Menu Bridge entitlement cannot authorize phone, reservation, cancellation, rescheduling, or human-service execution.
12. Direct human handoff stays disabled until a service-scoped human entitlement is verified and its credit is atomically reserved.
13. Do not put sensitive information in MCP `_meta`、logs、n8n execution data or public GitHub issues.
