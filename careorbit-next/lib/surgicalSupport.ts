/* Surgical Support page data. Extracted verbatim from
 * v2-maven/SurgicalSupportPage.dc.html renderVals() (lines 440-783).
 *
 * Structurally the same page as Behavioral Health and Medication Therapy,
 * with light-blue accents. The difference that matters editorially: the
 * trial ran on THIS pathway, so its "by the numbers" block presents the
 * percentages as measured results rather than a modeled transfer, and its
 * exposure panel is labelled "Annual value at your volume".
 *
 * NOT PORTED - unreachable from the markup: `benefits`, `costMoments`,
 * `versions`, `deploy`, `hero` and `features`.
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

export const NAME = "Surgical Support";

/** orbits-data.js ORBITS["surgical-support"].sub. */
export const SUB =
  "Surgery is the moment a health system has the least contact and the most at stake. A surgical support orbit is designed backwards from cancellations, readmissions, and the call volume that lands on your nursing line before and after the procedure.";

export const WINDOW: WindowStat[] = [
  {
    n: "2-4",
    t: "Visits around the case",
    d: "A consult, a pre-op visit, and one or two follow-ups.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Weeks",
    t: "Of preparation at home",
    d: "Where medication holds, fasting, and logistics either happen or do not.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "30 days",
    t: "The readmission window",
    d: "Where the cost and the penalty both land.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "−41%",
    t: "Readmissions in the trial",
    d: "Measured against usual care in a controlled clinical trial at Siteman.",
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
      "A clear understanding of the operation, the plan, and who is caring for them",
      "Prep, clearance, fasting, and day-of instructions, on the day they apply",
      "Wound care, activity limits, and what a normal recovery looks like at each stage",
      "The same guide works for whoever drives them home and helps at home",
    ],
  },
  {
    kicker: "For your team",
    t: "Nothing added to the day",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Ordered from the workflow you already run, no new FTEs",
      "Fewer calls asking what the discharge folder already said",
      "Each surgeon's protocol, not a generic recovery app",
      "We build and maintain the content, including protocol updates",
    ],
  },
  {
    kicker: "For the service line",
    t: "You can finally see it",
    label: "#5B9BEA",
    dot: "#5B9BEA",
    items: [
      "Who opened their orbit and who never did, by patient",
      "Symptom check-ins routed back before the post-op visit",
      "Cancellation, readmission, and PROM completion by procedure and by site",
      "Optional: validated measures scored automatically",
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
    sub: "Most service lines start with their highest-volume or highest-margin procedure.",
    items: [
      {
        t: "Named procedure orbits.",
        d: "Your highest-volume operations, each with its own guide.",
      },
      {
        t: "Prehab and optimization.",
        d: "The weeks before surgery, where cancellations are prevented.",
      },
      {
        t: "Discharge and recovery.",
        d: "The window where readmissions and calls are decided.",
      },
      {
        t: "Procedure template.",
        d: "Everything else, versioned with minor edits.",
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
        d: "Screening, seminar, and referral outreach that helps people choose your surgeons, plus when an operation is warranted.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Prep and procedure support",
        tag: "Consult through procedure week",
        d: "Prehab, clearance, fasting, logistics, and day-of instructions, delivered week by week.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Recovery with PROMs",
        tag: "Discharge through follow-up",
        d: "Wound care, activity limits, pain step-down, warning signs, and validated measures collected on schedule.",
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
    t: "Oncology",
    v: "17 procedures, 22 full-focus orbits with versioning",
  },
  {
    n: "02",
    t: "Orthopedics",
    v: "24 procedures, 19 full-focus orbits",
  },
  {
    n: "03",
    t: "Cardiology",
    v: "18 procedures, 9 full-focus orbits",
  },
  {
    n: "04",
    t: "Neurology",
    v: "24 procedures, 8 full-focus orbits",
  },
  {
    n: "05",
    t: "Otolaryngology (ENT)",
    v: "24 procedures, 7 full-focus orbits",
  },
  {
    n: "06",
    t: "Gastroenterology",
    v: "14 procedures, 6 full-focus orbits",
  },
  {
    n: "07",
    t: "Urology",
    v: "10 procedures, 5 full-focus orbits",
  },
  {
    n: "08",
    t: "General surgery",
    v: "13 procedures, 3 full-focus orbits",
  },
  {
    n: "09",
    t: "Renal",
    v: "4 procedures, 1 full-focus orbit",
  },
];

export const MEASURES = [
  {
    t: "Fewer avoidable readmissions",
    d: "The costliest post-discharge failure, and the one the trial reduced by 41%.",
  },
  {
    t: "Fewer cancellations and delays",
    d: "A case cancelled for a missed medication hold is unrecoverable OR time.",
  },
  {
    t: "Fewer avoidable ED visits",
    d: "The most expensive way to answer a question the patient could have had answered at home.",
  },
  {
    t: "Fewer inbound calls per episode",
    d: "Every repeat call is nursing time spent re-explaining what was already covered.",
  },
  {
    t: "Better pre-operative compliance",
    d: "Fasting, medication holds, and skin preparation are the most common reasons a case does not go ahead.",
  },
  {
    t: "Higher PROM completion",
    d: "Bundled and value-based programs pay on documented outcomes. Missing scores are unbilled work.",
  },
  {
    t: "Higher patient satisfaction",
    d: "Satisfaction rose 22% in the trial, and it is what referring physicians hear about.",
  },
  {
    t: "A visible program differentiator",
    d: "A branded surgical experience is something few competitors can show a referrer.",
  },
];

export const MONEY = [
  {
    v: "−41%",
    t: "Readmissions, measured",
    d: "Against usual care in a controlled clinical trial at Siteman Cancer Center. On 800 cases at a 10% readmission rate and $14,000 per readmission, that is roughly $459K a year.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center, hepatobiliary surgical oncology. Readmission rate and cost are your figures.",
  },
  {
    v: "−53%",
    t: "Calls to the nursing line",
    d: "Preparedness and recovery questions the orbit answered first. At six calls per case and nine minutes each, that is roughly 382 nursing hours a year at 800 cases.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center. Call volume and staff cost are your figures.",
  },
  {
    v: "+65%",
    t: "Patient understanding",
    d: "Of the procedure and what recovery involves. Understanding sits upstream of every other number here: the call not made, the case not cancelled, the warning sign caught early.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center.",
  },
  {
    v: "9 in 10",
    t: "Reported better navigation",
    d: "Nine of ten patients said the orbit improved how they navigated recovery, and satisfaction rose 22%.",
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
  "CareOrbit controlled clinical trial, Siteman Cancer Center and Washington University School of Medicine, hepatobiliary surgical oncology: 41% fewer readmissions, 53% fewer inbound calls, 65% better understanding of the procedure and recovery, 22% higher satisfaction, and 9 of 10 patients reporting improved recovery navigation, measured against usual care. Surgical support is the pathway the trial ran on.",
  "[Placeholder: full citation and link to the published trial]",
  "Leite KA, et al. Reducing Preventable Surgical Cancellations. J PeriAnesthesia Nurs. 2019;34(5):929-37. Online education and a standardized nurse-led preoperative interview reduced preventable cancellations from 34.3% to 20.0%.",
  "Readmission rate, cost or penalty exposure, call volume, staff cost, cancellation rate, and revenue per case are supplied by the user. CareOrbit makes no claim about those values.",
  "Dollar figures on this page are arithmetic applying the percentages entered to the volumes and unit costs entered. They are illustrations, not guarantees.",
];

/** The Siteman trial figures. On this page they are measured results for
 * the pathway, not a transfer. */
export const TRIAL_STATS = [
  { v: "+65%", d: "better understanding of the plan and side effects" },
  { v: "\u221253%", d: "fewer calls to the office" },
  { v: "\u221241%", d: "fewer readmissions" },
  { v: "+22%", d: "higher patient satisfaction" },
];

/* ------------------------------------------------------- ROI calculator -- */

export type CalcState = OrbitCalcState;

export const BENCHMARKS: CalcState = {
  volume: "800",
  utilRate: "10",
  utilCut: "41",
  utilCost: "14000",
  calls: "6",
  callCut: "53",
  minutes: "9",
  staffRate: "45",
  noShow: "10",
  noShowCut: "42",
  revPer: "6000",
};

export const EMPTY_CALC = EMPTY_ORBIT_CALC;

export const CALC_FIELDS = [
  {
    k: "volume",
    label: "Surgical cases per year",
    ph: "e.g. 800",
    step: "10",
    prefix: "",
    suffix: "cases",
    hint: "The population an orbit would be issued to",
  },
  {
    k: "utilRate",
    label: "30-day readmission rate",
    ph: "e.g. 10",
    step: "0.5",
    prefix: "",
    suffix: "%",
    hint: "Use your own program\u2019s figure",
  },
  {
    k: "utilCut",
    label: "Reduction in readmissions",
    ph: "e.g. 41",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "41% measured against usual care in the CareOrbit controlled trial",
  },
  {
    k: "utilCost",
    label: "Cost or penalty exposure per readmission",
    ph: "e.g. 14000",
    step: "1000",
    prefix: "$",
    suffix: "",
    hint: "Your finance team\u2019s figure",
  },
  {
    k: "calls",
    label: "Calls per patient per episode",
    ph: "e.g. 6",
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
    ph: "e.g. 45",
    step: "5",
    prefix: "$",
    suffix: "/hr",
    hint: "Clinical staff wage plus benefits",
  },
  {
    k: "noShow",
    label: "Cases cancelled or delayed for preparation gaps",
    ph: "e.g. 10",
    step: "0.5",
    prefix: "",
    suffix: "%",
    hint: "Fasting, medication holds, and documentation are the usual causes.",
  },
  {
    k: "noShowCut",
    label: "Reduction in preventable cancellations",
    ph: "e.g. 42",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "42% with online education plus a standardized pre-operative interview.",
  },
  {
    k: "revPer",
    label: "Revenue your program collects per case",
    ph: "e.g. 6000",
    step: "500",
    prefix: "$",
    suffix: "",
    hint: "Professional fee only unless you own the facility",
  },
];

export function computeRoi(v: CalcState) {
  return computeOrbitRoi(v, {
    utilTitle: "Readmission cost avoided",
    utilTail: "readmissions a year prevented at the rate and cost you entered.",
    callTitle: "Nursing time returned",
    callTail: "hours a year back to clinical work instead of the phone.",
    visitTitle: "Protected case revenue",
    visitTail:
      "cases a year that go ahead as scheduled instead of being cancelled.",
  });
}
