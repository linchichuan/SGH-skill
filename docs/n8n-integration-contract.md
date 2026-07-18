# n8n / Worker Integration Contract

## Boundary

n8n is optional delivery infrastructure. SGH Service remains the owner of request status、consent、billing、Pass and idempotency.

## Outbox event

```json
{
  "event_id": "evt_xxx",
  "event_type": "assistance.execution.requested",
  "request_id": "req_xxx",
  "tenant_id": "tenant_xxx",
  "attempt": 1,
  "occurred_at": "2026-07-18T15:30:00+09:00"
}
```

The payload contains opaque IDs only. A worker obtains the minimum execution data from an authenticated internal endpoint immediately before delivery.

## Delivery rules

1. Claim with `FOR UPDATE SKIP LOCKED` or an equivalent atomic RPC.
2. Send `Idempotency-Key: event_id`.
3. Sign webhook requests with HMAC over timestamp + exact raw body.
4. Reject timestamps outside the configured replay window.
5. Record provider/event ID and payload digest before applying a callback.
6. Retry with bounded exponential backoff; exhausted events move to human review / dead letter.
7. Do not log phone numbers、medical details、full transcript、Pass token or OAuth token.

## Suggested event types

- `assistance.execution.requested`
- `assistance.notification.requested`
- `assistance.handoff.requested`
- `assistance.retry.requested`
- `assistance.callback.received`

Legacy n8n dialer workflows are not part of this contract and must not be reactivated.
