# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Turborepo/Bun monorepo for Alexa Lashes (a lash studio business): a public marketing site and an
internal admin app, backed by a shared Postgres (Neon) database via Drizzle ORM and Better Auth.

- `apps/marketing` — public site (TanStack Start/React, SSR, i18n via Paraglide, deployed to Netlify)
- `apps/admin` — internal admin dashboard (TanStack Start/React (SPA), Google OAuth via Better Auth, deployed to Netlify)
- `packages/db` — Drizzle schema, queries, and the shared `db` client (Neon serverless Postgres)
- `packages/auth` — shared Better Auth instance/config (`index.ts`), server helpers (`server.ts`), client helpers (`client.ts`)
- `packages/ui` — shared React components, shadcn/ui wrappers, tsx icons, lucide icons, and Tailwind styles

Package manager is **Bun** (`packageManager: bun@1.3.14`, see `mise.toml`). Workspaces are `apps/*` and
`packages/*`, with a `catalog` in the root `package.json` pinning `typescript`, `vite`, and `@types/bun`
versions shared across packages.

## Commands

Run from the repo root unless noted. Turborepo (`turbo.json`) orchestrates tasks across workspaces.

- `bun install` — install all workspace dependencies
- `bun run dev` — run all apps in dev mode (each app's `dev` script also depends on `^build` and the
  `watch` tasks of `@alexa-lashes/ui`, `@alexa-lashes/db`, `@alexa-lashes/auth`, so package changes hot-reload)
- `bun run build` — build all apps/packages (`turbo run build`, respects the dependency graph via `dependsOn: ["^build"]`)
- `bun run lint` — lint everything with oxlint (config: `.oxlintrc.json`)
- `bun run format` — check formatting with oxfmt (config: `.oxfmtrc.json`); `bun run format:write` to fix
- `bun run clean` — remove build outputs, `node_modules`, and lockfile across the whole repo

Scoping to a single app/package (Turborepo filter), e.g. only the admin app:

- `bun run dev --filter=alexa-lashes/admin`
- `bun run build --filter=alexa-lashes/admin`

Per-package scripts (run inside `apps/<app>` or `packages/<pkg>`):

- Apps (`apps/admin`, `apps/marketing`): `bun run dev` (Vite dev server on port 3000), `bun run build`
  (generates TanStack routes then builds), `bun run generate-routes` / `bun run watch-routes` (TanStack
  Router codegen for `routeTree.gen.ts` — regenerate after adding/renaming files under `src/routes`)
- `packages/db`: `bun run db:generate` (Drizzle migration from schema changes), `bun run db:push` (push
  schema directly to the DB), `bun run db:studio` (Drizzle Studio), `bun run better-auth:generate`
  (regenerate `src/schema/auth-schema.ts` from the Better Auth config in `packages/auth`), `bun run
seed:email` / `bun run seed:review` (seed scripts under `src/seed`)
- `packages/db`, `packages/auth`, `packages/ui`: `bun run build` (`tsc`), `bun run watch` (`tsc --watch`)

There is no test suite/framework configured in this repo (no vitest/jest/playwright).

### Git hooks (lefthook)

`lefthook.yml` runs on commit and is the source of truth for required formatting/lint/commit-message rules:

- pre-commit: `oxfmt --fix` and `oxlint --fix` against staged files (auto-stages fixes)
- commit-msg: `commitlint` — commit headers must follow Conventional Commits, restricted to types
  `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`, max header length 260
  (see `commitlint.config.ts`). Example: `feat: added new feature [TICKET-ID]`

## Branching & deployment

- Branch names must follow `<type>/<short-description>`, e.g. `fix/dashboard`, `feat/review-list`
  (same types as commit messages: `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`).
- Deployment is fully automatic via Netlify — there is no manual deploy step or CI deploy job:
  - Pushing a commit to any remote branch triggers a Netlify **branch deploy** (preview) for both
    `apps/admin` and `apps/marketing` (each has its own Netlify site/config, see their `netlify.toml`).
  - Opening a PR into `main` and merging it triggers a Netlify **production deploy**.
  - So merging to `main` ships to production immediately — treat PRs into `main` accordingly.

## GitHub Actions

Workflow files live in `.github/workflows`. Currently only one workflow exists:

- `codeql.yml` — CodeQL security analysis (`javascript-typescript`) on push/PR to `main` and a weekly
  schedule (Mondays 02:30 UTC). There is no CI workflow for build/lint/test — those only run locally
  via the lefthook git hooks above.

## Environment variables

