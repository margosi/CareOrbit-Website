import {
  EMPTY_ORBIT_CALC,
  computeOrbitRoi,
  type OrbitCalcKey,
  type OrbitCalcState,
} from "@/lib/orbitRoi";

/* Women's Health segment copy. Extracted verbatim from
 * v2-maven/WomensHealthPage.dc.html lines 411-607 (SEGMENTS).
 *
 * NOT PORTED - unreachable from the markup: each segment's `features` and
 * `benefits` arrays, plus renderVals()'s `versions`, `costMoments` and
 * `hero`. This page has no [data-feat-block] and no versions grid.
 * The `window` entries keep only n/t/d/size; the bg/border/pad/fg/label/
 * body keys the source also sets are never read by the markup.
 *
 * The ROI calculator on this page IS live, and its field labels, result
 * labels, document titles and CSV filename are all per-segment, which is
 * why `calc` is carried in full.
 */

export type WindowStat = { n: string; t: string; d: string; size: string };
export type MoneyStat = { v: string; t: string; d: string; src: string };
export type Measure = { t: string; d: string };
export type OrbitItem = { t: string; v: string };
export type DashItem = { t: string; d: string };
export type PovBlock = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: string[];
};
export type SeqItem = {
  v: string;
  cBorder: string;
  cBg: string;
  cFg: string;
  cLine: string;
  line: boolean;
  t: string;
  tag: string;
  d: string;
};

/** Per-segment calculator strings. Legacy: seg.calc. */
export type SegCalc = {
  vol: string;
  util: string;
  utilCut: string;
  utilCost: string;
  noShow: string;
  noShowCut: string;
  revPer: string;
  rUtil: string;
  rVisit: string;
  visitWord: string;
  doc: string;
  csv: string;
  transferNoun: string;
  hintUtilCut: string;
  hintNoShow: string;
  worked: string;
  worked2: string;
};

export type WhSegment = {
  key: string;
  label: string;
  name: string;
  line: string;
  blurb: string;
  headLead: string;
  headEm: string;
  intro: string;
  gapLead: string;
  gapEm: string;
  gapIntro: string;
  gapBridge: string;
  window: WindowStat[];
  pov: PovBlock[];
  beginSub: string;
  beginItems: DashItem[];
  seqSub: string;
  seqItems: SeqItem[];
  measures: Measure[];
  money: MoneyStat[];
  orbits: OrbitItem[];
  econ: { intro: string; sub: string; items: DashItem[] };
  calc: SegCalc;
};

export const NAME = "Women's Health";

/** renderVals() overrides orbits-data.js's `sub` with this literal. */
export const SUB =
  "Women's health is a relationship measured in decades, and almost all of it happens between visits: well-woman care, the operative journeys, pregnancy, and the long midlife stretch. A women's health orbit is designed backwards from preparedness, attendance, and the documentation that protects your practice.";

/** Segment 0 has no value image - the legacy ternary falls through to "".
 * Preserved: the placeholder caption shows on that tab. */
export const VALUE_SRC: Record<string, string | undefined> = {
  all: undefined,
  maternity: "/images/value-maternity.png",
  gyn: "/images/value-gyn.png",
  midlife: "/images/value-midlife.png",
};

export const TRANSFER_LINE =
  "Each figure below is a published national or multi-system estimate of where adherence sits today, not an outcome measured with an orbit in place. They are the baselines an orbit is built to move.";

/** Ledger row 3, identical on every segment. */
export const DEPLOY_ROW = {
  kicker: "How it deploys",
  t: "Issued from the workflow you already run",
  label: "#2D5A87",
  dot: "#5B9BEA",
  sub: "From the CareOrbit app, a scheduled flat file from any EHR, a patient list, a QR code, or a text message.",
  items: [
    { t: "No new FTEs.", d: "Nothing added to anyone's day." },
    { t: "White-label.", d: "Your brand, your voice." },
    { t: "Live in a quarter.", d: "From kickoff to first patient." },
  ],
};

/** Economics rows 2 and 3, identical on every segment. */
export const ECON_FIXED_ROWS = [
  {
    kicker: "For a group or MSO",
    t: "What it means above the practice level",
    label: "#1F6B73",
    dot: "#4FB3BF",
    sub: "The same orbit, read from the level that owns the contracts and the recruiting.",
    items: [
      {
        t: "More billable services per patient.",
        d: "The screenings and referrals you already order, completed rather than chased.",
      },
      {
        t: "A recruiting and retention argument.",
        d: "Physicians choose groups that hand them a tool their patients notice and their staff does not have to run.",
      },
      {
        t: "Staff support instead of staff load.",
        d: "The orbit answers the repeat questions first, so your team spends its time on the interactions that need a person.",
      },
      {
        t: "Standardization with room to localize.",
        d: "One group-wide orbit, versioned by site, payor, employer, or language, without a separate build for each.",
      },
      {
        t: "Patient-level data you cannot get elsewhere.",
        d: "Who opened what, by location and by clinician, measured against the metrics your contracts pay on.",
      },
    ],
  },
  {
    kicker: "How it scales",
    t: "One build, then versions",
    label: "#2D5A87",
    dot: "#5B9BEA",
    sub: "Expansion is a versioning exercise, not a second implementation.",
    items: [
      {
        t: "Start group-wide.",
        d: "One main orbit relevant to every patient in the group, live before anything is customized.",
      },
      {
        t: "Add journeys on results.",
        d: "Pregnancy, menopause, and operative journeys added where your own numbers say they pay back.",
      },
      {
        t: "Customize per care center.",
        d: "Light content edits per site or provider, turn-key on our side, with no headquarters FTE.",
      },
      {
        t: "One orbit follows her forward.",
        d: "Fertility becomes pregnancy, pregnancy becomes well woman care, with no new build and no new login.",
      },
    ],
  },
];

