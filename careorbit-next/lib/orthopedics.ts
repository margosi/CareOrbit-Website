/* Orthopedics segment copy. Extracted verbatim from
 * v2-maven/OrthopedicsPage.dc.html lines 312-507 (ORTHO_SEGMENTS).
 *
 * As on Cardiology, renderVals() returned a generic key set first and the
 * segment-derived set second; only the second was ever rendered, because a
 * later key wins in an object literal. The generic set (features, benefits,
 * versions, calcFields, calcResults, sourcesList, deploy, money) is dead
 * code on this page and is not ported - no markup reads it and the
 * #roi-calculator / [data-feat-block] elements it feeds do not exist here.
 */

export type OrthoWindowStat = {
  n: string;
  t: string;
  d: string;
  /** The fourth stat is set in a larger size. Legacy: w.hero. */
  hero?: boolean;
};
export type Measure = { t: string; d: string };
export type CatalogItem = { t: string; v: string };
export type BeginItem = { t: string; d: string };
export type PovSide = { t: string; items: string[] };

export type OrthoSegment = {
  label: string;
  line: string;
  headLead: string;
  headEm: string;
  intro: string;
  gapLead: string;
  gapEm: string;
  gapIntro: string;
  gapBridge: string;
  libIntro: string;
  window: OrthoWindowStat[];
  catalog: CatalogItem[];
  beginSub: string;
  beginItems: BeginItem[];
  measures: Measure[];
  povPat: PovSide;
  povTeam: PovSide;
  pov3: PovSide;
};

/** Per-segment value image. Legacy: valueSrc ternary in renderVals(). */
export const VALUE_SRC = [
  "/images/value-ortho-all.webp",
  "/images/value-ortho-joint.webp",
  "/images/value-ortho-sports.webp",
  "/images/value-ortho-spine.webp",
];

/** Live oncology quotes, shown on every segment. Legacy: quotes. */
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

/** Ledger row 2: the stepped sequence. Identical on every segment. */
export const EVOLVE_ROW = {
  kicker: "A patient’s orbit can evolve as their journey needs change",
  t: "One orbit supports the full journey, adapting as needs change",
  label: "#1F6B73",
  dot: "#4FB3BF",
  sub: "The same orbit advances through three versions on its own, with no new app or login for the patient.",
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
      d: "Seminar, screening, and referral outreach that helps people choose your practice, plus what is causing the pain and when a procedure is warranted.",
    },
    {
      v: "02",
      cBorder: "rgba(79,179,191,.5)",
      cBg: "rgba(79,179,191,.1)",
      cFg: "#1F6B73",
      cLine: "rgba(227,115,92,.45)",
      line: true,
      t: "Procedure support",
      tag: "Consult through procedure week",
      d: "Prehab, clearance, logistics, and day-of instructions, delivered week by week instead of handed over in a packet.",
    },
    {
      v: "03",
      cBorder: "rgba(227,115,92,.5)",
      cBg: "rgba(227,115,92,.1)",
      cFg: "#A8412F",
      cLine: "rgba(79,179,191,.55)",
      line: false,
      t: "Recovery with PROMs",
      tag: "Home through return to activity",
      d: "Weight-bearing, bracing, pain step-down, the home program, and validated measures collected on schedule.",
    },
  ],
};

/** Ledger row 3. Identical on every segment. */
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

