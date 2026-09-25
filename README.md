[![Netlify Status](https://api.netlify.com/api/v1/badges/95373137-bf1d-4a24-8730-3febcb3e4631/deploy-status?branch=main)](https://app.netlify.com/projects/alexa-lashes/deploys)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6c9f2f69-c86d-4e78-9d96-ec1f40cf7367/deploy-status)](https://app.netlify.com/projects/admin-alexa-lashes/deploys)

# Alexa Lashes

A [Turborepo](https://turborepo.dev)/[Bun](https://bun.sh) monorepo for Alexa Lashes, a lash studio
business: a public marketing site and an internal admin app, backed by a shared Postgres (Neon)
database via [Drizzle ORM](https://orm.drizzle.team) and [Better Auth](https://www.better-auth.com).

## Apps & packages

### Apps

- **`apps/marketing`** — public site. React 19 + TanStack Start (file-based routing, SSR) + Vite +
  Tailwind CSS v4, i18n via [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
  (`sk` base locale, `en`/`ru` prefixed), deployed to Netlify.
- **`apps/admin`** — internal admin dashboard (SPA). Same stack, Google OAuth via Better Auth,
  gated by an allow-list (`allowed_email` table) — no self-service signup. Currently manages
  customer reviews (list per locale, edit name/rating/url/translations). Deployed to Netlify.

### Packages

- **`packages/db`** — Drizzle schema (`reviews`, `review_translations`, `allowed_email`, Better
  Auth's own tables), query functions, and the shared `db` client (`drizzle-orm/neon-http` against
  Neon serverless Postgres).
- **`packages/auth`** — shared Better Auth instance/config, server helpers (`getSession`,
  `ensureSession`) and client helpers (`signIn`, `signOut`, ...) for the admin app.
- **`packages/ui`** — shared React components: custom components, [shadcn/ui](https://ui.shadcn.com)
  wrappers (built on [Base UI](https://base-ui.com)), [Lucide](https://lucide.dev) icons, and the
  single Tailwind entry (`styles.css`) both apps import.
- **`packages/contracts`** — hand-written [Zod](https://zod.dev) schemas for API/DB input shapes
  (e.g. `createReviewSchema`/`updateReviewSchema`) and their inferred TypeScript types — the single
  source of truth for validation, shared by `packages/db`'s query layer and the admin app's server
  functions.
- **`packages/types`** — small, dependency-free shared primitives (currently `locales`/`baseLocale`/
  `Locale`) used across packages without creating circular package dependencies.

## Tech stack

- **Package manager**: [Bun](https://bun.sh) (`bun@1.3.14`, pinned via `mise.toml`)
- **Monorepo orchestration**: [Turborepo](https://turborepo.dev) (`turbo.json`)
- **Framework**: [TanStack Start](https://tanstack.com/start) (file-based router + SSR) on React 19
  and Vite, deployed to [Netlify](https://netlify.com)
- **Data**: [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) serverless Postgres
- **Auth**: [Better Auth](https://www.better-auth.com) (Google OAuth)
- **Validation**: [Zod](https://zod.dev)
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Data fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) on
  [Base UI](https://base-ui.com)
- **i18n** (marketing only): [Paraglide JS](https://inlang.com)
- **Lint/format**: [oxlint](https://oxc.rs) / [oxfmt](https://oxc.rs)
- **Git hooks**: [lefthook](https://lefthook.dev) + [commitlint](https://commitlint.js.org)

There is no test suite/framework configured in this repo (no vitest/jest/playwright).

## Getting started

Requires Bun `1.3.14` (see `mise.toml` if you use [mise](https://mise.jdx.dev)).

```bash
bun install
```

Create a `.env` file at the repo root (see [Environment variables](#environment-variables) below),
then:

```bash
bun run dev      # runs all apps in dev mode (marketing + admin on port 3000)
bun run build    # builds all apps/packages, respecting the dependency graph
```

Scope a command to a single app/package with Turborepo's `--filter`:

```bash
bun run dev --filter=alexa-lashes/admin
bun run build --filter=alexa-lashes/admin
```

Other root scripts:

```bash
bun run lint            # oxlint
bun run format          # oxfmt --check
bun run format:write    # oxfmt (fixes in place)
bun run clean           # remove build outputs, node_modules, and the lockfile everywhere
```

`packages/db` has its own scripts (run from `packages/db`, needs `packages/db/.env`):

```bash
bun run db:generate          # generate a Drizzle migration from schema changes
bun run db:push              # push schema directly to the DB
bun run db:studio            # open Drizzle Studio
bun run better-auth:generate # regenerate auth-schema.ts from packages/auth's config
bun run seed:email           # seed the allowed_email table
bun run seed:review          # seed a sample review
```

## Environment variables

Root `.env` (loaded via `bun --env-file=../../.env`) and `packages/db/.env` (for Drizzle CLI
commands run from that package):

- `DATABASE_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `EMAIL_ADDRESS`
- `EMAIL_PASSWORD`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_GOOGLE_ANALYTICS_API_KEY`

## Branching & deployment

- Branch names: `<type>/<short-description>` (e.g. `fix/dashboard`), same types as commits (below).
- Deployment is fully automatic via Netlify, no manual/CI deploy step:
  - Pushing to any remote branch triggers a Netlify **branch deploy** (preview) for both apps.
  - Merging a PR into `main` triggers a Netlify **production deploy** for both apps immediately.
- `.github/workflows/codeql.yml` runs CodeQL security analysis on push/PR to `main` and weekly.
  There is no CI workflow for build/lint/test — those run locally via git hooks.

## Commit messages

Enforced by `commitlint` (lefthook `commit-msg` hook) — [Conventional Commits](https://www.conventionalcommits.org),
restricted to: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`,
`test`. Example: `feat: added new feature [TICKET-ID]`.

`pre-commit` runs `oxfmt --fix` and `oxlint --fix` against staged files automatically.

## More details

See `CLAUDE.md` for a deeper architecture walkthrough (server-function/query layer conventions,
auth flow, i18n locale strategy, and coding conventions).

This repo also uses [Claude Code](https://claude.com/claude-code) skills for common workflows
(`.claude/skills/`) — check that directory for the current list, as it grows over time.
