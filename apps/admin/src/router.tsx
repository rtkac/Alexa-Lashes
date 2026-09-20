import { QueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { useEffect } from 'react';

import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import NotFound from './components/NotFound';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60000 } } });

  const ErrorComponent = () => {
    const { reset } = useQueryErrorResetBoundary();

    useEffect(() => {
      reset();
    }, [reset]);

    return <DefaultCatchBoundary onRetry={router.invalidate} />;
  };

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPendingMs: 0,
    scrollRestorationBehavior: 'instant',
    scrollRestoration: true,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: () => <NotFound />,
    context: { queryClient },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
