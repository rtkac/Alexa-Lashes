import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

// import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
  notFoundComponent: () => <div>404 - Page Not Found layout</div>,
});

function LayoutComponent() {
  // useI18nHTMLAttributes();

  const { defaultLocale, locale: currentLocale } = useLocale();
  const { locale } = Route.useParams();

  console.log("-------------------->");
  console.log(locale);
  console.log(currentLocale);
  console.log(defaultLocale);

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
