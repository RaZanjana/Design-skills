---
name: persona-flow-review
description: Reviews Figma wireflows against documented personas, user stories, and approved scope, then produces a concise evidence-linked review with design rationale, walkthrough notes, and direct references. Use when a designer asks for a persona flow review, user-story design validation, evidence-based design rationale, or a lightweight pre-walkthrough review.
disable-model-invocation: true
---

# Persona Flow Review

Use documented evidence to answer:

> Does this flow help the intended user achieve the agreed objective?

This is not persona role-play, usability testing, a visual-quality audit, or a WCAG conformance audit.

## 1. Gather inputs

Request these clearly. Mark the first five as mandatory.

1. **Persona source — mandatory**  
   “Where are the approved persona files?”
2. **User-story source — mandatory**  
   “Where are the current user stories?”
3. **Scope source — mandatory**  
   “Which files define the approved MVP scope and later decisions?”
4. **Figma design — mandatory**  
   “Which Figma file should be reviewed?”
5. **Wireflows page — mandatory**  
   “Which page contains the story flows?”  
   Use `Wireflows` as the default only when the designer confirms it.
6. **Story selection — optional**  
   “Should I review every mapped story or specific story IDs?”
7. **Known changes — optional**  
   “Are any files or Figma sections outdated or recently changed?”
8. **Output name — optional**  
   Default to `[project]-persona-flow-review`.

Accept local folders, individual files, Figma URLs, and user-provided exports.

## 2. Validate access before reviewing

- Confirm every mandatory local source exists and is readable.
- Confirm the Figma file and requested page are accessible.
- If a mandatory source is unavailable, state exactly what is missing and stop.
- If Figma access is unavailable, request a PDF or screenshots grouped by story. Do not review an unseen design.
- Never use an online repository as a substitute for a supplied local source unless the user explicitly permits it.
- Keep the review read-only. Never edit Figma or source files unless separately requested.

## 3. Establish source precedence

Use this order:

1. Approved scope and decision records define what is in or out.
2. Current user stories define required behavior and outcomes.
3. Personas define relevant goals, needs, concerns, behavior, and constraints.
4. Figma shows the design decision being evaluated.

Persona documents may contain proposed product solutions. Treat those as derived statements, not independent user evidence.

If authoritative sources conflict and precedence does not resolve the conflict, ask one focused question. Do not choose silently.

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
- Dependencies
- Explicit exclusions and deferred decisions
- Exact source location

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
- Record relevant screen node IDs for direct links.

If the title matches but the story ID or content does not, report **source/design mapping drift** separately from a design problem.

## 6. Run the layered review

### Pass 1: Coverage and scope

Check whether:

- The persona objective has a complete path.
- Every important user-facing requirement appears in a screen, state, or transition.
- Required loading, empty, success, error, and safety states are represented.
- The flow includes unapproved behavior or contradicts an exclusion.
- Counts, labels, status, and sequence remain consistent across screens.

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

Assign one assessment:

- **Supports:** the main objective and story requirements are covered.
- **Partially supports:** the flow works, but an important gap remains.
- **Needs attention:** a core requirement is missing or contradicted.
- **Insufficient evidence:** the flow or source material cannot support a defensible assessment.

These are story-support labels, not WCAG or overall design-quality scores.

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

## 9. Produce the review artifact

Create the organized interactive output described in [canvas-output.md](canvas-output.md).

Default output:

- Cursor Canvas when `cursor/canvas` is available.
- Otherwise, a self-contained interactive HTML file with no external dependencies.
- If interactive file creation is unavailable, use the same hierarchy in concise Markdown.

The output must include:

- Assessment guide
- Project-wide findings
- Story filters
- Persona and objective
- Assessment
- Up to three observations with “Why it matters”
- Design rationale
- Consider changing / Keep
- Walkthrough notes
- Direct links to persona, story, Figma flow, and relevant screens

Use muted green for Supports, muted yellow for Partially supports, muted red for Needs attention, and neutral gray for Insufficient evidence. Maintain readable contrast.

## 10. Verify before delivery

- Every reviewed story maps to the correct current story ID.
- Every persona selection is explainable from the sources.
- Every factual finding has evidence.
- Shared findings are deduplicated.
- Counts in the summary match the story assessments.
- Figma links target the correct section or screen.
- Local references open the intended persona and story where the platform supports file links.
- No finding claims observed user behavior.
- No WCAG conformance claim appears.

Return only:

1. A link to the review artifact.
2. A one-sentence summary of how many stories support, partially support, need attention, or lack evidence.

## Additional resources

- Review rules: [methodology.md](methodology.md)
- Output structure: [canvas-output.md](canvas-output.md)
- Feedback examples: [examples.md](examples.md)
- Installation and usage: [README.md](README.md)
