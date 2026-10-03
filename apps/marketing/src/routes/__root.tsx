import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie-consent';

import appCss from '@alexa-lashes/ui/styles.css?url';

import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { initializeAnalytics } from '@/lib/analytics';
import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';

type RootDocumentProps = { children: React.ReactNode };

const RootDocument = ({ children }: RootDocumentProps) => {
  useEffect(() => {
    const consent = Cookies.get('CookieConsent');
    if (consent === 'true') {
      initializeAnalytics();
    }
  }, []);

  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-primary-strong focus:outline-2 focus:outline-offset-2 focus:outline-primary-strong"
        >
          {m.skip_to_content()}
        </a>
        <Header />
        <main id="main-content" className="min-h-[calc(100vh-300px)]">
          {children}
        </main>
        <Footer />
        <Disclaimer />
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        property: 'og:locale',
        content: getLocale() === 'sk' ? 'sk_SK' : getLocale() === 'ru' ? 'ru_RU' : 'en_GB',
      },
      { property: 'og:site_name', content: 'Alexa Lashes' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
});
