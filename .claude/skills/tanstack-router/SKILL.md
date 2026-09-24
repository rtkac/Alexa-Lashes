---
name: tanstack-router
description: TanStack Router conventions for this project. Use this skill when creating, modifying, or reviewing TanStack Router routes, route context, loaders, query dependencies, or route components.
---

# TanStack Router conventions

These conventions apply to routes that use TanStack Query — currently `apps/admin`. `apps/marketing`
does not use TanStack Query (no `QueryClient` in its router context); its routes call server functions
directly, so the query-in-context pattern below does not apply there.

## Data layer shape

Every query used by a route goes through three layers (see CLAUDE.md):

1. DB query in `packages/db/src/queries/*.ts`
2. `createServerFn` wrapper in `apps/<app>/src/server/*.ts`
3. `queryOptions()` / `mutationOptions()` factory in `apps/admin/src/effects/*.ts`

`apps/admin/src/effects/reviews.ts`:

```ts
export const fetchReviewsOptions = () =>
  queryOptions({
    queryKey: ['reviews'],
    queryFn: () => getReviews({ data: { locale: 'sk' } }),
  });
```

Effects are exported as factory functions named `fetch<Thing>Options`, and the route context key uses
the same name.

## Query dependencies in route context

The `queryClient` is provided once in the root context (`apps/admin/src/router.tsx` →
`context: { queryClient }`, typed in `src/routes/__root.tsx` via `createRootRouteWithContext`).
Never create a new `QueryClient` or import one elsewhere — use `context.queryClient`.

When a route needs a query, put its options in the route's `context`, use them from `context` in
`loader`/`beforeLoad`, and read them in the component via `Route.useRouteContext()`. Do not call the
effect factory again inside the component.

`apps/admin/src/routes/_protected/dashboard/index.tsx`:

```tsx
function RouteComponent() {
  const context = Route.useRouteContext();

  const { data: reviews } = useSuspenseQuery({
    ...context.fetchReviewsOptions,
    select: (data) => data.toSorted((a, b) => b.displayOrder - a.displayOrder),
  });
  // ...
}

export const Route = createFileRoute('/_protected/dashboard/')({
  context: () => ({
    fetchReviewsOptions: fetchReviewsOptions(),
  }),
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions, staleTime: 'static' });
  },
  component: RouteComponent,
});
```

Notes:

- Spread the context options into `useSuspenseQuery` and add component-specific options (`select`, …)
  there; don't bake them into the effect.
- The loader starts the fetch (not awaited) and the component suspends on `useSuspenseQuery`.
- Declare the component (`RouteComponent`) above `export const Route`, as in the existing routes.
- Don't add mutationOptions to the context, only add queryOptions.

## Prefetching in the loader: `staleTime: 'static'` vs `.catch(noop)`

How the loader prefetches depends on which hook the component uses to read the query. The loader
never awaits the prefetch.

**Component uses `useSuspenseQuery` or `useSuspenseQueries`** → pass `staleTime: 'static'` in the loader:

```tsx
loader: ({ context }) => {
  context.queryClient.query({ ...context.fetchReviewsOptions, staleTime: 'static' });
},
```

**Component uses `useQuery` or `useQueries`** → pass the options as they are and add `.catch(noop)`:

```tsx
import { noop } from '@tanstack/react-query';

loader: ({ context }) => {
  context.queryClient.query(context.fetchReviewsOptions).catch(noop);
},
```

With `useQuery` the component handles errors itself through the query's `error`/`isError` state, so
the loader's promise rejection is swallowed with `noop` (imported from `@tanstack/react-query`).
Don't write an inline `() => {}` instead.

Pick the loader variant that matches the hook. If you switch a component between `useQuery` and
`useSuspenseQuery`, update the loader too.

## Do not re-add a query that is already in context

Route context is merged from parent to child. If a parent route (or the root) already puts a query in
context, child routes must **not** add it again under the same key — it would just overwrite the
parent's entry with an identical value and add code for nothing. Read it from the context instead.

`apps/admin/src/routes/_protected/dashboard/route.tsx` provides the session query and the resolved
`user` for everything under `/dashboard`:

```tsx
export const Route = createFileRoute('/_protected/dashboard')({
  context: () => ({
    fetchSessionOptions: fetchSessionOptions(),
  }),
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.query(context.fetchSessionOptions);
    if (!session) {
      throw new Error('User not authenticated');
    }
    return { user: session.user };
  },
  component: RouteComponent,
});
```

So child routes use it directly — `apps/admin/src/routes/_protected/dashboard/profile.tsx`:

```tsx
export const Route = createFileRoute('/_protected/dashboard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  // ...
}
```

Don't do this in a child of `/dashboard`:

```tsx
// ❌ fetchSessionOptions is already in context from /_protected/dashboard
export const Route = createFileRoute('/_protected/dashboard/profile')({
  context: () => ({
    fetchSessionOptions: fetchSessionOptions(),
  }),
  component: RouteComponent,
});
```

If a child needs the query itself (not just values returned from the parent's `beforeLoad`), use
`context.fetchSessionOptions` from the inherited context.

## When modifying a route

1. Inspect the parent routes (layout `route.tsx`, pathless `_layout.tsx`, `__root.tsx`) to see what is
   already in context — `queryClient`, query options, and values returned from `beforeLoad` (e.g. `user`).
2. Identify the query/data dependencies the route needs.
3. Reuse anything already in context; add to `context` only what's missing, using the `effects`
   factory.
4. Prefetch in `loader` (or `beforeLoad` when the result is needed for guards/child context) via
   `context.queryClient`. Use `staleTime: 'static'` for `useSuspenseQuery` or `.catch(noop)` for
   `useQuery` (see above).
5. Consume from `Route.useRouteContext()` in the component, never by recreating the options locally.
6. After adding or renaming files under `src/routes`, run `bun run generate-routes` (don't hand-edit
   `routeTree.gen.ts`).

Prefer existing project abstractions over introducing a new pattern.
