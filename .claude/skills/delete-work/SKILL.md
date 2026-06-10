---
name: delete-work
description: Remove an existing Work entry from data/works/works.ts.
user-triggered: true
---

Remove an entry from `data/works/works.ts`.

## Step 1 — Read data

Read `data/works/works.ts`.

## Step 2 — Select work

Output a numbered list of all works (name + year). Output: **"Which work to delete? Enter a number."**
Wait for reply. If out of range, warn and ask again.

## Step 3 — Confirmation

Display the selected work as a formatted TypeScript object and ask (AskUserQuestion):

- question: `"Delete this work?"`
- options: `["Yes, delete it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing.

## Step 4 — Write to file

Read `data/works/works.ts` again, remove the entry from the `WORKS` array, and write. Do not modify `ALL_WORKS`.

Run `bun run typecheck`.
