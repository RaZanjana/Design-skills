// Persona flow review canvas template.
// Copy to the workspace canvases folder as [output name].canvas.tsx.
// Replace everything between REVIEW DATA START and REVIEW DATA END, including every sample entry.
// Fix, Apply, Publish, Annotate, and Script mode read these field names. Keep them.

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

type CommentSuggestion = {
  id: string;
  storyId: string;
  feature: string;
  target: ScreenRef;
  text: string;
  why: string;
  userNeed?: string;
  businessGoal?: string;
  principle?: string;
  question?: string;
  checkFirst?: string;
  alsoOn?: ScreenRef[];
  evidence: Ref[];
  reviewNote?: string;
  additional?: boolean;
};

type BeyondScopeItem = {
  id: string;
  title: string;
  storyIds: string[];
  target: ScreenRef;
  whatItIs: string;
  whyBeyondScope: string;
  userValue: string;
  businessValue?: string;
  forDevelopers?: string;
  text: string;
  evidence: Ref[];
  reviewNote?: string;
};

type ScriptStage = {
  id: string;
  title: string;
  storyIds: string[];
  screen?: ScreenRef;
  text: string;
};

type Walkthrough = { version: number; generatedAt: string; stages: ScriptStage[] };

type CommentEntry = {
  status: "published" | "failed" | "removed" | "needs-check" | "not-published";
  figmaCommentId?: string;
  oldCommentId?: string;
  replyIds?: string[];
  authorId?: string;
  nodeId: string;
  fileKey: string;
  publishedText?: string;
  attemptedText?: string;
  resolvedAt?: string;
  updatedAt: string;
  note?: string;
};

type AnnotationEntry = {
  status: "annotated" | "removed" | "failed" | "needs-check";
  nodeId: string;
  annotatedText?: string;
  updatedAt: string;
  note?: string;
};

// ===== REVIEW DATA START =====

