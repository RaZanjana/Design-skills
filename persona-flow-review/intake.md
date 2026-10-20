# Intake

Collect and check every source before the review starts. Ask the designer only for what is missing, unclear, or conflicting.

The designer can start with a short prompt:

> Use the /persona-flow-review skill to review [story names in Figma]

## Inputs

| Input | Where it comes from | Required |
| --- | --- | --- |
| Stories to review, by their names in Figma | Designer prompt, or ask | Yes |
| Personas, as details or a file path | Designer, or discovered and confirmed | Yes |
| ClickUp URL: a sprint or list URL, or task URLs | Designer, or discovered and confirmed | Yes |
| Local user story file or folder | Designer, or discovered and confirmed | Yes |
| Figma file URL | Designer | Yes |
| Figma page name | Designer | Yes |
| PRD | Discovered only. Never ask for it. | No |
| Output name | Default `[project]-persona-flow-review` | No |

The local story files are required even when ClickUp URLs are given. They hold relationships, dependencies, and references that ClickUp may not.

Keep track of where every input came from:

- **Designer:** given in the prompt or in an answer.
- **Discovered:** found in project files and confirmed by the designer.
- **ClickUp:** read through the ClickUp connector.
- **Figma:** read through the Figma connector.
- **Missing, inaccessible, or conflicting:** not available, or sources disagree.

## Step 1. Read the prompt

Extract everything already given:

- Story names or IDs
- `figma.com` URLs and page names
- `app.clickup.com` URLs
- File and folder paths
- Pasted persona details

Never ask for these again.

If the designer says "all stories", review every story section on the Figma page that maps to a story. Confirm the list in Step 6.

## Step 2. Discover before asking

Search the open workspace before asking anything. Treat every result as a proposal to confirm, not a fact.

- **Story files:** search file names and headings for the story names and IDs. Useful patterns include `**/*story*.md`, `**/epics*.md`, and `**/stories/**`. Prefer a folder that holds one file per story.
- **Personas:** read the actor in each story, such as "As **Riley the Regisseur**". Then find the file that defines that exact persona, for example with `**/*persona*`, trigger maps, or project briefs. Accept only a file that defines that persona by name.
- **ClickUp links:** look for `app.clickup.com` links in the story files, or ClickUp sync and import files beside them. Offer them as suggestions only.

When there are several candidates, list them and ask. Never pick one silently.

Do not search outside the open workspace or use an online repository unless the designer allows it.

## Step 3. Ask only for what is missing

Send one message. Include only missing inputs and discovered inputs that need confirmation. When only one or two items are missing, ask just those. Do not send a long questionnaire.

Use the multiple-choice question tool when there are options to pick from, such as several pages, folders, or persona files. Otherwise ask in plain sentences.

Use this wording:

- **Personas:** "What are the defined user personas for these user stories? You can paste the details or give the file path."
- **ClickUp:** "What is the ClickUp URL for these stories? A sprint or list URL, or one task URL per story, both work."
- **Story files:** "Where are the user story files in the project? A file or folder path works."
- **Figma:** "What is the Figma file URL, and the exact name of the page to review?"
- **Figma page only:** "What is the exact name of the Figma page to review?"
- **Figma file only:** "What is the Figma file URL?"
- **Stories:** "Which user stories would you like me to review? Please provide the story names as they appear in Figma."
- **Confirmation:** "I found [what] at `[path]`. Should I use it?"

If the designer pastes persona details, use them as given. Label the source "Designer (pasted)". Never fill gaps with generic personas, and never treat a generic persona as equal to a defined one.

## Step 4. Check access

Check every source before saying it was reviewed. Record what was read, what was partly read, and what could not be reached.

### Figma

1. Read the file key from the URL. Create one Figma session before the first read.
2. List the file's pages. If you use `use_figma`, load the `figma-use` skill first and only read.
3. Match the page name exactly, ignoring spaces at either end.
   - No match: show the page names and ask which one to review.
   - More than one match: ask which one to review.
4. On that page, list the top-level sections. Match each requested story by story ID first and title second. Record each section node ID.
5. Review only that page. Open the Draft page only to inspect a source component, as `SKILL.md` section 5 allows.

If Figma cannot be reached, ask for a PDF or screenshots grouped by story. Do not review a design you have not seen.

### ClickUp

