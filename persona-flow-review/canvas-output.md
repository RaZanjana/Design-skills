# Review Artifact Structure

The canvas is a working tool. It shows designers what to fix, and how to explain the design's value to the client through talking points, a walkthrough script, Figma comments, and annotations. It is not a checklist of design rules.

## Output priority

Use the richest supported format:

1. **Cursor:** copy [canvas-template.tsx](canvas-template.tsx) to the workspace `canvases` folder as `[output name].canvas.tsx`. Replace everything between `REVIEW DATA START` and `REVIEW DATA END`, including every sample entry. Change the components only when the review needs something the template lacks. Import only from `cursor/canvas`.
2. **Other platforms:** one self-contained interactive HTML file with inline CSS, data, and JavaScript, using the same structure.
3. **Fallback:** concise Markdown using the same information hierarchy.

Do not require external packages, remote assets, or network requests to render the review.

## Information architecture

### Header

- Project or feature name, the reviewed Figma page, and the review date
- Story totals by status
- Issue totals by fix status: open, ready for review, applied
- Client note totals: comments suggested and published, items worth keeping and annotated
- A warning when ClickUp scope was not checked

### Status guide

Show these definitions near the filters:

- **Supported:** The user can reach the goal, and every core requirement is met.
- **Partially supported:** The user can reach the goal, but an important requirement or state is missing.
- **Needs attention:** A core requirement or the main goal is missing, contradicted, or blocked.
- **Insufficient evidence:** The flow or its sources could not be reached.

Add:

> These labels describe story support. They are not WCAG or design-quality scores.

> Not flagged on purpose: English copy (developers handle localization), example figures in mock data, typos, and visual polish. They are raised only when they change what the user can do or break an agreed rule.

### Sources checked

Show a compact panel, collapsed by default when every source was read. Each row shows:

- The source in words, such as "ClickUp task: Confirm suppression" or "PRD"
- Where it came from: Designer, Discovered, ClickUp, or Figma
- Its status: Read, Partly read, Not accessible, or Not found
- What was missing, when anything was

Show a warning callout above the panel when any source is not accessible or not found.

### Project-wide issues

Use one compact notice for issues affecting several stories. Do not repeat these inside every story.

Examples:

- Story names in Figma no longer match the current stories.
- A state that several stories need, such as an error screen, is missing from a shared screen.
- A selection or status changes from one story's flow to the next.

### Open scope questions

Show this panel only when there are unresolved conflicts or questions. Each question shows:

- The question in one plain sentence
- The affected story, when it is not project-wide
- What each source says, as bullet points
- Who should decide, when the sources name a product owner

These are not design issues and have no fix button.

### Story navigation

Provide filters for All, then each status that has at least one story: Needs attention, Partially supported, Supported, and Insufficient evidence.

Use a master-detail layout:

- Left: compact story list with ID, title, status, number of open issues, and a "Re-review suggested" tag when set
- Right: the selected story

### Story detail

Show parts 1 to 5 by default. Keep part 6 collapsed.

1. **Story name and status**
   - Story ID, title, and status label
   - The persona and their goal, one short line each
   - A link to the whole flow in Figma
2. **Why this status**
   - The status reason: one or two sentences naming the design behavior behind it
   - When a requirement waits on a decision, say so here
3. **Value, what works, or what is needed**
   - **Supported:** "User value" and "Business value". When no business objective is documented, show "No business objective is documented for this story."
   - **Partially supported:** "What works", up to three points, each with a screen link
   - **Needs attention:** nothing here. The impact sits in each issue.
   - **Insufficient evidence:** "What we need": what could not be reached
