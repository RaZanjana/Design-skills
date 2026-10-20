# Feedback Examples

## Plain-English issue

### Good

**The pop-up shows different names from the ones Riley ticked**

What we found:

- Riley ticks **Marijke, Erna and Koen**.
- The confirmation pop-up lists **Marijke, Bram and Koen**.

User impact: Riley checks the names before confirming. If they don't match, Riley can't trust what will be saved.

Recommended fix: Make the pop-up show exactly the people Riley ticked.

Screen: [Confirm exception pop-up](https://www.figma.com/design/FILE?node-id=343-24201&m=dev)

This is flagged because the names drive Riley's decision. It is not a sample-data slip.

### Avoid

**The confirmation lists different leads than were selected** · UX friction · trust

The table selects Marijke de Vries, Erna Visser and Koen Hartman. The confirmation dialog lists Marijke de Vries, Bram Smit and Koen Hartman. Riley confirms an audited exception by name. A mismatch undermines confidence that the recorded exception is the one intended. `Campaign suppression exception-confirm-modal · 343:24201`

Why: the reader has to decode a layer name and node ID, and the comparison is buried in one long paragraph.

---

## Issue with evidence

### Good

**The export button is still on the screen after it was removed from scope**

Tags: High priority, Confirmed

Affected requirement: Export is not part of this story.

What we found: The campaign overview screen shows an "Export to CSV" button. A ClickUp comment removed export from this story.

User impact: Riley may expect an export that the team will not build.

Recommended fix: Remove the "Export to CSV" button from the campaign overview screen.

Evidence: [ClickUp comment, 12 Oct 2026](https://app.clickup.com/t/TASK), [Story file](docs/stories/4-1.md)

### Avoid

Export present but descoped (see ClickUp).

Why: the reader cannot tell which comment removed it, or when.

---

## Not flagged

Each of these fails the decision rule, so it gets no issue, no fix, and no effect on the status.

| What the reviewer noticed | Why it is not flagged |
| --- | --- |
| The team's monthly total is lower than one account manager's total. | Example figures in mock data. The rule on the screen is correct. |
| The week target shows 8, but four days at 1.6 a day make 6.4. | Example figures again. Developers build from the stated rule. |
| Every screen is in English, but the product ships in Dutch. | Figma designs are made in English. Developers handle localization. |
| The Dutch translation of "Pause campaign" is missing. | Translation is an implementation task here. |
| A button says "Recieve updates". | A typo. It does not change the task. |
| "What if Riley imports 10,000 leads at once?" | No source says this case matters for this project. |
| A secondary label's contrast looks low. | No accessibility requirement is in scope, and the label is not needed to finish the task. |

## Flagged even though it looks minor

**The summary promises 3 follow-ups, but the timeline shows 5**

What we found:

- The summary says "Messages stop after 3 follow-ups".
- The timeline below it shows 5 follow-up messages.

User impact: Riley approves the sequence based on the summary, so Riley could send more messages than intended.

Business impact: Extra follow-ups go beyond the agreed contact limit.

This is flagged because the rule itself is contradicted, and it changes what Riley approves.

**The Dutch invoice layout is missing**

What we found: The ClickUp task asks for a Dutch layout check of the invoice screen, because Dutch labels are longer. Only the English layout exists.

This is flagged because the agreed scope makes the Dutch layout a design deliverable.

---

## Source conflict

### Good

**Open scope question: Does Riley approve each lead, or only the whole campaign?**

- The ClickUp task description says Riley approves at campaign level.
- The PRD says Riley approves each lead before sending.
- No ClickUp comment settles it.

Who should decide: the product owner.

### Avoid

Requirement gap: per-lead approval missing.

Why: the sources disagree. The design cannot be judged wrong until someone decides which rule applies.

---

## Status reason

### Good

**Supported:** Riley can see every excluded person with the reason, and Continue stays locked until Riley confirms the list.

**Partially supported:** Riley can set the schedule and daily limit, but one required stop rule is missing.

**Needs attention:** The story needs a final approval before sending, but the flow goes straight from review to sending.

### Avoid

The design meets the story requirements.

Why: it names no screen or behavior, so the designer cannot defend it or act on it.

---

## Client talking points

### Supported, good

Say this in the walkthrough:

> Before Riley sets up any messages, the check shows exactly who is excluded and why. That gives Riley one clear moment to confirm the list is safe, which is designed to protect opt-outs and customer relationships.

### Supported, avoid

> This screen improves the UX and follows best practices.

Why: it could describe any screen. It names no user goal, design choice, or business reason.

### Partially supported, good

Safe to say now:

> Riley sees the whole sending schedule and the daily limit before approving. The fixed stop rules show that a handoff or a blocked contact always ends the sequence.

It presents what works today, and does not claim the missing unsubscribe rule is there.

### Needs attention, good

Safe to say now:

> The review screen already brings the leads, messages, and schedule together on one page. The final approval step is still being designed.

### Needs attention, avoid

> Riley reviews and approves the campaign before anything is sent.

Why: the approval step does not exist yet, so this presents a gap as done.

---

## Business value

### Good

Business value: It should keep opt-outs and customer relationships safe, which the PRD names as a must.

It names the documented objective and presents the benefit as expected.

### Avoid

Business value: This will increase reply rates by 20% and cut sending costs.

Why: no source states these figures or goals. They are invented results.

When no objective is documented, write: "No business objective is documented for this story."

---

## Positive Figma comment

### Good

On the suppression check list:

> Before Riley sets up any messages, this list shows everyone who is left out and why. Riley can confirm the campaign is safe in one place, which is designed to protect opt-outs and customer relationships.

It names the feature, the user benefit, and the documented business goal, in 35 words. The business value is phrased as intent.

### Avoid

> Great clean layout with clear hierarchy and consistent spacing. This intuitive design will boost conversions and reduce churn.

Why: it praises visual polish, uses UX jargon, names no user goal, and claims outcomes no source states.

### Avoid: hides a gap

On the stop rules, while unsubscribing is still missing:

> Every way a sequence should end is covered here, so Riley never messages someone who opted out.

Why: an open issue touches this screen. A comment must never present a gap as done. Comment on a part of the flow that works instead, or leave the screen without one.

---

## Choosing which comments to keep

Seven candidates across four stories:

| Candidate | Keep? | Why |
| --- | --- | --- |
| Excluded people listed with reasons, before sequencing | Yes | Answers a core user need and a documented business rule. Clients often ask why the step exists. |
| Schedule and daily limit shown before approval | Yes | Its value is not obvious from the screen alone, and it ties to a documented goal. |
| Locked Continue button until the list is confirmed | No | Same benefit as the first comment. Keep the stronger one. |
| Friendly empty state on the reply list | No | Nice, but no requirement or business goal depends on it. |
| Consistent card style across screens | No | Visual polish. Not a decision the client needs explained. |
| Campaign review summary on one page | No | Its story needs attention. No comments from Needs attention stories. |
| Second comment on the timeline screen, about the daily limit | No | Same screen and same point. One comment per screen. |

Two strong comments beat seven weak ones.

---

## Additional comment for client self-review

### Good

Question: "Why does the list have four exclusion reasons when the story names three?"

> People who unsubscribed get their own reason in this list. The story named three reasons, and this fourth one was agreed in the story comments, so anyone who opted out by email is never contacted again.

It answers the question a reviewer will ask when they compare the screen with the story. It says where the decision was agreed and what it protects, so the client can explain it to their team without asking the designer.

### Avoid

> We know this looks different from the story, but the extra reason is important and the team thought about it carefully.

Why: it sounds defensive, gives no reason or source, and leaves the client nothing to tell their team.

### Avoid: not a real question

> The Continue button is placed at the bottom right, where people expect it.

Why: nobody on the client's team is likely to question it, and it is a generic UX principle with no source.

---

## Beyond-scope annotation

### Good

> Beyond the story: Riley can download the list of excluded people to check it with account managers before launch. The story does not ask for this, so please confirm it stays.

It says what the element does, ties it to the persona, and asks for confirmation instead of hiding the scope change.

### Avoid

> Added an export feature for better UX.

Why: it does not say it is beyond the story, names no user value, and uses jargon.

### Not annotated

A decorative illustration on the empty state. No story asks for it, and no persona need or business goal depends on it. Ignore it: no annotation, no issue.

### Scope conflict, not an annotation

The design adds a "Send now" button that skips the approval step. The story requires approval before sending. This contradicts a business rule, so it is a scope conflict issue, not something worth keeping.

---

## Walkthrough script stage

### Good

> Next, Riley sets up the sequence. The timeline shows when every message goes out, with the daily limit right beside it. Riley can check the pace before approving anything, which should help keep sending at a safe level. One thing we're still adding: unsubscribing will become a third stop rule, next to the sales handoff and the suppression list.

It follows the journey, names the screen, explains why the decision helps, and names the open gap with its fix in one honest sentence.

### Avoid

> On this screen we have a header, a timeline component, a sidebar with settings, and a footer with buttons. The design follows industry best practices for sequencing and will maximize engagement.

Why: it reads out the interface, uses generic claims, invents an outcome, and hides the missing stop rule.

---

## Plain-English safety issue

### Good

**Someone who unsubscribed can still be picked for an exception**

What we found: On the lead selection screen, Erna Visser unsubscribed, but her row isn't locked. The “locked” tag is on Lotte Meijer instead, who is blocked for a different reason.

User impact: Riley's biggest worry is messaging someone who opted out by mistake, and this screen allows it.

Business impact: The law says people who unsubscribe must never be contacted again.

Recommended fix: Lock Erna's row, and don't let anyone tick people who unsubscribed.

### Avoid

Recipient-unsubscribe suppression source not bound to lock affordance (FR23, `OVERRIDE_NOT_ALLOWED_FOR_UNSUBSCRIBE`).

Why: requirement codes, error codes, and jargon replace a plain description of what the reader will see.

---

## Evidence-based issue

### Good

**Manual selection conflicts with the agreed rule**

The lead scoring screen lets Riley select extra leads by hand. Story 2.5 rules out approving single leads or overriding the score threshold, so this control conflicts with the agreed campaign-level rule.

### Avoid

Riley probably will not like selecting leads manually.

Why: this invents a reaction and does not identify the requirement.

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

**Project-wide:** The shared lead table has no error state, and stories 2.2, 2.5, and 4.2 all need one. This is recorded once.

### Avoid

Repeat “The lead table has no error state” under every story.

Why: repetition hides story-specific insight.

Never raise English copy as a project-wide issue unless the scope makes localization a design deliverable.

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

**Status: Insufficient evidence**

The Figma connector could not open the “Monitor replies” section, and no export was supplied. The story can be reviewed once the section is shared or exported.

### Avoid

**Status: Insufficient evidence.** Only the campaign-details screen exists, so the story can't be assessed.

Why: the design was reachable. A missing screen or state is a design gap, so the story is Partially supported or Needs attention.

---

## Intake question

### Good

I found the story files in `_bmad-output/epics/` and Riley's persona in `docs/personas/riley.md`. Should I use them?

Two things are still missing:

- What is the ClickUp URL for these stories? A sprint or list URL, or one task URL per story, both work.
- What is the Figma file URL, and the exact name of the page to review?

### Avoid

Please provide: persona source, user-story source, scope source, Figma file, Wireflows page, story selection, known changes, output name.

Why: it asks for things the skill already found, and it reads like a form.

---

## Fix note card

### Good

**Unsubscribing does not stop the messages**

Story: 4.3 Configure multi-step sequence

What we found: The stop rules list a sales handoff and the suppression list, but not unsubscribing.

What changed:

- Added a third stop rule: "The lead unsubscribes".
- Used the same row style as the two existing rules.

Approach: Recommended fix

Also used in: Story 4.4 Review sequence before launch

Status: Ready for review

Source component: Sequence setup (Drafts page)

### Avoid

Fixed FR27 on `sequence-config-stop-rules` (264:19130). Added row via duplicated instance, detached.

Why: the designer has to decode codes and layer names, and cannot tell what the screen now shows.

---

## Designer instruction that conflicts with the story

### Good

Conflict: You asked to make the unsubscribe rule a toggle that can be turned off. The story says unsubscribing must always stop messages. The fix follows your instruction. Check this with the product owner before approving.

### Avoid

Cannot apply instruction: violates acceptance criteria.

Why: the designer decides. Record the conflict and let them choose.

---

## Fix chat reply

### Good

I added "The lead unsubscribes" as a third stop rule on a copy of the sequence setup screen. [Open the fix in Figma](https://www.figma.com/design/FILE?node-id=900-120&m=dev)

The same screen is also used in story 4.4, so approving will change it there too.

### Avoid

Done. Applied fix 4.3-2 to node 900:120, status ready-for-review.

Why: it does not say what changed or what approving would affect.

---

## Concise story review

```text
Story 4.3 — Configure Multi-Step Sequence
Persona: Riley the Regisseur
Goal: Control timing, limits, and mandatory stop conditions.
Status: Partially supported

Why this status
Riley can set the schedule and daily limit, but unsubscribing does not stop the messages.

What works
- Riley sees when each message sends and the daily limit, before approving.
- The handoff and suppression stop rules can't be turned off.

What to fix
1. Unsubscribing does not stop the messages
   High priority. Confirmed.
   Affected requirement: Messages stop when a person unsubscribes.
   What we found: The stop rules list a sales handoff and the suppression list, but not unsubscribing.
   User impact: Riley can't confirm that people who opt out stop getting messages.
   Business impact: Messaging someone after they opt out breaks the opt-out promise.
   Recommended fix: Add "The lead unsubscribes" to the stop rules.
   [Fix now]

Safe to say now
"Riley sees the whole sending schedule and the daily limit before approving. The fixed stop rules show that a handoff or a blocked contact always ends the sequence."

Evidence and sources (collapsed)
ClickUp task, story file, PRD goals, sequence setup screen.
```
