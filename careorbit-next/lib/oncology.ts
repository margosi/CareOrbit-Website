/* Oncology page data. Extracted verbatim from
 * v2-maven/OncologyPage.dc.html renderVals() (lines 326-683).
 *
 * NOT PORTED - unreachable from the markup: `features`, `benefits`,
 * `costMoments`, `versions`, `money`, `deploy`, `hero`, `practiceLabel`
 * and the whole `calc*` group. This page has no #roi-calculator and no
 * [data-feat-block] element; the helmet carries their CSS anyway, copied
 * across the orbit family. The CSS is ported (inert); the JS is not.
 *
 * `sub` and `name` came from an async import of orbits-data.js
 * (ORBITS["oncology"]); both are build-time constants here.
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

export const NAME = "Oncology";
export const SUB =
  "Results proven against usual care in a controlled surgical oncology trial. Every orbit starts from the numbers your service line already reports, readmissions, call volume, preparedness, and is built to move them.";

/** The navy panel stats. Only n/t/d/size are read by the markup; the
 * bg/border/pad/fg/label/body keys the source also set are never used. */
export const WINDOW: WindowStat[] = [
  {
    n: "Years",
    t: "Length of the journey",
    d: "Diagnosis through treatment, recovery, and surveillance.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "3+",
    t: "Modalities to coordinate",
    d: "Surgery, infusion, and radiation, each with its own instructions and its own side effects.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "20 min",
    t: "To explain all of it",
    d: "The instructions are handed over in a single visit, on the day a patient is least able to take them in.",
    size: "clamp(34px,3.6vw,46px)",
  },
  {
    n: "Weeks",
    t: "Between appointments",
    d: "Doses, side effects, and warning signs all arrive at home, where the service line has almost no presence.",
    size: "clamp(40px,4.4vw,54px)",
  },
];

