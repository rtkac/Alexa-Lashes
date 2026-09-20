import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import NotFound from './components/NotFound';
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const ErrorComponent = () => {
    const { reset } = useQueryErrorResetBoundary();

    useEffect(() => {
      reset();
    }, [reset]);

    return <DefaultCatchBoundary onRetry={router.invalidate} />;
  };

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPendingMs: 0,
    scrollRestorationBehavior: 'instant',
    scrollRestoration: true,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFound,
    defaultViewTransition: true,
    trailingSlash: 'always',
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });
  return router;
}
