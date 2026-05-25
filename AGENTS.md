# AGENTS.md - Arqon / Ultra CRM Codex Guardrails

## Current Repo State

Project: Arqon / Ultra CRM Master Development

```text
Branch: main
Remote: https://github.com/ULTRABRT/ultra-crm-panel.git
Latest pushed HEAD: 28fc7bd4ddbdcf628ca6c7dd9c435d1f726a4d14 chore(release): polish responsive surface flow
Phase 10A trust/copy recheck: GREEN
Phase 10A-1 trust copy cleanup: completed and pushed
Phase 10B visual QA: completed after focused responsive polish
Phase 10B final recheck: GREEN
Working tree after latest push: clean
Typecheck: passed
Build: passed
```

Current handoff source:

```text
Use PHASE_10_RELEASE_HARDENING_SUMMARY.md as the primary current-state release handoff.
Use PHASE_9_CUSTOMER_MEMORY_NO_LOST_SCOPE.md for Phase 9 scope and trust policy context.
Repo terminal output remains the technical source of truth.
```

Completed phase chain:

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

Route reality:

```text
/leadler is the active lead route.
/leader is absent.
/teklifler is a local premium offers MVP surface.
/kanal-yonetimi is a local premium channel management MVP surface.
/akilli-yanit-ayarlari is a local premium smart reply governance MVP surface.
/musteri-kartlari includes the readonly Customer Memory Snapshot.
/leadler includes readonly lead risk advisory signals.
/teklifler includes readonly revenue risk advisory signals.
```

## Source Priority

Use this order when repo docs and implementation details conflict:

```text
1. Current user instruction
2. Repo terminal output and real files
3. PHASE_10_RELEASE_HARDENING_SUMMARY.md
4. AGENTS.md
5. README.md
6. CLAUDE.md
7. PHASE_9_CUSTOMER_MEMORY_NO_LOST_SCOPE.md for Phase 9 policy context
8. Archived/source-pack materials, when present
```

Main rule:

```text
Repo output is technical truth. Current user instruction controls the active task. Docs must not override the real working tree.
```

## Roadmap And Approval Rules

```text
- Do not leave the roadmap without explicit user approval.
- Do not start the next implementation phase without explicit user approval.
- Do not rewrite existing good product surfaces without audit and approval.
- In docs-only tasks, do not change code.
- In audit-only tasks, do not change files.
- Commit only when the user explicitly asks for a commit.
- Push only when the user explicitly approves push.
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
- Add energy-specific branching in Core components.
- Mount DnaProvider globally in app/layout.tsx.
- Mount ChannelSignalProvider.
- Add Mail to the canonical ChannelSignal type.
- Implement a fake tenant resolver.
- Add real API calls or real message sending.
- Claim TenantOverride merge, ActiveConfig runtime, or multi-tenant backend exists before implementation.
- Add a new package without explicit user approval.
```

Current DNA state:

```text
data/dna/active.ts exports activeDna from resolveActiveDna().
data/dna/resolveActiveDna.ts returns SectorDna.
data/dna/sectorRegistry.ts owns the current Sector DNA registry.
sectorDnaRegistry currently starts with energyDna only.
baselineSectorDna is the deterministic fallback.
Missing, unknown, empty, or whitespace sectorId falls back to baselineSectorDna / energyDna.
/ and /inbox use route-level DnaProvider dna={activeDna}.
app/layout.tsx does not mount DnaProvider globally.
TenantOverride merge and ActiveConfig runtime remain future explicitly scoped work.
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

## Phase 9 And Release Trust Boundaries

Phase 9 surfaces are readonly/advisory/local fixture surfaces unless a later
approved phase adds durable infrastructure.

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
No No Lost runtime service.
```

Allowed language:

```text
- readonly snapshot
- advisory signal
- local evidence snapshot
- human approval required
- backend required before durable action
- potential revenue risk
```

Do not claim that the system saved, learned, synced, created records, mutated
records, assigned work, changed status, or proved financial loss unless a
future approved phase implements the required backend and audit trail.

## Release Hardening Truth

```text
Phase 10A trust/copy gate: GREEN
Phase 10A-1 copy cleanup: pushed
Phase 10B visual QA: WATCH before polish
Phase 10B-1 responsive surface polish: pushed
Phase 10B final recheck: GREEN
Forbidden legacy trust copy: removed from release grep
Visual surface gate: clean for current local MVP scope
```

Known non-blocking grep context:

```text
Broad guardrail grep can still find old fixture/type/boot labels.
Those are not new runtime actions and should be evaluated in context.
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
