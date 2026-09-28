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
- `packages/contracts` — hand-written Zod schemas (e.g. `createReviewSchema`/`updateReviewSchema`) and
  their inferred types — the single source of truth for input validation, shared by `packages/db`'s
  query layer and the admin app's server functions
- `packages/types` — small, dependency-free shared primitives (currently `locales`/`baseLocale`/
  `Locale`) used across packages without creating circular package dependencies

Package manager is **Bun** (`packageManager: bun@1.3.14`, see `mise.toml`). Workspaces are `apps/*` and
`packages/*`, with a `catalog` in the root `package.json` pinning `typescript`, `vite`, and `@types/bun`
versions shared across packages.

## Commands

Run from the repo root unless noted. Turborepo (`turbo.json`) orchestrates tasks across workspaces.

- `bun install` — install all workspace dependencies
- `bun run dev` — run all apps in dev mode (each app's `dev` script also depends on `^build` and the
  `watch` tasks of `@alexa-lashes/ui`, `@alexa-lashes/db`, `@alexa-lashes/auth`, `@alexa-lashes/contracts`,
  `@alexa-lashes/types`, so package changes hot-reload)
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
- `apps/marketing` only: `bun run generate-reviews` (fetches reviews from the DB per locale and writes
  `src/data/reviews.json`; chained automatically into both `dev` and `build`, needs
  `DATABASE_URL` — see Architecture notes below)
- `packages/db`: `bun run db:generate` (Drizzle migration from schema changes), `bun run db:push` (push
  schema directly to the DB), `bun run db:studio` (Drizzle Studio), `bun run better-auth:generate`
  (regenerate `src/schema/auth-schema.ts` from the Better Auth config in `packages/auth`), `bun run
seed:email` / `bun run seed:review` (seed scripts under `src/seed`), `bun run backfill:review-order`
  (one-off script to renumber `display_order` across all reviews)
- `packages/db`, `packages/auth`, `packages/ui`, `packages/contracts`, `packages/types`: `bun run build`
  (`tsc`), `bun run watch` (`tsc --watch`)

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

`NETLIFY_MARKETING_BUILD_HOOK_URL` (root `.env` only) is the admin app's exception: it's only read at
request time by a server function (`apps/admin/src/server/deploy.ts`), never at build time, so it's
not in the `turbo.json` passthrough list above. It holds a Netlify build hook URL (site settings →
Build hooks, on the `apps/marketing` Netlify site) — posting to it triggers a production deploy of
`apps/marketing` from `main`. The admin dashboard's "Deploy marketing site" button (next to "Add
review") calls it, since `apps/marketing`'s reviews are baked in at build time (see the marketing
app's `generate-reviews` script) — adding/editing/deleting a review in admin has no effect on the
live site until this is triggered. For this to work in production (not just local dev), the same var
must also be added to the **admin** Netlify site's environment variables (not the marketing site's).

## Architecture notes

**Stack**: TanStack Start (file-based router + SSR) + React 19 + Vite + Tailwind CSS v4, deployed to
Netlify via `@netlify/vite-plugin-tanstack-start`. Both apps use TanStack Router's file-based routing
under `src/routes`; `routeTree.gen.ts` is generated — don't hand-edit it, run `generate-routes`/`watch-routes`.

**Server functions vs. data-fetching layer**: both apps follow a consistent split:

- `src/server/*.ts` — `createServerFn` definitions that call into `@alexa-lashes/db` queries (these run
  server-side and are the only place DB queries are invoked from an app). Mutation inputs are validated
  with `@alexa-lashes/contracts` schemas (e.g. `createReviewSchema`), which are also reused as-is inside
  the corresponding `packages/db/src/queries` function — don't re-declare validation ad hoc in either place.
- `src/effects/*.ts` (admin) — `queryOptions()` or `mutationOptions()` wrappers around server functions, consumed by
  TanStack Query in routes/components
  Keep new server-touching logic in this shape: Zod schema in `packages/contracts` if it's a mutation,
  DB query in `packages/db/src/queries`, thin `createServerFn` wrapper in the app's `src/server`,
  `queryOptions`/`mutationOptions` wrapper in `src/effects` if used with TanStack Query.

For wiring those `queryOptions`/`mutationOptions` into TanStack Router itself — route `context` shape
(pre-invoked vs. factory-function query options), `Route.useRouteContext()` (never destructure it),
`staleTime: 'static'` vs `.catch(noop)`, and when a loader should `await` — see the
`tanstack-router-patterns` skill; don't duplicate those conventions here.

