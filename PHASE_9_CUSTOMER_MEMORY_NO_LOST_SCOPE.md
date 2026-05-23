# Phase 9 Customer Memory + No Lost Scope

Arqon / Ultra CRM Phase 9 is a planning boundary for Customer Memory, No Lost Lead, and No Lost Money. This document defines safe scope, data contracts, evidence expectations, human approval rules, and the line between advisory signals and automated action.

This is not an implementation document for real API, persistence, sending, automation, or a No Lost calculation engine.

## 1) Phase 9 Purpose

Customer Memory solves the problem of fragmented customer context. It should help the operator see who the customer is, what they asked for, which channels they used, what is missing, what was promised, and which sales actions are still open.

No Lost Lead solves the problem of qualified demand slipping between inbox, request pool, lead handling, channel follow-up, and offer preparation. It should surface advisory risk signals before a hot request becomes stale.

No Lost Money solves the problem of revenue risk hidden inside open offers, delayed follow-ups, missing evidence, long negotiations, and unclosed sales processes. It should show potential commercial risk without claiming actual lost revenue unless the required source of truth and calculation evidence exist.

The purpose of Phase 9 is safe decision intelligence, not automation. The product can recommend, warn, and explain. It must not silently create records, send messages, change statuses, assign tasks, or claim money loss.

## 2) Current Product Sources

| Route | Current role | Phase 9 context |
| --- | --- | --- |
| `/inbox` | Real Ultra Inbox command center | Conversation history, customer intent, lead candidates, missing info, next action, AI reply context, customer intelligence snapshot |
| `/talep-havuzu` | Existing preserved demand intake surface | Raw demand, request source, priority, request funnel, source quality, critical actions, early No Lost Lead context |
| `/leadler` | Existing lead operations surface | Lead temperature, priority, status, follow-up, owner, next action, lead risk |
| `/musteri-kartlari` | Existing customer memory-like surface | Customer identity, timeline, risks, actions, sales process, offer status, potential revenue context |
| `/teklifler` | Phase 8 premium offers MVP | Offer amount, status, probability, follow-up date, age, missing info, risk label, sales suggestion |
| `/kanal-yonetimi` | Phase 8 premium channel management MVP | Channel health, response time, lead quality, offer impact, integration state, channel risk |
| `/akilli-yanit-ayarlari` | Phase 8 premium AI reply governance MVP | Human approval modes, blocked actions, risk level, automation boundaries, safety badges |

These surfaces are current product inputs for planning. They should not be rewritten as part of Phase 9 planning.

## 3) Non-Goals

- No real API.
- No persistence.
- No automatic message sending.
- No automatic lead, offer, or customer creation.
- No automatic task assignment.
- No status change without explicit human approval and a real backend later.
- No financial claim without evidence.
- No definitive lost-money claim without calculation logic and source of truth.
- No TenantOverride runtime merge.
- No ActiveConfig runtime layer.
- No No Lost engine implementation in this docs task.
- No fake tenant resolver.
- No fake automation, fake toast, or UI copy that implies a completed action.

## 4) Customer Memory Scope

Customer Memory should remember:

- Customer identity and company context.
- Active channels and first/last source.
- Current intent, request type, and product/service interest.
- Missing information.
- Lead, demand, inbox, offer, and customer-card references.
- Last touch date and follow-up date.
- Owner or team responsible.
- Timeline entries and important notes.
- Open risks and next suggested action.
- Evidence behind each major summary or recommendation.
- Human approval state when the memory is used to drive action.

Potential current sources:

- `data/inbox.ts`
- `data/talep-havuzu.ts`
- `data/leadler.ts`
- `data/musteri-kartlari.ts`
- `data/offers.ts`
- `data/channelManagement.ts`
- `data/smartReplySettings.ts`

Without a backend or persistence, Customer Memory must be labeled as a local readonly memory snapshot. It must not claim that the system learned, saved, updated, synced, or permanently remembered customer information.

Human approval is required when memory is used to:

- Trigger outbound communication.
- Create or update a lead, offer, customer card, or task.
- Escalate a financial risk.
- Mark a customer, lead, or offer as lost or won.
- Make commitments about pricing, discounts, delivery, legal terms, or guarantees.

Persistence-free forbidden claims:

