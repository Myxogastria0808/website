# Repository Guidelines

## Project Structure & Module Organization

This is a Vike + React personal website deployed to Cloudflare Workers. Route files live under `pages/`; Vike plus-files such as `+Page.tsx`, `+Layout.tsx`, `+Head.tsx`, and `+config.ts` define pages, layout, metadata, and framework settings. Reusable UI belongs in `components/<Name>/index.tsx` with scoped styles in `index.module.css`, then re-exported from `components/index.ts` when shared. Static data lives in `data/`, global CSS and custom media definitions live in `pages/global.css`, and public assets live in `public/`. Build output is generated in `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

Use Bun for package scripts:

- `bun run dev` starts the local Vike dev server using the Cloudflare runtime integration.
- `bun run build` creates a production build.
- `bun run preview` builds and serves the production preview locally.
- `bun run deploy` builds and deploys to Cloudflare Workers with Wrangler.

No test or lint scripts are currently configured. If adding them, wire them through `package.json` and document the command here.

## Coding Style & Naming Conventions

Write TypeScript and React components using the existing functional component style. Keep component directories PascalCase, for example `components/Footer/` or `pages/index/Profile/`. Use CSS Modules for component styles; do not use inline `style={{}}`. Every `<div>` should have a class name. Prefer `rem` and `var(--fs-*)` sizing; reserve `px` for borders or other hairline values. Use breakpoints from `pages/global.css` via `@media (--bp-*)`. External links must include `target="_blank" rel="noopener noreferrer"`.

## Testing Guidelines

There is no established test framework or coverage requirement. For now, validate changes with `bun run build` and, for UI changes, `bun run dev` or `bun run preview`. If tests are introduced, place them near the code they cover, use descriptive names such as `ComponentName.test.tsx`, and keep test commands fast enough for routine PR checks.

## Commit & Pull Request Guidelines

The Git history uses concise Conventional Commit prefixes such as `feat:`, `fix:`, and `chore:`. Follow that pattern, for example `fix: adjust works layout`. Pull requests should include a short summary, affected routes/components, validation performed, linked issues when applicable, and screenshots or recordings for visual changes.

## Cloudflare & NixOS Notes

SSR runs inside `workerd`, not Node.js. Do not use Node APIs unless `nodejs_compat` is intentionally enabled in `wrangler.jsonc`. Keep `wrangler.jsonc` `compatibility_date` supported by the installed Miniflare version. In the Nix shell, `NODE_EXTRA_CA_CERTS` must point to the Nix CA bundle for external HTTPS fetches during SSR.
