# SGH Skill 商業・費用境界

## 目的

公開SkillをSGHの認知・相談導線として活用しながら、電話、音声AI、人的対応などSGH側に原価が発生する処理を無料開放しない。

## 無料公開レイヤー

- GitHub README、画像、ユースケース、技術資料
- ローカルAgent Skillのインストール
- ローカルでの相談内容、必要情報、質問項目の整理
- 静的かつdeterministicな `get_sgh_capabilities`
- 外部APIや人を呼ばない `check_task_supported`
- 必要に応じて、OAuth済みかつ副作用のないdraft作成

無料公開レイヤーは、SGH Phoneの通話枠、予約代行、人的対応を一切付与しない。

## 有料実行レイヤー

- SGHによる対外電話
- 実際の予約、変更、取消
- 人的確認、例外対応、継続フォロー
- Twilio、音声AI、検索API、通知基盤など従量課金を伴う処理
- 検証済み通話結果の作成と提供

## 実行前の必須gate

`QUEUED` を返す前に、同じserver-side transactionまたは原子的claimで次を確認する。

1. OAuth subjectが有効なSGH memberへlinkされている。
2. 対象、目的、共有情報、期限、料金条件が固定されている。
3. quoteまたは契約条件が失効していない。
4. 有効な有料契約、決済済みcredit、または発行元負担のservice-scoped SGH Passがある。
5. tenant、plan、skill、call、humanのscopeと残高が依頼に一致する。
6. 必要な利用枠を原子的に確保する。
7. 本人が同じcontract versionを明示確認する。
8. idempotency keyが同一操作の再試行にだけ使用されている。

どれか一つでも確認できない場合は、電話、予約、outbox、人的案件を作成しない。

## 現在の公開条件

正式なpaid entitlement E2Eが完了するまで、公開MCPは宣伝・発見用途として扱う。

- `confirm_assistance_request`: allowlistされた有料／sponsored Agent Pass以外はblockする。
- `handoff_to_human`: public v1では直接作成しない。
- `SGH_RESERVE_MEMBER_CALL_CREDITS_ENABLED`: public MCP運用では `false` を維持する。
- Stripe test authorizationを実電話のfundingとして使用しない。
- 実電話関連flagは、live payment、callback、取消raceを検証するまで有効化しない。

## 実装済みの商業gate（未deploy）

SGH Service backendの現在の実装ブランチには、次の防止策を追加している。ただし、migration、OAuth及び本番deploymentの検証が完了するまでは、本番提供済みとは表現しない。

- 一つの`request_id`、`agent_task_id`及び`quote_id`を固定した見積snapshot
- Stripe live authorization又は対象サービス用Passを同じrequestへ原子的にreserve
- Passのtenant、issuer、plan、service scope、有効期間及び残高のtransaction内再検証
- task、call attempt、human workのreserve／consume／release ledger
- 同一idempotency keyによる重複控除、重複発信及び重複返却の防止
- 実行開始前取消時の決済承認取消又は未使用Pass枠返却
- 古い非quote confirm APIからの有料実行をblock
- OAuth tokenのissuer、audience、signature、expiry、required claims及びscopeのfail-closed検証

## SGH Pass

SGH Passは無料Tokenではなく、費用負担者と利用範囲を表すentitlementである。

- `paid`: 利用者が購入済み
- `contract`: 法人契約の利用枠
- `sponsor_funded`: ホテル、診所、店舗など発行元が負担

Passはtenant、service、skill、最大回数、期限、call credit、human creditを分離する。Menu Bridgeのdiscovery-only PassをSGH Phoneや人的対応に流用しない。

## Menu Bridgeの位置づけ

Menu Bridgeは宣伝・発見型Skillとして運用する。

| Menu Bridgeで無料提供できるもの | SGH有料導線へ切り替えるもの |
|---|---|
| メニュー、FAQ、店舗情報 | 電話確認 |
| 言語説明、アレルギー確認項目 | 実予約 |
| 相談内容の整理 | 変更、取消 |
| SGHの紹介、CTA | 人的対応、継続フォロー |

## 正式公開までの残項目

- SGH Assistantの標準税込料金、未接続、話中、再試行及び人的対応の具体的課金条件
- Terms、Privacy、料金・取消方針の法務確認、施行日及び正式公開URL
- Production OAuth provider、client registration、member link及びrevoke運用
- Supabase production migration、issuer master及び対象Passの承認済み初期設定
- Zeaburへ対象backend commitをdeployし、`/mcp`とOAuth metadataを200にする
- test numberによるcallback、取消race及びprovider evidenceのcontrolled E2E
- 本番monitor、アラート、operator runbook及び料金・額度照合

これらが完了するまでは、GitHub公開を本番MCPの提供開始と表現しない。
