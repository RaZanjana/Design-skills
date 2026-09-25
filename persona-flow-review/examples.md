# Feedback Examples

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

1. Timing and limits are visible
Why it matters: Riley can understand the sending schedule and protected volume.

2. Unsubscribe stop rule is missing
Why it matters: The story requires unsubscribe, handoff, and suppression to stop enrolment.

Design rationale
Keeping timing, limits, review status, and mandatory stops together makes automation inspectable rather than unattended.

Consider changing
Add unsubscribe to the visible mandatory stop rules.

Keep
Keep the cumulative timeline, send limits, and non-toggleable safety rules.
```
