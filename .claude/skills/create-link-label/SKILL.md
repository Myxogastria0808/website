---
name: create-link-label
description: Add a new labelled external-link type with a react-icons icon to data/shared/linkIcons.ts. Updates LINK_LABELS, LINK_ICONS, and the import statements.
user-triggered: true
---

Add a new entry to `LINK_LABELS` and `LINK_ICONS` in `data/shared/linkIcons.ts`.

## Input method rules

- **Free text** (label name, custom icon): output the question as plain chat text and wait for the user's reply.
- **Choices**: use AskUserQuestion.

## Step 1 — Read current data

Read `data/shared/linkIcons.ts` to understand existing labels, icons, and import statements.

## Step 2 — Label name

Output: **"Label name for the new link type? (e.g. npm, Notion)"**
Wait for reply. Check that it does not already exist in `LINK_LABELS` (case-insensitive). If it does, warn and ask again.

## Step 3 — Icon search

### Primary: react-icons

Search with WebSearch: `react-icons <label name> icon`. Identify candidates and their packages (e.g. `react-icons/fa6`, `react-icons/si`).

### Fallback: other icon libraries

If no suitable match in react-icons, search in order (these are NOT included in react-icons):

1. **Lucide** (`lucide-react`) — `lucide <label name> icon`
2. **Iconoir** (`iconoir-react`) — `iconoir <label name> icon`
3. **Fluent UI Icons** (`@fluentui/react-icons`) — `fluent ui icons <label name>`
4. **Carbon Icons** (`@carbon/icons-react`) — `carbon icons <label name>`

Note which candidates require a package install.

Output all candidates as plain text:

```
Icon candidates:
1. SiNpm   (react-icons/si)
2. FaNpm   (react-icons/fa6)
3. Package2 (lucide-react) ⚠ requires package install
…
```

Then output: **"Which icon? Enter a number, or type a custom icon as IconName@package (e.g. SiNpm@react-icons/si)."**
Wait for reply.

If the chosen icon requires a package install, run `bun add <package>` before writing to file.

## Step 4 — Confirmation

Display a preview of the changes (import line, LINK_LABELS entry, LINK_ICONS entry), then ask (AskUserQuestion):

- options: `["Yes, add it", "Cancel"]`
- header: "Confirm"

If Cancel, stop without writing anything.

## Step 5 — Write to file

Edit `data/shared/linkIcons.ts`:

1. **Import**: add the icon to the existing import from its package. If the package is new, add a new import line grouped with the other `react-icons` imports.
2. **LINK_LABELS**: append the new label. Keep the array sorted alphabetically (case-insensitive).
3. **LINK_ICONS**: add `"<label>": <IconName>,` keeping entries in the same order as `LINK_LABELS`.

Run `bun run typecheck` to verify no type errors were introduced.