1. Check the ClickUp connector's status. If it needs sign-in, start its sign-in, ask the designer to finish it, and then check again.
2. Look up the connector's tool schemas before calling them. Never guess tool names. Find the tools that read a task, read a list's tasks, and read a task's comments.
3. Read the URLs:
   - **Task URL**, such as `/t/[task id]` or `/t/[team id]/[custom id]`: fetch that task.
   - **List or sprint URL**, such as `/v/li/[list id]`, or a view inside a list: fetch the list's tasks, including closed ones. Keep paging until no results remain.
   - **Any other URL**, such as a space, a folder, or a view with no list: ask for a list URL or task URLs.
4. Match each requested story to one task, by story ID in the title first and title second. If there is no match or more than one, ask.
5. For each matched task, read:
   - The description, status, and custom fields
   - Subtasks, dependencies, and linked tasks
   - **Every comment, including threaded replies.** Keep paging until no comments remain.
6. Record what could not be read, such as attachments, linked Docs, private tasks, or tasks outside the list. A sprint or list URL does not guarantee access to every task or comment.

If ClickUp still cannot be reached, offer two choices:

- Paste each task's description and comments into the chat. Label that source "ClickUp (pasted by designer)".
- Continue without ClickUp. The local story files then define scope, and the review states that ClickUp scope was not checked.

Never say ClickUp was reviewed when it was not.

### Local files

1. Read each matched story file in full, plus the epic file or index that contains it.
2. Follow its references:
   - PRD and product documents
   - UX specifications, scenarios, and journey maps
   - Decision records
   - Persona files
   - Related stories, such as "Preceded by", "Followed by", or "Depends on"
3. Read related stories only far enough to understand the handoff into and out of the reviewed flow.

### PRD discovery

Never ask the designer for the PRD. Find it in this order:

1. A link or path in the story file or its epic file.
2. A link in planning documents or an index.
3. A file named like `prd*.md` in a planning or product folder.

If several PRDs exist, use the one the epic references. Otherwise use the most recent one and record that choice.

If no PRD can be found, record "PRD not found" and continue with the other sources. Do not fill in what a PRD might say.

## Step 5. Build a scope record for each story

The scope record is the agreed scope the review checks against.

1. Start from the ClickUp task description.
2. Read the comments in date order. A comment is a **decision** when it adds, removes, changes, or clarifies behavior. Record its author and date.
3. These are not decisions:
   - Unanswered questions
   - Status changes, assignments, and reactions
   - Comments about implementation only, with no visible effect
4. Compare the result with the local story file and the PRD:
   - **ClickUp states it explicitly:** follow the latest ClickUp decision. Record what it overrides, with evidence.
   - **ClickUp is silent, and the local story or PRD states it:** use it as a supporting requirement, labelled with its source.
   - **The ClickUp description and a comment disagree, or two comments disagree, with no clear latest decision:** add an open question.
   - **Any other difference that would change a verdict and has no explicit decision:** add an open question.

Each scope record holds:

- The ClickUp task link, or a note that ClickUp was not checked
- The requirements in scope, each with its source
- The ClickUp decisions that override the local story or PRD
- Exclusions and deferred items
- Dependencies on other stories
- Open questions

## Step 6. Show the source summary

Before reviewing, post one short message in plain English with:

1. **Stories to review**, each matched to its Figma section, ClickUp task, and story file.
2. **Sources**, as a table with three columns: the source, where it came from, and its status (Read, Partly read, Not accessible, Not found).
3. **ClickUp decisions** that override the local story or PRD, one line each.
4. **Questions** that would change a verdict. Ask up to three with the multiple-choice question tool, then wait for the answers.

Put minor open questions in the review's "Open scope questions" panel instead of asking them now.

If there are no critical questions, start the review straight away.

## Do not start the review when

- A required input is still missing after asking.
- The Figma page cannot be accessed and no export was supplied.
- No requested story can be matched to a Figma section.
- ClickUp cannot be reached, and the designer has neither pasted the content nor chosen to continue without it.
- A story cannot be matched confidently across Figma, ClickUp, and the local files, and the designer has not confirmed the match.

## Never

- Claim a source was reviewed when its contents were not read.
- Invent personas, tasks, comments, requirements, page names, or story matches.
- Choose silently between candidate matches or conflicting sources.
- Ask again for information the designer already gave, or that was discovered and confirmed.
