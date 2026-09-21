/* Primary Care segment copy. Extracted verbatim from
 * v2-maven/PrimaryCarePage.dc.html lines 272-515 (PC_SEGMENTS).
 *
 * This page has no dead key set and no orbits-data.js import: everything
 * renderVals() returns is rendered, and the page name is hard-coded in the
 * markup rather than loaded. Segment `nameLower` is carried in the source
 * but never read, because the CTA copy on this page is static; it is kept
 * here so the data stays a faithful copy.
 */

export type MoneyStat = { v: string; t: string; d: string; src: string };
export type Measure = { t: string; d: string };
export type CatalogItem = { t: string; v: string };
export type BeginItem = { t: string; d: string };
export type PovBlock = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: string[];
};

export type PcSegment = {
  label: string;
  nameLower: string;
  line: string;
  headLead: string;
  headEm: string;
  intro: string;
  gapLead: string;
  gapEm: string;
  gapIntro: string;
  gapBridge: string;
  libIntro: string;
  money: MoneyStat[];
  measures: Measure[];
  catalog: CatalogItem[];
  beginSub: string;
  beginItems: BeginItem[];
  pov: PovBlock[];
};

/** Per-segment value image. Segment 0 reuses the hero frame, as in the
 * source. Legacy: the valueSrc array in renderVals(). */
