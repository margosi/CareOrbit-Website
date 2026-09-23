/* Pritikin ICR pilot page data. Extracted verbatim from
 * v2-maven/PritikinPilot.dc.html renderVals() (lines 168-199).
 *
 * CLAUDE.md: UnityPoint only, referred to throughout as "a leading Midwest
 * health system"; 187 invited; 52% vs 24% ICR starts over nine months;
 * observational, not randomized. The page reports its own KPI scorecard
 * including the two goals that could not be evaluated and the one that
 * fell short - that honesty is part of the copy and is carried over whole.
 */

export type ToplineStat = { n: string; l: string; d: string; c: string };
export type Cohort = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  sub: string;
  rate: string;
  rows: { v: string; k: string }[];
};
export type Goal = {
  verdict: string;
  tone: string;
  name: string;
  target: string;
  result: string;
};
export type Obstacle = { n: string; t: string; s: string };

export const TOPLINE: ToplineStat[] = [
  {
    n: "52%",
    c: "#FFFFFF",
    l: "Activated, then started ICR",
    d: "26 of the 50 patients who activated their orbit started the program.",
  },
  {
    n: "24%",
    c: "#8FA5BC",
    l: "Never activated, then started",
    d: "34 of the 141 who did not activate. Less than half the activated rate.",
  },
  {
    n: "32%",
    c: "#FFFFFF",
    l: "Combined, all invited",
    d: "The overall start rate across all 187 invited patients, well below the activated cohort.",
  },
  {
    n: "9",
    c: "#FFFFFF",
    l: "Months of pilot data",
    d: "Pilot months 1 through 9 at one outlet, reported December 2023.",
  },
];

export const COHORTS: Cohort[] = [
  {
    kicker: "Activated their orbit",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Opened and used the orbit they were invited to",
    rate: "52%",
    sub: "Half of these patients went on to start Intensive Cardiac Rehabilitation.",
    rows: [
      {
        k: "invited to an orbit",
        v: "187",
      },
      {
        k: "activated their orbit",
        v: "50",
      },
      {
        k: "started ICR",
        v: "26",
      },
      {
        k: "ICR sessions completed",
        v: "1,302",
      },
    ],
  },
  {
    kicker: "Did not activate",
    label: "#2D5A87",
    dot: "#2D5A87",
    t: "Invited to an orbit but never activated it",
    rate: "24%",
    sub: "Fewer than one in four of these patients started the program.",
    rows: [
      {
        k: "invited to an orbit",
        v: "187",
      },
      {
        k: "did not activate",
        v: "141",
      },
      {
        k: "started ICR",
        v: "34",
      },
      {
        k: "ICR sessions completed",
        v: "1,402",
      },
    ],
  },
];

export const GOALS: Goal[] = [
  {
    name: "Growth in new Pritikin ICR enrollments",
    target: "10% year-over-year increase",
    verdict: "Inconclusive",
    tone: "#6F6A62",
    result:
      "26 enrollments in the pilot period, with no prior-year figures at this site to compare against.",
  },
  {
    name: "Share of eligible patients invited to an orbit",
    target: "90% of eligible patients",
    verdict: "Inconclusive",
    tone: "#6F6A62",
    result:
      "187 patients were invited, but the site could not report how many were eligible overall.",
  },
  {
    name: "Share of invited patients who activate",
    target: "75% activation",
    verdict: "Below target",
    tone: "#A8412F",
    result:
      "27% activated. Only 27% of new ICR candidates received the extended engagement emails, which we treat as the primary cause.",
  },
];

export const OBSTACLES: Obstacle[] = [
  {
    n: "01",
    t: "No historical ICR start data at the site, so year-over-year comparison was impossible.",
    s: "Run the next pilot as a true randomized A/B test: every other eligible patient receives an orbit.",
  },
  {
    n: "02",
    t: "Year-to-year changes in insurer ICR reimbursement policy and provider coverage skewed any year-over-year read.",
    s: "Same fix. A randomized concurrent design removes payer-policy drift from the comparison.",
  },
  {
    n: "03",
    t: "Staffing changes and shortages made orbit invitation and onboarding inconsistent. Only 27% of new ICR candidates received the engagement pathway emails.",
    s: "Shorter pilot window plus Epic integration, so invitation and engagement fire automatically rather than depending on staff availability.",
  },
  {
    n: "04",
    t: "Orbit activation reached 27% against a 75% goal.",
    s: "Rebuilt engagement pathway emails aimed at a 50 to 75% activation range.",
  },
  {
    n: "05",
    t: "Site staff could not see or manage the status of patients they had invited.",
    s: "Shipped. Patient invitation status is now visible and editable by site staff in the platform.",
  },
];