export const ORTHO_SEGMENTS: OrthoSegment[] = [
  {
    label: "All of orthopedics",
    line: "The whole practice, from the first consult through return to activity, across joints, sports, and spine.",
    headLead:
      "A trusted digital guide your patients keep, from consult through full recovery, with PROMs that",
    headEm: "collect themselves",
    intro:
      "Your protocol in your surgeons' own words, delivered when each instruction actually matters. Alongside the handout at discharge and the therapy referral, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps patients prepared, motivated, and doing the exercises between visits.",
    gapLead: "Four visits inside a",
    gapEm: "120-day journey",
    gapIntro:
      "Those four visits carry the clinical decisions. Everything else, the exercises, the brace, the pain plan, and every judgment about what is normal, is handled at home by a patient working from memory. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of these days are billable, and none of them are staffed. A cancelled case, an unfinished home program, a brace worn wrong, or a call that becomes an ED visit all happen here, in the stretch between appointments.",
    libIntro:
      "Support your orthopedic service line with an Orthopedics Department Bundle which gives you 18 procedure orbit versions for patients and families, plus injection, sports, and activity orbits and a template for everything else, supporting the specifics of procedures like these:",
    window: [
      {
        n: "4",
        t: "Visits with you",
        d: "One initial consult, then two or three follow-ups.",
      },
      {
        n: "120 days",
        t: "Length of the episode",
        d: "From the first consult through return to activity.",
      },
      {
        n: "2 weeks",
        t: "Between each visit",
        d: "Long enough for instructions to fade and a program to quietly stop.",
      },
      {
        n: "116",
        t: "Days on their own",
        d: "Where the exercises, the brace, and every recovery decision actually happen.",
        hero: true,
      },
    ],
    catalog: [
      {
        t: "ACL reconstruction",
        v: "",
      },
      {
        t: "Hip replacement",
        v: "",
      },
      {
        t: "Knee replacement",
        v: "",
      },
      {
        t: "Shoulder replacement",
        v: "",
      },
      {
        t: "Joint replacement",
        v: "",
      },
      {
        t: "Arthroscopy",
        v: "",
      },
      {
        t: "Knee arthroscopy",
        v: "",
      },
      {
        t: "Hip arthroscopy",
        v: "",
      },
      {
        t: "Spinal surgery",
        v: "",
      },
      {
        t: "Spinal fusion",
        v: "",
      },
      {
        t: "Rotator cuff repair",
        v: "",
      },
      {
        t: "Shoulder surgery",
        v: "",
      },
      {
        t: "Foot and ankle surgery",
        v: "",
      },
      {
        t: "Carpal tunnel surgery",
        v: "",
      },
      {
        t: "Hand surgery",
        v: "",
      },
      {
        t: "Osteotomy",
        v: "",
      },
      {
        t: "Arthroplasty",
        v: "",
      },
      {
        t: "Joint fusion",
        v: "",
      },
      {
        t: "Injections",
        v: "12+ varieties; one orbit or individualized",
      },
      {
        t: "Sports / performance plan",
        v: "Versions: individual + team. Patient and outreach.",
      },
      {
        t: "Healthy Activity",
        v: "Versions: general + senior. Patient and outreach.",
      },
    ],
    beginSub:
      "Most practices start with their highest-volume procedure. All four run as one guide the patient keeps.",
    beginItems: [
      {
        t: "Procedure support.",
        d: "Joint replacement, ACL, rotator cuff, spine, arthroscopy.",
      },
      {
        t: "Therapy adherence.",
        d: "The home program, week by week, with PROMs on schedule.",
      },
      {
        t: "Nonoperative care.",
        d: "Injections and conservative management before surgery is on the table.",
      },
      {
        t: "Activity and outreach.",
        d: "Seminars, screenings, and sports or senior activity plans.",
      },
    ],
    measures: [
      {
        t: "Fewer cancellations and delays",
        d: "A cancelled case is operating room time you cannot get back. Prepared patients keep the schedule intact.",
      },
      {
        t: "Higher therapy protocol adherence",
        d: "Adherence is what separates a good surgical result from a good functional one.",
      },
      {
        t: "Fewer avoidable readmissions and ED visits",
        d: "The most expensive way to answer a question a patient could have had answered at home.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is staff time spent re-explaining what was already covered.",
      },
      {
        t: "Higher PROM completion rates",
        d: "Bundled and value-based programs pay on documented outcomes. Missing scores are unbilled work.",
      },
      {
        t: "Correct equipment use at home",
        d: "Brace and weight-bearing errors cause the revisions and delays that erase an episode's margin.",
      },
      {
        t: "Stronger referral and review volume",
        d: "A guided recovery is the cheapest patient acquisition a practice has.",
      },
      {
        t: "A visible practice differentiator",
        d: "A branded recovery experience is something few competitors in the market can show.",
      },
    ],
    povPat: {
      t: "They know what to do",
      items: [
        "A clear understanding of their procedure, their surgeon, and what recovery will ask of them",
        "Prehab, clearance, and day-of instructions, on the day they apply",
        "Their home exercise program week by week, with reminders that keep it going",
        "Which symptoms mean call us, and which mean go to the ED",
      ],
    },
    povTeam: {
      t: "Nothing added to the day",
      items: [
        "Ordered from the workflow you already run, no new FTEs",
        "Fewer calls asking what the discharge sheet already said",
        "Each surgeon's protocol, not a generic recovery app",
        "We build and maintain the content, including protocol updates",
      ],
    },
    pov3: {
      t: "You can finally see it",
      items: [
        "Who opened their orbit and who never did, by patient",
        "Adherence and symptom check-ins routed back before the next visit",
        "PROM completion by procedure, surgeon, and site",
        "Optional: validated measures scored automatically",
      ],
    },
  },
  {
    label: "Joint replacement",
    line: "Hip, knee, and shoulder arthroplasty, where the episode is scored on documented outcomes and a late cancellation costs a block you cannot resell.",
    headLead:
      "Prehab, recovery, and PROMs on one guide the patient keeps through",
    headEm: "the whole episode",
    intro:
      "Each surgeon's arthroplasty protocol in their own words, delivered when each instruction actually matters. Alongside the joint class and the therapy referral, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps patients prepared, moving, and answering the measures the episode is scored on.",
    gapLead: "Ninety days of episode, and",
    gapEm: "a handful of visits",
    gapIntro:
      "The episode runs for ninety days. You see the patient for four of them. Prehab, weight-bearing, the home program, and every judgment about what is normal happen at home, and they are what the episode gets scored on. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of these days are billable, and none of them are staffed. A cancelled case, an unfinished home program, a brace worn wrong, or a call that becomes an ED visit all happen here, inside the window you are accountable for.",
    libIntro:
      "The arthroplasty orbits, plus the injection and activity orbits that carry a patient before the case and after it. Each one runs the surgeon's own protocol.",
    window: [
      {
        n: "4",
        t: "Visits with you",
        d: "One initial consult, then two or three follow-ups.",
      },
      {
        n: "90 days",
        t: "Length of the episode",
        d: "The window a bundled or value-based program is scored on.",
      },
      {
        n: "2 weeks",
        t: "Between each visit",
        d: "Long enough for instructions to fade and a program to quietly stop.",
      },
      {
        n: "86",
        t: "Days on their own",
        d: "Where the exercises, the weight-bearing, and every recovery decision actually happen.",
        hero: true,
      },
    ],
    catalog: [
      {
        t: "Hip replacement",
        v: "",
      },
      {
        t: "Knee replacement",
        v: "",
      },
      {
        t: "Shoulder replacement",
        v: "",
      },
      {
        t: "Joint replacement",
        v: "",
      },
      {
        t: "Arthroplasty",
        v: "",
      },
      {
        t: "Joint fusion",
        v: "",
      },
      {
        t: "Osteotomy",
        v: "",
      },
      {
        t: "Injections",
        v: "Conservative management before a case is booked",
      },
      {
        t: "Healthy Activity",
        v: "Versions: general + senior. Patient and outreach.",
      },
    ],
    beginSub:
      "Most practices start with their highest-volume joint and template the second one.",
    beginItems: [
      {
        t: "Decision and prehab.",
        d: "What the joint class covers, plus the weeks of preparation after it.",
      },
      {
        t: "Day of surgery.",
        d: "Arrival, fasting, transportation, and what the day will feel like.",
      },
      {
        t: "Home recovery.",
        d: "Weight-bearing, wound care, and the pain step-down, week by week.",
      },
      {
        t: "PROMs on schedule.",
        d: "Functional measures collected at protocol intervals, scored automatically.",
      },
    ],
    measures: [
      {
        t: "Fewer cancellations and delays",
        d: "A cancelled arthroplasty is block time you cannot resell. Prepared patients keep the schedule intact.",
      },
      {
        t: "Higher PROM completion rates",
        d: "Functional-status scores are how the outcome measure gets reported, and missing scores are unbilled work.",
      },
      {
        t: "Higher therapy protocol adherence",
        d: "Range of motion in week six is decided by what happened in weeks one through five, at home.",
      },
      {
        t: "Fewer avoidable readmissions and ED visits",
        d: "The most expensive way to answer a question a patient could have had answered at home.",
      },
      {
        t: "Correct weight-bearing and equipment use",
        d: "Brace and weight-bearing errors cause the revisions and delays that erase an episode's margin.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is staff time spent re-explaining what the joint class already covered.",
      },
      {
        t: "Better prehab completion",
        d: "The preparation that shortens recovery, and the part nobody can observe.",
      },
      {
        t: "Stronger referral and review volume",
        d: "A guided recovery is the cheapest patient acquisition a practice has.",
      },
    ],
    povPat: {
      t: "Prepared for the whole episode",
      items: [
        "What their new joint will ask of them, from the joint class through week twelve",
        "Prehab, clearance, and day-of instructions, on the day they apply",
        "Weight-bearing, wound care, and the pain step-down, explained when each starts",
        "PROM check-ins that arrive on schedule instead of by phone chase",
      ],
    },
    povTeam: {
      t: "The block stays protected",
      items: [
        "Issued at the joint class or the consult, from the workflow you already run",
        "Fewer day-before calls that end in a cancelled block",
        "Each surgeon's arthroplasty protocol, not a generic recovery app",
        "We build and maintain the content, including protocol updates",
      ],
    },
    pov3: {
      t: "The episode stops being blind",
      items: [
        "Who opened their orbit and who never did, by patient",
        "Adherence and symptom check-ins routed back before the next visit",
        "PROM completion by joint, surgeon, and site",
        "Optional: validated functional measures scored automatically",
      ],
    },
  },
  {
    label: "Sports medicine & arthroscopy",
    line: "ACL, rotator cuff, and arthroscopy, where a younger patient's return to activity is decided almost entirely by a home program nobody watches.",
    headLead: "The home program that decides the result, guided",
    headEm: "week by week",
    intro:
      "Each surgeon's protocol in their own words, delivered on the week it applies. Alongside the therapy referral and the handout, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps a young, busy patient doing the exercises and holding the restrictions long after motivation fades.",
    gapLead: "Months of rehab, and",
    gapEm: "a few visits",
    gapIntro:
      "An ACL or a rotator cuff is repaired in an hour and rehabilitated for the better part of a year. Formal therapy ends long before the recovery does, and the rest is a home program nobody watches. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of these days are billable, and none of them are staffed. A program that stopped in week six, a sling worn wrong, or a return to sport taken too early all happen here, between appointments.",
    libIntro:
      "The sports and arthroscopy orbits, plus the injection and performance orbits that carry a patient before a procedure and back to full activity after it.",
    window: [
      {
        n: "4",
        t: "Visits with you",
        d: "One initial consult, then two or three follow-ups.",
      },
      {
        n: "9 months",
        t: "Typical return to sport",
        d: "From repair through clearance for full activity.",
      },
      {
        n: "6 weeks",
        t: "Typical course of formal therapy",
        d: "The rest of the program is done alone, at home.",
      },
      {
        n: "Most of it",
        t: "On their own",
        d: "Where the exercises, the brace, and every return-to-activity decision happen.",
        hero: true,
      },
    ],
    catalog: [
      {
        t: "ACL reconstruction",
        v: "",
      },
      {
        t: "Rotator cuff repair",
        v: "",
      },
      {
        t: "Shoulder surgery",
        v: "",
      },
      {
        t: "Knee arthroscopy",
        v: "",
      },
      {
        t: "Hip arthroscopy",
        v: "",
      },
      {
        t: "Arthroscopy",
        v: "",
      },
      {
        t: "Foot and ankle surgery",
        v: "",
      },
      {
        t: "Injections",
        v: "12+ varieties; one orbit or individualized",
      },
      {
        t: "Sports / performance plan",
        v: "Versions: individual + team. Patient and outreach.",
      },
    ],
    beginSub:
      "Most practices start with the repair they do most and extend the same template across the rest.",
    beginItems: [
      {
        t: "Decision and prehab.",
        d: "What the repair involves and the preparation that improves the result.",
      },
      {
        t: "Therapy adherence.",
        d: "The home program week by week, long after formal therapy ends.",
      },
      {
        t: "Return to activity.",
        d: "The milestones, and why taking them early costs the repair.",
      },
      {
        t: "Sports and outreach.",
        d: "Team and performance plans that reach athletes before an injury.",
      },
    ],
    measures: [
      {
        t: "Higher therapy protocol adherence",
        d: "Adherence is what separates a good surgical result from a good functional one, and it is invisible today.",
      },
      {
        t: "Safer return to activity",
        d: "A milestone taken early is a re-tear, a revision, and an outcome the practice wears.",
      },
      {
        t: "Fewer cancellations and delays",
        d: "A cancelled case is operating room time you cannot get back.",
      },
      {
        t: "Correct brace and sling use",
        d: "Explained once at the counter, and then used wrong for six weeks.",
      },
      {
        t: "Higher PROM completion rates",
        d: "Function scores are the only real measure of a sports result, and they are collected by hand today.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is staff time spent re-explaining what was already covered.",
      },
      {
        t: "Stronger referral and review volume",
        d: "Younger patients choose on reviews, and they tell their team where they went.",
      },
      {
        t: "A visible practice differentiator",
        d: "A branded recovery experience is something few competitors in the market can show.",
      },
    ],
    povPat: {
      t: "The program keeps going",
      items: [
        "A clear picture of the repair and why the timeline is longer than it feels",
        "The home program week by week, long after formal therapy ends",
        "Brace and sling use shown correctly, not explained once at the counter",
        "Return-to-activity milestones, and why taking one early costs the repair",
      ],
    },
    povTeam: {
      t: "Adherence without follow-up calls",
      items: [
        "Ordered at the consult or the post-op visit, no new FTEs",
        "A stopped program surfaces in week six, not at month four",
        "Each surgeon's rehab protocol, not a generic exercise app",
        "We build and maintain the content, including protocol updates",
      ],
    },
    pov3: {
      t: "Adherence stops being a guess",
      items: [
        "Who opened their orbit and who never did, by patient",
        "A home program that stopped, visible in week six rather than at month four",
        "PROM completion by procedure, surgeon, and site",
        "Optional: validated function measures scored automatically",
      ],
    },
  },
  {
    label: "Spine",
    line: "The long conservative runway before a case is ever booked, and the recovery after it, where expectations decide whether a good result feels like one.",
    headLead: "Expectations set early, and recovery followed",
    headEm: "all the way through",
    intro:
      "Your spine protocol in your surgeons' own words, delivered when each instruction matters. Alongside the consult and the therapy referral, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that carries a patient through conservative care, into surgery only when it is warranted, and through a recovery they understand.",
    gapLead: "Months of conservative care before",
    gapEm: "anyone books a case",
    gapIntro:
      "Most spine patients spend months in injections, therapy, and imaging before surgery is on the table, and months more recovering afterward. Almost none of that time is spent with you. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of these days are billable, and none of them are staffed. A patient who abandons conservative care, arrives with the wrong expectation, or reads normal recovery pain as a failed operation all happen here, between appointments.",
    libIntro:
      "The spine orbits, plus the injection and activity orbits that carry the long conservative runway before a case is ever booked.",
    window: [
      {
        n: "4",
        t: "Visits with you",
        d: "One initial consult, then two or three follow-ups.",
      },
      {
        n: "Months",
        t: "Of conservative care first",
        d: "Injections, therapy, and imaging before surgery is on the table.",
      },
      {
        n: "12 months",
        t: "To a settled result",
        d: "Where expectations decide whether a good result feels like one.",
      },
      {
        n: "Nearly all of it",
        t: "Managed at home",
        d: "Activity limits, the home program, and every judgment about what is normal.",
        hero: true,
      },
    ],
    catalog: [
      {
        t: "Spinal surgery",
        v: "",
      },
      {
        t: "Spinal fusion",
        v: "",
      },
      {
        t: "Injections",
        v: "12+ varieties; one orbit or individualized",
      },
      {
        t: "Healthy Activity",
        v: "Versions: general + senior. Patient and outreach.",
      },
    ],
    beginSub:
      "Most practices start on the conservative side, where the volume is, and extend into the operative journey.",
    beginItems: [
      {
        t: "Conservative care.",
        d: "Injections, therapy, and activity, before surgery is on the table.",
      },
      {
        t: "Decision and expectations.",
        d: "What surgery can fix, what it cannot, and what recovery will ask.",
      },
      {
        t: "Preparation and day of surgery.",
        d: "Clearance, medication holds, and what the day will involve.",
      },
      {
        t: "Recovery and PROMs.",
        d: "Activity limits month by month, with validated measures on schedule.",
      },
    ],
    measures: [
      {
        t: "Better expectation setting",
        d: "A spine result is judged against what the patient expected, and that expectation is set months earlier.",
      },
      {
        t: "Higher conservative care completion",
        d: "The therapy and injection course that has to be documented before a case is ever approved.",
      },
      {
        t: "Fewer cancellations and delays",
        d: "A cancelled spine case is a long block you cannot resell late.",
      },
      {
        t: "Fewer avoidable readmissions and ED visits",
        d: "Normal recovery pain, read as an emergency because nobody said what normal looks like.",
      },
      {
        t: "Higher therapy protocol adherence",
        d: "The home program is most of the recovery, and today nobody sees whether it happens.",
      },
      {
        t: "Higher PROM completion rates",
        d: "Function and pain scores are how a spine outcome gets reported, and they are chased by hand today.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is staff time spent re-explaining what was already covered.",
      },
      {
        t: "Stronger referral and review volume",
        d: "Spine patients research heavily, and a guided recovery is what they write about.",
      },
    ],
    povPat: {
      t: "Expectations set early",
      items: [
        "What surgery can fix, what it cannot, and what recovery will actually ask",
        "The conservative course explained, so therapy and injections get finished",
        "What normal recovery pain feels like, month by month",
        "Which symptoms mean call us, and which mean go to the ED",
      ],
    },
    povTeam: {
      t: "The runway documents itself",
      items: [
        "Issued at the first consult, months before a case is booked",
        "Conservative care progress documented without staff chasing it",
        "Each surgeon's spine protocol, not a generic back-pain app",
        "We build and maintain the content, including protocol updates",
      ],
    },
    pov3: {
      t: "The long runway becomes visible",
      items: [
        "Who opened their orbit and who never did, by patient",
        "Conservative care progress documented before the case is submitted",
        "PROM completion by procedure, surgeon, and site",
        "Optional: validated pain and function measures scored automatically",
      ],
    },
  },
];
