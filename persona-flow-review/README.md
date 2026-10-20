# Persona Flow Review

**Skill name:** `persona-flow-review`  
**Version:** 1.2.0

Persona Flow Review helps product designers evaluate a Figma page's story flows against the project's defined personas, the agreed ClickUp story scope, local user stories, and the PRD.

Designers start it with a short prompt. The skill finds what it can in the project and asks only for what is missing.

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
├── intake.md
├── methodology.md
├── canvas-output.md
├── fix-mode.md
├── apply-fix.md
└── examples.md
```

- `SKILL.md` — the workflow followed by the AI, and which mode to use
- `intake.md` — how the skill collects inputs, finds sources, checks access, and reconciles scope before reviewing
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

- **Figma connector**, with access to the file. If it is unavailable, provide story-grouped screenshots or a PDF export.
- **ClickUp connector**, signed in, with access to the stories' tasks and comments. If it is unavailable, you can paste the task descriptions and comments, or continue without ClickUp.
- **The project open** in your editor, so the skill can read the local story files, persona files, and PRD.

## How to use

Start with a short prompt:

```text
Use the /persona-flow-review skill to review [story names in Figma]
```

For example:

```text
Use the /persona-flow-review skill to review Confirm Suppression Before Sequence and Configure Multi-Step Sequence
```

The skill then:

1. Takes whatever your prompt already gives, such as story names, URLs, page names, or paths.
2. Looks in the project for the story files, persona files, and ClickUp links, and asks you to confirm what it found.
3. Asks only for what is still missing, in one short message.
4. Finds the PRD through the story files. You never need to provide it.
5. Reads the ClickUp tasks and every comment, the local story files, the PRD, the personas, and the Figma page you named.
6. Shows a short summary of the sources it read, the ClickUp decisions that change the local documents, and any question that would change the result.
7. Runs the review.

### What the skill needs

| Input | How it gets it |
| --- | --- |
| Stories to review, by their names in Figma | Your prompt, or it asks |
| Personas, as details or a file path | Found in the project and confirmed, or it asks |
| ClickUp URL: a sprint or list URL, or task URLs | Found in the project and confirmed, or it asks |
| Local user story files or folder | Found in the project and confirmed, or it asks |
| Figma file URL and exact page name | It asks |
| PRD | Found through the story files. Never asked. |

You can give everything up front to skip the questions:

```text
Use the /persona-flow-review skill to review 2.1, 2.5, and 4.4.

Personas: @docs/personas/
Stories: @docs/stories/
ClickUp: https://app.clickup.com/.../v/li/...
Figma: https://www.figma.com/design/...
Page: ⭐️ Wireflows
```

### Which source wins

1. **ClickUp task and comments** decide the agreed scope of each story. The latest explicit decision wins.
2. **Local story files and decision records** add context, dependencies, and references.
3. **The PRD** explains product intent and business rules where ClickUp is silent.
4. **Persona files** describe the target users.
5. **The Figma page** is the design being reviewed.

When sources disagree and no ClickUp decision settles it, the skill does not choose. It asks you, or lists the conflict under "Open scope questions".

## What the skill produces

The skill generates:

- An assessment guide
- Sources checked, including any that could not be accessed
- Project-wide findings
- Open scope questions, when sources disagree
- Story filters
- Persona, user objective, and the scope used
- Supports / Partially supports / Needs attention / Insufficient evidence
- Up to three evidence-based observations per story, each with a priority, a confidence label, and its sources
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
- Edit story, persona, PRD, or ClickUp content
- Guess when mandatory sources are inaccessible
- Claim it reviewed a source it could not read
- Pick silently between conflicting sources

Use a separate accessibility or design-audit workflow for WCAG, visual consistency, component quality, and formal conformance checks.

## Updating the skill

Keep the folder name and frontmatter name as:

```text
persona-flow-review
```

After updating any file:

- Cursor: replace the installed skill folder.
- Claude: create a new ZIP of the complete folder and upload the updated package.
