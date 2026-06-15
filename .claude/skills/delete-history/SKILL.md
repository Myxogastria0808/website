---
name: delete-history
description: Remove an existing HistoryEntry from data/history/history.ts.
user-triggered: true
---

Remove an entry from `data/history/history.ts`.

## Step 1 — Read data

Read `data/history/history.ts`.

## Step 2 — Select entry

Output a numbered list of all entries (name + year):

```
1. Enrolled in Hyogo Prefectural Ono High School  (2020-04)
2. Joined Biology Club  (2020-06)
…
```

Output: **"Which entry to delete? Enter a number."**
Wait for reply. If out of range, warn and ask again.

## Step 3 — Confirmation

Display the selected entry as a formatted TypeScript object and ask (AskUserQuestion):

- question: `"Delete this entry?"`
- options: `["Yes, delete it", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing.

## Step 4 — Write to file

Read `data/history/history.ts` again, remove the entry from the `HISTORIES` array, and write.

Run `bun run typecheck`.
