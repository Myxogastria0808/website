---
name: create-history
description: Interactively add a new HistoryEntry to data/history/history.ts. Asks questions in HistoryEntry type property order (name → description → year → approximate → feature → links), validates link URLs, and keeps HISTORIES sorted by year ascending.
user-triggered: true
---

Add a new entry to `data/history/history.ts` by walking the user through questions **in the same order as the `HistoryEntry` type properties**: `name → description → year → approximate → feature → links`.

## Input method rules

- **Free text** (name, description body, year, URLs, custom label names): output the question as plain chat text and wait for the user's reply. Do NOT use AskUserQuestion for these.
- **Choices** (Yes/No, pick from a list): use AskUserQuestion.

## Step 1 — Read current data

Read the following files before asking anything:

- `data/history/history.ts` — current HISTORIES array and type definitions
- `data/shared/linkIcons.ts` — available LinkLabel values

## Step 2 — name

Output as plain text: **"Entry title?"**
Wait for the user's reply. This is required; if the user gives nothing, ask again.

## Step 3 — description

Ask (AskUserQuestion):

- question: `"How do you want to write the description?"`
- options: `["Auto-generate", "I'll write it"]`
- description for Auto-generate: "Generate a concise one-sentence English description from the title"
- header: "description"

If **"I'll write it"**: output **"Description?"** and wait for the user's reply.
If **"Auto-generate"**: generate the description from the name now.

## Step 4 — year

Output as plain text: **"Year and month? (YYYY-MM, e.g. 2025-04)"**
Wait for reply. Validate format: must match `YYYY-MM` where `YYYY` is 1900–2099 and `MM` is 01–12. If invalid, show an error and ask again.

## Step 5 — approximate

Ask (AskUserQuestion):

- question: `"Is this date approximate?"`
- options: `["No", "Yes"]`
- description for Yes: "Displays \"ca.\" before the date in the UI"
- header: "approximate"

## Step 6 — feature

Ask (AskUserQuestion):

- question: `"Add an Affiliations feature card? (shown on the homepage Activity section)"`
- options: `["No", "Yes"]`
- header: "feature"

If **Yes**:

1. Output: **"Feature title? (organization name shown in the panel)"** and wait for reply.
2. Output: **"Feature description? (short description shown in the panel)"** and wait for reply.

The `category` is always `"Affiliations"` — do not ask.

## Step 7 — links

Ask (AskUserQuestion):

- question: `"Add external links?"`
- options: `["Yes", "No"]`
- header: "links"

If **Yes**, repeat the following loop until the user is done:

1. Output a numbered list of all labels from `data/shared/linkIcons.ts` as plain text:

   ```
   Link labels:
   1. Website
   2. GitHub
   …
   N. Custom
   ```

   Then output: **"Which label? Enter a number."**
   Wait for reply. Parse the number to resolve the label name.

2. For **Custom**, first output: **"Label text?"** and wait for reply.

3. Output: **"URL for \<label\>?"** and wait for reply.
   - Fetch the URL with WebFetch to verify it returns a non-error response.
   - If the fetch fails or returns 4xx/5xx, output a warning and ask (AskUserQuestion):
     - options: `["Re-enter URL", "Use it anyway"]`, header: "links"
   - If "Re-enter URL", ask for the URL again and repeat the check.

4. Ask (AskUserQuestion):
   - question: `"Add another link?"`
   - options: `["Yes", "No"]`
   - header: "links"
   - If **No**, exit the loop.

## Step 8 — Confirmation

Display the complete entry as a formatted TypeScript object, then ask (AskUserQuestion):

- options: `["Yes, add it", "Edit a field", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing anything.

If **"Edit a field"**, output:

```
Fields:
1. name
2. description
3. year
4. approximate
5. feature
6. links
```

Output: **"Which field? Enter a number."**
Wait for reply. Jump back to the corresponding step, re-run it, then return to Step 8.

## Step 9 — Write to file

Read `data/history/history.ts` again, then insert the new entry into `HISTORIES`:

1. The array **must remain sorted by year ascending** (oldest first).
2. Insert after the last existing entry with the same `year` value.
3. If no entry with that year exists, insert at the position that keeps year-ascending order.

Run `bun run typecheck` after writing.
