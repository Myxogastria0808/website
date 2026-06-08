# website

Personal website built with Vike + React + Cloudflare Workers.

## Commands

```sh
bun run dev       # Start dev server
bun run build     # Production build
bun run preview   # Build + preview locally
bun run deploy    # Build + deploy to Cloudflare Workers
bun run typecheck # Type-check (tsc --noEmit)
bun run lint      # Lint with oxlint
bun run format    # Format with oxfmt
```

## Adding a Banner

Banners are displayed in the Banners section on the home page.

**1. Add the image file**

Place the image (PNG recommended, 200×40px) in `public/banners/`.

**2. Add an entry to `data/banners.ts`**

```ts
export const BANNERS: Banner[] = [
  // ...existing entries
  {
    href: "https://example.com", // link destination
    src: "/banners/example.png", // path from public/
    alt: "Description of banner", // alt text
  },
];
```

## Adding a Work

Works are displayed on the `/works` page with search and tag filtering.

### 1. Add a tag (if needed)

If the work requires a new tag, add it to `data/works/tags.ts`:

```ts
export const TAGS = ["Test", "NewTag"] as const;
```

Tag names are used as-is in the UI. Adding here makes it available in the tag filter.

### 2. Add the work to `data/works/works.ts`

```ts
export const WORKS: Work[] = [
  // ...existing entries
  {
    name: "My Project",
    description: "A short description of the project.",
    tags: ["NewTag"], // must be values defined in TAGS
    year: "2025", // 4-digit string
    links: [
      // optional
      { label: "GitHub", href: "https://github.com/..." },
      { label: "Zenn", href: "https://zenn.dev/..." },
    ],
  },
];
```

**Available `label` values with icons:**

| Label           | Icon           |
| --------------- | -------------- |
| `"GitHub"`      | GitHub mark    |
| `"GitLab"`      | GitLab mark    |
| `"Cosense"`     | Scrapbox mark  |
| `"TogoTV"`      | DNA icon       |
| `"Qiita"`       | Qiita mark     |
| `"Zenn"`        | Zenn mark      |
| `"note"`        | note mark      |
| `"Hatena Blog"` | Hatena mark    |
| `"Wiki"`        | Wikipedia mark |

Any other string falls back to an external-link icon.