const REVIEW = {
  title: "Sample project persona flow review",
  summary:
    "Four sample stories on the “Wireflows” page of the sample Figma file. Replace this data block with the real review.",
  date: "20 October 2026",
  updatedAt: "2026-10-20T09:00:00.000Z",
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
      "Before Riley sets up any messages, the check shows exactly who is excluded and why. That gives Riley one clear moment to confirm the list is safe, which is designed to protect opt-outs and customer relationships.",
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

const COMMENTS: CommentSuggestion[] = [
  {
    id: "c-1",
    storyId: "S.1",
    feature: "Excluded people, each with a reason",
    target: { label: "Suppression check", nodeId: "20:2" },
    text: "Before Riley sets up any messages, this list shows everyone who is left out and why. Riley can confirm the campaign is safe in one place, which is designed to protect opt-outs and customer relationships.",
    why: "It serves the story's main goal and a documented rule, and a reviewer may see the separate step as extra work.",
    userNeed: "Riley must never message a customer, a competitor, or someone who opted out.",
    businessGoal: "Never contact customers, competitors, or people who opted out.",
    principle: "The check comes before any message exists, so Riley fixes a wrong list while it still costs nothing.",
    question: "Why is there a separate check before the messages?",
    evidence: [
      { label: "PRD goals", path: "docs/prd.md", line: 40 },
      { label: "Story S.1", path: "docs/stories/s-1.md" },
    ],
  },
  {
    id: "c-2",
    storyId: "S.2",
    feature: "Schedule and daily limit before approval",
    target: { label: "Sequence timeline", nodeId: "30:2" },
    text: "Riley sees when every message goes out, and the daily limit, before approving anything. The pace is easy to check at a glance, which should help keep sending within safe limits for the domain.",
    why: "It ties to a documented goal, and its value is not obvious from the screen alone.",
    userNeed: "Riley needs to control the pace of sending.",
    businessGoal: "Send outreach at a safe pace that protects the sending domain.",
    principle: "The schedule and the limit sit side by side, so Riley judges the pace in one look instead of counting messages per day.",
    evidence: [{ label: "PRD goals", path: "docs/prd.md", line: 44 }],
  },
  {
    id: "c-3",
    storyId: "S.1",
    feature: "Unsubscribed as a separate exclusion reason",
    target: { label: "Exclusion reasons", nodeId: "20:4" },
    text: "People who unsubscribed get their own reason, separate from customers and competitors. Riley can see they chose to stop hearing from the company, so they are never contacted again and the opt-out promise is kept.",
    why: "A reviewer may ask to merge unsubscribed people into another reason. This explains why they stay separate.",
    userNeed: "Riley must never message someone who opted out.",
    question: "Why are unsubscribed people listed as a separate reason?",
    evidence: [{ label: "ClickUp comment, 12 Oct 2026", url: "https://app.clickup.com/t/SAMPLE1" }],
    additional: true,
  },
  {
    id: "c-4",
    storyId: "S.2",
    feature: "Daily limit per mailbox",
    target: { label: "Daily limit setting", nodeId: "30:5" },
    text: "The daily limit counts messages per sending mailbox, not per campaign. Campaigns that share a mailbox share its limit, so starting another campaign never pushes a mailbox past a safe pace.",
    why: "A reviewer may expect a limit per campaign and ask to change it.",
    userNeed: "Riley needs to control the pace of sending.",
    question: "Why is the limit set per mailbox and not per campaign?",
    checkFirst: "This assumes the client sends more than one campaign from the same mailbox.",
    alsoOn: [{ label: "Campaign settings", nodeId: "30:6" }],
    evidence: [{ label: "PRD goals", path: "docs/prd.md", line: 44 }],
    additional: true,
  },
];

const BEYOND_SCOPE: BeyondScopeItem[] = [
  {
    id: "b-1",
    title: "Download the list of excluded people",
    storyIds: ["S.1"],
    target: { label: "Suppression check", nodeId: "20:3" },
    whatItIs: "A Download list button under the excluded people saves the list as a spreadsheet.",
    whyBeyondScope: "The story asks to show the excluded people. It does not ask to export them.",
    userValue:
      "The persona file says Riley checks lists with account managers before a campaign. The download makes that easy.",
    forDevelopers: "The file holds the same columns as the on-screen list: name, company, and reason.",
    text: "Beyond the story: Riley can download the list of excluded people to check it with account managers before launch. The story does not ask for this, so please confirm it stays.",
    evidence: [{ label: "Persona: Riley", path: "docs/personas/riley.md", line: 22 }],
  },
];

// A review run writes { version: 0, generatedAt: "", stages: [] }. Stages exist only after the designer asks for a script.
const WALKTHROUGH: Walkthrough = {
  version: 1,
  generatedAt: "2026-10-20T09:30:00.000Z",
  stages: [
    {
      id: "st-1",
      title: "Check who is left out",
      storyIds: ["S.1"],
      screen: { label: "Suppression check", nodeId: "20:2" },
      text: "Riley's first job is making sure nobody who should be left out gets a message. Before any messages exist, this screen lists everyone excluded and the reason. Riley confirms the list once, and only then moves on. That's designed to protect opt-outs and customer relationships. We also added a download for the excluded list, so Riley can check it with account managers. That's outside the agreed scope, so we'd like your OK to keep it.",
    },
    {
      id: "st-2",
      title: "Set the pace",
      storyIds: ["S.2"],
      screen: { label: "Sequence timeline", nodeId: "30:2" },
      text: "Next, Riley sets up the sequence. The timeline shows when every message goes out, with the daily limit right beside it. Riley can check the pace before approving anything, which should help keep sending at a safe level. One thing we're still adding: unsubscribing will become a third stop rule, next to the sales handoff and the suppression list.",
    },
    {
      id: "st-3",
      title: "Approve and start",
      storyIds: ["S.3"],
      screen: { label: "Campaign review", nodeId: "40:2" },
      text: "Then Riley reviews the campaign. The review screen brings the leads, messages, and schedule together on one page. The final approval step isn't in the design yet. We're adding it now, so nothing sends until Riley signs off. We'll walk through reply monitoring once we can review it.",
    },
  ],
};

const COMMENT_STATE: Record<string, CommentEntry> = {};

const ANNOTATION_STATE: Record<string, AnnotationEntry> = {};

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
  return `https://www.figma.com/design/${REVIEW.figmaFileKey}/${REVIEW.figmaFileName}?node-id=${encodeURIComponent(nodeId.replace(/:/g, "-"))}&m=dev`;
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

function RationaleLink({ story, onOpen }: { story: StoryReview; onOpen: () => void }) {
  const comments = COMMENTS.filter((c) => c.storyId === story.id && !c.additional).length;
  const optional = COMMENTS.filter((c) => c.storyId === story.id && c.additional).length;
  const beyond = BEYOND_SCOPE.filter((b) => b.storyIds.includes(story.id)).length;
  const parts = [
    comments > 0 && `${comments} ${comments === 1 ? "decision" : "decisions"} worth a comment`,
    optional > 0 && `${optional} optional`,
    beyond > 0 && `${beyond} beyond the story`,
  ].filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <Row gap={10} align="center" wrap>
      <Text size="small" tone="secondary">
        Design rationale: {parts.join(", ")}.
      </Text>
      <Button variant="ghost" onClick={onOpen}>
        Open in Design rationale
      </Button>
    </Row>
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

function StoryDetail({
  story,
  onOpenRationale,
}: {
  story: StoryReview;
  onOpenRationale: () => void;
}) {
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

      {story.resolved.length > 0 && (
        <CollapsibleSection title="Resolved issues" count={story.resolved.length} defaultOpen={false}>
          <Stack gap={8}>
            {story.resolved.map((r) => (
              <ResolvedItem key={r.issueId} item={r} />
            ))}
          </Stack>
        </CollapsibleSection>
      )}

      <RationaleLink story={story} onOpen={onOpenRationale} />

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

const UNREACHED_SOURCES = SOURCES.filter(
  (s) => s.status === "Not accessible" || s.status === "Not found",
);

function SourceWarning() {
  const lines: string[] = [];
  if (!REVIEW.clickupChecked) {
    lines.push("ClickUp scope was not checked. The local story files defined the scope.");
  }
  if (UNREACHED_SOURCES.length > 0) {
    lines.push(`Could not be reached: ${UNREACHED_SOURCES.map((s) => s.source).join(", ")}.`);
  }
  if (lines.length === 0) return null;
  return (
    <Callout tone="warning" title="Not every source was checked">
      <Stack gap={2}>
        {lines.map((line) => (
          <Text key={line} size="small">
            {line}
          </Text>
        ))}
      </Stack>
    </Callout>
  );
}

function SourcesPanel() {
  const theme = useHostTheme();
  const statusColor = (status: SourceRow["status"]) =>
    status === "Read"
      ? theme.category.green
      : status === "Partly read"
        ? theme.category.yellow
        : theme.category.red;
  return (
    <CollapsibleSection title="Sources checked" count={SOURCES.length} defaultOpen={false}>
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
  );
}

function StatusGuide() {
  return (
    <CollapsibleSection title="What the labels mean" defaultOpen={false}>
      <Grid columns={4} gap={14}>
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
        These labels describe story support. They are not WCAG or design-quality scores. Not
        flagged on purpose: English copy (developers handle localization), example figures in
        mock data, typos, and visual polish. They are raised only when they change what the user
        can do or break an agreed rule.
      </Text>
    </CollapsibleSection>
  );
}

type ReadyFix = { issue: Issue; storyId?: string };

function readyFixes(): ReadyFix[] {
  const ready = (i: Issue) => FIX_STATE[i.issueId]?.status === "ready-for-review";
  return [
    ...PROJECT_ISSUES.filter(ready).map((issue) => ({ issue })),
    ...STORIES.flatMap((s) => s.issues.filter(ready).map((issue) => ({ issue, storyId: s.id }))),
  ];
}

function DecisionsNeeded({ onOpenStory }: { onOpenStory: (id: string) => void }) {
  const fixes = readyFixes();
  if (fixes.length === 0 && OPEN_QUESTIONS.length === 0) return null;
  return (
    <Card>
      <CardHeader>Needs your decision</CardHeader>
      <CardBody>
        <Stack gap={16}>
          {fixes.length > 0 && (
            <Stack gap={6}>
              <Label>{`Fixes ready for your review (${fixes.length})`}</Label>
              {fixes.map(({ issue, storyId }) => (
                <Row key={issue.issueId} justify="space-between" align="center" gap={12} wrap>
                  <Text size="small">
                    {issue.title}
                    <Text as="span" size="small" tone="tertiary">
                      {" "}
                      {storyId ? `Story ${storyId}` : "Project-wide, shown below"}
                    </Text>
                  </Text>
                  {storyId && (
                    <Button variant="ghost" onClick={() => onOpenStory(storyId)}>
                      Open story
                    </Button>
                  )}
                </Row>
              ))}
            </Stack>
          )}
          {OPEN_QUESTIONS.length > 0 && (
            <Stack gap={8}>
              <div>
                <Label>{`Scope questions to settle (${OPEN_QUESTIONS.length})`}</Label>
                <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
                  The sources disagree on these. They need a decision, not a design fix.
                </Text>
              </div>
              <Grid columns={2} gap={18}>
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
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
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

type NoteDecision = "suggested" | "approved" | "excluded";
type NoteRequest = { action: string; at: string; stopped?: boolean };
type ScriptEdits = { version: number; stages: Record<string, string> };
type NoteTone = "green" | "yellow" | "red" | "gray" | "accent";
type ShownStatus = { label: string; tone: NoteTone; note?: string };

const COMMENT_STATUS: Record<CommentEntry["status"], [string, NoteTone]> = {
  published: ["Published", "green"],
  "needs-check": ["Needs check", "yellow"],
  failed: ["Failed", "red"],
  "not-published": ["Not published", "gray"],
  removed: ["Removed", "gray"],
};

const ANNOTATION_STATUS: Record<AnnotationEntry["status"], [string, NoteTone]> = {
  annotated: ["Annotated", "green"],
  "needs-check": ["Needs check", "yellow"],
  failed: ["Failed", "red"],
  removed: ["Removed", "gray"],
};

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isAfter(a: string, b: string): boolean {
  return Date.parse(a) > Date.parse(b);
}

function canSend(text: string): boolean {
  return text.trim() !== "" && !/figd_/i.test(text);
}

function inFigma(entry?: CommentEntry): boolean {
  return !!entry?.figmaCommentId && entry.status !== "removed";
}

type FigmaLink = { href: string; label: string; hint: string };

function figmaNodeLink(nodeId: string, fileKey: string, devMode: boolean): string {
  const name = fileKey === REVIEW.figmaFileKey ? `/${REVIEW.figmaFileName}` : "";
  const node = encodeURIComponent(nodeId.replace(/:/g, "-"));
  return `https://www.figma.com/design/${fileKey}${name}?node-id=${node}${devMode ? "&m=dev" : ""}`;
}

function commentLink(entry?: CommentEntry): FigmaLink | undefined {
  if (!entry?.figmaCommentId || !entry.nodeId) return undefined;
  const href = figmaNodeLink(entry.nodeId, entry.fileKey || REVIEW.figmaFileKey, false);
  if (entry.status === "published") {
    const hints = ["Opens the spot where it is pinned. Press C in Figma to show comments."];
    if (entry.resolvedAt) hints.push("It is resolved, so turn on resolved comments in the comments panel.");
    if (entry.replyIds?.length) hints.push("The latest wording is a reply in the same thread.");
    return { href, label: "See it in Figma", hint: hints.join(" ") };
  }
  if (entry.status === "needs-check") {
    return {
      href,
      label: "Check in Figma",
      hint: "Figma has not confirmed this comment. Look where it should be pinned, or use Check Figma status.",
    };
  }
  return undefined;
}

function annotationLink(entry?: AnnotationEntry): FigmaLink | undefined {
  if (!entry?.nodeId) return undefined;
  const href = figmaNodeLink(entry.nodeId, REVIEW.figmaFileKey, true);
  if (entry.status === "annotated") {
    return { href, label: "See it in Figma", hint: "Opens the screen in Dev Mode, where annotations show." };
  }
  if (entry.status === "needs-check") {
    return {
      href,
      label: "Check in Figma",
      hint: "Figma has not confirmed this annotation. Look at the screen in Dev Mode.",
    };
  }
  return undefined;
}

function notePrompt(request: string, file: string, lines: string[]): string {
  return [
    `Persona flow review: ${request}`,
    `Read and follow ${REVIEW.skillDir}/${file}. The review canvas is attached.`,
    `Figma file: ${REVIEW.figmaFileName} (${REVIEW.figmaFileKey})`,
    ...lines,
  ].join("\n");
}

function noteLine(id: string, target: ScreenRef, text?: string): string {
  const base = `- ${id}, on "${target.label}" (node ${target.nodeId})`;
  return text === undefined ? base : `${base}: ${JSON.stringify(text)}`;
}

function scriptPrompt(kind: "Generate" | "Regenerate"): string {
  return [
    `Persona flow review: ${kind} walkthrough script.`,
    `Read and follow ${REVIEW.skillDir}/SKILL.md section 10 and ${REVIEW.skillDir}/canvas-output.md, "Generate the script". The review canvas is attached.`,
  ].join("\n");
}

function stageFlows(s: ScriptStage): ScreenRef[] {
  const flows: ScreenRef[] = [];
  for (const id of s.storyIds) {
    const flow = STORIES.find((x) => x.id === id)?.figmaFlow;
    if (flow && !flows.some((f) => f.nodeId === flow.nodeId)) flows.push(flow);
  }
  return flows;
}

function storyList(ids: string[]): string {
  if (ids.length === 0) return "";
  if (ids.length === 1) return `Story ${ids[0]}`;
  return `Stories ${ids.slice(0, -1).join(", ")} and ${ids[ids.length - 1]}`;
}

function stageReference(s: ScriptStage): string {
  const figma = stageFlows(s)
    .map((f) => `${f.label} (${figmaUrl(f.nodeId)})`)
    .join(", ");
  return [storyList(s.storyIds), figma && `Figma: ${figma}`].filter(Boolean).join(". ");
}

function shownStatus(
  entry: { status: string; note?: string; resolvedAt?: string } | undefined,
  labels: Record<string, [string, NoteTone]>,
  decision: NoteDecision,
  busy: boolean,
  stopped: boolean,
): ShownStatus {
  if (busy) return { label: "Working in a new chat", tone: "gray" };
  if (stopped) {
    return {
      label: "Needs check",
      tone: "yellow",
      note: "The chat closed before it reported back. Check the status in Figma before trying again.",
    };
  }
  if (entry?.status === "published" && entry.resolvedAt) {
    return {
      label: "Resolved in Figma",
      tone: "green",
      note: entry.note ?? "Someone resolved this comment in Figma. It is still there, marked resolved.",
    };
  }
  if (entry) {
    const [label, tone] = labels[entry.status] ?? ["Needs check", "yellow"];
    return { label, tone, note: entry.note };
  }
  if (decision === "approved") return { label: "Approved", tone: "accent" };
  if (decision === "excluded") return { label: "Excluded", tone: "gray" };
  return { label: "Suggested", tone: "gray" };
}

function NoteStatusLabel({ status }: { status: ShownStatus }) {
  const theme = useHostTheme();
  const color = {
    green: theme.category.green,
    yellow: theme.category.yellow,
    red: theme.category.red,
    gray: theme.text.tertiary,
    accent: theme.accent.primary,
  }[status.tone];
  return (
    <Row gap={6} align="center" style={{ flexShrink: 0 }}>
      <Dot color={color} />
      <Text as="span" size="small" tone="secondary">
        {status.label}
      </Text>
    </Row>
  );
}

type UiNode = ReturnType<typeof Stack>;

type NoteRowProps = {
  id: string;
  title: string;
  meta: string;
  target: ScreenRef;
  textLabel: string;
  text: string;
  edited: boolean;
  decision: NoteDecision;
  status: ShownStatus;
  live: boolean;
  liveText?: string;
  busy: boolean;
  figmaLink?: FigmaLink;
  reviewNote?: string;
  question?: string;
  body?: UiNode;
  reasons?: UiNode;
  moreLabel: string;
  more: UiNode;
  onMoveBack?: () => void;
  onDecide: (decision: NoteDecision) => void;
  onText: (text: string | null) => void;
  onUpdate: () => void;
  onRemove: () => void;
  onCancel: () => void;
};

function NoteRow(p: NoteRowProps) {
  const theme = useHostTheme();
  const [editing, setEditing] = useCanvasState<boolean>(`note-edit:${p.id}`, false);
  const [more, setMore] = useCanvasState<boolean>(`note-more:${p.id}`, false);
  const words = wordCount(p.text);
  const sendable = canSend(p.text);
  const changed = p.live && sendable && p.text.trim() !== (p.liveText ?? "").trim();
  return (
    <div style={{ padding: "14px 0", borderTop: `1px solid ${theme.stroke.tertiary}` }}>
      <Stack gap={8}>
        <Row justify="space-between" align="start" gap={12}>
          <div>
            <Text weight="semibold">{p.title}</Text>
            <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
              {p.meta ? `${p.meta}. ` : ""}On: <Link href={figmaUrl(p.target.nodeId)}>{p.target.label}</Link>
            </Text>
          </div>
          <NoteStatusLabel status={p.status} />
        </Row>
        {p.figmaLink && (
          <Text size="small" tone="secondary">
            <Link href={p.figmaLink.href}>{p.figmaLink.label}</Link>
            <Text as="span" size="small" tone="tertiary">
              {" "}
              {p.figmaLink.hint}
            </Text>
          </Text>
        )}
        {p.status.note && (
          <Text size="small" tone="secondary">
            {p.status.note}
          </Text>
        )}
        {p.question && (
          <Text size="small" tone="secondary">
            <Text as="span" size="small" tone="tertiary">
              Answers:{" "}
            </Text>
            {p.question}
          </Text>
        )}
        {p.reviewNote && <Callout tone="warning">{p.reviewNote}</Callout>}
        {!sendable && (
          <Callout tone="warning">
            {p.text.trim() === ""
              ? "The wording is empty, so it cannot be sent to Figma."
              : "The wording looks like it contains a Figma token. Remove it before sending this to Figma."}
          </Callout>
        )}
        {p.body}
        <div>
          <Label>{p.textLabel}</Label>
          {editing ? (
            <Stack gap={6} style={{ marginTop: 4 }}>
              <TextArea value={p.text} onChange={(value) => p.onText(value)} rows={3} />
              <Row gap={10} align="center" wrap>
                <Text
                  size="small"
                  tone="tertiary"
                  style={words > 45 ? { color: theme.category.yellow } : undefined}
                >
                  {words} words{words > 45 ? ". Over 45 words. Consider shortening it." : ""}
                </Text>
                {p.edited && (
                  <Button variant="ghost" onClick={() => p.onText(null)}>
                    Use suggested wording
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setEditing(false)}>
                  Done
                </Button>
              </Row>
            </Stack>
          ) : (
            <Text size="small" style={{ marginTop: 2 }}>
              “{p.text}”
              {p.edited ? (
                <Text as="span" size="small" tone="tertiary">
                  {" "}
                  Edited
                </Text>
              ) : null}
            </Text>
          )}
        </div>
        {p.reasons}
        <Row gap={8} align="center" wrap>
          {!p.live && !p.busy && (
            <Pill active={p.decision === "approved"} onClick={() => p.onDecide("approved")}>
              Approve
            </Pill>
          )}
          {!p.live && !p.busy && (
            <Pill active={p.decision === "excluded"} onClick={() => p.onDecide("excluded")}>
              Exclude
            </Pill>
          )}
          {!editing && !p.busy && (
            <Button variant="ghost" onClick={() => setEditing(true)}>
              Edit wording
            </Button>
          )}
          {p.live && !p.busy && (
            <Button variant="secondary" disabled={!changed} onClick={p.onUpdate}>
              Update in Figma
            </Button>
          )}
          {p.live && !p.busy && (
            <Button variant="ghost" onClick={p.onRemove}>
              Remove from Figma
            </Button>
          )}
          {p.busy && (
            <Button variant="ghost" onClick={p.onCancel}>
              Stop waiting
            </Button>
          )}
          {p.onMoveBack && (
            <Button variant="ghost" onClick={p.onMoveBack}>
              Move back
            </Button>
          )}
          <Button variant="ghost" onClick={() => setMore(!more)}>
            {more ? "Hide details" : p.moreLabel}
          </Button>
        </Row>
        {more && p.more}
      </Stack>
    </div>
  );
}

type NotesState = {
  decisionOf: (id: string) => NoteDecision;
  textOf: (id: string, suggested: string) => string;
  isEdited: (id: string) => boolean;
  isBusy: (id: string, updatedAt?: string) => boolean;
  isStopped: (id: string, updatedAt?: string) => boolean;
  setDecision: (id: string, decision: NoteDecision) => void;
  approveAll: (ids: string[]) => void;
  setText: (id: string, text: string | null) => void;
  send: (ids: string[], action: string, userPrompt: string) => void;
  cancel: (id: string) => void;
};

function useNotesState(): NotesState {
  const dispatch = useCanvasAction();
  const [decisions, setDecisions] = useCanvasState<Record<string, NoteDecision>>(
    "note-decisions",
    {},
  );
  const [texts, setTexts] = useCanvasState<Record<string, string>>("note-texts", {});
  const [requests, setRequests] = useCanvasState<Record<string, NoteRequest>>(
    "note-requests",
    {},
  );
  return {
    decisionOf: (id) => decisions[id] ?? "suggested",
    textOf: (id, suggested) => texts[id] ?? suggested,
    isEdited: (id) => texts[id] !== undefined,
    isBusy: (id, updatedAt) => {
      const request = requests[id];
      return !!request && !request.stopped && (!updatedAt || isAfter(request.at, updatedAt));
    },
    isStopped: (id, updatedAt) => {
      const request = requests[id];
      return !!request?.stopped && (!updatedAt || isAfter(request.at, updatedAt));
    },
    setDecision: (id, decision) => setDecisions((prev) => ({ ...prev, [id]: decision })),
    approveAll: (ids) =>
      setDecisions((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          if ((prev[id] ?? "suggested") === "suggested") next[id] = "approved";
        });
        return next;
      }),
    setText: (id, text) =>
      setTexts((prev) => {
        const next = { ...prev };
        if (text === null) delete next[id];
        else next[id] = text;
        return next;
      }),
    send: (ids, action, userPrompt) => {
      dispatch({ type: "newComposerChat", userPrompt });
      const at = new Date().toISOString();
      setRequests((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          next[id] = { action, at };
        });
        return next;
      });
    },
    cancel: (id) =>
      setRequests((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], stopped: true } } : prev)),
  };
}

function inCommentList(c: CommentSuggestion, decision: NoteDecision, entry?: CommentEntry): boolean {
  return !c.additional || decision !== "suggested" || !!entry;
}

function CheckFirst({ text }: { text: string }) {
  return (
    <Callout tone="warning" title="Check before publishing">
      {text}
    </Callout>
  );
}

function CommentReasons({ c, withCheck = true }: { c: CommentSuggestion; withCheck?: boolean }) {
  const reasons: { label: string; text: string }[] = [];
  if (c.userNeed) reasons.push({ label: "User need", text: c.userNeed });
  if (c.businessGoal) reasons.push({ label: "Business objective", text: c.businessGoal });
  if (c.principle) reasons.push({ label: "Design principle", text: c.principle });
  return (
    <Stack gap={8}>
      {reasons.length > 0 && (
        <Grid columns={reasons.length} gap={14}>
          {reasons.map((r) => (
            <Para key={r.label} label={r.label} text={r.text} />
          ))}
        </Grid>
      )}
      {c.alsoOn && c.alsoOn.length > 0 && (
        <Text size="small" tone="tertiary">
          The same reasoning applies on{" "}
          {c.alsoOn.map((s, i) => (
            <span key={s.nodeId}>
              {i > 0 ? ", " : ""}
              <Link href={figmaUrl(s.nodeId)}>{s.label}</Link>
            </span>
          ))}
          . This one comment covers them.
        </Text>
      )}
      {withCheck && c.checkFirst && <CheckFirst text={c.checkFirst} />}
    </Stack>
  );
}

function CommentDetails({ c }: { c: CommentSuggestion }) {
  return (
    <Stack gap={6}>
      <Para label="Why this decision was picked" text={c.why} />
      <Text size="small">
        <Text as="span" size="small" tone="tertiary">
          Evidence:{" "}
        </Text>
        <RefList items={c.evidence} />
      </Text>
    </Stack>
  );
}

function storyOrder(id: string): number {
  const index = STORIES.findIndex((s) => s.id === id);
  return index < 0 ? STORIES.length : index;
}

function groupByStory<T>(items: T[], storyOf: (item: T) => string): { storyId: string; items: T[] }[] {
  const groups: { storyId: string; items: T[] }[] = [];
  const sorted = [...items].sort((a, b) => storyOrder(storyOf(a)) - storyOrder(storyOf(b)));
  for (const item of sorted) {
    const id = storyOf(item);
    const last = groups[groups.length - 1];
    if (last && last.storyId === id) last.items.push(item);
    else groups.push({ storyId: id, items: [item] });
  }
  return groups;
}

function StoryHeading({ id }: { id: string }) {
  const story = STORIES.find((s) => s.id === id);
  return (
    <Row gap={8} align="center" wrap style={{ marginTop: 16, marginBottom: 2 }}>
      <Text size="small" weight="semibold" tone="secondary">
        STORY {id}
      </Text>
      <Text size="small" tone="tertiary">
        {story ? story.title : "Not part of this review"}
      </Text>
    </Row>
  );
}

function OptionalCommentRow({ c, text, onAdd }: { c: CommentSuggestion; text: string; onAdd: () => void }) {
  const theme = useHostTheme();
  const [open, setOpen] = useCanvasState<boolean>(`note-more:${c.id}`, false);
  return (
    <div style={{ padding: "12px 0", borderTop: `1px solid ${theme.stroke.tertiary}` }}>
      <Stack gap={6}>
        <Text weight="semibold">{c.question ?? c.feature}</Text>
        <Text size="small" tone="tertiary">
          Story {c.storyId}. {c.feature}. On:{" "}
          <Link href={figmaUrl(c.target.nodeId)}>{c.target.label}</Link>
        </Text>
        <Text size="small">“{text}”</Text>
        {c.checkFirst && <CheckFirst text={c.checkFirst} />}
        <Row gap={8} align="center" wrap>
          <Button variant="secondary" disabled={!canSend(text)} onClick={onAdd}>
            Add to comments
          </Button>
          <Button variant="ghost" onClick={() => setOpen(!open)}>
            {open ? "Hide reasons" : "See the reasons"}
          </Button>
        </Row>
        {open && (
          <Stack gap={8}>
            <CommentReasons c={c} withCheck={false} />
            <CommentDetails c={c} />
          </Stack>
        )}
      </Stack>
    </div>
  );
}

const TOKEN_NOTE =
  "Publishing opens a new chat that asks for a Figma token. On a Mac, you can keep it in the Keychain so it never appears in the chat. A pasted token is saved in that chat's transcript, so give it a short expiry and revoke it afterwards.";

function CommentsSection({ notes, comments }: { notes: NotesState; comments: CommentSuggestion[] }) {
  const all = comments.map((c) => {
    const entry = COMMENT_STATE[c.id];
    const decision = notes.decisionOf(c.id);
    const busy = notes.isBusy(c.id, entry?.updatedAt);
    const stopped = notes.isStopped(c.id, entry?.updatedAt);
    return { c, entry, decision, busy, stopped, text: notes.textOf(c.id, c.text) };
  });
  const rows = all.filter((r) => inCommentList(r.c, r.decision, r.entry));
  const moreRows = all.filter((r) => !inCommentList(r.c, r.decision, r.entry));
  const publishable = rows.filter(
    (r) =>
      r.decision === "approved" &&
      !r.busy &&
      !r.stopped &&
      !inFigma(r.entry) &&
      r.entry?.status !== "needs-check" &&
      canSend(r.text),
  );
  const published = rows.filter((r) => inFigma(r.entry));
  const approved = rows.filter((r) => r.decision === "approved").length;
  const checkable = rows.filter(
    (r) => !r.busy && (inFigma(r.entry) || r.entry?.status === "needs-check" || r.stopped),
  );
  const held = rows.filter((r) => r.c.checkFirst && r.decision === "suggested" && !r.entry).length;
  const heldOptional = moreRows.filter((r) => r.c.checkFirst).length;

  return (
    <section>
      <Row justify="space-between" align="center" gap={12} wrap>
        <div>
          <H3>Figma comments</H3>
          <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
            {rows.length} selected, {approved} approved, {published.length} in Figma.
          </Text>
        </div>
        <Row gap={8} wrap>
          <Button
            variant="ghost"
            disabled={rows.length === 0}
            onClick={() =>
              notes.approveAll(
                rows.filter((r) => r.entry?.status !== "published" && !r.c.checkFirst).map((r) => r.c.id),
              )
            }
          >
            Approve all
          </Button>
          {checkable.length > 0 && (
            <Button
              variant="secondary"
              onClick={() =>
                notes.send(
                  checkable.map((r) => r.c.id),
                  "check",
                  notePrompt("Check comments.", "publish-comments.md", [
                    "Comments to check:",
                    ...checkable.map((r) =>
                      noteLine(r.c.id, r.c.target, r.entry?.publishedText ?? r.entry?.attemptedText ?? r.text),
                    ),
                  ]),
                )
              }
            >
              Check Figma status
            </Button>
          )}
          <Button
            variant="primary"
            disabled={publishable.length === 0}
            onClick={() =>
              notes.send(
                publishable.map((r) => r.c.id),
                "publish",
                notePrompt("Publish comments.", "publish-comments.md", [
                  "Approved comments:",
                  ...publishable.map((r) => noteLine(r.c.id, r.c.target, r.text)),
                ]),
              )
            }
          >
            Publish approved ({publishable.length})
          </Button>
        </Row>
      </Row>
      {held > 0 && (
        <Text size="small" tone="tertiary" style={{ marginTop: 6 }}>
          Approve all skips {held === 1 ? "the comment" : `the ${held} comments`} marked “Check
          before publishing”. Approve {held === 1 ? "it" : "each one"} on its own once you have
          checked.
        </Text>
      )}
      {rows.length === 0 && (
        <Text size="small" tone="secondary" style={{ marginTop: 8 }}>
          No decision here met the bar for a recommended comment.
          {moreRows.length > 0 ? " The optional ones below are still available." : ""}
        </Text>
      )}
      {groupByStory(rows, (r) => r.c.storyId).map((group) => (
        <div key={group.storyId}>
          <StoryHeading id={group.storyId} />
          {group.items.map(({ c, entry, decision, busy, stopped, text }) => (
          <NoteRow
            key={c.id}
            id={c.id}
            title={c.feature}
            meta=""
            target={c.target}
            textLabel="Comment"
            text={text}
            edited={notes.isEdited(c.id)}
            decision={decision}
            status={shownStatus(entry, COMMENT_STATUS, decision, busy, stopped)}
            live={inFigma(entry)}
            liveText={entry?.publishedText}
            busy={busy}
            figmaLink={busy ? undefined : commentLink(entry)}
            reviewNote={c.reviewNote}
            question={c.question}
            reasons={<CommentReasons c={c} />}
            moreLabel="Why it was picked"
            more={<CommentDetails c={c} />}
            onMoveBack={
              c.additional && !entry && !busy ? () => notes.setDecision(c.id, "suggested") : undefined
            }
            onDecide={(d) => notes.setDecision(c.id, d)}
            onText={(t) => notes.setText(c.id, t)}
            onUpdate={() =>
              notes.send(
                [c.id],
                "update",
                notePrompt(`Update comment ${c.id}.`, "publish-comments.md", [
                  "New wording:",
                  noteLine(c.id, c.target, text),
                ]),
              )
            }
            onRemove={() => {
              notes.setDecision(c.id, "excluded");
              notes.send(
                [c.id],
                "remove",
                notePrompt(`Remove comment ${c.id}.`, "publish-comments.md", [
                  noteLine(c.id, c.target),
                ]),
              );
            }}
            onCancel={() => notes.cancel(c.id)}
          />
          ))}
        </div>
      ))}
      {moreRows.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <CollapsibleSection
            title="Optional comments"
            count={moreRows.length}
            defaultOpen={rows.length === 0}
          >
            <Stack gap={6}>
              <Row justify="space-between" align="center" gap={12} wrap>
                <Text size="small" tone="secondary" style={{ maxWidth: 720 }}>
                  Each one answers a question the client's team may ask when they review the
                  design without you. Add the ones worth publishing.
                  {heldOptional > 0 ? " Add all skips the ones marked “Check before publishing”." : ""}
                </Text>
                <Button
                  variant="secondary"
                  disabled={moreRows.every((r) => r.c.checkFirst)}
                  onClick={() =>
                    notes.approveAll(moreRows.filter((r) => !r.c.checkFirst).map((r) => r.c.id))
                  }
                >
                  Add all
                </Button>
              </Row>
              <div>
                {moreRows.map((r) => (
                  <OptionalCommentRow
                    key={r.c.id}
                    c={r.c}
                    text={r.text}
                    onAdd={() => notes.setDecision(r.c.id, "approved")}
                  />
                ))}
              </div>
            </Stack>
          </CollapsibleSection>
        </div>
      )}
    </section>
  );
}

