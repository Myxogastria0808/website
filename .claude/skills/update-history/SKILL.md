---
name: update-history
description: Interactively edit an existing HistoryEntry in data/history/history.ts.
user-triggered: true
---

Edit an existing entry in `data/history/history.ts`.

## Input method rules

- **Free text** (new values for name, description, year, URLs, custom labels): plain chat text.
- **Choices**: AskUserQuestion.

## Step 1 — Read data

Read `data/history/history.ts` and `data/shared/linkIcons.ts`.

## Step 2 — Select entry

Output a numbered list of all entries (name + year):

```
1. Enrolled in Hyogo Prefectural Ono High School  (2020-04)
2. Joined Biology Club  (2020-06)
…
```

Output: **"Which entry to edit? Enter a number."**
Wait for reply. If the number is out of range, warn and ask again.

## Step 3 — Select field

Display the current values of the selected entry, then output:

```
Fields:
1. name
2. description
3. year
4. approximate
5. feature
6. links
```

Output: **"Which field to edit? Enter a number."**
Wait for reply.

## Step 4 — Edit field

Run the corresponding input step from the `create-history` skill (Steps 2–7) for the chosen field, showing the current value for reference.

For **feature**:

- If the entry has **no feature**, ask (AskUserQuestion):
  - question: `"This entry has no feature. Add one?"`
  - options: `["Add feature", "Cancel"]`
  - header: "feature"
  - If **"Add feature"**: run Step 6 of `create-history` (collect title then description).
  - If **"Cancel"**: skip without changes.

- If the entry **already has a feature**, ask (AskUserQuestion):
  - question: `"What do you want to do with the feature?"`
  - options: `["Edit title", "Edit description", "Edit both", "Remove feature"]`
  - header: "feature"
  - **"Edit title"**: show current title, output **"Feature title?"** and wait for reply.
  - **"Edit description"**: show current description, output **"Feature description?"** and wait for reply.
  - **"Edit both"**: show current title, output **"Feature title?"** and wait for reply; then show current description, output **"Feature description?"** and wait for reply.
  - **"Remove feature"**: delete the `feature` field from the entry.

After editing, ask (AskUserQuestion):

- question: `"Edit another field?"`
- options: `["Yes", "No"]`
- header: "update-history"

If **Yes**, return to Step 3.

## Step 5 — Confirmation

Display the updated entry as a formatted TypeScript object, then ask (AskUserQuestion):

- options: `["Yes, save it", "Edit more", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing.
If **"Edit more"**, return to Step 3.

## Step 6 — Write to file

Read `data/history/history.ts` again, replace the entry in-place (keep same array position), and write.

If `year` was changed, re-sort `HISTORIES` by year ascending (oldest first).

Run `bun run typecheck`.
