import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

const PathlessLayoutComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-10">
      <nav aria-label={m.breadcrumbs_label()}>
        <ol className="mb-5 flex items-center gap-2 font-medium text-sm">
          <li className="text-neutral-600">
            <Link to="/training/">{m.breadcrumbs_training()}</Link>
          </li>
          <li aria-hidden="true" className="text-neutral-500">
            /
          </li>
          <li className="font-semibold text-foreground" aria-current="page">
            {m.breadcrumbs_training_basic()}
          </li>
        </ol>
      </nav>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/training/_trainings')({
  component: PathlessLayoutComponent,
});
