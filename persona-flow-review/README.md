# Persona Flow Review

**Skill name:** `persona-flow-review`  
**Version:** 1.9.3

Persona Flow Review helps product designers evaluate a Figma page's story flows against the project's defined personas, the agreed ClickUp story scope, local user stories, and the PRD.

Designers start it with a short prompt. The skill finds what it can in the project and asks only for what is missing.

For each story, it answers three questions:

1. Does the design support the user's goal and the intended journey?
2. Does it fulfil the agreed scope and support the business objective behind it?
3. Can the designer clearly explain to the client why it is a good solution?

Every story status comes with its reason. Supported stories get the user value and the business value. Stories with gaps show what works, what is missing, why it matters, and a **Fix now** button for each issue.

The skill also picks out the few design decisions worth defending, and prepares:

- **Figma comments** that explain those decisions beside the design, with the user and business reasons the client can repeat to their team. You approve them, then publish them.
- **Figma annotations** for elements beyond the stories that are worth keeping, after you approve them.
- **Talking points** for each story, and **a walkthrough script** when you ask for one, that follows the user's journey and is honest about open gaps.

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
├── publish-comments.md
├── annotate-figma.md
└── examples.md
```

- `SKILL.md` — the workflow followed by the AI, and which mode to use
- `intake.md` — how the skill collects inputs, finds sources, checks access, and reconciles scope before reviewing
- `methodology.md` — evidence, what to flag, status, classification, fix rules, and how design decisions are picked for comments
- `canvas-output.md` — the canvas's three views: findings, design rationale, and client meeting
- `canvas-template.tsx` — the ready-made Cursor Canvas the review fills in, so each run only writes the review data
- `fix-mode.md` — how one issue is fixed on the "Fixed issues" Figma page
- `apply-fix.md` — how an approved fix reaches the Draft and Wireflows pages
- `publish-comments.md` — how approved comments are published, updated, removed, and checked in Figma
- `annotate-figma.md` — how approved beyond-scope annotations are added, updated, and removed in Figma
- `examples.md` — examples of useful and unhelpful feedback, comments, annotations, and script
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
- **To publish comments:** a Figma personal access token with file_comments:read and file_comments:write, created when you publish. In Cursor, publishing may also need network access to api.figma.com, which Cursor asks you to approve.
- **To add annotations:** edit access to the Figma file through the Figma connector.

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

The canvas has three views, one per purpose. The header shows the story counts, a warning for any source that could not be checked, and a button per view with a one-line summary, such as "3 open issues, 1 ready for your review".

**Findings** (opens first): what to fix before the meeting.

- **Needs your decision:** fixes ready for your review, and scope questions where the sources disagree. Shown only when something waits on you.
- Project-wide issues, then story filters and the story list.
- Each story shows its status and why, the user and business value, what works or what is needed, up to three issues with a **Fix now** button each, resolved issues, a link to its design rationale, and its evidence, collapsed.
- At the bottom, collapsed: what the labels mean, what is deliberately not flagged, and the sources checked.

**Design rationale:** the decisions worth defending, and why.

- The recommended Figma comments, grouped by story. Each shows its wording, the question it answers, and its reasons side by side: the user need, the business objective, and the design principle. A comment whose reason rests on an assumption carries a **Check before publishing** warning.
- Approve, exclude, edit wording, approve all, and publish. Each comment shows its real Figma status, and **See it in Figma** once Figma confirms it.
- **Optional comments**, collapsed: more decisions that passed every test and answer questions the client's team may ask. Add them one at a time or all at once.
- **Beyond the stories:** elements no story asks for that look worth keeping, each with its annotation text and the same controls.
- **In Figma now** lists every published comment and annotation with its link. Figma has no link that opens a single comment, so a comment link opens the spot where it is pinned. Press C in Figma to show comments there. Annotation links open the screen in Dev Mode. A note Figma hasn't confirmed gets **Check in Figma** instead, and failed or removed notes get no link.

**Client meeting:** what to say.

- **Talking points:** one or two sentences per story. "Say this" for Supported stories, "Safe to say now" for stories with gaps.
- **Walkthrough script:** a **Generate walkthrough script** button until you ask for one. Then one script in journey order, with each stage's story IDs and Figma flow links, stage navigation, edit, copy, and regenerate. Under each stage are the questions the client may ask, with answers.

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

An element that no story asks for is not flagged when it breaks nothing. When it has clear user or business value, it is suggested as worth keeping. When it has none, it is ignored. Only an addition that contradicts an exclusion or a business rule, or changes agreed behavior, is a scope conflict.

## Design rationale

### Which decisions get a comment

Clients often review a design on their own and share it with their team. A good comment helps them check a decision without you and explain it internally, so a misunderstanding doesn't turn into a revision. A weak one is noise. So a decision gets a comment only when it passes five tests:

1. **It is a decision**: the designer chose it, and it could have been different, such as an order of steps, a default, or what is shown or hidden.
2. **A reason backs it**: a documented user need, a documented business objective, a design principle applied to this screen in plain words, or what follows directly from how the design works.
3. **It is not obvious**: someone on the client's team could question it, change it, or miss its point.
4. **It is safe**: its story does not need attention, and no open issue touches its screen.
5. **It is not a repeat**: no other comment gives the same reason. When the same reasoning applies on several screens, one comment covers them, and the canvas names the others.

What passes is ranked across every story by impact, how likely the client's team is to question it, and the strength of the evidence. The top ones are recommended: up to 5 for eight stories or fewer, 6 for 9 to 11, 7 for 12 to 14, and 8 for more. The next ones become optional. When nothing passes, the canvas says so instead of filling the view.

Each comment is 25 to 45 words. It names the decision, says what it does for the user, and adds the business value only when a source documents the objective. It never forces a business reason, never states a hope as a result, and never mentions ClickUp, the story, the product owner, or "as agreed", because an internal decision is no argument for the client. When a reason rests on an assumption, such as how the client's business works, the comment says **Check before publishing**, and **Approve all** skips it until you approve it on your own.

The skill also handles the awkward cases: a user need and a business need that pull apart, a story with missing criteria, a decision that changed the original story, and a story that is only partly supported. See `methodology.md`.

### Walkthrough script

The review doesn't write a script. When you need one, click **Generate walkthrough script** in the **Client meeting** view. It opens a new chat that writes the script from the current review.

One script for the whole review, about two to four minutes spoken. It follows the user's journey, explains how the design helps and why the key decisions fit the user, and links each stage to the business objective when a source documents one. It names each open gap in one honest sentence, with the next step, and asks the client to confirm any beyond-scope element.

Each stage shows the story IDs it covers, with a link to each story's flow in Figma, and a link to its key screen. **Copy script** includes those references under each stage. Under each stage, the canvas also lists the questions the client may ask, with an answer, so you are ready for them. These questions are not copied.

Edit any stage in the canvas. **Regenerate** rewrites it from the current review. If you had edits, you choose whether to keep them. A re-run of the review or an applied fix never rewrites the script. When the review changes after the script was written, the canvas warns you and offers **Regenerate**.

### Publishing comments

Approved comments are published from the **Design rationale** view. **Optional comments** sit below the list. Click **Add to comments**, or **Add all**, to move them into the list, and they publish like the others.

1. Approve, exclude, or edit each comment in the canvas, or click **Approve all**.
2. Click **Publish approved**. A new chat opens.
3. The chat asks for a Figma personal access token. Create one in Figma under **Settings → Security → Generate new token**:
   - Choose the shortest expiry Figma offers.
   - Tick only **file_comments:read** and **file_comments:write**.
4. Give the token to the skill in one of two ways:
   - **Safer, on a Mac:** run the command the chat shows in the Terminal app and paste the token there. It goes into your Mac's Keychain and never appears in the chat. Later buttons reuse it until you delete it.
   - **Quicker:** paste it into the chat. It is saved in that chat's transcript on your computer, and a later button press asks for it again.
5. The skill checks the token, posts each approved comment, and updates its status in the canvas.
6. Revoke the token in Figma when you are done. If you used the Keychain, delete it with `security delete-generic-password -a "$USER" -s persona-flow-review-figma`.

How the token is handled:

- It is handed to Figma in a request header, read from the Keychain or the chat's shell. It never appears in commands, the process list, files, the canvas, comments, the script, or error messages.
- A pasted token is cleared from the chat's shell at the end of the run. It stays in the chat transcript, because you pasted it there, so a short expiry and revoking it afterwards are the real protection.
- The skill uses its own token name, so it never picks up another Figma token already set on your computer.

What Figma allows:

- Comments are posted under the token owner's name.
- Figma's API cannot edit a comment. **Update in Figma** posts the new wording and removes the old comment, so it gets a new ID. When the comment already has replies, the new wording is posted as a reply instead, so the replies stay.
- Only the comment's author can remove it.
- Figma can't pin a comment to a layer inside a component. The skill then pins it to the screen, at the feature's position.
- A comment stays in Figma when its screen is deleted. A re-run of the review flags it so you can remove it.
- Before every post, the skill checks the file's comments, so retries and re-runs never create duplicates.
- A comment shows as published only after Figma confirms it. When the result is unclear, or a chat closed before it reported back, it shows **Needs check**, and **Check Figma status** confirms it.
- The skill refuses to publish empty wording or wording that looks like a token.

### Beyond-scope annotations

Some designs include elements no story asks for that are worth keeping. The skill suggests up to about five, each with an annotation that starts "Beyond the story:". After you approve them, **Add approved annotations** writes them through the Figma connector, in a "Beyond scope" annotation category. No token is needed. Annotations can be updated and removed in place, and re-runs update the existing annotation instead of adding another. Other annotations on the same screen, in any category, stay exactly as they were.

Annotations show in Figma when annotations are turned on, and in Dev Mode. Check that your client can see them before you rely on them.

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
- Publish a comment or write an annotation you have not approved
- Show a comment as published before Figma confirms it
- Save your Figma token in any file, or show it in the canvas, comments, script, or messages

Use a separate accessibility or design-audit workflow for WCAG, visual consistency, component quality, and formal conformance checks.

## Updating the skill

Keep the folder name and frontmatter name as:

```text
persona-flow-review
```

After updating any file:

- Cursor: replace the installed skill folder.
- Claude: create a new ZIP of the complete folder and upload the updated package.
