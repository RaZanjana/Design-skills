// Persona flow review canvas template.
// Copy to the workspace canvases folder as [output name].canvas.tsx.
// Replace everything between REVIEW DATA START and REVIEW DATA END, including every sample entry.
// Fix and Apply mode read these field names. Keep them.

import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Text,
  TextArea,
  useCanvasAction,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Assessment =
  | "Supported"
  | "Partially supported"
  | "Needs attention"
  | "Insufficient evidence";
type Filter = "All" | Assessment;
type Priority = "High" | "Medium" | "Low";
type Confidence = "Confirmed" | "Potential concern";
type FixAction =
  | "figma-screen"
  | "figma-new-screen"
  | "figma-rename"
  | "audit-handoff"
  | "none";
type FixStatus =
  | "open"
  | "ready-for-review"
  | "applied"
  | "rejected"
  | "needs-decision";
type FixRequest = "fix" | "revise" | "reject" | "apply";

type Ref = { label: string; url?: string; path?: string; line?: number };
type ScreenRef = { label: string; nodeId: string };

type Issue = {
  issueId: string;
  title: string;
  classification: string;
  priority: Priority;
  confidence: Confidence;
  affectedRequirement: { text: string; source: Ref };
  found: string | string[];
  userImpact: string;
  businessImpact?: string;
  recommendedFix: string;
  changeSummary?: string;
  evidence: Ref[];
  fixAction: FixAction;
  screenName: string;
  screenNodeId: string;
};

type ProjectIssue = Issue & { affectedScreens: ScreenRef[] };

type Resolved = {
  issueId: string;
  title: string;
  appliedAt: string;
  draftComponentNodeId?: string;
  fixedSectionNodeId: string;
  screenNodeId?: string;
  note?: string;
};

type StoryReview = {
  id: string;
  title: string;
  assessment: Assessment;
  reReviewSuggested?: boolean;
  persona: string;
  objective: string;
  businessGoal?: { text: string; source: Ref };
  statusReason: string;
  userValue?: string;
  businessValue?: string;
  whatWorks?: { text: string; screen?: ScreenRef }[];
  missingEvidence?: string;
  talkingPoint?: string;
  issues: Issue[];
  resolved: Resolved[];
  scopeDecisions: { text: string; source: Ref }[];
  references: Ref[];
  figmaFlow: ScreenRef;
  figmaScreens: ScreenRef[];
};

type SourceRow = {
  source: string;
  origin: "Designer" | "Discovered" | "ClickUp" | "Figma";
  status: "Read" | "Partly read" | "Not accessible" | "Not found";
  gap?: string;
};

type OpenQuestion = {
  id: string;
  storyId?: string;
  question: string;
  positions: { source: string; says: string }[];
  decideBy?: string;
};

type FixEntry = {
  status: FixStatus;
  approach: "suggested" | "designer-instruction";
  instruction?: string;
  revision: number;
  updatedAt: string;
  fixedSectionNodeId: string;
  wireflowInstanceId: string;
  mainComponentId: string;
  mainComponentName: string;
  changes: string[];
  conflict?: string;
  otherStories: string[];
  note?: string;
  appliedAt?: string;
  draftComponentNodeId?: string;
  newScreenNodeId?: string;
};

// ===== REVIEW DATA START =====

const REVIEW = {
  title: "Sample project persona flow review",
  summary:
    "Four sample stories on the “Wireflows” page of the sample Figma file. Replace this data block with the real review.",
  date: "20 October 2026",
  skillDir: "/absolute/path/to/persona-flow-review",
  figmaFileKey: "FILE_KEY",
  figmaFileName: "Sample-file",
  wireflowsPage: { name: "Wireflows", nodeId: "0:1" },
  clickupChecked: true,
};

const SOURCES: SourceRow[] = [
  { source: "ClickUp sprint: Sample sprint 4", origin: "ClickUp", status: "Read" },
  { source: "Story files", origin: "Discovered", status: "Read" },
  { source: "PRD", origin: "Discovered", status: "Read" },
  { source: "Persona: Riley, campaign operator", origin: "Designer", status: "Read" },
  {
    source: "Figma page: Wireflows",
    origin: "Figma",
    status: "Partly read",
    gap: "The “Monitor replies” section could not be opened.",
  },
];

const OPEN_QUESTIONS: OpenQuestion[] = [
  {
    id: "q1",
    storyId: "S.3",
    question: "Does Riley approve each lead, or only the whole campaign?",
    positions: [
      { source: "ClickUp task", says: "Riley approves the whole campaign once." },
      { source: "PRD", says: "Riley approves each lead before sending." },
    ],
    decideBy: "Product owner",
  },
];

const PROJECT_ISSUES: ProjectIssue[] = [
  {
    issueId: "pw-1",
    title: "A Figma section still uses an old story name",
    classification: "Mapping drift",
    priority: "Medium",
    confidence: "Confirmed",
    affectedRequirement: {
      text: "Figma sections follow the current story names and numbers.",
      source: { label: "Story files", path: "docs/stories/README.md" },
    },
    found: [
      "Figma calls the section “3.3 Delete suppression entries”.",
      "The current story 3.3 is “Pre-send suppression check”.",
    ],
    userImpact: "The team may review or build the wrong flow for story 3.3.",
    recommendedFix: "Rename the section to “3.2 Add and remove suppression entries”.",
    changeSummary: "Only the section name changes.",
    evidence: [{ label: "Story 3.3", path: "docs/stories/3-3.md" }],
    fixAction: "figma-rename",
    screenName: "Delete suppression entries section",
    screenNodeId: "10:1",
    affectedScreens: [],
  },
];

