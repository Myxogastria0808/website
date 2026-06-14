---
name: update-work
description: Interactively edit an existing Work entry in data/works/works.ts.
user-triggered: true
---

Edit an existing entry in `data/works/works.ts`.

## Input method rules

- **Free text** (new values for name, description, URLs, custom labels): plain chat text.
- **Choices**: AskUserQuestion.

## Step 1 — Read data

Read `data/works/works.ts`, `data/works/tags.ts`, `data/shared/linkIcons.ts`.

## Step 2 — Select work

Output a numbered list of all works (name + year). Output: **"Which work to edit? Enter a number."**
Wait for reply. If the number is out of range, warn and ask again.

## Step 3 — Select field

Display the current values of the selected work, then output:

```
Fields:
1. name
2. description
3. tags
4. year
5. links
```

Output: **"Which field to edit? Enter a number."**
Wait for reply.

## Step 4 — Edit field

Run the corresponding input step from the `create-work` skill (Step 2–6) for the chosen field, pre-filled with the current value shown for reference.

For **tags**: show existing selections and allow adding/removing. Use the same `create-tag` similarity check for any new tags.

After editing, ask (AskUserQuestion):

- question: `"Edit another field?"`
- options: `["Yes", "No"]`
- header: "update-work"

If **Yes**, return to Step 3.

## Step 5 — Confirmation

Display the updated work entry as a formatted TypeScript object, then ask (AskUserQuestion):

- options: `["Yes, save it", "Edit more", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing.
If **"Edit more"**, return to Step 3.

## Step 6 — Write to file

If new tags were collected, append them to `data/works/tags.ts` and sort alphabetically.

Read `data/works/works.ts` again, replace the entry in-place (keep same array position), and write. Keep `WORKS` sorted by year descending.

Run `bun run typecheck`.
