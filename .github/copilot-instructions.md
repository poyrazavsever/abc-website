# Copilot Instructions - ABC Site

## Mandatory Context

- Read `AGENTS.md` first. This project uses Next.js `16.2.4` with breaking changes.
- Before writing or changing Next.js code, check the relevant docs under `node_modules/next/dist/docs/`.
- Product requirements are defined in `PRD.md`.

## Product Scope

- Product: Ankara Build Club official website (marketing + member platform).
- Target architecture covers Faz 1, Faz 2, and Faz 3.
- Prioritize Faz 1 implementation order before expanding to later phases.

## Technical Decisions

- Framework: Next.js App Router + React 19 + TypeScript strict mode.
- Data/Auth: Supabase (Auth + Postgres).
- Styling: Tailwind CSS v4.
- Directory policy: Keep root-level structure (`app`, `components`, `lib`, `config`, `docs`).

## Architecture Conventions

- UI routes live under `app/`.
- API endpoints live under `app/api/`.
- Business logic lives under `lib/services/`.
- External providers live under `lib/integrations/`.
- Shared types/schemas live under `lib/types/` and `lib/schemas/`.
- Reusable UI components live under `components/` by domain.

## Phase-First Delivery Rules

- Faz 1 first: landing, auth/onboarding, profile, events, badges, projects/builders directories, base admin.
- Faz 2/3 features must not break Faz 1 interfaces.
- Add extension points instead of premature full implementations.

## Coding Guardrails

- Keep functions small and domain-focused.
- Avoid `any`; define explicit types.
- Prefer server-side patterns by default; opt into client components only when necessary.
- Do not hardcode secrets or tokens; use environment variables.
- For required environment variables, use the shared `getEnv` helper in `lib/utils/env.ts` instead of inline `process.env` checks.
- For Luma, email, analytics, and LLM integrations, build adapters under `lib/integrations/`.

## Theme Color Rules

- Use only color tokens declared in `app/globals.css` inside `@theme`.
- Do not add custom `neutral-*` tokens; use Tailwind default neutrals when needed.
- Prefer direct semantic utility classes like `bg-primary`, `text-primary`, `border-primary`, `bg-secondary`, `text-success`, `bg-surface`, `text-text`.
- Do not use arbitrary variable utilities such as `text-[var(--color-primary)]` or `bg-[var(--color-primary-600)]` unless explicitly requested.
- Do not introduce new raw hex colors in components; add or update theme tokens first if a new color is required.

## Quality Checks

- Run `npm run lint` after meaningful code edits.
- Keep README and architecture docs aligned when folder structure changes.
- If a structural change affects phases or modules, update `docs/architecture/structure-plan.md`.