export const VALUE_SRC = [
  "/images/primarycare-hero.png",
  "/images/primarycare-value-chronic.png",
  "/images/primarycare-value-prevention.png",
  "/images/primarycare-value-transitions.png",
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

/** Ledger rows 2 and 3. Identical on every segment. */
export const FIXED_ROWS = [
  {
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
  },
  {
    kicker: "Employer-based plans",
    t: "Aligned with the benefit plan employees are asked to accept",
    label: "#1F7B87",
    dot: "#4FB3BF",
    sub: "For employers and plan sponsors introducing a new plan or a new primary care benefit, an orbit adds to the enrollment packet and the benefits meeting, not in place of them.",
    items: [
      {
        t: "Plan acceptance.",
        d: "A guided introduction at open enrollment that explains what is changing and why the new plan works in the employee's favor.",
      },
      {
        t: "Onboarding.",
        d: "Employees and their families walked into the new benefit: choosing a primary care home, first visit, and what is covered.",
      },
      {
        t: "Reinforcement through the year.",
        d: "Covered preventive visits, screenings, and in-network care kept in front of employees long after the benefits meeting.",
      },
      {
        t: "Employer-branded versions.",
        d: "Issued by worksite or plan population, with engagement visible to the benefits team.",
      },
    ],
  },
];

export const PC_SEGMENTS: PcSegment[] = [
  {
    label: "All of primary care",
    nameLower: "primary care",
    line: "The whole practice: chronic conditions, prevention, annual visits, and the transitions that bring patients into your panel and keep them there.",
    headLead:
      "A trusted digital guide your patients keep, from the first visit through",
    headEm: "every year after",
    intro:
      "Your instructions and your best guidance, delivered when each one actually matters. Alongside the after-visit summary and the follow-up call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps patients informed, reassured, and on track between visits.",
    gapLead: "A year of health, managed in",
    gapEm: "a few short visits",
    gapIntro:
      "Blood pressure, blood sugar, weight, medications, and every screening decision live at home, between appointments measured in minutes. The plan is explained in the room and carried out from memory for months. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those months matters more, not less.",
    gapBridge:
      "None of these are decided in your exam room. Each one turns on whether a patient understood the plan, kept taking the medication, booked the screening, or showed up for the next appointment, in the months when no one was there to remind them.",
    libIntro:
      "Support the whole practice with a Primary Care Bundle: condition and visit orbits for patients and families, plus a template that versions the rest, covering journeys like these:",
    money: [
      {
        v: "6 in 10",
        t: "Adults living with a chronic disease",
        d: "Managed almost entirely at home, on a plan explained in a visit measured in minutes.",
        src: "CDC",
      },
      {
        v: "About half",
        t: "Of chronic medications not taken as prescribed",
        d: "Non-adherence to long-term therapy is widely reported near 50%, and nobody sees the bottle between visits.",
        src: "Published adherence literature",
      },
      {
        v: "Up to 1 in 5",
        t: "Scheduled visits end as no-shows",
        d: "Published outpatient no-show rates vary widely by setting; each empty slot is unbilled time and an unmanaged patient.",
        src: "Published no-show analyses",
      },
      {
        v: "Under 10%",
        t: "Adults receiving all recommended preventive services",
        d: "The screenings and visits your quality contracts pay on, left to patient memory.",
        src: "Published preventive services analyses",
      },
    ],
    measures: [
      {
        t: "Fewer missed appointments",
        d: "Every kept visit is revenue, continuity, and a care gap that does not widen.",
      },
      {
        t: "Closed care gaps",
        d: "Screenings, immunizations, and follow-ups completed instead of chased at year end.",
      },
      {
        t: "Better chronic condition control",
        d: "Blood pressure, A1c, and weight, supported on the days between visits rather than at them.",
      },
      {
        t: "Better medication adherence",
        d: "Regimens only work when they are taken, and nobody sees the bottle between visits.",
      },
      {
        t: "Fewer avoidable ED visits",
        d: "A question answered at home instead of an unplanned presentation on a weekend.",
      },
      {
        t: "Fewer inbound calls per patient",
        d: "Every repeat call is staff time spent re-explaining what the visit already covered.",
      },
      {
        t: "Higher annual wellness visit completion",
        d: "A reimbursed visit most eligible patients never book.",
      },
      {
        t: "New patient acquisition and retention",
        d: "A branded welcome and wellness experience few competing practices can show.",
      },
    ],
    catalog: [
      {
        t: "Healthy Life",
        v: "Versions: general patient + senior + community. Condition orbits evolve here.",
      },
      {
        t: "Annual wellness visit",
        v: "Versions: Medicare AWV + adult physical",
      },
      {
        t: "Hypertension",
        v: "Home readings, medications, lifestyle",
      },
      {
        t: "Type 2 diabetes",
        v: "Versions: newly diagnosed + ongoing management",
      },
      {
        t: "Preventive screening",
        v: "Colorectal, breast, cervical, lung",
      },
      {
        t: "New patient welcome",
        v: "Onboarding into the practice",
      },
      {
        t: "Post-discharge follow-up",
        v: "The handoff back to primary care",
      },
      {
        t: "Asthma & COPD",
        v: "",
      },
      {
        t: "Vaccination & seasonal readiness",
        v: "",
      },
    ],
    beginSub:
      "Most practices start with chronic care or the annual visit. All four run as one guide the patient keeps.",
    beginItems: [
      {
        t: "Chronic condition support.",
        d: "Hypertension, diabetes, asthma and COPD, weight.",
      },
      {
        t: "Annual visits and prevention.",
        d: "Wellness visits, screenings, and immunizations, booked and kept.",
      },
      {
        t: "New patient onboarding.",
        d: "A welcome that starts the relationship before the first visit.",
      },
      {
        t: "Care transitions.",
        d: "The handoff after a hospital stay or a specialist episode.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know what to do",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "A clear understanding of their conditions, their plan, and who is caring for them",
          "Your instructions and reminders, on the day each one applies",
          "Which symptoms mean call us, and which mean go to the ED",
          "The same guide works for whoever helps them at home",
        ],
      },
      {
        kicker: "For your team",
        t: "Nothing added to the day",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered from the workflow you already run, no new FTEs",
          "Fewer calls asking what the visit already covered",
          "Your brand and your protocols, not a generic app",
          "We build and maintain the content, including updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "You can finally see it",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who opened their orbit and who never did, by patient",
          "Check-ins routed back before the next visit",
          "Engagement and completion by panel and by site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
  {
    label: "Chronic conditions",
    nameLower: "chronic care",
    line: "Hypertension, diabetes, asthma and COPD: the conditions managed for life, where the daily work happens at home.",
    headLead: "A guide for every day between the visits you only get",
    headEm: "a few times a year",
    intro:
      "Your chronic care protocols in your clinicians' own words, delivered on the day each instruction matters. Alongside the after-visit summary and the nurse call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps readings, medications, and warning signs in front of the patient every day.",
    gapLead: "A lifetime condition, and",
    gapEm: "fifteen minutes a quarter",
    gapIntro:
      "A blood pressure or A1c target is set in the room and pursued at home: readings, refills, diet, and a regimen that changes over time, all handled by a patient working from memory. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those months matters more, not less.",
    gapBridge:
      "None of this is decided in your exam room. Each one turns on whether a patient took the reading, refilled the prescription, or recognized the change early enough to pick up the phone.",
    libIntro:
      "The condition orbits, plus the template that versions the rest. Healthy Life is the default orbit a patient keeps between episodes.",
    money: [
      {
        v: "6 in 10",
        t: "Adults living with a chronic disease",
        d: "And 4 in 10 with two or more, nearly all of it managed outside your building.",
        src: "CDC",
      },
      {
        v: "About half",
        t: "Of chronic medications not taken as prescribed",
        d: "Non-adherence to long-term therapy is widely reported near 50% within the first year.",
        src: "Published adherence literature",
      },
      {
        v: "About 1 in 4",
        t: "Adults with hypertension who have it controlled",
        d: "Published US control rates run well under half; the daily work that moves them happens at home.",
        src: "Published hypertension control analyses",
      },
      {
        v: "Up to 1 in 5",
        t: "Scheduled visits end as no-shows",
        d: "The follow-up that would have caught the drift, missed.",
        src: "Published no-show analyses",
      },
    ],
    measures: [
      {
        t: "Better blood pressure and A1c control",
        d: "The numbers your quality contracts pay on, moved by daily behavior you cannot staff.",
      },
      {
        t: "Better medication adherence",
        d: "Titration only works if the previous change was actually taken.",
      },
      {
        t: "Fewer missed follow-ups",
        d: "The visit that catches the drift before it becomes an admission.",
      },
      {
        t: "Earlier symptom recognition",
        d: "A patient who calls about a climbing reading costs a phone call, not an ED visit.",
      },
      {
        t: "Fewer avoidable ED visits",
        d: "A managed flare at home instead of an unplanned presentation on a weekend.",
      },
      {
        t: "Fewer inbound calls per patient",
        d: "Every repeat call is staff time spent re-explaining what the visit already covered.",
      },
      {
        t: "Better self-monitoring",
        d: "Home readings taken, logged, and understood, instead of guessed at the next visit.",
      },
      {
        t: "Higher PROM and screening completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
    ],
    catalog: [
      {
        t: "Hypertension",
        v: "Home readings, medications, lifestyle",
      },
      {
        t: "Type 2 diabetes",
        v: "Versions: newly diagnosed + ongoing management",
      },
      {
        t: "Asthma & COPD",
        v: "Inhaler technique, triggers, action plans",
      },
      {
        t: "Weight & lifestyle",
        v: "Diet, activity, and the habits behind every chronic plan",
      },
      {
        t: "Healthy Life",
        v: "The default orbit between episodes",
      },
    ],
    beginSub:
      "Most practices start with the conditions that drive their quality measures.",
    beginItems: [
      {
        t: "Hypertension.",
        d: "Home readings, what they mean, and when to call.",
      },
      {
        t: "Diabetes.",
        d: "Glucose, medications, feet, eyes, and the annual checks.",
      },
      {
        t: "Asthma and COPD.",
        d: "Technique, triggers, and the action plan at home.",
      },
      {
        t: "Weight and lifestyle.",
        d: "The habits underneath every other target.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know what today's number means",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What the condition is, what it does, and what they actually control",
          "Readings, diet, and medication guidance written for a kitchen, not a chart",
          "Which numbers mean call us, and which mean go to the ED",
          "The same guide works for whoever manages the medications at home",
        ],
      },
      {
        kicker: "For your team",
        t: "Better calls, fewer of them",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered at diagnosis and it runs for as long as the patient is yours",
          "Fewer calls asking what the visit already covered",
          "Regimen changes explained again, in your clinicians' words",
          "We build and maintain the content, including guideline updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "The months stop being blind",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who opened their orbit this month and who never did, by patient",
          "Reading and symptom check-ins routed back before the visit",
          "Engagement and control measures by panel and by site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
  {
    label: "Prevention & annual visits",
    nameLower: "preventive care",
    line: "Annual wellness visits, screenings, and immunizations: reimbursed care most eligible patients never book.",
    headLead: "Screenings booked and visits kept, without",
    headEm: "a year-end chase",
    intro:
      "Your prevention guidance in your clinicians' own words, delivered across the year rather than in one reminder letter. Alongside the recall list and the portal message, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that explains why each screening matters and gets it booked.",
    gapLead: "A recommendation is not",
    gapEm: "an appointment",
    gapIntro:
      "The mammogram, the colonoscopy, the wellness visit, and the vaccine are each decided at home, months after they were recommended in the room. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those months matters more, not less.",
    gapBridge:
      "None of this is decided in the clinic. Each one turns on whether a patient understood why the screening matters, knew what it involves, and booked it before the reminder was forgotten.",
    libIntro:
      "The prevention orbits, plus the Healthy Life orbit that carries patients between them.",
    money: [
      {
        v: "Under 10%",
        t: "Adults receiving all recommended preventive services",
        d: "The gap between what is recommended in the room and what gets booked from home.",
        src: "Published preventive services analyses",
      },
      {
        v: "About 1 in 3",
        t: "Medicare patients getting an annual wellness visit",
        d: "A reimbursed visit, built for exactly the population that uses it least. Published uptake varies by region and year.",
        src: "Published Medicare AWV analyses",
      },
      {
        v: "About 1 in 3",
        t: "Adults not up to date on colorectal screening",
        d: "One of the screenings quality contracts weight most heavily.",
        src: "CDC screening data",
      },
      {
        v: "Up to 1 in 5",
        t: "Scheduled visits end as no-shows",
        d: "Prevention leaks twice: the visit never booked, and the booked visit missed.",
        src: "Published no-show analyses",
      },
    ],
    measures: [
      {
        t: "Higher annual wellness visit completion",
        d: "A reimbursed visit most eligible patients never book.",
      },
      {
        t: "Closed screening gaps",
        d: "Colorectal, breast, cervical, and lung screening completed instead of chased at year end.",
      },
      {
        t: "Higher immunization rates",
        d: "Seasonal and routine vaccines explained before the counter conversation.",
      },
      {
        t: "Fewer missed appointments",
        d: "A patient who knows why the visit matters shows up for it.",
      },
      {
        t: "Better quality measure performance",
        d: "The HEDIS and value-based numbers that prevention gaps drag down.",
      },
      {
        t: "Recovered outreach time",
        d: "The recall list worked by the orbit instead of by staff phone time.",
      },
      {
        t: "Earlier detection",
        d: "The clinical outcome every screening measure is a proxy for.",
      },
      {
        t: "New patient acquisition",
        d: "Wellness and screening outreach reaches people before they are anyone's patient.",
      },
    ],
    catalog: [
      {
        t: "Annual wellness visit",
        v: "Versions: Medicare AWV + adult physical",
      },
      {
        t: "Preventive screening",
        v: "Colorectal, breast, cervical, lung",
      },
      {
        t: "Vaccination & seasonal readiness",
        v: "Routine and seasonal immunizations",
      },
      {
        t: "Healthy Life",
        v: "Versions: general patient + senior + community",
      },
    ],
    beginSub:
      "Most practices start with the measures their quality contracts weight most.",
    beginItems: [
      {
        t: "The wellness visit.",
        d: "What it is, what it is not, and why it is worth booking.",
      },
      {
        t: "Screening completion.",
        d: "What each test involves, plainly, before the excuse forms.",
      },
      {
        t: "Immunizations.",
        d: "The schedule, the reasons, and the reminders.",
      },
      {
        t: "Community outreach.",
        d: "Wellness versions for people who are not yet patients.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know why it is worth booking",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What each screening is for and what it actually involves",
          "Reminders that arrive with the reason, not just the date",
          "What to expect at the wellness visit and what to bring",
          "The same guide works for whoever books the appointments",
        ],
      },
      {
        kicker: "For your team",
        t: "A recall list that works itself",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Issued from the patient list you already keep, no new FTEs",
          "Fewer calls explaining what a screening involves",
          "Your protocols and your brand, not a generic reminder text",
          "We build and maintain the content, including schedule updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "Gaps visible before the audit",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who engaged with the outreach and who never did, by patient",
          "Screening and visit completion visible by measure",
          "Engagement by panel, cohort, and site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
  {
    label: "New patients & transitions",
    nameLower: "care transitions",
    line: "The moments patients enter or return to your panel: a new patient welcome, and the handoff after a hospital stay.",
    headLead:
      "The relationship starts before the first visit, and holds through",
    headEm: "every handoff",
    intro:
      "Your onboarding and transition guidance in your clinicians' own words, delivered from the day the appointment is booked. Alongside the intake packet and the discharge summary, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that welcomes new patients and carries discharged ones back to your door.",
    gapLead: "The riskiest weeks are the ones",
    gapEm: "between doors",
    gapIntro:
      "A new patient decides whether to stay in the first weeks. A discharged patient decides nothing; the thirty days after a hospital stay simply happen to them, at home, before primary care sees them again. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of this is decided in your waiting room. Each one turns on whether a patient knew what to bring, understood the discharge plan, and got the follow-up booked while it still mattered.",
    libIntro:
      "The transition orbits, plus the Healthy Life orbit each one hands off to when the episode closes.",
    money: [
      {
        v: "Under half",
        t: "Seen within seven days of discharge",
        d: "Early follow-up is one of the strongest predictors of staying out, and a large share of patients never get one.",
        src: "Published transitional care analyses",
      },
      {
        v: "About 1 in 6",
        t: "Medicare discharges readmitted within 30 days",
        d: "Much of it in the window before primary care re-engages.",
        src: "Published Medicare readmission analyses",
      },
      {
        v: "Up to 1 in 5",
        t: "Scheduled visits end as no-shows",
        d: "New patient slots are among the longest, and among the most missed.",
        src: "Published no-show analyses",
      },
      {
        v: "First weeks",
        t: "When a new patient decides to stay",
        d: "The onboarding experience is the practice's first and most repeated impression.",
        src: "Practice retention, directional",
      },
    ],
    measures: [
      {
        t: "Higher seven-day follow-up attendance",
        d: "The visit where a decompensation gets caught before it becomes a readmission.",
      },
      {
        t: "Fewer missed new patient visits",
        d: "The longest slots on the schedule, protected by a welcome that arrives first.",
      },
      {
        t: "Fewer 30-day readmissions",
        d: "The handoff window covered instead of silent.",
      },
      {
        t: "Faster medication reconciliation",
        d: "The discharge list and the home list, reconciled before the visit instead of during it.",
      },
      {
        t: "Better new patient retention",
        d: "Patients who feel guided in the first weeks stay for the years after.",
      },
      {
        t: "Fewer inbound calls per transition",
        d: "What to bring, where to park, and what the discharge sheet said, answered first.",
      },
      {
        t: "Documented education",
        d: "A record of what every patient was sent, and when.",
      },
      {
        t: "New patient acquisition",
        d: "A branded welcome few competing practices can show a prospective patient.",
      },
    ],
    catalog: [
      {
        t: "New patient welcome",
        v: "Booked to first visit, then onboarding",
      },
      {
        t: "Post-discharge follow-up",
        v: "The thirty days back to primary care",
      },
      {
        t: "Specialist episode return",
        v: "Closing the loop after a referral",
      },
      {
        t: "Healthy Life",
        v: "Where every transition orbit lands",
      },
    ],
    beginSub: "Most practices start where the risk or the revenue is largest.",
    beginItems: [
      {
        t: "New patient welcome.",
        d: "From booking to the first visit, prepared.",
      },
      {
        t: "Post-discharge.",
        d: "The thirty days where the readmission risk lives.",
      },
      {
        t: "Referral returns.",
        d: "The loop back from the specialist, closed.",
      },
      {
        t: "Panel outreach.",
        d: "Reaching households before they are patients.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They are never between doors alone",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What to bring, where to go, and what the first visit will cover",
          "The discharge plan explained again, at home, in plain words",
          "Which symptoms mean call us, and which mean go to the ED",
          "The same guide works for whoever manages the transition at home",
        ],
      },
      {
        kicker: "For your team",
        t: "Handoffs that hold",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Issued at booking or at discharge, no new intake step",
          "Fewer calls about logistics and the discharge sheet",
          "Your brand and your voice from the first touch",
          "We build and maintain the content, including updates",
        ],
      },
      {
        kicker: "For the practice",
        t: "The window stops being silent",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who engaged in the first week and who went quiet, by patient",
          "Follow-up booking visible before the deadline passes",
          "Retention and readmission patterns by cohort",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
];
