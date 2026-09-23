/* Pricing content for all four plan pages, ported verbatim from
 * Pricing / PricingAssess / PricingCapture / PricingData .dc.html.
 * Copy is brief-locked.
 *
 * The four pages share one card layout. Differences, all preserved:
 *  - only the base Orbit Solutions page shows the "Optional add-on" box
 *  - Capture and Data Insights render a coral `price` line under the scope text
 *    (and their scope div drops the 30px bottom margin as a result)
 *  - each page has its own kicker, heading, blurb and footer note
 */

export type Plan = {
  name: string;
  tag: string;
  /** Coral price line. Capture and Data Insights only. */
  price?: string;
  scope: string;
  href: string;
  /** "Everything in X and:" line above the feature list. "" hides it. */
  inherit: string;
  ring2: 0 | 1;
  ring3: 0 | 1;
  /** Optional add-on box copy. Base Orbit Solutions page only. */
  assess?: string;
  items: string[];
};

export type PricingPageData = {
  screenLabel: string;
  kicker: string;
  heading: React.ReactNode;
  blurb: string;
  note: string;
  plans: Plan[];
};

const q = (tier: string) => `/book-a-call?src=quote-${tier}`;

/* ------------------------------------------------- Orbit Solutions -- */
export const ORBIT_PLANS: Plan[] = [
  {
    name: "Single Orbit Solution",
    tag: "One orbit line, live fast",
    scope:
      "For a single clinic or program proving the model with one clinical journey.",
    href: q("get-started"),
    inherit: "",
    ring2: 0,
    ring3: 0,
    assess:
      "Add scheduled symptom and progress check-ins for your orbit line's patients.",
    items: [
      "Custom orbits built with your care teams",
      "Engage: guided patient delivery by text and email",
      "Capture built-in: turn your existing materials into orbit content, auto delivered to active CareOrbits",
      "No EHR integration required to launch",
      "Onboarding and staff training",
      "Baseline outcome reporting",
      "Quarterly outcomes reporting",
      "24/7 Support",
    ],
  },
  {
    name: "Department",
    tag: "A full service line on orbit",
    scope:
      "For a department running multiple journeys with patient-reported data flowing back to the team.",
    href: q("department"),
    inherit: "Everything in Single Orbit Solution and:",
    ring2: 1,
    ring3: 0,
    assess:
      "Add department-wide check-ins with escalation routing to the right team members.",
    items: [
      "Multiple orbit lines across the department",
      "Capture built-in across all department orbit lines",
      "EHR workflow integration",
      "Dedicated customer success manager",
      "System-level analytics and ROI reporting",
      "Department-level insights",
    ],
  },
  {
    name: "Full Enterprise",
    tag: "Every journey, system-wide",
    scope:
      "For health systems standardizing patient guidance across sites and service lines.",
    href: q("enterprise"),
    inherit: "Everything in Department, plus:",
    ring2: 1,
    ring3: 1,
    assess:
      "Add system-wide patient-reported data with population-level analytics.",
    items: [
      "Unlimited orbit lines across the system",
      "Capture built-in system-wide, including other informational resources",
      "Enterprise integration",
      "Input on the product roadmap",
    ],
  },
];

/* --------------------------------------------------------- Assess -- */
export const ASSESS_PLANS: Plan[] = [
  {
    name: "Single Program",
    tag: "One program, listening fast",
    scope:
      "For one clinic or program adding scheduled patient check-ins to an existing workflow.",
    href: q("assess-single"),
    inherit: "",
    ring2: 0,
    ring3: 0,
    items: [
      "One assessment pathway",
      "Scheduled symptom and progress check-ins by text and email",
      "Standard question sets reviewed with your clinicians",
      "Responses delivered to a shared team inbox",
      "Onboarding and staff training",
      "Baseline reporting snapshot",
      "Email support",
    ],
  },
  {
    name: "Department",
    tag: "A full service line listening",
    scope:
      "For a department running check-ins across multiple programs with responses routed to the right people.",
    href: q("assess-department"),
    inherit: "Everything in Single Program and:",
    ring2: 1,
    ring3: 0,
    items: [
      "Multiple assessment pathways across the department",
      "Custom question sets built with your care teams",
      "Escalation routing by role and urgency",
      "EHR workflow integration",
      "Trend views across patients and programs",
      "Dedicated customer success manager",
      "Quarterly outcomes reporting",
    ],
  },
  {
    name: "Full Enterprise",
    tag: "Every program, system-wide",
    scope:
      "For health systems standardizing patient-reported data across sites and service lines.",
    href: q("assess-enterprise"),
    inherit: "Everything in Department, plus:",
    ring2: 1,
    ring3: 1,
    items: [
      "Unlimited assessment pathways across the system",
      "Enterprise integration and single sign-on",
      "System-branded patient experience",
      "Population-level analytics and ROI reporting",
      "Research-ready data exports",
      "Input on the product roadmap",
    ],
  },
];

