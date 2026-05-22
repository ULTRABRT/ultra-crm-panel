# Arqon / Ultra CRM Panel

Arqon / Ultra CRM Panel is a premium CRM command panel focused on customer operations, Ultra Inbox, and the Core Panel + Sector DNA architecture.

## Current Status

```text
Status: Phase 7B resolver contract hardening completed
Branch: main
Current repo HEAD / latest implementation commit: e5b91ddf617cc67ce22f0f0ea20beec7ef95a723 refactor(dna): harden active dna resolver contract
Latest docs metadata handoff commit: c75f68134ea970a5fca0612166e4aed18e02ee6b docs: clarify phase 7a handoff head metadata
Phase 7A product/refactor commit: 184737c64b0a5512b7582be187fdabf279483d1e refactor(dna): resolve active dna through sector registry
security pre-push gate: passed; no tracked env/key/private/credential files or secret pattern matches
Tech gate: typecheck passing; build passing after Google Fonts network retry
```

Completed sweep items:

```text
QS2 responsive polish: completed
QS3 route hygiene: completed
QS4 activeDna tenant resolver: audited only; real resolver deferred to Phase 7
QS5 final mobile visual polish: completed
QS6 final technical gate: passed
```

Phase 7A completed:

```text
activeDna source: resolveActiveDna()
Sector registry: sectorDnaRegistry
Initial registry contents: energyDna only
Resolver output: SectorDna
Missing/unknown sectorId fallback: baseline energyDna
DnaProvider scope: route-level on / and /inbox
TenantOverride merge: not implemented; future Phase 7 scope
ActiveConfig runtime layer: not implemented; future Phase 7 scope
```

Phase 7B completed:

```text
Resolver contract: hardened
sectorId normalization: trim before registry lookup
undefined/null/empty/whitespace sectorId: baseline fallback
unknown sectorId: baseline fallback
known/default sectorId: registry value
Fallback source: baselineSectorDna / energyDna
Resolver output: SectorDna
Resolver side effects: none
Registry contents: energyDna only
TenantOverride runtime: not implemented
ActiveConfig runtime layer: not implemented
Test package/config: not added
```

## Product Focus

Arqon is designed as a premium customer operations command center, not a generic CRM dashboard.

Core areas:

```text
- Ultra Inbox command center
- Customer Intelligence executive brief
- Core Panel + Sector DNA separation
- Premium graphite / platinum SaaS interface
```

## Routes

Current app routes include:

```text
/
/inbox
/leadler
/musteri-kartlari
/sektor-modulleri
/sektorel-dna
/talep-havuzu
/teklifler
/kanal-yonetimi
/akilli-yanit-ayarlari
```

The `/teklifler`, `/kanal-yonetimi`, and `/akilli-yanit-ayarlari` routes are roadmap placeholders. They avoid 404 trust debt but do not implement real feature workflows yet.

## Development Commands

```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```

## Architecture Note

`activeDna` no longer directly exports `energyDna`; it flows through `resolveActiveDna()`, `sectorDnaRegistry`, and the deterministic `baselineSectorDna` / `energyDna` fallback.

`DnaProvider` is mounted route-level on `/` and `/inbox`; it is not mounted globally in `app/layout.tsx`.

This is not a full multi-tenant backend. `TenantOverride` merge, `ActiveConfig` runtime selection, and real tenant identity resolution remain future Phase 7 work.
