---
name: create-work
description: Interactively add a new Work entry to data/works/works.ts. Asks questions in Work type property order (name → description → tags → year → links), supports new tag creation with similarity check, validates link URLs, and keeps WORKS sorted by year descending.
user-triggered: true
---

Add a new entry to `data/works/works.ts` by walking the user through questions **in the same order as the `Work` type properties**: `name → description → tags → year → links`.

## Input method rules

- **Free text** (title, description body, tag names, URLs, custom label names): output the question as plain chat text and wait for the user's reply. Do NOT use AskUserQuestion for these.
- **Choices** (Yes/No, pick from a list, select a mode): use AskUserQuestion.

## Step 1 — Read current data

Read the following files before asking anything:

- `data/works/works.ts` — current WORKS array
- `data/works/tags.ts` — available Tag values
- `data/works/linkIcons.ts` — available LinkLabel values

## Step 2 — name

Output as plain text: **"Work title?"**
Wait for the user's reply. This is required; if the user gives nothing, ask again.

## Step 3 — description

Ask (AskUserQuestion):

- options: `["Auto-generate", "I'll write it"]`
- description for Auto-generate: "Generate a concise one-sentence English description from the title and tags"
- header: "description"

If **"I'll write it"**: output **"Description?"** and wait for the user's reply.
If **"Auto-generate"**: defer generation until after tags are collected in Step 4.

## Step 4 — tags

### Existing tag selection

Output a numbered list as plain text:

```
Existing tags:
1. Category Theory
2. DB Theory
…
```

Then output: **"Which tags? Enter numbers separated by commas (e.g. 1,3), or press Enter to skip."**
Wait for reply. Parse the numbers to resolve tag names. An empty reply means no existing tags.

### New tag creation

Ask (AskUserQuestion):

- question: `"Add a new tag?"`
- options: `["Yes", "No"]`
- header: "tags"

If **Yes**: follow the `create-tag` skill — Step 2 only (collect names + similarity check + "Add another?" loop, do NOT write to file yet). Carry the names forward for Step 8.

If **"Auto-generate"** was chosen in Step 3, generate the description now using the title and all collected tags.

## Step 5 — year

Ask (AskUserQuestion):

- Derive options from distinct years in WORKS (most recent first, up to 3); always include the current calendar year if not listed; plus Other for a custom year
- header: "year"

## Step 6 — links

Ask (AskUserQuestion):

- question: `"Add external links?"`
- options: `["Yes", "No"]`
- header: "links"

If **Yes**:

1. Output a numbered list of all labels as plain text:

   ```
   Link labels:
   1. GitHub
   2. GitLab
   …
   N. Custom
   ```

   Then output: **"Which labels? Enter numbers separated by commas."**
   Wait for reply. Parse the numbers.

2. For each selected label, output: **"URL for \<label\>?"** and wait for the reply.
   - Fetch the URL with WebFetch to verify it returns a non-error response.
   - If the fetch fails or returns 4xx/5xx, output a warning and ask (AskUserQuestion):
     - options: `["Re-enter URL", "Use it anyway"]`, header: "links"
   - If "Re-enter URL", ask for the URL again and repeat the check.

3. For **Custom**, first output: **"Label text?"** and wait for reply. Then ask for the URL as above.

## Step 7 — Confirmation

Display the complete work entry as a formatted TypeScript object, then ask (AskUserQuestion):

- options: `["Yes, add it", "Edit a field", "Cancel"]`
- header: "Confirm"

If **Cancel**, stop without writing anything.

If **"Edit a field"**, output:

```
Fields:
1. name
2. description
3. tags
4. year
5. links
```

Output: **"Which field? Enter a number."**
Wait for reply. Jump back to the corresponding step, re-run it, then return to Step 7 (show the updated preview and confirm again).

## Step 8 — Write to file

### tags.ts (if new tags were collected)

Append each new tag to the `TAGS` array in `data/works/tags.ts`, then sort alphabetically (case-insensitive).

### works.ts

Read `data/works/works.ts` again, then insert the new entry into `WORKS`:

1. The array **must remain sorted by year descending** (newest first).
2. Insert after the last existing entry with the same year.
3. If no entry with that year exists, insert at the position that keeps year-descending order.
4. Do **not** modify `ALL_WORKS`.

Run `bun run typecheck` after writing both files.
