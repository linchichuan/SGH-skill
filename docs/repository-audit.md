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

## 2026-07-22 Service Navigator 再監査

公式サイトと関連プロジェクトを再確認した結果、公開Skillのブランド範囲を電話だけに限定しない。新義豊の公式サービスは、Medical Supporter、Clinic DX / MS Platform、SGH Phone、AI・業務自動化、Web / SNS、KusuriJapan、Bio関連及び独立した物販導線を含む。

| Public Skillで表現できること | 制限 |
|---|---|
| 公式サービスの発見と目的別ルーティング | 対応可否、料金、納期を保証しない |
| 非機密の相談Briefと日本語問い合わせ案 | 送信、外部API処理、人的作業を開始しない |
| 電話、LINE、Email、フォーム、CRM、n8nの業務棚卸し | 構築、デプロイ、運用は個別相談 |
| Medical SupporterとClinic DXの窓口案内 | 診断を行わず、Demo / MVPを本番機能として表現しない |
| Menu Bridge等のShowcase紹介 | discovery権限を電話・人的対応へ転用しない |

Remote MCPの実行面は引き続き `PHONE_INQUIRY`、`RESERVATION`、`RESCHEDULE`、`CANCELLATION` に限定する。Medical Supporter、Clinic DX、自動化、Web/SNS、KusuriJapan、Bio、物販を、このrepositoryから直接実行できるとは表現しない。

追加確認により、SGH Service側のinternal MCP routeはOAuth subjectを要求する一方、gatewayの公開capability toolはsubjectを送っていなかった。公開照会を外部APIへ転送せず、gateway内のversioned local policyへ変更した。これにより公開照会はSGH Service、Supabase、Twilio、外部AI又はhuman queueを呼ばず、認証不整合と不要な運用原価を同時に回避する。

公式情報源：

- https://www.shingihou.com/ja
- https://www.shingihou.com/ja/services
- https://www.shingihou.jp/
- https://www.shingihou.jp/ai-automation

## 2026-07-22 dependency audit

- `fast-uri`は`3.1.4`へ、開発用`tsx` / `esbuild`は`4.23.1` / `0.28.1`へ更新し、該当するhigh及びdevelopment advisoryを解消した。
- `@modelcontextprotocol/sdk@1.29.0`が依存する`@hono/node-server@1.19.x`には、Windowsの`serve-static`に関するmoderate advisory [GHSA-frvp-7c67-39w9](https://github.com/advisories/GHSA-frvp-7c67-39w9) が残る。
- 本gatewayはExpressで構成し、Honoの`serve-static`を使用せず、Docker / ZeaburのLinux runtimeを前提とするため、確認した経路には直接該当しない。`npm audit fix --force`はMCP SDKを`1.24.3`へ強制的に変更するため実行しない。SDK側が互換性を保った修正版を提供した時点で再評価する。

## 2026-07-22 production endpoint read-only smoke

- DNS: `mcp.shingihou.com`は`hnd1.cname.zeabur-dns.com`へ解決し、Zeabur ingressへ到達した。
- HTTP: `GET /health`、`GET /.well-known/oauth-protected-resource`、`GET /mcp`及び副作用のないMCP `initialize`用`POST /mcp`は、すべてHTTP 404を返した。
- 応答形式はSGH Service Backendの`NOT_FOUND` envelopeであり、domainはSGH Serviceへ到達しているがpublic MCP routeはmountされていないと判断する。
- token、個人情報及びwrite toolは使用していない。電話、予約、draft、Pass、人的案件は作成していない。
- 結論: production OAuth smokeは未成立。Remote MCPは引き続きprivate beta / live未検証と表示し、追加費用を避ける場合は既存SGH Service Backend processへpublic gatewayを統合してから再試験する。

## 2026-07-22 LINE／MS Platform portfolio 再監査

関連repositoryと公開画面を追加確認し、公開Skillを「単一の電話Bot」又は「単一のLINE Bot」ではなく、AIが目的別のSGH入口を説明するService Navigatorとして再定義した。

| Surface | 確認できた事実 | 公開表現の上限 |
|---|---|---|
| Medical Supporter Official LINE | Official Account、LINE Login lead導線、規約／privacy、Rich Menu実例 | 正式相談入口。MyPageはMVP／連携整備中 |
| 醫療助手 LINE | 既存Official AccountとRich Menu保存確認 | 表示入口の実例。AI翻訳は補助であり医療判断ではない |
| SGH SERVICE LINE | Webhook、structured AI intake、LINE reply/pushの実装 | LINE相談からWeb確認へ渡す実装例。外部AI・送信・実行は有料／認証gate |
| MenuBridge LIFF | カメラ菜単、多言語整理、独立したLINE identity境界 | 既存product showcase。SGH Phone無料枠ではない |
| LINE Commerce | 署名検証Webhook、商品RAG、Login、Rich Menu dry-run route | code-level implementation。production activationは個別確認 |
| 客製clinic LINE Bot | text／voice／image、RAG、言語、予約intent、consentのDemo／MVP code | 再利用可能な実装例。外部clinicでの現行本番稼働は主張しない |
| MS Platform | 公開mock Demo、tenant-aware LINE／LIFF／MyPage／通知／video／selected payment path | productized pre-pilot。実運用は個別導入・初期設定後 |

Medical Supporter Official LINEは患者側の発見・相談入口、MS Platformは医療機関側の運用layer、SGH Skillは両者を説明してNo-PHI Briefと公開Demoへつなぐ役割とする。公開SkillからLINE送信、Rich Menu公開、患者登録、病歴upload、LIFF予約、診療入室、payment又は外部AI処理を実行しない。

## 2026-07-24 Rich Menu V6 再確認

Medical Supporter／醫療助手の最新Rich Menu V6について、production用画像、preview、LINE Official Account上の保存状態及び各6件のURI actionを再確認した。V5の画像と説明を公開repositoryから差し替えた。

| LINE入口 | V6で確認した表示入口 | 公開Skillでの扱い |
|---|---|---|
| Medical Supporter Official LINE | 日本の医療機関、MyPage、案内に従う医療資料upload、AI即時翻訳、SGH Service | MyPageはMVP／連携整備中。医療資料は認証済み正式導線のみ。公開Skillでは受領・uploadしない |
| 醫療助手 LINE | 日本の医療機関、案内に従う医療資料upload、AI即時翻訳、費用・サービス、SGH Service | 翻訳はコミュニケーション補助。医療資料の非公開upload先は公開repositoryへ記載しない |

Medical Supporter Official LINEと醫療助手 LINEは別アカウントである。公開READMEでは各add-friend URLを分け、Medical Supporterのリンクが醫療助手へ誤遷移していた状態を修正した。Rich Menu表示は、電話、予約、人的作業、外部AI又はその他有料機能の無料利用権を付与しない。
