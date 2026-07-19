# SGH Service Skill — Repository Audit

監査日: 2026-07-18
対象: SGH Service / Reserve、SGH Phone、Supabase migrations、n8n artifacts、SGH CRM

## 結論

第一版の Remote MCP は SGH Phone に直接実装しない。SGH Service を公開制御面として使用し、SGH Phone は署名済みの内部電話実行 adapter として維持する。

```text
ChatGPT / Codex / Claude
          │ OAuth 2.1 + MCP
          ▼
SGH MCP Gateway (/mcp)
          │ internal authenticated API
          ▼
SGH Service / Reserve control plane
          │ verified + idempotent execution contract
          ▼
SGH Phone → Twilio / voice runtime → signed callback
```

## 再利用する実装

| 要件 | 現在の実装 | 方針 |
|---|---|---|
| Draft / explicit confirmation | SGH Service `agent_tasks`、Reserve draft / authorization | 再利用 |
| Idempotency | `agent_approvals.idempotency_key`、Reserve attempt identity | 再利用し MCP key を伝播 |
| 状態機械 | Agent と Reserve の明示的 transition | 外部 canonical status に mapping |
| 非同期電話 | Reserve supervisor + SGH Phone internal call endpoint | 再利用、HTTP を通話中保持しない |
| 結果証拠 | SGH Phone の deterministic confirmation / outcome | 要約した result contract として公開 |
| Human review | `agent_handoffs` / operator tasks | 再利用 |
| Pass / credit | Agent pass と Reserve credit の基盤 | hash-only token と redemption ledger を追加 |
| Audit / processed events | Reserve audit と processed event | MCP consent、outbox、pass redemption を追加 |

## 実装上の欠落

- 公開 HTTPS `/mcp` Streamable HTTP endpoint
- OAuth protected resource metadata、JWT issuer/audience/scope 検証
- OAuth subject と SGH member/tenant の安全な link
- 9 tool の JSON Schema、annotations、統一 response envelope
- 汎用 assistance の cancel / result / handoff / Pass redemption API
- field-level consent snapshot と fee/quote version
- hash-only SGH Pass token、atomic redemption、replay protection
- outbox / processed webhook claim と結果通知契約
- 一般電話と医療データを分離する scope / data classification

## 変更しない範囲

- SGH Phone の既存 Twilio / voice / fixed caller / callback contract
- legacy n8n dialer JSON
- SGH CRM を internet-facing transaction database にすること
- 患者情報、決済情報、secret を public Skill repository に保存すること

## 実装順序

1. External state と tool contract を固定する。
2. Public MCP gateway と OAuth resource-server を実装する。
3. SGH Service に internal MCP adapter、consent、result、cancel、handoff、Pass redemption を追加する。
4. Reserve の draft / authorization / supervisor / SGH Phone bridge を接続する。
5. outbox による通知、retry、human queue を接続する。
6. MCP Inspector と各 client で接続確認する。
7. Private beta 後に公開 ChatGPT App submission を別途審査する。

## Production truth に関する注意

この監査は repository code と migration の確認であり、production database への migration 適用、deployment SHA、実電話の再試験を証明するものではない。実運用開始前に別途 production verification が必要である。

## 2026-07-20 商業gate追記

公開Skillとローカル相談票は宣伝用途として無料提供できるが、SGHの電話、予約実行、人的対応は有料とする。公開repoは無料通話枠を付与しない。`confirm_assistance_request` はallowlistされた有料または発行元負担のPassを必要とし、直接の `handoff_to_human` はhuman creditの原子的確保が完成するまでblockする。詳細は [commercial-boundary.md](commercial-boundary.md) を参照。
