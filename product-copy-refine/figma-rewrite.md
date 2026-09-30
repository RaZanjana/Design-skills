# Layout-Safe Figma Rewriting

How to change text content in Figma without changing the design. Load the `figma-use` skill before any `use_figma` call. The snippets below are building blocks; adapt them to the target file.

## What may change

Only the characters of a text layer.

Never change: font family, weight, size, line height, letter spacing, fills, text case, alignment, text resize mode, truncation, layer size, position, constraints, auto layout settings, or any parent frame.

## Workflow per frame

1. **Read:** one `use_figma` call to inventory the frame's text layers.
2. **Rewrite:** decide new copy outside Figma, using the copy guide and the audience profile.
3. **Measure and write:** one `use_figma` call that measures each rewrite on a temporary clone, writes only the rewrites that fit, and returns the results.
4. **Check:** take a screenshot of the frame and review it.

Keep calls per frame, not per layer.

## 1. Inventory

```js
const frame = await figma.getNodeByIdAsync(FRAME_ID);

function ancestorWhere(node, test) {
  for (let p = node; p && p.type !== 'PAGE'; p = p.parent) {
    if (test(p)) return p;
  }
  return null;
}

const texts = frame.findAll(n => n.type === 'TEXT');
const inventory = texts.map(node => {
  const skip = [];
  if (ancestorWhere(node, p => p.visible === false)) skip.push('hidden');
  if (ancestorWhere(node, p => p.locked === true)) skip.push('locked');
  if (node.hasMissingFont) skip.push('missing-font');
  if (node.boundVariables && node.boundVariables.characters) skip.push('variable-bound');
  if (ancestorWhere(node, p => p.type === 'COMPONENT' || p.type === 'COMPONENT_SET')) {
    skip.push('main-component');
  }

  const segments = node.characters.length
    ? node.getStyledTextSegments(['fontName', 'fontSize', 'fills', 'textDecoration', 'hyperlink'])
        .map(s => ({ start: s.start, end: s.end, text: s.characters }))
    : [];

  return {
    id: node.id,
    name: node.name,
    text: node.characters,
    segments,
    resize: node.textAutoResize,
    truncation: node.textTruncation,
    maxLines: node.maxLines,
    width: node.width,
    height: node.height,
    textProperty: node.componentPropertyReferences && node.componentPropertyReferences.characters,
    skip,
  };
});

return inventory;
```

Layers with any `skip` reason are never edited. Report `main-component` layers as flagged, with the reason "editing this changes every instance".

## 2. Length budget

Set a budget before rewriting, based on the copy role and resize mode.

| Case | Budget |
| --- | --- |
| CTA, tab, navigation, badge, label | New width must not exceed the original width |
| Fixed width, auto height | New height must not exceed the original height (same line count) |
| Fixed size box | Rewrite must fit the box height without truncation |
| Truncated or max lines | Must fit within the same number of lines without truncating |
| Hug width body or heading | Width and height must not exceed the original |

When the better copy is longer than the budget, choose the shortest wording that keeps the meaning. Do not shrink the font to make it fit.

## 3. Fonts

Load every font used in the layer before editing, including all fonts in mixed text.

```js
async function loadFonts(node) {
  const fonts = node.characters.length
    ? node.getRangeAllFontNames(0, node.characters.length)
    : [node.fontName];
  await Promise.all(fonts.map(f => figma.loadFontAsync(f)));
}
```

## 4. Applying text

### Single style

When the layer has one styled segment:

```js
node.characters = newText;
```

### Mixed styles

When the layer has more than one styled segment (a bold word, a link, a colored price), rewrite per segment. Provide one non-empty replacement per segment, in order, and replace from the last segment to the first so earlier indexes stay valid.

```js
function replaceSegments(node, segments, newTexts) {
  for (let i = segments.length - 1; i >= 0; i--) {
    const { start, end } = segments[i];
    node.insertCharacters(end, newTexts[i], 'BEFORE');
    node.deleteCharacters(start, end);
  }
}
```

Inserting at the end of a segment with `'BEFORE'` copies that segment's styling. After replacing, check that hyperlinks survived. If a link is lost, reapply it with `setRangeHyperlink` over the new range.

If a natural rewrite cannot keep the same styled segments, leave the layer unchanged and flag it with the reason "mixed styling".

### Instance text controlled by a component property

When `componentPropertyReferences.characters` is set, update the property on the owning instance instead of the text node:

```js
const key = node.componentPropertyReferences.characters;
const instance = ancestorWhere(
  node,
  p => p.type === 'INSTANCE' && p.componentProperties && key in p.componentProperties
);
if (instance) instance.setProperties({ [key]: newText });
```

Load the text node's fonts first. Other instance text layers can be edited directly; the edit becomes an instance override.

## 5. Measure before writing

Test each rewrite on a temporary clone placed on the current page, then write to the real layer only when it fits.

```js
function measuringClone(node) {
  const c = node.clone();
  figma.currentPage.appendChild(c);
  if (c.textTruncation && c.textTruncation !== 'DISABLED') c.textTruncation = 'DISABLED';
  if (c.textAutoResize === 'NONE' || c.textAutoResize === 'TRUNCATE') c.textAutoResize = 'HEIGHT';
  return c;
}

async function fits(node, apply) {
  const baseline = measuringClone(node);
  const candidate = measuringClone(node);
  try {
    apply(candidate);
    const tolerance = 0.5;
    const widthOk = node.textAutoResize !== 'WIDTH_AND_HEIGHT'
      || candidate.width <= baseline.width + tolerance;
    const heightOk = candidate.height <= Math.max(node.height, baseline.height) + tolerance;
    return widthOk && heightOk;
  } finally {
    baseline.remove();
    candidate.remove();
  }
}
```

The baseline clone measures the original text under the same settings, so fixed boxes compare like with like.

Then per layer:

1. `await loadFonts(node)`
2. If `await fits(node, n => write(n))`, run `write(node)`.
3. Otherwise try one shorter alternative the same way.
4. If neither fits, leave the layer unchanged and flag it with the reason "does not fit the layout".

`write` is the single-style, mixed-style, or component-property method from section 4.

Always remove temporary clones, even when an error occurs.

## 6. Return results

Each write call returns one record per layer:

```js
{ id, before, after, status: 'changed' | 'unchanged' | 'flagged', reason }
```

Use these records to build the change log. Record the original text for every changed layer, because the change log is the reference for undoing changes by hand.

## 7. Verify

Run a final read call over all target frames:

```js
const hits = frame.findAll(n => n.type === 'TEXT' && n.characters.includes('\u2014'))
  .map(n => ({ id: n.id, text: n.characters }));
return hits;
```

`\u2014` is the em dash. The result must be empty for every layer the skill was allowed to edit. Report any remaining hits in skipped layers (for example, main components) as flagged.

Then take a screenshot of every edited frame and check for clipping, unexpected wrapping, overlap, and truncation.
