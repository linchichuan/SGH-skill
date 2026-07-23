# SGH LINE and MS Platform catalog

Use this reference when the user mentions LINE, LIFF, Rich Menu, Medical Supporter LINE, 醫療助手, SGH SERVICE, MenuBridge, MS Platform, MyPage, clinic booking, or online consultation.

Last verified: 2026-07-22

## Route selection

| User need | Primary route | Public action |
|---|---|---|
| Overseas patient wants to understand SGH support | Medical Supporter site / LINE | Explain the entry, provide the official URL, create a non-sensitive checklist |
| User asks which SGH LINE account or Rich Menu fits | `DISCOVER_LINE_ENTRY` | Compare only verified visible routes; do not open authenticated destinations |
| Business wants its own LINE Bot, Rich Menu, LIFF, FAQ, or handoff | `DESIGN_LINE_ENTRY` | Create a No-PHI LINE Entry Brief and route to AI Automation / Clinic DX |
| Clinic wants booking, MyPage, notifications, or online-consultation operations | `MS_PLATFORM_READINESS` | Link to the public Demo and create a No-PHI readiness brief |
| User wants a real phone call or ordinary reservation | Paid phone MCP path | Keep LINE installation and access separate from paid execution entitlement |

## Existing SGH LINE examples

### Medical Supporter Official LINE

- Verified public surface: an existing LINE Official Account, public add-friend route, LINE Login lead route, privacy/terms pages, and a Rich Menu saved and visually confirmed on 2026-07-22.
- Visible entry concepts: Japanese medical organizations, consultation, MyPage, case and appointment concepts, instructed medical-record upload, fees/services, and SGH Service.
- Safe description: an official multilingual consultation and coordination entry for overseas patients.
- Limit: the current MyPage frontend is MVP/integration-in-progress; do not claim the complete MyPage backend or every Rich Menu destination is generally live. Do not collect a medical record in the public Skill. File upload is only for an authorized user following the service's instructions.
- Official URLs: https://medicalsupporter.org/ and https://line.me/R/ti/p/%40acl1165c

### 醫療助手 LINE

- Verified public surface: an existing LINE Official Account and Rich Menu were saved and visually confirmed on 2026-07-22.
- Visible entry concepts: Japanese medical organizations, service flow, AI live-translation entry, fees/services, and SGH Service.
- Safe description: a Traditional-Chinese-facing medical-support and communication entry.
- Limit: AI translation is communication assistance, not diagnosis, treatment advice, interpretation certification, or a guaranteed real-time service in every context.

### SGH SERVICE / MenuBridge LINE and LIFF

- Existing product surfaces include a dedicated SGH SERVICE LINE identity path, structured AI intake implementation, and MenuBridge LINE/LIFF experiences for service/member routes and menu understanding.
- Safe description: examples of connecting a LINE consultation or camera/menu experience to an authenticated Web confirmation surface. The service-side design creates a draft first; it does not treat a chat message as authorization to call, book, or charge.
- Limit: account identity, LIFF registration, external AI use, member/reservation availability, pricing, and production status are product-specific. A MenuBridge or discovery entitlement never grants phone, reservation-agent, or human-work credit.

### LINE Commerce

- Code-level examples include signed LINE webhook handling, product-catalog search / RAG, account linking, a Rich Menu administration route with dry-run support, and an optional n8n handoff.
- Safe description: an implementation example for connecting product discovery in LINE to a controlled commerce surface.
- Limit: code review does not prove every production token, webhook, Login, Rich Menu, catalog, payment, or fulfillment path is currently active. Never place an order, publish a Rich Menu, or send a product message from this public Skill.

### Custom clinic LINE Bot

- A clinic-specific Demo/MVP code example combines text, voice and image intake, multilingual routing, grounded content, booking intent, consent gates, and human handoff concepts.
- Safe description: a configurable implementation pattern, not a universally deployed SGH product or medical decision system.
- Limit: do not name an external clinic as a current production customer without separate approval and current deployment proof. Do not claim diagnosis, treatment decisions, automatic booking completion, or current live operation.

## MS Platform

### Publicly available

- Public landing page: https://ms-platform.shingihou.com/
- Public mock-data Demo: https://ms-platform.shingihou.com/demo
- The Demo shows patient MyPage and clinic administration concepts without sending real LINE, SMS, phone, payment, or patient data.

### Selected implementation paths

The codebase contains tenant-aware MVP/Pilot paths for LINE Login / LIFF token and channel checks, clinic-scoped booking, patient-owned MyPage data, gated notifications, Twilio video entry, selected Stripe checkout/webhook behavior, and Rich Menu review workflows.

Describe all of these, including identity checks, as tenant-specific MVP/Pilot implementation paths enabled only after clinic-specific contract, tenant activation, LINE and external-service configuration, security review, and testing. Never summarize them as general production availability.

### Not safe to claim live

- General live LIFF booking or MyPage for any clinic or public user
- A complete AI LINE receptionist or LLM chatbot
- Patient questionnaire submission through LINE
- Complete electronic consent/signature and version management
- General Web self-booking
- Electronic medical record or electronic prescription integration
- Online eligibility verification
- Full refund, post-payment, or universal Stripe support
- Complete legal or regulatory compliance
- Guaranteed patient acquisition, treatment acceptance, diagnosis, prescription, or outcomes

## Public Skill boundary

The public Skill may explain, compare, create a No-PHI brief, and link to a public Demo or official consultation channel. It must not:

- initialize LIFF or log in as the user;
- open tenant booking or MyPage as an execution step;
- register or identify a patient;
- submit a consultation, booking, questionnaire, consent, payment, or video-room request;
- upload a medical document;
- publish a Rich Menu or send a LINE message;
- claim that GitHub or LINE access grants paid SGH execution.
