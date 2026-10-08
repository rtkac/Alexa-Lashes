import { locales } from '@alexa-lashes/types/locales';
import type { Locale } from '@alexa-lashes/types/locales';
import { createFileRoute } from '@tanstack/react-router';

import { pageUrls } from '@/utils';

const paths = [
  '/',
  '/about/',
  '/prices/',
  '/training/',
  '/training/basic/',
  '/gallery/',
  '/contact/',
  '/privacy-policy/',
];

// The home page has no trailing slash for prefixed locales (`/en`, `/ru`), matching its hreflang links.
const localizedUrls = (path: string): Record<Locale, string> =>
  path === '/'
    ? {
        sk: 'https://alexalashes.sk/',
        en: 'https://alexalashes.sk/en',
        ru: 'https://alexalashes.sk/ru',
      }
    : pageUrls(path);

const urlEntry = (loc: string, urls: Record<Locale, string>) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${__BUILD_DATE__}</lastmod>
${locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${urls[locale]}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urls.sk}" />
  </url>`;

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const entries = paths.flatMap((path) => {
          const urls = localizedUrls(path);
          return locales.map((locale) => urlEntry(urls[locale], urls));
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });
      },
    },
  },
});
