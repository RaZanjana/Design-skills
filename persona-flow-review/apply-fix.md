# Apply Mode

Apply an approved fix from the "Fixed issues" page to the source component on the Draft page. Then check the Wireflows page, re-review the story, and update the canvas.

The designer has already approved the fix. Do not ask for confirmation again. Stop only for the blockers listed below.

Load the `figma-use` skill before every `use_figma` call.

## Rules

- **Change only what the fix changed.** The difference between the Original and Fixed copies is the full list of changes.
- **Never edit a shared component.** A button or row inside the screen is a nested instance. Change it through an override on that instance, inside the screen's main component. Never open and edit the nested component's own main component.
- **Never edit styles or variable definitions.**
- **All or nothing.** Check that every change can be applied before writing anything.
- **Plain English** in the note card, canvas, and reply.

## 1. Load the fix

```js
const NS = 'pfreview';
const page = figma.root.children.find(p => p.name === 'Fixed issues');
await page.loadAsync();
const row = page.findOne(n => n.getSharedPluginData(NS, 'issueId') === ISSUE_ID);
const manifest = JSON.parse(row.getSharedPluginData(NS, 'manifest'));
```

Stop, set the status to `needs-decision`, and explain in plain English when:

- The issue row or its manifest is missing.
- The main component no longer exists, has no Draft page, or lives in a library file.
- The fix is already applied. In this case, report it and change nothing.

## 2. Save a version

Try `await figma.saveVersionHistoryAsync('Before fix [ID]', '[issue title]')`. If it is not available, continue. The change list saved in `FIX_STATE` is the record for undoing by hand.

## 3. Build the change list

Compare each Original copy with its Fixed copy in one read call. This also picks up any edits the designer made by hand to the Fixed copy.

Match layers by their `origin` tag:

- **Changed:** both copies have the tag, but a compared property differs.
- **Added:** a layer in the Fixed copy has no tag, or repeats a tag already matched. A repeated tag means the layer is a duplicate of an existing layer.
- **Removed:** a tag in the Original copy is missing from the Fixed copy.
- **Moved:** the parent tag or position among siblings differs.

Compare these properties:

- Text: `characters`, font, size, text style, fills
- Visibility and opacity
- Fills, strokes, corner radius, and effects, including bound variables
- Auto layout: direction, gap, padding, alignment, and sizing
- Size, and position when the parent has no auto layout
- Layer name

Map each tag to the main component with its path:

```js
const nodeAt = (root, tag) => tag === ''
  ? root
  : tag.split('.').map(Number)
      .reduce((n, i) => (n && 'children' in n ? n.children[i] : null), root);
```

Check that every change can be applied:

- A change inside a nested instance must be an override: text, visibility, fills, or an instance property.
- An addition or removal inside a nested instance cannot be done with an override. Removals become hidden layers. If an addition lands inside a nested instance, stop before writing. Set `needs-decision` with the note "This fix needs a change to the [name] component, which other screens share."

## 4. Apply to the Draft page

Write all changes in one call. First resolve every tag to a node in the main component, then make the changes using those node references. Paths shift as soon as a layer is added or removed.

- **Changed:** set the property on the mapped node. Load every font before changing text. When the text is bound to a component property, use `setProperties` on the owning instance instead.
- **Added, from a component:** when `addedElements` records a source, create a new instance of that component. Use `createInstance()` for a local component or `importComponentByKeyAsync` for a library component. Insert it at the same position, then match its properties and text to the Fixed copy.
- **Added, as a duplicate:** clone the matching node in the main component, insert it at the same position, then apply the differences.
- **Added, as a plain layer:** clone the layer from the Fixed copy.
- **Removed:** remove the mapped node. Inside a nested instance, hide it instead.
- **Moved:** move the mapped node to its new parent and position.

By fix action:

- **`figma-screen`:** apply to `mainComponentId`.
- **`figma-new-screen`:**
  1. Clone the related screen's main component. The clone is a new component.
  2. Name it the way its neighbors on the Draft page are named.
  3. Place it beside the related component without overlapping anything.
  4. Apply the change list to the clone.
  5. On the Wireflows page, place an instance of it in the story section, to the right of the related screen. If that space is taken, place it below. Do not move existing screens.
  6. Connect it the way the flow already connects screens:
     - With prototype links, add a link from the trigger to the new screen.
     - With drawn arrows, duplicate an existing arrow in the section and place it between the two screens.
     - If neither works reliably, place the screen and say so on the note card and in the reply.
- **`figma-rename`:** rename the Wireflows section. Also update any heading text inside the section that repeats the old name. Edit no other layer.
- **Project-wide issues:** apply each Original and Fixed pair to its own main component.

## 5. Check the Wireflows page

For every changed layer, compare the Wireflows instance with the Fixed copy.

When they differ because the Wireflows instance has its own local edit (an override), set that one layer on the Wireflows instance to the fixed value. Change nothing else on the Wireflows page.

Then:

1. Take screenshots of the story section on the Wireflows page and of the main component on the Draft page.
2. Confirm the Wireflows screen now matches the Fixed copy.
3. For other stories that use the same component, do not re-review them. Mark them as "Re-review suggested".

## 6. Re-review this story only

Follow `SKILL.md` sections 4 to 9 for this story alone:

- Use the source paths from the canvas. Read only this story and its persona.
- Run both review passes against the updated Wireflows flow.
- Reassign the assessment based on the evidence. Do not upgrade it just because a fix was applied.
- Move the fixed issue into the story's `resolved` list.
- Give new findings new IDs that continue the story's numbering. Never reuse an ID.
- Keep the limit of three open observations.

## 7. Update Figma and the canvas

On the "Fixed issues" page:

- Set the note card status to "Applied to the Draft page on [date]". Keep both copies.

In the attached canvas:

- In `FIX_STATE`, set `status: "applied"`, `appliedAt`, `updatedAt`, and the final `changes[]`. Add `draftComponentNodeId`, and `newScreenNodeId` when a screen was added.
- Update the story: assessment, observations, `resolved`, rationale, and walkthrough notes.
- Set `reReviewSuggested: true` on each story in `otherStories`.
- Update the summary counts in the header.
- Check the canvas TypeScript result.

## 8. Reply

Keep it short and in plain English:

- What changed on the Draft page, with a link to the component.
- Whether the Wireflows flow now shows the fix, with a link to the story section.
- The story's new assessment.
- Other stories marked for re-review, when there are any.
- A link to the canvas.
