import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <br />
        <br />
        <LocaleSwitcher />
        <br />
        <br />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          &nbsp;
          <LocalizedLink to="/services">{content.links.services}</LocalizedLink>
        </div>
        <br />
        <br />
        <div>
          <button type="button" onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          &nbsp;
          <button type="button" onClick={() => navigate({ to: "/services" })}>
            {content.links.services}
          </button>
        </div>
      </div>
    </div>
  );
}