- "The system updated customer memory."
- "The customer record has been saved."
- "The system learned this for future use."
- "This memory is synced across channels."

## 5) No Lost Lead Scope

No Lost Lead can produce advisory signals for:

- Overdue follow-up.
- Missing contact or project information.
- Unassigned demand or lead.
- High-intent conversation not converted to a lead.
- Customer asked for an offer but no offer exists.
- Request is ready for offer but still waiting.
- Channel response time is harming lead quality.
- Human review is required before reply or conversion.
- Hot lead has aged beyond the expected response window.

Examples:

- A request in `/talep-havuzu` has high priority and missing information.
- An inbox conversation is marked as a lead candidate but has no lead record.
- A lead in `/leadler` has urgent priority and a stale follow-up.
- A customer in `/musteri-kartlari` is waiting for offer preparation.
- A channel in `/kanal-yonetimi` has watch/action-required health with declining lead quality.

Allowed as suggestions:

- "Review this lead today."
- "Ask for missing information."
- "Consider converting this request to a lead."
- "Assign an owner before the follow-up window closes."
- "Prepare offer context after human review."

Requires human approval:

- Create lead.
- Create offer.
- Update customer card.
- Assign owner.
- Change status.
- Send message.
- Mark as lost, won, ignored, or converted.

Fake automation risk is prevented by keeping Phase 9 UI copy advisory, using disabled CTAs until real backend exists, and avoiding success toasts or saved-state language.

## 6) No Lost Money Scope

No Lost Money can produce advisory revenue-risk signals for:

- Open offer with overdue follow-up.
- High-value offer with missing next action.
- Offer stuck in negotiation.
- Offer age above target threshold.
- Low probability but high amount.
- Missing offer amount or missing close probability.
- Lost offer without lost reason.
- Customer requested price but offer was not prepared.
- Sales process contains potential revenue but lacks evidence.

"Estimated potential revenue risk" is not the same as "definitive lost money."

Allowed wording:

- "Potential revenue risk."
- "Estimated commercial exposure."
- "Offer follow-up risk."
- "Revenue-risk signal based on local snapshot."

Forbidden without a real calculation engine and source of truth:

- "This amount is lost."
- "The system saved this revenue."
- "No Lost Money engine recovered revenue."
- "Accounting loss is confirmed."
- "Revenue forecast is final."

Evidence is required before showing any financial estimate. At minimum, the signal needs offer amount, currency, stage/status, probability or confidence, overdue/follow-up basis, and source references.

## 7) Data Contract Drafts

### CustomerMemoryRecord

| field | type hint | purpose | required? | source example |
| --- | --- | --- | --- | --- |
| `id` | string | Stable memory snapshot id | yes | Generated from local customer id |
| `customerId` | string | Customer reference | yes | `musteri-kartlari` customer id |
| `customerName` | string | Human-readable customer name | yes | Customer card, inbox, lead |
| `companyName` | string | Company context | no | Offer/customer card |
| `channels` | string[] | Active contact channels | yes | Inbox, channel management |
| `activeIntent` | string | Current customer intent | yes | Inbox intent, request type |
| `lifecycleStage` | string | Demand/lead/offer/customer stage | yes | Lead or sales status |
| `lastTouchAt` | string | Last observed interaction | yes | Inbox, timeline, offer |
| `missingInfo` | string[] | Needed information | no | Inbox/customer card/offer |
| `openRisks` | string[] | Advisory risk labels | no | Lead, offer, customer risks |
| `nextBestAction` | string | Suggested next step | no | Local recommendation |
| `timeline` | string[] | Human-readable memory timeline | no | Customer card timeline |
| `evidenceIds` | string[] | Backing evidence references | yes | `AuditEvidence.id` |
| `confidence` | "low | medium | high" | Confidence in summary | yes | Derived from source completeness |
| `approvalState` | string | Human approval state if action-linked | no | Approval policy |

### NoLostLeadSignal

