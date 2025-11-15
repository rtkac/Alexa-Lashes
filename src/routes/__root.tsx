import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

import Header from "@/components/Header";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />

        <div className="p-4 border-b">
          <LanguageSwitcher />
        </div>

        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            {/* <Trans>Home</Trans> */}
            Home
          </Link>{" "}
          <Link
            to="/gallery"
            activeProps={{
              className: "font-bold",
            }}
          >
            Gallery
            {/* <Trans>Gallery</Trans> */}
          </Link>{" "}
          {/* <Link
            to="/services"
            activeProps={{
              className: "font-bold",
            }}
          >
            <Trans>Services</Trans>
          </Link>{" "}
          <Link
            to="/contact"
            activeProps={{
              className: "font-bold",
            }}
          >
            <Trans>Contact</Trans>
          </Link>{" "} */}
          {/* <Link
            to="/this-route-does-not-exist"
            activeProps={{
              className: "font-bold",
            }}
          >
            <Trans>This Route Does Not Exist</Trans>
          </Link> */}
          |
          {/* {Object.entries(locales).map(([locale, label]) => (
            <button
              type="button"
              key={locale}
              className={locale === i18n.locale ? "font-bold" : ""}
              onClick={() => {
                updateLanguage({ data: locale }).then(() => {
                  location.reload();
                });
              }}
            >
              {label}
            </button>
          ))} */}
        </div>
        <hr />

        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