4. **Issues**, at most three, only when meaningful issues exist
   - Plain-language title
   - Small tags: priority (High, Medium, Low), confidence (Confirmed, Potential concern), and classification
   - "Affected requirement"
   - "What we found"
   - "User impact", and "Business impact" when there is one
   - "Recommended fix"
   - Screen name in words, linked to the Figma node
   - "Evidence": the sources as named links, on one small line
   - The **Fix now** button and fix status, described in [Fix now](#fix-now)
5. **Client talking point**
   - Label it "Say this in the walkthrough" for Supported stories
   - Label it "Safe to say now" for Partially supported and Needs attention stories
   - Omit it for Insufficient evidence
6. **Evidence and sources**, collapsed by default
   - Scope used: the ClickUp decisions that override the local story or PRD, one plain line each
   - The business objective and its source
   - References: persona, ClickUp task, local story, PRD section, decision records
   - Relevant Figma screens

Show **Resolved issues** as a separate collapsed section, only when the story has any. Each shows its title, the date applied, and links to the Draft component and the "Fixed issues" row.

### Client notes

Place one "Client notes" area below the stories, with up to three tabs. Show a tab only when it has content. Omit the area when all three are empty.

**Walkthrough script** (default tab)

- Stage pills: "Whole script", then one pill per stage, numbered in journey order.
- Each stage shows its title, a link to its key screen, and its spoken text.
- The total word count and the rough speaking time.
- **Copy script:** copies the whole script as plain text, one paragraph per stage. When the canvas blocks the clipboard, show the full text in a block that selects itself on click, with "Copying is blocked here. Click the text to select it, then copy."
- **Edit:** turns each shown stage into a text area. Edits are saved in canvas state and marked "Edited". Each edited stage has "Reset to generated".
- **Regenerate:** opens a new chat that rewrites the script from the current review. While it runs, show "Stop waiting" beside it. When the new version arrives and the designer had edits, show "The script was regenerated after you edited it." with "Use the new script" and "Keep my edits".

**Figma comments**

A compact row per suggested comment:

- The feature in words, the story, and the status.
- "On:" the target screen, linked to Figma.
- The comment text, with "Edit wording". Editing shows a text area and the word count, with a hint when it is over 45 words.
- Approve and Exclude pills, until it is published.
- "Why this one", collapsed: why it is worth highlighting, the user need, the business objective, and the evidence links.
- After publishing: "Update in Figma" when the wording changed, and "Remove from Figma".
- The note from the last run, when there is one, such as a failure reason.

Above the rows:

- One line: "Positive notes the client reads beside the design in Figma. Nothing is published until you click Publish."
- Counts: suggested, approved, and published.
- **Approve all**, then **Publish approved ([N])** as the primary button.
- **Check Figma status**, when any comment has a Figma ID or needs a check.
- "Remove from Figma" also marks the comment Excluded, so a later "Publish approved" never posts it again. The designer can approve it again to republish it.
- Publish approved skips comments that are already in Figma, still need a check, or have empty wording or wording that looks like a token.
- The note: "Publishing opens a new chat that asks for a Figma token. On a Mac, you can keep it in the Keychain so it never appears in the chat. A pasted token is saved in that chat's transcript, so give it a short expiry and revoke it afterwards."

**Worth keeping**

A row per beyond-scope element:

- Title, stories, status, and "On:" the target screen.
- What it is, and why it is beyond the stories.
- User value, and business value when a source supports it.
- "For developers", collapsed, when there is a note.
- The annotation text, with "Edit wording".
- Approve and Exclude pills, until it is annotated. Then "Update in Figma" when the wording changed, and "Remove from Figma".

Above the rows: one line explaining these are additions the stories do not ask for, which go into Figma as annotations, plus **Approve all** and **Add approved annotations ([N])**.

### Note statuses

Each comment and annotation shows one status. Take the first that applies:

1. **Working in a new chat:** the designer's latest request is newer than the state entry's `updatedAt`.
2. **Needs check**, after the designer clicked "Stop waiting" and no newer state entry arrived. Note: "The chat closed before it reported back. Check the status in Figma before trying again."
3. The state entry from Figma: **Published**, **Resolved in Figma** (published with `resolvedAt`), or **Annotated** (green), **Needs check** (yellow), **Failed** (red), **Not published** or **Removed** (gray).
4. The designer's choice: **Approved** (accent), **Suggested** or **Excluded** (gray).

Never show Published or Annotated without a state entry written by Publish or Annotate mode. Show the entry's note under the status. While a note is "Working in a new chat", show "Stop waiting". It marks the request as stopped instead of deleting it, because the chat may still have changed Figma. A stopped comment can be checked but not published until "Check Figma status" reports back. A comment counts as in Figma whenever its entry has a `figmaCommentId` and is not removed, even when it needs a check.

## Fix now

Designers fix issues one at a time from the canvas. The template already contains this flow. Every button opens a new agent chat with the canvas attached and a short prompt. The chat does the work in Figma and writes the result back into this canvas. The issue, its evidence, and the screen travel with the canvas, so the designer never re-enters context.

### Fix actions per issue

| Fix action | Button |
| --- | --- |
| `figma-screen`, `figma-new-screen`, `figma-rename` | **Fix now** (primary) |
| `audit-handoff` | **Start accessibility review** (secondary). The prompt asks for an accessibility review of the linked screen and names the concern. |
| `none` | No button |

Project-wide issues get the same button, with the issue ID `pw-[number]`.

Fix now never appears on strengths, evidence gaps, source conflicts, or anything that failed the "worth flagging" test. A Supported story shows Fix now only when it has a separate, meaningful issue.

### What each status shows

Place fix actions at the end of the issue. Use at most one primary button per issue.

**Open, rejected, or needs a decision**

- A "Fix now" button. Clicking it opens an inline fix panel. It does not start a chat yet.
- The fix panel contains:
  - The recommended fix.
  - "What will change": the screen name and the kind of change, in one plain sentence.
  - Two pills: "Use recommended fix" and "Use my own instruction".
  - A text area, shown only for "Use my own instruction".
  - A "Start fix" primary button, disabled while a chosen own instruction is empty.
  - The note: "This opens a new chat. The fix is made on a copy on the Fixed issues page in Figma. Your Wireflows and Draft pages do not change until you approve it."
- For rejected or needs a decision, show the agent's note above the button.

**Fix in progress**

Show this from the moment the designer clicks until the chat writes a newer status:

- "Fix in progress in a new chat. This updates when the fix is ready."

**Ready for review**

- A link: "Open fix in Figma", pointing to the issue row on the "Fixed issues" page.
- "What changed", as a short list.
- A warning callout when there is a conflict with the story or scope.
- "Also changes", listing other stories that use the same screen, when there are any.
- Buttons:
  - **Approve and apply** (primary)
  - **Request changes** (secondary): reveals a text area and a "Send" button
  - **Reject** (ghost)

**Applied**

- "Applied to the Draft page on [date]", with links to the Draft component and the "Fixed issues" row.
- After the story is re-reviewed, the issue moves to the story's resolved list.

### Prompts

Set `REVIEW.skillDir` to the absolute path of the folder this skill's `SKILL.md` was read from. The skill cannot be invoked automatically in a new chat, so the prompt points to the files.

The prompts keep the words "Fix issue [ID]", because `SKILL.md` section 0 routes Fix mode by that phrase. Only the button says "Fix now".

```tsx
type FixRequest = "fix" | "revise" | "reject" | "apply";

function fixPrompt(request: FixRequest, issueId: string, instruction?: string): string {
  const ask = {
    fix: `Fix issue ${issueId}`,
    revise: `Revise fix for issue ${issueId}`,
    reject: `Reject fix for issue ${issueId}`,
    apply: `Apply approved fix for issue ${issueId}`,
  }[request];
  const file = request === "apply" ? "apply-fix.md" : "fix-mode.md";
  const lines = [
    `Persona flow review: ${ask}.`,
    `Read and follow ${REVIEW.skillDir}/${file}. The review canvas is attached.`,
  ];
  if (request === "fix") {
    lines.push(instruction ? "Approach: designer instruction" : "Approach: suggested fix");
  }
  if (instruction) lines.push(`Designer instruction: """${instruction}"""`);
  return lines.join("\n");
}
```

Each button dispatches `{ type: "newComposerChat", userPrompt }` and records the request in `useCanvasState` under `fix-request:[issueId]`.

Show the status like this:

- When the recorded request is later than `FIX_STATE[issueId].updatedAt`, or there is no entry, show the in-progress text.
- Otherwise, show `FIX_STATE[issueId].status`.
- Keep each designer's own instruction in `useCanvasState` under `fix-instruction:[issueId]`.

The fix chat edits only the `FIX_STATE` entry for its issue. Keep `FIX_STATE` as one top-level constant with one entry per issue, so each entry can be replaced on its own.

### Other platforms

- **HTML:** use the same panel. Each button copies its prompt to the clipboard and shows "Copied. Paste it into a new chat with the review attached."
- **Markdown:** under each fixable issue, show its fix prompt in a code block.

Never show a fix as started or done when the environment could not start it.

## Client note buttons

Comment, annotation, and script buttons work like Fix now. Each opens a new chat with the canvas attached and a short prompt, and records the request in `useCanvasState`. The chat writes the result back into `COMMENT_STATE`, `ANNOTATION_STATE`, or `WALKTHROUGH`.

The designer's choices live in canvas state, not in the data block:

| Key | Holds |
| --- | --- |
| `note-decisions` | `{ [noteId]: "suggested" \| "approved" \| "excluded" }` |
| `note-texts` | `{ [noteId]: text }`, only for notes the designer edited |
| `note-requests` | `{ [noteId]: { action, at, stopped? } }`, the latest request per note |
| `script-edits` | `{ version, stages: { [stageId]: text } }` |

The parent component reads these once and passes them down, so counts, "Approve all", and "Publish approved" always agree with the rows. The state file sits next to the canvas as `[name].canvas.data.json`. Mode chats rely on the prompt, not on that file.

Write every `updatedAt` as an ISO time in UTC, such as `2026-10-20T14:05:00.000Z`. Get it with `date -u +%Y-%m-%dT%H:%M:%S.000Z` just before writing. Never estimate it. The canvas compares it with the request time, as dates, to decide whether work is still in progress.

Prompts carry each item's ID and final wording as a JSON string, so quotes and line breaks survive and the chat never guesses what was approved:

```text
Persona flow review: Publish comments.
Read and follow [skillDir]/publish-comments.md. The review canvas is attached.
Figma file: [file name] ([file key])
Approved comments:
- c-1, on "Suppression check" (node 20:2): "[final text]"
```

The first line names the request, so `SKILL.md` section 0 can route it:

| Button | First line |
| --- | --- |
| Publish approved | `Publish comments.` |
| Update in Figma (comment) | `Update comment [ID].` with the new wording |
| Remove from Figma (comment) | `Remove comment [ID].` |
| Check Figma status | `Check comments.` with each comment's ID and its last known text |
| Add approved annotations | `Add annotations.` with each item's wording |
| Update in Figma (annotation) | `Update annotation [ID].` with the new wording |
| Remove from Figma (annotation) | `Remove annotation [ID].` |
| Regenerate (script) | `Regenerate walkthrough script.` |

### Regenerate the script

The chat reads the attached canvas: `STORIES`, `PROJECT_ISSUES`, `BEYOND_SCOPE`, and `FIX_STATE`. It rewrites `WALKTHROUGH.stages` with the rules in `SKILL.md` section 10 and [methodology.md](methodology.md#walkthrough-script), raises `version` by one, and sets `generatedAt`. Keep each stage's `id` when it covers the same journey step, so "Keep my edits" lands on the right stage. Never reuse a removed stage's ID.

Write `generatedAt` as an ISO time in UTC, from `date -u`. It edits only `WALKTHROUGH`. It never touches the canvas state file, so the designer's edits are kept until they choose "Use the new script". Check the canvas TypeScript result, then reply with one sentence on what changed in the script.

## Writing rules

All canvas text follows the plain-English rules in `SKILL.md` section 9. In short:

- Write for someone who has not seen the stories, personas, or Figma file.
- Lead with the issue or the value. Skip background.
- Use short sentences, everyday words, and active voice.
- Describe what is on the screen by name: people, buttons, labels, numbers.
- Keep requirement IDs, node IDs, ClickUp task IDs, layer names, and error codes out of sentences. Show them only in links or the evidence area.
- Explain any product term the first time it appears.
- Use bullet lists when comparing two things that should match.
- Do not use arrow chains, `·`-separated fragments, or abbreviations.
- State each fact once. Do not repeat an issue in the status reason or the talking point.

Show screen references as readable names with links, for example “Lead selection screen”, not `suppression-check-excluded · 343:24200`.

## Visual rules

- Use muted green for Supported.
- Use muted yellow for Partially supported.
- Use muted red for Needs attention.
- Use neutral gray for Insufficient evidence.
- Use the same muted colors for fix status: green for Applied, yellow for Ready for review, red for Needs a decision, and gray for the rest. Take them from theme tokens or `Callout` tones, because `Pill` always renders neutral.
- Preserve readable text contrast.
- Do not use colour as the only status signal; always include the text label.
- Avoid a long wall of cards.
- Keep one story selected at a time.
- Use short paragraphs and generous spacing.
- Avoid decorative charts, scores, and progress meters.

## Reference behavior

### Figma

Build direct links using the file key and node ID:

```text
https://www.figma.com/design/[file-key]/[file-name]?node-id=[node-id]&m=dev
```

Link both the complete story section and the specific screen supporting an issue or a strength.

### Local sources

When the platform can open local files, open the persona, story, PRD, and decision records with an `openFile` action, at the right line when known.

When it cannot, display the exact supplied path or document name.

### ClickUp

Link each task with its URL. Link a comment with its own URL when the connector returns one. Otherwise link the task and name the comment's author and date in the link label.

## Data contract

The template defines these as TypeScript types. Keep the field names, because Fix and Apply mode read them.

### Review

```text
REVIEW
  title, summary, date
  skillDir
  figmaFileKey, figmaFileName
  wireflowsPage { name, nodeId }   the page the designer named
  clickupChecked
SOURCES[]               { source, origin, status, gap? }
                        origin: Designer | Discovered | ClickUp | Figma
                        status: Read | Partly read | Not accessible | Not found
OPEN_QUESTIONS[]        { id, storyId?, question, positions[{ source, says }], decideBy? }
PROJECT_ISSUES[]        same fields as an issue, plus affectedScreens[{ label, nodeId }]
RESOLVED_PROJECT[]      same fields as a resolved issue
```

### Story

```text
id
title
assessment          Supported | Partially supported | Needs attention | Insufficient evidence
reReviewSuggested?
persona
objective
businessGoal?       { text, source }   omit when none is documented
statusReason
userValue?          Supported
businessValue?      Supported, only when businessGoal exists
whatWorks?[]        { text, screen? { label, nodeId } }   Partially supported
missingEvidence?    Insufficient evidence: what could not be reached
talkingPoint?       omit for Insufficient evidence
issues[]
  issueId           "[story ID]-[number]", never reused
  title
  classification
  priority          High | Medium | Low
  confidence        Confirmed | Potential concern
  affectedRequirement { text, source }
  found             one string, or a list for comparisons
  userImpact
  businessImpact?
  recommendedFix
  changeSummary?    one plain sentence on what a fix would change
  evidence[]        { label, url or path, line? }
  fixAction         figma-screen | figma-new-screen | figma-rename | audit-handoff | none
  screenName
  screenNodeId      the screen instance, not a wrapper frame
resolved[]
  issueId, title, appliedAt, draftComponentNodeId?, fixedSectionNodeId, screenNodeId?, note?
scopeDecisions[]    { text, source }   ClickUp decisions that override the local story or PRD
references[]        { label, url or path, line? }   persona, ClickUp task, story, PRD, decisions
figmaFlow           { label, nodeId }
figmaScreens[]      { label, nodeId }
```

### Fix state

One top-level `FIX_STATE` constant, keyed by issue ID. Start it empty. Only fix chats add or change entries.

```text
FIX_STATE[issueId]
  status            open | ready-for-review | applied | rejected | needs-decision
  approach          suggested | designer-instruction
  instruction?
  revision
  updatedAt         ISO time
  fixedSectionNodeId
  wireflowInstanceId
  mainComponentId
  mainComponentName
  changes[]         plain-English list
  conflict?
  otherStories[]
  note?             reason for needs-decision or rejected
  appliedAt?
  draftComponentNodeId?
  newScreenNodeId?
```

### Client notes

```text
COMMENTS[]
  id                "c-[number]", never reused
  storyId
  feature           the feature in words
  target            { label, nodeId }   the most specific node that shows the feature
  text              25 to 45 words
  why               why it is worth highlighting, for the designer
  userNeed?
  businessGoal?     only when a source documents it
  evidence[]        { label, url or path, line? }
  reviewNote?       set on a re-run when a published comment no longer fits

BEYOND_SCOPE[]
  id                "b-[number]", never reused
  title
  storyIds[]
  target            { label, nodeId }
  whatItIs
  whyBeyondScope
  userValue
  businessValue?    only when a source supports it
  forDevelopers?
  text              annotation text, starting "Beyond the story:"
  evidence[]
  reviewNote?

WALKTHROUGH
  version           starts at 1, raised on every regeneration
  generatedAt       ISO time
  stages[]          { id, title, storyIds[], screen? { label, nodeId }, text }
```

Two top-level constants, keyed by note ID. Start them empty. Only Publish mode changes `COMMENT_STATE`. Only Annotate mode changes `ANNOTATION_STATE`, except that a re-run may set an entry to `needs-check` when Figma shows the annotation is missing. The fields are listed in [publish-comments.md](publish-comments.md#6-update-the-canvas-and-reply) and [annotate-figma.md](annotate-figma.md#3-update-the-canvas-and-reply).

A re-run updates the same canvas and carries these entries over, as `SKILL.md` sections 10 and 11 describe. Keep a published note's suggestion in `COMMENTS` or `BEYOND_SCOPE` with a `reviewNote`, even when it would no longer be suggested, so the designer can still update or remove it.

## Final chat response

Do not reproduce the review in chat. Keep the reply in plain English.

Return:

```text
Created the persona flow review: [Open review]

[N] supported, [N] partially supported, [N] need attention, [N] insufficient evidence.

[Sources that could not be accessed, and the number of open scope questions. Omit when there are none.]

The walkthrough script, [N] suggested comments, and [N] items worth keeping are ready in the canvas. Nothing goes to Figma until you approve it.
```
