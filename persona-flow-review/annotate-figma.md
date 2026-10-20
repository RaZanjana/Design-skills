# Annotate Mode

Add, update, or remove Figma annotations for the beyond-scope elements the designer approved in the canvas. Annotations are written with the Figma MCP `use_figma` tool, so no token is needed. Unlike comments, annotations can be edited and removed in place.

Load the `figma-use` skill before every `use_figma` call.

## Rules

- **Only approved items.** The prompt lists the item IDs and their final text. Never annotate anything else.
- **Only the "Beyond scope" category.** Never change or remove annotations in other categories, or annotations without a category.
- **Change nothing else.** No layer, text, style, or component changes.
- **One file.** Use only `REVIEW.figmaFileKey` from the attached canvas.
- **Status comes from Figma.** Mark an item annotated only after reading the annotation back from the node.
- **Plain English** in the canvas and the reply.

## Requests

| Request | Action for each listed item |
| --- | --- |
| Add annotations | Add, or update the matching annotation when one exists |
| Update annotation [ID] | Replace the matching annotation's text |
| Remove annotation [ID] | Remove the matching annotation |

## 1. Read the canvas

From the attached canvas, read:

- `REVIEW.figmaFileKey`
- The `BEYOND_SCOPE` entries named in the prompt: target screen label and `nodeId`
- Their `ANNOTATION_STATE` entries, especially `annotatedText`

The prompt text is the designer's approved wording. It wins over the suggestion in `BEYOND_SCOPE`.

Stop and explain when the file key is missing, an ID is not in `BEYOND_SCOPE`, or Figma is not accessible.

## 2. Write and verify in one call

Call `create_session` for the file, then make one `use_figma` call for the whole batch. Find the annotation to change by its category and by either the new text or the text recorded in `annotatedText`. That keeps re-runs and retries from adding a second copy.

Fill `items` from the prompt and the state:

- `nodeId`: the `nodeId` in `ANNOTATION_STATE` when there is one, because the annotation may sit on a frame inside the original target. Otherwise the target's `nodeId`.
- `text`: the approved wording from the prompt, a JSON string. For a removal, use `annotatedText`.
- `previousText`: `annotatedText` from `ANNOTATION_STATE`, when there is one.

Refuse any text that contains `figd_`, because it may hold a token.

```js
const CATEGORY = 'Beyond scope';
const items = [
  // { id: 'b-1', nodeId: '123:456', action: 'add' | 'update' | 'remove', text: '...', previousText: '...' }
];

const cats = await figma.annotations.getAnnotationCategoriesAsync();
let cat = cats.find(c => c.label === CATEGORY);
if (!cat && items.some(i => i.action !== 'remove')) {
  cat = await figma.annotations.addAnnotationCategoryAsync({ label: CATEGORY, color: 'teal' });
}

// Figma returns label HTML-escaped: "doesn't" reads back as "doesn&#39;t".
const decode = s => (s ?? '').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const norm = s => (s ?? '').replace(/\s+/g, ' ').trim();
const textOf = a => norm(a.labelMarkdown || decode(a.label));
// Figma accepts label or labelMarkdown, not both. Write labels back decoded, or they are escaped twice.
const keep = a => ({
  ...(a.labelMarkdown ? { labelMarkdown: a.labelMarkdown } : a.label ? { label: decode(a.label) } : {}),
  ...(a.properties?.length ? { properties: a.properties } : {}),
  ...(a.categoryId ? { categoryId: a.categoryId } : {}),
});

const results = [];
for (const item of items) {
  try {
    const node = await figma.getNodeByIdAsync(item.nodeId);
    if (!node) { results.push({ id: item.id, ok: false, reason: 'not-found' }); continue; }
    if (!('annotations' in node)) { results.push({ id: item.id, ok: false, reason: 'no-annotations' }); continue; }

    const texts = [item.text, item.previousText].filter(Boolean).map(norm);
    const ours = a => cat && a.categoryId === cat.id && texts.includes(textOf(a));
    const inCategory = a => cat && a.categoryId === cat.id;
    const index = node.annotations.findIndex(ours);

    if (item.action === 'update' && index < 0) {
      results.push({ id: item.id, ok: false, reason: 'no-match', nodeId: node.id });
      continue;
    }

    let list;
    if (item.action === 'remove') {
      list = node.annotations.filter(a => !ours(a)).map(keep);
    } else {
      list = node.annotations.map(keep);
      if (index >= 0) list[index] = { label: item.text, categoryId: cat.id };
      else list.push({ label: item.text, categoryId: cat.id });
    }
    node.annotations = list;

    const after = node.annotations;
    const ok = item.action === 'remove'
      ? !after.some(ours)
      : after.some(a => a.categoryId === cat.id && textOf(a) === norm(item.text));
    const othersLeft = item.action === 'remove' ? after.filter(inCategory).length : 0;
    results.push({ id: item.id, ok, existed: index >= 0, othersLeft, nodeId: node.id });
  } catch (e) {
    results.push({ id: item.id, ok: false, reason: String(e && e.message || e) });
  }
}
return results;
```

When a target cannot hold annotations, such as a section, use the first screen frame inside it and say so in the note.

## 3. Update the canvas and reply

In the attached canvas, edit only the `ANNOTATION_STATE` entries for the items named in the prompt. Write a new `updatedAt` on every one of them, even when nothing changed. The canvas shows "Working in a new chat" until it does. Get the time with `date -u +%Y-%m-%dT%H:%M:%S.000Z` just before writing. Never estimate it.

```text
ANNOTATION_STATE[itemId]
  status          annotated | removed | failed | needs-check
  nodeId          the node that holds the annotation
  annotatedText?  the text Figma now shows
  updatedAt       ISO time in UTC, such as 2026-10-20T14:05:00.000Z
  note?           plain English
```

| Result | Status and note |
| --- | --- |
| Added | `annotated` |
| Matched an existing annotation | `annotated`, with the note "Already in Figma. Updated in place." |
| Removed, or nothing to remove, with no other "Beyond scope" annotation left on the node | `removed` |
| Removed, but other "Beyond scope" annotations are still on the node (`othersLeft` above 0) | `needs-check`: "Another Beyond scope annotation is still on this screen. It may be this one, edited in Figma." |
| Update found no matching annotation (`no-match`) | `needs-check`: "The annotation was changed or removed in Figma. Check it there, then add it again if needed." |
| Node not found | `failed`: "The screen this annotation points to no longer exists." |
| The node cannot hold annotations, and no screen frame inside it can | `failed`: "This layer cannot hold an annotation." |
| The item failed with an error, or the read-back does not match | `needs-check`, with the reason in plain English |
| The whole call failed or timed out | `needs-check` for every item: "Figma did not confirm. Check before trying again." |

Check the canvas TypeScript result.

Reply in plain English:

- One line per item: Annotated, Updated, Removed, Failed with the reason, or Needs check.
- A link to each annotated screen, with `&m=dev` so it opens in Dev Mode. "The canvas has the same links, under See it in Figma and In Figma now."
- "Annotations show in Figma when annotations are turned on, and in Dev Mode. Check that your client can see them before you rely on them. When you generate the walkthrough script, it covers these elements too."
