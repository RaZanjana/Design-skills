# Product Copy Refine

**Skill name:** `product-copy-refine`  
**Version:** 1.0.0

Product Copy Refine rewrites the interface copy in your Figma designs so it speaks your users' language. It reads the project's PRD, user stories, and personas, then updates the text directly in Figma without breaking the designed layout.

It is built for screens generated or drafted with AI, where copy often ends up:

- Overly technical ("Error 409: Booking entity conflict detected")
- Full of marketing filler ("Unlock seamless, AI-powered scheduling")
- Vague ("Submit", "OK", "No data")
- Inconsistent (Delete, Remove, and Discard for the same action)
- Punctuated with em dashes

## Why this skill matters

Copy is how an interface guides people. When the words come from the system instead of the user, people hesitate, make mistakes, and lose trust.

This skill grounds every rewrite in documented evidence:

```text
Persona language and needs
+ User-story requirement
+ PRD scope
= Copy the target user understands and can act on
```

This helps designers:

- Replace jargon and filler with plain, user-centred language
- Keep terms and actions consistent across every screen
- Write helpful errors, empty states, and confirmations
- Hand off screens with realistic, production-ready copy
- Keep layouts intact while the words change

## Package contents

```text
product-copy-refine/
├── SKILL.md
├── README.md
├── copy-guide.md
├── figma-rewrite.md
└── examples.md
```

- `SKILL.md`: the workflow followed by the AI
- `copy-guide.md`: the built-in writing rules, by copy type, with the banned list
- `figma-rewrite.md`: how to change text in Figma without breaking the layout
- `examples.md`: before and after rewrites with reasons
- `README.md`: installation and usage instructions

## Install in Claude

Use a ZIP containing the complete `product-copy-refine` folder.

1. Open Claude.
2. Go to **Customize → Skills**.
3. Select **Add → Upload skill**.
4. Choose the ZIP.
5. Enable the skill after it appears in your skills list.

Do not upload the individual Markdown files separately.

## Install in Cursor

1. Download or clone this repository.
2. Copy the complete `product-copy-refine` folder to:

```text
~/.cursor/skills/product-copy-refine/
```

This makes the skill available across your Cursor projects.

For one repository only, copy it to:

```text
[project]/.cursor/skills/product-copy-refine/
```

Do not install it inside `~/.cursor/skills-cursor/`; that folder is reserved for Cursor's built-in skills.

## Prerequisites

- The PRD
- Current user stories
- Persona files
- A Figma design URL with edit access
- The names of the pages or frames to rewrite
- The Figma connector or plugin for your AI platform, with write access (the skill uses the `figma-use` skill for editing)

Inputs can be URLs, folders with multiple files, or single files.

## How to use

Explicitly ask the AI to use the skill:

```text
Use the product-copy-refine skill.

PRD: [path, folder, or URL]
User stories: [path, folder, or URL]
Personas: [path, folder, or URL]
Figma file: [URL]
Pages or frames: [names or node links]
Platform: [iOS, Android, web, or mixed] (optional)
Protected terms: [brand names, legal phrases] (optional)
```

The first five inputs are mandatory. The skill stops and asks when any of them is missing or inaccessible.

## Example request

```text
Use the product-copy-refine skill.

PRD: @docs/prd.md
User stories: @docs/stories/
Personas: @docs/personas/
Figma: https://www.figma.com/design/...
Frames: Onboarding, Booking flow, Settings
Platform: iOS
Protected terms: ClinicFlow
```

## What the skill does

1. Builds an audience profile and glossary from your personas, PRD, and stories.
2. Lists every text layer in the selected frames and tags its role (button, error, empty state, and so on).
3. Rewrites only the copy that breaks a rule, using your users' words.
4. Updates the text in Figma, keeping fonts, styles, sizes, and auto layout unchanged.
5. Checks that every rewrite fits, and that no em dash remains.
6. Produces a change log (Cursor Canvas, or Markdown elsewhere) with before, after, reason, and a Figma link for every change.

## The em dash rule

The skill never writes an em dash (—). It replaces existing ones with a comma, period, or parentheses, depending on meaning. This applies to the Figma copy, the change log, and the summary.

## Boundaries

The skill will not:

- Change fonts, sizes, colors, layer sizes, or auto layout
- Edit main components (these are flagged, because editing them changes every instance)
- Edit sample data, brand names, legal text, hidden or locked layers, or variable-bound text
- Add features, promises, or claims the PRD does not support
- Shrink text to force a fit (copy that cannot fit is flagged instead)
- Guess when mandatory sources are missing

## Undoing changes

Edits are made directly in the file. To undo, use Figma's version history, or restore individual strings using the "before" column in the change log. Consider saving a named version in Figma before running the skill.

## Updating the skill

Keep the folder name and frontmatter name as:

```text
product-copy-refine
```

After updating any file:

- Cursor: replace the installed skill folder.
- Claude: create a new ZIP of the complete folder and upload the updated package.
