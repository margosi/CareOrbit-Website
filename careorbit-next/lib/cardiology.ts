/* Cardiology segment copy. Extracted verbatim from
 * v2-maven/CardiologyPage.dc.html lines 298-550 (CARD_SEGMENTS).
 *
 * The legacy renderVals() returned two sets of keys with the same names -
 * a generic set first, then the segment-derived set. In a JS object literal
 * the later key wins, so only the segment-derived values were ever rendered.
 * The generic set (features, versions, window, deploy, benefits, calcFields,
 * calcResults, sourcesList) is dead code on this page: no markup reads it,
 * and the #roi-calculator / [data-feat-block] elements those keys feed do
 * not exist in CardiologyPage. It is not ported. The #roi-calculator and
 * [data-featnav] CSS in the helmet is likewise inert; it is kept in
 * cardiology.css only so the sheet stays a faithful copy.
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

export type CardSegment = {
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
  studyLead: string;
  studyEm: string;
  studySub: string;
  libIntro: string;
  money: MoneyStat[];
  measures: Measure[];
  catalog: CatalogItem[];
  beginSub: string;
  beginItems: BeginItem[];
  pov: PovBlock[];
};

/** Per-segment value image. Legacy: valueSrc ternary in renderVals(). */
export const VALUE_SRC = [
  "/images/value-cardiology-all.png",
  "/images/value-cardiology-hf.png",
  "/images/value-cardiology-procedures.png",
  "/images/value-cardiology-rehab.png",
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

/** The second ledger row is the same on every segment. Legacy: rows[1]. */
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

export const CARD_SEGMENTS: CardSegment[] = [
  {
    label: "All of cardiology",
    nameLower: "cardiology",
    line: "The whole service line, from prevention and rehab through the cath lab, the operating room, and lifelong management.",
    headLead:
      "A trusted digital guide your patients keep, from decision through",
    headEm: "recovery",
    intro:
      "Your instructions and your best guidance, delivered when each one actually matters. Alongside the folder at discharge and the follow-up call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps patients informed, reassured, and on track between visits.",
    gapLead: "A lifetime condition, managed in",
    gapEm: "twenty minutes a month",
    gapIntro:
      "Coronary disease, heart failure, and hypertension are managed for life, but your contact is a handful of appointments a year. Medications, weights, sodium, activity, and every warning sign are handled at home, by a patient working from memory. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of these are decided in your clinic. Each one turns on whether a patient understood the plan, kept taking the medication, recognized a warning sign, or showed up for rehab, in the weeks when no one was there to tell them.",
    studyLead: "The pilot",
    studyEm: "behind the numbers",
    studySub:
      "A nine-month cardiac rehab pilot measured real enrollment gains, building on the platform's controlled trial in oncology.",
    libIntro:
      "Support your cardiology service line with a Cardiology Department Bundle which gives you 9 procedure and condition orbit versions for patients and families, plus a template for the rest, supporting the specifics of procedures like these:",
    money: [
      {
        v: "Up to 3%",
        t: "Medicare inpatient payment at risk",
        d: "The HRRP reduction hospitals face for excess readmissions, including heart failure, acute MI, and CABG.",
        src: "CMS",
      },
      {
        v: "1 in 5",
        t: "Readmitted within 30 days",
        d: "National 30-day readmission after a heart failure hospitalization is commonly reported near 20 to 23%.",
        src: "Published national analyses",
      },
      {
        v: "About half",
        t: "Stop taking their cardiac medications",
        d: "Discontinuation and poor adherence to chronic cardiovascular therapy is widely reported near 50% within the first year.",
        src: "Published adherence literature",
      },
      {
        v: "About 1 in 4",
        t: "Eligible patients who start rehab",
        d: "Cardiac rehab is one of the best-evidenced interventions in cardiology. Most eligible patients never begin it.",
        src: "Published Medicare analyses",
      },
    ],
    measures: [
      {
        t: "Fewer 30-day readmissions",
        d: "The costliest between-visit failure in cardiology, and the one CMS penalizes directly.",
      },
      {
        t: "Higher cardiac rehab enrollment",
        d: "A referral that never becomes an enrollment is billed to nobody and helps no one.",
      },
      {
        t: "Higher rehab completion",
        d: "Completion is where the mortality benefit lives, and where most programs leak patients.",
      },
      {
        t: "Better medication adherence",
        d: "Cardiac regimens only work when they are taken, and nobody sees the bottle between visits.",
      },
      {
        t: "Fewer avoidable ED visits",
        d: "A managed symptom at home instead of an unplanned presentation on a weekend.",
      },
      {
        t: "Fewer inbound calls per episode",
        d: "Every repeat call is nursing time spent re-explaining what was already covered.",
      },
      {
        t: "Earlier symptom recognition",
        d: "A patient who calls about three pounds of weight gain costs a phone call, not an admission.",
      },
      {
        t: "A visible program differentiator",
        d: "A branded cardiac experience is something few competing programs can show a referring physician.",
      },
    ],
    catalog: [
      {
        t: "Heart Health",
        v: "Versions: general patient + at-risk + senior + community. Procedure orbits evolve here.",
      },
      {
        t: "Cardiac rehabilitation",
        v: "Versions: newly prescribed + full journey",
      },
      {
        t: "Coronary artery bypass surgery",
        v: "Versions: general + off-pump / OPCAB",
      },
      {
        t: "Heart valve repair or replacement",
        v: "",
      },
      {
        t: "Aneurysm repair",
        v: "",
      },
      {
        t: "Coronary angioplasty and stenting",
        v: "",
      },
      {
        t: "Implantable pacemaker",
        v: "",
      },
      {
        t: "Heart transplant",
        v: "",
      },
      {
        t: "Minimally invasive heart surgery",
        v: "",
      },
    ],
    beginSub:
      "Most cardiology programs start with procedure support or rehab. All four run as one guide the patient keeps.",
    beginItems: [
      {
        t: "Procedure support.",
        d: "Bypass, valve, ablation, device implant, cath lab.",
      },
      {
        t: "Cardiac rehab.",
        d: "Getting referred patients to start, and to keep coming.",
      },
      {
        t: "Heart failure.",
        d: "Daily weights, fluid and sodium limits, titration.",
      },
      {
        t: "Prevention and risk.",
        d: "Screening and referral before they are a patient.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know what to do",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "A clear understanding of their diagnosis, procedure, and who will be caring for them",
          "Your prep, clearance, and day-of instructions, on the day they apply",
          "Which symptoms mean call us, and which mean go to the ED",
          "The same guide works for whoever drives them home",
        ],
      },
      {
        kicker: "For your team",
        t: "Nothing added to the day",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered from the workflow you already run, no new FTEs",
          "Fewer calls asking what the discharge sheet already said",
          "Your brand and your protocols, not a generic app",
          "We build and maintain the content, including updates",
        ],
      },
      {
        kicker: "For the program",
        t: "You can finally see it",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who opened their orbit and who never did, by patient",
          "Symptom check-ins routed back before the next visit",
          "Engagement and completion by cohort and by site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
  {
    label: "Heart failure & chronic care",
    nameLower: "heart failure",
    line: "The conditions managed for life, where daily weights, sodium, and a regimen that keeps changing are all handled at home.",
    headLead: "A guide for every day between the visits you only get",
    headEm: "a few times a year",
    intro:
      "Your heart failure and hypertension protocols in your clinicians' own words, delivered on the day each instruction matters. Alongside the discharge folder and the follow-up call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that keeps weights, sodium, medications, and warning signs in front of the patient every day.",
    gapLead: "Thirty days of risk, and",
    gapEm: "one follow-up date",
    gapIntro:
      "Heart failure is discharged into a house. Weights, fluid, sodium, and a regimen that changes every few weeks are managed by a patient working from memory, in exactly the window where the cost and the penalty both land. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of this is decided in your clinic. Each one turns on whether a patient weighed themselves, kept taking the medication, or recognized the swelling early enough to pick up the phone.",
    studyLead: "The cardiology result",
    studyEm: "behind the numbers",
    studySub:
      "The rehab pilot below is our direct cardiology result. It sits alongside the platform's controlled trial, run in surgical oncology.",
    libIntro:
      "The chronic and device orbits, plus the template that versions the rest. Heart Health is the default orbit a patient keeps between visits.",
    money: [
      {
        v: "1 in 5",
        t: "Readmitted within 30 days",
        d: "National 30-day readmission after a heart failure hospitalization is commonly reported near 20 to 23%.",
        src: "Published national analyses",
      },
      {
        v: "Up to 3%",
        t: "Medicare inpatient payment at risk",
        d: "The HRRP reduction hospitals face for excess readmissions, with heart failure among the named conditions.",
        src: "CMS",
      },
      {
        v: "About half",
        t: "Stop taking their cardiac medications",
        d: "Discontinuation and poor adherence to chronic cardiovascular therapy is widely reported near 50% within the first year.",
        src: "Published adherence literature",
      },
      {
        v: "Under half",
        t: "Seen within seven days of discharge",
        d: "Early follow-up is one of the strongest predictors of staying out, and a large share of patients never get one.",
        src: "Published transitional care analyses",
      },
    ],
    measures: [
      {
        t: "Fewer 30-day readmissions",
        d: "The costliest between-visit failure in heart failure care, and the one CMS penalizes directly.",
      },
      {
        t: "Earlier symptom recognition",
        d: "A patient who calls about three pounds of weight gain costs a phone call, not an admission.",
      },
      {
        t: "Better medication adherence",
        d: "Titration only works if the previous change was actually taken, and nobody sees the bottle between visits.",
      },
      {
        t: "Higher early follow-up attendance",
        d: "The seven-day visit is where a decompensation gets caught before it becomes an admission.",
      },
      {
        t: "Fewer avoidable ED visits",
        d: "A managed symptom at home instead of an unplanned presentation on a weekend.",
      },
      {
        t: "Better daily weight and sodium tracking",
        d: "The two behaviors that predict the next admission, and the two nobody can observe.",
      },
      {
        t: "Fewer inbound calls per patient",
        d: "Every repeat call is nursing time spent re-explaining what the discharge sheet already said.",
      },
      {
        t: "Higher PROM completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
    ],
    catalog: [
      {
        t: "Heart Health",
        v: "Versions: general patient + at-risk + senior + community. The default orbit between visits.",
      },
      {
        t: "Cardiac rehabilitation",
        v: "Versions: newly prescribed + full journey",
      },
      {
        t: "Implantable pacemaker",
        v: "Device education and follow-up",
      },
      {
        t: "Heart transplant",
        v: "Candidacy, wait, and post-transplant management",
      },
    ],
    beginSub:
      "Most programs start at discharge and extend backward into clinic.",
    beginItems: [
      {
        t: "Post-discharge recovery.",
        d: "The thirty days where the cost and the penalty land.",
      },
      {
        t: "Daily self-management.",
        d: "Weights, fluid and sodium limits, and what each number means.",
      },
      {
        t: "Medication and titration.",
        d: "Why the regimen keeps changing, and what a missed dose does.",
      },
      {
        t: "Prevention and risk.",
        d: "Screening and referral before they are a patient.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know what today's number means",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What the diagnosis is, what it does, and what they actually control",
          "Sodium, fluid, and daily weight guidance written for a kitchen, not a chart",
          "Which readings mean call us, and which mean go to the ED",
          "The same guide works for whoever manages the medications at home",
        ],
      },
      {
        kicker: "For your team",
        t: "Better calls, fewer of them",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered at discharge and it runs for as long as the patient is yours",
          "Fewer calls asking what the discharge sheet already said",
          "Titration changes explained again, in your clinicians' words",
          "We build and maintain the content, including guideline updates",
        ],
      },
      {
        kicker: "For the program",
        t: "The thirty days stop being blind",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who opened their orbit at 7, 14, and 30 days, by patient",
          "Weight and symptom check-ins routed back before the readmission",
          "Engagement and completion by unit and by site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
  {
    label: "Procedures & surgery",
    nameLower: "cardiac procedures",
    line: "The cath lab and the operating room, where preparation decides whether a case happens on the day it was booked.",
    headLead: "Preparation and recovery your patients can follow, on the day",
    headEm: "each step matters",
    intro:
      "Your operative and cath lab protocols in your surgeons' own words, released one instruction at a time. Alongside the pre-op packet and the nurse call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that gets patients to the day prepared and through recovery without guessing.",
    gapLead: "Weeks of preparation inside",
    gapEm: "one procedure day",
    gapIntro:
      "A bypass, a valve, an ablation, or a stent is decided in one visit, prepared for alone at home over weeks, and recovered from alone over more. The lab and the operating room see a sliver of it. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of this is decided in the lab. Each one turns on whether a patient followed the preparation, held the right medication, arrived ready, and recognized the sign that mattered afterward.",
    studyLead: "The cardiology result",
    studyEm: "behind the numbers",
    studySub:
      "The rehab pilot below measured enrollment in cardiology. The platform's controlled trial was run in surgical oncology, where preparation and recovery work the same way; applied to a cardiac procedural population, those results are a model.",
    libIntro:
      "The named procedure orbits, plus a template that versions the long tail with minor edits. Heart Health is where each one returns after the episode closes.",
    money: [
      {
        v: "7 in 10",
        t: "Day-of cancellations judged avoidable",
        d: "Incomplete evaluation, missing clearance, and patients who did not arrive. Lab and operating room time lost late is rarely refilled.",
        src: "Published day-of-surgery cancellation audits",
      },
      {
        v: "Up to 24%",
        t: "Reported day-of-surgery cancellation rates",
        d: "Published rates range widely by setting and specialty. The avoidable share is the part preparation can move.",
        src: "Published cancellation series, 1.96% to 24%",
      },
      {
        v: "Up to 3%",
        t: "Medicare inpatient payment at risk",
        d: "HRRP covers excess readmissions after CABG and acute myocardial infarction as well as heart failure.",
        src: "CMS",
      },
      {
        v: "About half",
        t: "Stop taking their cardiac medications",
        d: "Antiplatelet and anticoagulation adherence after a stent or a valve is the difference between a good result and a repeat one.",
        src: "Published adherence literature",
      },
    ],
    measures: [
      {
        t: "Fewer cancelled and rescheduled cases",
        d: "A case that falls off the schedule late is lab or operating room time that rarely gets refilled.",
      },
      {
        t: "Fewer day-of surprises",
        d: "Fasting, medication hold, and clearance failures that only surface when the patient arrives.",
      },
      {
        t: "Fewer 30-day readmissions",
        d: "The costliest post-procedure failure, and the one CMS penalizes directly after CABG and acute MI.",
      },
      {
        t: "Higher follow-up visit attendance",
        d: "The visit where healing, restrictions, and device or medication checks actually happen.",
      },
      {
        t: "Better antiplatelet and anticoagulation adherence",
        d: "The regimen that protects the result, stopped quietly over a side effect nobody warned about.",
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
        d: "A record that the patient received and opened the guidance, which protects the program.",
      },
    ],
    catalog: [
      {
        t: "Coronary artery bypass surgery",
        v: "Versions: general + off-pump / OPCAB",
      },
      {
        t: "Heart valve repair or replacement",
        v: "",
      },
      {
        t: "Coronary angioplasty and stenting",
        v: "",
      },
      {
        t: "Aneurysm repair",
        v: "",
      },
      {
        t: "Minimally invasive heart surgery",
        v: "",
      },
      {
        t: "Implantable pacemaker",
        v: "",
      },
      {
        t: "Heart transplant",
        v: "",
      },
      {
        t: "Heart Health",
        v: "Where procedure orbits evolve once the episode closes",
      },
    ],
    beginSub:
      "Most programs start with their highest-volume case and template the rest.",
    beginItems: [
      {
        t: "Decision and consent.",
        d: "What the procedure is, what the options were, and what it involves.",
      },
      {
        t: "Preparation and clearance.",
        d: "Labs, imaging, medication holds, and fasting, one instruction at a time.",
      },
      {
        t: "Day of procedure.",
        d: "Arrival, what the day looks like, and who will be in the room.",
      },
      {
        t: "Recovery and follow-up.",
        d: "Restrictions week by week, warning signs, and the post-procedure visit.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They arrive ready on the day",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What the procedure is, why it was recommended, and what the alternatives were",
          "Every preparation instruction on the day it has to be done, not all at once",
          "Recovery expectations week by week, with the signs that warrant a call",
          "The same guide works for whoever drives them home",
        ],
      },
      {
        kicker: "For your team",
        t: "Fewer cancellations to rebook",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Ordered when the case is booked, running until the follow-up visit",
          "Fewer calls about prep, and fewer day-of surprises",
          "Your protocols and your brand, not a generic surgery handout",
          "One procedure template versions the long tail of case types",
        ],
      },
      {
        kicker: "For the program",
        t: "The schedule holds",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who completed preparation and who never opened it, before the day",
          "Cancellation and rebooking patterns visible by case type",
          "PROMs collected before and after without coordinator time",
          "Engagement and completion by proceduralist and by site",
        ],
      },
    ],
  },
  {
    label: "Rehab & prevention",
    nameLower: "cardiac rehab",
    line: "The reimbursed program most eligible patients never start, and the risk work that happens before anyone is a patient.",
    headLead: "Enrolled, and still there at",
    headEm: "session thirty-six",
    intro:
      "Your rehab and prevention guidance in your clinicians' own words, delivered across the whole course rather than at orientation. Alongside the referral and the intake call, an orbit adds a consumer-grade digital mentor: engaging video, email, and text outreach that gets referred patients to start, and keeps them coming.",
    gapLead: "A referral is not",
    gapEm: "an enrollment",
    gapIntro:
      "Cardiac rehab is one of the best-evidenced interventions in cardiology and one of the least used. The decision to start, and the decision to keep going in week four, are both made at home. That is the understanding gap, and the figures below are what it costs. As visit time shrinks, extending your team's presence into those weeks matters more, not less.",
    gapBridge:
      "None of this is decided in the clinic. Each one turns on whether a patient understood why rehab matters, knew what a session involves, and kept going after the novelty wore off.",
    studyLead: "The rehab pilot",
    studyEm: "behind the numbers",
    studySub:
      "This result was measured in exactly this segment: a nine-month observational pilot, alongside the platform's controlled trial in oncology.",
    libIntro:
      "Two orbits carry this segment: the rehab journey itself, and the Heart Health orbit that reaches people before and after it.",
    money: [
      {
        v: "About 1 in 4",
        t: "Eligible patients who start rehab",
        d: "One of the best-evidenced interventions in cardiology, and most eligible patients never begin it.",
        src: "Published Medicare analyses",
      },
      {
        v: "Under half",
        t: "Of those who start, finish",
        d: "Referral, enrollment, and completion each leak patients, and completion is where the benefit lives.",
        src: "Published participation and completion literature",
      },
      {
        v: "36",
        t: "Sessions in a funded course",
        d: "Every enrolled patient is a reimbursable program. Every session nobody attends is a session nobody bills.",
        src: "Medicare cardiac rehabilitation benefit",
      },
      {
        v: "52%",
        t: "Started rehab after activating their orbit",
        d: "Nine-month pilot at a leading Midwest health system: 52% of patients who activated their orbit started the program, against 24% of those who never did.",
        src: "Pritikin ICR pilot, reported December 2023",
      },
    ],
    measures: [
      {
        t: "Higher cardiac rehab enrollment",
        d: "A referral that never becomes an enrollment is billed to nobody and helps no one.",
      },
      {
        t: "Higher rehab completion",
        d: "Completion is where the mortality benefit lives, and where most programs leak patients.",
      },
      {
        t: "Better program utilization",
        d: "Rehab capacity you already staff and already pay for, actually filled.",
      },
      {
        t: "Fewer 30-day readmissions",
        d: "Completed rehab is one of the strongest levers against cardiac readmission.",
      },
      {
        t: "Better medication adherence",
        d: "Cardiac regimens only work when they are taken, and nobody sees the bottle between sessions.",
      },
      {
        t: "Better risk-factor control",
        d: "Activity, diet, and smoking, supported on the days between sessions rather than at intake.",
      },
      {
        t: "Higher PROM completion",
        d: "Required for quality programs and value-based contracts, and usually chased by hand.",
      },
      {
        t: "New patient acquisition",
        d: "Prevention and screening outreach reaches people before they are anyone's patient.",
      },
    ],
    catalog: [
      {
        t: "Cardiac rehabilitation",
        v: "Versions: newly prescribed + full journey",
      },
      {
        t: "Heart Health",
        v: "Versions: general patient + at-risk + senior + community",
      },
    ],
    beginSub:
      "Most programs start at the referral and work outward in both directions.",
    beginItems: [
      {
        t: "Referral to enrollment.",
        d: "Why rehab matters and what a session actually involves.",
      },
      {
        t: "Through the course.",
        d: "Week-by-week support for the patient who has quietly stopped coming.",
      },
      {
        t: "After the last session.",
        d: "Keeping the habits that the program built.",
      },
      {
        t: "Prevention and risk.",
        d: "Screening and referral before they are a patient.",
      },
    ],
    pov: [
      {
        kicker: "For the patient",
        t: "They know why it is worth showing up",
        label: "#A8412F",
        dot: "#E3735C",
        items: [
          "What rehab is for, what a session involves, and what to wear",
          "What to expect week by week, including the week motivation drops",
          "Activity, diet, and medication guidance on the days between sessions",
          "The same guide works for whoever is driving them there",
        ],
      },
      {
        kicker: "For your team",
        t: "Fewer empty slots to backfill",
        label: "#2D5A87",
        dot: "#2D5A87",
        items: [
          "Issued at referral, no new FTEs and no new intake step",
          "Fewer calls asking what orientation already covered",
          "Your protocols and your brand, not a generic fitness app",
          "We build and maintain the content, including guideline updates",
        ],
      },
      {
        kicker: "For the program",
        t: "Enrollment you can see coming",
        label: "#5B9BEA",
        dot: "#5B9BEA",
        items: [
          "Who activated their orbit and who never did, by referral",
          "Drop-off visible in week four rather than at the audit",
          "Engagement and completion by cohort and by site",
          "Optional: validated measures scored automatically",
        ],
      },
    ],
  },
];
