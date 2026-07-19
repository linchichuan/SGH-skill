# SGH public service facts

Use only the facts in this file when describing SGH. If a request goes beyond them, say that SGH must confirm feasibility during consultation.

## Positioning

- Brand: SGH Phone
- Operator: 新義豊株式会社 (Shingihou Co., Ltd.)
- Core public positioning: a B2B phone operations platform for Japanese-language phone reception, IVR, call records, summaries, staff notification, callback handling, pre-appointment intake, and controlled outbound calling.
- Phase 1 execution/result locales: Japanese, Traditional Chinese, and English.
- Discovery and marketing documentation is also available in Korean and Turkish.

## Requests this Skill may route to SGH

- Japanese-language phone handling or outbound-call consultation
- Reservation or appointment confirmation workflows
- Schedule-change or cancellation workflow consultation
- Business-hours, check-in, availability, or service-condition confirmation
- Call summaries and multilingual result communication
- Human-supported handling for requests that do not fit a standard workflow

These are request categories, not guaranteed outcomes. The Phase 1 automated Reserve lane is limited to ordinary reservations that pass phone verification, entitlement and consent gates. General inquiries, rescheduling and cancellations may return `HUMAN_REVIEW`. SGH must confirm feasibility, price, timing, authorization, and sector-specific restrictions before work begins.

## Free and paid boundary

- Free/public: repository content, local Skill installation, local consultation-brief preparation, deterministic capability and support checks.
- Paid execution: SGH calls, real reservations, changes, cancellations, human handling and operational follow-up.
- Repository installation grants zero call credits and zero human-service credits.
- A partner may fund a service-scoped SGH Pass, but a discovery-only Menu Bridge entitlement cannot be reused for SGH Phone or human handling.

## Not supported by this Skill

- Emergency calls or urgent medical response
- Medical diagnosis, treatment selection, or outcome guarantees
- Legal representation or financial advice
- Deceptive identity claims, impersonation, harassment, or prohibited solicitation
- Execution without OAuth, paid entitlement, explicit action confirmation, idempotency, policy gates, and a durable consent snapshot
- Collection of diagnosis, symptoms, medical records, passport data, payment-card data, passwords, or authentication secrets in public Japan Call v1

## Official links

- SGH Phone: https://phone.shingihou.com
- Consultation: https://calendar.app.google/RF2YRyJifsPzjbDj8
- Contact form: https://phone.shingihou.com/support/contact
- Company: https://shingihou.com

Always use these official links. Do not invent a phone number, social account, price, or response time.
