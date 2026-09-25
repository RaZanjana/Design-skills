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

- Left: compact story list with ID, title, and assessment
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
4. **Design rationale**
   - Intentional design decision
   - Reason it supports the persona or story
5. **Considerations**
   - Consider changing
   - Keep
   - Omit a heading when there is nothing meaningful to add
6. **Walkthrough notes**
   - Two or three short talking points
7. **References**
   - Persona
   - User story
   - Scope decision, when directly relevant
   - Figma flow
   - Relevant screens

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

## Story data contract

Each story review should contain:

```text
id
title
assessment
persona
objective
observations[]
  title
  classification
  found
  whyItMatters
  suggestedFix?
  screenName
  screenNodeId
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

## Final chat response

Do not reproduce the review in chat. Keep the reply in plain English.

Return:

```text
Created the persona flow review: [Open review]

[N] support · [N] partially support · [N] need attention · [N] insufficient evidence
```
