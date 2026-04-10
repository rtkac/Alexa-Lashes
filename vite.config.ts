import { paraglideVitePlugin } from "@inlang/paraglide-js";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/",
          localized: [
            ["sk", "/"],
            ["en", "/en"],
            ["ru", "/ru"],
          ],
        },
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["ru", "/ru/:path(.*)?"],
            // make sure to match the least specific path last
            ["sk", "/:path(.*)?"],
          ],
        },
      ],
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    netlify(),
    viteReact(),
  ],
  ssr: {
    noExternal: ["react-cookie-consent"],
  },
});

export default config;