| field | type hint | purpose | required? | source example |
| --- | --- | --- | --- | --- |
| `id` | string | Stable signal id | yes | Local signal id |
| `subjectType` | "inbox | demand | lead | customer | offer" | Signal origin | yes | `/inbox`, `/talep-havuzu`, `/leadler` |
| `subjectId` | string | Source record id | yes | Lead/request/conversation id |
| `customerId` | string | Customer reference | no | Customer card |
| `severity` | "low | medium | high | critical" | Signal urgency | yes | Risk score |
| `reasonCode` | string | Machine-readable reason | yes | `overdue_follow_up` |
| `description` | string | Operator-facing explanation | yes | Advisory copy |
| `evidenceIds` | string[] | Source evidence | yes | Evidence records |
| `suggestedAction` | string | Suggested human action | yes | Call, review, ask info |
| `requiresHumanApproval` | boolean | Prevents silent action | yes | True for creation/sending |
| `blockedActions` | string[] | Actions not allowed locally | yes | send, create, assign |
| `owner` | string | Responsible team/person | no | Lead owner |
| `dueAt` | string | Follow-up deadline | no | Lead follow-up date |
| `confidence` | "low | medium | high" | Signal confidence | yes | Evidence completeness |
| `status` | string | Signal display state | yes | advisory, reviewed, blocked |

### NoLostMoneySignal

| field | type hint | purpose | required? | source example |
| --- | --- | --- | --- | --- |
| `id` | string | Stable signal id | yes | Local signal id |
| `offerId` | string | Offer reference | no | `/teklifler` |
| `customerId` | string | Customer reference | no | Customer card |
| `amount` | number | Potential amount | no | Offer amount |
| `currency` | string | Currency code | no | TRY, USD, EUR |
| `probability` | number | Close probability or confidence | no | Offer probability |
| `stage` | string | Sales/offer stage | yes | Offer status |
| `riskReasonCode` | string | Machine-readable money risk | yes | `overdue_offer_follow_up` |
| `overdueBy` | string | Aging or delay label | no | Follow-up date difference |
| `evidenceIds` | string[] | Financial evidence references | yes | Offer/customer sources |
| `suggestedAction` | string | Suggested human action | yes | Review offer, call customer |
| `estimateLabel` | string | Safe estimate label | yes | Potential revenue risk |
| `requiresHumanApproval` | boolean | Prevents action/claim escalation | yes | True for financial escalation |
| `status` | string | Signal display state | yes | advisory, reviewed, blocked |

### HumanApprovalRule

| field | type hint | purpose | required? | source example |
| --- | --- | --- | --- | --- |
| `id` | string | Rule id | yes | Local policy id |
| `scope` | string | Area covered by rule | yes | sending, lead, offer, money |
| `triggerReason` | string | Why approval is needed | yes | outbound_message |
| `requiredRole` | string | Who can approve | yes | sales manager, owner |
| `allowedActions` | string[] | Actions allowed after approval | yes | createLead, createOffer |
| `blockedActions` | string[] | Actions blocked before backend | yes | sendMessage, saveRecord |
| `approvalCopy` | string | UI explanation | yes | "Requires human approval" |
| `auditRequired` | boolean | Whether evidence/audit is mandatory | yes | True for financial claims |

### AuditEvidence

| field | type hint | purpose | required? | source example |
| --- | --- | --- | --- | --- |
| `id` | string | Evidence id | yes | Local evidence id |
| `sourceType` | string | Source category | yes | inbox, lead, offer, customer |
| `sourceId` | string | Source record id | yes | Record id |
| `field` | string | Observed field | yes | followUpAt, amount |
| `snapshotValue` | string | Observed value at signal time | yes | "2026-05-23" |
| `observedAt` | string | Observation timestamp or label | yes | Local snapshot date |
| `confidence` | "low | medium | high" | Evidence confidence | yes | Completeness-based |
| `displaySentence` | string | Operator-facing evidence sentence | yes | "Offer follow-up is overdue." |
| `route` | string | Where operator can inspect source | no | `/teklifler` |

## 8) Human Approval Policy

### Allowed as suggestion

- Review customer memory snapshot.
- Review a high-risk lead.
- Ask for missing information.
- Prepare a call plan.
- Consider creating a lead.
- Consider preparing an offer.
- Review channel health.
- Review reply policy.

### Requires approval

- Outbound message.
- Lead creation.
- Offer creation.
- Customer update.
- Status change.
- Task assignment.
- Owner assignment.
- Financial estimate escalation.
- Lost-money claim.
- Discount, legal, guarantee, or delivery commitment.

