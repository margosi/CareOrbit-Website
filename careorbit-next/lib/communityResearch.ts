/* Community Research page data. Extracted verbatim from
 * v2-maven/CommunityResearch.dc.html renderVals() (lines 245-346).
 *
 * This page has no wrapper component of its own - CommunityResearch.dc.html
 * IS the page - and no dead key set: everything renderVals() returns is
 * rendered. There is no ROI calculator and no sources disclosure.
 */

export type PovBlock = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: string[];
};
export type PlainRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  plain: true;
  sub: string;
  items: { t: string; d: string }[];
};
export type SeqRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  seq: true;
  sub: string;
  items: {
    v: string;
    cBorder: string;
    cBg: string;
    cFg: string;
    cLine: string;
    line: boolean;
    t: string;
    tag: string;
    d: string;
  }[];
};
export type LedgerRow = PlainRow | SeqRow;

export const POV: PovBlock[] = [
  {
    kicker: "For participants",
    t: "They know what the study asks",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "Education aligned to their treatment or study milestone, not a generic packet",
      "Easy to understand across all literacy levels and all ages",
      "Accessible on any screen, with no app download and no portal login",
      "Less confusion, and less of the drift that turns into dropout",
    ],
  },
  {
    kicker: "For researchers",
    t: "Structured data, not chased paperwork",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "An IRB-ready audit trail for every participant interaction",
      "Assessment responses captured in real time and structured for analysis",
      "No additional FTE and no additional I.T. requirement",
      "Configurable to any study protocol, instrument set, and time-point schedule",
    ],
  },
  {
    kicker: "For your research division",
    t: "Throughput, richness, and a grant story",
    label: "#4474B0",
    dot: "#5B9BEA",
    items: [
      "White-labeled to your organization's brand rather than ours",
      "Scalable across multiple concurrent studies",
      "Higher study throughput and richer participant data",
      "A differentiator you can point to in grant applications",
    ],
  },
];

export const ROWS: LedgerRow[] = [
  {
    kicker: "How we get started",
    t: "One pilot cohort first, then wherever it earns its way",
    label: "#A8412F",
    dot: "#E3735C",
    plain: true,
    sub: "No risk and no lock-in. A pilot cohort is enough to prove reach before anything scales.",
    items: [
      {
        t: "Define the study protocol and orbits.",
        d: "Which time-points, which instruments, and which stretch of the study is losing people.",
      },
      {
        t: "Configure and brand it as yours.",
        d: "White-labeled to your organization, in your voice, matched to your interventions and milestones.",
      },
      {
        t: "Test with a pilot cohort.",
        d: "One study arm or one site, run beside the packet and the coordinator call you already have.",
      },
      {
        t: "Launch and monitor together.",
        d: "Completion from the pilot decides whether the next study or site turns on.",
      },
    ],
  },
  {
    kicker: "Single orbit, multiple versions",
    t: "One participant orbit that changes as the study does",
    label: "#1F6B73",
    dot: "#4FB3BF",
    seq: true,
    sub: "A participant moves through the study, and their orbit updates at the right moment with no new app or login.",
    items: [
      {
        v: "01",
        line: true,
        t: "Recruitment and eligibility",
        tag: "Before they are a participant",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        d: "Outreach, screening, and referral from community partners: what the study asks, what it involves, and how to take the first step.",
      },
      {
        v: "02",
        line: true,
        t: "Consent through baseline",
        tag: "Enrollment",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        d: "Eligibility, consent explained in plain language, orientation to the visit schedule, and the baseline instruments, delivered as a guided sequence instead of a packet.",
      },
      {
        v: "03",
        line: false,
        t: "Follow-up through close-out",
        tag: "The long stretch",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(227,115,92,.55)",
        d: "Scheduled assessments, reminders that reach people who move, and check-ins that surface disengagement while the window is still open.",
      },
    ],
  },
  {
    kicker: "Validated instruments",
    t: "The screeners your protocol already runs, delivered in-orbit",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "Assessment delivery configured to your protocol rather than retrofitted to a generic form builder.",
    items: [
      {
        t: "PHQ-9, GAD-7, AUDIT-C, DAST-10, CAGE-AID, and the GAIN family.",
        d: "Plus any researcher-defined instrument your protocol calls for.",
      },
      {
        t: "Scheduled and triggered delivery.",
        d: "At defined study time-points, or triggered by a participant behavior or milestone.",
      },
      {
        t: "Branching logic for adaptive protocols.",
        d: "The next item follows from the last answer rather than a fixed form.",
      },
      {
        t: "Real-time response capture.",
        d: "Structured on arrival, timestamped, and linked to the participant.",
      },
      {
        t: "Full audit trail.",
        d: "Every interaction recorded for IRB and regulatory review.",
      },
      {
        t: "Site and cohort rollups.",
        d: "Completion, drift, and dropout risk visible by site, cohort, and coordinator.",
      },
    ],
  },
  {
    kicker: "Data and integration",
    t: "Research-ready from day one",
    label: "#1F6B73",
    dot: "#4FB3BF",
    plain: true,
    sub: "Engagement and assessment data handed to the systems your team already works in.",
    items: [
      {
        t: "Engagement analytics per participant.",
        d: "Who accessed what, when, and how many times, with completion rates across a study arm.",
      },
      {
        t: "Structured exports.",
        d: "CSV or JSON for all instrument responses, timestamped, participant-linked, and audit-ready.",
      },
      {
        t: "Progress dashboards.",
        d: "Real-time participant status, pending items, and dropout risk indicators.",
      },
      {
        t: "API and EHR integration.",
        d: "Push data into your existing research systems, including REDCap, Epic, and custom API support.",
      },
    ],
  },
  {
    kicker: "How it deploys",
    t: "Issued from the workflow you already run",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "Automated delivery across email, text, and a QR code at a partner site, at the time points you define.",
    items: [
      {
        t: "No new FTEs.",
        d: "Nothing added to a coordinator's week, and no portal logins to administer.",
      },
      {
        t: "HIPAA-compliant and BAA-ready.",
        d: "EHR-friendly and non-disruptive to the workflows and I.T. you already run.",
      },
      {
        t: "White-label.",
        d: "Your study, your institution, your voice.",
      },
      {
        t: "Stands up in days, not months.",
        d: "From kickoff to first participant.",
      },
    ],
  },
] as LedgerRow[];

