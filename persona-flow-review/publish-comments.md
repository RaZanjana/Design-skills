# Publish Mode

Publish the designer's approved positive comments to Figma. Later, update, remove, or check them.

The Figma MCP cannot create comments, so this mode uses the Figma REST API with a personal access token from the designer. The REST API can list, post, and delete comments. It cannot edit them.

## Rules

- **Only approved comments.** The prompt lists the comment IDs and their final text, each as a JSON string. Never publish anything else. Refuse any text that contains `figd_`, because it may hold a token.
- **One file.** Use only `REVIEW.figmaFileKey` from the attached canvas.
- **The token is a secret.** See [Get the token](#2-get-the-token).
- **Status comes from Figma.** Change a status only when a Figma answer supports it. When the result is unclear, use "needs-check". Without a listing that returned 200 and parsed, post nothing, delete nothing, and mark nothing removed.
- **No duplicates.** Check the file's comments before every post, including updates and retries.
- **Every requested entry gets an answer.** Write each comment named in the prompt back to the canvas with a fresh `updatedAt`, even when nothing changed or the run stopped early. Otherwise the canvas keeps showing "Working in a new chat".
- **Plain English** in the canvas and the reply, following `SKILL.md` section 9.

## Requests

| Request | What to do |
| --- | --- |
| Publish comments | Sections 1 to 6 |
| Update comment [ID] | Sections 1 to 3, then [Update a comment](#update-a-comment) and section 6 |
| Remove comment [ID] | Sections 1 to 3, then [Remove a comment](#remove-a-comment) and section 6 |
| Check comments | Sections 1 to 3, then [Check comments](#check-comments) and section 6 |

## 1. Read the canvas

From the attached canvas, read:

- `REVIEW.figmaFileKey` and `REVIEW.figmaFileName`
- The `COMMENTS` entries named in the prompt: target screen label and `nodeId`
- Their `COMMENT_STATE` entries

From the prompt, read each comment ID and its final text. The prompt text is the designer's approved wording. It wins over the suggestion in `COMMENTS`.

Stop and explain when the file key is missing or an ID is not in `COMMENTS`.

For Publish and Update, check every target with the Figma MCP before posting. Call `create_session` for the file, then make one read-only `use_figma` call for the batch. Load the `figma-use` skill first.

Figma refuses comments on a layer inside a component instance, whose node ID starts with `I`. Its answer, "Comment couldn't be saved. Please wait a few minutes and try again", is misleading. So the call pins each comment to the nearest layer Figma accepts, at the feature's position:

```js
const items = [/* { id: 'c-1', nodeId: '...' }, for each comment in the prompt */];
const out = [];
for (const item of items) {
  const node = await figma.getNodeByIdAsync(item.nodeId);
  if (!node) { out.push({ id: item.id, found: false }); continue; }
  let anchor = node;
  while (anchor.id.startsWith('I') && anchor.parent) anchor = anchor.parent;
  const a = anchor.absoluteBoundingBox, b = node.absoluteBoundingBox;
  const pin = anchor !== node && a && b
    ? { x: Math.round(b.x - a.x) + 16, y: Math.round(b.y - a.y) + 16 }
    : { x: 16, y: 16 };
  out.push({ id: item.id, found: true, nodeId: anchor.id, pin });
}
return out;
```

Post each comment on the returned `nodeId` and `pin`, and record that `nodeId` in `COMMENT_STATE`. When a node is not found, set that comment to `failed` with the note "The screen this comment points to no longer exists." and skip it.

Figma accepts a comment on a node that no longer exists, so this check is the only guard. Update reuses the node and position of the comment it replaces, so run the same call for the entry's `nodeId` first. When it is gone, post nothing, keep `published`, and note: "The screen this comment points to is gone. Remove the comment instead." Remove and Check skip this step: a comment stays in Figma after its screen is deleted.

## 2. Get the token

The token has its own name, `PFR_FIGMA_TOKEN`, or the Keychain item `persona-flow-review-figma`. Never use a shared name such as `FIGMA_PAT`, which may hold someone's long-lived token.

First check whether a token is already available. This never prints it:

```bash
{ set +xv; } 2>/dev/null
if [ -n "${PFR_FIGMA_TOKEN:-}" ]; then echo "token in this chat"
elif security find-generic-password -a "$USER" -s persona-flow-review-figma >/dev/null 2>&1; then echo "token in Keychain"
else echo "no token"; fi
```

When there is none, send one message and wait:

> To publish, I need a Figma personal access token.
>
> 1. In Figma, open Settings, then Security, then "Generate new token".
> 2. Choose the shortest expiry Figma offers.
> 3. Tick only "file_comments:read" and "file_comments:write".
>
> Then choose how to give it to me:
>
> - **Safer, on a Mac:** open the Terminal app, run this command, paste the token when asked, and tell me "done". It stays hidden, goes into your Mac's Keychain, and never appears in this chat.
>   `security add-generic-password -U -a "$USER" -s persona-flow-review-figma -w`
> - **Quicker:** paste the token as your next message. It will be saved in this chat's transcript on this computer, so revoke it in Figma when we're done.

When the designer declines, stop and change nothing in Figma:

- For Publish, set each requested entry that has no `figmaCommentId` and is not `needs-check` to `not-published`: "Not published. No token was given."
- Keep every other entry's status and IDs. Note: "Nothing was checked. No token was given."

When the designer pastes the token:

- Before storing it, check by reading it that it starts with `figd_` and holds only letters, digits, underscores, and hyphens. When it does not, say so without repeating it, and ask once more.
- Store it with one command: `{ set +xv; } 2>/dev/null; export PFR_FIGMA_TOKEN='[token]'`. This is the only command that ever contains it.

For both routes:

- Never repeat, quote, mask, or summarize the token in any reply.
- Never write it to a file, the canvas, the canvas's saved state, an environment file, or git.
- Never run `curl -v`, `set -x`, or anything that prints request headers. Never put the token in a `-H` argument or a URL.
- At the end of the run, run `unset PFR_FIGMA_TOKEN`, unless the designer asks to keep it for follow-ups in this chat. Each canvas button opens a new chat, so a pasted token is asked for again there. A Keychain token stays available to later buttons until the designer deletes it.

Calls go to `api.figma.com`. When a call answers `000` straight away, Cursor's sandbox may be blocking it. Run it again with network permission.

## 3. Check access

Start every command that calls Figma with this helper. It hands the token to curl on standard input, so the token never appears in the command, the process list, shell tracing, or the output. It works in zsh, bash, and sh.

```bash
{ set +xv; } 2>/dev/null
FILE_KEY='[figmaFileKey]'
LIST="${TMPDIR:-/tmp}/pfr-comments.json"
pfr_token() {
  if [ -n "${PFR_FIGMA_TOKEN:-}" ]; then printf '%s' "$PFR_FIGMA_TOKEN"
  else security find-generic-password -a "$USER" -s persona-flow-review-figma -w 2>/dev/null; fi
}
fapi() {
  local m=$1 p=$2 b=${3:-}
  if [ -n "$b" ]; then
    printf 'header = "X-Figma-Token: %s"\n' "$(pfr_token)" |
      curl -sS --max-time 30 -K - -X "$m" -w '\n%{http_code}' \
        -H 'Content-Type: application/json' --data-binary "$b" \
        "https://api.figma.com/v1$p"
  else
    printf 'header = "X-Figma-Token: %s"\n' "$(pfr_token)" |
      curl -sS --max-time 30 -K - -X "$m" -w '\n%{http_code}' \
        "https://api.figma.com/v1$p"
  fi
}
now() { date -u +%Y-%m-%dT%H:%M:%S.000Z; }
```

Check the token's shape, then list the file's comments into a temporary file:

```bash
pfr_token | grep -Eq '^figd_[A-Za-z0-9_-]+$' && echo "token format ok" || echo "token format wrong"
resp=$(fapi GET "/files/$FILE_KEY/comments")
code=${resp##*$'\n'}
printf '%s' "${resp%$'\n'*}" > "$LIST"
echo "$code"
if [ "$code" = 200 ] && jq -e 'has("comments")' "$LIST" >/dev/null 2>&1; then
  echo "listing ok: $(jq '.comments | length' "$LIST") comments"
else
  jq -r '.err // .message // "No readable answer."' "$LIST" 2>/dev/null || echo "No readable answer."
fi
```

Always read JSON with `jq` from the file or with `printf '%s'`, never with `echo`. zsh's `echo` turns `\n` inside comment text into real line breaks and breaks the JSON.

Print only the comments on the screens named in the prompt, and their replies:

```bash
jq -c --argjson nodes '["20:2","30:2"]' '
  [.comments[] | select((.client_meta.node_id? // null) as $n | $n != null and ($nodes | index($n) != null))] as $top
  | ($top | map(.id)) as $ids
  | [$top[], (.comments[] | select((.parent_id // "") as $p | $p != "" and ($ids | index($p) != null)))]
  | map({id, parent_id, node: .client_meta.node_id?, user: .user.id, resolved_at, message})' "$LIST"
```

Delete the listing with `rm -f "$LIST"` when the run ends. It holds comment text only, never the token.

What the listing tells you:

| Status | Meaning | What to do |
| --- | --- | --- |
| 200, and the listing parses | The token works and can read this file's comments | Continue |
| 401, or any answer whose error says "Invalid token" or "expired" | Figma did not accept the token. It may be mistyped, expired, or revoked. | Pasted: unset it and ask for a new one once. Keychain: ask the designer to run the Terminal command again. Then stop. |
| 403 | The token cannot read comments here. It needs "file_comments:read", and its account needs access to the file. | Stop |
| 404 | Figma cannot find the file, or the token's account cannot open it | Stop |
| 429 | Too many requests | Wait 30 seconds and try once more |
| 000 | No answer. The request timed out or the network blocked it. | Try once more with network permission, then stop |

When access fails, change nothing in Figma:

- For Publish, set each requested entry that has no `figmaCommentId` and is not `needs-check` to `not-published`: "Could not reach Figma: [reason]. Nothing changed."
- Keep every other entry's status and IDs, with the same note.

The first post confirms write permission.

## 4. Publish

Handle the approved comments in the order the prompt lists them. Set each one's text with a quoted here-document, so nothing in it is expanded:

```bash
TEXT=$(cat <<'PFR_TEXT'
[final text exactly as in the prompt]
PFR_TEXT
)
NODE_ID='[nodeId from section 1]'
PIN='{"x": 16, "y": 16}'   # the pin from section 1
```

For each one:

1. **Already published:** when `COMMENT_STATE` has a `figmaCommentId`, the listing still contains it, and the text matches `publishedText`, report "Already published" and skip it.
2. **Already in Figma:** look for a top-level comment on the same node with the same text, ignoring differences in spaces and line breaks:

```bash
existing=$(jq -r --arg n "$NODE_ID" --arg m "$TEXT" '
  def norm: gsub("\\s+"; " ") | ltrimstr(" ") | rtrimstr(" ");
  [.comments[] | select(((.parent_id // "") == "") and (.client_meta.node_id? == $n)
    and ((.message | norm) == ($m | norm)))] | first | .id // empty' "$LIST")
echo "${existing:-none}"
```

   When you find one, record it as `published` with its ID, its author's `user.id`, its text, and `resolvedAt` when it is resolved. Note: "Found in Figma. Not posted again." The check includes resolved comments, so a comment the client resolved is never posted again.

   Also skip it when another comment in `COMMENT_STATE` is already in Figma on the same node for the same `feature`. Note: "This feature already has a comment in Figma."

3. **Post it:**

```bash
payload=$(jq -nc --arg m "$TEXT" --arg n "$NODE_ID" --argjson p "$PIN" \
  '{message: $m, client_meta: {node_id: $n, node_offset: $p}}')
resp=$(fapi POST "/files/$FILE_KEY/comments" "$payload")
code=${resp##*$'\n'}; out=${resp%$'\n'*}
echo "$code"
printf '%s' "$out" | jq -c '{id, user: .user.id?, err: (if .id then null else (.err // .message) end)}' 2>/dev/null || echo "No readable answer."
```

4. **Record the result:**

| Result | Status and note |
| --- | --- |
| 200 with an `id` | `published`. Record the comment ID, the author ID, the text as `publishedText`, the node, and the file key. |
| 401 or 403 on the first post | `failed`: "The token cannot post comments. It needs file_comments:write." Stop the batch. Set every remaining requested entry to `not-published`: "Not published. The token cannot post comments." |
| 400 or 404 | `failed`, with Figma's reason in plain English. Continue with the next comment. |
| 429 | Wait 30 seconds and try once more. Then `failed`: "Figma asked us to slow down. Try again in a minute." |
| 500 or above | `needs-check`, with the text as `attemptedText`: "Figma had a problem and may have saved it. Check before trying again." Stop the batch. Set every remaining requested entry to `not-published`: "Not published. Figma had a problem. Try again later." |
| `000`: no answer or a timeout | `needs-check`, with `attemptedText`: "Figma did not answer. Check before trying again." Stop the batch, as for 500. |

Write each comment's `COMMENT_STATE` entry into the canvas right after its response, before the next post. Then an interrupted run never loses a confirmed result.

## 5. Confirm

After the batch, list the file's comments again with the same command:

- Every entry marked `published` in this run must appear with its comment ID. When one is missing, set it to `needs-check`: "Not found in Figma after posting."
- For every entry this run set to `needs-check` with `attemptedText`, run the "Already in Figma" check. When found, record it as `published` and clear `attemptedText`. When not, set `failed`: "Not in Figma. Publish it again."

## 6. Update the canvas and reply

In the attached canvas, edit only the `COMMENT_STATE` entries for the comments named in the prompt. Get each `updatedAt` from `now` just before writing. Never estimate it. Keep `figmaCommentId`, `oldCommentId`, `replyIds`, and `authorId` unless this run confirmed a change.

```text
COMMENT_STATE[commentId]
  status          published | failed | removed | needs-check | not-published
  figmaCommentId?
  oldCommentId?   an old comment an update could not delete
  replyIds?[]     corrections posted as replies
  authorId?       the Figma user who posted it
  nodeId          the node the comment is pinned to: the target, or the layer that holds it
  fileKey
  publishedText?  the latest wording Figma shows
  attemptedText?  wording sent when Figma did not confirm
  resolvedAt?     Figma's resolved_at, when someone resolved the comment in Figma
  updatedAt       ISO time in UTC, such as 2026-10-20T14:05:00.000Z
  note?           plain English. Never the token, headers, or raw API output.
```

Check the canvas TypeScript result.

Reply in plain English:

- One line per comment: Published, Already in Figma, Failed with the reason, Not published, or Needs check. Link each published comment to the node it is pinned to, without `&m=dev`, as [canvas-output.md](canvas-output.md#links-to-notes-in-figma) describes.
- "Figma opens the spot where each comment is pinned. Press C there to show comments. Figma has no link to a single comment thread. The canvas has the same links, under See it in Figma and In Figma now."
- "Figma can't edit comments. Update in Figma posts a new comment, or a reply when the client has already replied. Only the Figma account that posted a comment can remove it."
- For a pasted token: "I've cleared the token from this chat's shell. It is still in this chat's transcript, so revoke it in Figma now."
- For a Keychain token: "Your token stays in the Keychain for the next button press. When you're done, revoke it in Figma, and delete it with: `security delete-generic-password -a "$USER" -s persona-flow-review-figma`"

## Find and verify the comment

Update and Remove start here:

1. Find `figmaCommentId` in the listing. When it is missing, set `removed`: "It was removed in Figma." Stop.
2. Confirm it is a top-level comment, sits on the entry's `nodeId`, and that the entry's `fileKey` equals `REVIEW.figmaFileKey`. When anything differs, set `needs-check`: "This comment does not match the review. Nothing changed." Stop.
3. Count its replies:

```bash
jq -r --arg c "$COMMENT_ID" '[.comments[] | select(.parent_id == $c)] | length' "$LIST"
```

## Update a comment

Figma's API cannot edit a comment. After [Find and verify the comment](#find-and-verify-the-comment):

1. **Look for the new wording first.** A top-level comment on the node with the new text, or a reply to this comment with the new text, means an earlier attempt worked. Use it and skip the post.
2. **When the comment has replies:** keep it, and post the new wording as a reply.

```bash
payload=$(jq -nc --arg m "$TEXT" --arg c "$COMMENT_ID" '{message: $m, comment_id: $c}')
```

   On 200, add the reply ID to `replyIds`, set `publishedText` to the new wording, and keep `published`. Note: "Posted the new wording as a reply, because the comment already has replies."

3. **When it has no replies:** post the new wording on the same node and at the same position first, then delete the old comment. Take both from the old comment in the listing: `NODE_ID=$(jq -r --arg c "$COMMENT_ID" '.comments[] | select(.id == $c) | .client_meta.node_id' "$LIST")` and `PIN=$(jq -c --arg c "$COMMENT_ID" '.comments[] | select(.id == $c) | .client_meta.node_offset // {x: 16, y: 16}' "$LIST")`. Posting first means a failure never leaves the client with no comment. When the new comment's `user.id` differs from `authorId`, delete the new comment, keep the original, and note: "This token belongs to a different Figma account. Nothing changed."

| Result | Status and note |
| --- | --- |
| Post and delete both succeed | `published` with the new comment ID and text. Note: "Updated. Figma gave it a new comment ID." |
| Post succeeds, delete fails | `needs-check` with the new comment ID, and `oldCommentId` set. Note: "The new wording is posted, but the old comment is still in Figma." |
| Post fails with an answer | Keep `published` and the old ID. Note: "Update failed: [reason]. The original comment is unchanged." |
| Post gets no answer, or 500 or above | `needs-check`, keep the old ID, and set `attemptedText`. Note: "Figma did not confirm. The new wording may be posted. Check before trying again." |

## Remove a comment

Only the Figma account that posted a comment can delete it. After [Find and verify the comment](#find-and-verify-the-comment):

1. When the comment has replies, ask the designer once before deleting, because the client's replies may go with it. When they say no, keep `published`. Note: "Not removed. You kept it because the client replied."
2. Delete it:

```bash
resp=$(fapi DELETE "/files/$FILE_KEY/comments/$COMMENT_ID")
code=${resp##*$'\n'}; echo "$code"
```

| Result | Status and note |
| --- | --- |
| 200 | `removed` |
| 404 | `removed`, with the note "It was already gone from Figma." |
| 403 | Keep `published`. Note: "Not removed. Only the Figma account that posted it can remove it." |
| Anything else, or no answer | Keep `published`. Note: "Not removed. Figma did not confirm. Use Check Figma status." |

When `oldCommentId` is set, remove that comment the same way. Clear the field after a 200 or 404.

Never mark a comment removed unless Figma answered 200 or 404, or a listing that parsed no longer contains it.

## Check comments

List the file's comments once. For each comment named in the prompt:

- **With a `figmaCommentId`, found:** keep or set `published`. When `oldCommentId` is set and the old comment still exists, keep `needs-check`. When it is gone, clear `oldCommentId`. Compare `publishedText` with the latest reply in `replyIds` when there is one, otherwise with the comment itself. When they differ, update `publishedText` and note "Edited in Figma." Set `resolvedAt` from `resolved_at`, or clear it when the comment is open again.
- **With a `figmaCommentId`, not found:** set `removed`: "No longer in Figma."
- **Without a `figmaCommentId`:** run the "Already in Figma" check with `attemptedText`, or the prompt's text. When found, record it as `published`. When not, set `failed`: "Not in Figma. Publish it again."
