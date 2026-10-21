---
name: persona-flow-review
description: Reviews a chosen Figma page's story flows against the project's personas, the agreed ClickUp story scope including comments, local user stories, and the PRD. Answers three questions per story - does the design support the user's goal, does it meet the agreed scope and business objective, and can the designer explain it to the client. Starts from a short prompt, asks only for missing inputs, flags only meaningful gaps, and produces a canvas in three views - findings with explained statuses and a Fix now button, design rationale with the few decisions worth defending as Figma comments backed by user and business reasons, and annotations for worthwhile additions, published after approval, and client talking points with an on-request walkthrough script. Fixes are made on a "Fixed issues" Figma page and applied only after approval. Use for a persona flow review, user-story design validation, or client walkthrough preparation, or to fix an issue, publish comments, or add annotations from a persona flow review.
disable-model-invocation: true
---

# Persona Flow Review

Use documented evidence to answer three questions for each story:

1. Does the design support the user's goal and the intended journey?
2. Does it fulfil the agreed story scope and support the business objective behind it?
3. Can the designer clearly explain to the client why it is a good solution?

This is not persona role-play, usability testing, a visual-quality audit, a design-system audit, or a WCAG conformance audit.

## 0. Choose the mode

This skill has six modes. Pick one from the request before doing anything else.

