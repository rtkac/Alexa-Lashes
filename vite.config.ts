import { paraglideVitePlugin } from "@inlang/paraglide-js";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: "https://alexalashes.sk",
      },
    }),
    netlify(),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["react-cookie-consent"],
  },
});

export default config;
