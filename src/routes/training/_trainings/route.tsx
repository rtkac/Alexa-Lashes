import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/training/_trainings")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-10">
      <ol
        className="mb-5 flex items-center gap-2 font-medium text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="text-primary"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/training/" itemProp="item">
            <span itemProp="name">{m.breadcrumbs_training()}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        /
        <li
          className="text-primary brightness-50"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="name">{m.breadcrumbs_training_basic()}</span>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
      <Outlet />
    </div>
  );
}
