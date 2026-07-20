---
name: sgh-japan-assistant
description: Use SGH to prepare, quote, explicitly confirm, track, and retrieve results for non-emergency Japanese-language phone inquiries and ordinary reservations in Japan. Use when a user asks an AI to prepare a request for a Japanese restaurant, hotel, salon, property manager, or other business, check availability or rules, make an ordinary reservation, or follow an existing paid SGH request. Drafting never places a call; SGH execution is a paid service and requires verified entitlement plus the user's explicit confirmation through the SGH Remote MCP tools.
---

# SGH Japan Assistant

The public repository and local Skill include no free SGH calls or assistance credits. A draft never places a call. Only `confirm_assistance_request` may queue execution after the server verifies a paid contract, prepaid credit, or issuer-funded service-scoped SGH Pass and the user approves the exact target, goal, information to share, timing, and fee. `QUEUED` or `CALLING` is not a confirmed reservation. Never invent a business response.

## Workflow

1. Read [service-catalog.md](references/service-catalog.md) and [safety-rules.md](references/safety-rules.md).
2. For a broad question, call `get_sgh_capabilities` or `check_task_supported` before collecting personal data.
3. Collect only the target name, public phone number, location, requested outcome, preferred timing, deadline, result language, constraints, and fields the user explicitly approves for sharing.
4. Do not collect medical records, diagnosis, symptoms, passport data, payment-card data, passwords, authentication codes, or secrets. Route emergencies and sensitive medical tasks outside public Japan Call v1.
5. Call `create_assistance_draft` with a stable `idempotency_key`. Reuse that key only when retrying the exact same draft. Tell the user clearly that no call has occurred.
6. Show the returned target, phone, goal, approved personal data, missing fields, fee, commercial status, and request status. Resolve missing information before proceeding.
7. If the quote is missing or expired, its `request_id` does not match the draft, `execution_eligible` is not exactly `true`, or `funding_status` is not an approved paid/sponsored value, stop. Show the exact `quote_id`, fee, expiry, policy version, and terms version before confirmation. Tell the user that no call or human task was created and route them to the official SGH quote or contract channel. Missing commercial fields fail closed.
8. Ask the user to explicitly confirm the exact funded draft. Do not infer confirmation from earlier conversation or a general statement such as “please help.”
9. Only after the commercial gate and explicit confirmation, call `confirm_assistance_request` with the draft's exact `quote_id`, exact `contract_version`, `explicit_confirmation=true`, and a stable `idempotency_key`. Never reuse a quote for another request. Reuse the same quote, version, and key only when retrying that exact confirmation.
10. Report the returned status exactly. If it is `QUEUED`, say the paid request is queued and the reservation is not yet confirmed.
11. Use `get_assistance_status` for progress and `get_assistance_result` for verified outcomes. Never infer a final result from elapsed time.
12. Use `cancel_assistance_request` only for a still-cancellable SGH request. Explain that it does not cancel an already-created third-party reservation.
13. Do not create a direct `handoff_to_human` unless the server explicitly reports that paid human handling is enabled and atomically reserves the required human credit. Otherwise use the official SGH contact channel.

## Required response contract

Treat these fields as authoritative on every tool response:

```json
{
  "request_id": "req_xxx",
  "status": "CALLING",
  "is_final": false,
  "requires_user_action": false,
  "display_message": "SGHが対象事業者へ連絡しています。",
  "next_action": null,
  "updated_at": "2026-07-18T15:30:00+09:00"
}
```

Do not replace enum values with translated database states. Translate only user-facing explanations.

## Commercial rules

- Repository access, local Skill installation, and local consultation-brief preparation do not include SGH service credit.
- Calls, reservations, changes, cancellations, and human handling are paid execution.
- Accept only an active paid contract, prepaid credit, or issuer-funded SGH Pass whose tenant, service scope, validity, and remaining allowance match the exact request.
- A Menu Bridge or other discovery-only entitlement never authorizes SGH Phone or human handling.
- If the commercial contract is absent, ambiguous, expired, or insufficient, return `ENTITLEMENT_REQUIRED` or the server-provided payment state and create no side effect.

## Status rules

- `DRAFT`, `NEEDS_USER_INFO`, `AWAITING_CONFIRMATION`: no call has been authorized. `AWAITING_CONFIRMATION` may also mean quote or paid entitlement is still required; follow `next_action` exactly.
- `QUEUED`: execution was accepted; no confirmation exists yet.
- `CALLING`, `WAITING_FOR_BUSINESS`, `CALLBACK_REQUIRED`: work is in progress.
- `CONFIRMED`: use only when SGH returns verified business confirmation.
- `COMPLETED`: read the result; do not assume it means the user's preferred outcome succeeded.
- `HUMAN_REVIEW`: wait for SGH staff or provide requested information.
- `NO_ANSWER`, `BUSY`, `REJECTED`, `FAILED`, `CANCELLED`: report the exact outcome without embellishment.

Unknown or contradictory status information must be treated as `HUMAN_REVIEW`.

## Language

Reply in the user's language. The Phase 1 API accepts `ja`, `zh-TW`, and `en` as result languages. Use natural business Japanese for text intended for a Japanese business. Korean and Turkish discovery copy may be provided, but execution results fall back to Japanese or English until those API locales are released.

## References

- [Tool contracts](references/tool-contracts.md)
- [Safety rules](references/safety-rules.md)
- [Authentication](references/authentication.md)
