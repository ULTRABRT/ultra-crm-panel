# Ultra CRM - Claude Code Implementation Guardrails

Claude Code is an implementation engineer for this repo, not the product architect.

Architecture and master quality decisions come from the active user instruction and the current repo guardrails. Implementation should be narrow, clean, TypeScript-safe, and aligned with the existing codebase.

## Product Vision

Ultra CRM is not a simple CRM, chatbot, or demo dashboard.

Ultra CRM is an AI business intelligence panel for customer demand, sales follow-up, offers, customer memory, channel operations, Sector DNA, and operational decision-making.

## Core Principle

```text
Core Panel + Sector DNA + premium SaaS operations experience
```

Renewable Energy / Solify is the first Sector DNA example. The Core Panel must not become hardcoded to energy.

## Code Rules

```text
- Preserve working behavior.
- Stay inside the approved task scope.
- Avoid unrelated refactors.
- Do not add dependencies without explicit approval.
- Keep TypeScript clean.
- Turkish UI labels are allowed; TypeScript keys/ids/enums should stay ASCII.
- Touch Header, Sidebar, layout, and globals.css only when the task explicitly calls for it.
- Explain changed files and why after implementation.
```

## Visual Language

Arqon visual language is premium graphite/platinum.

Ultra Inbox intentionally uses:

```text
- dark Arqon shell
- light/platinum inbox canvas
- calm premium spacing
- command-center hierarchy
- executive Customer Intelligence brief
```

Avoid:

```text
- neon/glow/gradient demo look
- dashboard card cemetery
- forcing desktop UI onto mobile
- broad visual rewrites without approval
```

Build and typecheck are necessary, but they are not the same thing as visual/product acceptance.

## Sector DNA Rules

```text
- Keep Sector DNA generic.
- Do not add sector === "energy" logic in Core components.
- Keep activeDna resolved through the Sector DNA registry and pure resolver.
- Keep resolver output as SectorDna.
- Phase 7B resolver contract hardening is complete.
- Keep sectorId normalization and baselineSectorDna fallback behavior intact.
- Leave TenantOverride merge and ActiveConfig runtime behavior to future explicitly scoped work.
- Do not claim a multi-tenant backend or real tenant identity resolver exists.
- Do not mount DnaProvider globally.
- Do not mount ChannelSignalProvider unless explicitly scoped.
- Do not add Mail to canonical ChannelSignal.
```

## Working Protocol

```text
1. Read the task.
2. Inspect the relevant files.
3. Keep edits scoped.
4. Run requested validation.
5. Report changed files, validation results, and remaining risks.
6. Push only with explicit user approval.
```
