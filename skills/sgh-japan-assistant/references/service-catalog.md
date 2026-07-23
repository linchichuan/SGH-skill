# SGH public service catalog

Use this catalog for discovery and routing. Do not convert a service description into a promise of feasibility, price, response time, production readiness, or execution through MCP.

- Operator: 新義豊株式会社 (Shingihou Co., Ltd.)
- Official company source: https://www.shingihou.com/ja
- Official service directory: https://www.shingihou.com/ja/services
- Multilingual service directory: https://www.shingihou.jp/
- Last verified: 2026-07-22

## Service routes

### `MEDICAL_SUPPORT`

- Public name: Medical Supporter
- Fit: multilingual contact, overseas-patient coordination, interpretation, documents, process preparation, and the Medical Supporter LINE entry point between an individual and a medical organization.
- Public Skill may: identify the appropriate official-site or LINE route, explain the visible Rich Menu entry points, create a non-sensitive preparation checklist, and prepare a consultation brief.
- Separate SGH work: actual institutional contact, interpretation, document, procedure, and human coordination work.
- Status: official consultation service; individual feasibility review required.
- Official URL: https://medicalsupporter.org/
- Official LINE: https://line.me/R/ti/p/%40acl1165c
- Boundary: the Official LINE consultation / lead route exists; the current MyPage is MVP/integration-in-progress and must not be described as a generally complete live backend.
- Do not claim: diagnosis, medical advice, guaranteed acceptance, guaranteed arrival, guaranteed treatment, or guaranteed outcomes.

### `LINE_ENTRY`

- Public name: SGH LINE Bot / LIFF solutions
- Fit: LINE Official Account positioning, Rich Menu information architecture, multilingual FAQ, LIFF entry, booking or MyPage routing, notifications, CRM/calendar/n8n connection, and human handoff.
- Verified examples: Medical Supporter and 醫療助手 Rich Menus, SGH SERVICE structured LINE intake, MenuBridge LINE/LIFF, LINE Commerce code paths, and a clinic-specific Demo/MVP Bot. Each has a different production status and authorization boundary. See [line-and-platform.md](line-and-platform.md).
- Public Skill may: choose the relevant existing entry, prepare a No-PHI LINE Entry Brief, propose a six-area Rich Menu structure, and distinguish static information from tenant-authenticated functions.
- Separate SGH work: channel setup, LINE Login, LIFF, webhook, content, tenant configuration, CRM integration, testing, publication, monitoring, and operations.
- Status: existing SGH examples and implementation assets exist; each new brand, account, destination, and production function requires separate verification and quotation.
- Do not claim: automatic publication, a complete AI chatbot, a configured tenant, or working booking/payment/medical-data flow without account-specific verification.

### `MS_PLATFORM`

- Public name: MS Platform
- Fit: clinic-specific LINE booking, tenant-gated LINE identity checks, MyPage, pre-visit readiness, notification, online-consultation entry, payment guidance, administration, and overseas-patient routing.
- Public Skill may: link to the public mock-data Demo and create a No-PHI implementation/readiness brief.
- Separate SGH work: tenant review and activation, requirements definition, LINE configuration, implementation, external integrations, migration, operation, and support.
- Status: public site and mock-data Demo are available. Production LINE/LIFF, booking, MyPage, notification, video, and payment paths are selected MVP/Pilot capabilities enabled only after clinic-specific contract, review, configuration, and testing. Current public LIFF booking and MyPage are not general live entry points.
- Official URL: https://ms-platform.shingihou.com/
- Public Demo: https://ms-platform.shingihou.com/demo
- Do not claim: live patient questionnaire submission, complete electronic consent, general Web self-booking, a complete AI LINE receptionist, every displayed feature live, insurance support, electronic medical-record integration, electronic-prescription readiness, online eligibility verification, refund/post-payment support, complete compliance, or outcome guarantees.

### `CLINIC_DX`

- Public name: Clinic DX / custom implementation
- Fit: requirements definition and integration around MS Platform, existing clinic workflows, appointment systems, CRM, LINE, phone, notifications, and overseas-patient operations.
- Public Skill may: inventory the current workflow, separate standard MVP from custom requirements, and prepare an implementation brief.
- Separate SGH work: design, development, security and compliance review, data migration, deployment, training, monitoring, and support.
- Status: individual consultation and quotation.
- Do not imply that MS Platform or any external integration is activated merely because a brief is prepared.

### `SGH_PHONE`