const RESOLVED_PROJECT: Resolved[] = [];

const STORIES: StoryReview[] = [
  {
    id: "S.1",
    title: "Confirm suppression before sequence",
    assessment: "Supported",
    persona: "Riley, campaign operator",
    objective: "Make sure no blocked person is in the campaign before messages are set up.",
    businessGoal: {
      text: "Never contact customers, competitors, or people who opted out.",
      source: { label: "PRD goals", path: "docs/prd.md", line: 40 },
    },
    statusReason:
      "The check lists every excluded person with the reason, and Continue stays locked until Riley confirms the list.",
    userValue:
      "Riley sees who is left out and why in one place, before any messages exist.",
    businessValue:
      "It should keep opt-outs and customer relationships safe, which the PRD names as a must.",
    talkingPoint:
      "Before Riley sets up any messages, the check shows exactly who is excluded and why. That gives Riley one clear moment to confirm the list is safe, which protects customer relationships and the opt-out promise.",
    issues: [],
    resolved: [],
    scopeDecisions: [
      {
        text: "Added unsubscribe as a fourth exclusion reason.",
        source: { label: "ClickUp comment, 12 Oct 2026", url: "https://app.clickup.com/t/SAMPLE1" },
      },
    ],
    references: [
      { label: "Persona: Riley", path: "docs/personas/riley.md" },
      { label: "Story S.1", path: "docs/stories/s-1.md" },
      { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE1" },
    ],
    figmaFlow: { label: "Confirm suppression flow", nodeId: "20:1" },
    figmaScreens: [{ label: "Suppression check", nodeId: "20:2" }],
  },
  {
    id: "S.2",
    title: "Configure the message sequence",
    assessment: "Partially supported",
    persona: "Riley, campaign operator",
    objective: "Control when messages send, the daily limit, and what stops them.",
    businessGoal: {
      text: "Send outreach at a safe pace that protects the sending domain.",
      source: { label: "PRD goals", path: "docs/prd.md", line: 44 },
    },
    statusReason:
      "Riley can set the schedule and daily limit, but one required stop rule is missing.",
    whatWorks: [
      {
        text: "Riley sees when each message sends and the daily limit, before approving.",
        screen: { label: "Sequence timeline", nodeId: "30:2" },
      },
      {
        text: "The stop rules for a sales handoff and the suppression list are shown and can't be turned off.",
        screen: { label: "Stop rules", nodeId: "30:3" },
      },
    ],
    talkingPoint:
      "Riley sees the whole sending schedule and the daily limit before approving. The fixed stop rules show that a handoff or a blocked contact always ends the sequence.",
    issues: [
      {
        issueId: "S.2-1",
        title: "Unsubscribing does not stop the messages",
        classification: "Requirement gap",
        priority: "High",
        confidence: "Confirmed",
        affectedRequirement: {
          text: "Messages to a person stop when they unsubscribe.",
          source: { label: "Story S.2", path: "docs/stories/s-2.md", line: 18 },
        },
        found:
          "The stop rules list a sales handoff and the suppression list, but not unsubscribing.",
        userImpact:
          "Riley can't confirm that people who unsubscribe stop getting messages.",
        businessImpact:
          "Messaging someone after they opt out breaks the opt-out promise the business must keep.",
        recommendedFix:
          "Add “The lead unsubscribes” as a third stop rule, in the same row style.",
        changeSummary: "The stop rules on the sequence setup screen get a third row.",
        evidence: [{ label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE2" }],
        fixAction: "figma-screen",
        screenName: "Stop rules",
        screenNodeId: "30:3",
      },
    ],
    resolved: [],
    scopeDecisions: [],
    references: [
      { label: "Persona: Riley", path: "docs/personas/riley.md" },
      { label: "Story S.2", path: "docs/stories/s-2.md" },
      { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE2" },
    ],
    figmaFlow: { label: "Sequence setup flow", nodeId: "30:1" },
    figmaScreens: [
      { label: "Sequence timeline", nodeId: "30:2" },
      { label: "Stop rules", nodeId: "30:3" },
    ],
  },
  {
    id: "S.3",
    title: "Approve and start the campaign",
    assessment: "Needs attention",
    persona: "Riley, campaign operator",
    objective: "Give a final approval before any message is sent.",
    businessGoal: {
      text: "No outreach leaves without an operator's sign-off.",
      source: { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE3" },
    },
    statusReason:
      "The story needs a final approval before sending, but the flow goes straight from review to sending. One related rule waits on a decision.",
    talkingPoint:
      "The review screen already brings the leads, messages, and schedule together on one page. The final approval step is still being designed.",
    issues: [
      {
        issueId: "S.3-1",
        title: "There is no approval step before messages send",
        classification: "Requirement gap",
        priority: "High",
        confidence: "Confirmed",
        affectedRequirement: {
          text: "Riley must approve the campaign before any message is sent.",
          source: { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE3" },
        },
        found:
          "After the review screen, the Start button begins sending at once. No approval screen appears.",
        userImpact: "Riley could start sending by accident, without a final check.",
        businessImpact:
          "Outreach could go out before anyone signs off, which the approval rule exists to prevent.",
        recommendedFix:
          "Add an approval screen after review. It sums up who gets messages, and sending starts only after Riley approves.",
        changeSummary: "A new approval screen is added after the review screen.",
        evidence: [{ label: "Story S.3", path: "docs/stories/s-3.md", line: 12 }],
        fixAction: "figma-new-screen",
        screenName: "Campaign review",
        screenNodeId: "40:2",
      },
    ],
    resolved: [],
    scopeDecisions: [],
    references: [
      { label: "Persona: Riley", path: "docs/personas/riley.md" },
      { label: "Story S.3", path: "docs/stories/s-3.md" },
      { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE3" },
    ],
    figmaFlow: { label: "Approve campaign flow", nodeId: "40:1" },
    figmaScreens: [{ label: "Campaign review", nodeId: "40:2" }],
  },
  {
    id: "S.4",
    title: "Monitor replies",
    assessment: "Insufficient evidence",
    persona: "Riley, campaign operator",
    objective: "See new replies and act on the ones that need a person.",
    statusReason:
      "The Figma section for this story could not be opened, so the flow was not reviewed.",
    missingEvidence:
      "Access to the “Monitor replies” section, or a PDF export of its screens.",
    issues: [],
    resolved: [],
    scopeDecisions: [],
    references: [
      { label: "Story S.4", path: "docs/stories/s-4.md" },
      { label: "ClickUp task", url: "https://app.clickup.com/t/SAMPLE4" },
    ],
    figmaFlow: { label: "Monitor replies flow", nodeId: "50:1" },
    figmaScreens: [],
  },
];

const FIX_STATE: Record<string, FixEntry> = {};

// ===== REVIEW DATA END =====

const STATUS_ORDER: Assessment[] = [
  "Needs attention",
  "Partially supported",
  "Supported",
  "Insufficient evidence",
];

const STATUS_HELP: Record<Assessment, string> = {
  Supported: "The user can reach the goal, and every core requirement is met.",
  "Partially supported":
    "The user can reach the goal, but an important requirement or state is missing.",
  "Needs attention":
    "A core requirement or the main goal is missing, contradicted, or blocked.",
  "Insufficient evidence": "The flow or its sources could not be reached.",
};

const FIX_STATUS_LABEL: Record<FixStatus | "in-progress", string> = {
  open: "Open",
  "in-progress": "Fix in progress",
  "ready-for-review": "Ready for review",
  applied: "Applied",
  rejected: "Rejected",
  "needs-decision": "Needs a decision",
};

function figmaUrl(nodeId: string): string {
  return `https://www.figma.com/design/${REVIEW.figmaFileKey}/${REVIEW.figmaFileName}?node-id=${nodeId.replace(":", "-")}&m=dev`;
}

function fixPrompt(request: FixRequest, issueId: string, instruction?: string): string {
  const ask = {
    fix: `Fix issue ${issueId}`,
    revise: `Revise fix for issue ${issueId}`,
    reject: `Reject fix for issue ${issueId}`,
    apply: `Apply approved fix for issue ${issueId}`,
  }[request];
  const file = request === "apply" ? "apply-fix.md" : "fix-mode.md";
  const lines = [
    `Persona flow review: ${ask}.`,
    `Read and follow ${REVIEW.skillDir}/${file}. The review canvas is attached.`,
  ];
  if (request === "fix") {
    lines.push(instruction ? "Approach: designer instruction" : "Approach: suggested fix");
  }
  if (instruction) lines.push(`Designer instruction: """${instruction}"""`);
  return lines.join("\n");
}

function auditPrompt(issue: Issue): string {
  const found = typeof issue.found === "string" ? issue.found : issue.found.join(" ");
  return [
    `Persona flow review: Start an accessibility review for issue ${issue.issueId}.`,
    `Review the screen "${issue.screenName}" at ${figmaUrl(issue.screenNodeId)}.`,
    `Concern: ${issue.title}. ${found}`,
  ].join("\n");
}

function useFixRequest(issueId: string) {
  const dispatch = useCanvasAction();
  const [sent, setSent] = useCanvasState<{ request: FixRequest; at: string } | null>(
    `fix-request:${issueId}`,
    null,
  );
  const send = (request: FixRequest, instruction?: string) => {
    dispatch({ type: "newComposerChat", userPrompt: fixPrompt(request, issueId, instruction) });
    setSent({ request, at: new Date().toISOString() });
  };
  return { sent, send };
}

function currentFixStatus(
  issueId: string,
  sent: { at: string } | null,
): FixStatus | "in-progress" {
  const entry = FIX_STATE[issueId];
  if (sent && (!entry || sent.at > entry.updatedAt)) return "in-progress";
  return entry?.status ?? "open";
}

function isOpenIssue(issue: Issue): boolean {
  return (
    issue.fixAction !== "none" &&
    (FIX_STATE[issue.issueId]?.status ?? "open") !== "applied"
  );
}

function useStatusColor(status: Assessment): string {
  const theme = useHostTheme();
  if (status === "Needs attention") return theme.category.red;
  if (status === "Partially supported") return theme.category.yellow;
  if (status === "Supported") return theme.category.green;
  return theme.text.tertiary;
}

function useFixStatusColor(status: FixStatus | "in-progress"): string {
  const theme = useHostTheme();
  if (status === "applied") return theme.category.green;
  if (status === "ready-for-review") return theme.category.yellow;
  if (status === "needs-decision") return theme.category.red;
  return theme.text.tertiary;
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: color,
        opacity: 0.85,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

function StatusLabel({ status }: { status: Assessment }) {
  const color = useStatusColor(status);
  return (
    <Row gap={6} align="center">
      <Dot color={color} />
      <Text as="span" size="small" weight="semibold" style={{ color }}>
        {status}
      </Text>
    </Row>
  );
}

function FixStatusLabel({ status }: { status: FixStatus | "in-progress" }) {
  const color = useFixStatusColor(status);
  return (
    <Row gap={6} align="center">
      <Dot color={color} />
      <Text as="span" size="small" tone="secondary">
        {FIX_STATUS_LABEL[status]}
      </Text>
    </Row>
  );
}

function Found({ found }: { found: string | string[] }) {
  if (typeof found === "string") return <Text size="small">{found}</Text>;
  return (
    <Stack gap={3}>
      {found.map((line) => (
        <Text key={line} size="small">
          • {line}
        </Text>
      ))}
    </Stack>
  );
}

function Label({ children }: { children: string }) {
  return (
    <Text size="small" weight="semibold" tone="secondary">
      {children}
    </Text>
  );
}

function Para({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Text size="small" style={{ marginTop: 2 }}>
        {text}
      </Text>
    </div>
  );
}

function RefLink({ item }: { item: Ref }) {
  const theme = useHostTheme();
  const dispatch = useCanvasAction();
  if (item.url) return <Link href={item.url}>{item.label}</Link>;
  const path = item.path;
  if (!path) return <span>{item.label}</span>;
  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: "openFile",
          path,
          ...(item.line ? { selection: { startLineNumber: item.line, startColumn: 1 } } : {}),
        })
      }
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: theme.accent.primary,
        font: "inherit",
      }}
    >
      {item.label}
    </button>
  );
}

function RefList({ items }: { items: Ref[] }) {
  const seen = new Set<string>();
  const unique = items.filter((r) => {
    const key = `${r.label}|${r.url ?? ""}|${r.path ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return (
    <span>
      {unique.map((r, i) => (
        <span key={`${r.label}-${i}`}>
          <RefLink item={r} />
          {i < unique.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

function FixPanel({ issue }: { issue: Issue }) {
  const theme = useHostTheme();
  const { send } = useFixRequest(issue.issueId);
  const [mode, setMode] = useCanvasState<"recommended" | "own">(
    `fix-mode:${issue.issueId}`,
    "recommended",
  );
  const [instruction, setInstruction] = useCanvasState<string>(
    `fix-instruction:${issue.issueId}`,
    "",
  );
  const [, setOpen] = useCanvasState<boolean>(`fix-open:${issue.issueId}`, false);
  const canStart = mode === "recommended" || instruction.trim().length > 0;
  return (
    <div
      style={{
        border: `1px solid ${theme.stroke.secondary}`,
        borderRadius: 6,
        padding: 12,
        background: theme.fill.secondary,
      }}
    >
      <Stack gap={10}>
        <Para label="Recommended fix" text={issue.recommendedFix} />
        {issue.changeSummary && <Para label="What will change" text={issue.changeSummary} />}
        <Row gap={6} wrap>
          <Pill active={mode === "recommended"} onClick={() => setMode("recommended")}>
            Use recommended fix
          </Pill>
          <Pill active={mode === "own"} onClick={() => setMode("own")}>
            Use my own instruction
          </Pill>
        </Row>
        {mode === "own" && (
          <TextArea
            value={instruction}
            onChange={setInstruction}
            placeholder="Describe the change you want…"
            rows={3}
          />
        )}
        <Row gap={8} align="center" wrap>
          <Button
            variant="primary"
            disabled={!canStart}
            onClick={() => {
              send("fix", mode === "own" ? instruction.trim() : undefined);
              setOpen(false);
            }}
          >
            Start fix
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Row>
        <Text size="small" tone="tertiary">
          This opens a new chat. The fix is made on a copy on the Fixed issues page in
          Figma. Your Wireflows and Draft pages do not change until you approve it.
        </Text>
      </Stack>
    </div>
  );
}

function FixControls({ issue }: { issue: Issue }) {
  const dispatch = useCanvasAction();
  const { sent, send } = useFixRequest(issue.issueId);
  const [open, setOpen] = useCanvasState<boolean>(`fix-open:${issue.issueId}`, false);
  const [revising, setRevising] = useCanvasState<boolean>(
    `fix-revise-open:${issue.issueId}`,
    false,
  );
  const [revision, setRevision] = useCanvasState<string>(
    `fix-revise-text:${issue.issueId}`,
    "",
  );

  if (issue.fixAction === "none") return null;

  if (issue.fixAction === "audit-handoff") {
    return (
      <Row>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: "newComposerChat", userPrompt: auditPrompt(issue) })}
        >
          Start accessibility review
        </Button>
      </Row>
    );
  }

  const status = currentFixStatus(issue.issueId, sent);
  const entry = FIX_STATE[issue.issueId];

  if (status === "in-progress") {
    return (
      <Stack gap={4}>
        <FixStatusLabel status={status} />
        <Text size="small" tone="secondary">
          Fix in progress in a new chat. This updates when the fix is ready.
        </Text>
      </Stack>
    );
  }

  if (status === "ready-for-review" && entry) {
    return (
      <Stack gap={8}>
        <FixStatusLabel status={status} />
        <Link href={figmaUrl(entry.fixedSectionNodeId)}>Open fix in Figma</Link>
        <div>
          <Label>What changed</Label>
          <div style={{ marginTop: 2 }}>
            <Found found={entry.changes} />
          </div>
        </div>
        {entry.conflict && (
          <Callout tone="warning" title="Check with the product owner">
            {entry.conflict}
          </Callout>
        )}
        {entry.otherStories.length > 0 && (
          <Text size="small" tone="secondary">
            Also changes: {entry.otherStories.join(", ")}
          </Text>
        )}
        <Row gap={8} wrap>
          <Button variant="primary" onClick={() => send("apply")}>
            Approve and apply
          </Button>
          <Button variant="secondary" onClick={() => setRevising(!revising)}>
            Request changes
          </Button>
          <Button variant="ghost" onClick={() => send("reject")}>
            Reject
          </Button>
        </Row>
        {revising && (
          <Stack gap={6}>
            <TextArea
              value={revision}
              onChange={setRevision}
              placeholder="What should change in this fix?"
              rows={3}
            />
            <Row>
              <Button
                variant="primary"
                disabled={revision.trim().length === 0}
                onClick={() => {
                  send("revise", revision.trim());
                  setRevising(false);
                }}
              >
                Send
              </Button>
            </Row>
          </Stack>
        )}
      </Stack>
    );
  }

  if (status === "applied" && entry) {
    return (
      <Stack gap={4}>
        <FixStatusLabel status={status} />
        <Text size="small" tone="secondary">
          Applied to the Draft page on {entry.appliedAt ?? entry.updatedAt}.
        </Text>
        <Row gap={12} wrap>
          {entry.draftComponentNodeId && (
            <Link href={figmaUrl(entry.draftComponentNodeId)}>Draft component</Link>
          )}
          {entry.fixedSectionNodeId && (
            <Link href={figmaUrl(entry.fixedSectionNodeId)}>Fixed issues row</Link>
          )}
        </Row>
      </Stack>
    );
  }

  return (
    <Stack gap={8}>
      {(status === "rejected" || status === "needs-decision") && (
        <Stack gap={4}>
          <FixStatusLabel status={status} />
          {entry?.note && (
            <Text size="small" tone="secondary">
              {entry.note}
            </Text>
          )}
        </Stack>
      )}
      {!open && (
        <Row>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Fix now
          </Button>
        </Row>
      )}
      {open && <FixPanel issue={issue} />}
    </Stack>
  );
}

function IssueTags({ issue }: { issue: Issue }) {
  const theme = useHostTheme();
  const priorityColor =
    issue.priority === "High"
      ? theme.category.red
      : issue.priority === "Medium"
        ? theme.category.yellow
        : theme.text.tertiary;
  return (
    <Row gap={12} align="center" wrap style={{ marginTop: 3 }}>
      <Row gap={5} align="center">
        <Dot color={priorityColor} />
        <Text as="span" size="small" tone="secondary">
          {issue.priority} priority
        </Text>
      </Row>
      <Text as="span" size="small" tone="secondary">
        {issue.confidence}
      </Text>
      <Text as="span" size="small" tone="tertiary">
        {issue.classification}
      </Text>
      <Text as="span" size="small" tone="tertiary">
        Issue {issue.issueId}
      </Text>
    </Row>
  );
}

function IssueBody({ issue, alsoOn }: { issue: Issue; alsoOn?: ScreenRef[] }) {
  const { sent } = useFixRequest(issue.issueId);
  const status = currentFixStatus(issue.issueId, sent);
  const [open] = useCanvasState<boolean>(`fix-open:${issue.issueId}`, false);
  const panelShowsFix =
    open && (status === "open" || status === "rejected" || status === "needs-decision");
  return (
    <Stack gap={8}>
      <div>
        <Text weight="semibold">{issue.title}</Text>
        <IssueTags issue={issue} />
      </div>
      <Para label="Affected requirement" text={issue.affectedRequirement.text} />
      <div>
        <Label>What we found</Label>
        <div style={{ marginTop: 2 }}>
          <Found found={issue.found} />
        </div>
      </div>
      <Para label="User impact" text={issue.userImpact} />
      {issue.businessImpact && <Para label="Business impact" text={issue.businessImpact} />}
      {!panelShowsFix && <Para label="Recommended fix" text={issue.recommendedFix} />}
      <Text size="small">
        <Text as="span" size="small" tone="tertiary">
          Screen:{" "}
        </Text>
        <Link href={figmaUrl(issue.screenNodeId)}>{issue.screenName}</Link>
      </Text>
      {alsoOn && alsoOn.length > 0 && (
        <Text size="small">
          <Text as="span" size="small" tone="tertiary">
            Also on:{" "}
          </Text>
          {alsoOn.map((s, i) => (
            <span key={s.nodeId}>
              <Link href={figmaUrl(s.nodeId)}>{s.label}</Link>
              {i < alsoOn.length - 1 ? ", " : ""}
            </span>
          ))}
        </Text>
      )}
      <Text size="small">
        <Text as="span" size="small" tone="tertiary">
          Evidence:{" "}
        </Text>
        <RefList items={[issue.affectedRequirement.source, ...issue.evidence]} />
      </Text>
      <FixControls issue={issue} />
    </Stack>
  );
}

function NumberBadge({ n }: { n: number }) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.fill.tertiary,
        color: theme.text.secondary,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {n}
    </div>
  );
}

function ResolvedItem({ item }: { item: Resolved }) {
  return (
    <Stack gap={2}>
      <Text size="small" weight="semibold">
        {item.title}
      </Text>
      {item.note && (
        <Text size="small" tone="secondary">
          {item.note}
        </Text>
      )}
      <Row gap={12} wrap>
        <Text size="small" tone="tertiary">
          Issue {item.issueId}. Applied {item.appliedAt}
        </Text>
        {item.screenNodeId && <Link href={figmaUrl(item.screenNodeId)}>Screen on Wireflows</Link>}
        {item.draftComponentNodeId && (
          <Link href={figmaUrl(item.draftComponentNodeId)}>Draft component</Link>
        )}
        <Link href={figmaUrl(item.fixedSectionNodeId)}>Fixed issues row</Link>
      </Row>
    </Stack>
  );
}

function ValueBlock({ story }: { story: StoryReview }) {
  if (story.assessment === "Supported") {
    return (
      <Grid columns={2} gap={18}>
        {story.userValue && <Para label="User value" text={story.userValue} />}
        <Para
          label="Business value"
          text={
            story.businessGoal && story.businessValue
              ? story.businessValue
              : "No business objective is documented for this story."
          }
        />
      </Grid>
    );
  }
  if (story.assessment === "Partially supported" && story.whatWorks && story.whatWorks.length > 0) {
    return (
      <section>
        <H3>What works</H3>
        <Stack gap={5} style={{ marginTop: 8 }}>
          {story.whatWorks.map((w) => (
            <Text key={w.text} size="small">
              • {w.text}
              {w.screen ? " " : ""}
              {w.screen && <Link href={figmaUrl(w.screen.nodeId)}>{w.screen.label}</Link>}
            </Text>
          ))}
        </Stack>
      </section>
    );
  }
  if (story.assessment === "Insufficient evidence" && story.missingEvidence) {
    return (
      <Callout tone="neutral" title="What we need">
        {story.missingEvidence}
      </Callout>
    );
  }
  return null;
}

function TalkingPoint({ story }: { story: StoryReview }) {
  if (!story.talkingPoint || story.assessment === "Insufficient evidence") return null;
  const title =
    story.assessment === "Supported" ? "Say this in the walkthrough" : "Safe to say now";
  return (
    <Callout tone="neutral" title={title}>
      “{story.talkingPoint}”
    </Callout>
  );
}

function EvidenceSection({ story }: { story: StoryReview }) {
  return (
    <CollapsibleSection title="Evidence and sources" defaultOpen={false}>
      <Stack gap={10}>
        {story.businessGoal && (
          <div>
            <Label>Business objective</Label>
            <Text size="small" style={{ marginTop: 2 }}>
              {story.businessGoal.text}{" "}
              <Text as="span" size="small" tone="tertiary">
                Source:{" "}
              </Text>
              <RefLink item={story.businessGoal.source} />
            </Text>
          </div>
        )}
        {story.scopeDecisions.length > 0 && (
          <div>
            <Label>ClickUp decisions used</Label>
            <Stack gap={3} style={{ marginTop: 2 }}>
              {story.scopeDecisions.map((d) => (
                <Text key={d.text} size="small">
                  • {d.text} <RefLink item={d.source} />
                </Text>
              ))}
            </Stack>
          </div>
        )}
        <div>
          <Label>References</Label>
          <Text size="small" style={{ marginTop: 2 }}>
            <RefList items={story.references} />
          </Text>
        </div>
        {story.figmaScreens.length > 0 && (
          <div>
            <Label>Screens</Label>
            <Row gap={12} wrap style={{ marginTop: 2 }}>
              {story.figmaScreens.map((s) => (
                <Link key={s.nodeId} href={figmaUrl(s.nodeId)}>
                  {s.label}
                </Link>
              ))}
            </Row>
          </div>
        )}
      </Stack>
    </CollapsibleSection>
  );
}

function StoryDetail({ story }: { story: StoryReview }) {
  return (
    <Stack gap={18}>
      <div>
        <Row justify="space-between" align="start" gap={16}>
          <div>
            <Text size="small" tone="tertiary">
              STORY {story.id}
            </Text>
            <H2 style={{ marginTop: 3 }}>{story.title}</H2>
          </div>
          <StatusLabel status={story.assessment} />
        </Row>
        <Stack gap={2} style={{ marginTop: 8 }}>
          <Text size="small" tone="secondary">
            <Text as="span" size="small" weight="semibold">
              Who:{" "}
            </Text>
            {story.persona}
          </Text>
          <Text size="small" tone="secondary">
            <Text as="span" size="small" weight="semibold">
              Their goal:{" "}
            </Text>
            {story.objective}
          </Text>
        </Stack>
        <div style={{ marginTop: 8 }}>
          <Link href={figmaUrl(story.figmaFlow.nodeId)}>Open the whole flow in Figma</Link>
        </div>
      </div>

      <section>
        <H3>Why this status</H3>
        <Text style={{ marginTop: 6 }}>{story.statusReason}</Text>
      </section>

      <ValueBlock story={story} />

      {story.issues.length > 0 && (
        <section>
          <H3>What to fix</H3>
          <Stack gap={22} style={{ marginTop: 12 }}>
            {story.issues.map((issue, index) => (
              <Grid key={issue.issueId} columns="30px 1fr" gap={10}>
                <NumberBadge n={index + 1} />
                <IssueBody issue={issue} />
              </Grid>
            ))}
          </Stack>
        </section>
      )}

      <TalkingPoint story={story} />

      {story.resolved.length > 0 && (
        <CollapsibleSection title="Resolved issues" count={story.resolved.length} defaultOpen={false}>
          <Stack gap={8}>
            {story.resolved.map((r) => (
              <ResolvedItem key={r.issueId} item={r} />
            ))}
          </Stack>
        </CollapsibleSection>
      )}

      <EvidenceSection story={story} />
    </Stack>
  );
}

function StoryListItem({
  story,
  selected,
  onSelect,
}: {
  story: StoryReview;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = useHostTheme();
  const open = story.issues.filter(isOpenIssue).length;
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        border: `1px solid ${selected ? theme.accent.primary : theme.stroke.tertiary}`,
        borderRadius: 6,
        background: selected ? theme.fill.secondary : theme.bg.editor,
        color: theme.text.primary,
        cursor: "pointer",
      }}
    >
      <Row justify="space-between" align="start" gap={8}>
        <Text as="span" weight="semibold">
          Story {story.id}
        </Text>
        <StatusLabel status={story.assessment} />
      </Row>
      <Text size="small" tone="secondary" style={{ marginTop: 3 }}>
        {story.title}
      </Text>
      <Text size="small" tone="tertiary" style={{ marginTop: 3 }}>
        {open === 0 ? "No open issues" : open === 1 ? "1 open issue" : `${open} open issues`}
        {story.reReviewSuggested ? ". Re-review suggested" : ""}
      </Text>
    </button>
  );
}

function SourcesPanel() {
  const theme = useHostTheme();
  const unreachable = SOURCES.filter(
    (s) => s.status === "Not accessible" || s.status === "Not found",
  );
  const anyGap = SOURCES.some((s) => s.status !== "Read");
  const statusColor = (status: SourceRow["status"]) =>
    status === "Read"
      ? theme.category.green
      : status === "Partly read"
        ? theme.category.yellow
        : theme.category.red;
  return (
    <Stack gap={8}>
      {!REVIEW.clickupChecked && (
        <Callout tone="warning" title="ClickUp scope was not checked">
          The local story files defined the scope for this review.
        </Callout>
      )}
      {unreachable.length > 0 && (
        <Callout tone="warning" title="Some sources could not be reached">
          {unreachable.map((s) => s.source).join(", ")}.
        </Callout>
      )}
      <CollapsibleSection title="Sources checked" count={SOURCES.length} defaultOpen={anyGap}>
        <Stack gap={6}>
          {SOURCES.map((s) => (
            <Grid key={s.source} columns="minmax(200px, 1.5fr) 100px 120px 2fr" gap={10}>
              <Text size="small">{s.source}</Text>
              <Text size="small" tone="tertiary">
                {s.origin}
              </Text>
              <Row gap={6} align="center">
                <Dot color={statusColor(s.status)} />
                <Text as="span" size="small" tone="secondary">
                  {s.status}
                </Text>
              </Row>
              <Text size="small" tone="tertiary">
                {s.gap ?? ""}
              </Text>
            </Grid>
          ))}
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}

function OpenQuestions() {
  if (OPEN_QUESTIONS.length === 0) return null;
  return (
    <section>
      <H3>Open scope questions</H3>
      <Text size="small" tone="secondary" style={{ marginTop: 4 }}>
        The sources disagree on these. They need a decision, not a design fix.
      </Text>
      <Grid columns={2} gap={18} style={{ marginTop: 10 }}>
        {OPEN_QUESTIONS.map((q) => (
          <div key={q.id}>
            <Text weight="semibold">{q.question}</Text>
            {q.storyId && (
              <Text size="small" tone="tertiary">
                Story {q.storyId}
              </Text>
            )}
            <Stack gap={3} style={{ marginTop: 6 }}>
              {q.positions.map((p) => (
                <Text key={p.source} size="small">
                  • {p.source}: {p.says}
                </Text>
              ))}
            </Stack>
            {q.decideBy && (
              <Text size="small" tone="tertiary" style={{ marginTop: 4 }}>
                Who should decide: {q.decideBy}
              </Text>
            )}
          </div>
        ))}
      </Grid>
    </section>
  );
}

function ProjectIssues() {
  if (PROJECT_ISSUES.length === 0 && RESOLVED_PROJECT.length === 0) return null;
  return (
    <Callout tone="warning" title="Issues that affect more than one story">
      <Stack gap={16} style={{ marginTop: 8 }}>
        {PROJECT_ISSUES.map((issue) => (
          <IssueBody key={issue.issueId} issue={issue} alsoOn={issue.affectedScreens} />
        ))}
        {RESOLVED_PROJECT.length > 0 && (
          <CollapsibleSection title="Resolved" count={RESOLVED_PROJECT.length} defaultOpen={false}>
            <Stack gap={8}>
              {RESOLVED_PROJECT.map((r) => (
                <ResolvedItem key={r.issueId} item={r} />
              ))}
            </Stack>
          </CollapsibleSection>
        )}
      </Stack>
    </Callout>
  );
}

export default function PersonaFlowReview() {
  const theme = useHostTheme();
  const [filter, setFilter] = useCanvasState<Filter>("pfr-filter", "All");
  const [selectedId, setSelectedId] = useCanvasState<string>("pfr-story", STORIES[0]?.id ?? "");

  const count = (s: Assessment) => STORIES.filter((x) => x.assessment === s).length;
  const filters: Filter[] = ["All", ...STATUS_ORDER.filter((s) => count(s) > 0)];
  const visibleStories =
    filter === "All" ? STORIES : STORIES.filter((s) => s.assessment === filter);
  const selectedStory =
    visibleStories.find((s) => s.id === selectedId) ?? visibleStories[0];

  const allIssues: Issue[] = [
    ...PROJECT_ISSUES,
    ...STORIES.flatMap((s) => s.issues),
  ].filter((i) => i.fixAction !== "none");
  const statusOf = (id: string) => FIX_STATE[id]?.status ?? "open";
  const openCount = allIssues.filter((i) =>
    ["open", "rejected", "needs-decision"].includes(statusOf(i.issueId)),
  ).length;
  const readyCount = allIssues.filter((i) => statusOf(i.issueId) === "ready-for-review").length;
  const appliedCount = new Set([
    ...allIssues.filter((i) => statusOf(i.issueId) === "applied").map((i) => i.issueId),
    ...RESOLVED_PROJECT.map((r) => r.issueId),
    ...STORIES.flatMap((s) => s.resolved.map((r) => r.issueId)),
  ]).size;

  return (
    <Stack
      gap={22}
      style={{ maxWidth: 1260, margin: "0 auto", padding: 24, color: theme.text.primary }}
    >
      <Row justify="space-between" align="start" gap={20} wrap>
        <div style={{ maxWidth: 640 }}>
          <H1>{REVIEW.title}</H1>
          <Text tone="secondary" style={{ marginTop: 5 }}>
            {REVIEW.summary}
          </Text>
          <Text size="small" tone="tertiary" style={{ marginTop: 8 }}>
            Reviewed {REVIEW.date} on the “{REVIEW.wireflowsPage.name}” page. Issues:{" "}
            {openCount} open, {readyCount} ready for review, {appliedCount} applied.
          </Text>
        </div>
        <Row gap={18}>
          <Stat value={String(count("Supported"))} label="Supported" tone="success" />
          <Stat
            value={String(count("Partially supported"))}
            label="Partially supported"
            tone="warning"
          />
          <Stat value={String(count("Needs attention"))} label="Needs attention" tone="danger" />
          {count("Insufficient evidence") > 0 && (
            <Stat value={String(count("Insufficient evidence"))} label="Insufficient evidence" />
          )}
        </Row>
      </Row>

      <section>
        <H3>What the labels mean</H3>
        <Grid columns={4} gap={14} style={{ marginTop: 8 }}>
          {STATUS_ORDER.map((status) => (
            <div key={status}>
              <StatusLabel status={status} />
              <Text size="small" tone="secondary" style={{ marginTop: 3 }}>
                {STATUS_HELP[status]}
              </Text>
            </div>
          ))}
        </Grid>
        <Text size="small" tone="tertiary" style={{ marginTop: 8 }}>
          These labels describe story support. They are not WCAG or design-quality scores.
          Not flagged on purpose: English copy (developers handle localization), example
          figures in mock data, typos, and visual polish. They are raised only when they
          change what the user can do or break an agreed rule.
        </Text>
      </section>

      <SourcesPanel />

      <ProjectIssues />

      <OpenQuestions />

      <Row gap={8} wrap>
        {filters.map((item) => (
          <Pill key={item} active={filter === item} onClick={() => setFilter(item)}>
            {item}
          </Pill>
        ))}
      </Row>

      {selectedStory && (
        <Grid columns="minmax(240px, 0.7fr) minmax(520px, 1.8fr)" gap={18}>
          <Stack gap={8}>
            {visibleStories.map((s) => (
              <StoryListItem
                key={s.id}
                story={s}
                selected={s.id === selectedStory.id}
                onSelect={() => setSelectedId(s.id)}
              />
            ))}
          </Stack>
          <Card size="lg" style={{ alignSelf: "start" }}>
            <CardHeader trailing={selectedStory.assessment}>Story {selectedStory.id}</CardHeader>
            <CardBody>
              <StoryDetail story={selectedStory} />
            </CardBody>
          </Card>
        </Grid>
      )}

      <Divider />
      <Text size="small" tone="tertiary">
        This review checks whether each flow helps the right person reach their goal, meets
        the agreed scope, and supports the business objective behind it. It is not user
        testing, a visual review, or an accessibility audit.
      </Text>
    </Stack>
  );
}
