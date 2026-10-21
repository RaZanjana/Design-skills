# Review Artifact Structure

The canvas is a working tool with three views: what to fix, which design decisions to defend and why, and what to say in the client meeting. It is not a checklist of design rules.

## Output priority

Use the richest supported format:

1. **Cursor:** copy [canvas-template.tsx](canvas-template.tsx) to the workspace `canvases` folder as `[output name].canvas.tsx`. Replace everything between `REVIEW DATA START` and `REVIEW DATA END`, including every sample entry. Change the components only when the review needs something the template lacks. Import only from `cursor/canvas`.
2. **Other platforms:** one self-contained interactive HTML file with inline CSS, data, and JavaScript, using the same structure.
3. **Fallback:** concise Markdown using the same information hierarchy.

Do not require external packages, remote assets, or network requests to render the review.

## Information architecture

The canvas separates content by purpose. Each view answers one question for the designer:

| View | The designer's question | What it holds |
| --- | --- | --- |
| **Findings** (default) | What do I fix before the meeting? | Decisions waiting on the designer, project-wide issues, and the stories with their issues |
| **Design rationale** | Which decisions do I defend, and why? | Figma comments, optional comments, and beyond-scope annotations, with their reasons and Figma status |
| **Client meeting** | What do I say? | Talking points and the walkthrough script |

Keep them apart. Issues and fixes stay in Findings, notes for Figma stay in Design rationale, and spoken text stays in Client meeting. A story's detail links to its rationale instead of repeating it.

### Header

- Project or feature name, a one-line summary, the reviewed Figma page, the review date, and the number of stories
- Story totals by status
- One warning callout, only when ClickUp scope was not checked or a source could not be reached
- The view bar: one button per view, each with a one-line summary, such as "3 open issues, 1 ready for your review", "5 comments, 2 optional, 1 beyond the stories. 2 in Figma", or "Script ready, about 3 minutes". Show Client meeting only when a story can be presented. Save the open view in `pfr-view`.

### Findings view

In this order:

1. **Needs your decision**, only when something waits on the designer:
   - **Fixes ready for your review**, each with its story and **Open story**, which selects it.
   - **Scope questions to settle:** each question in one plain sentence, its story, what each source says as bullet points, and who should decide, when the sources name someone. They need a decision, not a design fix, so they have no fix button.
2. **Project-wide issues:** one compact notice for issues that affect several stories, such as story names in Figma that no longer match, a state several stories need that is missing from a shared screen, or a selection that changes from one flow to the next. Never repeat them inside each story.
3. **Story filters:** All, then each status with at least one story, each with its count.
4. **Stories**, as master-detail: on the left, a compact list with ID, title, status, number of open issues, and "Re-review suggested" when set. On the right, the selected story.
5. **What the labels mean** and **Sources checked**, both collapsed.

### Story detail

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
5. **Resolved issues**, collapsed, only when the story has any. Each shows its title, the date applied, and links to the Draft component and the "Fixed issues" row.
6. **Design rationale link**, only when the story has notes: one line with the number of decisions worth a comment, optional ones, and items beyond the story, and **Open in Design rationale**, which opens that view showing only this story.
7. **Evidence and sources**, collapsed
   - Scope used: the ClickUp decisions that override the local story or PRD, one plain line each
   - The business objective and its source
   - References: persona, ClickUp task, local story, PRD section, decision records
   - Relevant Figma screens

The talking point is not part of the story detail. It is in the Client meeting view.

### Status guide and sources

Both are collapsed at the bottom of Findings.

**What the labels mean:**

- **Supported:** The user can reach the goal, and every core requirement is met.
- **Partially supported:** The user can reach the goal, but an important requirement or state is missing.
- **Needs attention:** A core requirement or the main goal is missing, contradicted, or blocked.
- **Insufficient evidence:** The flow or its sources could not be reached.

Then: "These labels describe story support. They are not WCAG or design-quality scores. Not flagged on purpose: English copy (developers handle localization), example figures in mock data, typos, and visual polish. They are raised only when they change what the user can do or break an agreed rule."

**Sources checked:** a row per source, with the source in words, such as "ClickUp task: Confirm suppression" or "PRD", where it came from (Designer, Discovered, ClickUp, or Figma), its status (Read, Partly read, Not accessible, or Not found), and what was missing. The header warning names any source that was not reached, so this list can stay collapsed.

### Design rationale view

The decisions worth defending, so the designer can explain them and the client's team can review them on their own. Show it whenever the review has stories, even with nothing suggested.

