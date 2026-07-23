# SGH Service Skill Architecture

## 目的

SGH Japan Assistantを、新義豊のサービスをAIから発見、理解、整理、案内できる公開Service Navigatorと、その先にある限定的な有料実行モジュールに分離する。

公開Skillは、Medical Supporter Official LINE、醫療助手 LINE、SGH SERVICE／MenuBridge、LINE Commerce、MS Platform、Clinic DX、SGH Phone、AI自動化、Web/SNS、KusuriJapan等の適切な窓口を案内し、相談Briefや問い合わせ案をローカルに作成する。この段階ではLINE送信、Rich Menu公開、患者登録、外部送信、電話、予約、人的作業、外部AI処理、実装作業を開始しない。

Remote MCPのPhase 1は、対応可能な日本語電話、一般予約、確認について、内容確認後にSGHが非同期で実行し、推測ではない進捗と結果を返す。Remote MCPを全SGHサービスの実行APIとして扱わない。

```text
Public Skill
Discover → Understand → Prepare → Route
                         │ no SGH execution cost
                         ▼
Official consultation / paid entitlement
                         ▼
Remote MCP Phase 1
Confirm → Execute → Track / Result
```

LINE／LIFFは単一の共通Botではなく、目的別の入口として扱う。

```text
Medical Supporter Official LINE ─┐
醫療助手 LINE                    ├─ consultation / discovery entries
SGH SERVICE / MenuBridge         ├─ service and authenticated Web entries
LINE Commerce / custom Bot       ├─ project-specific implementation examples
MS Platform                      └─ clinic operations Demo / MVP / Pilot

Public Skill: compare + explain + No-PHI brief only
Production systems: authenticate + authorize + confirm + execute
```

Medical SupporterのMyPageはMVP／連携整備中、MS Platformは公開mock Demoとproductized pre-pilot、LINE Commerce及び客製Botはcode-level／Demo・MVP実例として表現する。個別のdeployment、tenant、provider設定を確認せずに本番稼働を主張しない。

## Ownership

| Component | Owns | Must not own |
|---|---|---|
| Public Skill | Service discovery、LINE／LIFF比較、No-PHI brief、consultation brief、inquiry draft、workflow guidance、safety rules | secret、要配慮情報、実行状態、外部副作用 |
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
  └─ validate OAuth scope + exact quote_id + explicit_confirmation + contract version
  └─ bind quote to one request / task / owner / tenant / OAuth issuer / terms version
  └─ validate tenant / service / plan / call or human scope
  └─ atomically reserve the applicable paid or sponsor-funded credit
  └─ atomic idempotency claim
  └─ persist consent snapshot
  └─ queue outbox / Reserve execution
  └─ return QUEUED immediately
```

`QUEUED`、`CALLING`、`WAITING_FOR_BUSINESS` は予約成立を意味しない。`CONFIRMED` は対象事業者から得た deterministic evidence がある場合に限る。

Public repository access and local Skill installation grant zero SGH call credits and zero human-service credits. See [commercial-boundary.md](commercial-boundary.md).

`get_sgh_capabilities` と `check_task_supported` は、MCP gateway内のversioned local policyとして評価する。SGH Service、Supabase、Twilio、外部AI API、human queueを呼び出さず、request、quote、bookingを作成しない。現在の料金、空席又はbusiness availabilityを返すtoolとして扱わない。

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

- Public now: static service discovery、local consultation brief、Japanese inquiry draft、automation readiness guidance、official routing.
- Remote MCP Phase 1: request-bound quote and paid-entitlement contract、private beta for funded non-sensitive phone and ordinary-reservation actions.
- Phase 2: self-service checkout、rescheduling、Pass management及びLINE/Email result notification.
- Phase 3: medical vertical with separate scopes、consent、retention and compliance review.
