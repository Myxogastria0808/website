---
name: update-tag
description: Rename an existing tag in data/works/tags.ts and update all references in works.ts.
user-triggered: true
---

Rename a tag in `data/works/tags.ts` and update every `Work.tags` array that references it.

## Input method rules

- **Free text** (new tag name): plain chat text.
- **Choices**: AskUserQuestion.

## Step 1 — Read data

Read `data/works/tags.ts` and `data/works/works.ts`.

## Step 2 — Select tag

Output a numbered list of all tags. Output: **"Which tag to rename? Enter a number."**
Wait for reply.

## Step 3 — New name

Output: **"New name for \`<current tag>\`?"** and wait for reply.

**Similarity check**: compare the new name against all existing tags (excluding the selected one). If similar, warn and ask (AskUserQuestion):
- options: `["Use existing: <similar tag>", "Use new name anyway"]`
- header: "update-tag"

## Step 4 — Confirmation

Ask (AskUserQuestion):
- question: `"Rename \"<old>\" → \"<new>\"? Works using this tag will also be updated."`
- options: `["Yes, rename it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop.

## Step 5 — Write to file

1. In `data/works/tags.ts`: replace the old tag string with the new one, then sort alphabetically.
2. In `data/works/works.ts`: replace every occurrence of the old tag name in `Work.tags` arrays.

Run `bun run typecheck`.
