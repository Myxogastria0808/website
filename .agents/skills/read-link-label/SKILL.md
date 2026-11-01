---
name: read-link-label
description: Display existing link labels and their icons from data/shared/linkIcons.ts with usage counts.
user-triggered: true
---

Display the contents of `data/shared/linkIcons.ts`.

## Step 1 — Read data

Read `data/shared/linkIcons.ts` and `data/works/works.ts`.

## Step 2 — Display

For each label in `LINK_LABELS`, show the icon name and how many works link with it:

```
Link labels (9 total):
  Cosense      — SiScrapbox    (react-icons/si)   0 works
  GitHub       — FaGithub      (react-icons/fa6)  1 work
  …
```