Root `.env` (loaded by app dev/build scripts via `bun --env-file=../../.env`) and `packages/db/.env`
(for Drizzle CLI commands run from that package) hold: `DATABASE_URL`, `BETTER_AUTH_URL`,
`BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `EMAIL_ADDRESS`, `EMAIL_PASSWORD`,
`VITE_GOOGLE_MAPS_API_KEY`, `VITE_GOOGLE_ANALYTICS_API_KEY`. These are also declared as `turbo.json`
`build.env` passthrough vars.

## Architecture notes

**Stack**: TanStack Start (file-based router + SSR) + React 19 + Vite + Tailwind CSS v4, deployed to
Netlify via `@netlify/vite-plugin-tanstack-start`. Both apps use TanStack Router's file-based routing
under `src/routes`; `routeTree.gen.ts` is generated — don't hand-edit it, run `generate-routes`/`watch-routes`.

**Server functions vs. data-fetching layer**: both apps follow a consistent split:

- `src/server/*.ts` — `createServerFn` definitions that call into `@alexa-lashes/db` queries (these run
  server-side and are the only place DB queries are invoked from an app)
- `src/effects/*.ts` (admin) — `queryOptions()` or `mutationOptions()` wrappers around server functions, consumed by
  TanStack Query in routes/components
  Keep new server-touching logic in this shape: DB query in `packages/db/src/queries`, thin
  `createServerFn` wrapper in the app's `src/server`, `queryOptions`/`mutationOptions` wrapper in `src/effects` if
  used with TanStack Query.

**Auth (`packages/auth` + admin app)**: Better Auth instance is defined once in `packages/auth/src/index.ts`
(Drizzle Postgres adapter, Google OAuth only, `tanstackStartCookies()` plugin). Sign-in is gated by an
allow-list — `validateUserInfo` checks the Google account's email against `isEmailAllowed` (see
`packages/db/src/queries/allowed-email.ts` / `schema/allowed-email-schema.ts`) and rejects unlisted
emails with `email_not_allowed`. `packages/auth/src/server.ts` exports `getSession`/`ensureSession`
server functions; `packages/auth/src/client.ts` exports the `better-auth/react` client (`signIn`,
`signOut`, etc.). The admin app wires this up via:

- `src/routes/api/auth/$.ts` — catch-all route that forwards requests to `auth.handler`
- `src/routes/_authenticated.tsx` — the public sign-in page; redirects to `/dashboard` if already signed in
- `src/routes/_protected.tsx` — layout route guarding everything under it; redirects to `/` if no session
  Only Google accounts present in the `allowed_email` table can sign in — there is no self-service signup.

**Database (`packages/db`)**: Neon serverless Postgres via `drizzle-orm/neon-http`, single shared `db`
client exported from `src/index.ts` combining `authSchema`, `reviewsSchema`, `allowedEmailSchema`.
Schema files live in `src/schema/*.ts`; `auth-schema.ts` is generated by Better Auth CLI
(`better-auth:generate`) and shouldn't be hand-edited — change the auth config in `packages/auth`
instead and regenerate. Query functions live in `src/queries/*.ts` and are exported per-file via the
package's `exports` map (`@alexa-lashes/db/queries/*`, `@alexa-lashes/db/schema/*`), so a new query
file is automatically consumable without touching `package.json`.

**i18n (marketing app only)**: uses `@inlang/paraglide-js` with output compiled into
`src/paraglide/` (generated — don't hand-edit; source strings live in the inlang project config).
Locale strategy is URL-based: `sk` is the base/unprefixed locale, `en` and `ru` are prefixed
(`/en/...`, `/ru/...`) per the `urlPatterns` in `apps/marketing/vite.config.ts`. `src/server.ts` wraps
the TanStack Start server entry with `paraglideMiddleware`.

**UI package (`packages/ui`)**: exports are split by subpath — `@alexa-lashes/ui/components` (custom
components), `@alexa-lashes/ui/shadcn` (shadcn/ui-based components), `@alexa-lashes/ui/icons`,
`@alexa-lashes/ui/lib/*`, plus `@alexa-lashes/ui/styles.css` — the single Tailwind entry for both
custom and shadcn components (brand theme tokens, `shadcn/tailwind.css`, and `@source` over the whole
ui package). Apps import only this stylesheet; don't add a second `@import 'tailwindcss'` file.
shadcn config (`packages/ui/components.json`) targets `style: new-york`, base color `neutral`, no
Tailwind config file (Tailwind v4 CSS-based config). Run `shadcn` CLI commands from `packages/ui` (or
from `apps/admin`, which also depends on the `shadcn` CLI) when adding new shadcn components, then move
generated files into `packages/ui/src/components/shadcn` if needed and update imports if needed in generated files.

**Path aliases**: within each app, `@/*` maps to that app's `src/*` (see each app's `tsconfig.json`);
cross-package imports use the `@alexa-lashes/*` workspace package names, not relative paths.

## Conventions

- Import order/grouping and most formatting is enforced by oxfmt (`sortImports.groups`:
  side-effect → builtin/external → sibling/parent → style); run `bun run format:write` rather than
  hand-formatting.
- `packages/db/src/schema/*.ts` and `*.gen.ts` files are excluded from lint/format ignore patterns
  where generated — treat `auth-schema.ts`, `routeTree.gen.ts`, and `src/paraglide/**` as generated output.
- Commit messages must be Conventional Commits with one of the types listed above; this is enforced by
  the `commit-msg` git hook, not optional style guidance.
- React components are always `const` arrow functions, never `function` declarations. Props are
  always declared with `type` (never `interface`) and named `{ComponentName}Props`:

  ```tsx
  type ReviewListProps = {
    locale: Locale;
  };

  const ReviewList = ({ locale }: ReviewListProps) => {
    // ...
  };
  ```

  In route files, declare the components above `export const Route` (a `const` can't be used before
  its declaration).
