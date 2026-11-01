---
name: delete-tag
description: Remove a tag from data/works/tags.ts and all Work.tags arrays in works.ts.
user-triggered: true
---

Remove a tag from `data/works/tags.ts` and every `Work.tags` array that references it.

## Step 1 — Read data

Read `data/works/tags.ts` and `data/works/works.ts`.

## Step 2 — Select tag

Output a numbered list of all tags with usage counts (how many works use each). Output: **"Which tag to delete? Enter a number."**
Wait for reply.

## Step 3 — Confirmation

If any works use this tag, list them as a warning:

> ⚠ The following works reference this tag and will have it removed: …

Ask (AskUserQuestion):

- question: `"Delete tag \"<tag>\"?"`
- options: `["Yes, delete it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop.

## Step 4 — Write to file

1. In `data/works/tags.ts`: remove the tag from the `TAGS` array.
2. In `data/works/works.ts`: remove the tag from every `Work.tags` array that contains it.

Run `bun run typecheck`.
