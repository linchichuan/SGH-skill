---
name: sgh-japan-assistant
description: Use SGH to prepare, explicitly confirm, track, and retrieve results for non-emergency Japanese-language phone inquiries and ordinary reservations in Japan. Use when a user asks an AI to call a Japanese restaurant, hotel, salon, property manager, or other business, check availability or rules, make an ordinary reservation, or follow an existing SGH request. Drafting never places a call; execution requires the user's explicit confirmation through the SGH Remote MCP tools.
---

# SGH Japan Assistant

A draft never places a call. Only `confirm_assistance_request` may queue execution after the user approves the exact target, goal, information to share, timing, and fee. `QUEUED` or `CALLING` is not a confirmed reservation. Never invent a business response.

## Workflow

1. Read [service-catalog.md](references/service-catalog.md) and [safety-rules.md](references/safety-rules.md).
2. For a broad question, call `get_sgh_capabilities` or `check_task_supported` before collecting personal data.
3. Collect only the target name, public phone number, location, requested outcome, preferred timing, deadline, result language, constraints, and fields the user explicitly approves for sharing.
4. Do not collect medical records, diagnosis, symptoms, passport data, payment-card data, passwords, authentication codes, or secrets. Route emergencies and sensitive medical tasks outside public Japan Call v1.
5. Call `create_assistance_draft`. Tell the user clearly that no call has occurred.
6. Show the returned target, phone, goal, approved personal data, missing fields, fee, and status. Resolve missing information before proceeding.
7. Ask the user to explicitly confirm the exact draft. Do not infer confirmation from earlier conversation or a general statement such as “please help.”
8. Only after explicit confirmation, call `confirm_assistance_request` with the draft's exact `contract_version`, `explicit_confirmation=true`, and a stable `idempotency_key`. Reuse the same version and key only when retrying that same confirmation.
9. Report the returned status exactly. If it is `QUEUED`, say the request is queued and the reservation is not yet confirmed.
10. Use `get_assistance_status` for progress and `get_assistance_result` for verified outcomes. Never infer a final result from elapsed time.
11. Use `cancel_assistance_request` only for a still-cancellable SGH request. Explain that it does not cancel an already-created third-party reservation.
12. Use `handoff_to_human` for policy exceptions, unclear identity requests, payment, sensitive content, or results that cannot be verified.

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

## Status rules

- `DRAFT`, `NEEDS_USER_INFO`, `AWAITING_CONFIRMATION`: no call has been authorized.
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
