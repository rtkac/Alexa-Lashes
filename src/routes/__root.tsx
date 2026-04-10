import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { Cookies } from "react-cookie-consent";

import appCss from "../styles.css?url";

import { Disclaimer } from "@/components/Disclaimer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { initializeAnalytics } from "@/lib/analytics";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { property: "og:locale", content: getLocale() === "sk" ? "sk_SK" : "en_US" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const consent = Cookies.get("CookieConsent");
    if (consent === "true") {
      initializeAnalytics();
    }
  }, []);

  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main className="min-h-[calc(100vh-300px)]">{children}</main>
        <Footer />
        <Disclaimer />
        <Scripts />
      </body>
    </html>
  );
}
