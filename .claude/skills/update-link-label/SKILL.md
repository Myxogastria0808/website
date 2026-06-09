---
name: update-link-label
description: Edit a link label's name or icon in data/works/linkIcons.ts and update all references in works.ts.
user-triggered: true
---

Edit an entry in `LINK_LABELS` / `LINK_ICONS` in `data/works/linkIcons.ts`.

## Input method rules

- **Free text** (new label name, custom icon): plain chat text.
- **Choices**: AskUserQuestion.

## Step 1 — Read data

Read `data/works/linkIcons.ts` and `data/works/works.ts`.

## Step 2 — Select label

Output a numbered list of all labels with their icons. Output: **"Which label to edit? Enter a number."**
Wait for reply.

## Step 3 — Select what to edit

Ask (AskUserQuestion):
- question: `"What to edit?"`
- options: `["Label name", "Icon", "Both"]`
- header: "update-link-label"

### Edit label name

Output: **"New label name?"** and wait for reply. Check it doesn't already exist (case-insensitive).
If any works use the old label name, they will be updated automatically.

### Edit icon

Follow the icon search procedure from the `create-link-label` skill (Step 3): search react-icons first, then fallback libraries. Present candidates and wait for selection.

## Step 4 — Confirmation

Display a preview of the changes, then ask (AskUserQuestion):
- options: `["Yes, save it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop.

## Step 5 — Write to file

1. In `data/works/linkIcons.ts`: update the label string in `LINK_LABELS`, the key in `LINK_ICONS`, and the import if the icon changed. Keep `LINK_LABELS` sorted alphabetically.
2. In `data/works/works.ts`: if the label name changed, replace every occurrence in `WorkLink.label` fields.

Run `bun run typecheck`.
