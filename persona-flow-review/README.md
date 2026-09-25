# Persona Flow Review

**Skill name:** `persona-flow-review`  
**Version:** 1.0.0

Persona Flow Review helps product designers evaluate Figma wireflows against approved personas, user stories, and project scope.

It produces a lightweight, walkthrough-ready review that explains:

- What the intended user needs
- Whether the flow supports that objective
- What evidence supports the design
- Which important gaps need consideration
- What the designer can confidently explain to stakeholders

The skill uses personas as documented evidence. It does not pretend to be the persona or replace testing with real users.

## Why this skill matters

Design reviews often become either subjective critiques or lengthy audit reports.

This skill provides a smaller, more defensible review:

```text
Persona need
→ User-story requirement
→ Design decision
→ Reason
```

This helps designers:

- Prepare for client and stakeholder walkthroughs
- Explain decisions without relying on personal preference
- Detect story, scope, and Figma mismatches early
- Keep reviews consistent across projects
- Focus on meaningful issues instead of documenting everything

It is separate from a full accessibility or design-quality audit.

## Package contents

```text
persona-flow-review/
├── SKILL.md
├── README.md
├── methodology.md
├── canvas-output.md
└── examples.md
```

- `SKILL.md` — the workflow followed by the AI
- `methodology.md` — evidence, assessment, and classification rules
- `canvas-output.md` — the interactive review structure
- `examples.md` — examples of useful and unhelpful feedback
- `README.md` — installation and usage instructions

## Install in Claude

Use a ZIP containing the complete `persona-flow-review` folder.

1. Open Claude.
2. Go to **Customize → Skills**.
3. Select **Add → Upload skill**.
4. Choose the ZIP.
5. Enable the skill after it appears in your skills list.

Do not upload the individual Markdown files separately.

For a Team or Enterprise organization, an administrator can upload the same ZIP through the organization Skills settings.

## Install in Cursor

Cursor currently documents folder-based skill installation rather than ZIP importing.

1. Download or clone this repository.
2. Copy the complete `persona-flow-review` folder to:

```text
~/.cursor/skills/persona-flow-review/
```

This makes the skill available across your Cursor projects.

For one repository only, copy it to:

```text
[project]/.cursor/skills/persona-flow-review/
```

Do not install it inside `~/.cursor/skills-cursor/`; that folder is reserved for Cursor’s built-in skills.

## Prerequisites

For the strongest review, provide:

- Approved persona files
- Current user-story files
- Approved scope and decision files
- A Figma design URL
- The name of the Wireflows page

The AI also needs access to those sources.

For direct Figma inspection, enable the Figma connector or plugin supported by your AI platform. If direct access is unavailable, provide story-grouped screenshots or a PDF export.

## How to use

Explicitly ask the AI to use the skill:

```text
Use the persona-flow-review skill.

Persona files: [path or attached files]
User stories: [path or attached files]
Scope decisions: [path or attached files]
Figma file: [URL]
Wireflows page: [page name]
Stories to review: [all or story IDs]
```

The first five inputs are mandatory:

1. Persona source
2. User-story source
3. Scope source
4. Figma file or exported design
5. Wireflows page name

Story selection is optional. When omitted, the skill reviews all story sections it can reliably map.

## Example request

```text
Use the persona-flow-review skill to review this project.

Personas: @docs/personas/
Stories: @docs/stories/
Scope: @docs/product-decisions/
Figma: https://www.figma.com/design/...
Wireflows page: ⭐️ Wireflows
Review stories: 2.1, 2.5, 4.4
```

## What the skill produces

The skill generates:

- An assessment guide
- Project-wide findings
- Story filters
- Persona and user objective
- Supports / Partially supports / Needs attention / Insufficient evidence
- Up to three evidence-based observations per story
- Design rationale
- Consider changing / Keep
- Walkthrough notes
- Direct references to persona, story, Figma flow, and relevant screens

Cursor uses an interactive Canvas when available.

On platforms without Cursor Canvas, the skill produces an equivalent self-contained interactive HTML review. If interactive file creation is unavailable, it falls back to concise Markdown.

## Assessment labels

- **Supports:** The main user objective and story requirements are covered.
- **Partially supports:** The flow works, but an important gap remains.
- **Needs attention:** A core requirement is missing or contradicted.
- **Insufficient evidence:** The available material cannot support a reliable assessment.

These labels describe story and persona support. They are not WCAG or overall design-quality scores.

## Review boundaries

The skill will not:

- Invent persona needs
- Simulate real user behavior
- Treat design preference as evidence
- Claim WCAG compliance
- Edit the Figma design during review
- Guess when mandatory sources are inaccessible

Use a separate accessibility or design-audit workflow for WCAG, visual consistency, component quality, and formal conformance checks.

## Updating the skill

Keep the folder name and frontmatter name as:

```text
persona-flow-review
```

After updating any file:

- Cursor: replace the installed skill folder.
- Claude: create a new ZIP of the complete folder and upload the updated package.
