---
name: persona-flow-review
description: Reviews a chosen Figma page's story flows against the project's defined personas, the agreed ClickUp story scope including task comments, local user story files, and the referenced PRD. Starts from a short prompt such as "review [story names]", asks only for missing inputs, checks every source before reviewing, then produces a concise evidence-linked review with design rationale, walkthrough notes, and direct references. Each issue in the review can then be fixed one at a time on a separate "Fixed issues" Figma page and, after designer approval, applied to the source components. Use when a designer asks for a persona flow review, user-story design validation, evidence-based design rationale, a lightweight pre-walkthrough review, or to fix or apply a fix for an issue from a persona flow review.
disable-model-invocation: true
---

# Persona Flow Review

Use documented evidence to answer:

> Does this flow help the intended user achieve the agreed objective?

This is not persona role-play, usability testing, a visual-quality audit, or a WCAG conformance audit.

## 0. Choose the mode

This skill has three modes. Pick one from the request before doing anything else.

| Request | Mode | Instructions |
| --- | --- | --- |
| Review flows, stories, or a Figma file | **Review** | [intake.md](intake.md), then sections 1 to 11 of this file |
| "Fix issue [ID]", "Revise fix for issue [ID]", or "Reject fix for issue [ID]" | **Fix** | [fix-mode.md](fix-mode.md) |
| "Apply approved fix for issue [ID]" | **Apply** | [apply-fix.md](apply-fix.md) |

Fix and Apply requests usually arrive from a button in the review canvas. The canvas file is attached to the chat and holds the issue, its evidence, the Figma links, and the source paths. Read only what the mode file asks for. Do not rerun the full review.

Review mode is read-only. Fix mode writes only to the "Fixed issues" Figma page. Only Apply mode changes the Draft and Wireflows pages, and only after the designer approves the fix.

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

## 2. Keep Review mode read-only

- Never edit Figma, ClickUp, or project files in Review mode. Fixes happen later, one issue at a time, through Fix mode.
- Review only the Figma page the designer named.
- Never claim a source was reviewed unless its contents were read.
- Never use an online repository as a substitute for a supplied local source unless the designer explicitly permits it.

## 3. Establish source precedence

Use this order:

1. **ClickUp task description and comments** define the agreed scope of each story, including additions, exclusions, and clarifications. The latest explicit decision wins.
2. **Local user story files and decision records** give project context, relationships, dependencies, and references. Their requirements apply unless ClickUp explicitly contradicts them.
3. **The PRD and related product documents** give the broader product intent and business rules, where ClickUp is silent.
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
- The flow includes unapproved behavior or contradicts an exclusion.
- Every ClickUp decision in the scope record is reflected in the design.
- Counts, labels, status, and sequence remain consistent across screens.
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

## 7. Classify and assess

Classify findings as:

- **Requirement gap:** agreed behavior is absent or contradicted.
- **UX friction:** the design may make the agreed task harder or unclear.
- **Scope conflict:** the design adds excluded or unapproved behavior.
- **Mapping drift:** story documents and Figma organization no longer match.
- **Accessibility concern:** a potential barrier requiring a separate accessibility review.
- **Evidence gap:** the available sources are insufficient to assess.
- **Source conflict:** ClickUp, the local story, and the PRD disagree, and no explicit decision resolves it. List it under "Open scope questions", not as a design issue.

Give every observation:

- **Priority:** High for a blocked objective, a core requirement or scope conflict, or a safety or trust problem. Medium for meaningful friction. Low for clarifications.
- **Confidence:** "Confirmed" when visible design evidence contradicts or misses a stated requirement. "Potential concern" when it is a friction hypothesis to validate.
- **Evidence:** the exact sources it relies on, such as a ClickUp comment with its date, a story file, a PRD section, or a persona file.

Assign one assessment:

- **Supports:** the main objective and story requirements are covered.
- **Partially supports:** the flow works, but an important gap remains.
- **Needs attention:** a core requirement is missing or contradicted.
- **Insufficient evidence:** the flow or source material cannot support a defensible assessment.

These are story-support labels, not WCAG or overall design-quality scores.

Give every issue a stable ID and a fix action, so the designer can fix it from the canvas:

- Story issues: `[story ID]-[observation number]`, for example `4.3-2`.
- Project-wide issues: `pw-[number]`, for example `pw-1`.
- Fix action by classification:
  - Requirement gap, UX friction, scope conflict: `figma-screen`, or `figma-new-screen` when the fix needs a screen or state that does not exist yet.
  - Mapping drift: `figma-rename`, which renames the Figma section only. Story files are never edited.
  - Accessibility concern: `audit-handoff`.
  - Evidence gap, source conflict, and strengths: `none`.

See the fix rules in [methodology.md](methodology.md).

## 8. Keep the review concise

