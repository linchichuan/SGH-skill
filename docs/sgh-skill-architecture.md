# SGH Service Skill Architecture

## 目的

ユーザーが自分の AI に日本語の電話、一般予約、確認を依頼し、内容確認後に SGH が非同期で実行し、推測ではない進捗と結果を返す。

## Ownership

| Component | Owns | Must not own |
|---|---|---|
| Public Skill | Discovery、workflow guidance、safety rules | secret、個人情報、実行状態 |
| MCP Gateway | MCP transport、OAuth token verification、scope enforcement、tool projection | 通話中の長時間 connection、業務状態の真相 |
| SGH Service | Request、consent、state、Pass、billing、outbox、tenant isolation | Twilio call lifecycle |
| SGH Phone | Dialing、voice policy、provider callback、evidence extraction | public OAuth、Pass、user-facing state wording |
| n8n / worker | Outbox delivery、notification、retry、human assignment | consent、billing、final state truth |
| CRM | Operator planning / read model | internet-facing task transaction |

## Confirmation boundary

```text
create_assistance_draft
  └─ DRAFT / NEEDS_USER_INFO / AWAITING_CONFIRMATION
     └─ no phone side effect

confirm_assistance_request
  └─ validate OAuth scope + paid entitlement + explicit_confirmation + contract version
  └─ validate tenant / service / plan / call or human scope
  └─ atomically reserve the applicable paid or sponsor-funded credit
  └─ atomic idempotency claim
  └─ persist consent snapshot
  └─ queue outbox / Reserve execution
  └─ return QUEUED immediately
```

`QUEUED`、`CALLING`、`WAITING_FOR_BUSINESS` は予約成立を意味しない。`CONFIRMED` は対象事業者から得た deterministic evidence がある場合に限る。

Public repository access and local Skill installation grant zero SGH call credits and zero human-service credits. See [commercial-boundary.md](commercial-boundary.md).

## Public state mapping

| External | SGH Service / Reserve examples |
|---|---|
| DRAFT | DRAFT |
| NEEDS_USER_INFO | MISSING_INFO、INTAKE_INCOMPLETE、WAITING_USER |
| AWAITING_CONFIRMATION | READY_FOR_CONFIRMATION、AWAITING_USER_CONFIRMATION、AWAITING_PAYMENT |
| QUEUED | READY_TO_EXECUTE、READY_TO_CALL、CALL_QUEUED、SCHEDULED |
| CALLING | EXECUTING、CALLING |
| WAITING_FOR_BUSINESS | WAITING_EXTERNAL、RETRY_SCHEDULED |
| CALLBACK_REQUIRED | CALLBACK_EXPECTED |
| HUMAN_REVIEW | HUMAN_REVIEW、NEEDS_OPERATOR、unknown state |
| CONFIRMED | CONFIRMED with evidence |
| COMPLETED | SUCCEEDED / PARTIALLY_SUCCEEDED with result |

Unknown internal/provider states fail into `HUMAN_REVIEW`; they never become `CONFIRMED` by default.

## OAuth

- MCP gateway is an OAuth resource server.
- Authorization server must support authorization code + PKCE S256 and MCP resource binding.
- Access token verification: signature、issuer、audience/resource、expiry、not-before、scope。
- Required scopes: `profile`、`requests:read`、`requests:write`、`passes:redeem`。
- Scope is not consent. Calls、cancellation、rescheduling、payment、personal-data sharing require action-specific confirmation records.

## Data minimization

- Public repo contains no personal data or credentials.
- SGH Pass token is opaque and random; database stores only a SHA-256 hash and a short non-secret prefix.
- MCP output excludes raw transcript by default. It returns summary、verified result、evidence quality、next action.
- Medical records、symptoms、diagnosis、passport、card number、password are not accepted by public Japan Call v1.

## Phase boundaries

- Phase 1: public discovery、local consultation brief、paid-entitlement contract、private beta for funded non-sensitive actions.
- Phase 2: cancellation/rescheduling、Pass management、LINE/Email result notification、self-service payment quote.
- Phase 3: medical vertical with separate scopes、consent、retention and compliance review.
