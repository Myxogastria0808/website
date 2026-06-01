import react from "@vitejs/plugin-react";
/// <reference types="@batijs/core/types" />

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
});