/** Two figures on the navy panel. Legacy: gaps. */
export const GAPS = [
  {
    n: "40–60%",
    size: "clamp(38px,4.2vw,56px)",
    t: "Research participants who drop out before study completion",
    d: "Attrition climbs with study length and follow-up burden, and community-based protocols carry the hardest populations to hold.",
    src: "[Placeholder: source to confirm]",
  },
  {
    n: "70%+",
    size: "clamp(38px,4.2vw,56px)",
    t: "Research teams reporting difficulty maintaining between-visit contact",
    d: "The stretch between visits is where a protocol lives, and it is the stretch nobody is staffed to cover.",
    src: "[Placeholder: source to confirm]",
  },
];

export const MEASURES = [
  {
    n: "01",
    t: "Enrollment against target",
    d: "How many eligible people screened, consented, and reached baseline, tracked against the accrual curve the protocol assumed.",
  },
  {
    n: "02",
    t: "Time to full accrual",
    d: "The months between first contact and a closed enrollment window, and what a shorter one is worth to the study budget.",
  },
  {
    n: "03",
    t: "Consent comprehension",
    d: "Whether a participant can say what the study asks of them after they signed, not just that a signature exists.",
  },
  {
    n: "04",
    t: "Baseline completion",
    d: "The share of consented participants who finish every baseline instrument inside the protocol window.",
  },
  {
    n: "05",
    t: "Assessment window adherence",
    d: "On-time completion at each scheduled follow-up, the measure that decides whether a data point is usable at all.",
  },
  {
    n: "06",
    t: "Retention at final follow-up",
    d: "How many participants are still reachable and still on protocol when the last window opens.",
  },
  {
    n: "07",
    t: "Coordinator hours returned",
    d: "Time given back from reminder calls, rescheduling, and chasing forms, valued at loaded staff cost.",
  },
  {
    n: "08",
    t: "Study throughput and data richness",
    d: "How many concurrent studies a division can carry, and how much structured participant data each one produces.",
  },
  {
    n: "09",
    t: "Representation of the target community",
    d: "Whether the enrolled cohort actually reflects the community the study was funded to serve.",
  },
];

/** Engage / Assess / Data, each with its own bullet list. Legacy: library. */
export const LIBRARY = [
  {
    n: "01",
    t: "Engage",
    v: "Structured digital education and motivation delivered to participants across the entire study journey.",
    items: [
      "Milestone-aligned content delivery",
      "Protocol-specific messaging",
      "Phone, tablet, or desktop",
      "No app download required",
    ],
  },
  {
    n: "02",
    t: "Assess",
    v: "Validated screening and assessment tools woven into the participant experience rather than bolted on.",
    items: [
      "Validated instruments, plus researcher-defined",
      "Scheduled and triggered delivery",
      "Real-time response capture",
      "HIPAA-compliant data handling",
    ],
  },
  {
    n: "03",
    t: "Data",
    v: "Structured participant data and dashboards that power research insight and reporting.",
    items: [
      "Engagement analytics by participant",
      "Assessment response exports",
      "API and EHR integration",
      "IRB-ready audit trails",
    ],
  },
];
