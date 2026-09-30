# Before and After Examples

Each example names the copy role, the rule, and the evidence. In real runs, the evidence cites the project's own persona, story, or PRD. The persona here is illustrative: Maya, a busy clinic receptionist who books appointments between phone calls and is not technical.

---

## Error message

**Before:** Error 409: Booking entity conflict detected.

**After:** This time was just booked. Choose another time.

**Rule:** Errors say what happened and how to fix it, with no codes or system terms.
**Evidence:** Persona, not technical, interrupted often. Story, double bookings must be prevented.

---

## Empty state

**Before:** No data available.

**After:** No appointments today. New bookings appear here.

With CTA: **Book appointment**

**Rule:** Empty states explain what will appear and offer the next action.

---

## Primary CTA

**Before:** Submit

**After:** Book appointment

**Rule:** A verb plus an object that names the result.

---

## Em dash removal

**Before:** Your changes are saved — you can close this window.

**After:** Your changes are saved. You can close this window.

**Rule:** Never use em dashes. Use a period for a new thought.

---

**Before:** Add a note — optional — for the doctor.

**After:** Add a note for the doctor (optional).

**Rule:** Never use em dashes. Use parentheses for an aside.

---

## Onboarding

**Before:** Unlock seamless, AI-powered scheduling that empowers your workflow.

**After:** Book, move, and cancel appointments in one place.

**Rule:** Describe what the user can do. Remove marketing filler.
**Evidence:** PRD, the core value is fast booking changes.

---

## Destructive confirmation

**Before:**
Title: Are you sure?
Body: This action cannot be undone.
Buttons: Yes / No

**After:**
Title: Cancel this appointment?
Body: We'll text the patient that it's cancelled. You can't undo this.
Buttons: Cancel appointment / Keep appointment

**Rule:** The title asks the specific question, the body states the consequence, and the buttons repeat the action.
**Evidence:** Story, patients are notified by SMS on cancellation.

---

## Placeholder

**Before:** Enter your email address here

**After:** name@example.com

**Rule:** Placeholders show an example of valid input. The label already names the field.

---

## Loading

**Before:** Processing request...

**After:** Sending reminder...

**Rule:** Say what is happening in the user's terms.

---

## Permission prompt

**Before:** Enable push notifications.

**After:** Turn on notifications to hear about new bookings right away.

**Rule:** Lead with the user benefit.

---

## Consistency across a flow

**Before:** The CTA says "Reschedule", the dialog title says "Modify booking", and the toast says "Appointment updated".

**After:** The CTA says "Move appointment", the dialog title says "Move this appointment?", and the toast says "Appointment moved".

**Rule:** One verb per action across every screen.
**Evidence:** Glossary, the persona says "move" for rescheduling.

---

## Leave it alone

**Before:** Save changes

**After:** Save changes (unchanged)

**Rule:** Rewrite only copy that breaks a rule. Good copy stays.

---

## Flag instead of forcing

**Before (tab label, hug width):** Appts

**Better copy:** Appointments

**Result:** Flagged, "does not fit the layout". The full word is wider than the tab allows, and no shorter clear option exists. The designer decides whether to widen the tab or use an icon with a label.

**Avoid:** Shrinking the font or letting the tab grow into its neighbour.
