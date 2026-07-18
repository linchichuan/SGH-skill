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

| Tool | Auth | Side effect |
|---|---|---|
| `get_sgh_capabilities` | public | none |
| `check_task_supported` | public | none |
| `create_assistance_draft` | `requests:write` | draft only; no call |
| `confirm_assistance_request` | `requests:write` | queues execution after explicit confirmation |
| `get_assistance_status` | `requests:read` | none |
| `get_assistance_result` | `requests:read` | none |
| `cancel_assistance_request` | `requests:write` | cancels only a still-cancellable request |
| `handoff_to_human` | `requests:write` | creates a deduplicated staff review |
| `redeem_sgh_pass` | `passes:redeem` | atomically consumes Pass allowance |

Draft responses include `contract_version`. Confirmation must send that exact version together with a stable `idempotency_key` and `explicit_confirmation=true`. Cancel、handoff and Pass redemption also require a stable idempotency key and explicit confirmation.