- An intro line, then **In Figma now ([N])**, collapsed, when any comment is published or any item is annotated. It lists each one with its feature or title, the kind of note, and its stories, linked to Figma as [Links to notes in Figma](#links-to-notes-in-figma) describes.
- Opened from a story: "Showing story [ID] only." with **Show all stories**. Counts and buttons act on what is shown. Save the story in `rationale-story`.
- When nothing was suggested: a neutral callout, "No decision met the bar for a comment", with one sentence on the bar. Never fill the view to look busy.
- The token note once, at the bottom: "Publishing opens a new chat that asks for a Figma token. On a Mac, you can keep it in the Keychain so it never appears in the chat. A pasted token is saved in that chat's transcript, so give it a short expiry and revoke it afterwards."

**Figma comments**

Above the rows: counts (selected, approved, in Figma), **Approve all**, **Check Figma status** when any comment has a Figma ID or needs a check, and **Publish approved ([N])** as the primary button.

Rows are grouped by story, in review order, under a small heading with the story ID and title. Each row shows:

- The feature in words, and the status.
- "On:" the target screen, linked to Figma.
- "Answers:" the `question`, when it has one.
- The comment text, with "Edit wording". Editing shows a text area and the word count, with a hint when it is over 45 words.
- The reasons, always visible: "User need", "Business objective", and "Design principle", side by side, each only when set. When `alsoOn` is set: "The same reasoning applies on [screens]. This one comment covers them."
- **Check before publishing**, a warning with the `checkFirst` text, when set.
- Approve and Exclude pills, until it is published. **Move back** for an added optional comment, until it has a Figma status.
- "Why it was picked", collapsed: `why` and the evidence links.
- After publishing: **See it in Figma**, with "Opens the spot where it is pinned. Press C in Figma to show comments.", plus "Update in Figma" when the wording changed, and "Remove from Figma".
- The note from the last run, when there is one, such as a failure reason.

Rules for the list:

- It holds the recommended comments and every optional comment the designer added. Counts, Approve all, and Publish approved cover only this list.
- Approve all skips comments with `checkFirst`, and says so. The designer approves those one by one, after checking.
- Publish approved skips comments that are already in Figma, still need a check, or have empty wording or wording that looks like a token.
- "Remove from Figma" also marks the comment Excluded, so a later "Publish approved" never posts it again. The designer can approve it again to republish it.

**Optional comments ([N])**, collapsed, and open by default only when no comment is recommended:

- One line: "Each one answers a question the client's team may ask when they review the design without you. Add the ones worth publishing."
- A row per suggestion: the question as the title, the story, the feature, "On:" the target screen, the wording, the `checkFirst` warning when set, **Add to comments**, and "See the reasons", collapsed.
- **Add to comments** approves it and moves it into the list above. **Add all** does the same for every suggestion without `checkFirst`. An optional comment stays in the list above once the designer approves or excludes it, or it has a Figma status. **Move back** returns it here.

**Beyond the stories**

Above the rows: one line saying no story asks for these but they look worth keeping, so approved ones go into Figma as annotations that ask the client to confirm them, with the counts, **Approve all**, and **Add approved annotations ([N])**.

A row per element:

- Title, stories, status, and "On:" the target screen.
- What it is, and why it is beyond the stories.
- User value, and business value when a source supports it.
- The annotation text, with "Edit wording".
- Approve and Exclude pills, until it is annotated. Then **See it in Figma**, with "Opens the screen in Dev Mode, where annotations show.", plus "Update in Figma" when the wording changed, and "Remove from Figma".
- "For developers and evidence", collapsed.

### Client meeting view

What the designer says. Two pills: **Talking points ([N])** and **Walkthrough script**. It opens on the script when one exists, otherwise on the talking points, and saves the choice in `meeting-tab`.

**Talking points**

- One row per story except Insufficient evidence, in review order: the title, the story ID, "Say this" for Supported or "Safe to say now" otherwise, a link to the flow, the status label, and the talking point.
- A closing line naming any story that is not ready to present.

**Walkthrough script**

- **Before a script exists:** one line on what the script is, and **Generate walkthrough script**. It opens a new chat that writes the script from the current review. While it runs, show "Generating in a new chat" with "Stop waiting".
- Stage pills: "Whole script", then one pill per stage, numbered in journey order.
- Each stage shows its title, a link to its key screen, its story IDs with a link to each story's flow in Figma, and its spoken text.
- Under each stage, "Questions they may ask": the `question` and wording of each comment for the stage's stories that is not excluded, so the designer can answer them in the meeting. They are not copied with the script.
- The word count of the spoken text and the rough speaking time.
- **Copy script:** copies the whole script as plain text. For each stage: the numbered title, the spoken text, and a reference line such as "Stories 1.6 and 1.7. Figma: Story 1.6 flow ([link]), Story 1.7 flow ([link])". When the canvas blocks the clipboard, show the full text in a block that selects itself on click, with "Copying is blocked here. Click the text to select it, then copy."
- **Edit:** turns each shown stage into a text area. Edits are saved in canvas state and marked "Edited". Each edited stage has "Reset to generated".
- **Regenerate:** opens a new chat that rewrites the script from the current review. While it runs, show "Stop waiting" beside it. When the new version arrives and the designer had edits, show "The script was regenerated after you edited it." with "Use the new script" and "Keep my edits".
- **Older than the review:** when `REVIEW.updatedAt` is later than `WALKTHROUGH.generatedAt`, show "The review changed after this script was written" with Regenerate, so an older script is never presented as current.

### Note statuses

Each comment and annotation shows one status. Take the first that applies:

1. **Working in a new chat:** the designer's latest request is newer than the state entry's `updatedAt`.
2. **Needs check**, after the designer clicked "Stop waiting" and no newer state entry arrived. The note says how to check:
   - Comment: "You stopped waiting before the chat reported back. Use Check Figma status before trying again."
   - Annotation: "You stopped waiting before the chat reported back. Check the screen in Dev Mode. Adding it again is safe: it updates the existing annotation instead of adding a second one." Link "Check in Figma" to the target screen in Dev Mode, even when there is no state entry yet.
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

Show this from the moment the designer clicks until the chat writes a newer status, or the designer stops waiting:

- What is happening, by request: "Making the fix", "Revising the fix", "Applying the fix", or "Rejecting the fix", then "in a new chat. This updates when the chat reports back."
- When it started, as described in [Every wait has a way out](#every-wait-has-a-way-out).
- **Stop waiting** (ghost).

After Stop waiting, show the status from before the request, with a warning above it that says what the chat may already have done:

- Fix: "If it already made a copy on the Fixed issues page, delete that copy, or start the fix again."
- Revise: "The fix on the Fixed issues page may be half changed, so check it before you request changes again."
- Apply: "It may already have changed the Draft or Wireflows page, so check them in Figma before you approve and apply again."
- Reject: "Reject the fix again if you still want to."

The warning ends with **I have checked, hide this** (ghost). It clears the recorded request, so the warning stays gone. Starting a new request also clears it.

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

- When the recorded request is later than `FIX_STATE[issueId].updatedAt`, or there is no entry, show the in-progress text, unless the request is marked `stopped`. Compare timestamps as dates, never as strings: `2026-10-21T05:46:53.500Z` sorts before `2026-10-21T05:46:53Z` as text.
- Otherwise, show `FIX_STATE[issueId].status`, with the stopped warning when the unanswered request is marked `stopped`.
- Stop waiting marks the request `stopped` instead of deleting it. A newer `FIX_STATE` entry from the chat still wins, so a chat that finishes late still shows its result.
- Keep each designer's own instruction in `useCanvasState` under `fix-instruction:[issueId]`.

The fix chat edits only the `FIX_STATE` entry for its issue. Keep `FIX_STATE` as one top-level constant with one entry per issue, so each entry can be replaced on its own.

### Other platforms

- **HTML:** use the same panel. Each button copies its prompt to the clipboard and shows "Copied. Paste it into a new chat with the review attached."
- **Markdown:** under each fixable issue, show its fix prompt in a code block.

Never show a fix as started or done when the environment could not start it.

## Every wait has a way out

Canvas actions are fire and forget. The canvas never learns that a chat finished, failed, or was deleted. It only sees what the chat writes back into the data block. So every state that waits on a chat must give the designer a way out:

- Show when it started, under the status: "Started at 13:46. If you closed that chat before it finished, choose Stop waiting." Use the date as well when it was not today. When the recorded time cannot be read, drop the "Started" part instead of showing "Invalid Date". The canvas cannot run a timer, so this line shows from the start instead of after a delay.
- Offer **Stop waiting**. It marks the request `stopped` and never deletes it, because the chat may already have changed Figma.
- When two or more comments, or two or more annotations, are waiting, also show **Stop waiting for all ([N])** (ghost) in that section's header. One deleted chat often carries a whole batch.
- After stopping, say what the chat may already have done, and how to check it. Never show the work as done or as never started.
- Never reset a wait on its own after a time limit. A long fix is normal, and an automatic reset invites a second chat on the same item.

This applies to Fix now, Request changes, Approve and apply, Reject, every comment and annotation request, and the walkthrough script. Any new button that opens a chat follows the same rule.

## Client note buttons

Comment, annotation, and script buttons work like Fix now. Each opens a new chat with the canvas attached and a short prompt, and records the request in `useCanvasState`. The chat writes the result back into `COMMENT_STATE`, `ANNOTATION_STATE`, or `WALKTHROUGH`.

The designer's choices live in canvas state, not in the data block:

| Key | Holds |
| --- | --- |
| `note-decisions` | `{ [noteId]: "suggested" \| "approved" \| "excluded" }` |
| `note-texts` | `{ [noteId]: text }`, only for notes the designer edited |
| `note-requests` | `{ [noteId]: { action, at, stopped? } }`, the latest request per note |
| `script-edits` | `{ version, stages: { [stageId]: text } }` |
| `pfr-view` | `"findings"`, `"rationale"`, or `"meeting"`, the open view. Older values `"review"` and `"client"` open Findings and Client meeting. |
| `rationale-story` | `"all"` or a story ID, the story the Design rationale view is showing |
| `meeting-tab` | `"points"` or `"script"`, once the designer picks one |

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
| Generate walkthrough script | `Generate walkthrough script.` |
| Regenerate (script) | `Regenerate walkthrough script.` |

### Generate the script

The chat reads the attached canvas: `STORIES`, `PROJECT_ISSUES`, `BEYOND_SCOPE`, `COMMENTS`, and `FIX_STATE`. It writes `WALKTHROUGH.stages` with the rules in `SKILL.md` section 10 and [methodology.md](methodology.md#walkthrough-script), raises `version` by one, so the first script is version 1, and sets `generatedAt`. Each stage's `storyIds` lists every story it presents, so the canvas can link their flows. On a regeneration, keep each stage's `id` when it covers the same journey step, so "Keep my edits" lands on the right stage. Never reuse a removed stage's ID.

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

### Links to notes in Figma

Figma has no link that opens a single comment thread. Even its own "Copy link" on a comment only opens the spot where the comment is pinned. Annotations have no link of their own either. So link each note to its node, and say how to see it:

| Note | Link | Shown when |
| --- | --- | --- |
| Comment | `COMMENT_STATE.nodeId`, the node it is pinned to, in the entry's `fileKey`, without `&m=dev`. Hint: "Press C in Figma to show comments." Add "turn on resolved comments in the comments panel" when it has `resolvedAt`, and "the latest wording is a reply in the same thread" when it has `replyIds`. | `published` |
| Annotation | `ANNOTATION_STATE.nodeId`, with `&m=dev`, because Dev Mode shows annotations | `annotated` |

A note with status `needs-check` gets **Check in Figma** instead, with "Figma has not confirmed this comment" or "annotation", so the canvas never shows an unconfirmed note as present. Failed, removed, and unpublished notes get no link. Never label a link as opening the comment itself.

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
  updatedAt         ISO time of the latest review run or applied fix
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

### Design rationale

```text
COMMENTS[]
  id                "c-[number]", never reused
  storyId
  feature           the feature in words
  target            { label, nodeId }   the most specific node that shows the feature
  text              25 to 45 words
  additional?       true for an optional comment
  question?         the question the client's team may ask. Required when additional
  why               why this decision was picked, for the designer
  userNeed?         the documented user need
  businessGoal?     only when a source documents it
  principle?        the design principle in plain words, with its effect here
  checkFirst?       the assumption the designer confirms before publishing
  alsoOn?[]         { label, nodeId }   other screens with the same reasoning
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
  version           0 with no stages until the designer asks for a script,
                    then raised by one on every generation
  generatedAt       ISO time, empty until the first script
  stages[]          { id, title, storyIds[], screen? { label, nodeId }, text }
                    storyIds: every story the stage presents
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

[N] design decisions are ready to share as Figma comments in the "Design rationale" view, with [N] optional and [N] items beyond the stories. Talking points are in "Client meeting", where you can generate the walkthrough script when you need it. Nothing goes to Figma until you approve it.
```

When no decision met the bar for a comment, say so in the last line instead of giving zeros.
