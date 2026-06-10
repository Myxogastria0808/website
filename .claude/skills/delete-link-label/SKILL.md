---
name: delete-link-label
description: Remove a link label and its icon from data/works/linkIcons.ts and all WorkLink arrays in works.ts.
user-triggered: true
---

Remove an entry from `LINK_LABELS` and `LINK_ICONS` in `data/works/linkIcons.ts`.

## Step 1 — Read data

Read `data/works/linkIcons.ts` and `data/works/works.ts`.

## Step 2 — Select label

Output a numbered list of all labels with usage counts (how many works link with each). Output: **"Which label to delete? Enter a number."**
Wait for reply.

## Step 3 — Confirmation

If any works use this label, list them as a warning:

> ⚠ The following works have links with this label and those links will be removed: …

Ask (AskUserQuestion):

- question: `"Delete label \"<label>\"?"`
- options: `["Yes, delete it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop.

## Step 4 — Write to file

1. In `data/works/linkIcons.ts`: remove the label from `LINK_LABELS`, its entry from `LINK_ICONS`, and the icon from its import line (remove the entire import if it becomes empty).
2. In `data/works/works.ts`: remove every `WorkLink` whose `label` matches the deleted label.

Run `bun run typecheck`.
