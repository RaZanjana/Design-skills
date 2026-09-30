# Copy Guide

The built-in writing rules. Project sources (PRD, stories, personas, supplied voice notes) always override this guide.

## Core principles

1. **Clarity over cleverness.** The user should understand the text on first read.
2. **The user's words, not the system's.** Name things the way the persona names them.
3. **Front-load the point.** Put the most important word first. Users scan.
4. **One idea per string.** Split long strings into a heading and a short body.
5. **Active voice, present tense.** "We sent a code to your email", not "A code has been sent".
6. **Match the reader.** Aim for plain language (about a 7th to 9th grade reading level) unless the persona is an expert who uses precise domain terms daily.
7. **Be consistent.** One term per concept, one verb per action, across every screen.
8. **Be honest.** Never overstate speed, safety, or results. Never add a claim the PRD does not support.

## Formatting

- Sentence case for headings, buttons, labels, and navigation. Title case only for proper nouns.
- No period at the end of buttons, labels, headings, tabs, or single-sentence tooltips. Use periods in body text with more than one sentence.
- Numbers as numerals ("3 files", not "three files").
- Use "you" for the user. Use "we" for the product only when a person-like voice fits the PRD tone.
- At most one exclamation mark per flow, and only for genuine success.

## Copy types

### Headings

- Say what the screen is for, in the user's terms.
- Do: "Your orders". Don't: "Order management dashboard".

### Body text

- One or two short sentences. Cut anything the user does not need to act.
- Do: "Add a card to pay faster next time." Don't: "Please note that you can leverage our seamless payment experience by adding a card."

### Buttons and CTAs

- A verb plus an object that says exactly what happens.
- Match the label to the result: if the button saves, it says "Save".
- Do: "Save changes", "Send invite", "Pay $24". Don't: "Submit", "OK", "Continue" (when the next step is unclear), "Click here".
- Destructive actions name the action: "Delete project", not "Yes".
- Keep it short, 1 to 3 words where possible.

### Links

- Describe the destination: "View billing history", not "Learn more" or "Here".

### Form labels

- A short noun that names the field: "Email", "Phone number".
- Never rely on the placeholder as the only label.

### Placeholders

- An example of valid input, not an instruction: "name@company.com".
- Leave empty rather than repeating the label.

### Helper text

- Explain a constraint before the user fails it: "At least 8 characters, including a number."

### Errors

- Say what happened and how to fix it. No blame, no codes, no system terms.
- Do: "That card was declined. Try another card or contact your bank."
- Don't: "Error 402: Payment processing failure", "Invalid input", "You entered the wrong password".
- Field errors sit next to the field and name it: "Enter a valid email address".

### Empty states

- Explain what will appear here and offer the next action.
- Do: "No invoices yet. Invoices appear here after your first payment." with a CTA "Create invoice".
- Don't: "No data", "Nothing to show".

### Loading and progress

- Say what is happening in the user's terms: "Uploading 3 photos", not "Processing request".

### Success and toasts

- Confirm the result, and offer undo when possible: "Message deleted. Undo".
- Keep it under about 8 words.

### Confirmation dialogs

- Title asks the specific question: "Delete this project?"
- Body states the consequence: "Its 12 files will be removed for everyone. You can't undo this."
- Buttons repeat the action: "Delete project" and "Cancel".

### Permission prompts

- Lead with the user benefit: "Allow location to find stores near you."

### Onboarding

- Focus on what the user can do, not on features: "Track every delivery in one place", not "Introducing our AI-powered logistics engine".

### Navigation and tabs

- One or two words, nouns, stable across the app: "Home", "Orders", "Account".

### Tooltips

- One short sentence that adds information the label cannot hold.

## Banned list

Remove or replace these unless a project source requires them.

- **Em dashes (—).** Always. Use a comma, period, or parentheses.
- **Spaced hyphens or en dashes used as sentence dashes.** Same replacements.
- **System and internal terms:** "sync conflict", "payload", "entity", "instance", "null", "401", "timeout", "backend", "record", "object", "module", internal feature codenames.
- **Marketing filler:** "seamless", "leverage", "empower", "unlock", "revolutionary", "cutting-edge", "next-level", "effortless", "supercharge", "robust", "world-class".
- **Padding:** "Please note that", "In order to", "Simply", "Just", "Easily", "It looks like", "Oops!".
- **Vague CTAs:** "OK", "Submit", "Click here", "Yes", "No", "Proceed".
- **Blame:** "You failed to", "Invalid", "Illegal", "Wrong".
- **Unexplained abbreviations** the persona would not use.

## Replacing em dashes

| Original intent | Replace with | Example |
| --- | --- | --- |
| Short pause or continuation | Comma | "Saved, you can close this page." |
| New complete thought | Period | "Payment failed. Check your card details." |
| Aside or extra detail | Parentheses | "Add a backup email (optional)." |
| Label followed by explanation | Colon | "Tip: Drag to reorder." |

If none fits, rewrite the sentence.

## Platform notes

- **iOS:** Follow Apple conventions. "Cancel" on the leading side of sheets, "Done" to dismiss. Alerts use a short title and optional message.
- **Android:** Follow Material conventions. Dialog actions are text buttons, confirming action on the right. Snackbars hold one short line and at most one action.
- **Web:** Buttons can be slightly more descriptive. Links must make sense out of context.

## Source precedence

1. PRD and approved scope
2. User stories
3. Personas
4. This guide

When the PRD requires a term that breaks this guide (for example, a regulated legal phrase), keep the PRD term and note it in the change log.
