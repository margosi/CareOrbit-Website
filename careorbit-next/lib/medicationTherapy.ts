/* Medication Therapy & Adherence page data. Extracted verbatim from
 * v2-maven/MedicationTherapyPage.dc.html renderVals() (lines 440-776).
 *
 * This page is structurally identical to Behavioral Health - same sections,
 * same three-lever ROI calculator - with lilac accents and its own copy.
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

export const NAME = "Medication Therapy & Adherence";

/** orbits-data.js ORBITS["medication-therapy"].sub. */
export const SUB =
  "Specialty and injectable therapies fail most often in the first months, for reasons education and timely check-ins can reach. A medication therapy orbit is designed backwards from persistence, calls, and chair utilization.";

export const WINDOW: WindowStat[] = [
  {
    n: "Minutes",
    t: "Spent counseling",
    d: "The only contact most patients get about a medication they will take for years.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "50%",
    t: "Nonadherent on long-term therapy",
    d: "Roughly half of patients on chronic medication do not take it as prescribed.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Week 2",
    t: "Where most therapies stop",
    d: "The first side effect, met without guidance.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Every dose",
    t: "Taken alone",
    d: "Timing, food rules, and the decision to keep going, all outside your building.",
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
      "A clear understanding of what the medication does and why it continues",
      "How to take it, store it, and handle a missed dose, on the day it applies",
      "Which side effects warrant a call rather than stopping the therapy",
      "The same guide works for whoever helps manage the regimen at home",
    ],
  },
  {
    kicker: "For your team",
    t: "Nothing added to the day",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Ordered from the workflow you already run, no new FTEs",
      "Fewer calls asking what the counseling session already covered",
      "Your protocols and your brand, not a generic pill reminder app",
      "We build and maintain the content, including formulary updates",
    ],
  },
  {
    kicker: "For the program",
    t: "You can finally see it",
    label: "#5B9BEA",
    dot: "#5B9BEA",
    items: [
      "Who opened their orbit and who never did, by patient",
      "Adherence and side effect check-ins routed back between fills",
      "Persistence and refill patterns by therapy and by site",
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
    sub: "Most programs start with their highest-cost or highest-abandonment therapy.",
    items: [
      {
        t: "Specialty starts.",
        d: "High-cost therapies where abandonment is most expensive.",
      },
      {
        t: "Anticoagulation.",
        d: "The regimen where a misunderstanding is most dangerous.",
      },
      {
        t: "Injectables and GLP-1s.",
        d: "Technique, titration, and side effect expectations.",
      },
      {
        t: "Refill and persistence.",
        d: "The long tail where most therapies quietly stop.",
      },
    ],
  },
  {
    kicker: "A patient’s orbit can evolve as their journey needs change",
    t: "One orbit that changes as the therapy progresses",
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
        t: "Prescribed",
        tag: "Before the first fill",
        d: "What the therapy is for, what it will cost, prior authorization expectations, and why starting matters.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Starting therapy",
        tag: "The first weeks",
        d: "Technique, timing, titration, and the side effects that are expected rather than a reason to stop.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Long-term adherence with PROMs",
        tag: "Month three and beyond",
        d: "Refill prompts, persistence support, and validated measures collected on schedule and returned to the team.",
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
    t: "Medication Therapy Support Orbit",
    v: "Adherence, side effect guidance, and refill support across the therapy course",
  },
];

export const MEASURES = [
  {
    t: "Higher adherence on long-term therapy",
    d: "Roughly half of chronic medication is not taken as prescribed, and almost none of that is visible to the prescriber.",
  },
  {
    t: "Fewer avoidable admissions",
    d: "Nonadherence is one of the most consistently cited drivers of preventable hospitalization.",
  },
  {
    t: "Higher refill persistence",
    d: "A lapse caught at week three is recoverable. One found at the next visit usually is not.",
  },
  {
    t: "Fewer medication errors at home",
    d: "Timing, food rules, and interactions explained once at the counter and never again.",
  },
  {
    t: "Fewer inbound calls per patient",
    d: "Every repeat call is pharmacist time spent re-explaining what was already covered.",
  },
  {
    t: "Better performance on adherence measures",
    d: "Adherence measures carry direct weight in quality and star-rating programs.",
  },
  {
    t: "Safer high-risk regimen use",
    d: "Anticoagulants, oncolytics, and specialty therapies are where an error costs the most.",
  },
  {
    t: "A visible program differentiator",
    d: "A branded therapy-management experience is something few competitors can show a payer or a prescriber.",
  },
];

