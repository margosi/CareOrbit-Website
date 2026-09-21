/* Siteman controlled clinical trial page data. Extracted verbatim from
 * v2-maven/SitemanStudy.dc.html renderVals() (lines 166-218).
 *
 * The page is wholly static - no dead keys, no calculator, no tabs - so
 * everything here is rendered.
 */

export type ToplineStat = { n: string; l: string; d: string };
export type MeasureRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  d: string;
  stats: { n: string; l: string }[];
};
export type Quote = { t: string; who: string };
export type DesignRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: { t: string; d: string }[];
};

export const TOPLINE: ToplineStat[] = [
  {
    n: "−41%",
    l: "Readmissions",
    d: "Reduction in readmissions vs. the control group.",
  },
  {
    n: "−53%",
    l: "Calls pre-op",
    d: "Fewer calls to the physician office before surgery, with 39% fewer post-op.",
  },
  {
    n: "+65%",
    l: "Patient understanding",
    d: "Improvement in understanding of the disease, treatment specifics, and pre- and post-treatment plans.",
  },
  {
    n: "+22%",
    l: "Patient satisfaction",
    d: "Improvement in HCAHPS and SF-36 satisfaction scores. Family satisfaction rose 38%.",
  },
];

export const MEASURES: MeasureRow[] = [
  {
    kicker: "Understanding",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Understanding of treatment plan and side effects",
    stats: [
      {
        n: "+65%",
        l: "patients",
      },
      {
        n: "+42%",
        l: "family members",
      },
    ],
    d: "Measured improvement in understanding of the disease, treatment specifics, and pre- and post-treatment plans, via validated surveys conducted as personal interviews.",
  },
  {
    kicker: "Navigation",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "Ability to navigate the care journey",
    stats: [
      {
        n: "87%",
        l: "of patients improved",
      },
      {
        n: "77%",
        l: "of families improved",
      },
    ],
    d: "Improvement in navigating the surgical process: working with the care team, logistical requirements including appointments, required actions, and follow-ups.",
  },
  {
    kicker: "Preparedness",
    label: "#2D5A87",
    dot: "#5B9BEA",
    t: "Preparedness and accountability",
    stats: [
      {
        n: "−53%",
        l: "calls pre-op",
      },
      {
        n: "−39%",
        l: "calls post-op",
      },
    ],
    d: "Fewer calls to the physician office in both periods, indicating patients and families arrived and recovered more prepared.",
  },
  {
    kicker: "Readmissions",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Readmission rate",
    stats: [
      {
        n: "−41%",
        l: "vs. control group",
      },
    ],
    d: "Reduction in readmissions among CareOrbit patients compared with the matched control group.",
  },
  {
    kicker: "Satisfaction",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "Satisfaction scores",
    stats: [
      {
        n: "+22%",
        l: "patients, HCAHPS and SF-36",
      },
      {
        n: "+38%",
        l: "family members",
      },
    ],
    d: "Improvement in patient HCAHPS and SF-36 satisfaction scores, with an even larger lift among family members.",
  },
  {
    kicker: "Support services",
    label: "#2D5A87",
    dot: "#5B9BEA",
    t: "Utilization of resources and support services",
    stats: [
      {
        n: "96%",
        l: "of patients and families",
      },
    ],
    d: "Reported reaching additional support and educational resources, internal and external to Siteman, from their orbits.",
  },
  {
    kicker: "Adoption",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Adoption and usage",
    stats: [
      {
        n: "90%",
        l: "activated their orbit",
      },
      {
        n: "107",
        l: "avg. page views per user",
      },
    ],
    d: "Of all users issued an orbit, 90% activated it, in under 4 days on average from invitation. Each patient and family member generated an average of 107 page views in their initial period of usage.",
  },
];

export const QUOTES: Quote[] = [
  {
    t: "It helps evolve the quality of our conversations, leading to understanding happening earlier for everyone who could be part of the patient’s improvement.",
    who: "On communication",
  },
  {
    t: "They are nervous and confused and it helps them see what they face in ways they are comfortable around.",
    who: "On lowering anxiety",
  },
  {
    t: "It was hard to deny the control group orbits for use during our study. We knew just how much an orbit could help them right now.",
    who: "On the control group",
  },
  {
    t: "I’m a nurse and I wish my own Dad had an orbit when he went through his procedure.",
    who: "A study nurse",
  },
];

export const DESIGN: DesignRow[] = [
  {
    kicker: "Participants",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Who was studied",
    items: [
      {
        t: "Approximately 125 users:",
        d: "50 patients plus approximately 75 family members, all issued orbits.",
      },
      {
        t: "Diagnosis and procedure:",
        d: "patients diagnosed with pancreatic ductal adenocarcinoma (PDAC) who had consented to surgery, Whipple or RAMPS, as part of their treatment plan.",
      },
      {
        t: "Matched control:",
        d: "participants were issued CareOrbit but otherwise treated identically to a matched non-CareOrbit control group.",
      },
    ],
  },
  {
    kicker: "Method",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "How results were measured",
    items: [
      {
        t: "Validated surveys,",
        d: "conducted as personal interviews with patients and family members, for measures such as navigation, understanding, and preparedness.",
      },
      {
        t: "Operational measures,",
        d: "including call volume, readmissions, activation, and usage, tracked directly.",
      },
    ],
  },
  {
    kicker: "Study author",
    label: "#2D5A87",
    dot: "#5B9BEA",
    t: "Who ran it",
    items: [
      {
        t: "Dr. Ryan C. Fields,",
        d: "chief of the Section of Surgical Oncology at Washington University School of Medicine, treating patients at Siteman Cancer Center, St. Louis.",
      },
      {
        t: "A nationally noted cancer surgeon and researcher",
        d: "focused on patients at high risk of cancer recurrence, running a translational research laboratory funded by the National Institutes of Health (NIH).",
      },
    ],
  },
];
