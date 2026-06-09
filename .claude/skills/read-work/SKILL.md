---
name: read-work
description: Display existing Work entries from data/works/works.ts. Supports filtering by year or tag.
user-triggered: true
---

Display the contents of `data/works/works.ts`.

## Step 1 — Read data

Read `data/works/works.ts`.

## Step 2 — Filter (optional)

Ask (AskUserQuestion):
- question: `"Show all works, or filter?"`
- options: `["All", "Filter by year", "Filter by tag"]`
- header: "read-work"

If **"Filter by year"**: output **"Year?"** and wait for reply. Show only entries matching that year.
If **"Filter by tag"**: output the numbered tag list and output **"Which tag? Enter a number."** Show only entries whose `tags` includes that tag.

## Step 3 — Display

Output each matching work as a formatted block:
```
[1] The proof of DB Schema Migration  (2026)
    Tags: Category Theory, DB Theory
    Links: GitHub → https://...
    Description: The proof for validation of DB schema migrations.
```
Show total count at the end.
