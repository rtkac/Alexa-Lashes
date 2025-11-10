import { createFileRoute, redirect } from "@tanstack/react-router";

import { defaultLocale, type Locale, validateLocale } from "@/lib/i18n";

export const Route = createFileRoute("/{-$locale}/services")({
  beforeLoad: async ({ params }) => {
    const { locale } = params;

    if (locale && !validateLocale(locale)) {
      throw redirect({ to: "/{-$locale}" });
    }

    return {
      locale: (locale as Locale) || defaultLocale,
      isDefaultLocale: !locale || locale === defaultLocale,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();
  return <div>Hello "/services"! {locale}</div>;
}
