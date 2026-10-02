# Review Artifact Structure

## Output priority

Use the richest supported format:

1. **Cursor:** one self-contained `.canvas.tsx` file using only `cursor/canvas`.
2. **Other platforms:** one self-contained interactive HTML file with inline CSS, data, and JavaScript.
3. **Fallback:** concise Markdown using the same information hierarchy.

Do not require external packages, remote assets, or network requests to render the review.

## Information architecture

### Header

- Project or feature name
- Review date
- Wireflows page name
- Story totals by assessment
- Issue totals by fix status: open, ready for review, applied

### Assessment guide

Show these definitions near the filters:

- **Supports:** The main user objective and story requirements are covered.
- **Partially supports:** The flow works, but an important gap remains.
- **Needs attention:** A core requirement is missing or contradicted.
- **Insufficient evidence:** The available material cannot support a reliable assessment.

Add:

> These labels describe story and persona support. They are not WCAG or overall design-quality scores.

### Project-wide findings

Use one compact notice for issues affecting several stories. Do not repeat these inside every story.

Examples:

- Product language conflicts with the approved language.
- Story IDs in Figma are out of date.
- Counts do not remain consistent across a multi-story journey.

### Story navigation

Provide filters:

- All
- Needs attention
- Partially supports
- Supports
- Insufficient evidence, when present

Use a master-detail layout when possible:

- Left: compact story list with ID, title, assessment, number of open issues, and a "Re-review suggested" tag when set
- Right: selected story review

### Story detail

Use this order:

1. **Review context**
   - Story ID and title
   - Persona
   - User objective
   - Direct Figma flow link
   - Direct relevant-screen links
2. **Overall assessment**
3. **Key observations**
   - Maximum three
   - Plain-language title that states the problem or strength
   - Small classification tag, such as “Requirement gap”
   - “What we found”
   - “Why it matters”
   - “Suggested fix”, omitted for strengths
   - Screen name in words, linked to the Figma node
   - Fix status and fix actions, described in [Fixing issues](#fixing-issues)
4. **Resolved issues**
   - Collapsed by default, and shown only when the story has any
   - Title, date applied, and links to the Draft component and the "Fixed issues" row
5. **Design rationale**
   - Intentional design decision
   - Reason it supports the persona or story
6. **Considerations**
   - Consider changing
   - Keep
   - Omit a heading when there is nothing meaningful to add
7. **Walkthrough notes**
   - Two or three short talking points
8. **References**
   - Persona
   - User story
   - Scope decision, when directly relevant
   - Figma flow
   - Relevant screens

## Fixing issues

Designers fix issues one at a time from the canvas. Every button opens a new agent chat with the canvas attached and a short prompt. The chat does the work in Figma and writes the result back into this canvas.

### Fix actions per issue

| Fix action | Button |
| --- | --- |
| `figma-screen`, `figma-new-screen`, `figma-rename` | **Fix issue** (primary) |
| `audit-handoff` | **Start accessibility review** (secondary). The prompt asks for an accessibility review of the linked screen and names the concern. |
| `none` | No button |

Project-wide findings get the same button, with the issue ID `pw-[number]`.

### What each status shows

Place fix actions in the observation footer, next to the screen link. Use at most one primary button per observation.

**Open, rejected, or needs a decision**

- A "Fix issue" button. Clicking it opens an inline fix panel. It does not start a chat yet.
- The fix panel contains:
  - The suggested fix.
  - "What will change": the screen name and the kind of change, in one plain sentence.
  - Two pills: "Use suggested fix" and "Use my own instruction".
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

Set `SKILL_DIR` to the absolute path of the folder this skill's `SKILL.md` was read from. The skill cannot be invoked automatically in a new chat, so the prompt points to the files.

```tsx
import { useCanvasAction, useCanvasState } from "cursor/canvas";

const SKILL_DIR = "/absolute/path/to/persona-flow-review";

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
    `Read and follow ${SKILL_DIR}/${file}. The review canvas is attached.`,
  ];
  if (request === "fix") {
    lines.push(instruction ? "Approach: designer instruction" : "Approach: suggested fix");
  }
  if (instruction) lines.push(`Designer instruction: """${instruction}"""`);
  return lines.join("\n");
}

function useFixRequest(issueId: string) {
  const dispatch = useCanvasAction();
  const [sent, setSent] = useCanvasState<{ request: FixRequest; at: string } | null>(
    `fix-request:${issueId}`,
    null,
  );
  const send = (request: FixRequest, instruction?: string) => {
    dispatch({ type: "newComposerChat", userPrompt: fixPrompt(request, issueId, instruction) });
    setSent({ request, at: new Date().toISOString() });
  };
  return { sent, send };
}
```

Show the status like this:

- When `sent.at` is later than `FIX_STATE[issueId].updatedAt`, or there is no entry, show the in-progress text for `sent.request`.
- Otherwise, show `FIX_STATE[issueId].status`.
- Keep each designer's own instruction in `useCanvasState` under `fix-instruction:[issueId]`.

The fix chat edits only the `FIX_STATE` entry for its issue. Keep `FIX_STATE` as one top-level constant with one entry per issue, so each entry can be replaced on its own.

### Other platforms

- **HTML:** use the same panel. Each button copies its prompt to the clipboard and shows "Copied. Paste it into a new chat with the review attached."
- **Markdown:** under each fixable issue, show its fix prompt in a code block.

## Writing rules

All canvas text follows the plain-English rules in `SKILL.md` section 9. In short:

- Write for someone who has not seen the stories, personas, or Figma file.
- Use short sentences, everyday words, and active voice.
- Describe what is on the screen by name: people, buttons, labels, numbers.
- Keep requirement IDs, node IDs, layer names, and error codes out of sentences. Show them only in links or the References area.
- Explain any product term the first time it appears.
- Use bullet lists when comparing two things that should match.
- Do not use arrow chains, `·`-separated fragments, or abbreviations.

Show screen references as readable names with links, for example “Lead selection screen”, not `suppression-check-excluded · 343:24200`.

## Visual rules

- Use muted green for Supports.
- Use muted yellow for Partially supports.
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

Link both the complete story section and the specific screen supporting a finding.

### Local sources

When the platform can open local files, provide actions for the persona, story, and scope source.

When it cannot, display the exact supplied path or document name.

## Data contract

### Review

The fix chats need these details, so store them once at the top of the canvas:

```text
skillDir
figmaFileKey
figmaFileName
wireflowsPage { name, nodeId }
sources { personas[], stories[], scope[] }
projectWideFindings[]   same fields as an observation, with issueId "pw-[number]" and affectedScreenNodeIds[]
```

### Story

Each story review should contain:

```text
id
title
assessment
reReviewSuggested?
persona
objective
observations[]
  issueId           "[story ID]-[number]", never reused
  title
  classification
  found
  whyItMatters
  suggestedFix?
  changeSummary?    one plain sentence on what a fix would change
  fixAction         figma-screen | figma-new-screen | figma-rename | audit-handoff | none
  screenName
  screenNodeId      the screen instance, not a wrapper frame
resolved[]
  issueId, title, appliedAt, draftComponentNodeId, fixedSectionNodeId
designDecision
reason
considerChanging? 
keep
walkthroughNotes[]
storyReference
personaReference
scopeReferences[]
figmaFlowReference
figmaScreenReferences[]
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

## Final chat response

Do not reproduce the review in chat. Keep the reply in plain English.

Return:

```text
Created the persona flow review: [Open review]

[N] support · [N] partially support · [N] need attention · [N] insufficient evidence
```
