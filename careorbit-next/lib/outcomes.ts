/* Outcomes & ROI content, ported verbatim from Outcomes.dc.html renderVals().
 * Copy is brief-locked. Stat claims and their framing (controlled trial vs
 * observational pilot) are preserved exactly - CLAUDE.md requires models be
 * labelled as models and the Pritikin pilot be described as observational.
 *
 * DEAD CODE NOT PORTED:
 *  - `trialStats` (5 entries) is computed but rendered nowhere.
 *  - each `how` entry carries href/cta, but the how-we-work grid renders
 *    only n/t/d - there is no link in that markup.
 */

export const HOW = [
  {
    n: "01",
    t: "Design backwards from the outcome",
    d: "Before anything is built, we sit down with your team and choose the outcomes that matter most to your organization, clinical and financial, and define exactly how each will be measured.",
  },
  {
    n: "02",
    t: "Build the orbit around your care journey",
    d: "Your material, your protocols, and your clinical voice, structured into a guided journey by our expert team rather than assembled binder by binder.",
  },
  {
    n: "03",
    t: "Track engagement continuously",
    d: "Every patient carries an Engagement Index across knowledge, feeling, and actions. Program dashboards roll it up so you see adoption, completion, and drop-off as they happen.",
  },
  {
    n: "04",
    t: "Prove the value, both kinds",
    d: "Trackable reporting ties engagement to the outcomes chosen up front, continuously proving the human and financial value in evidence you can send to your CFO or committee.",
  },
];

export const STUDIES = [
  {
    slot: "study-oncology",
    src: "/images/case-study-siteman.webp",
    imgHint: "[Placeholder: Siteman care team photo]",
    dot: "#E3735C",
    tag: "Oncology · Controlled trial",
    t: "The Siteman controlled clinical trial",
    d: "Hepatobiliary surgery patients on a CareOrbit journey: +65% understanding of the treatment plan, −53% calls to the office, −41% re-admissions, +22% satisfaction.",
    href: "/evidence/siteman-study",
    cta: "Read the study results",
  },
  {
    slot: "study-cardiac",
    src: "/images/study-cardiac-rehab.webp",
    imgHint: "[Placeholder: cardiac rehab photo]",
    dot: "#2D5A87",
    tag: "Cardiology · Pilot",
    t: "The Pritikin Cardiac Rehab pilot",
    d: "A pilot at two leading Midwest healthcare organizations produced a 20–40% year-over-year increase in monthly Cardiac Rehab enrollment. Observational, and labeled as such.",
    href: "/evidence/pritikin-pilot",
    cta: "Read the pilot results",
  },
  {
    slot: "study-assess",
    src: "/images/study-va-escreening.webp",
    imgHint: "[Placeholder: screening in clinic photo]",
    dot: "#4FB3BF",
    tag: "Assess · Deployment",
    t: "eScreening across the VA",
    d: "The assessment engine behind CareOrbit Assess, deployed across VA sites with published evidence on screening completion and staff time.",
    href: "/evidence/escreening-results",
    cta: "Read the published evidence",
  },
];

export const ROI_EXAMPLES = [
  {
    slot: "roi-missed-appts",
    src: "/images/roi-missed-appts.webp",
    imgHint: "[Placeholder: clinic schedule or front desk photo]",
    dot: "#E3735C",
    tag: "Targeted ROI · Missed appointments",
    t: "Missed appointments and no-shows",
    outcome:
      "Prepared patients who show up: fewer no-shows, same-day cancellations, and delayed procedures, protecting OR, chair, and clinic capacity.",
    tracked:
      "Orbit engagement matched against attendance in your scheduling system, reported by clinic and appointment type. Modeled against your volumes and payer mix on a call, and labeled as a model until your data replaces it.",
  },
  {
    slot: "roi-vbc",
    src: "/images/roi-vbc.webp",
    imgHint: "[Placeholder: quality dashboard screenshot]",
    dot: "#2D5A87",
    tag: "Targeted ROI · Value-based care",
    t: "Value-based care initiatives",
    outcome:
      "Documented education, PROMs collected on schedule, and readmission performance quality contracts pay on. The Siteman trial measured a 41% reduction in re-admissions.",
    tracked:
      "Completion and PROMs return rates tracked per patient in the Engagement Index, rolled up in program dashboards, exported for quality reporting without added FTEs.",
  },
  {
    slot: "roi-enrollment",
    src: "/images/roi-enrollment.webp",
    imgHint: "[Placeholder: cardiac rehab session photo]",
    dot: "#1A6B3C",
    tag: "Targeted ROI · Program enrollment",
    t: "Reimbursable program enrollment",
    outcome:
      "More patients starting and completing reimbursable programs. The Pritikin pilot lifted Cardiac Rehab enrollment 20–40% year over year at two Midwest organizations.",
    tracked:
      "Referral-to-start conversion and session completion tracked per program, with revenue modeled only on measured lift.",
  },
  {
    slot: "roi-staff-time",
    src: "/images/roi-staff-time.webp",
    imgHint: "[Placeholder: care team at station photo]",
    dot: "#B05A46",
    tag: "Targeted ROI · Staff time",
    t: "Care team time returned",
    outcome:
      "Fewer repeat questions answered one patient at a time. The Siteman trial measured 53% fewer patient calls to the office.",
    tracked:
      "Call volume and manual outreach measured before and after go-live, alongside which orbit topics patients engaged instead of calling.",
  },
];

export const ROI = [
  {
    t: "Throughput & preparedness",
    accent: "#E3735C",
    points: [
      "Fewer cancellations, delays, and no-shows",
      "Prepared patients protect OR, chair, and clinic capacity",
      "Reduced manual outreach for stretched staff",
    ],
  },
  {
    t: "Quality & value-based care",
    accent: "#2D5A87",
    points: [
      "Stronger value-based care performance",
      "Outcome documentation quality contracts pay on",
      "PROMs readiness without added FTEs",
    ],
  },
  {
    t: "Visibility",
    accent: "#1E3A5F",
    points: [
      "Adoption, completion, and drop-off, measured",
      "Credible ROI narratives for boards and payers",
      "Rising-risk patients surfaced early",
    ],
  },
];

export const TAB_LINES = [
  "The human results: what patients understood, did, and reported, measured in controlled and real-world settings.",
  "The financial results: the returns that matter most to your organization, which each orbit is designed backwards from, with the tracking that proves them.",
];