/* -------------------------------------------------------- Capture -- */
export const CAPTURE_PLANS: Plan[] = [
  {
    name: "Single Journey",
    tag: "One care journey, captured",
    price: "Priced by project, or included with an associated orbit",
    scope:
      "For one clinic or program digitizing a single care journey, with or without an associated orbit for distribution and tracking.",
    href: q("captivate-single"),
    inherit: "",
    ring2: 0,
    ring3: 0,
    items: [
      "One care journey converted to digital, guided format",
      "Plain-language rewrite of existing content",
      "Clinician review and approval workflow",
      "With an associated orbit: automatic distribution and tracking through the CareOrbits patients already follow",
      "Without one: standalone delivery by text, email, and QR code",
      "Expert-guided intake: our team structures what to convert and how it maps to the care journey",
      "Onboarding and staff training",
      "Email support",
    ],
  },
  {
    name: "Department",
    tag: "A department's library, captured",
    price: "Scoped to programs and seats",
    scope:
      "For a department converting care journeys across multiple programs and keeping them current.",
    href: q("captivate-department"),
    inherit: "Everything in Single Journey and:",
    ring2: 1,
    ring3: 0,
    items: [
      "Multiple care journeys across the department",
      "Ongoing updates as your materials change, auto delivered to active CareOrbits",
      "Expert conversion strategy across the department: what to convert first and why",
      "Custom sequencing built with your care teams",
      "EHR workflow integration",
      "Content engagement reporting",
      "Dedicated customer success manager",
    ],
  },
  {
    name: "Full Enterprise",
    tag: "Every resource, system-wide",
    price: "Scoped to sites and service lines",
    scope:
      "For health systems capturing, governing, and auto delivering education and informational resources across sites and service lines.",
    href: q("captivate-enterprise"),
    inherit: "Everything in Department, plus:",
    ring2: 1,
    ring3: 1,
    items: [
      "Unlimited care journeys across the system",
      "Version control and content governance",
      "Enterprise integration and single sign-on",
      "System-branded patient experience",
      "System-level analytics and ROI reporting",
      "Input on the product roadmap",
    ],
  },
];

/* --------------------------------------------------- Data Insights -- */
export const DATA_PLANS: Plan[] = [
  {
    name: "Included Reporting",
    tag: "Your data, with every orbit",
    price: "Included with every orbit",
    scope:
      "For every CareOrbit customer. Engagement data and reporting begin with your first orbit, and you own your own data.",
    href: q("included"),
    inherit: "",
    ring2: 0,
    ring3: 0,
    items: [
      "Engagement index per patient and per journey, scored against a predetermined ideal care journey",
      "Every action and inaction tracked across the system",
      "Reporting by journey, service line, cohort, and program",
      "Alignment with the outcome metrics you already report on",
      "Committee-ready reporting for quality and program leaders",
      "You own your patient-level data, inside your governance",
      "De-identified and aggregated, always",
    ],
  },
  {
    name: "Insights Reports",
    tag: "Findings built to a question",
    price: "Priced by report or analysis",
    scope:
      "For teams that need benchmarks, cohort analyses, or engagement-to-outcome findings beyond their own reporting.",
    href: q("reports"),
    inherit: "Everything in Included Reporting and:",
    ring2: 1,
    ring3: 0,
    items: [
      "One-time analyses scoped to your question",
      "Benchmarks across de-identified journeys and populations",
      "Engagement-to-outcome findings on real, observed behavior",
      "Working session with our team to review the findings",
      "Recurring reports on the cadence you choose",
    ],
  },
  {
    name: "Insights as a Service",
    tag: "A recurring insights program",
    price: "Annual subscription, scoped to scope and cadence",
    scope:
      "For health systems, life sciences, payers, and other industries that need a continuing view of how patients navigate care.",
    href: q("service"),
    inherit: "Everything in Insights Reports, plus:",
    ring2: 1,
    ring3: 1,
    items: [
      "Custom benchmark sets for your journeys and markets",
      "AI-based engagement trend analysis across cohorts",
      "Dedicated analyst and quarterly review sessions",
      "Input on the insights roadmap",
    ],
  },
];

export const NOTES = {
  orbit:
    "Pricing is scoped to your service lines, patient volume, and integration needs. Every quote conversation is a 30 minute meeting with our team, no obligation.",
  assess:
    "Pricing is scoped to your programs, patient volume, and integration needs. Every quote conversation is a 30 minute meeting with our team, no obligation.",
  capture:
    "Start with a single journey, priced by project or included with an associated orbit, and scale from there. Pricing is scoped to your content volume and review workflow. Every quote conversation is a 30 minute meeting with our team, no obligation.",
  data: "Insights are drawn only from de-identified, aggregated engagement data. Your patient-level data stays yours, inside your governance. Every quote conversation is a 30 minute meeting with our team, no obligation.",
};
