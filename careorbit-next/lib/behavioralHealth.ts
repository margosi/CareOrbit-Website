/* Behavioral Health page data. Extracted verbatim from
 * v2-maven/BehavioralHealthPage.dc.html renderVals() (lines 440-776).
 *
 * NOT PORTED - unreachable from the markup: `benefits`, `costMoments`,
 * `versions`, `deploy`, `hero` and `features`. The ROI calculator IS
 * live here and uses the three-lever model in lib/orbitRoi.ts.
 *
 * The `window` entries keep only n/t/d/size - the bg/border/pad/fg/label/
 * body keys the source also sets are never read by the markup.
 */

import {
  EMPTY_ORBIT_CALC,
  computeOrbitRoi,
  type OrbitCalcState,
} from "@/lib/orbitRoi";

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

export const NAME = "Behavioral Health";

/** orbits-data.js ORBITS["behavioral-health"].sub, loaded asynchronously in
 * v2-maven and a build-time constant here. */
export const SUB =
  "Validated screenings, delivered on schedule, scored automatically, and surfaced to the care team when risk is rising. eScreening is a live CareOrbit product today.";

export const WINDOW: WindowStat[] = [
  {
    n: "1 hour",
    t: "In session, per week",
    d: "The only hour of the week you can see.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "167",
    t: "Hours on their own",
    d: "Where relapse, medication decisions, and dropout actually happen.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "1 in 4",
    t: "Appointments missed",
    d: "No-show rates in behavioral health are among the highest in medicine.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Every day",
    t: "Managed alone",
    d: "Medication, coping, sleep, and the decision to come back next week.",
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
      "A clear understanding of their diagnosis, the program, and who is caring for them",
      "What each session asks of them and what to do between them",
      "Their medications explained, including why they continue after they feel better",
      "Which symptoms mean call us, and the crisis line your program designates",
    ],
  },
  {
    kicker: "For your team",
    t: "Nothing added to the day",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Ordered from the workflow you already run, no new FTEs",
      "Fewer calls asking what intake already covered",
      "Your program and your brand, not a generic wellness app",
      "We build and maintain the content, including program updates",
    ],
  },
  {
    kicker: "For the program",
    t: "You can finally see it",
    label: "#5B9BEA",
    dot: "#5B9BEA",
    items: [
      "Who opened their orbit and who never did, by patient",
      "Check-in responses routed back before the next appointment",
      "Engagement and completion by program and by site",
      "Optional: validated measures such as PHQ-9 and GAD-7 scored automatically",
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
    sub: "Most programs start with an intensive outpatient program or a medication start.",
    items: [
      {
        t: "Program support.",
        d: "Intensive outpatient, partial hospitalization, and group programs.",
      },
      {
        t: "Medication start.",
        d: "What it does, what to expect, and why it continues.",
      },
      {
        t: "Discharge and step-down.",
        d: "The highest-risk window after an inpatient stay.",
      },
      {
        t: "Family and support.",
        d: "A version for the people helping at home.",
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
        t: "Acquisition and intake",
        tag: "Before the first session",
        d: "Outreach that helps people choose your program, what to expect at intake, and how to get started.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Program support",
        tag: "Through active treatment",
        d: "What each phase involves, medication guidance, skills between sessions, and attendance support.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Recovery with PROMs",
        tag: "After the program ends",
        d: "Relapse prevention, ongoing support, and validated measures collected on schedule and returned to the team.",
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
    t: "[Placeholder: behavioral health orbit list]",
    v: "Awaiting the department bundle from the CareOrbit team",
  },
];

export const MEASURES = [
  {
    t: "Fewer appointment no-shows",
    d: "The largest and most immediate revenue leak in behavioral health, and largely an engagement problem.",
  },
  {
    t: "Lower early dropout",
    d: "Most patients who disengage do so in the first few sessions, before treatment has had time to work.",
  },
  {
    t: "Better medication continuation",
    d: "Psychiatric regimens are abandoned at the first side effect unless someone explains what to expect.",
  },
  {
    t: "Fewer 30-day readmissions",
    d: "The costliest between-session failure, and the one most often preceded by an unrecognized warning sign.",
  },
  {
    t: "Fewer avoidable crisis presentations",
    d: "A plan in the patient's pocket instead of an emergency department at midnight.",
  },
  {
    t: "Fewer inbound calls per episode",
    d: "Every repeat call is clinical time spent re-explaining what was already covered.",
  },
  {
    t: "Higher measure completion",
    d: "Required for quality programs and value-based contracts, and usually chased by hand.",
  },
  {
    t: "A visible program differentiator",
    d: "A branded treatment experience is something few competing programs can show a referrer.",
  },
];

export const MONEY = [
  {
    v: "1 in 4",
    t: "Appointments missed",
    d: "No-show rates in behavioral health are among the highest in medicine, and every missed slot is unrecoverable clinical capacity in a specialty with waiting lists.",
    src: "Published behavioral health no-show literature reports rates well above other specialties. Use your own program's rate.",
  },
  {
    v: "First few",
    t: "Sessions where most dropout happens",
    d: "Patients disengage early, before treatment has had time to work. Preparation and expectation-setting before the first session are the cheapest interventions available.",
    src: "Published early-dropout literature across behavioral health settings.",
  },
  {
    v: "−53%",
    t: "Calls to the clinical line",
    d: "Measured in the CareOrbit controlled trial. Preparedness and medication questions the orbit answered first, at four calls per patient and nine minutes each.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center. Applied here as a modeled transfer.",
  },
  {
    v: "+65%",
    t: "Understanding of the plan",
    d: "Measured in the same trial. In a specialty where the treatment is understanding and behavior, this is the intervention rather than a side benefit.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center.",
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

/** Shown by the "View sources" disclosure. Legacy: sourcesList. */
export const SOURCES: string[] = [
  "CareOrbit controlled clinical trial, Siteman Cancer Center and Washington University School of Medicine, hepatobiliary surgical oncology: 41% fewer readmissions, 53% fewer inbound calls, 65% better understanding of the plan and side effects, 22% higher satisfaction, and 9 of 10 patients reporting improved recovery navigation, measured against usual care.",
  "No-show rates in behavioral health are consistently reported above those of other outpatient specialties across published series. The 25% default is a placeholder for your own rate.",
  "Early dropout concentrates in the first several sessions across published behavioral health cohorts, before treatment has had time to produce measurable benefit.",
  "Psychiatric medication discontinuation is commonly driven by early side effects and unmet expectations about time to effect, both of which are education-sensitive.",
  "Rates, unit costs, call volume, and staff cost are supplied by the user. CareOrbit makes no claim about those values.",
  "Dollar figures on this page are arithmetic applying the percentages entered to the volumes and unit costs entered. They are illustrations, not guarantees.",
];

/** The Siteman trial figures, static on this page. */
export const TRIAL_STATS = [
  { v: "+65%", d: "better understanding of the plan and side effects" },
  { v: "\u221253%", d: "fewer calls to the office" },
  { v: "\u221241%", d: "fewer readmissions" },
  { v: "+22%", d: "higher patient satisfaction" },
];

/* ------------------------------------------------------- ROI calculator -- */

export type CalcState = OrbitCalcState;

export const BENCHMARKS: CalcState = {
  volume: "1200",
  utilRate: "15",
  utilCut: "20",
  utilCost: "9000",
  calls: "4",
  callCut: "53",
  minutes: "9",
  staffRate: "40",
  noShow: "25",
  noShowCut: "20",
  revPer: "180",
};

export const EMPTY_CALC = EMPTY_ORBIT_CALC;

export const CALC_FIELDS = [
  {
    k: "volume",
    label: "Patients in treatment per year",
    ph: "e.g. 1200",
    step: "50",
    prefix: "",
    suffix: "patients",
    hint: "The population an orbit would be issued to",
  },
  {
    k: "utilRate",
    label: "30-day readmission or crisis presentation rate",
    ph: "e.g. 15",
    step: "0.5",
    prefix: "",
    suffix: "%",
    hint: "Use your own program\u2019s figure",
  },
  {
    k: "utilCut",
    label: "Reduction in readmissions and crisis presentations",
    ph: "e.g. 20",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled. Not a measured behavioral health result.",
  },
  {
    k: "utilCost",
    label: "Cost per readmission or crisis presentation",
    ph: "e.g. 9000",
    step: "500",
    prefix: "$",
    suffix: "",
    hint: "Your finance team\u2019s figure",
  },
  {
    k: "calls",
    label: "Calls per patient per episode",
    ph: "e.g. 4",
    step: "1",
    prefix: "",
    suffix: "calls",
    hint: "Questions to the clinical line between visits",
  },
  {
    k: "callCut",
    label: "Reduction in inbound calls",
    ph: "e.g. 53",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "53% measured in the CareOrbit controlled trial",
  },
  {
    k: "minutes",
    label: "Minutes per call, including documentation",
    ph: "e.g. 9",
    step: "1",
    prefix: "",
    suffix: "min",
    hint: "Handle time plus charting and follow-up",
  },
  {
    k: "staffRate",
    label: "Loaded hourly cost of the staff taking calls",
    ph: "e.g. 40",
    step: "5",
    prefix: "$",
    suffix: "/hr",
    hint: "Clinical staff wage plus benefits",
  },
  {
    k: "noShow",
    label: "Appointment no-show rate",
    ph: "e.g. 25",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Behavioral health no-show rates are among the highest in medicine.",
  },
  {
    k: "noShowCut",
    label: "Reduction in no-shows",
    ph: "e.g. 20",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled assumption. Set it to 0 to leave it out.",
  },
  {
    k: "revPer",
    label: "Revenue per completed visit",
    ph: "e.g. 180",
    step: "10",
    prefix: "$",
    suffix: "",
    hint: "Your own contracted rate",
  },
];

export function computeRoi(v: CalcState) {
  return computeOrbitRoi(v, {
    utilTitle: "Readmission and crisis cost avoided",
    utilTail: "events a year prevented at the rate and cost you entered.",
    callTitle: "Clinical time returned",
    callTail: "hours a year back to patient care instead of the phone.",
    visitTitle: "Recovered visit revenue",
    visitTail: "visits a year kept instead of missed.",
  });
}