- Report no more than three meaningful observations per story.
- Use fewer when fewer are justified.
- Report project-wide issues once.
- Prioritize, in order:
  1. Objective blocked
  2. Core requirement or scope conflict
  3. Safety or trust problem
  4. Meaningful friction
- Omit findings that would not affect a design decision or walkthrough explanation.
- Reference every finding with a clear story, Figma section, or screen name.

## 9. Write in plain English

Every piece of text in the artifact must make sense to someone who has not read the stories, the personas, or the Figma file. The reader should never have to open another file to understand a finding.

- **Short sentences in everyday words.** Aim for 20 words or fewer. Use active voice: “Riley ticks three leads”, not “Three leads are selected”.
- **Say what is on the screen.** Name the people, buttons, labels, and numbers the reader would see. Write “The pop-up lists Marijke, Bram and Koen”, not “Modal content diverges from selection state”.
- **Keep codes out of the body text.** Do not put requirement IDs (FR18, D-30, AD-19), Figma node IDs, layer names (`suppression-check-excluded`), or error codes in sentences. Put them only in the reference links.
- **Explain product terms once.** If a term like “Copy Variant” or “suppression” is needed, add a short plain explanation the first time it appears.
- **Use lists for comparisons.** When two things should match but do not, show them as two bullet points.
- **No shorthand.** Avoid arrow chains (`A → B`), `·`-separated fragments, abbreviations, and jargon such as “affordance”, “state drift”, or “precedence”.
- **One idea per paragraph.** Split long explanations.

Write each observation in three parts:

1. **What we found:** what is visible or missing, in plain words.
2. **Why it matters:** the effect on the persona or the story goal.
3. **Suggested fix:** one concrete change.

Name the screen in words (“the lead selection screen”) and link it. The link carries the node ID.

The same rules apply to project-wide findings, design rationale, Consider changing / Keep, walkthrough notes, and the final chat reply.

Quick test before delivery: could a new team member read any single observation and explain the problem to someone else without opening Figma or the story?

See [examples.md](examples.md) for a before-and-after rewrite.

## 10. Produce the review artifact

Create the organized interactive output described in [canvas-output.md](canvas-output.md).

Default output:

- Cursor Canvas when `cursor/canvas` is available.
- Otherwise, a self-contained interactive HTML file with no external dependencies.
- If interactive file creation is unavailable, use the same hierarchy in concise Markdown.

The output must include:

- Assessment guide
- Sources checked, with any source that could not be accessed
- Project-wide findings
- Open scope questions
- Story filters
- Persona and objective
- Scope used, with the ClickUp decisions that override local documents
- Assessment
- Up to three observations, each with “What we found”, “Why it matters”, “Suggested fix”, priority, confidence, and evidence
- A “Fix issue” button on every fixable issue, with a choice between the suggested fix and the designer's own instruction
- Fix status for every issue, with Approve, Request changes, and Reject buttons once a fix is ready for review
- Design rationale
- Consider changing / Keep
- Walkthrough notes
- Direct links to persona, story, Figma flow, and relevant screens

Use muted green for Supports, muted yellow for Partially supports, muted red for Needs attention, and neutral gray for Insufficient evidence. Maintain readable contrast.

## 11. Verify before delivery

- Every observation passes the plain-English test in section 9.
- No requirement ID, node ID, layer name, or error code appears in body text.
- Every reviewed story maps to the correct current story ID.
- Every persona selection is explainable from the sources.
- Every factual finding has evidence.
- Shared findings are deduplicated.
- Counts in the summary match the story assessments.
- Figma links target the correct section or screen.
- Local references open the intended persona and story where the platform supports file links.
- No finding claims observed user behavior.
- No WCAG conformance claim appears.
- Every issue has a unique ID and the correct fix action.
- Every fix prompt names the absolute path of this skill folder, because the skill cannot be invoked automatically in a new chat.
- Every source marked "Read" was actually opened and inspected.
- Every finding based on ClickUp cites the task or comment it relies on.
- Every inaccessible or missing source appears in "Sources checked".
- Unresolved conflicts appear in "Open scope questions", not as confirmed design issues.

Return only:

1. A link to the review artifact.
2. A one-sentence summary of how many stories support, partially support, need attention, or lack evidence.
3. One sentence naming any source that could not be accessed and the number of open scope questions. Omit it when there are none.

## Additional resources

- Collecting and checking sources: [intake.md](intake.md)
- Review rules: [methodology.md](methodology.md)
- Output structure: [canvas-output.md](canvas-output.md)
- Fixing one issue: [fix-mode.md](fix-mode.md)
- Applying an approved fix: [apply-fix.md](apply-fix.md)
- Feedback examples: [examples.md](examples.md)
- Installation and usage: [README.md](README.md)
