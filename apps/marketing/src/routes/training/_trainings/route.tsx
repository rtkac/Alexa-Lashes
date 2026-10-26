import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';

import { m } from '@/paraglide/messages';

const PathlessLayoutComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-10">
      <nav aria-label={m.breadcrumbs_label()} className="mb-4 md:mb-6">
        <ol className="flex flex-wrap items-center gap-x-1 text-sm">
          <li>
            <Link
              to="/training/"
              className="-mx-1 inline-block rounded px-1 py-1.5 font-medium text-neutral-600 no-underline hover:text-primary-strong hover:underline"
            >
              {m.breadcrumbs_training()}
            </Link>
          </li>
          <li aria-hidden="true" className="flex text-neutral-500">
            <ChevronRightIcon className="size-4" />
          </li>
          <li className="py-1.5 font-semibold text-foreground" aria-current="page">
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