export const SEGMENTS: WhSegment[] = [
  {
    key: "all",
    label: "All of women's health",
    name: "women’s health",
    line: "The full practice bundle, from the first well-woman visit through menopause and everything a practice runs in between.",
    blurb:
      "Support your women’s health service line with a Women’s Health Department Bundle which gives you orbit versions for patients and families across the whole relationship: a default well-woman orbit that procedure orbits return to, plus the journeys a practice chooses to run separately.",
    headLead:
      "A trusted digital guide your patients keep, from the first visit through",
    headEm: "menopause and beyond",
    intro:
      "Your protocol in your clinicians' own words, delivered when each instruction actually matters. Alongside the visit summary and the on-call line, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps patients informed, reassured, and on track between appointments.",
    gapLead: "The stretch you do not see is",
    gapEm: "most of her life",
    gapIntro:
      "A practice sees a woman for a handful of hours a year across decades of care. The preparation, the recovery, the adherence, and the screening all happen somewhere else. That is the understanding gap, and the figures below are what it costs.",
    gapBridge:
      "None of this is decided in the exam room. Each one turns on whether a patient understood the plan, kept the visit, and recognized the sign that mattered.",
    window: [
      {
        n: "Decades",
        t: "Length of the relationship",
        d: "Women's health is a lifetime service line, not an episode of care.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "A few hours",
        t: "Total contact in a year",
        d: "An annual visit, maybe a procedure, and a handful of follow-ups.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "1 visit",
        t: "Often the only follow-up",
        d: "After a delivery or a procedure, and frequently missed.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "Every day",
        t: "Managed at home",
        d: "Symptoms, preparation, recovery, adherence, and screening, all outside your building.",
        size: "clamp(44px,5vw,62px)",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "She knows what to do",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "A clear understanding of her diagnosis or stage, the plan, and who is caring for her",
          "Visit prep, results guidance, and what to expect next, on the day it applies",
          "Which symptoms mean call us, and which mean go to labor and delivery or the ED",
          "The same guide works for a partner or support person",
        ],
      },
      {
        kicker: "For your team",
        t: "Nothing added to the day",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered from the workflow you already run, no new FTEs",
          "Fewer calls asking what the visit summary already said",
          "Your protocols and your brand, not a generic women's health app",
          "We build and maintain the content, including protocol updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "You can finally see it",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who opened their orbit and who never did, by patient",
          "Symptom and screening responses routed back before the next visit",
          "Engagement and completion by service and by site",
          "Optional: validated measures, including postpartum depression screening, scored automatically",
        ],
      },
    ],
    beginSub:
      "Most practices start with their highest-volume journey and add the rest.",
    beginItems: [
      {
        t: "Well woman care.",
        d: "The default orbit a patient keeps between annual visits.",
      },
      {
        t: "Maternity and fertility.",
        d: "Pregnancy week by week, delivery prep, and the fourth trimester.",
      },
      {
        t: "Procedure support.",
        d: "Hysterectomy, myomectomy, and the operative long tail on one template.",
      },
      {
        t: "Menopause and midlife.",
        d: "Symptoms, therapy options, and long-term risk, explained plainly.",
      },
    ],
    seqSub:
      "The same orbit advances through three versions on its own, with no new app or login.",
    seqItems: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Acquisition",
        tag: "Before they are a patient",
        d: "Screening and referral outreach that helps women choose your practice, plus what symptoms mean and when to be seen.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Active care",
        tag: "Through the pathway",
        d: "Preparation, clearance, logistics, and stage-by-stage guidance in your clinicians' words.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Follow-up and ongoing care with PROMs",
        tag: "After the episode",
        d: "Recovery and maintenance guidance, plus validated measures collected on schedule.",
      },
    ],
    measures: [
      {
        t: "Fewer avoidable readmissions and ED visits",
        d: "The costliest after-discharge failure, and the one that most often follows a sign nobody recognized.",
      },
      {
        t: "Higher follow-up visit attendance",
        d: "The visit where the real clinical decisions get made, and the one most often skipped.",
      },
      {
        t: "Fewer cancelled and rescheduled cases",
        d: "A case that falls off the schedule late is revenue that rarely gets refilled.",
      },
      {
        t: "Earlier recognition of warning signs",
        d: "A patient who calls about a symptom costs a phone call, not an admission.",
      },
      {
        t: "Better screening completion",
        d: "Mammography, cervical, and bone density screening tracked instead of assumed.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is nursing time spent re-explaining what was already covered.",
      },
      {
        t: "Higher PROM completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
      {
        t: "New patient acquisition",
        d: "A branded women's health experience is something few competing practices can show.",
      },
    ],
    money: [
      {
        v: "1 in 5",
        t: "Not up to date on mammography",
        d: "Eighty percent of women aged 50 to 74 are current. Every study that does not happen is a billable service that did not happen either.",
        src: "National Health Interview Survey, 2023 (80.0% up to date).",
      },
      {
        v: "1 in 4",
        t: "Not up to date on cervical screening",
        d: "Three quarters of women aged 21 to 65 are current, and the share has been falling, with knowledge of what is due the barrier most often reported.",
        src: "National Health Interview Survey, 2023 (75.4% up to date).",
      },
      {
        v: "1 in 4",
        t: "Abnormal results without colposcopy in a year",
        d: "The screening was completed and billed. The diagnostic step it existed to trigger was not.",
        src: "Multi-system cohort of 28,706 patients, 2010 to 2018: 75.3% received colposcopy within 12 months.",
      },
      {
        v: "1 in 6",
        t: "Pregnancies with inadequate prenatal care",
        d: "Visits that were scheduled, staffed, and never attended, measured on the adequacy of prenatal care utilization index.",
        src: "NCHS final natality data, 2024 (16.1% of live births).",
      },
    ],
    orbits: [
      {
        t: "Well Woman Care",
        v: "Default orbit, and where procedure orbits evolve",
      },
      {
        t: "Prenatal care and pregnancy support",
        v: "Versions: general and at-risk",
      },
      {
        t: "Family planning",
        v: "Options, preparation, and follow-up",
      },
      {
        t: "Infertility treatment",
        v: "Cycle preparation and expectation setting",
      },
      {
        t: "Hysterectomy",
        v: "Preparation through recovery",
      },
      {
        t: "Myomectomy",
        v: "Preparation through recovery",
      },
      {
        t: "Endometriosis treatment",
        v: "Diagnosis, options, and ongoing management",
      },
      {
        t: "Ovarian cysts",
        v: "Watchful waiting or procedure",
      },
      {
        t: "Minimally invasive surgery",
        v: "Procedure template, versioned per case type",
      },
      {
        t: "Urogynecology",
        v: "Pelvic floor, continence, and prolapse",
      },
      {
        t: "Infection control",
        v: "Treatment adherence and recurrence prevention",
      },
      {
        t: "Menopause management",
        v: "Symptoms, timeline, and what is normal",
      },
      {
        t: "Menopause therapies",
        v: "Options, adherence, and side effect guidance",
      },
      {
        t: "Cancer diligence and screenings",
        v: "Screening adherence and result follow-through",
      },
      {
        t: "Pediatrics",
        v: "Overlaps another specialty",
      },
    ],
    econ: {
      intro:
        "Most of what a practice bills in a year depends on something happening at home: a screening completed, a referral started, a visit kept. An orbit is the only part of your protocol that reaches her there.",
      sub: "Every one of these is a service you already ordered, sitting unbilled because nobody followed through.",
      items: [
        {
          t: "Screening completed, not assumed.",
          d: "Mammography, cervical, and bone density studies finished on schedule instead of deferred to next year.",
        },
        {
          t: "Labs and imaging done as ordered.",
          d: "Preparation understood, the study completed, and the visit the result requires actually booked.",
        },
        {
          t: "Referrals that start.",
          d: "Genetic counseling, pelvic floor therapy, nutrition, and behavioral health that patients accept in clinic and never begin.",
        },
        {
          t: "Visits kept.",
          d: "Annual, post-operative, and follow-up appointments, the slots hardest to refill when they fall late.",
        },
        {
          t: "Value-based measures met.",
          d: "Screening and PROM completion is what the contract pays on, and it is usually chased by hand.",
        },
      ],
    },
    calc: {
      vol: "Women's health patients per year",
      util: "Avoidable readmission or ED visit rate",
      utilCut: "Reduction in avoidable readmissions and ED visits",
      utilCost: "Cost per readmission or ED visit",
      noShow: "Patients who miss a follow-up visit",
      noShowCut: "Reduction in missed follow-up visits",
      revPer: "Revenue per completed follow-up visit",
      rUtil: "Readmission and ED cost avoided",
      rVisit: "Recovered visit revenue",
      visitWord: "follow-up visits",
      doc: "Women's health orbit ROI model",
      csv: "careorbit-womens-health-roi.csv",
      transferNoun: "women's health",
      hintUtilCut: "Modeled. Not a measured women's health result.",
      hintNoShow: "Use your own program's follow-up attendance figure.",
      worked2:
        "Worked on 600 patients a year at a 5% avoidable readmission or ED rate, $12,000 per event, six calls per patient at nine minutes each, and a $45 loaded hourly staff cost. Substitute your own figures and the totals move accordingly.",
      worked:
        "Worked on 600 patients a year at a 5% avoidable readmission or ED rate and $12,000 per event. All of these improvements are modeled assumptions. Every rate and unit cost is a figure you supply.",
    },
  },
  {
    key: "maternity",
    label: "Maternity & fertility",
    name: "maternity",
    line: "Prenatal, postpartum, and the paths into pregnancy, where the plan is carried at home for nine months and then some.",
    blurb:
      "The orbits for getting pregnant, staying informed through pregnancy, and the postpartum weeks nobody is staffed to cover. Versioned general and at-risk.",
    headLead: "A trusted guide she keeps for the whole pregnancy, and the",
    headEm: "weeks after it",
    intro:
      "Your prenatal protocol in your clinicians' own words, delivered the week it applies. Alongside the visit summary and the on-call line, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps her informed, reassured, and reaching you at the right moment.",
    gapLead: "The",
    gapEm: "postpartum weeks",
    gapIntro:
      "Pregnancy is one of the most closely monitored periods in medicine, and then it stops. The patient goes home with a newborn, and the weeks that carry the most risk are the weeks with the least contact. That is the understanding gap, and the figures below are what it costs.",
    gapBridge:
      "None of this is decided in the exam room. Each one turns on whether a patient understood the plan, recognized a warning sign, or knew which questions could wait until the next visit.",
    window: [
      {
        n: "40 weeks",
        t: "Closely monitored",
        d: "Pregnancy is one of the most watched periods in medicine.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "1",
        t: "Postpartum visit",
        d: "Often the only scheduled contact after discharge, and frequently missed.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "6 weeks",
        t: "Highest-risk window",
        d: "When most severe postpartum events occur, at home.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "Every night",
        t: "On their own",
        d: "Feeding, recovery, mood, and warning signs, all outside your building.",
        size: "clamp(44px,5vw,62px)",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "She knows what is normal and what is not",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What is happening this week, why this visit matters, and what comes next",
          "Warning signs named plainly, with the threshold for calling versus going to labor and delivery",
          "Postpartum guidance that keeps arriving after the six-week visit, not before it",
          "The same guide for a partner, a mother, or whoever is actually at home",
        ],
      },
      {
        kicker: "For your team",
        t: "Fewer triage calls, better ones",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered at the first prenatal visit and it runs the rest of the pregnancy",
          "Fewer calls asking what the last visit already covered",
          "Your protocols and your brand, not a consumer pregnancy app",
          "At-risk versions layered on without a separate program to staff",
        ],
      },
      {
        kicker: "For the practice",
        t: "The postpartum window stops being blind",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who is still engaged at 2, 6, and 12 weeks postpartum, by patient",
          "Postpartum depression screening delivered and scored on schedule",
          "Symptom responses routed back before the next visit",
          "Engagement and completion by clinician and by site",
        ],
      },
    ],
    beginSub:
      "Most maternity programs start with prenatal care and extend into the fourth trimester.",
    beginItems: [
      {
        t: "Prenatal care.",
        d: "Pregnancy week by week, in your clinicians' words.",
      },
      {
        t: "Labor and delivery prep.",
        d: "Arrival logistics, pain management options, and what the day involves.",
      },
      {
        t: "Postpartum and newborn.",
        d: "The fourth trimester, feeding, mood, and newborn warning signs.",
      },
      {
        t: "Fertility and family planning.",
        d: "The paths into pregnancy, and the decisions before them.",
      },
    ],
    seqSub:
      "The same orbit advances through three versions on its own, with no new app or login.",
    seqItems: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Planning and first contact",
        tag: "Before they are a patient",
        d: "Fertility and family planning outreach that helps women choose your practice, plus what to do in the first weeks of a pregnancy.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Prenatal and delivery",
        tag: "Through the pregnancy",
        d: "Week-by-week guidance, visit prep, delivery logistics, and the symptoms that mean call now.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Postpartum and newborn with PROMs",
        tag: "The fourth trimester",
        d: "Recovery guidance, feeding and mood support, and validated measures including depression screening collected on schedule.",
      },
    ],
    measures: [
      {
        t: "Fewer postpartum readmissions and ED visits",
        d: "The costliest after-discharge failure, and the one that most often follows a warning sign nobody recognized.",
      },
      {
        t: "Higher postpartum visit attendance",
        d: "The visit where blood pressure, mood, and contraception are actually addressed.",
      },
      {
        t: "Earlier recognition of warning signs",
        d: "A patient who calls about a blood pressure reading costs a phone call, not an admission.",
      },
      {
        t: "Better breastfeeding continuation",
        d: "Support at the moment the question arises rather than at the next appointment.",
      },
      {
        t: "Earlier mood and anxiety detection",
        d: "Screening that reaches the patient at home, when the symptoms are actually present.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is nursing time spent re-explaining what was already covered.",
      },
      {
        t: "Higher PROM and screening completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
      {
        t: "A visible program differentiator",
        d: "A branded maternity experience is something few competing programs can show.",
      },
    ],
    money: [
      {
        v: "1 in 6",
        t: "Pregnancies with inadequate prenatal care",
        d: "Care beginning in the fifth month or later, or fewer than half the recommended visits. Each one is a booked slot that went unused.",
        src: "NCHS final natality data, 2024 (16.1% of live births).",
      },
      {
        v: "7%",
        t: "Late or no prenatal care",
        d: "Care starting in the third trimester or never starting at all, and the share has been rising since 2021.",
        src: "NCHS final natality data, 2023 (7.0% of live births).",
      },
      {
        v: "4 in 10",
        t: "Postpartum visits missed",
        d: "The visit where blood pressure, mood, and contraception are addressed, and where the episode is billed.",
        src: "Published postpartum attendance literature, widest gaps in Medicaid populations. Use your own program's rate.",
      },
      {
        v: "Most",
        t: "Pregnancy-related deaths occur postpartum",
        d: "CDC review committees judge more than 80% of pregnancy-related deaths preventable, and they happen in the weeks with the least contact.",
        src: "CDC Pregnancy Mortality Surveillance System and state maternal mortality review committee findings.",
      },
    ],
    orbits: [
      {
        t: "Prenatal care and pregnancy support",
        v: "Versions: general and at-risk",
      },
      {
        t: "Family planning",
        v: "Options, preparation, and follow-up",
      },
      {
        t: "Infertility treatment",
        v: "Cycle preparation and expectation setting",
      },
      {
        t: "Pediatrics",
        v: "Overlaps another specialty",
      },
    ],
    econ: {
      intro:
        "A maternity episode is billed across dozens of touchpoints, and nearly all of them depend on a patient who arrives prepared. An orbit is the part of the program that reaches her between them.",
      sub: "Every one of these is care you already planned, sitting unbilled because the visit was missed or the preparation was not done.",
      items: [
        {
          t: "The prenatal schedule kept.",
          d: "Each visit understood as part of a plan rather than an appointment to move when the week gets hard.",
        },
        {
          t: "Screening and testing completed on time.",
          d: "Glucose tolerance, anatomy scan, and genetic screening done inside the window they belong in.",
        },
        {
          t: "The postpartum visit attended.",
          d: "Blood pressure, mood, and contraception addressed in a billable visit instead of an ED presentation.",
        },
        {
          t: "Depression screening delivered and scored.",
          d: "Collected on schedule and documented, rather than skipped for time.",
        },
        {
          t: "Lactation and support services used.",
          d: "Consults and classes offered at every delivery, started by a fraction of the patients who need them.",
        },
      ],
    },
    calc: {
      vol: "Deliveries or maternity patients per year",
      util: "Postpartum readmission or ED visit rate",
      utilCut: "Reduction in postpartum readmissions and ED visits",
      utilCost: "Cost per postpartum readmission or ED visit",
      noShow: "Patients who miss the postpartum visit",
      noShowCut: "Reduction in missed postpartum visits",
      revPer: "Revenue per completed postpartum visit",
      rUtil: "Readmission and ED cost avoided",
      rVisit: "Recovered visit revenue",
      visitWord: "postpartum visits",
      doc: "Maternal health orbit ROI model",
      csv: "careorbit-maternity-roi.csv",
      transferNoun: "maternity",
      hintUtilCut: "Modeled. Not a measured maternity result.",
      hintNoShow:
        "Attendance gaps are well documented, and widest in Medicaid populations.",
      worked2:
        "Worked on 600 patients a year at a 5% postpartum readmission or ED rate, $12,000 per event, six calls per patient at nine minutes each, and a $45 loaded hourly staff cost. Substitute your own figures and the totals move accordingly.",
      worked:
        "Worked on 600 patients a year at a 5% postpartum readmission or ED rate and $12,000 per event. All of these improvements are modeled assumptions. Every rate and unit cost is a figure you supply.",
    },
  },
  {
    key: "gyn",
    label: "Gynecology & surgery",
    name: "gynecology",
    line: "Well-woman care and the operative journeys, where preparation decides whether a case happens on the day it was booked.",
    blurb:
      "A default well-woman orbit that procedure orbits return to, plus named orbits for the high-volume operative journeys and a template for the rest.",
    headLead: "Preparation and recovery she can follow, on the day",
    headEm: "each step matters",
    intro:
      "Your operative protocol in your surgeons' own words, released one instruction at a time. Alongside the pre-op packet and the nurse call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that gets her to the day prepared and through recovery without guessing.",
    gapLead: "Weeks of preparation inside",
    gapEm: "one operative day",
    gapIntro:
      "A gynecologic procedure is decided in one visit, prepared for alone at home over weeks, and recovered from alone at home over more. The clinic sees a sliver of it. That is the understanding gap, and the figures below are what it costs.",
    gapBridge:
      "None of this is decided in the operating room. Each one turns on whether a patient followed the preparation, arrived ready, and recognized the sign that mattered afterward.",
    window: [
      {
        n: "Weeks",
        t: "Between booking and surgery",
        d: "Preparation, clearance, and medication changes happen entirely at home.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "1 call",
        t: "Often the only prep contact",
        d: "Delivered once, days before, to a patient who is anxious and not writing it down.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "6 weeks",
        t: "Typical recovery window",
        d: "Where restrictions, complications, and most of the questions actually land.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "Every day",
        t: "Managed at home",
        d: "Preparation, medications, restrictions, and warning signs, all outside your building.",
        size: "clamp(44px,5vw,62px)",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "She arrives ready on the day",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What the procedure is, why it was recommended, and what the alternatives were",
          "Every preparation instruction delivered on the day it has to be done, not all at once",
          "Recovery expectations week by week, with the signs that warrant a call",
          "The same guide works for whoever is driving her home",
        ],
      },
      {
        kicker: "For your team",
        t: "Fewer cancellations to rebook",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered when the case is booked, running until the post-op visit",
          "Fewer calls about prep, and fewer day-of surprises",
          "Your protocols and your brand, not a generic surgery handout",
          "One procedure template versions the long tail of case types",
        ],
      },
      {
        kicker: "For the practice",
        t: "The schedule holds",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who completed preparation and who never opened it, before the day",
          "Cancellation and rebooking patterns visible by case type",
          "PROMs collected before and after without coordinator time",
          "Engagement and completion by surgeon and by site",
        ],
      },
    ],
    beginSub:
      "Most practices start with their highest-volume operative journey and template the rest.",
    beginItems: [
      {
        t: "Well woman care.",
        d: "The default orbit a patient keeps between annual visits.",
      },
      {
        t: "Hysterectomy and myomectomy.",
        d: "The high-volume journeys, preparation through recovery.",
      },
      {
        t: "A procedure template.",
        d: "The operative long tail, versioned with minor edits per case type.",
      },
      {
        t: "Urogynecology.",
        d: "Pelvic floor, continence, and prolapse, before and after intervention.",
      },
    ],
    seqSub:
      "The same orbit advances through three versions on its own, with no new app or login.",
    seqItems: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Decision and consent",
        tag: "Before the case is booked",
        d: "What the condition is, what the options were, and what the procedure involves, so consent is understood rather than signed.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Preparation and day of surgery",
        tag: "Through the operative window",
        d: "Clearance, medication changes, fasting, and arrival logistics, each released on the day it has to be done.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Recovery and follow-up with PROMs",
        tag: "After the case",
        d: "Week-by-week restrictions and recovery guidance, warning signs, and validated measures collected on schedule.",
      },
    ],
    measures: [
      {
        t: "Fewer cancelled and rescheduled cases",
        d: "A case that falls off the schedule late is revenue that rarely gets refilled.",
      },
      {
        t: "Fewer day-of surprises",
        d: "Fasting, medication, and clearance failures that only surface when the patient arrives.",
      },
      {
        t: "Fewer readmissions and ED visits",
        d: "The costliest post-operative failure, and the one that most often follows a sign nobody recognized.",
      },
      {
        t: "Higher post-op visit attendance",
        d: "The visit where healing, restrictions, and pathology results are actually reviewed.",
      },
      {
        t: "Fewer inbound calls per case",
        d: "Every repeat call is nursing time spent re-explaining what the packet already said.",
      },
      {
        t: "Higher PROM completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
      {
        t: "Better documented consent and instruction",
        d: "A record that the patient received and opened the guidance, which protects the practice.",
      },
      {
        t: "New patient acquisition",
        d: "Patients choose surgeons on experience as much as outcome, and reviews say so.",
      },
    ],
    money: [
      {
        v: "7 in 10",
        t: "Day-of-surgery cancellations judged avoidable",
        d: "Incomplete evaluation, missing clearance, and patients who did not arrive. An operating room hour lost late is rarely refilled.",
        src: "Single-center and multicenter day-of-surgery cancellation audits (71.6% and 74% avoidable).",
      },
      {
        v: "Up to 24%",
        t: "Reported day-of-surgery cancellation rates",
        d: "Published rates range widely by setting and specialty. The avoidable share is the part preparation can move.",
        src: "Published day-of-surgery cancellation series, 1.96% to 24%.",
      },
      {
        v: "1 in 4",
        t: "Abnormal results without colposcopy in a year",
        d: "The diagnostic and operative work an abnormal result should trigger, never scheduled.",
        src: "Multi-system cohort of 28,706 patients, 2010 to 2018: 75.3% received colposcopy within 12 months.",
      },
      {
        v: "[Your rate]",
        t: "Post-operative visits missed",
        d: "[Placeholder: your own figure] Attendance after a gynecologic procedure varies too much by case type and payer mix for a national number to mean anything.",
        src: "No national benchmark. Supply your own rate in the calculator below.",
      },
    ],
    orbits: [
      {
        t: "Well Woman Care",
        v: "Default orbit, and where procedure orbits evolve",
      },
      {
        t: "Hysterectomy",
        v: "Preparation through recovery",
      },
      {
        t: "Myomectomy",
        v: "Preparation through recovery",
      },
      {
        t: "Endometriosis treatment",
        v: "Diagnosis, options, and ongoing management",
      },
      {
        t: "Ovarian cysts",
        v: "Watchful waiting or procedure",
      },
      {
        t: "Minimally invasive surgery",
        v: "Procedure template, versioned per case type",
      },
      {
        t: "Urogynecology",
        v: "Pelvic floor, continence, and prolapse",
      },
      {
        t: "Infection control",
        v: "Treatment adherence and recurrence prevention",
      },
    ],
    econ: {
      intro:
        "An operative case is only revenue if it happens on the day it was booked and the follow-through after it holds. Both are decided at home, weeks before and weeks after.",
      sub: "Every one of these is scheduled revenue that turns on what a patient did at home.",
      items: [
        {
          t: "Clearance and pre-op testing completed.",
          d: "Labs, imaging, and medical clearance finished in time rather than surfacing as a cancellation the day before.",
        },
        {
          t: "Cases held on the schedule.",
          d: "A case that falls off late is an operating room hour that rarely gets refilled.",
        },
        {
          t: "Post-operative visits attended.",
          d: "Where healing, restrictions, and pathology results get reviewed, and where the visit gets billed.",
        },
        {
          t: "Referrals that start.",
          d: "Pelvic floor therapy, urogynecology, and behavioral health that patients accept in clinic and never begin.",
        },
        {
          t: "Surveillance kept current.",
          d: "Imaging and screening intervals tracked instead of assumed once the episode closes.",
        },
      ],
    },
    calc: {
      vol: "Gynecologic cases per year",
      util: "Post-operative readmission or ED visit rate",
      utilCut: "Reduction in readmissions and ED visits",
      utilCost: "Cost per readmission or ED visit",
      noShow: "Cases cancelled or post-op visits missed",
      noShowCut: "Reduction in cancellations and missed visits",
      revPer: "Revenue per recovered case or visit",
      rUtil: "Readmission and ED cost avoided",
      rVisit: "Recovered case and visit revenue",
      visitWord: "cases and visits",
      doc: "Gynecologic surgery orbit ROI model",
      csv: "careorbit-gynecology-roi.csv",
      transferNoun: "gynecologic surgery",
      hintUtilCut: "Modeled. Not a measured gynecologic surgery result.",
      hintNoShow: "Use your own cancellation and post-op attendance figures.",
      worked2:
        "Worked on 600 cases a year at a 5% post-operative readmission or ED rate, $12,000 per event, six calls per case at nine minutes each, and a $45 loaded hourly staff cost. Substitute your own figures and the totals move accordingly.",
      worked:
        "Worked on 600 cases a year at a 5% post-operative readmission or ED rate and $12,000 per event. All of these improvements are modeled assumptions. Every rate and unit cost is a figure you supply.",
    },
  },
  {
    key: "midlife",
    label: "Menopause & midlife",
    name: "midlife",
    line: "The decade most practices touch twice a year, where symptoms, therapy adherence, and screening all run at home.",
    blurb:
      "Orbits for the midlife stretch: what is happening and why, which therapies exist, and the screenings that keep getting deferred.",
    headLead: "A guide for the decade your practice only sees",
    headEm: "twice a year",
    intro:
      "Your guidance in your clinicians' own words, delivered as symptoms and decisions actually arrive. Alongside the visit summary and the patient portal, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps her informed, on therapy, and current on screening.",
    gapLead: "A decade of decisions, and",
    gapEm: "two visits a year",
    gapIntro:
      "Perimenopause and menopause run for years. The therapy decision, the side effect at week three, and the screening that keeps getting deferred all happen between annual visits. That is the understanding gap, and the figures below are what it costs.",
    gapBridge:
      "None of this is decided in the exam room. Each one turns on whether a patient understood what was happening, stayed on the therapy, and kept the screening she was due for.",
    window: [
      {
        n: "Years",
        t: "How long the transition lasts",
        d: "Menopause is managed over years, not settled at one appointment.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "2 visits",
        t: "Typical contact in a year",
        d: "A well-woman visit, and perhaps one follow-up.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "1 conversation",
        t: "Where therapy is decided",
        d: "Explained once in clinic, then revisited alone for years.",
        size: "clamp(34px,3.6vw,46px)",
      },
      {
        n: "Every day",
        t: "Managed at home",
        d: "Symptoms, therapy adherence, and the screenings that keep getting deferred, all outside your building.",
        size: "clamp(44px,5vw,62px)",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "She knows what is happening and why",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What perimenopause and menopause actually do, in plain language and without alarm",
          "Which symptoms are expected, which are treatable, and which warrant a visit",
          "What each therapy option involves, and what to do when a side effect shows up",
          "Screening reminders that arrive when the window opens, not a year later",
        ],
      },
      {
        kicker: "For your team",
        t: "The questions arrive answered",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered at a well-woman visit and it works for the next decade",
          "Fewer calls relitigating a therapy conversation already had in clinic",
          "Your protocols and your brand, not whatever she found online",
          "We build and maintain the content, including guideline updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "Adherence and screening, visible",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who is still on therapy at 3, 6, and 12 months, by patient",
          "Screening completion tracked instead of assumed",
          "Symptom responses routed back before the next visit",
          "Engagement and completion by clinician and by site",
        ],
      },
    ],
    beginSub:
      "Most practices start with menopause management and add therapy support alongside it.",
    beginItems: [
      {
        t: "Menopause management.",
        d: "What is happening, what is normal, and what is treatable.",
      },
      {
        t: "Menopause therapies.",
        d: "Options, adherence, and what to do when a side effect shows up.",
      },
      {
        t: "Cancer diligence and screenings.",
        d: "Due dates, preparation, and following through on a result.",
      },
      {
        t: "Urogynecology.",
        d: "Pelvic floor, continence, and prolapse, before and after intervention.",
      },
    ],
    seqSub:
      "The same orbit advances through three versions on its own, with no new app or login.",
    seqItems: [
      {
        v: "01",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(79,179,191,.55)",
        line: true,
        t: "Recognition",
        tag: "Before she raises it",
        d: "What perimenopause looks like, why it is happening, and which symptoms are worth a visit rather than an internet search.",
      },
      {
        v: "02",
        cBorder: "rgba(79,179,191,.5)",
        cBg: "rgba(79,179,191,.1)",
        cFg: "#1F6B73",
        cLine: "rgba(227,115,92,.45)",
        line: true,
        t: "Decision and start of therapy",
        tag: "The first months",
        d: "Options explained in your clinicians' words, what to expect in the first weeks, and which side effects warrant a call rather than stopping.",
      },
      {
        v: "03",
        cBorder: "rgba(227,115,92,.5)",
        cBg: "rgba(227,115,92,.1)",
        cFg: "#A8412F",
        cLine: "rgba(79,179,191,.55)",
        line: false,
        t: "Maintenance and screening with PROMs",
        tag: "The long stretch",
        d: "Adherence support, long-term risk guidance, screening reminders, and validated measures collected on schedule.",
      },
    ],
    measures: [
      {
        t: "Higher therapy continuation",
        d: "Most discontinuation happens early and quietly, over a side effect nobody was warned about.",
      },
      {
        t: "Better screening completion",
        d: "Mammography, cervical, and bone density screening tracked instead of assumed.",
      },
      {
        t: "Fewer avoidable urgent and ED visits",
        d: "A symptom understood at home is a phone call, not an unscheduled visit.",
      },
      {
        t: "Higher annual visit attendance",
        d: "The visit where risk, therapy, and screening all actually get addressed.",
      },
      {
        t: "Fewer inbound calls per patient",
        d: "Every repeat call is clinical time spent re-explaining a conversation already had.",
      },
      {
        t: "Earlier mood and sleep detection",
        d: "Screening that reaches the patient at home, when the symptoms are actually present.",
      },
      {
        t: "Higher PROM completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
      {
        t: "New patient acquisition",
        d: "Midlife care is under-served, and a practice that handles it well gets talked about.",
      },
    ],
    money: [
      {
        v: "35–40%",
        t: "Never return for a second prescription",
        d: "Of women starting menopausal hormone therapy, this share does not refill once. Most of it is a side effect nobody prepared them for.",
        src: "Retrospective prescription database of 1,532 women, Menopause, 2018.",
      },
      {
        v: "76–81%",
        t: "Stop therapy within three years",
        d: "Every discontinuation takes the follow-up visits, the refills, and the monitoring with it.",
        src: "Retrospective prescription database of 1,532 women, Menopause, 2018.",
      },
      {
        v: "1 in 5",
        t: "Not up to date on mammography",
        d: "Eighty percent of women aged 50 to 74 are current. The remainder is screening you recommended and never billed.",
        src: "National Health Interview Survey, 2023 (80.0% up to date).",
      },
      {
        v: "1 in 4",
        t: "Not up to date on cervical screening",
        d: "Three quarters of women aged 21 to 65 are current, and the share has been falling year over year.",
        src: "National Health Interview Survey, 2023 (75.4% up to date).",
      },
    ],
    orbits: [
      {
        t: "Menopause management",
        v: "Symptoms, timeline, and what is normal",
      },
      {
        t: "Menopause therapies",
        v: "Options, adherence, and side effect guidance",
      },
      {
        t: "Cancer diligence and screenings",
        v: "Screening adherence and result follow-through",
      },
      {
        t: "Urogynecology",
        v: "Pelvic floor, continence, and prolapse",
      },
    ],
    econ: {
      intro:
        "Midlife care is a decade of small, recurring, billable services, and every one of them depends on a patient who still understood the plan months after the conversation.",
      sub: "Every one of these is care you already recommended, sitting unbilled because the follow-through happened where you cannot see it.",
      items: [
        {
          t: "Therapy continued past month three.",
          d: "Most discontinuation is quiet and early, and it takes the follow-up visits and refills with it.",
        },
        {
          t: "Screening completed on schedule.",
          d: "Mammography, cervical, and bone density studies finished rather than deferred to the next annual.",
        },
        {
          t: "Labs and cardiovascular risk work completed.",
          d: "Ordered at the visit, done in the window, and followed by the visit the result requires.",
        },
        {
          t: "Referrals that start.",
          d: "Pelvic floor therapy, urogynecology, nutrition, and behavioral health that patients accept and never begin.",
        },
        {
          t: "The annual visit kept.",
          d: "The one appointment where risk, therapy, and screening all get addressed at once.",
        },
      ],
    },
    calc: {
      vol: "Midlife patients per year",
      util: "Avoidable urgent or ED visit rate",
      utilCut: "Reduction in avoidable urgent and ED visits",
      utilCost: "Cost per avoidable visit",
      noShow: "Patients who miss an annual or screening visit",
      noShowCut: "Reduction in missed annual and screening visits",
      revPer: "Revenue per completed visit",
      rUtil: "Avoidable visit cost avoided",
      rVisit: "Recovered visit revenue",
      visitWord: "annual and screening visits",
      doc: "Menopause and midlife orbit ROI model",
      csv: "careorbit-midlife-roi.csv",
      transferNoun: "menopause and midlife",
      hintUtilCut: "Modeled. Not a measured midlife result.",
      hintNoShow: "Use your own annual and screening attendance figures.",
      worked2:
        "Worked on 600 patients a year at a 5% avoidable urgent or ED visit rate, $12,000 per event, six calls per patient at nine minutes each, and a $45 loaded hourly staff cost. Substitute your own figures and the totals move accordingly.",
      worked:
        "Worked on 600 patients a year at a 5% avoidable urgent or ED visit rate and $12,000 per event. All of these improvements are modeled assumptions. Every rate and unit cost is a figure you supply.",
    },
  },
];