export const MONEY = [
  {
    v: "About half",
    t: "Chronic medication not taken as prescribed",
    d: "Nonadherence on long-term therapy is one of the most consistently documented failures in medicine, and it is almost entirely invisible between appointments.",
    src: "World Health Organization and subsequent adherence literature: roughly 50% adherence to long-term therapy in developed countries.",
  },
  {
    v: "Week 2",
    t: "Where most therapies quietly stop",
    d: "The first side effect, met without guidance about whether it fades. Setting the expectation in advance is the cheapest intervention available.",
    src: "Published discontinuation literature across chronic therapy classes.",
  },
  {
    v: "−53%",
    t: "Calls to the clinical line",
    d: "Measured in the CareOrbit controlled trial. Dosing and side-effect questions the orbit answered first, at three calls per patient and eight minutes each.",
    src: "CareOrbit controlled clinical trial, Siteman Cancer Center. Applied here as a modeled transfer.",
  },
  {
    v: "+65%",
    t: "Understanding of the plan",
    d: "Measured in the same trial. Understanding is what separates a filled prescription from a therapy that is actually taken.",
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
  "World Health Organization, Adherence to Long-Term Therapies (2003), and the adherence literature that follows it: adherence to long-term therapy in developed countries averages roughly 50%.",
  "Medication nonadherence is consistently cited as a major contributor to avoidable hospitalization and cost. Attribution rates vary widely by method and population; the 10% default is a placeholder for your own figure.",
  "Early discontinuation concentrates in the first weeks of therapy and is frequently driven by unmanaged side effects and unmet expectations about time to effect.",
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
  volume: "2000",
  utilRate: "10",
  utilCut: "20",
  utilCost: "12000",
  calls: "3",
  callCut: "53",
  minutes: "8",
  staffRate: "40",
  noShow: "50",
  noShowCut: "15",
  revPer: "90",
};

export const EMPTY_CALC = EMPTY_ORBIT_CALC;

export const CALC_FIELDS = [
  {
    k: "volume",
    label: "Patients on managed therapy per year",
    ph: "e.g. 2000",
    step: "50",
    prefix: "",
    suffix: "patients",
    hint: "The population an orbit would be issued to",
  },
  {
    k: "utilRate",
    label: "Avoidable admission rate attributed to nonadherence",
    ph: "e.g. 10",
    step: "0.5",
    prefix: "",
    suffix: "%",
    hint: "Use your own figure",
  },
  {
    k: "utilCut",
    label: "Reduction in avoidable admissions",
    ph: "e.g. 20",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled. Not a measured result in this population.",
  },
  {
    k: "utilCost",
    label: "Cost per avoidable admission",
    ph: "e.g. 12000",
    step: "1000",
    prefix: "$",
    suffix: "",
    hint: "Your finance team\u2019s figure",
  },
  {
    k: "calls",
    label: "Calls per patient per episode",
    ph: "e.g. 3",
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
    ph: "e.g. 8",
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
    label: "Patients nonadherent to long-term therapy",
    ph: "e.g. 50",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Roughly half, across published adherence literature.",
  },
  {
    k: "noShowCut",
    label: "Improvement in adherence",
    ph: "e.g. 15",
    step: "1",
    prefix: "",
    suffix: "%",
    hint: "Modeled assumption. Set it to 0 to leave it out.",
  },
  {
    k: "revPer",
    label: "Program value per newly adherent patient",
    ph: "e.g. 90",
    step: "10",
    prefix: "$",
    suffix: "",
    hint: "Margin, MTM fee, or measure value. Your finance team\u2019s figure.",
  },
];

export function computeRoi(v: CalcState) {
  return computeOrbitRoi(v, {
    utilTitle: "Avoidable admission cost removed",
    utilTail: "admissions a year prevented at the rate and cost you entered.",
    callTitle: "Staff time returned",
    callTail: "hours a year back to clinical work instead of the phone.",
    visitTitle: "Value of improved adherence",
    visitTail: "patients a year newly adherent to their therapy.",
  });
}
