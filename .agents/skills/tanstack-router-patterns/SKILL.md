---
name: tanstack-router-patterns
description: Use when creating or editing TanStack Router route files (__root.tsx, route.tsx, or file-based routes) that integrate with TanStack Query — covers route context, loaders, beforeLoad, and query integration. Doesn't apply to routes/apps whose router context has no QueryClient.
---

# TanStack Router patterns

Conventions for structuring TanStack Router route files and integrating them with TanStack Query,
illustrated with real code from this repo.

## File layout

Define `RouteComponent` **above** the `export const Route = createFileRoute(...)` call. The route
definition then reads top-to-bottom, referencing things already declared above it.

```tsx
// ✅ CORRECT
const RouteComponent = () => {
  const context = Route.useRouteContext();
  return (
    <>
      <Header user={context.user} />
      <main className="min-h-[calc(100vh-300px)] mx-auto max-w-6xl p-4 mt-6">
        <Outlet />
      </main>
    </>
  );
};

export const Route = createFileRoute('/_protected/dashboard')({
  context: () => ({ fetchSessionOptions: fetchSessionOptions() }),
  component: RouteComponent,
});

// ❌ INCORRECT — Route defined before the component it references
export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
});

const RouteComponent = () => {
  /* ... */
};
```

## `queryClient` in the root route context

The root route declares `queryClient: QueryClient` on its context type, and the router setup passes
the actual `QueryClient` instance in via `context`. This makes `context.queryClient` available in
every route's `beforeLoad`/`loader`.

```tsx
interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  // head, shellComponent, ...
});
```

```tsx
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60000 } } });

const router = createTanStackRouter({
  routeTree,
  // ...
  context: { queryClient },
});
```

## Adding query options to route context

Add query options (from `fetchXxxOptions()` effects in `src/effects/*.ts`) via the route's
`context` callback, not directly inside `loader`/`beforeLoad`. This makes the same options reusable
in `beforeLoad`, `loader`, and the component via `Route.useRouteContext()`.

Two shapes show up here, depending on whether the options need a value that's only known later:

**No parameters needed** — invoke the factory immediately in `context`:

```tsx
context: () => ({
  fetchSessionOptions: fetchSessionOptions(),
}),
```

**Needs a value only known where it's used** (e.g. the currently selected locale, or a dialog's
payload) — put the factory _function itself_ in context, and call it at the point where that value
is available:

```tsx
export const Route = createFileRoute('/_protected/dashboard/')({
  context: () => ({
    fetchReviewsOptions,
    fetchReviewOptions,
  }),
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
  },
  component: RouteComponent,
});

// Called with the actual locale once the component knows it:
const ReviewList = ({ locale }: ReviewListProps) => {
  const context = Route.useRouteContext();
  const { data } = useSuspenseQuery(context.fetchReviewsOptions(locale));
  // ...
};
```

### Consuming route context in the component

Always call `Route.useRouteContext()` once and keep the whole result as `context` — never
destructure or spread individual fields out of it, even plain values like `user`. Access everything
via `context.xxx` at the call site.

```tsx
// ✅ CORRECT
const context = Route.useRouteContext();

// ❌ INCORRECT — destructuring fields out of the context
const { user } = Route.useRouteContext();
```

### Add shared query options only once, in the closest common parent

If multiple routes/children need the same query options, add them to the `context` of the
**closest shared parent route** only. Re-adding the same key in a child route's `context` overwrites
(does not merge with) the parent's value — it doesn't compose.

A parent route can provide `fetchSessionOptions` once for everything under it; its child routes
don't redeclare it — they'd just read it from `Route.useRouteContext()` if they needed it.

## Fetching query data in `beforeLoad` / `loader`

- **For data consumed with `useSuspenseQuery`** in the component, fetch it with
  `context.queryClient.query({ ...options, staleTime: 'static' })` — every current route in this app
  uses this shape:

  ```tsx
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
  },
  ```

- **For data consumed with plain `useQuery`** (non-suspense, optional/secondary data), prefetch with
  `context.queryClient.query(options).catch(noop)` (imported from `@tanstack/react-query`) — the
  `.catch(noop)` prevents an unhandled rejection since this data is allowed to fail without blocking
  the route. No route in this app needs this yet (everything here is suspense-based), but this is
  the pattern to follow when one does — see the `tanstack-router` skill's note on why suspense
  loaders intentionally skip `.catch(noop)` while `useQuery` ones don't.

`ensureQueryData`/`prefetchQuery` are deprecated for this — always use `.query(...)`.

## Avoid unnecessary `await` in loaders

Only `await` a query in `beforeLoad`/`loader` if the result is actually used there (e.g. for a
redirect decision). If the data is only needed inside the route component via `useSuspenseQuery`,
kick off the fetch without awaiting it and let Suspense handle the wait — the query is already
cached by the time the component reads it.

```tsx
// ✅ CORRECT — not used in the loader itself, just prefetched for the component
loader: ({ context }) => {
  context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
},

// ❌ INCORRECT — awaiting data that isn't used in the loader unnecessarily blocks navigation
loader: async ({ context }) => {
  await context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
},
```

For example, a route's `beforeLoad` might await `getSession()` directly (not through `queryClient`)
because the result decides whether to redirect:

```tsx
beforeLoad: async () => {
  const session = await getSession();
  if (!session) {
    throw Route.redirect({ to: '/' });
  }
  return { user: session.user };
},
```
