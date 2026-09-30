import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

const PathlessLayoutComponent = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-10">
      <nav aria-label={m.breadcrumbs_label()}>
        <ol
          className="mb-5 flex items-center gap-2 font-medium text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            className="text-primary-strong"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link to="/training/" itemProp="item">
              <span itemProp="name">{m.breadcrumbs_training()}</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="text-primary-strong"
            aria-current="page"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name">{m.breadcrumbs_training_basic()}</span>
            <meta itemProp="position" content="2" />
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
