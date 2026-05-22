# AGENTS.md - Arqon / Ultra CRM Codex Guardrails

## Current Repo State

Project: Arqon / Ultra CRM Master Development

```text
Branch: main
Remote: https://github.com/ULTRABRT/ultra-crm-panel.git
Current HEAD: 184737c64b0a5512b7582be187fdabf279483d1e
Latest commit: refactor(dna): resolve active dna through sector registry
Post-Phase 6 handoff baseline HEAD: b23c61c4114b06b8134194ae7b4b75e053fdf5cc
Latest repo handoff commit: b23c61c4114b06b8134194ae7b4b75e053fdf5cc docs: update post-phase 6 repo handoff
Latest pushed product commit: e9088ecefabb9500f7d5018db95fc18e8dd08a86 fix(inbox): refine final mobile visual polish
Post-Phase 6 Quality Sweep: completed and pushed
Phase 7A registry + pure resolver: completed and pushed
Working tree after Phase 7A push: clean
Typecheck: passed
Build: passed after Google Fonts network retry
```

Post-Phase 6 sweep outcomes:

```text
QS2 responsive polish: completed
QS3 route hygiene: completed
QS4 tenant resolver: audited only; real resolver deferred to Phase 7
QS5 final mobile visual polish: completed
QS6 final technical gate: passed
```

Phase 7A outcomes:

```text
Sector DNA registry: added
Resolver: pure resolveActiveDna() function
activeDna source: resolveActiveDna() output
Resolver output: SectorDna
Initial registry contents: energyDna only
Missing/unknown sectorId fallback: baseline energyDna
TenantOverride merge: not implemented; Phase 7B
ActiveConfig runtime layer: not implemented; Phase 7B
Fake tenant resolver: not implemented
```

Implemented route hygiene placeholders:

```text
/teklifler
/kanal-yonetimi
/akilli-yanit-ayarlari
```

These are roadmap placeholders only. They close navigation trust debt without implementing real offer management, channel management, or AI reply settings workflows.

## Source Priority

Use this order when repo docs and implementation details conflict:

```text
1. AGENTS.md
2. Current user instruction
3. Repo terminal output and real files
4. README.md
5. CLAUDE.md
6. Archived/source-pack materials, when present
```

Main rule:

```text
Repo output is technical truth. Current user instruction controls the active task. Docs must not override the real working tree.
```

## Architecture Guardrails

Keep the Core Panel + Sector DNA separation intact.

Do:

```text
- Keep Core components generic.
- Read Sector DNA through typed context/data contracts.
- Keep activeDna resolved through the Sector DNA registry and pure resolver.
- Keep resolver output as SectorDna.
- Keep DnaProvider route-level on / and /inbox.
- Preserve the Ultra Inbox command-center behavior.
```

Do not:

```text
- Add sector === "energy" logic in Core components.
- Mount DnaProvider globally in app/layout.tsx.
- Mount ChannelSignalProvider.
- Add Mail to the canonical ChannelSignal type.
- Implement a fake tenant resolver.
- Add real API calls or real message sending.
- Implement No Lost Money or No Lost Lead integrations unless explicitly scoped.
- Claim TenantOverride merge, ActiveConfig runtime, or multi-tenant backend exists before implementation.
- Add a new package without explicit user approval.
```

Current DNA state:

```text
data/dna/active.ts exports activeDna from resolveActiveDna().
data/dna/resolveActiveDna.ts returns SectorDna.
data/dna/sectorRegistry.ts owns the current Sector DNA registry.
sectorDnaRegistry currently starts with energyDna only.
Missing or unknown sectorId falls back deterministically to baseline energyDna.
/ and /inbox use route-level DnaProvider dna={activeDna}.
app/layout.tsx does not mount DnaProvider globally.
TenantOverride merge and ActiveConfig runtime are deferred to Phase 7B.
No real tenant identity source, auth/session resolver, or multi-tenant backend is implemented yet.
```

## Product And UI Guardrails

Arqon is a premium customer operations command center, not a generic CRM dashboard.

Visual language:

```text
- Premium graphite / white / platinum
- Dark Arqon shell
- Light/platinum Ultra Inbox canvas where scoped
- Calm, dense, operational spacing
- Clear command hierarchy
```

Avoid:

```text
- Neon/glow/gradient demo look
- Dashboard card cemetery
- Broad visual rewrites without approval
- Forcing desktop UI into mobile viewports
```

Ultra Inbox must preserve:

```text
- local search
- platform filter
- quick filters
- active conversation selection
- Customer Intelligence brief update
- AI Kullan / Duzenle / Reddet behavior
- composer auto-grow
- zero horizontal overflow
```

## Quality Sweep Truth

The Post-Phase 6 Quality Sweep is complete.

Known completed items:

```text
- QS2 tablet/mobile responsive polish
- QS3 minimal route hygiene placeholders
- QS4 activeDna tenant resolver preflight
- QS5 final mobile visual polish
- QS6 final technical gate
- Push to GitHub main
- Phase 7A registry + pure resolver
```

Known remaining debt:

```text
- TenantOverride merge and ActiveConfig runtime layer are Phase 7B.
- Real tenant identity source/backend/auth/session selection remains unresolved.
- Placeholder routes are not real feature modules yet.
```

## Development Rules

Before changing files:

```text
- Inspect existing patterns first.
- Keep edits scoped.
- Do not touch forbidden architecture unless explicitly requested.
- Do not add packages without explicit approval.
- Do not push without explicit user approval.
```

After implementation, run the checks requested by the user. When not otherwise specified, use:

```bash
git status --short
git diff --stat
npx tsc --noEmit
npm run build
git status --short
```

## Git Rules

```text
Branch: main
Remote: origin -> https://github.com/ULTRABRT/ultra-crm-panel.git
Push policy: push only with explicit user approval.
```

Commits are allowed only when the user explicitly requests a commit for the current task.
