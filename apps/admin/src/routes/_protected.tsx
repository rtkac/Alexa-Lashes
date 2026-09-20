import { getSession } from '@alexa-lashes/auth/server';
import { Skeleton } from '@alexa-lashes/ui/shadcn';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw Route.redirect({ to: '/' });
    }
  },
  pendingComponent: () => (
    <div>
      <div className="z-2 w-full border-primary-light border-b">
        <div>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-4">
            <div className="rounded-lg h-9">
              <Skeleton className="flex w-44.25 h-full" />
            </div>
            <div className="flex md:gap-7 gap-6">
              <div className="rounded-full h-9">
                <Skeleton className="flex w-9 md:w-28 h-full rounded-full md:rounded-lg " />
              </div>
              <div className="rounded-lg h-9">
                <Skeleton className="w-10 md:w-9 h-full md:rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[calc(100vh-300px)] mx-auto max-w-6xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 space-y-4">
          <div className="rounded-lg h-30">
            <Skeleton className="flex w-full h-full" />
          </div>
          <div className="rounded-lg h-30">
            <Skeleton className="flex w-full h-full" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg h-40">
            <Skeleton className="flex w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  ),
  component: () => <Outlet />,
});