export const POV: PovBlock[] = [
  {
    kicker: "For the patient and family",
    t: "They know what to do",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "A clear understanding of the diagnosis, the regimen, and who is caring for them",
      "Treatment prep, side effect management, and what to expect at each cycle, on the day it applies",
      "Which symptoms mean call us, and which mean go to the ED",
      "The same guide works for the family member managing the recovery at home",
    ],
  },
  {
    kicker: "For your team",
    t: "Nothing added to the day",
    label: "#2D5A87",
    dot: "#2D5A87",
    items: [
      "Ordered from the workflow you already run, no new FTEs",
      "Fewer calls asking what chemo teaching already covered",
      "Your protocols and your brand, not a generic cancer app",
      "We build and maintain the content, including regimen updates",
    ],
  },
  {
    kicker: "For the program",
    t: "You can finally see it",
    label: "#4474B0",
    dot: "#5B9BEA",
    items: [
      "Who opened their orbit and who never did, by patient",
      "Patients not engaging with their care material flagged, before it becomes a poor outcome",
      "Engagement and completion by disease site and by clinic",
      "Optional: validated measures and PROMs scored automatically",
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
    sub: "Select your ideal initial journey. For example, your highest-volume regimen or surgical pathway.",
    items: [
      {
        t: "Treatment support.",
        d: "Chemotherapy, immunotherapy, and radiation, by regimen.",
      },
      {
        t: "Surgical support.",
        d: "Cancer operations, from prep through discharge and recovery.",
      },
      {
        t: "Survivorship.",
        d: "Long-term follow-up, late effects, and surveillance schedules.",
      },
      {
        t: "Screening and outreach.",
        d: "Risk, screening, and referral before someone is a patient.",
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
        t: "Early Journey",
        tag: "Motivation, understanding, preparation",
        d: "Focusing on those vital early learnings that help a patient and their family navigate their fears, confusions and overwhelm of a cancer diagnosis and initial planning.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Treatment support",
        tag: "From procedure through active treatment",
        d: "The regimen explained, prep and clearance, side effect management, and day-of instructions, cycle by cycle.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Survivorship with PROMs",
        tag: "Longer-term recovery and survivorship",
        d: "Late effects, surveillance schedules, and validated measures collected on schedule and returned to the team.",
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
    t: "Colectomy",
    v: "Bowel",
  },
  {
    n: "02",
    t: "Craniotomy",
    v: "Brain",
  },
  {
    n: "03",
    t: "Gastrectomy",
    v: "Stomach",
  },
  {
    n: "04",
    t: "Mastectomy",
    v: "Breast",
  },
  {
    n: "05",
    t: "Esophagectomy",
    v: "Esophageal",
  },
  {
    n: "06",
    t: "Pancreaticoduodenectomy (Whipple)",
    v: "Pancreatic, the controlled-trial pathway",
  },
  {
    n: "07",
    t: "Cystectomy",
    v: "Bladder",
  },
  {
    n: "08",
    t: "Hepatectomy",
    v: "Liver",
  },
  {
    n: "09",
    t: "Hysterectomy",
    v: "Cervical, ovarian, uterine",
  },
  {
    n: "10",
    t: "Laryngectomy",
    v: "Laryngeal / voice box",
  },
  {
    n: "11",
    t: "Lobectomy",
    v: "Lung",
  },
  {
    n: "12",
    t: "Nephrectomy",
    v: "Kidney",
  },
  {
    n: "13",
    t: "Orchidectomy",
    v: "Testicular",
  },
  {
    n: "14",
    t: "Pneumonectomy",
    v: "Lung",
  },
  {
    n: "15",
    t: "Prostatectomy",
    v: "Prostate",
  },
  {
    n: "16",
    t: "Thyroidectomy",
    v: "Thyroid",
  },
  {
    n: "17",
    t: "Vulvectomy",
    v: "Vulvar",
  },
  {
    n: "18",
    t: "Chemotherapy / medical oncology",
    v: "Versions: full orbit + add-on module",
  },
  {
    n: "19",
    t: "Radiation therapy",
    v: "Versions: full orbit + add-on module",
  },
  {
    n: "20",
    t: "Survivorship",
    v: "Procedure orbits evolve here once the timeline ends",
  },
];

export const MEASURES = [
  {
    t: "Fewer 30-day readmissions",
    d: "The costliest between-visit failure in a surgical oncology program, and the one the trial reduced by 41%.",
  },
  {
    t: "Fewer avoidable ED visits",
    d: "A managed side effect at home instead of an unplanned presentation on a weekend.",
  },
  {
    t: "Fewer inbound calls per episode",
    d: "Nursing and navigator time is the scarcest resource in the service line. The trial returned 53% of it.",
  },
  {
    t: "Protected treatment throughput",
    d: "An unprepared patient delays a surgical slot, an infusion chair, or a linac hour that cannot be recovered.",
  },
  {
    t: "Higher oral therapy adherence",
    d: "Expensive regimens only work when they are taken correctly, and nobody sees the bottle between visits.",
  },
  {
    t: "PROMs collected on schedule",
    d: "Required for accreditation, quality programs, and value-based contracts, and usually chased by hand.",
  },
  {
    t: "Clinical trial awareness and enrollment",
    d: "Patients cannot consider a study they were never told about in language they understood.",
  },
  {
    t: "Retention through survivorship",
    d: "Surveillance kept on schedule, and the relationship that drives the next referral.",
  },
];

export const STUDIES = [
  {
    tag: "Controlled clinical trial",
    tagColor: "#FFFFFF",
    tagBg: "#0F1D2E",
    setting: "Siteman Cancer Center, Washington University School of Medicine",
    t: "Pancreatic Cancer Surgery Support",
    d: "A controlled clinical trial in hepatobiliary surgical oncology comparing an orbit against usual care. Patients arrived better prepared, called less, and were readmitted less often. Every figure on this page comes from it.",
    linkLabel: "Download a summary of the study results",
    stats: [
      {
        n: "−41%",
        l: "readmissions",
      },
      {
        n: "−53%",
        l: "calls to the office",
      },
      {
        n: "+65%",
        l: "understanding of plan and side effects",
      },
      {
        n: "+22%",
        l: "patient satisfaction",
      },
    ],
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
export const SOURCES = [
  "CareOrbit controlled clinical trial, Siteman Cancer Center and Washington University School of Medicine, hepatobiliary surgical oncology: 41% fewer readmissions, 53% fewer inbound calls, 65% better understanding of the treatment plan and side effects, 22% higher patient satisfaction, and 9 of 10 patients reporting improved recovery navigation, measured against usual care.",
  "[Placeholder: full citation and link to the published trial]",
  "Live and in build at Washington University and Siteman Cancer Center: ENT Surgery Support and Fluoroscopy Procedure Support are live; Head and Neck Cancer Tumor Center and Breast Cancer orbits are in active build.",
];
