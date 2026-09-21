/* Bariatrics page data. Extracted verbatim from
 * v2-maven/BariatricsPage.dc.html renderVals() (lines 306-654).
 *
 * NOT PORTED - unreachable from the markup: `benefits`, `costMoments`,
 * `versions`, `money`, `deploy`, `hero`, `features` and the `calc*`
 * group. This page has no #roi-calculator, no [data-feat-block] and no
 * "View sources" disclosure; the helmet carries their CSS anyway, copied
 * across the orbit family. The CSS is ported (inert); the JS is not.
 *
 * The `window` entries keep only n/t/d/size - the bg/border/pad/fg/label/
 * body keys the source also sets are never read by the markup.
 */

export type WindowStat = { n: string; t: string; d: string; size: string };
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

export const NAME = "Bariatrics";

export const WINDOW: WindowStat[] = [
  {
    n: "6+ months",
    t: "Qualification process",
    d: "Visits, letters, and requirements before an operation is even scheduled.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Many",
    t: "Never reach surgery",
    d: "Candidates start the qualification process and quietly disappear before a date is set. [Placeholder: your program's own attrition rate.]",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Lifelong",
    t: "Supplement and follow-up needs",
    d: "The part of the journey with the least clinical contact.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Every meal",
    t: "Managed at home",
    d: "Portions, hydration, protein, and supplements, all outside your building.",
    size: "clamp(44px,5vw,62px)",
  },
];

export const POV: PovBlock[] = [
  {
    kicker: "For the patient",
    t: "They know what to do",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "A clear understanding of the procedure, the requirements, and who is caring for them",
      "Every pre-op requirement and appointment, sequenced instead of handed over at once",
      "Portions, protein, hydration, and supplements, written for a kitchen rather than a chart",
      "Which symptoms mean call us, and which mean go to the ED",
    ],
  },
  {
    kicker: "For your team",
    t: "Nothing added to the day",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Ordered from the workflow you already run, no new FTEs",
      "Fewer calls asking what the seminar already covered",
      "Your program and your brand, not a generic weight-loss app",
      "We build and maintain the content, including protocol updates",
    ],
  },
  {
    kicker: "For the program",
    t: "You can finally see it",
    label: "#5B9BEA",
    dot: "#5B9BEA",
    items: [
      "Who opened their orbit and who never did, by patient",
      "Requirement progress and check-ins routed back before the next visit",
      "Conversion from seminar to surgery, and follow-up attendance by cohort",
      "Optional: validated measures and outcome reporting scored automatically",
    ],
  },
];

export const ROWS: LedgerRow[] = [
  {
    kicker: "How to begin",
    t: "Start with one, add the rest",
    label: "#A8412F",
    dot: "#E3735C",
    plain: true,
    sub: "Most programs start with surgical support, then add the pre-op and outreach versions.",
    items: [
      {
        t: "Surgical support.",
        d: "Sleeve, bypass, and revision, from decision through recovery.",
      },
      {
        t: "Pre-op requirements.",
        d: "The months of visits, testing, and insurance steps before surgery.",
      },
      {
        t: "Post-op nutrition and habits.",
        d: "Stage-by-stage eating, activity, and supplement guidance.",
      },
      {
        t: "Seminar and outreach.",
        d: "The information session that turns interest into a consult.",
      },
    ],
  },
  {
    kicker: "A patient’s orbit can evolve as their journey needs change",
    t: "One orbit supports the full journey, adapting as needs change",
    label: "#1F6B73",
    dot: "#4FB3BF",
    seq: true,
    sub: "The same orbit advances through three versions on its own, with no new app or login.",
    items: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Acquisition",
        tag: "Before they are a patient",
        d: "Seminar and outreach that helps people choose your program, plus who qualifies and what the process involves.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Pre-op and procedure support",
        tag: "Requirements through surgery week",
        d: "Every required visit and test, insurance steps, pre-op diet, and day-of instructions, sequenced week by week.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Year one with PROMs",
        tag: "Recovery and beyond",
        d: "Stage-by-stage nutrition, activity, supplements, follow-up prompts, and validated measures collected on schedule.",
      },
    ],
  },
  {
    kicker: "How it deploys",
    t: "Issued from the workflow you already run",
    label: "#2D5A87",
    dot: "#5B9BEA",
    plain: true,
    sub: "From the CareOrbit app, a scheduled flat file from any EHR, a patient list, a QR code, or a text message.",
    items: [
      {
        t: "No new FTEs.",
        d: "Nothing added to anyone's day.",
      },
      {
        t: "White-label.",
        d: "Your brand, your voice.",
      },
      {
        t: "Live in a quarter.",
        d: "From kickoff to first patient.",
      },
    ],
  },
] as LedgerRow[];

export const CATALOG = [
  {
    n: "01",
    t: "Bariatric surgery",
    v: "Full-focus orbit in the general surgery bundle",
  },
  {
    n: "02",
    t: "[Placeholder: additional bariatric orbits]",
    v: "To be confirmed with the service line",
  },
];

export const MEASURES = [
  {
    t: "Lower pre-operative attrition",
    d: "The single largest revenue leak in a bariatric program, and almost entirely an engagement problem.",
  },
  {
    t: "Fewer readmissions and ED visits",
    d: "Dehydration and nutrition complications are the most common reasons, and the most preventable.",
  },
  {
    t: "Higher supplement adherence",
    d: "Deficiencies show up years later as complications and revisions.",
  },
  {
    t: "Better long-term follow-up attendance",
    d: "Follow-up is where weight regain is caught, and where most programs lose contact.",
  },
  {
    t: "Fewer inbound calls per candidate",
    d: "Every repeat call is staff time spent re-explaining what was already covered.",
  },
  {
    t: "Faster insurance qualification",
    d: "A candidate who finishes the requirements sooner reaches surgery sooner.",
  },
  {
    t: "Stronger referral and review volume",
    d: "A guided journey is the cheapest patient acquisition a bariatric program has.",
  },
  {
    t: "A visible program differentiator",
    d: "A branded bariatric experience is something few competing programs can show.",
  },
];

export const QUOTES = [
  {
    text: "Patients see it as incredibly easy to understand and use. We use it to open up dialogues so much faster. Families just run with it!",
    who: "Chief of Section, Surgical Oncology",
  },
  {
    text: "It's seen as incredibly easy to understand and use. They (patients and families) just run with it.",
    who: "Nurse Navigator, Siteman Cancer Center Surgical Department",
  },
];

/** The Siteman trial figures, static on this page. */
export const TRIAL_STATS = [
  { v: "+65%", d: "better understanding of the plan and side effects" },
  { v: "−53%", d: "fewer calls to the office" },
  { v: "−41%", d: "fewer readmissions" },
  { v: "+22%", d: "higher patient satisfaction" },
];
