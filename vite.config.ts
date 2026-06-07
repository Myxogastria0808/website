import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: "ssr" },
    }),
    vike(),
    react(),
  ],
  build: {
    // GSAP + KaTeX together push the client chunk above Vite's default 500 kB limit.
    // Raise the threshold to match the actual size rather than suppressing with dynamic
    // imports, which would require significant restructuring for marginal gain on a
    // personal portfolio.
    chunkSizeWarningLimit: 600,
  },
});

