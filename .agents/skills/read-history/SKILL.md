---
name: read-history
description: Display existing HistoryEntry entries from data/history/history.ts. Supports filtering by year.
user-triggered: true
---

Display the contents of `data/history/history.ts`.

## Step 1 — Read data

Read `data/history/history.ts`.

## Step 2 — Filter (optional)

Ask (AskUserQuestion):

- question: `"Show all history entries, or filter?"`
- options: `["All", "Filter by year"]`
- header: "read-history"

If **"Filter by year"**: output **"Year? (YYYY)"** and wait for reply. Show only entries whose `year` starts with that year string.

## Step 3 — Display

Output each matching entry as a formatted block:

```
[1] Enrolled in University of Tsukuba  (2023-04)
    Approximate: false
    Description: Enrolled in the School of Informatics, University of Tsukuba.
    Feature (Affiliations): —
    Links: Website → https://www.tsukuba.ac.jp

[2] Joined Biopackathon  (2023-08)
    Approximate: false
    Description: Joined Biopackathon, a community hackathon focused on ...
    Feature (Affiliations): Biopackathon — A community hackathon focused on ...
    Links: Website → https://sites.google.com/view/biopackathon/
```

If an entry has no `feature`, show `Feature (Affiliations): —`.
If an entry has no `links`, omit the Links line.

Show total count at the end.
