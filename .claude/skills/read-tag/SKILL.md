---
name: read-tag
description: Display existing tags from data/works/tags.ts with usage counts across works.
user-triggered: true
---

Display the contents of `data/works/tags.ts`.

## Step 1 — Read data

Read `data/works/tags.ts` and `data/works/works.ts`.

## Step 2 — Display

For each tag in `TAGS`, count how many works use it. Output as a table:

```
Tags (4 total):
  AC                   — 1 work
  Category Theory      — 1 work
  DB Theory            — 1 work
  University of Tsukuba — 1 work
```
