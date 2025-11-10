import { createFileRoute, redirect } from "@tanstack/react-router";

import { defaultLocale, type Locale, validateLocale } from "@/lib/i18n";

export const Route = createFileRoute("/{-$locale}/")({
  beforeLoad: async ({ params }) => {
    const { locale } = params;

    if (!locale || !validateLocale(locale)) {
      throw redirect({ to: `/${defaultLocale}` as "/{-$locale}" });
    }

    return {
      locale: (locale as Locale) || defaultLocale,
      isDefaultLocale: !locale || locale === defaultLocale,
    };
  },
  head: ({ params }) => ({
    meta: [
      {
        title:
          params.locale === "en"
            ? "Alexa Lashes | Lashes Bratislava"
            : `Alexa Lashes | Mihalnice Bratislava`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();
  return <div>Hello "/index"! -- {locale}</div>;
}
