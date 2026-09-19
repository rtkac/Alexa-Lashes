import { getSession } from '@alexa-lashes/auth/server';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw Route.redirect({ to: '/' });
    }
  },
  component: () => <Outlet />,
});
