# Design Skills

Reusable AI skills for product and UX design workflows.

## Available skills

### [Persona Flow Review](persona-flow-review/README.md)

Reviews a Figma page's story flows against the project's personas, the agreed ClickUp story scope including comments, local user stories, and the PRD. Start it with a short prompt such as "review [story names]". It finds what it can in the project, asks only for what is missing, and checks every source before reviewing. It explains every story status with user and business value, and flags only meaningful gaps.

Each issue in the review has a "Fix now" button. The fix is made on a detached copy on a "Fixed issues" Figma page. After the designer approves it, the fix is applied to the source component on the Draft page, and the story is re-reviewed.

The canvas has three views, one per purpose: **Findings** for what to fix, **Design rationale** for the decisions worth defending, and **Client meeting** for what to say. A decision gets a Figma comment only when the designer chose it, a documented need or a clear design reason backs it, the client's team could question or miss its point, no open issue touches it, and no other comment makes the same point. Each comment shows its user need, business objective, and design principle beside the wording, and flags any assumption to check before publishing. Comments never cite internal sources, so the client can review the design on their own and defend it internally. The skill also suggests Figma annotations for worthwhile elements beyond the stories. The Client meeting view has a talking point per story, and a walkthrough script in journey order, generated only when the designer asks. Nothing reaches Figma until the designer approves it. Comments are published with a short-lived personal access token the designer gives only when publishing, through the Mac Keychain or the chat.

### [Product Copy Refine](product-copy-refine/README.md)

Rewrites the interface copy in Figma so it speaks the target users' language, grounded in the project's PRD, user stories, and personas. It replaces jargon, filler, and vague labels in place without breaking the layout, never uses em dashes, and produces a before-and-after change log.

## Installation

Each skill folder is a complete Agent Skill package.

- **Cursor:** Copy the skill folder to `~/.cursor/skills/`.
- **Claude:** Download the skill folder, package it as a ZIP, then use **Customize → Skills → Add → Upload skill**.

See each skill’s README for detailed usage and platform instructions.
