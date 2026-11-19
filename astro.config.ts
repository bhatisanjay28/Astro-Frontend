import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://vyotish.com",
  // Fully prerendered for the Coming-Soon phase; switches to "server" when the
  // first SSR pages land (Epic 2 — DECISIONS.md D1).
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  server: { host: "127.0.0.1", port: 4321 },
  vite: {
    plugins: [tailwindcss()],
  },
});
