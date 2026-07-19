# MCP Tool Contracts

## Universal response envelope

Every tool response contains:

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

`QUEUED` and `CALLING` never mean the reservation is confirmed.

## Tools

| Tool | Auth | Commercial gate | Side effect |
|---|---|---|---|
| `get_sgh_capabilities` | public | none | none; deterministic public data only |
| `check_task_supported` | public | none | none; deterministic policy check only |
| `create_assistance_draft` | `requests:write` | no execution credit granted | draft only; no call |
| `confirm_assistance_request` | `requests:write` | paid contract, prepaid credit, or issuer-funded service-scoped Pass | atomically reserves entitlement, then queues execution |
| `get_assistance_status` | `requests:read` | owner scope | none |
| `get_assistance_result` | `requests:read` | owner scope | none |
| `cancel_assistance_request` | `requests:write` | applicable cancellation terms | cancels only a still-cancellable SGH request |
| `handoff_to_human` | `requests:write` | paid human entitlement plus atomic human-credit reservation | disabled in public v1 until that gate exists |
| `redeem_sgh_pass` | `passes:redeem` | tenant, scope, service, validity, use count, issuer funding | atomically consumes the permitted Pass allowance |

Draft creation requires a stable `idempotency_key`; retry the exact same draft with the same key. Draft responses include `contract_version`. Confirmation must send that exact version together with its own stable `idempotency_key` and `explicit_confirmation=true`. Cancel、handoff and Pass redemption also require a stable idempotency key and explicit confirmation.

Draft and capability responses must state that repository access includes zero free call credits. If the server cannot prove paid entitlement, it must return `execution_eligible=false`, an entitlement/payment next action, and create no call、booking or human task.
