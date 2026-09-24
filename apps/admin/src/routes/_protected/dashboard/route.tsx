import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Header } from '@/components/Header';
import { fetchSessionOptions } from '@/effects/session';

const RouteComponent = () => {
  const { user } = Route.useRouteContext();

  return (
    <>
      <Header user={user} />
      <main className="min-h-[calc(100vh-300px)] mx-auto max-w-6xl p-4 mt-6">
        <Outlet />
      </main>
    </>
  );
};

export const Route = createFileRoute('/_protected/dashboard')({
  context: () => ({
    fetchSessionOptions: fetchSessionOptions(),
  }),
  component: RouteComponent,
});
