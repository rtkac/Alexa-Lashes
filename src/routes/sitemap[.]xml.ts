import { createFileRoute } from "@tanstack/react-router";

import { generateStaticLocalizedUrls } from "@/paraglide/runtime.js";

const localizedUrls = generateStaticLocalizedUrls([
  "/",
  "/about",
  "/about/",
  "/prices",
  "/prices/",
  "/training",
  "/training/",
  "/training/basic",
  "/training/basic/",
  "/gallery",
  "/gallery/",
  "/contact",
  "/contact/",
  "/privacy-policy",
  "/privacy-policy/",
]);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${localizedUrls
    .map(
      (url) => `
  <url>
    <loc>https://alexalashes.sk${url.pathname}</loc>
    <lastmod>${new Intl.DateTimeFormat("en-CA").format(new Date())}</lastmod>
  </url>`,
    )
    .join("")}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
  },
});
