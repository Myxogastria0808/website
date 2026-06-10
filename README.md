# website

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](#)
[![Vike](https://img.shields.io/badge/Vike-ffc300)](#)
[![Nix](https://img.shields.io/badge/Nix-5277C3?logo=nixos&logoColor=white)](#)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)](#)
[![build check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/build.yml?label=build)](https://github.com/Myxogastria0808/website/actions/workflows/build.yml)
[![fmt check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/fmt.yml?label=fmt)](https://github.com/Myxogastria0808/website/actions/workflows/fmt.yml)
[![lint check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/lint.yml?label=lint)](https://github.com/Myxogastria0808/website/actions/workflows/lint.yml)
[![RenovateBot](https://img.shields.io/badge/RenovateBot-1A1F6C?logo=renovate&logoColor=fff)](#)
[![GitGuardian Shield](https://img.shields.io/badge/protected%20by-GitGuardian-blue?logo=gitguardian&logoColor=white)](https://gitguardian.com/)
<img alt="gitleaks badge" src="https://img.shields.io/badge/protected%20by-gitleaks-blue">
![License](https://img.shields.io/github/license/Myxogastria0808/website)

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

## Claude Code Skills

The following `/skills` are available in Claude Code for managing works data interactively.

### Works

| Skill          | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| `/create-work` | Add a new Work entry interactively (name → description → tags → year → links) |
| `/read-work`   | Display all works, optionally filtered by year or tag                         |
| `/update-work` | Edit any field of an existing Work                                            |
| `/delete-work` | Remove a Work entry                                                           |

### Tags

| Skill         | Description                                              |
| ------------- | -------------------------------------------------------- |
| `/create-tag` | Add new tags with similarity check against existing ones |
| `/read-tag`   | Display all tags with per-tag usage counts               |
| `/update-tag` | Rename a tag and update all Work references              |
| `/delete-tag` | Remove a tag and strip it from all Work entries          |

### Link Labels

| Skill                | Description                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `/create-link-label` | Add a new link label with an icon (searches react-icons, Lucide, Iconoir, Fluent UI, Carbon) |
| `/read-link-label`   | Display all labels with their icons and usage counts                                         |
| `/update-link-label` | Rename a label or swap its icon                                                              |
| `/delete-link-label` | Remove a label and strip its links from all Works                                            |

---

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
