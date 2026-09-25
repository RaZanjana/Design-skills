# Feedback Examples

## Plain-English observation

### Good

**The pop-up shows different names from the ones Riley ticked**

What we found:

- Riley ticks **Marijke, Erna and Koen**.
- The confirmation pop-up lists **Marijke, Bram and Koen**.

Why it matters: Riley checks the names before confirming. If they don't match, Riley can't trust what will be saved.

Suggested fix: Make the pop-up show exactly the people Riley ticked.

Screen: [Confirm exception pop-up](https://www.figma.com/design/FILE?node-id=343-24201&m=dev)

### Avoid

**The confirmation lists different leads than were selected** · UX friction · trust

The table selects Marijke de Vries, Erna Visser and Koen Hartman. The confirmation dialog lists Marijke de Vries, Bram Smit and Koen Hartman. Riley confirms an audited exception by name. A mismatch undermines confidence that the recorded exception is the one intended. `Campaign suppression exception-confirm-modal · 343:24201`

Why: the reader has to decode a layer name and node ID, and the comparison is buried in one long paragraph.

---

## Plain-English safety finding

### Good

**Someone who unsubscribed can still be picked for an exception**

What we found: On the lead selection screen, Erna Visser unsubscribed, but her row isn't locked. The “locked” tag is on Lotte Meijer instead, who is blocked for a different reason.

Why it matters: The law says people who unsubscribe must never be contacted again. Riley's biggest worry is messaging them by mistake.

Suggested fix: Lock Erna's row, and don't let anyone tick people who unsubscribed.

### Avoid

Recipient-unsubscribe suppression source not bound to lock affordance (FR23, `OVERRIDE_NOT_ALLOWED_FOR_UNSUBSCRIBE`).

Why: requirement codes, error codes, and jargon replace a plain description of what the reader will see.

---

## Evidence-based observation

### Good

**Manual selection conflicts with the agreed rule**

Screen `scoring-with-threshold` lets Riley select additional leads. Story 2.5 excludes per-lead approval and below-threshold overrides, so this control conflicts with the agreed campaign-level rule.

### Avoid

Riley probably will not like selecting leads manually.

Why: this invents a reaction and does not identify the requirement.

---

## Design rationale

### Good

**Design decision:** Show excluded identities and reasons before sequence configuration.

**Reason:** Riley is accountable for avoiding customers, competitors, and unsubscribed recipients. Showing the exclusion result before sequence work lets Riley verify the safety boundary before outreach is prepared.

### Avoid

The suppression table is a good design.

Why: this states an opinion without connecting it to persona evidence or the story.

---

## Clear reference

### Good

Story 4.2 · `suppression-check-excluded` · Figma node `264:19130`

### Avoid

The suppression screen

Why: the designer must search for the referenced screen.

---

## Project-wide issue

### Good

**Project-wide:** All reviewed screens use English, while the approved scope requires Dutch product copy. This applies to every reviewed story and is recorded once.

### Avoid

Repeat “The screen is not Dutch” under every story.

Why: repetition hides story-specific insight.

---

## Mapping drift

### Good

Figma section `3.3 — Delete Suppression Entries` no longer matches current Story 3.3, which defines a backend pre-send check. Treat the delete flow as part of Story 3.2 until the Figma section is updated.

### Avoid

The delete design is out of scope.

Why: the behavior may be valid but attached to an outdated story ID.

---

## Insufficient evidence

### Good

**Assessment: Insufficient evidence**

Only the campaign-details screen is available. The target-segment, validation, save, and error states are not visible, so the complete story cannot be assessed.

### Avoid

The flow probably supports campaign creation.

Why: the missing flow has been filled with an assumption.

---

## Concise story review

```text
Story 4.3 — Configure Multi-Step Sequence
Persona: Riley the Regisseur
Objective: Control timing, limits, and mandatory stop conditions.
Assessment: Partially supports

1. Riley can see when each message sends and the daily limits
Why it matters: Riley knows how fast outreach will go before approving it.

2. Unsubscribing does not stop the messages
What we found: The stop rules list a sales handoff and the suppression list, but not unsubscribing.
Why it matters: The story says all three must stop messages to that person.
Suggested fix: Add "The lead unsubscribes" to the stop rules.

Design rationale
Keeping timing, limits, review status, and mandatory stops together makes automation inspectable rather than unattended.

Consider changing
Add unsubscribe to the visible mandatory stop rules.

Keep
Keep the cumulative timeline, send limits, and non-toggleable safety rules.
```