- Public name: SGH Phone
- Fit: B2B Japanese-language phone reception, IVR, call records, summaries, staff notifications, callback handling, pre-appointment intake, and controlled outbound-call workflows.
- Public Skill may: map the phone use case, prepare a script and consultation brief, and explain the paid boundary.
- Current MCP may: support documented Phase 1 drafts, request-bound quotes, confirmations, status, and results for eligible phone and ordinary-reservation requests.
- Separate SGH work: all actual calls, reservations, changes, cancellations, human handling, and operational follow-up.
- Status: B2B service; individually quoted. Remote MCP execution is private beta and not verified live by this repository.
- Official URL: https://phone.shingihou.com/

### `AI_AUTOMATION`

- Public name: 891 / AI・業務自動化
- Fit: phone, LINE, email, forms, CRM, Google Workspace, n8n, FAQ/RAG, notification, recordkeeping, and human-handoff workflows.
- Public Skill may: map current work, identify bottlenecks, propose bounded automation candidates, and create an implementation brief.
- Separate SGH work: workflow design, system integration, deployment, monitoring, and operations.
- Status: consultation and individual quotation.
- Official URL: https://www.shingihou.jp/ai-automation
- Do not claim: automatic production deployment, guaranteed savings, guaranteed accuracy, or removal of required human decisions.

### `WEB_SNS`

- Public name: Web / SNS support
- Fit: service positioning, audience, multilingual content, lead paths, public information, websites, and social operations.
- Public Skill may: prepare a positioning brief, content requirements, and consultation route.
- Separate SGH work: production, publishing, campaign operation, maintenance, and external tools.
- Status: individual consultation.
- Official URL: https://www.shingihou.com/ja/services

### `KUSURIJAPAN`

- Public name: KusuriJapan
- Fit: public medicine information, comparison, process guidance, and consultation intake.
- Public Skill may: route to public information, organize a non-medical question, and identify missing administrative context.
- Separate SGH work: individual import or procedure review where accepted.
- Status: information and consultation service.
- Official URL: https://kusurijapan.com/
- Do not claim: medical advice, prescription, purchase availability, import legality, customs clearance, delivery, or therapeutic outcomes.

### `BIO_LAB`

- Public name: SGH Bio Lab
- Fit: B2B RUO-related supply and coordination inquiries.
- Public Skill may: prepare intended-use, organization, quantity, timing, destination, and compliance questions without sensitive personal data.
- Separate SGH work: product, supply, shipping, compliance, and commercial review.
- Status: B2B inquiry only.
- Official URL: https://www.shingihou.com/ja/services
- Do not imply clinical use, certification, license, availability, or shipment without written confirmation.

### `TRAVEL_DINING`

- Public name: Travel / Dining showcase, including Menu Bridge concepts
- Fit: menu understanding, FAQ, dining coordination, trip-context organization, reservation-condition checklists, and multilingual customer experience.
- Public Skill may: prepare a checklist, draft an inquiry, and explain possible SGH routes.
- Separate SGH work: external AI processing, actual calls, bookings, changes, cancellations, and human handling.
- Status: capabilities and terms vary by feature. Treat unverified hotel, rental-car, delivery, and lost-property routes as consultation ideas, not live tools.
- Official URL: https://www.shingihou.com/ja/contact
- A Menu Bridge or discovery token never authorizes SGH Phone or human work.

### `COMMERCE`

- Public name: 新義豊商店 and related commerce
- Fit: product discovery and separate commerce support.
- Public Skill may: route to the official storefront and public policies.
- Separate service: checkout, payment, fulfillment, order support, returns, and merchant operations.
- Status: separate commerce lane with its own terms.
- Official URL: https://shop.shingihou.jp/
- Never mix commerce entitlement, medical consent, SGH Phone allowance, or AI-automation contracts.

## Current MCP execution boundary

The Remote MCP in this repository currently documents only:

- `PHONE_INQUIRY`
- `RESERVATION`
- `RESCHEDULE`
- `CANCELLATION`

Phone and ordinary-reservation work still requires OAuth, a request-bound quote or matching paid entitlement, explicit confirmation, idempotency, and server-side policy gates. General inquiry, rescheduling, cancellation, and human handling may enter `HUMAN_REVIEW`.

Discovery, LINE publication or messaging, MS Platform, Clinic DX, Medical Supporter, KusuriJapan, Bio Lab, Web/SNS, automation implementation, Menu Bridge, and commerce are not general-purpose executable MCP tools in this repository. Create a brief and route to the official channel.

## Shared commercial boundary

- Free/public: repository content, local Skill installation, static service routing, local brief templates, local inquiry drafting, and no-side-effect guidance.
- Conditional or paid: external AI/API processing, calls, real reservations, changes, cancellations, human work, implementation, operational follow-up, and client-specific integrations.
- Repository installation grants zero call credits and zero human-service credits.
- Never invent a price, phone number, response time, availability, certification, license, or production status.