/** Shown by the "View sources" disclosure. Legacy: sourcesList. */
export const SOURCES: string[] = [
  "National Health Interview Survey, 2023: 80.0% of women aged 50 to 74 up to date with breast cancer screening and 75.4% of women aged 21 to 65 up to date with cervical cancer screening.",
  "Time-to-colposcopy across three US health systems, 28,706 patients with an abnormal cervical result, 2010 to 2018: 75.3% received colposcopy within 12 months, with site estimates from 70.0% to 83.0%.",
  "National Center for Health Statistics final natality data: 16.1% of 2024 live births to women receiving inadequate prenatal care on the Adequacy of Prenatal Care Utilization Index, and 7.0% of 2023 live births to women receiving late or no prenatal care.",
  "CDC Pregnancy Mortality Surveillance System: the majority of pregnancy-related deaths occur in the postpartum period, and state maternal mortality review committees judge more than 80% of pregnancy-related deaths preventable.",
  "Postpartum visit attendance is incomplete across published series, with the widest gaps in Medicaid-covered populations. The 40% default is a placeholder for your own rate.",
  "Menopausal hormone therapy continuation, retrospective prescription database of 1,532 women, Menopause, 2018: 35% to 40% did not return for a refill and 76% to 81% stopped therapy within three years.",
  "Day-of-surgery cancellation audits report overall rates from about 2% to 24%, with 71.6% and 74% of cancellations judged potentially avoidable in single-center and multicenter series.",
  "CareOrbit has no published women's health outcome data. Every reduction in the model below is an assumption you set, not a measured CareOrbit result.",
  "Rates, unit costs, call volume, and staff cost are supplied by the user. CareOrbit makes no claim about those values.",
  "Dollar figures on this page are arithmetic applying the percentages entered to the volumes and unit costs entered. They are illustrations, not guarantees.",
];

