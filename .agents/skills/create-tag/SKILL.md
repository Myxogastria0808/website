---
name: create-tag
description: Interactively add one or more new tags to data/works/tags.ts. Checks similarity against existing tags before creating, and keeps the TAGS array alphabetically sorted.
user-triggered: true
---

Add one or more new tag strings to the `TAGS` array in `data/works/tags.ts`.

## Input method rules

- **Free text** (tag names): output the question as plain chat text and wait for the user's reply.
- **Choices**: use AskUserQuestion.

## Step 1 — Read current tags

Read `data/works/tags.ts` to get the current `TAGS` array.

## Step 2 — Collect new tag names

Repeat until the user is done:

1. Output: **"New tag name?"** and wait for reply.
2. **Similarity check**: compare the name (case-insensitively and semantically) against all existing TAGS and tags collected this session. If similar, output a warning:
   > ⚠ `"<typed name>"` looks similar to the existing tag `"<similar tag>"`. Use the existing one instead?
   > Then ask (AskUserQuestion):
   - options: `["Use existing: <similar tag>", "Create new anyway"]`
   - header: "create-tag"
3. If no similar tag, or the user chose "Create new anyway", add to the pending list.
4. Ask (AskUserQuestion):
   - question: `"Add another tag?"`
   - options: `["Yes", "Done"]`
   - header: "create-tag"
   - If "Done", stop collecting.

If no names were collected, stop without writing anything.

## Step 3 — Write to file

Append each new tag to the `TAGS` array in `data/works/tags.ts`, then sort the entire array alphabetically (case-insensitive).

Run `bun run typecheck` to verify no type errors were introduced.
