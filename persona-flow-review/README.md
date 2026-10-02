# Persona Flow Review

**Skill name:** `persona-flow-review`  
**Version:** 1.1.0

Persona Flow Review helps product designers evaluate Figma wireflows against approved personas, user stories, and project scope.

It produces a lightweight, walkthrough-ready review that explains:

- What the intended user needs
- Whether the flow supports that objective
- What evidence supports the design
- Which important gaps need consideration
- What the designer can confidently explain to stakeholders

The skill uses personas as documented evidence. It does not pretend to be the persona or replace testing with real users.

Designers can then fix each issue from the review, one at a time. The fix is made on a safe copy in Figma first, and reaches the real design only after the designer approves it.

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
├── fix-mode.md
├── apply-fix.md
└── examples.md
```

- `SKILL.md` — the workflow followed by the AI, and which mode to use
- `methodology.md` — evidence, assessment, classification, and fix rules
- `canvas-output.md` — the interactive review structure, including the fix buttons
- `fix-mode.md` — how one issue is fixed on the "Fixed issues" Figma page
- `apply-fix.md` — how an approved fix reaches the Draft and Wireflows pages
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
- A "Fix issue" button on every fixable issue, with its fix status

Cursor uses an interactive Canvas when available.

On platforms without Cursor Canvas, the skill produces an equivalent self-contained interactive HTML review. If interactive file creation is unavailable, it falls back to concise Markdown.

## Assessment labels

- **Supports:** The main user objective and story requirements are covered.
- **Partially supports:** The flow works, but an important gap remains.
- **Needs attention:** A core requirement is missing or contradicted.
- **Insufficient evidence:** The available material cannot support a reliable assessment.

These labels describe story and persona support. They are not WCAG or overall design-quality scores.

## Fixing issues

Each issue in the review canvas has its own "Fix issue" button. Fixes happen one issue at a time.

### 1. Start a fix

1. Click **Fix issue** on an observation.
2. Choose **Use suggested fix**, or **Use my own instruction** and type what you want.
3. Click **Start fix**. A new chat opens with the review attached.

The AI makes the fix straight away, without asking first. This is safe because it works only on a page called **Fixed issues**:

- It copies the screen from the Wireflows page twice and detaches every component in both copies. No edit on this page can reach your real components.
- One copy is labelled **Original** and stays untouched. The other is labelled **Fixed** and gets the fix.
- A note card beside them explains the issue, what changed, and the approach.
- The page has one section per story, sorted by story ID, with one row per issue.

### 2. Review the fix

Look at the Original and Fixed copies side by side. You can edit the Fixed copy by hand. Your edits are included when the fix is applied.

Then choose, in the chat or in the canvas:

- **Approve and apply**
- **Request changes:** describe what to change. The AI revises the same Fixed copy.
- **Reject:** the copies stay for reference, and nothing else changes.

### 3. Apply the fix

After you approve, the AI does the rest without further questions:

1. It compares the Original and Fixed copies to get the exact changes, including your manual edits.
2. It applies those changes to the screen's main component on the Draft page.
3. It checks the Wireflows page shows the fix. If a Wireflows screen has its own local edit on a changed layer, it updates that layer too.
4. It re-reviews that story and updates the canvas. The story's assessment changes only if the evidence supports it.
5. Other stories that use the same screen are marked **Re-review suggested**.

When a fix needs a new screen or state, the AI creates a new component on the Draft page. It places it in the story's Wireflows section next to the related screen and connects it.

### Requirements for fixing

- The fix chat must run in **Agent mode**. In Ask mode it cannot write to Figma.
- The Figma connector must have edit access to the file.
- Screens on the Wireflows page should be instances of components on the Draft page. Otherwise, a fix can be made on the Fixed issues page but cannot be applied automatically.
- Fix buttons work in Cursor Canvas. In the HTML version, the buttons copy a prompt to paste into a new chat.

## Review boundaries

The skill will not:

- Invent persona needs
- Simulate real user behavior
- Treat design preference as evidence
- Claim WCAG compliance
- Edit the Figma design during review
- Change the Draft or Wireflows pages before you approve a fix
- Edit story, persona, or scope files
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
