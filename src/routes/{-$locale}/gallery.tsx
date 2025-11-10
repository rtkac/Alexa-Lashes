import { createFileRoute, redirect } from "@tanstack/react-router";

import { defaultLocale, type Locale, validateLocale } from "@/lib/i18n";

export const Route = createFileRoute("/{-$locale}/gallery")({
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
  return <div>Hello "/-$locale/gallery"!</div>;
}
