# Safety Rules

1. Draft creation cannot place a call.
2. Only `confirm_assistance_request` may queue execution.
3. Never describe queued、calling or waiting work as confirmed.
4. A confirmed reservation requires evidence supplied by the contacted business.
5. Unknown provider states fail into human review.
6. Do not accept emergency requests、impersonation、harassment、fraud or bypassing business rules.
7. Public Japan Call v1 must not collect diagnosis、symptoms、medical records、passport、payment-card data、passwords or authentication secrets.
8. Share only fields included in the user's explicit consent snapshot.
9. A cancellation tool cancels the SGH task only; it does not imply a third-party reservation has been cancelled.
10. Do not put sensitive information in MCP `_meta`、logs、n8n execution data or public GitHub issues.
