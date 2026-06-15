# website

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](#)
[![Vike](https://img.shields.io/badge/Vike-ffc300)](#)
[![Nix](https://img.shields.io/badge/Nix-5277C3?logo=nixos&logoColor=white)](#)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)](#)
[![build check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/build.yml?label=build)](https://github.com/Myxogastria0808/website/actions/workflows/build.yml)
[![fmt check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/fmt.yml?label=fmt)](https://github.com/Myxogastria0808/website/actions/workflows/fmt.yml)
[![lint check](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/lint.yml?label=lint)](https://github.com/Myxogastria0808/website/actions/workflows/lint.yml)
[![typecheck](https://img.shields.io/github/actions/workflow/status/Myxogastria0808/website/typecheck.yml?label=typecheck)](https://github.com/Myxogastria0808/website/actions/workflows/typecheck.yml)
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

### History

| Skill             | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `/create-history` | Add a new History entry interactively (name → description → year → approximate → feature → links) |
| `/read-history`   | Display all history entries, optionally filtered by year                                          |
| `/update-history` | Edit any field of an existing History entry                                                       |
| `/delete-history` | Remove a History entry                                                                            |

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
    isTopic: false, // true to show in the Topic panel on the homepage
    links: [
      // optional
      { label: "GitHub", href: "https://github.com/..." },
      { label: "Zenn", href: "https://zenn.dev/..." },
    ],
  },
];
```

**Fields:**

| Field         | Type      | Required | Description                                                        |
| ------------- | --------- | -------- | ------------------------------------------------------------------ |
| `name`        | `string`  | Yes      | Title of the work                                                  |
| `description` | `string`  | Yes      | Short description of the work                                      |
| `tags`        | `Tag[]`   | Yes      | Tag list — values must be defined in `data/works/tags.ts`          |
| `year`        | `string`  | Yes      | 4-digit year string (e.g. `"2025"`)                                |
| `isTopic`     | `boolean` | Yes      | If `true`, the work appears in the **Topic** panel on the homepage |
| `links`       | array     | No       | List of `{ label, href }` link objects                             |

**`isTopic` behaviour:** Works with `isTopic: true` are shown in the "Topic" sub-section of the Activity section on the homepage (`/`). Set to `false` for works that should only appear on the `/works` page.

**Available `label` values with icons:**

| Label           | Icon           |
| --------------- | -------------- |
| `"Website"`     | Globe icon     |
| `"GitHub"`      | GitHub mark    |
| `"GitLab"`      | GitLab mark    |
| `"Cosense"`     | Scrapbox mark  |
| `"TogoTV"`      | DNA icon       |
| `"Qiita"`       | Qiita mark     |
| `"Zenn"`        | Zenn mark      |
| `"note"`        | note mark      |
| `"Hatena Blog"` | Hatena mark    |
| `"Wiki"`        | Wikipedia mark |
| `"npm"`         | npm mark       |
| `"crates.io"`   | Rust mark      |

Any other string falls back to an external-link icon.

---

## Adding a History Entry

History entries are displayed on the `/history` page as a timeline.

### Add an entry to `data/history/history.ts`

```ts
export const HISTORIES: HistoryEntry[] = [
  // ...existing entries
  {
    name: "Event Title",
    description: "A description of the event.",
    year: "2025-04", // YYYY-MM format
    approximate: true, // displays "ca." before the date
    feature: {
      // optional — shown in the Affiliations feature panel
      category: "Affiliations",
      title: "Organization Name",
      description: "A short description of the organization.",
    },
    links: [
      // optional
      { label: "Website", href: "https://example.com" },
    ],
  },
];
```

**Fields:**

| Field         | Type        | Required | Description                                                |
| ------------- | ----------- | -------- | ---------------------------------------------------------- |
| `name`        | `string`    | Yes      | Title of the event shown on the timeline                   |
| `description` | `string`    | Yes      | Description of the event                                   |
| `year`        | `YearMonth` | Yes      | Date in `YYYY-MM` format (e.g. `"2025-04"`)                |
| `approximate` | `boolean`   | Yes      | If `true`, prepends `ca.` to the displayed date            |
| `feature`     | object      | No       | Shows this entry in the Affiliations panel on the homepage |
| `links`       | array       | No       | List of `{ label, href }` link objects                     |

**`feature` sub-fields:**

| Field         | Type             | Description                                      |
| ------------- | ---------------- | ------------------------------------------------ |
| `category`    | `"Affiliations"` | Fixed value — only `"Affiliations"` is supported |
| `title`       | `string`         | Organization name shown in the panel             |
| `description` | `string`         | Short description shown in the panel             |

**Available `label` values for links:**

| Label           | Icon           |
| --------------- | -------------- |
| `"Website"`     | Globe icon     |
| `"GitHub"`      | GitHub mark    |
| `"GitLab"`      | GitLab mark    |
| `"Cosense"`     | Scrapbox mark  |
| `"TogoTV"`      | DNA icon       |
| `"Qiita"`       | Qiita mark     |
| `"Zenn"`        | Zenn mark      |
| `"note"`        | note mark      |
| `"Hatena Blog"` | Hatena mark    |
| `"Wiki"`        | Wikipedia mark |
| `"npm"`         | npm mark       |
| `"crates.io"`   | Rust mark      |

Any other string falls back to an external-link icon.
