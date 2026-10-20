# Persona Flow Review

**Skill name:** `persona-flow-review`  
**Version:** 1.3.0

Persona Flow Review helps product designers evaluate a Figma page's story flows against the project's defined personas, the agreed ClickUp story scope, local user stories, and the PRD.

Designers start it with a short prompt. The skill finds what it can in the project and asks only for what is missing.

For each story, it answers three questions:

1. Does the design support the user's goal and the intended journey?
2. Does it fulfil the agreed scope and support the business objective behind it?
3. Can the designer clearly explain to the client why it is a good solution?

Every story status comes with its reason. Supported stories get the user value, the business value, and a sentence to say in the walkthrough. Stories with gaps show what works, what is missing, why it matters, and a **Fix now** button for each issue.

The skill uses personas as documented evidence. It does not pretend to be the persona or replace testing with real users.

Fixes happen one issue at a time. Each fix is made on a safe copy in Figma first, and reaches the real design only after the designer approves it.

## Why this skill matters

Design reviews often become either subjective critiques or lengthy audit reports.

This skill gives a smaller, more defensible review:

```text
User goal and business objective
→ Agreed story scope
→ Design decision
→ Explained status, issue, or talking point
```

This helps designers:

- Prepare for client and stakeholder walkthroughs
- Explain decisions in terms of user value and business relevance
- Fix the gaps that matter, straight from the review
- Detect story, scope, and Figma mismatches early
- Skip noise such as English copy, sample-figure arithmetic, and typos

It is separate from a full accessibility or design-quality audit.

## Package contents

```text
persona-flow-review/
├── SKILL.md
├── README.md
├── intake.md
├── methodology.md
├── canvas-output.md
├── canvas-template.tsx
├── fix-mode.md
├── apply-fix.md
└── examples.md
```

- `SKILL.md` — the workflow followed by the AI, and which mode to use
- `intake.md` — how the skill collects inputs, finds sources, checks access, and reconciles scope before reviewing
- `methodology.md` — evidence, what to flag, status, classification, and fix rules
- `canvas-output.md` — the interactive review structure, including the Fix now buttons
- `canvas-template.tsx` — the ready-made Cursor Canvas the review fills in, so each run only writes the review data
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

- A status overview and guide, with a note on what is deliberately not flagged
- Sources checked, including any that could not be accessed
- Project-wide issues
- Open scope questions, when sources disagree
- Story filters

Each story shows, in this order:

1. **Story name and status**
2. **Why this status**, naming the design behavior behind it
3. **User and business value** (Supported), **what works** (Partially supported), or **what is needed** (Insufficient evidence)
4. **What to fix**: up to three issues, each with the affected requirement, user and business impact, the recommended fix, and a **Fix now** button
5. **A client talking point**: "Say this in the walkthrough" for Supported stories, "Safe to say now" for stories with gaps
6. **Evidence and sources**, collapsed until needed

Cursor uses an interactive Canvas when available.

On platforms without Cursor Canvas, the skill produces an equivalent self-contained interactive HTML review. If interactive file creation is unavailable, it falls back to concise Markdown.

## Status labels

- **Supported:** The user can reach the goal, and every core requirement is met.
- **Partially supported:** The user can reach the goal, but an important requirement or state is missing.
- **Needs attention:** A core requirement or the main goal is missing, contradicted, or blocked.
- **Insufficient evidence:** The flow or its sources could not be reached. It is never used for a design gap.

These labels describe story support. They are not WCAG or design-quality scores.

## What the skill does not flag

Before raising anything, the skill asks: is this a meaningful, evidence-backed gap between the agreed requirements and the design, or does it stop the user from reaching their goal? If not, it is left out.

It does not flag:

- English copy on a product that ships in another language. Developers handle localization.
- Example figures in mock data that don't add up.
- Typos, small wording differences, and visual polish.
- Edge cases with no evidence that they matter.
- Generic design advice, and accessibility or design-system rules with no real user impact.

It still flags a copy or number problem that changes the user's decision, causes a wrong record, breaks a business rule, or breaks a flow. It also flags localization work that the agreed scope makes a design deliverable.

## Fixing issues

Each issue in the review canvas has its own **Fix now** button. Fixes happen one issue at a time.

### 1. Start a fix

1. Click **Fix now** on an issue.
2. Choose **Use recommended fix**, or **Use my own instruction** and type what you want.
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
4. It re-reviews that story and updates the canvas. The story's status changes only if the evidence supports it.
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
- Claim business benefits that no source supports

Use a separate accessibility or design-audit workflow for WCAG, visual consistency, component quality, and formal conformance checks.

## Updating the skill

Keep the folder name and frontmatter name as:

```text
persona-flow-review
```

After updating any file:

- Cursor: replace the installed skill folder.
- Claude: create a new ZIP of the complete folder and upload the updated package.