/* ------------------------------------------------------- ROI calculator -- */

/* The model is the three-lever one shared with Behavioral Health,
 * Medication Therapy and Surgical Support; see lib/orbitRoi.ts. Only the
 * defaults and the labels are specific to this page. */
export type CalcKey = OrbitCalcKey;
export type CalcState = OrbitCalcState;

/** Prefilled defaults, and what "Load published figures" restores.
 * Legacy: state.calc and `benchmarks` (identical values). */
export const BENCHMARKS: CalcState = {
  volume: "600",
  utilRate: "5",
  utilCut: "20",
  utilCost: "12000",
  calls: "6",
  callCut: "53",
  minutes: "9",
  staffRate: "45",
  noShow: "40",
  noShowCut: "20",
  revPer: "250",
};

export const EMPTY_CALC = EMPTY_ORBIT_CALC;

/** Field definitions. Five labels and two hints come from the active
 * segment; the rest are fixed. Legacy: the calcFields array. */
export function calcFields(seg: WhSegment) {
  const c = seg.calc;
  return [
    {
      k: "volume",
      label: c.vol,
      ph: "e.g. 600",
      step: "10",
      prefix: "",
      suffix: "patients",
      hint: "The population an orbit would be issued to",
    },
    {
      k: "utilRate",
      label: c.util,
      ph: "e.g. 5",
      step: "0.5",
      prefix: "",
      suffix: "%",
      hint: "Use your own program\u2019s figure",
    },
    {
      k: "utilCut",
      label: c.utilCut,
      ph: "e.g. 20",
      step: "1",
      prefix: "",
      suffix: "%",
      hint: c.hintUtilCut,
    },
    {
      k: "utilCost",
      label: c.utilCost,
      ph: "e.g. 12000",
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
      hint: "Questions to the nursing line between visits",
    },
    {
      k: "callCut",
      label: "Reduction in inbound calls",
      ph: "e.g. 53",
      step: "1",
      prefix: "",
      suffix: "%",
      hint: "Modeled assumption. Replace it with your own figure.",
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
      hint: "Nurse or navigator wage plus benefits",
    },
    {
      k: "noShow",
      label: c.noShow,
      ph: "e.g. 40",
      step: "1",
      prefix: "",
      suffix: "%",
      hint: c.hintNoShow,
    },
    {
      k: "noShowCut",
      label: c.noShowCut,
      ph: "e.g. 20",
      step: "1",
      prefix: "",
      suffix: "%",
      hint: "Modeled assumption. Set it to 0 to leave it out.",
    },
    {
      k: "revPer",
      label: c.revPer,
      ph: "e.g. 250",
      step: "25",
      prefix: "$",
      suffix: "",
      hint: "Your own contracted rate",
    },
  ];
}

/** Result labels; three of the six strings come from the active segment. */
export function computeRoi(v: CalcState, seg: WhSegment) {
  return computeOrbitRoi(v, {
    utilTitle: seg.calc.rUtil,
    utilTail: "events a year prevented at the rate and cost you entered.",
    callTitle: "Nursing time returned",
    callTail: "hours a year back to clinical work instead of the phone.",
    visitTitle: seg.calc.rVisit,
    visitTail: seg.calc.visitWord + " a year kept instead of missed.",
  });
}
