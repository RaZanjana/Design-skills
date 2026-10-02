# Fix Mode

Fix one issue from a persona flow review on a safe copy of the screen. Nothing on the Wireflows page or the Draft page changes in this mode.

Load the `figma-use` skill before every `use_figma` call. The snippets below are building blocks; adapt them to the target file.

## Rules

- **No confirmation before writing.** The designer's click on "Fix issue" is the go-ahead. Write the fix straight away.
- **Write only to the "Fixed issues" page.** Use one page with that exact name. Create it if it is missing. Never create a second one.
- **No instances on the "Fixed issues" page.** Detach every copy completely, including nested components. Then no edit on this page can reach a main component.
- **Never edit a main component, style, or variable in this mode.** Reading them is fine.
- **The designer decides.** When a designer instruction conflicts with the story or the scope, follow the instruction. Record the conflict on the note card and in the approval question.
- **Plain English.** Note cards, canvas text, and chat replies follow `SKILL.md` section 9.
- **Few calls.** Aim for one call to set up the copies, one to make the fix, and one to check and lay out the page.

## Request types

The prompt from the canvas names one of these:

| Request | What to do |
| --- | --- |
| Fix issue [ID] | Sections 1 to 8 |
| Revise fix for issue [ID] | [Revise](#revise-a-fix) |
| Reject fix for issue [ID] | [Reject](#reject-a-fix) |

The prompt also names the approach:

- **Suggested fix:** apply the observation's suggested fix.
- **Designer instruction:** apply the quoted instruction instead.

## 1. Read the issue

From the attached canvas file, read:

- The issue: ID, title, classification, what we found, why it matters, suggested fix, fix action, and screen node IDs.
- The review details: Figma file key, Wireflows page, and source paths.
- The current entry for this issue in `FIX_STATE`.

Read the story and persona only for the parts this issue depends on. Do not rerun the review.

Stop and explain in plain English when:

- The issue ID is not in the canvas.
- The fix action is `none` or `audit-handoff`.
- Figma is not accessible.
- The target screen no longer exists. Set the status to `needs-decision`.

Take a screenshot of the target screen. If the issue is no longer visible, for example because the designer already fixed it, do not create a fix. Set the status to `needs-decision` with the note "This issue is no longer visible in the design."

## 2. Find the source before copying

Record where the screen comes from **before** detaching anything. Once a copy is detached, its link to the main component is gone.

```js
const NS = 'pfreview';
const screen = await figma.getNodeByIdAsync(SCREEN_ID);
const instance = screen.type === 'INSTANCE'
  ? screen
  : screen.findOne(n => n.type === 'INSTANCE' && n.parent === screen);
const main = instance ? await instance.getMainComponentAsync() : null;
const pageOf = n => { while (n && n.type !== 'PAGE') n = n.parent; return n; };

const source = {
  wireflowScreenId: screen.id,
  wireflowInstanceId: instance ? instance.id : null,
  mainComponentId: main ? main.id : null,
  mainComponentName: main ? main.name : null,
  draftPageId: main && !main.remote ? pageOf(main).id : null,
  draftPageName: main && !main.remote ? pageOf(main).name : null,
  remote: main ? main.remote : false,
};
```

Also list the other places that use the same source, so the designer knows what an approval will affect:

```js
const others = main ? (await main.getInstancesAsync())
  .filter(i => i.id !== instance.id)
  .map(i => {
    let s = i.parent;
    while (s && s.type !== 'SECTION') s = s.parent;
    return { instanceId: i.id, section: s ? s.name : null, page: pageOf(i).name };
  }) : [];
```

Turn the section names into story IDs and titles for `otherStories`.

When there is no instance, or the main component lives in a library file, still make the fix. Write on the note card: "This screen has no editable source component. Applying the fix will need a decision."

## 3. Set up the copies

Find or create the page, the story section, and the issue row:

```js
const PAGE_NAME = 'Fixed issues';
let page = figma.root.children.find(p => p.name === PAGE_NAME);
if (!page) { page = figma.createPage(); page.name = PAGE_NAME; }
await page.loadAsync();
```

Duplicate the screen instance itself, not a wrapper frame, so the copy's layer tree matches the main component. Make two copies, then detach everything inside them:

```js
function detachAll(node) {
  const root = node.type === 'INSTANCE' ? node.detachInstance() : node;
  let inner;
  while ((inner = root.findOne(n => n.type === 'INSTANCE'))) inner.detachInstance();
  return root;
}

function tagOrigins(root) {
  const walk = (n, path) => {
    n.setSharedPluginData(NS, 'origin', path.join('.'));
    if ('children' in n) n.children.forEach((c, i) => walk(c, [...path, i]));
  };
  walk(root, []);
}

function makeCopy(column, name) {
  const clone = (instance || screen).clone();
  column.appendChild(clone);
  const copy = detachAll(clone);
  copy.name = name;
  tagOrigins(copy);
  return copy;
}
```

The `origin` tag records each layer's position in the original screen. Apply mode uses it to match layers in the Original copy, the Fixed copy, and the main component, even after layers are added or moved.

After copying, confirm `page.findAll(n => n.type === 'INSTANCE').length === 0`.

## 4. Organize the page

```text
Fixed issues (page)
├── Section "Project-wide"
│   └── Issue row "Issue pw-1 — [title]"
└── Section "Story 4.3 — [story title]"
    └── Issue row "Issue 4.3-2 — [title]"
        ├── Note card
        ├── Column: label "Original" + Original copy
        └── Column: label "Fixed" + Fixed copy
```

- **Story section:** a Figma section named `Story [ID] — [title]`, or `Project-wide`.
- **Issue row:** a frame with horizontal auto layout, a gap of 80, no fill, and hug sizing. Store the issue ID on it with `setSharedPluginData(NS, 'issueId', ID)`.
- **Columns:** frames with vertical auto layout and a gap of 24. The label sits above the copy. Use Inter Semi Bold 24 for labels.
- **Labels:** "Original" and "Fixed". For a new screen, use "Original (related screen)" and "Fixed (new screen)".
- **Note card:** a 360-wide frame with vertical auto layout, 24 padding, a 12 gap, a white fill, a 1px light gray stroke, and 8 corner radius. It holds:
  - The issue title
  - Story: ID and title
  - What we found
  - What changed, as a short list
  - Approach: "Suggested fix" or "Designer instruction: [text]"
  - Conflict with the story or scope, when there is one
  - Also used in: other stories that use the same screen
  - Status
  - Source component name and page

After every change, re-lay out the page:

- Sort story sections with `Project-wide` first, then by story ID, comparing each number part, so 4.10 comes after 4.3.
- Inside a section, stack issue rows by issue number. Leave 80 padding and a 160 gap.
- Stack sections on the page at x = 0 with a 320 gap.
- Resize each section to fit its rows with `resizeWithoutConstraints`.

## 5. Store the manifest

Save one manifest on the issue row with `setSharedPluginData(NS, 'manifest', JSON.stringify(manifest))`:

```text
issueId, storyId, fixAction, approach, instruction, revision
wireflowScreenId, wireflowInstanceId
mainComponentId, mainComponentName, draftPageId, remote
originalFrameIds[], fixedFrameIds[]
addedElements[]   { fixedNodeId, sourceComponentId or sourceComponentKey, properties }
newScreen         { relatedScreenId, proposedName } when the fix adds a screen
rename            { sectionId, currentName, proposedName } for mapping drift
otherStories[]
```

## 6. Make the fix

Edit only the Fixed copy. Make the smallest change that resolves the issue.

- **Reuse what is there.** To add a row, duplicate a sibling row in the Fixed copy. Use the text styles, color styles, and variables the screen already uses.
- **New components.** When the fix needs a component the screen does not contain, insert an instance of it from the Draft page or the library. Set its properties, record its source in `addedElements`, then detach it right away.
- **Copy.** Write interface text in the approved product language, using the words the story and scope use.
- **Layout.** Keep the screen size unless the fix needs more room. Do not move unrelated layers.

By fix action:

- **`figma-screen`:** edit the Fixed copy.
- **`figma-new-screen`:** copy the most closely related screen twice. Turn the Fixed copy into the missing screen or state. Fill in `newScreen`.
- **`figma-rename`:** make no screen copies. The note card shows the current section name and the proposed name.
- **Project-wide issues:** make one Original and Fixed pair per affected screen, all in one issue row under `Project-wide`.

## 7. Check the fix

1. Take screenshots of the Original and Fixed copies.
2. Ask the four walkthrough questions from `SKILL.md` section 6 for this issue only, against the Fixed copy.
3. Confirm there are still no instances on the "Fixed issues" page.
4. Confirm the Wireflows screen and its main component were not touched.

If the fix does not resolve the issue, try once more. If it still does not, set the status to `needs-decision` and explain why on the note card.

## 8. Report and ask for approval

Update this issue's entry in the canvas `FIX_STATE`:

```text
status: "ready-for-review"
approach, instruction, revision, updatedAt (ISO time)
fixedSectionNodeId (the issue row), wireflowInstanceId, mainComponentId, mainComponentName
changes[]       plain-English list of what changed
conflict        when a designer instruction conflicts with the story or scope
otherStories[]  stories that use the same source screen
```

Edit only that entry, then check the canvas TypeScript result.

Reply in plain English with:

- One sentence on what changed.
- A link to the issue row on the "Fixed issues" page.
- The Original and Fixed screenshots.
- Any conflict, and any other stories that would change.

Then ask one multiple-choice question:

- **Approve and apply to the Draft page:** read [apply-fix.md](apply-fix.md) and continue in this chat.
- **Request changes:** ask what to change, then follow [Revise](#revise-a-fix).
- **Reject:** follow [Reject](#reject-a-fix).
- **Decide later:** stop. The designer can approve from the canvas at any time.

## Revise a fix

- Reuse the existing issue row and its Original copy.
- Apply the new instruction on top of the current Fixed copy. This keeps any edits the designer made by hand.
- Increase `revision`. Update the note card, the manifest, and `FIX_STATE`.
- Repeat sections 7 and 8.

## Reject a fix

- Set the note card status to "Rejected". Keep both copies for reference.
- Set the `FIX_STATE` status to `rejected`.
- Change nothing else.
