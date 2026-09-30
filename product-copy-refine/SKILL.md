---
name: product-copy-refine
description: Rewrites the interface copy on selected Figma pages or frames in place so it speaks the target users' language, using the project's PRD, user stories, and personas as the source of truth. Keeps the designed layout intact and never uses em dashes. Use when a designer asks to refine, humanize, de-jargon, or rewrite product copy, UX copy, microcopy, or AI-generated screen text in Figma.
disable-model-invocation: true
---

# Product Copy Refine

Answer one question for every piece of copy:

> Will the documented user understand this immediately and know what to do next?

If not, rewrite it directly in Figma, without changing the layout.

This is not a visual audit, a translation job, a brand campaign, or a WCAG audit. It changes text content only.

## Hard rule: no em dashes

Never write an em dash (—) in any copy, change log, or summary. Replace it:

- **Comma** for a short pause: "Saved, you can close this page."
- **Period** for a new thought: "Payment failed. Check your card details."
- **Parentheses** for an aside: "Add a backup email (optional)."

Also replace em dashes already present in the original copy. Do not substitute a spaced hyphen (" - ") or an en dash (–) as a sentence dash. En dashes are allowed only in numeric ranges ("9–5", "Mon–Fri").

## 1. Gather inputs

Request these clearly. The first five are mandatory.

1. **PRD: mandatory.** "Where is the PRD?"
2. **User stories: mandatory.** "Where are the current user stories?"
3. **Personas: mandatory.** "Where are the persona files?"
4. **Figma file: mandatory.** "Which Figma file should I rewrite?"
5. **Target pages or frames: mandatory.** "Which pages or frames should I cover?"
6. **Platform: optional.** iOS, Android, web, or mixed. Infer it from frame sizes and the PRD when omitted.
7. **Locale: optional.** Default to the language of the PRD, and the spelling convention of the PRD (for example, US or UK English).
8. **Voice notes, glossary, or protected terms: optional.** Brand names, legal phrases, or terms the team has already agreed.

Inputs may be URLs, folders with multiple files, or single files. Read every file in a supplied folder that relates to product, stories, or personas.

## 2. Validate access before editing

- Confirm every mandatory source exists and is readable.
- Confirm the Figma file and every named page or frame is accessible and editable.
- If a mandatory source is missing, name exactly what is missing and stop.
- Never write to Figma based on guesses about the audience or scope.
- Load the `figma-use` skill before any `use_figma` call.
- Edits are made in place. Tell the user once, before the first write, that Figma version history is the only undo path, and that the change log records every original string.

## 3. Build the audience and language profile

Extract only what affects wording.

From the personas:

- Role, goals, and the outcome they care about
- Technical and domain literacy
- Words they use for their own tasks and objects
- Worries and trust concerns (money, data, mistakes, time)
- Context of use (on the move, one-handed, interrupted, expert daily use)

From the PRD and user stories:

- The canonical user-facing term for each concept (for example, always "Remove", never a mix of Delete, Remove, and Discard)
- Internal or system terms that users must never see (database names, API states, codes, team jargon)
- Required states per story: success, error, empty, loading, confirmation
- Tone constraints stated in the PRD

Record this as a short glossary table: concept, use this term, never use. Resolve conflicts with this order:

1. PRD and approved scope
2. User stories
3. Personas
4. The built-in [copy-guide.md](copy-guide.md)

If sources conflict and this order does not settle it, ask one focused question. Do not choose silently.

## 4. Inventory the copy

For each target frame, collect every text layer and record:

- Node ID, frame, and the related story (by story ID, then title)
- Copy role: heading, body, CTA, link, label, placeholder, helper, error, empty state, toast, navigation, tab, tooltip, dialog title, dialog body, badge
- Layout constraints: text resize mode, width, height, line count, fonts, mixed styles, component property binding

Skip and do not edit:

- Realistic sample data (names, prices, dates, avatars, counts)
- Brand and product names, legal text, and protected terms
- Hidden or locked layers
- Layers with missing fonts
- Text bound to a variable
- Text inside main components or component sets. Flag these instead, because editing them changes every instance.

Placeholder filler such as "Lorem ipsum" or "Text goes here" is copy. Rewrite it with real, story-appropriate text.

## 5. Rewrite

Apply [copy-guide.md](copy-guide.md) using the audience profile. Rewrite only layers that break a rule. Leave good copy alone.

For each rewrite:

- Use the persona's own words and the glossary's canonical terms.
- Keep the meaning and the story requirement intact. Never add promises, features, or data that the PRD and stories do not support.
- Stay within the length budget in [figma-rewrite.md](figma-rewrite.md).
- Note the rule applied and the evidence source (persona, story, PRD, or copy guide).

Keep related strings consistent across frames: the CTA that opens a flow, its dialog title, and its success toast should use the same verb and object.

## 6. Apply in Figma without breaking the layout

Follow [figma-rewrite.md](figma-rewrite.md) exactly. In short:

- Load every font used by the layer before editing.
- Preserve mixed styling (bold words, links, colors) segment by segment.
- Never change fonts, sizes, line height, fills, text resize mode, frame sizes, or auto layout.
- Measure fit after writing. If the text overflows, shorten it once. If it still does not fit, restore the original and flag the layer.
- Update instance text through its component text property when one exists.
- Batch edits per frame to keep the number of `use_figma` calls small.

## 7. Verify

- Rescan every edited layer for "—". The count must be zero.
- Rescan the change log and summary for "—". The count must be zero.
- Confirm every edited layer still fits its original line count and width budget.
- Take a screenshot of each edited frame and check for clipping, wrapping, or overlap.
- Confirm glossary terms are used consistently across all target frames.
- Confirm no skipped category (sample data, brand terms, main components) was edited.

## 8. Report

Create a change log. Use Cursor Canvas when available. Otherwise, write a Markdown file named `[project]-copy-changes.md`.

Structure:

1. **Summary:** frames covered, layers changed, layers left unchanged, layers flagged.
2. **Glossary applied:** concept, term used, terms replaced.
3. **Changes:** grouped by page, then frame. Each row shows before, after, copy role, rule applied, evidence source, and a Figma link to the node.
4. **Flagged for the designer:** main components, overflow reverts, missing fonts, variable-bound text, and source conflicts, each with a reason and a link.

Return only:

1. A link to the change log.
2. One sentence: how many layers were rewritten, left unchanged, and flagged, across how many frames.

## Additional resources

- Writing rules: [copy-guide.md](copy-guide.md)
- Layout-safe editing: [figma-rewrite.md](figma-rewrite.md)
- Before and after examples: [examples.md](examples.md)
- Installation and usage: [README.md](README.md)