function BeyondScopeSection({ notes, items }: { notes: NotesState; items: BeyondScopeItem[] }) {
  const rows = items.map((b) => {
    const entry = ANNOTATION_STATE[b.id];
    const decision = notes.decisionOf(b.id);
    const busy = notes.isBusy(b.id, entry?.updatedAt);
    const stopped = notes.isStopped(b.id, entry?.updatedAt);
    return { b, entry, decision, busy, stopped, text: notes.textOf(b.id, b.text) };
  });
  const ready = rows.filter(
    (r) =>
      r.decision === "approved" && !r.busy && r.entry?.status !== "annotated" && canSend(r.text),
  );
  const annotated = rows.filter((r) => r.entry?.status === "annotated").length;

  return (
    <section>
      <Row justify="space-between" align="center" gap={12} wrap>
        <div>
          <H3>Beyond the stories</H3>
          <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
            No story asks for these, but they look worth keeping. Approved ones go into Figma as
            annotations that ask the client to confirm them. {rows.length} worth keeping,{" "}
            {annotated} annotated.
          </Text>
        </div>
        <Row gap={8} wrap>
          <Button
            variant="ghost"
            onClick={() =>
              notes.approveAll(rows.filter((r) => r.entry?.status !== "annotated").map((r) => r.b.id))
            }
          >
            Approve all
          </Button>
          <Button
            variant="primary"
            disabled={ready.length === 0}
            onClick={() =>
              notes.send(
                ready.map((r) => r.b.id),
                "annotate",
                notePrompt("Add annotations.", "annotate-figma.md", [
                  "Approved annotations:",
                  ...ready.map((r) => noteLine(r.b.id, r.b.target, r.text)),
                ]),
              )
            }
          >
            Add approved annotations ({ready.length})
          </Button>
        </Row>
      </Row>
      <div>
        {rows.map(({ b, entry, decision, busy, stopped, text }) => (
          <NoteRow
            key={b.id}
            id={b.id}
            title={b.title}
            meta={b.storyIds.map((s) => `Story ${s}`).join(", ")}
            target={b.target}
            textLabel="Annotation"
            text={text}
            edited={notes.isEdited(b.id)}
            decision={decision}
            status={shownStatus(entry, ANNOTATION_STATUS, decision, busy, stopped)}
            live={entry?.status === "annotated"}
            liveText={entry?.annotatedText}
            busy={busy}
            figmaLink={busy ? undefined : annotationLink(entry)}
            reviewNote={b.reviewNote}
            body={
              <Grid columns={2} gap={14}>
                <Para label="What it is" text={b.whatItIs} />
                <Para label="Why it is beyond the stories" text={b.whyBeyondScope} />
                <Para label="User value" text={b.userValue} />
                {b.businessValue && <Para label="Business value" text={b.businessValue} />}
              </Grid>
            }
            moreLabel="For developers and evidence"
            more={
              <Stack gap={6}>
                {b.forDevelopers && <Para label="For developers" text={b.forDevelopers} />}
                <Text size="small">
                  <Text as="span" size="small" tone="tertiary">
                    Evidence:{" "}
                  </Text>
                  <RefList items={b.evidence} />
                </Text>
              </Stack>
            }
            onDecide={(d) => notes.setDecision(b.id, d)}
            onText={(t) => notes.setText(b.id, t)}
            onUpdate={() =>
              notes.send(
                [b.id],
                "update",
                notePrompt(`Update annotation ${b.id}.`, "annotate-figma.md", [
                  "New wording:",
                  noteLine(b.id, b.target, text),
                ]),
              )
            }
            onRemove={() => {
              notes.setDecision(b.id, "excluded");
              notes.send(
                [b.id],
                "remove",
                notePrompt(`Remove annotation ${b.id}.`, "annotate-figma.md", [
                  noteLine(b.id, b.target),
                ]),
              );
            }}
            onCancel={() => notes.cancel(b.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ScriptPanel({ notes }: { notes: NotesState }) {
  const theme = useHostTheme();
  const dispatch = useCanvasAction();
  const [stageId, setStageId] = useCanvasState<string>("script-stage", "all");
  const [editing, setEditing] = useCanvasState<boolean>("script-editing", false);
  const [edits, setEdits] = useCanvasState<ScriptEdits>("script-edits", {
    version: WALKTHROUGH.version,
    stages: {},
  });
  const [copyState, setCopyState] = useCanvasState<"idle" | "copied" | "blocked">(
    "script-copy",
    "idle",
  );
  const [regenAt, setRegenAt] = useCanvasState<string | null>("script-regenerate", null);

  const stages = WALKTHROUGH.stages;
  const hasEdits = Object.keys(edits.stages).length > 0;
  const stale = hasEdits && edits.version !== WALKTHROUGH.version;
  const regenerating =
    !!regenAt && (!WALKTHROUGH.generatedAt || isAfter(regenAt, WALKTHROUGH.generatedAt));
  const outdated = stages.length > 0 && isAfter(REVIEW.updatedAt, WALKTHROUGH.generatedAt);
  const isEdited = (s: ScriptStage) => !stale && edits.stages[s.id] !== undefined;
  const textOf = (s: ScriptStage) => (isEdited(s) ? edits.stages[s.id] : s.text);
  const full = stages
    .map((s, i) => [`${i + 1}. ${s.title}`, textOf(s), stageReference(s)].filter(Boolean).join("\n"))
    .join("\n\n");
  const words = wordCount(stages.map(textOf).join(" "));
  const minutes = Math.max(1, Math.round(words / 140));
  const selected = stages.find((s) => s.id === stageId);
  const shown = selected ? [selected] : stages;
  const index = selected ? stages.indexOf(selected) : -1;
  const questionsFor = (s: ScriptStage) =>
    COMMENTS.filter(
      (c) =>
        c.question && s.storyIds.includes(c.storyId) && notes.decisionOf(c.id) !== "excluded",
    );

  const setStageText = (id: string, text: string | null) => {
    setCopyState("idle");
    setEdits((prev) => {
      const base = prev.version === WALKTHROUGH.version ? prev.stages : {};
      const next = { ...base };
      if (text === null) delete next[id];
      else next[id] = text;
      return { version: WALKTHROUGH.version, stages: next };
    });
  };

  const requestScript = () => {
    dispatch({
      type: "newComposerChat",
      userPrompt: scriptPrompt(stages.length > 0 ? "Regenerate" : "Generate"),
    });
    setRegenAt(new Date().toISOString());
  };

  const copy = () => {
    const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
    if (!clipboard) {
      setCopyState("blocked");
      return;
    }
    clipboard.writeText(full).then(
      () => setCopyState("copied"),
      () => setCopyState("blocked"),
    );
  };

  if (stages.length === 0) {
    return (
      <Stack gap={10}>
        <Text size="small" tone="secondary">
          A spoken walkthrough of the reviewed flows for the client meeting, in journey order. Each
          stage names its stories and links their flows in Figma. It is written from the current
          review, only when you ask for it.
        </Text>
        <Row gap={8} align="center" wrap>
          <Button variant="primary" disabled={regenerating} onClick={requestScript}>
            {regenerating ? "Generating in a new chat" : "Generate walkthrough script"}
          </Button>
          {regenerating && (
            <Button variant="ghost" onClick={() => setRegenAt(null)}>
              Stop waiting
            </Button>
          )}
        </Row>
      </Stack>
    );
  }

  return (
    <Stack gap={14}>
      <Row justify="space-between" align="center" gap={12} wrap>
        <Row gap={6} wrap>
          <Pill active={!selected} onClick={() => setStageId("all")}>
            Whole script
          </Pill>
          {stages.map((s, i) => (
            <Pill key={s.id} active={selected?.id === s.id} onClick={() => setStageId(s.id)}>
              {i + 1}. {s.title}
            </Pill>
          ))}
        </Row>
        <Row gap={8} wrap>
          <Button variant="secondary" onClick={copy}>
            {copyState === "copied" ? "Copied" : "Copy script"}
          </Button>
          <Button variant="ghost" disabled={stale} onClick={() => setEditing(!editing)}>
            {editing ? "Done editing" : "Edit"}
          </Button>
          <Button variant="ghost" disabled={regenerating} onClick={requestScript}>
            {regenerating ? "Regenerating in a new chat" : "Regenerate"}
          </Button>
          {regenerating && (
            <Button variant="ghost" onClick={() => setRegenAt(null)}>
              Stop waiting
            </Button>
          )}
        </Row>
      </Row>

      {stale && (
        <Callout tone="warning" title="The script was regenerated after you edited it">
          <Row gap={8} wrap style={{ marginTop: 6 }}>
            <Button
              variant="primary"
              onClick={() => setEdits({ version: WALKTHROUGH.version, stages: {} })}
            >
              Use the new script
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                setEdits((prev) => ({
                  version: WALKTHROUGH.version,
                  stages: Object.keys(prev.stages)
                    .filter((id) => stages.some((s) => s.id === id))
                    .reduce<Record<string, string>>((acc, id) => {
                      acc[id] = prev.stages[id];
                      return acc;
                    }, {}),
                }))
              }
            >
              Keep my edits
            </Button>
          </Row>
        </Callout>
      )}

      {outdated && !regenerating && (
        <Callout tone="warning" title="The review changed after this script was written">
          <Text size="small">
            A story status, issue, or note may have changed since. Regenerate the script before the
            meeting, or check it against the stories.
          </Text>
          <Row style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={requestScript}>
              Regenerate
            </Button>
          </Row>
        </Callout>
      )}

      {copyState === "blocked" && (
        <Stack gap={4}>
          <Text size="small" tone="secondary">
            Copying is blocked here. Click the text to select it, then copy.
          </Text>
          <pre
            style={{
              userSelect: "all",
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: 13,
              lineHeight: 1.6,
              margin: 0,
              padding: 12,
              borderRadius: 6,
              background: theme.fill.secondary,
              color: theme.text.primary,
            }}
          >
            {full}
          </pre>
        </Stack>
      )}

      <Stack gap={18}>
        {shown.map((s) => (
          <div key={s.id}>
            <Row gap={10} align="center" wrap>
              <Text weight="semibold">
                {stages.indexOf(s) + 1}. {s.title}
              </Text>
              {s.screen && <Link href={figmaUrl(s.screen.nodeId)}>{s.screen.label}</Link>}
              {isEdited(s) && (
                <Text as="span" size="small" tone="tertiary">
                  Edited
                </Text>
              )}
            </Row>
            {s.storyIds.length > 0 && (
              <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
                {storyList(s.storyIds)}
                {stageFlows(s).length > 0 && ". Figma: "}
                {stageFlows(s).map((f, i) => (
                  <span key={f.nodeId}>
                    {i > 0 && ", "}
                    <Link href={figmaUrl(f.nodeId)}>{f.label}</Link>
                  </span>
                ))}
              </Text>
            )}
            {editing && !stale ? (
              <Stack gap={4} style={{ marginTop: 6 }}>
                <TextArea value={textOf(s)} onChange={(v) => setStageText(s.id, v)} rows={4} />
                {isEdited(s) && (
                  <Row>
                    <Button variant="ghost" onClick={() => setStageText(s.id, null)}>
                      Reset to generated
                    </Button>
                  </Row>
                )}
              </Stack>
            ) : (
              <Text style={{ marginTop: 6, lineHeight: 1.6 }}>{textOf(s)}</Text>
            )}
            {questionsFor(s).length > 0 && (
              <Stack
                gap={6}
                style={{
                  marginTop: 10,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${theme.stroke.tertiary}`,
                }}
              >
                <Text size="small" tone="tertiary">
                  Questions they may ask
                </Text>
                {questionsFor(s).map((c) => (
                  <Text key={c.id} size="small">
                    <Text as="span" size="small" weight="semibold">
                      {c.question}
                    </Text>{" "}
                    {notes.textOf(c.id, c.text)}
                  </Text>
                ))}
              </Stack>
            )}
          </div>
        ))}
      </Stack>

      {selected && (
        <Row gap={8}>
          <Button
            variant="ghost"
            disabled={index <= 0}
            onClick={() => setStageId(stages[index - 1].id)}
          >
            Previous stage
          </Button>
          <Button
            variant="ghost"
            disabled={index >= stages.length - 1}
            onClick={() => setStageId(stages[index + 1].id)}
          >
            Next stage
          </Button>
        </Row>
      )}

      <Text size="small" tone="tertiary">
        About {words} words, roughly {minutes} {minutes === 1 ? "minute" : "minutes"} spoken.
        Open issues are named in the script, so nothing is presented as finished before it is.
        Copying includes each stage's stories and Figma links, but not the questions under it.
      </Text>
    </Stack>
  );
}

type View = "findings" | "rationale" | "meeting";
type MeetingTab = "points" | "script";

const VIEW_ALIASES: Record<string, View> = {
  findings: "findings",
  review: "findings",
  rationale: "rationale",
  meeting: "meeting",
  client: "meeting",
};

const PRESENTABLE = STORIES.filter(
  (s) => s.assessment !== "Insufficient evidence" && !!s.talkingPoint,
);
const CAN_PRESENT = WALKTHROUGH.stages.length > 0 || PRESENTABLE.length > 0;
const EXTRA_COMMENTS = COMMENTS.filter((c) => c.additional).length;

function InFigmaNow() {
  const [open, setOpen] = useCanvasState<boolean>("pfr-in-figma", false);
  const items = [
    ...COMMENTS.flatMap((c) => {
      const entry = COMMENT_STATE[c.id];
      const link = commentLink(entry);
      return link && entry?.status === "published"
        ? [{ id: c.id, kind: "Comment", title: c.feature, storyIds: [c.storyId], href: link.href }]
        : [];
    }),
    ...BEYOND_SCOPE.flatMap((b) => {
      const entry = ANNOTATION_STATE[b.id];
      const link = annotationLink(entry);
      return link && entry?.status === "annotated"
        ? [{ id: b.id, kind: "Annotation", title: b.title, storyIds: b.storyIds, href: link.href }]
        : [];
    }),
  ];
  if (items.length === 0) return null;
  return (
    <Stack gap={6} style={{ marginTop: 10 }}>
      <Row>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          {open ? "Hide what is in Figma" : `In Figma now (${items.length})`}
        </Button>
      </Row>
      {open && (
        <Stack gap={4}>
          {items.map((item) => (
            <Text key={item.id} size="small">
              <Link href={item.href}>{item.title}</Link>
              <Text as="span" size="small" tone="tertiary">
                {" "}
                {item.kind}, {storyList(item.storyIds)}
              </Text>
            </Text>
          ))}
          <Text size="small" tone="tertiary">
            Figma has no link to a single comment, so comments open where they are pinned. Press C
            in Figma to show them. Annotations open in Dev Mode.
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

function RationaleView({
  notes,
  focus,
  onFocus,
}: {
  notes: NotesState;
  focus: string;
  onFocus: (storyId: string) => void;
}) {
  const shown = (storyIds: string[]) => focus === "all" || storyIds.includes(focus);
  const comments = COMMENTS.filter((c) => shown([c.storyId]));
  const beyond = BEYOND_SCOPE.filter((b) => shown(b.storyIds));
  const empty = COMMENTS.length === 0 && BEYOND_SCOPE.length === 0;
  return (
    <Stack gap={18}>
      <div>
        <H2>Design rationale</H2>
        <Text size="small" tone="secondary" style={{ marginTop: 4, maxWidth: 820 }}>
          The decisions in this design worth defending, with the user and business reasons behind
          them. Approved comments go into Figma beside the feature, so the client's team can review
          the design on their own and explain it internally. Nothing reaches Figma until you
          publish it.
        </Text>
        <InFigmaNow />
      </div>
      {focus !== "all" && (
        <Row gap={8} align="center" wrap>
          <Text size="small" tone="secondary">
            Showing story {focus} only.
          </Text>
          <Button variant="ghost" onClick={() => onFocus("all")}>
            Show all stories
          </Button>
        </Row>
      )}
      {empty ? (
        <Callout tone="neutral" title="No decision met the bar for a comment">
          A decision gets a comment only when the designer chose it, a documented need or a clear
          design reason backs it, and the client's team could question or miss its point. Nothing
          in this review passed all of those, so nothing is suggested.
        </Callout>
      ) : (
        <Card size="lg">
          <CardBody>
            <Stack gap={24}>
              {(comments.length > 0 || focus === "all") && (
                <CommentsSection notes={notes} comments={comments} />
              )}
              {beyond.length > 0 && <BeyondScopeSection notes={notes} items={beyond} />}
              <Text size="small" tone="tertiary">
                {TOKEN_NOTE}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      )}
    </Stack>
  );
}

function TalkingPoints() {
  const theme = useHostTheme();
  const notReady = STORIES.filter((s) => s.assessment === "Insufficient evidence");
  return (
    <Stack gap={0}>
      <Text size="small" tone="secondary" style={{ marginBottom: 10 }}>
        One or two sentences per story, to say aloud. “Say this” stories are ready to present.
        “Safe to say now” stories still have open issues, so their point covers only what works
        today.
      </Text>
      {PRESENTABLE.map((s) => (
        <div key={s.id} style={{ padding: "12px 0", borderTop: `1px solid ${theme.stroke.tertiary}` }}>
          <Row justify="space-between" align="start" gap={12}>
            <div>
              <Text weight="semibold">{s.title}</Text>
              <Text size="small" tone="tertiary" style={{ marginTop: 2 }}>
                Story {s.id}. {s.assessment === "Supported" ? "Say this" : "Safe to say now"}.{" "}
                <Link href={figmaUrl(s.figmaFlow.nodeId)}>{s.figmaFlow.label}</Link>
              </Text>
            </div>
            <StatusLabel status={s.assessment} />
          </Row>
          <Text style={{ marginTop: 6, lineHeight: 1.6 }}>“{s.talkingPoint}”</Text>
        </div>
      ))}
      {notReady.length > 0 && (
        <Text
          size="small"
          tone="tertiary"
          style={{ paddingTop: 12, borderTop: `1px solid ${theme.stroke.tertiary}` }}
        >
          Not ready to present: {storyList(notReady.map((s) => s.id))}. The review could not reach{" "}
          {notReady.length === 1 ? "its flow or sources" : "their flows or sources"}.
        </Text>
      )}
    </Stack>
  );
}

function MeetingView({ notes }: { notes: NotesState }) {
  const [tab, setTab] = useCanvasState<MeetingTab | "">("meeting-tab", "");
  const active: MeetingTab =
    tab || (WALKTHROUGH.stages.length > 0 || PRESENTABLE.length === 0 ? "script" : "points");
  return (
    <Stack gap={12}>
      <div>
        <H2>Client meeting</H2>
        <Text size="small" tone="secondary" style={{ marginTop: 4, maxWidth: 820 }}>
          What to say when you present the design. Talking points are ready now. The walkthrough
          script is written only when you ask for it, and names every open issue honestly.
        </Text>
      </div>
      <Row gap={6} wrap>
        {PRESENTABLE.length > 0 && (
          <Pill active={active === "points"} onClick={() => setTab("points")}>
            {`Talking points (${PRESENTABLE.length})`}
          </Pill>
        )}
        <Pill active={active === "script"} onClick={() => setTab("script")}>
          Walkthrough script
        </Pill>
      </Row>
      <Card size="lg">
        <CardBody>
          {active === "points" && PRESENTABLE.length > 0 ? <TalkingPoints /> : <ScriptPanel notes={notes} />}
        </CardBody>
      </Card>
    </Stack>
  );
}

function ViewTab({
  active,
  title,
  summary,
  onClick,
}: {
  active: boolean;
  title: string;
  summary: string;
  onClick: () => void;
}) {
  const theme = useHostTheme();
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "10px 14px",
        border: `1px solid ${active ? theme.accent.primary : theme.stroke.tertiary}`,
        borderRadius: 6,
        background: active ? theme.fill.secondary : theme.bg.editor,
        color: theme.text.primary,
        cursor: "pointer",
      }}
    >
      <Text as="span" weight="semibold">
        {title}
      </Text>
      <Text size="small" tone="secondary" style={{ marginTop: 2 }}>
        {summary}
      </Text>
    </button>
  );
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

function rationaleSummary(): string {
  if (COMMENTS.length === 0 && BEYOND_SCOPE.length === 0) return "No decision met the bar for a comment";
  const core = COMMENTS.length - EXTRA_COMMENTS;
  const parts = [plural(core, "comment", "comments")];
  if (EXTRA_COMMENTS > 0) parts.push(`${EXTRA_COMMENTS} optional`);
  if (BEYOND_SCOPE.length > 0) parts.push(`${BEYOND_SCOPE.length} beyond the stories`);
  const live =
    Object.values(COMMENT_STATE).filter((e) => e.status === "published").length +
    Object.values(ANNOTATION_STATE).filter((e) => e.status === "annotated").length;
  return `${parts.join(", ")}${live > 0 ? `. ${live} in Figma` : ""}`;
}

function meetingSummary(): string {
  const stages = WALKTHROUGH.stages;
  if (stages.length > 0 && isAfter(REVIEW.updatedAt, WALKTHROUGH.generatedAt)) {
    return "The script is older than the review";
  }
  if (stages.length > 0) {
    const minutes = Math.max(1, Math.round(wordCount(stages.map((s) => s.text).join(" ")) / 140));
    return `Script ready, about ${plural(minutes, "minute", "minutes")}`;
  }
  return `${plural(PRESENTABLE.length, "talking point", "talking points")}. Script on request`;
}

export default function PersonaFlowReview() {
  const theme = useHostTheme();
  const [filter, setFilter] = useCanvasState<Filter>("pfr-filter", "All");
  const [selectedId, setSelectedId] = useCanvasState<string>("pfr-story", STORIES[0]?.id ?? "");
  const [view, setView] = useCanvasState<string>("pfr-view", "findings");
  const [focus, setFocus] = useCanvasState<string>("rationale-story", "all");
  const notes = useNotesState();
  const aliased = VIEW_ALIASES[view] ?? "findings";
  const activeView: View = aliased === "meeting" && !CAN_PRESENT ? "findings" : aliased;
  const activeFocus =
    focus !== "all" &&
    (COMMENTS.some((c) => c.storyId === focus) || BEYOND_SCOPE.some((b) => b.storyIds.includes(focus)))
      ? focus
      : "all";
  const openStory = (id: string) => {
    setFilter("All");
    setSelectedId(id);
  };
  const openRationale = (id: string) => {
    setFocus(id);
    setView("rationale");
  };

  const count = (s: Assessment) => STORIES.filter((x) => x.assessment === s).length;
  const filters: Filter[] = ["All", ...STATUS_ORDER.filter((s) => count(s) > 0)];
  const activeFilter: Filter = filters.includes(filter) ? filter : "All";
  const visibleStories =
    activeFilter === "All" ? STORIES : STORIES.filter((s) => s.assessment === activeFilter);
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

  const findingParts = [
    openCount === 0 ? "No open issues" : plural(openCount, "open issue", "open issues"),
  ];
  if (readyCount > 0) findingParts.push(`${readyCount} ready for your review`);
  if (appliedCount > 0) findingParts.push(`${appliedCount} fixed`);
  if (OPEN_QUESTIONS.length > 0) {
    findingParts.push(plural(OPEN_QUESTIONS.length, "scope question", "scope questions"));
  }

  return (
    <Stack
      gap={22}
      style={{ maxWidth: 1260, margin: "0 auto", padding: 24, color: theme.text.primary }}
    >
      <Row justify="space-between" align="start" gap={20} wrap>
        <div style={{ maxWidth: 680 }}>
          <H1>{REVIEW.title}</H1>
          <Text tone="secondary" style={{ marginTop: 5 }}>
            {REVIEW.summary}
          </Text>
          <Text size="small" tone="tertiary" style={{ marginTop: 8 }}>
            Reviewed {REVIEW.date} on the “{REVIEW.wireflowsPage.name}” page.{" "}
            {plural(STORIES.length, "story", "stories")}.
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

      <SourceWarning />

      <Grid columns={CAN_PRESENT ? 3 : 2} gap={10}>
        <ViewTab
          active={activeView === "findings"}
          title="Findings"
          summary={findingParts.join(", ")}
          onClick={() => setView("findings")}
        />
        <ViewTab
          active={activeView === "rationale"}
          title="Design rationale"
          summary={rationaleSummary()}
          onClick={() => {
            setFocus("all");
            setView("rationale");
          }}
        />
        {CAN_PRESENT && (
          <ViewTab
            active={activeView === "meeting"}
            title="Client meeting"
            summary={meetingSummary()}
            onClick={() => setView("meeting")}
          />
        )}
      </Grid>

      {activeView === "findings" && (
        <>
          <DecisionsNeeded onOpenStory={openStory} />

          <ProjectIssues />

          <Row gap={8} wrap>
            {filters.map((item) => (
              <Pill key={item} active={activeFilter === item} onClick={() => setFilter(item)}>
                {`${item} (${item === "All" ? STORIES.length : count(item)})`}
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
                <CardBody>
                  <StoryDetail
                    story={selectedStory}
                    onOpenRationale={() => openRationale(selectedStory.id)}
                  />
                </CardBody>
              </Card>
            </Grid>
          )}

          <Stack gap={8}>
            <StatusGuide />
            <SourcesPanel />
          </Stack>
        </>
      )}

      {activeView === "rationale" && (
        <RationaleView notes={notes} focus={activeFocus} onFocus={setFocus} />
      )}

      {activeView === "meeting" && <MeetingView notes={notes} />}

      <Divider />
      <Text size="small" tone="tertiary">
        This review checks whether each flow helps the right person reach their goal, meets
        the agreed scope, and supports the business objective behind it. It is not user
        testing, a visual review, or an accessibility audit.
      </Text>
    </Stack>
  );
}
