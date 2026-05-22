# Arqon / Ultra CRM Panel

Arqon / Ultra CRM Panel is a premium CRM command panel focused on customer operations, Ultra Inbox, and the Core Panel + Sector DNA architecture.

## Current Status

```text
Status: Post-Phase 6 Quality Sweep completed
Branch: main
Remote HEAD: e9088ecefabb9500f7d5018db95fc18e8dd08a86
Tech gate: typecheck and build passing
```

Completed sweep items:

```text
QS2 responsive polish: completed
QS3 route hygiene: completed
QS4 activeDna tenant resolver: audited only; real resolver deferred to Phase 7
QS5 final mobile visual polish: completed
QS6 final technical gate: passed
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

`activeDna` remains a mock bridge backed by the energy Sector DNA. The real tenant/sector resolver is deferred to Phase 7.

`DnaProvider` is mounted route-level on `/` and `/inbox`; it is not mounted globally in `app/layout.tsx`.

