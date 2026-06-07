# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
bun run dev       # Start dev server (Vike + Cloudflare Workers via workerd)
bun run build     # Production build
bun run preview   # Build + preview locally
bun run deploy    # Build + deploy to Cloudflare Workers via wrangler
bun run typecheck # Type-check without emitting (tsc --noEmit)
```

No lint or test commands are configured beyond `typecheck`.

## Architecture

This is a personal website built with **Vike** (SSR framework) + **React 19** deployed to **Cloudflare Workers**.

**Runtime**: SSR code runs inside `workerd` (Cloudflare's JS runtime) even in dev, via `@cloudflare/vite-plugin`. This means Node.js APIs are unavailable unless `nodejs_compat` is added to `wrangler.jsonc` compatibility flags.

**Routing**: Vike filesystem routing — each `pages/<route>/+Page.tsx` maps to a URL. Plus-files (`+config.ts`, `+Layout.tsx`, `+Head.tsx`, etc.) follow Vike conventions.

**Styling**: No CSS framework. Global styles in `pages/global.css` define utility classes manually (`.font-megrim`, `.text-4xl`, etc.) mirroring a Tailwind-like API. CSS Modules are used for component-scoped styles.

**PostCSS**: `postcss-custom-media` is configured. Breakpoints are defined in `pages/global.css` and used across all CSS Modules.

**Components**: Reusable components live in `components/<Name>/index.tsx` and are re-exported from `components/index.ts`.

**Fonts**: Google Fonts (Megrim, Wavefont, Noto Sans) loaded via `<link>` in `pages/+Head.tsx`.

**Animation**: GSAP is available as a dependency. The `LambdaRain` component uses a raw Canvas 2D animation loop (no GSAP) with DPR-aware scaling and a `requestAnimationFrame` loop capped at 60 FPS.

## Conventions

- インライン `style={{}}` は使わない。スタイルは必ず CSS Module に書く。
- サイズは `rem` / `var(--fs-*)`。`px` は `border` 等の細線のみ。
- ブレークポイントは `global.css` の `@custom-media` で定義し、各 Module では `@media (--bp-*)` で参照する。
- `<div>` には必ずクラスを付与する。無名 `<div>` は作らない。
- ページ構造: intro は `<header>`、コンテンツは `<section>`（必ず `<h2 className="section-title">` を持つ）、末尾は `<footer>`。
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付ける。

## NixOS-specific notes

When running in this NixOS/nix flake environment:

- **TLS errors in SSR fetch**: `workerd` doesn't read `SSL_CERT_FILE`. The `flake.nix` shellHook must export `NODE_EXTRA_CA_CERTS` pointing to the nix cacert bundle. Run `direnv reload` after changing `flake.nix`.
- **`compatibility_date` errors**: The date in `wrangler.jsonc` must not exceed the date encoded in the installed miniflare version (`4.YYYYMMDD.0`).
- **404 on all pages**: Ensure `pages/+config.ts` has `server: true` to enable the `vike:server-entry` virtual module required by `wrangler.jsonc`.
- **Wrangler log `EROFS` errors on build**: Wrangler tries to write logs to `~/.config/.wrangler/logs/` which is read-only in this sandbox. Set `WRANGLER_LOG=none` in the shell (or `.envrc`) to suppress the error.