**Exception — reviews on the marketing site are fetched at build time, not via `src/server`**:
`apps/marketing/src/scripts/generate-reviews.ts` writes `apps/marketing/src/data/reviews.json` from
the DB (run via the `generate-reviews` script, wired into both `dev` and `build`), and
`routes/index.tsx` imports it directly — see `NETLIFY_MARKETING_BUILD_HOOK_URL` above for why a
Netlify rebuild is needed after editing reviews in admin.

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
instead and regenerate. Reviews are split across two tables: `reviews` (name, rating, url, `enabled`,
`displayOrder`) and `review_translations` (per-locale `description`, one row per `(reviewId, locale)`,
cascade-deleted with the review) — see `schema/reviews-schema.ts`. Query functions live in
`src/queries/*.ts` and are exported per-file via the package's `exports` map
(`@alexa-lashes/db/queries/*`, `@alexa-lashes/db/schema/*`), so a new query file is automatically
consumable without touching `package.json`.

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
  where generated — treat `auth-schema.ts`, `routeTree.gen.ts`, `src/paraglide/**`, and
  `apps/marketing/src/data/reviews.json` as generated output.
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

## Accessibility (marketing app)

Target is WCAG 2.2 AA. These house rules came out of earlier a11y fixes. Keep them when editing
`apps/marketing` or shared `packages/ui` styles. The `a11y-auditor` subagent checks against them:

- Gold text/outlines on light backgrounds use `--primary-strong` (`text-primary-strong`,
  `outline-primary-strong`), never raw `--primary` or `brightness-*` hacks. `--primary` is fine for
  backgrounds/borders/decoration.
- Heading levels follow document structure (one `h1` per page, no skipped levels). Kickers, item
  labels, and other styled text use `p`/`span`, not headings.
- `__root.tsx` owns the skip link (`m.skip_to_content()`) → `<main id="main-content">` and
  `<html lang={getLocale()}>`. Don't add another `main`, and don't remove or retarget the skip link.
- Form fields wire errors via `aria-describedby="{field.name}-error"` (only while touched and invalid),
  with a matching `id` on `FieldError`.
- Active nav links get `aria-current` plus a non-color cue (background pill + weight), not color alone.
- Clickable things are `button`/`a`, never `div`/`img` with `onClick`. Icon-only buttons need an
  `aria-label` from Paraglide, and touch targets are at least 24×24px (44×44 preferred).
- User-facing strings, including `alt`/`aria-label`, come from Paraglide (`messages/{sk,en,ru}.json`),
  with the key present in all three locales. Decorative images use `alt=""`.
- Embedded iframes/maps have a `title` or labelled region.

Run the `a11y-auditor` subagent only when the user asks for it. When the user asks for a commit,
`/summarize-changes`, or `/pr-description` and the diff touches `apps/marketing` UI (components,
routes, messages) or `packages/ui` styles, suggest running it in one line. Don't run it automatically.

## SEO (marketing app)

The `seo-auditor` subagent checks `apps/marketing` against these house rules:

- Every page route has a `head()` with `title` and `description` from `m.meta_<page>_title/desc()`,
  a full Open Graph set (`og:type`, `og:title`, `og:description`, `og:image`), and hreflang
  `alternate` links for `sk`, `en`, `ru` plus `x-default` (= `sk`).
- All URLs in meta/links/JSON-LD are absolute on `https://alexalashes.sk`. `og:image` points to a file
  that exists in `apps/marketing/public/`.
- URLs: `sk` has no prefix, `en`/`ru` are `/en/...`/`/ru/...` (see `urlPatterns` in `vite.config.ts`).
  Use one trailing-slash style across hreflang, canonical and `sitemap[.]xml.ts`. Non-home pages
  currently use a trailing slash in hreflang.
- Every `meta_*` message exists and is translated in `messages/sk.json`, `en.json`, `ru.json`.
- `sitemap[.]xml.ts` lists every indexable route once per locale. Add new routes there.
- Business facts (name, address, phone, geo, opening hours, social links) must match everywhere:
  `index.tsx` `BeautySalon` JSON-LD, other JSON-LD `location`/`provider`, `Footer`, `contact.tsx`.
  Prices in JSON-LD must match the prices shown on the page.
- JSON-LD types per page: `index` → `BeautySalon`, `prices` → `Service` + `OfferCatalog`,
  `training/*` → `Course`. Localized fields use `m.*()`.

Run the `seo-auditor` subagent only when the user asks for it. Before starting it, always ask the user
whether to include content suggestions (rewritten titles/descriptions in sk/en/ru, missing pages or
topics), then pass `suggestions: yes|no` in the prompt. When the user asks for a commit,
`/summarize-changes`, or `/pr-description` and the diff touches marketing routes, `head()`,
`messages/*.json`, `sitemap[.]xml.ts`, `public/robots.txt`, or images in `public/`, suggest running it
in one line. Don't run it automatically.