### Blocked until backend/persistence exists

- Saving memory.
- Syncing memory.
- Persisting No Lost signals.
- Creating records.
- Assigning tasks.
- Sending messages.
- Changing sales or lead status.
- Writing audit trails to a durable store.

### Never allowed without evidence

- Definitive lost-money claim.
- Claim that revenue was saved.
- Claim that customer memory was updated.
- Claim that a task was assigned.
- Claim that a message was sent.
- Claim that an automation completed.

## 9) Evidence Model

Every Phase 9 signal should answer:

- Which data source produced this signal?
- Which source record is referenced?
- Which observed field/value supports the signal?
- When was it observed?
- How confident is the signal?
- What route lets the operator inspect the source?

Evidence ID logic:

- `sourceType`: inbox, demand, lead, customer, offer, channel, policy.
- `sourceId`: local fixture or future backend id.
- `field`: observed field name.
- `snapshotValue`: value used for the signal.
- `confidence`: low, medium, high.
- `observedAt`: local snapshot label or future timestamp.

UI evidence sentence examples:

- "Signal based on offer follow-up date and open status."
- "Signal based on inbox lead-candidate flag and missing information."
- "Signal based on customer timeline showing offer requested but not completed."

If evidence is missing, the UI must not say:

- "This lead will be lost."
- "This revenue is lost."
- "The customer memory confirms this."
- "The system calculated financial loss."

## 10) Phase 9 Implementation Options

| option | risk | product value | implementation requirement | blocked dependencies | recommended order |
| --- | --- | --- | --- | --- | --- |
| 9A: Existing page audit / source mapping | Low | High | Read-only audit or docs first | None | 1 |
| 9B: Customer Memory readonly local snapshot | Medium | High | Local readonly UI/data only | Source mapping and evidence rules | 2 |
| 9C: No Lost Lead readonly signal surface | Medium | High | Local readonly advisory UI/data only | Customer memory and approval policy | 3 |
| 9D: No Lost Money readonly signal surface | Medium-high | High | Local readonly advisory UI/data only | Evidence model, money wording policy | 4 |
| 9E: Human approval + audit trail design | Medium | High | Design first; implementation later | Signal contracts and backend decision | 5 |
| 9F: Backend/persistence integration planning | High | Very high | Architecture planning; no fake runtime | Auth/session, storage, API source of truth | 6 |

## 11) Recommended Phase 9 Order

1. Source mapping + contract validation.
2. Readonly Customer Memory local snapshot.
3. Readonly No Lost Lead signal surface.
4. Readonly No Lost Money signal surface.
5. Human Approval + Audit Trail design.
6. Backend/persistence integration planning.

This order keeps the roadmap moving without pretending that persistence, automation, or financial calculation exists before the required infrastructure is approved.

## 12) Acceptance Gates

Before any Phase 9 implementation subphase starts:

- User approval is required.
- Scope must say whether the work is docs-only, audit-only, or code implementation.
- Existing good pages must not be rewritten.
- No fake API.
- No real sending.
- No persistence claim.
- No financial certainty claim.
- No hidden state mutation.
- No TenantOverride runtime.
- No ActiveConfig runtime.
- No No Lost engine claim unless explicitly implemented and reviewed.
- Typecheck must pass if code is touched.
- Build must pass if code is touched.
- Guardrail grep must be run if code is touched.
- Visual QA is required if UI is touched.
- Commit/push require explicit user approval.

## 13) Forbidden Claims

Do not say:

- "The system updated customer memory" when persistence does not exist.
- "Customer memory was saved" when no backend write happened.
- "The system learned this for future use" when there is no durable store.
- "Money loss is confirmed" when no calculation engine/source of truth exists.
- "Revenue was recovered" when there is no real outcome tracking.
- "Automatic follow-up was assigned" when no task system exists.
- "Message was sent" when sending does not exist.
- "Lead was created" when creation is not backed by persistence.
- "Offer was created" when creation is not backed by persistence.
- "No Lost engine is running" when only readonly advisory signals exist.
- "Multi-tenant customer memory is ready" when tenant identity and backend are unresolved.

Phase 9 must remain honest: advisory intelligence first, human approval before action, evidence before claims, and backend/persistence only after explicit approval.
