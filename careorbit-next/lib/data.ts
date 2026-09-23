/* Data Insights page content, ported verbatim from DataPage.dc.html renderVals().
 * Copy is brief-locked. */

export const STEPS = [
  {
    t: "Track every action, and inaction",
    kicker: "Step 01",
    label: "#A8412F",
    dot: "#E3735C",
    items: [
      "CareOrbit tracks all user actions and inactions with the system: what was opened, completed, skipped, and when.",
      "Signals accrue from the first patient in your first orbit. No separate instrumentation project.",
    ],
  },
  {
    t: "Generate the engagement index",
    kicker: "Step 02",
    label: "#2D5A87",
    dot: "#5B9BEA",
    items: [
      "Behavior is scored against a predetermined ideal engagement pattern, the one that supports an ideal care journey.",
      "One index per patient, per journey, readable at a glance and comparable across cohorts.",
    ],
  },
  {
    t: "Align with outcome metrics",
    kicker: "Step 03",
    label: "#1F6B73",
    dot: "#4FB3BF",
    items: [
      "The index is aligned with the outcome metrics you already report on: readmissions, program starts, completion, satisfaction.",
      "So engagement stops being a soft measure and becomes a leading indicator your teams can act on.",
    ],
  },
  {
    t: "Optimize every journey",
    kicker: "Step 04",
    label: "#A4503F",
    dot: "#F2B8C6",
    items: [
      "Proprietary AI-based engagement tools keep tuning each patient's experience toward what works.",
      "The goal is simple: every patient successfully navigating their current health journey.",
    ],
  },
];

export const OWNERSHIP = [
  {
    kicker: "Your data",
    t: "You own your own data",
    label: "#2D5A87",
    dot: "#5B9BEA",
    d: "Everything your orbits generate belongs to you, inside your governance, from day one.",
    items: [
      {
        t: "Included from orbit one.",
        d: "Engagement data starts accruing the moment your first orbit launches.",
      },
      {
        t: "Owned by you.",
        d: "Patient-level data stays yours. CareOrbit never sells or shares it.",
      },
      {
        t: "Reported your way.",
        d: "By journey, service line, cohort, or program, aligned to the metrics you already use.",
      },
      {
        t: "Committee ready.",
        d: "Reporting your quality and program leaders can take into the room.",
      },
    ],
  },
  {
    kicker: "Data Insights",
    t: "Insights as a service",
    label: "#1F6B73",
    dot: "#4FB3BF",
    d: "Findings from de-identified, aggregated engagement data, available as a service beyond your own reporting.",
    items: [
      {
        t: "For health systems.",
        d: "How engagement patterns differ across journeys, populations, and programs.",
      },
      {
        t: "For life sciences and payers.",
        d: "How patients actually navigate the journeys their products and plans depend on.",
      },
      {
        t: "For other industries.",
        d: "Benchmarks and analyses built to a question, delivered as a service.",
      },
      {
        t: "Always de-identified.",
        d: "Aggregated and governed. Never your patients, never your patient-level data.",
      },
    ],
  },
];

export const INDEX = [
  {
    i: "01",
    t: "Actions and inactions",
    d: "Opens, completions, skips, and silences, every signal counts, including the missing ones.",
  },
  {
    i: "02",
    t: "Scored against an ideal",
    d: "A predetermined ideal engagement pattern defines what on track looks like for each journey.",
  },
  {
    i: "03",
    t: "One readable number",
    d: "An index per patient and per cohort, so a navigator sees who needs a call today.",
  },
  {
    i: "04",
    t: "Tied to outcomes",
    d: "Aligned with your desired outcome metrics, so engagement predicts results instead of describing activity.",
  },
];

export const AI = [
  {
    t: "Adaptive",
    d: "AI-based engagement tools adjust timing, channel, and content per patient.",
  },
  {
    t: "Proactive",
    d: "Falling engagement surfaces before it becomes a missed appointment.",
  },
  {
    t: "Learning",
    d: "Every journey improves the ideal pattern the next one is scored against.",
  },
  {
    t: "Human",
    d: "The index points your team to the right patient. People make the call.",
  },
];

export const INSIGHTS = [
  {
    n: "01",
    t: "De-identified by default",
    d: "Insights are drawn only from de-identified, aggregated engagement data across journeys.",
  },
  {
    n: "02",
    t: "Built to a question",
    d: "Benchmarks, cohort analyses, and engagement-to-outcome findings scoped to what you need to know.",
  },
  {
    n: "03",
    t: "Delivered as a service",
    d: "Recurring reports or one-time analyses, for health systems, life sciences, payers, and other industries.",
  },
  {
    n: "04",
    t: "Grounded in real journeys",
    d: "Not survey data: observed behavior from patients navigating real care journeys.",
  },
];

export const FAQS = [
  {
    q: "Who owns the data?",
    a: "You do. Your patient-level data is yours from the first orbit, inside your governance. Data Insights uses only de-identified, aggregated data.",
  },
  {
    q: "What is the engagement index?",
    a: "A score of each patient's actions and inactions against a predetermined ideal engagement pattern, the one that supports an ideal care journey.",
  },
  {
    q: "How does it connect to our outcome metrics?",
    a: "The index is aligned with the outcomes you already report on, so engagement becomes a leading indicator rather than a vanity metric.",
  },
  {
    q: "What does the AI actually do?",
    a: "Proprietary AI-based engagement tools continuously tune each patient's experience, timing, channel, and content, to keep them successfully navigating their current health journey.",
  },
];
