/* VA eScreening evidence page data. Extracted verbatim from
 * v2-maven/EScreeningResults.dc.html renderVals() (lines 184-233).
 *
 * These are VA program results from three peer-reviewed publications,
 * cited as evidence for the approach CareOrbit Assess is built on - not
 * CareOrbit outcomes. The page says so in its own copy, including the
 * implementation study's negative finding and the explicitly modelled
 * national projection.
 */

export type ToplineStat = { n: string; l: string; d: string };
export type MeasureRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  src: string;
  d: string;
  stats: { n: string; l: string }[];
};
export type DashItem = { t: string; d: string };
export type ScaleStat = { n: string; l: string };
export type ProvenanceRow = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  items: DashItem[];
};

export const TOPLINE: ToplineStat[] = [
  {
    n: "10.5 days",
    l: "Faster into the record",
    d: "Median time from screening to medical record entry fell from 10 to 11 days on paper to 1 day.",
  },
  {
    n: "98–100%",
    l: "Mandated screens completed",
    d: "TBI, PTSD, depression, and alcohol screens all documented at 98.4 to 99.7%, against 89 to 93% on paper.",
  },
  {
    n: "5×",
    l: "Faster clinician follow-up",
    d: "Median 1 business day from screening to Care Management follow-up, against 5 on paper.",
  },
  {
    n: "19+",
    l: "VA medical centers",
    d: "Adopted by 2022 through VA Diffusion of Excellence, with 18 more adoptions in progress.",
  },
];

export const MEASURES: MeasureRow[] = [
  {
    kicker: "Speed to the record",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Time from screening to medical record documentation",
    src: "Pittman et al., 2017",
    stats: [
      {
        n: "1 day",
        l: "median with eScreening",
      },
      {
        n: "10–11",
        l: "days median on paper",
      },
    ],
    d: "Across the four mandated clinical reminders, eScreening moved results into the record the same day or next day. The average median time savings was 10.5 days per screen.",
  },
  {
    kicker: "Completion",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "Documentation of mandated health screens",
    src: "Pittman et al., 2017",
    stats: [
      {
        n: "98–100%",
        l: "with eScreening",
      },
      {
        n: "89–93%",
        l: "on paper",
      },
    ],
    d: "Six-month chart review of TBI, PTSD, depression, and alcohol screens. Depression documentation reached 99.7% with eScreening against 93.0% on paper.",
  },
  {
    kicker: "Connection to care",
    label: "#2D5A87",
    dot: "#5B9BEA",
    t: "From screening into the health system",
    src: "Pittman et al., 2017",
    stats: [
      {
        n: "1 vs 5",
        l: "business days to clinician follow-up",
      },
      {
        n: "More",
        l: "specialty consults, faster vesting",
      },
    ],
    d: "eScreening veterans received more specialty clinic consults, attended their vesting appointment at a higher rate, vested into the health system faster, and had required suicide risk assessments documented significantly sooner.",
  },
  {
    kicker: "Satisfaction",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Veteran satisfaction with screening",
    src: "Pittman et al., 2017; Almklov et al., 2020",
    stats: [
      {
        n: "Higher",
        l: "than paper screening, 2017",
      },
      {
        n: "High",
        l: "satisfaction after redesign, 2020",
      },
    ],
    d: "Veterans were slightly more satisfied with eScreening than paper in the 2017 comparison. After user-centered improvements, a follow-up study found veterans highly satisfied with usability, information security, and impact on their care.",
  },
  {
    kicker: "Detection",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "Did the medium change the answers?",
    src: "Pittman et al., 2017",
    stats: [
      {
        n: "Similar",
        l: "rates of positive health screens",
      },
    ],
    d: "Rates of positive screens were comparable between paper and electronic cohorts across nearly all measures, evidence that moving screening onto a device did not distort what patients report.",
  },
];

export const IMPL_FINDINGS: DashItem[] = [
  {
    t: "One clinic fully implemented,",
    d: "two partially implemented, and one did not adopt eScreening as part of normal practice after six months.",
  },
  {
    t: "The technology posed no barriers",
    d: "in any of the four settings, as published. The barriers were staffing support and perceived leadership support.",
  },
  {
    t: "Training and technical assistance",
    d: "were cited as the important facilitators, and organizational engagement scores tracked with implementation success.",
  },
  {
    t: "Why we cite it:",
    d: "assessment programs succeed or fail on workflow fit, which is why Assess deploys from the workflow you already run rather than adding one.",
  },
];

export const SCALE_STATS: ScaleStat[] = [
  {
    n: "$214M",
    l: "Projected annual cost for providers and LPNs to administer questionnaires across 130 VA medical centers",
  },
  {
    n: "910 + 650",
    l: "Physician and LPN full-time equivalents projected to be consumed by questionnaire administration each year",
  },
  {
    n: "106M",
    l: "Projected physician minutes per year spent filling out questionnaires",
  },
];

export const PROVENANCE: ProvenanceRow[] = [
  {
    kicker: "Origin",
    label: "#A8412F",
    dot: "#E3735C",
    t: "Built by VA clinicians, for VA clinics",
    items: [
      {
        t: "Developed in 2012",
        d: "at the VA Center of Excellence for Stress and Mental Health, VA San Diego, for the Military 2 VA care management program.",
      },
      {
        t: "Veteran-facing by design:",
        d: "patients self-report on their own device or a clinic tablet, and responses flow directly into the VA electronic medical record, satisfying clinical reminders.",
      },
    ],
  },
  {
    kicker: "Recognition",
    label: "#1F6B73",
    dot: "#4FB3BF",
    t: "Spread through the VA's own vetting",
    items: [
      {
        t: "Named a Gold Status Practice",
        d: "by the VA Under Secretary of Health in 2016 and a Diffusion of Excellence Promising Practice.",
      },
      {
        t: "Adopted at 19 VA medical centers by 2022,",
        d: "with 18 more adoptions in progress through the Diffusion of Excellence program.",
      },
      {
        t: "Patented:",
        d: "the eScreening approach is covered by US Patent 12,683,023.",
      },
    ],
  },
  {
    kicker: "The published record",
    label: "#2D5A87",
    dot: "#5B9BEA",
    t: "Three peer-reviewed studies",
    items: [
      {
        t: "Pittman et al., 2017, Psychological Services:",
        d: "1,372-veteran comparison of eScreening against paper screening.",
      },
      {
        t: "Pittman et al., 2019, BMC Health Services Research:",
        d: "mixed-method implementation study across four diverse VA clinics.",
      },
      {
        t: "Almklov et al., 2020, Military Medicine:",
        d: "post-9/11 veteran satisfaction with eScreening after user-centered redesign.",
      },
    ],
  },
];
