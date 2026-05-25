# Arqon / Ultra CRM Panel

Arqon / Ultra CRM Panel is a premium customer operations command panel for
Ultra Inbox, customer memory, demand intake, lead follow-up, offers, channel
operations, reply governance, and the Core Panel + Sector DNA architecture.

## Current Status

```text
Status: Phase 10B final release surface recheck GREEN
Branch: main
Latest pushed commit: 28fc7bd4ddbdcf628ca6c7dd9c435d1f726a4d14 chore(release): polish responsive surface flow
Phase 10A trust/copy recheck: GREEN
Phase 10A-1 trust copy cleanup: pushed
Phase 10B visual QA: completed after focused responsive polish
Phase 10B final recheck: GREEN
Typecheck: passing
Build: passing
Working tree after latest push: clean
```

Phase 10 handoff source:

```text
Use PHASE_10_RELEASE_HARDENING_SUMMARY.md as the current release-hardening handoff before Phase 11 planning.
Repo terminal output remains the technical source of truth.
```

## Completed Phase Chain

```text
Post-Phase 6 Quality Sweep: completed and pushed
Phase 7A registry + pure resolver: completed and pushed
Phase 7B resolver contract hardening: completed and pushed
Phase 8 product surfaces: completed and pushed
Phase 9A source mapping: completed
Phase 9B readonly Customer Memory Snapshot: completed and pushed
Phase 9C readonly lead risk advisory signals: completed and pushed
Phase 9D readonly revenue risk advisory signals: completed and pushed
Phase 10A/10B release hardening: completed and GREEN
```

## Product Focus

Arqon is designed as a premium customer operations command center, not a
generic CRM dashboard.

Core areas:

```text
- Ultra Inbox command center
- Demand intake and lead operations
- Customer Memory readonly snapshot
- Offers and readonly revenue risk advisory
- Channel Management and Smart Reply governance
- Core Panel + Sector DNA separation
- Premium graphite / platinum SaaS interface
```

## Routes

Current active app routes include:

```text
/
/inbox
/talep-havuzu
/leadler
/musteri-kartlari
/teklifler
/kanal-yonetimi
/akilli-yanit-ayarlari
/sektorel-dna
/sektor-modulleri
```

Route reality:

```text
/leadler is the active lead route.
/leader is absent and should not be used.
/teklifler, /kanal-yonetimi, and /akilli-yanit-ayarlari are now real local MVP product surfaces, not placeholders.
```

## Trust Boundaries

Current release scope is local MVP and readonly/advisory where Phase 9 signals
are involved.

```text
No real API.
No backend.
No business persistence.
No runtime action.
No real message sending.
No customer, lead, or offer mutation runtime.
No task assignment runtime.
No status-change runtime.
No financial certainty claim.
Readonly/advisory/local fixture surfaces only for Customer Memory and No Lost style signals.
```

## Architecture Note

`activeDna` flows through `resolveActiveDna()`, `sectorDnaRegistry`, and the
deterministic `baselineSectorDna` / `energyDna` fallback.

`DnaProvider` is mounted route-level on `/` and `/inbox`; it is not mounted
globally in `app/layout.tsx`.

This is not a full multi-tenant backend. `TenantOverride` merge,
`ActiveConfig` runtime selection, and real tenant identity resolution remain
future explicitly scoped work.

## Development Commands

```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```