| Request | Mode | Instructions |
| --- | --- | --- |
| Review flows, stories, or a Figma file | **Review** | [intake.md](intake.md), then sections 1 to 12 of this file |
| "Fix issue [ID]", "Revise fix for issue [ID]", or "Reject fix for issue [ID]" | **Fix** | [fix-mode.md](fix-mode.md) |
| "Apply approved fix for issue [ID]" | **Apply** | [apply-fix.md](apply-fix.md) |
| "Publish comments", "Update comment [ID]", "Remove comment [ID]", or "Check comments" | **Publish** | [publish-comments.md](publish-comments.md) |
| "Add annotations", "Update annotation [ID]", or "Remove annotation [ID]" | **Annotate** | [annotate-figma.md](annotate-figma.md) |
| "Generate walkthrough script" or "Regenerate walkthrough script" | **Script** | Section 10 of this file, then [canvas-output.md](canvas-output.md#generate-the-script) |

These requests usually arrive from a button in the review canvas. The canvas file is attached to the chat and holds the issue or note, its evidence, the Figma links, and the source paths. Read only what the mode file asks for. Do not rerun the full review.

What each mode may change:

- **Review:** nothing. It is read-only.
- **Fix:** only the "Fixed issues" Figma page.
- **Apply:** the Draft and Wireflows pages, only after the designer approves the fix.
- **Publish:** only Figma comments the designer approved, through the Figma REST API.
- **Annotate:** only annotations in the "Beyond scope" category, after the designer approves them.
- **Script:** only the walkthrough script in the canvas.

## 1. Run the intake

Designers can start with a short prompt:

> Use the /persona-flow-review skill to review [story names in Figma]

Follow [intake.md](intake.md) before reviewing. It:

- Reads what the prompt already gives.
- Finds story files, persona files, and ClickUp links in the project, and asks the designer to confirm them.
- Asks only for what is still missing: personas, ClickUp URL, local story files, Figma file and page, and the stories to review.
- Finds the PRD through the story files. It never asks for the PRD.
- Checks access to Figma, ClickUp (including every comment), and the local files.
- Builds a scope record for each story and shows a source summary.

Do not start the review until intake reaches its source summary and any critical questions are answered.

## 2. Keep Review mode read-only and lean

- Never edit Figma, ClickUp, or project files in Review mode. Fixes happen later, one issue at a time, through Fix mode.
- Review only the Figma page the designer named.
- Never claim a source was reviewed unless its contents were read.
- Never use an online repository as a substitute for a supplied local source unless the designer explicitly permits it.

Respect the designer's time and keep token use low:

- Reuse what intake gathered. Do not search for or read the same source twice.
- Read only the reviewed stories, their direct dependencies, the PRD's goals, and the PRD sections the stories reference. Do not read whole documents to be safe.
- In Figma, read the named page's story sections. Take screenshots only of screens tied to a requirement, a strength you will cite, or an issue.
- Build the canvas from [canvas-template.tsx](canvas-template.tsx). Replace only its data block.

## 3. Establish source precedence

Use this order:

1. **ClickUp task description and comments** define the agreed scope of each story, including additions, exclusions, and clarifications. The latest explicit decision wins.
2. **Local user story files and decision records** give project context, relationships, dependencies, and references. Their requirements apply unless ClickUp explicitly contradicts them.
3. **The PRD and related product documents**, such as UX or experience specs, give the broader product intent, business objectives, and business rules, where ClickUp is silent.
4. **Persona documents** give the target users' goals, needs, constraints, and behavior.
5. **Figma** is the design being evaluated.

This order decides what the review checks against. It never hides a conflict:

- Record every material difference in the story's scope record.
- Separate confirmed decisions from assumptions and unresolved questions.
- When a conflict would change a verdict and no explicit decision resolves it, ask the designer. Put minor ones in "Open scope questions".

If the designer chose to continue without ClickUp, the local story files and decision records define scope.

Persona documents may contain proposed product solutions. Treat those as derived statements, not independent user evidence.

## 4. Normalize the evidence

For each relevant persona, extract only:

- Role and responsibilities
- Goals and success outcomes
- Information needs
- Pain points and failure concerns
- Relevant behaviors
- Time, environment, device, knowledge, and access constraints
- Exact source location

Ignore decorative biography and demographics unless they affect the flow.

For each story, extract:

- Story ID and title
- Actor
- User objective
- **Business objective:** why the story matters to the business, with its source. Look in the ClickUp task, the story's "so that" line, and the PRD's goals. Leave it empty when none is documented.
- Trigger and preconditions
- User-facing acceptance criteria
- Required states and feedback
- Success or exit condition
- Alternative and error paths
- Dependencies on other stories
- Explicit exclusions and deferred decisions
- ClickUp decisions that override the local story or PRD
- Open questions from the scope record
- Exact source location for each item: ClickUp task or comment with its author and date, local file, or PRD section

Take these from the scope record built during intake. Do not re-derive scope from a single source.

Keep technical criteria only when they create visible user behavior or constrain the experience.

See [methodology.md](methodology.md) for the evidence and classification rules.

## 5. Match persona, story, and Figma flow

Select the persona using:

1. Explicit story actor
2. Scenario or journey mapping
3. Permissions and task ownership
4. Persona goals and responsibilities

Do not ask every persona to review every story. Include a second persona only when that persona acts in the flow or directly consumes its outcome.

Locate each Figma flow by stable story ID first and story title second.

For every matched section:

- Record the Figma section node ID.
- Identify start, main path, branches, states, and end condition.
- Follow connectors or prototype links for sequence.
- Do not infer flow order from screen position alone.
- Inspect Drafts or source components only when the Wireflows instance lacks necessary detail.
- Record relevant screen node IDs for direct links. When a screen is an instance inside a wrapper frame, record the instance node ID, so Fix mode can trace it to its source component on the Draft page.

If the title matches but the story ID or content does not, report **source/design mapping drift** separately from a design problem.

## 6. Run the layered review

### Pass 1: Coverage and scope

Check whether:

- The persona objective has a complete path.
- Every important user-facing requirement appears in a screen, state, or transition.
- Required loading, empty, success, error, and safety states are represented.
- The flow contradicts an exclusion or a business rule, or changes agreed behavior.
- The flow adds something no source asks for. Keep these aside for section 10. They are not issues.
- Every ClickUp decision in the scope record is reflected in the design.
- Information that drives a decision stays consistent across screens, such as who is selected, a status, or the next step. Do not check the arithmetic of example figures.
- Related stories hand off correctly: the end of one flow matches the start of the next.
- The flow has no unnecessary steps or dead ends.

### Pass 2: Persona-constrained walkthrough

At each necessary step, ask:

1. Will the documented user pursue the intended result?
2. Is the correct action visible?
3. Will the user connect that action to the intended result?
4. Does the design show progress or completion after the action?

Use only documented persona context and visible design evidence.

Never write “As the persona, I feel…”. Write:

> The documented need suggests…

Treat unproven concerns as hypotheses to validate, not persona truth.

### Pass 3: Business fit

For each story, ask:

1. Which documented business objective does this story serve?
2. Does the design support that objective and the business process around it, such as an approval, a handoff, or a rule the business must follow?
3. Can the design decision be explained in terms of user value and business relevance?

Describe benefits as expected outcomes, such as "should help" or "is designed to". Never claim higher conversion, lower cost, or better retention unless a source states that goal. When no business objective is documented, say so instead of inventing one.

## 7. Decide what to flag, classify, and assess

### Is it worth flagging?

Before recording any issue, ask:

> Does this represent a meaningful, evidence-backed gap between the agreed requirements and the design, or does it materially prevent the intended user from achieving their goal?

If not, do not create an issue, and do not let it affect the status.

Do not flag:

- Example figures in mock data that do not add up, such as totals, percentages, or targets, when the rule the screen states is correct.
- English copy when the product will ship in another language. Figma designs are made in English, and developers handle localization.
- Missing translations or language variants, unless the agreed scope makes them a design deliverable.
- Typos, small wording differences, cosmetic details, and stylistic preferences.
- Edge cases with no evidence that they matter in this project's scope.
- Generic advice that only applies a design convention.
- Accessibility, visual-design, or design-system rules that do not create a real user problem and are not an explicit requirement.

Always flag a copy or number problem when it:

- Changes the user's decision.
- Causes a wrong transaction or record.
- Contradicts a business rule.
- Breaks a required flow.

When a number problem matches both lists, ask whether the user acts on that number. Wrong example figures stay unflagged on screens the user reads to follow progress, even when they change a percentage, color, or status. Flag a figure only when the user approves, sends, pays, or deletes based on it, or when two screens state different rules.

Flag localization work only when the agreed scope says language-specific layouts, locale-dependent content, or localization behavior must be designed in Figma.

### Classify

Classify each issue as:

- **Requirement gap:** agreed behavior is absent or contradicted.
- **UX friction:** the design makes the agreed task meaningfully harder or unclear.
- **Scope conflict:** the design adds something that contradicts an explicit exclusion or a business rule, or changes agreed behavior. A harmless addition that no source asks for is not a scope conflict. Section 10 decides whether it is worth keeping.
- **Mapping drift:** story documents and Figma organization no longer match.
- **Accessibility concern:** a barrier that materially affects the outcome, or breaks an explicit accessibility requirement. It never sets a story's status on its own.
- **Evidence gap:** the available sources are insufficient to assess.
- **Source conflict:** ClickUp, the local story, and the PRD disagree, and no explicit decision resolves it. List it under "Open scope questions", not as a design issue.

Strengths are not issues. Record them as "What works".

Give every issue:

- **Priority:** High for a blocked objective, a missing core requirement, a scope conflict, or a safety or trust problem. Medium for a missing important requirement or meaningful friction. Low for a clarification that still matters.
- **Confidence:** "Confirmed" when the design visibly misses or contradicts a stated requirement. "Potential concern" when the evidence suggests a problem but does not prove it. Examples: a friction risk based on the persona, or a requirement with no agreed measure, such as "large type" when the size is still an assumption.
- **Affected requirement:** the acceptance criterion, ClickUp decision, or business rule it touches, in one plain sentence.
- **Evidence:** the exact sources it relies on, such as a ClickUp comment with its date, a story file, a PRD section, or a persona file.

### Assess

A **core requirement** is one that the story's title, main goal, or success state names. Other acceptance criteria and agreed states are **important requirements**.

Assign one status:

- **Supported:** the user can reach the goal, and every core requirement is met. Small issues may remain.
- **Partially supported:** the user can reach the goal, but an important requirement, state, or connection is missing or incomplete.
- **Needs attention:** a core requirement or the story's main goal is missing, contradicted, or blocked. This includes a missing flow.
- **Insufficient evidence:** only when the Figma flow or the sources for this story could not be reached. Never use it for a design gap.

Rules:

- Only confirmed issues set the status. Show a potential concern so the designer can check it, but never let it lower the status on its own.
- A design detail that is not ideal never makes a story Needs attention.
- An issue that fails the "worth flagging" test never lowers a status.
- When sources dispute a core requirement and the designer could not settle it, assess against the undisputed requirements. Say in the status reason that one requirement waits on a decision, and list it under "Open scope questions".

These labels describe story support. They are not WCAG or design-quality scores.

### Explain every status

Every story gets a **status reason**: one or two sentences that name the specific design behavior behind the status. Do not repeat the story, and do not just say it meets requirements.

| Status | Also include |
| --- | --- |
| Supported | User value, business value, and a client talking point |
| Partially supported | What works, the issues, and a talking point that presents only what works today |
| Needs attention | The issues, each with its affected requirement, and guidance on what is safe to say before the fix |
| Insufficient evidence | What could not be reached, and what is needed to finish the review |

Each issue states what we found, the user impact, the business impact when relevant, and the smallest meaningful fix. Fixable issues get a **Fix now** button.

See the rubric in [methodology.md](methodology.md).

### Issue IDs and fix actions

Give every issue a stable ID and a fix action, so the designer can fix it from the canvas:

- Story issues: `[story ID]-[issue number]`, for example `4.3-2`. If a story has no ID, use its order in the review, for example `3-1`.
- Project-wide issues: `pw-[number]`, for example `pw-1`.
- Fix action by classification:
  - Requirement gap, UX friction, scope conflict: `figma-screen`, or `figma-new-screen` when the fix needs a screen or state that does not exist yet.
  - Mapping drift: `figma-rename`, which renames the Figma section only. Story files are never edited.
  - Accessibility concern: `audit-handoff`.
  - Evidence gap and source conflict: `none`.

See the fix rules in [methodology.md](methodology.md).

## 8. Keep the review focused

- Report no more than three issues per story. Use fewer when fewer are justified. Never create issues to fill the quota.
- List up to three "What works" points for a Partially supported story.
- Report project-wide issues once.
- Prioritize, in order:
  1. Objective blocked
  2. Core requirement or scope conflict
  3. Safety or trust problem
  4. Meaningful friction
- State each fact once. Details live in the issue. The status reason and talking point do not repeat them.
- Do not write fixes for issues that were not reported.
- Ask follow-up questions only when the answer would change a status or an issue.
- Reference every issue with a clear story, Figma section, or screen name.

## 9. Write in plain English

Every piece of text in the artifact must make sense to someone who has not read the stories, the personas, or the Figma file. The reader should never have to open another file to understand a finding.

- **Short sentences in everyday words.** Aim for 20 words or fewer. Use active voice: “Riley ticks three leads”, not “Three leads are selected”.
- **Say what is on the screen.** Name the people, buttons, labels, and numbers the reader would see. Write “The pop-up lists Marijke, Bram and Koen”, not “Modal content diverges from selection state”.
- **Keep codes out of the body text.** Do not put requirement IDs (FR18, D-30, AD-19), Figma node IDs, layer names (`suppression-check-excluded`), or error codes in sentences. Put them only in the reference links.
- **Explain product terms once.** If a term like “Copy Variant” or “suppression” is needed, add a short plain explanation the first time it appears.
- **Use lists for comparisons.** When two things should match but do not, show them as two bullet points.
- **No shorthand.** Avoid arrow chains (`A → B`), `·`-separated fragments, abbreviations, and jargon such as “affordance”, “state drift”, or “precedence”. Keep an abbreviation the project uses as a name, such as KPI, and spell it out once.
- **One idea per paragraph.** Split long explanations.
- **Lead with the issue or the value**, not with background.

Write each issue in these parts:

1. **What we found:** what is visible or missing, in plain words.
2. **User impact:** what the user cannot do, may misunderstand, or could get wrong.
3. **Business impact:** the consequence for the business objective or process. Omit it when there is none.
4. **Recommended fix:** the smallest meaningful change.

Name the screen in words (“the lead selection screen”) and link it. The link carries the node ID.

These rules apply to every status reason, value statement, project-wide issue, talking point, comment, annotation, script stage, and the final chat reply.

Quick test before delivery: could a new team member read any single issue and explain the problem to someone else without opening Figma or the story?

See [examples.md](examples.md) for before-and-after rewrites.

## 10. Select the design rationale

Besides issues, the review finds the design decisions worth defending: Figma comments that help the client's team review the design on their own and explain it internally, annotations for worthwhile additions beyond the stories, and a talking point per story. Build them from the review you just did. Reuse its statuses, reasons, value statements, "What works" points, scope decisions, issues, and screenshots. Do not open new sources or re-analyze the flows.

The rules are in [methodology.md](methodology.md#design-rationale). Apply them in this order:

1. **List candidates** from every Supported and Partially supported story. Never from a Needs attention or Insufficient evidence story.
2. **Test each one** against the five tests in [Which decisions deserve a comment](methodology.md#which-decisions-deserve-a-comment). Drop every one that fails.
3. **Rank and cut** across the whole review, as [Rank and limit](methodology.md#rank-and-limit) describes. The top ones, up to the ceiling, are recommended. The next ones that passed become optional, each with a `question`.
4. **Write each comment** as [Connect the decision to value](methodology.md#connect-the-decision-to-value) describes: reasons in `userNeed`, `businessGoal`, and `principle`, and any assumption in `checkFirst`. Handle the [edge cases](methodology.md#edge-cases) there.
5. **Pick beyond-scope annotations**, as [Beyond-scope elements](methodology.md#beyond-scope-elements) describes.
6. **Write a talking point** for every story except Insufficient evidence, as [Talking points](methodology.md#talking-points) describes.
7. **Run the [quality check](methodology.md#quality-check)**, and drop what fails.

Explain every decision by what it does for the user and the business, never by who decided it or where. Client-facing text never mentions ClickUp, the story or its comments, the product owner, the PRD, or "as agreed". See [Reasons the client can use](methodology.md#reasons-the-client-can-use).

### Walkthrough script

Write the script only when the designer asks for it, with the Generate button in the canvas or in a chat. A review run never writes one. On a first run, set `WALKTHROUGH` to `{ version: 0, generatedAt: "", stages: [] }`, and the canvas offers to generate it. When asked, follow [Walkthrough script](methodology.md#walkthrough-script) and [Generate the script](canvas-output.md#generate-the-script). Unlike a comment, the script names each open issue honestly.

### Notes already in Figma

On a re-run, the canvas already holds notes from earlier runs (see section 11). Start from them:

1. **One note per feature.** Match each new candidate to the earlier notes by target screen and feature. When it matches, keep the earlier note and its ID. Never add a second note for a feature that already has a comment or annotation in Figma, even with better wording. Give new notes new IDs that continue the numbering.
2. **The limits include what is in Figma.** Count published comments and annotated items toward the limits. A published optional comment counts toward the optional limit and keeps `additional: true`.
3. **Check that each note in Figma still fits.** For every published comment and annotated item:
   - Confirm its node still exists, and read back each annotation, in one read-only `use_figma` call for all notes. Change nothing. A comment's node is the `nodeId` in `COMMENT_STATE`. Figma returns annotation labels HTML-escaped, so decode them as [annotate-figma.md](annotate-figma.md#2-write-and-verify-in-one-call) does before comparing.
   - Compare its wording with the current screen and this review. The feature must still be there and still work as described. No open issue may name the screen. Its story must not be Needs attention or Insufficient evidence.

   When a note fails a check, keep it and set its `reviewNote` to say what changed and what to do:

   - "The screen this comment points to is gone. Remove it from Figma."
   - "The design changed: Continue no longer waits for the confirmation. Update the wording, or remove it."
   - "An open issue now names this screen. Consider removing this comment until it is fixed."
   - "Story 2.1 now needs attention. Consider removing this comment."
   - "This annotation is no longer in Figma. Add it again, or exclude it."

   When the read-back shows an annotation is missing, also set its `ANNOTATION_STATE` entry to `needs-check` with the same reason. Review mode never sets any other status, and never changes Figma. It cannot list comments, because it has no token. The designer confirms comments with "Check Figma status".

## 11. Produce the review artifact

Build the review from [canvas-template.tsx](canvas-template.tsx), following [canvas-output.md](canvas-output.md).

Default output:

- Cursor Canvas when `cursor/canvas` is available.
- Otherwise, a self-contained interactive HTML file with no external dependencies.
- If interactive file creation is unavailable, use the same hierarchy in concise Markdown.

The header shows the status counts, a warning for any source that was not checked, and three views, one per purpose, each with a one-line summary:

- **Findings** (default): what to fix. "Needs your decision" (fixes ready for review and open scope questions), project-wide issues, story filters, and the story list. The selected story shows, in this order:
  1. Story name and status
  2. Why this status
  3. User and business value, what works, or what is needed
  4. Issues, each with its impact, recommended fix, Fix now button, and fix status, with Approve, Request changes, and Reject once a fix is ready for review
  5. Resolved issues, collapsed
  6. A link to the story's design rationale, when it has any
  7. Evidence and sources, collapsed

  Below the stories, the status guide with what is not flagged, and the sources checked, both collapsed.
- **Design rationale:** the decisions worth defending. Recommended Figma comments, grouped by story, each with its wording, its reasons, any "Check before publishing" warning, approve, exclude, edit, publish, and the real Figma status with a link once Figma confirms it. Then the optional comments, collapsed, and the beyond-scope annotations with the same controls. "In Figma now" lists every note already in Figma.
- **Client meeting:** a talking point per presentable story, and the walkthrough script: a Generate button until the designer asks for one, then stages with story IDs and flow links, edit, copy, and regenerate.

Use muted green for Supported, muted yellow for Partially supported, muted red for Needs attention, and neutral gray for Insufficient evidence. Maintain readable contrast.

### Re-runs update the same canvas

On a re-run for the same Figma file and page, update the most recent earlier canvas in place. Find it in the canvases folder by `REVIEW.figmaFileKey` and `REVIEW.wireflowsPage.nodeId`. Keep its file name, and rebuild the whole file from the current [canvas-template.tsx](canvas-template.tsx) with the new data block. Never keep the earlier file's code: it may come from an older template with a different layout, or without comments or the walkthrough script. The designer's approvals, edited wording, and script edits are saved next to the canvas and keyed by note and stage IDs, so they carry over. Use a new canvas only for a different file or page. When the designer wants to keep the earlier review as a record, copy the canvas first.

Set `REVIEW.updatedAt` to the current time on every review run. Carry over from the earlier data block. When it has no comments or annotations yet, start them fresh:

- `COMMENT_STATE`, `ANNOTATION_STATE`, and `FIX_STATE` entries, unchanged apart from the annotation check in section 10.
- Every note that has a state entry, with its ID. For a published comment, set `text` to its `publishedText`. For an annotated item, use its `annotatedText`.
- Every unpublished note that is still a candidate, with its ID, so the designer's approval and edits stay attached.
- A published note whose story is not part of this review. Set its `reviewNote`: "Story 2.1 is not part of this review. Check this comment still fits."
- `WALKTHROUGH`, unchanged. Never write or rewrite a script on a re-run. When one exists and the review changed, the canvas warns that the script is older than the review and offers Regenerate.

Never remove anything from Figma in Review mode.

## 12. Verify before delivery

- Every story has a status reason that names specific design behavior.
- Supported stories have user value, business value or a note that no business objective is documented, and a talking point.
- Partially supported stories show what works and at least one issue.
- Needs attention stories have at least one High-priority issue with its affected requirement.
- Insufficient evidence is used only when a flow or source could not be reached.
- No issue matches the "do not flag" list in section 7.
- No business benefit is claimed without a source, and benefits are phrased as expected outcomes.
- No two stories share a talking point.
- Fix now appears only on issues that can be fixed in Figma.
- Every issue passes the plain-English test in section 9.
- No requirement ID, node ID, layer name, or error code appears in body text.
- Every reviewed story maps to the correct current story ID.
- Every persona selection is explainable from the sources.
- Shared issues are deduplicated.
- Counts in the summary match the story statuses.
- Figma links target the correct section or screen.
- Local references open the intended persona and story where the platform supports file links.
- No finding claims observed user behavior.
- No WCAG conformance claim appears.
- Every issue has a unique ID and the correct fix action.
- Every fix prompt names the absolute path of this skill folder, because the skill cannot be invoked automatically in a new chat.
- Every state that waits on a chat shows when it started and offers Stop waiting, because the canvas cannot tell when a chat is closed or deleted.
- Every source marked "Read" was actually opened and inspected.
- Every finding based on ClickUp cites the task or comment it relies on.
- Every inaccessible or missing source appears in "Sources checked".
- Unresolved conflicts appear in "Open scope questions", not as confirmed design issues.
- Every comment passed the five tests in methodology, was ranked across every eligible story, and fits the limits, counting what is already in Figma.
- Every comment and annotation names a real screen. None sits on a screen an open issue names, and no feature has two notes.
- No new comment comes from a Needs attention or Insufficient evidence story. A published comment carried over from an earlier review may stay, with a `reviewNote`.
- Every optional comment has a `question`, and every assumption is in `checkFirst`.
- No comment, annotation, talking point, or script line names an internal source or who decided, such as ClickUp, the story, the product owner, or "as agreed".
- Every published comment and annotated item links to its node in Figma. No link is shown for a note Figma has not confirmed, apart from "Check in Figma" for one that needs a check.
- On a re-run, every published comment and annotated item was checked against the current screen, and each one that no longer fits has a `reviewNote`.
- The review run left `WALKTHROUGH` as it was, or empty on a first run, and set `REVIEW.updatedAt`.
- When a script exists, it follows the journey order, matches every story status, mentions each open journey issue and beyond-scope element, and every stage lists its story IDs.
- The canvas was built from the current template, including on a re-run, and no sample data remains.

Return only:

1. A link to the review artifact.
2. One sentence with the counts, such as "4 supported, 2 partially supported, 1 needs attention."
3. One sentence naming any source that could not be accessed and the number of open scope questions. Omit it when there are none.
4. One sentence saying [N] design decisions are ready to share as Figma comments in the canvas's "Design rationale" view, with [N] optional and [N] items beyond the stories, that talking points and an on-request walkthrough script are in "Client meeting", and that nothing goes to Figma until the designer approves it. When no decision met the bar, say so instead.

## Additional resources

- Collecting and checking sources: [intake.md](intake.md)
- Review rules: [methodology.md](methodology.md)
- Output structure: [canvas-output.md](canvas-output.md)
- Canvas starting point: [canvas-template.tsx](canvas-template.tsx)
- Fixing one issue: [fix-mode.md](fix-mode.md)
- Applying an approved fix: [apply-fix.md](apply-fix.md)
- Publishing approved comments: [publish-comments.md](publish-comments.md)
- Adding approved annotations: [annotate-figma.md](annotate-figma.md)
- Feedback examples: [examples.md](examples.md)
- Installation and usage: [README.md](README.md)
