/* Book a Call content and ?src= routing, ported verbatim from
 * BookACall.dc.html. Copy is brief-locked.
 *
 * DEAD CODE NOT PORTED: `next` (5 numbered steps) is computed but rendered
 * nowhere in the markup.
 */

/** ?src= values that name a service line: pre-selects it and offers a
 *  pre-checked context box. */
export const SRC_LINES: Record<string, string> = {
  oncology: "Oncology",
  "primary-care": "Primary Care",
  cardiology: "Cardiology",
  orthopedics: "Orthopedics",
  "womens-health": "Women's Health",
  bariatrics: "Bariatrics",
  "behavioral-health": "Behavioral Health",
  "medication-therapy": "Medication Therapy & Adherence",
  research: "Community-Based Research",
  "surgical-support": "Surgical Support",
  /* The ?src= token stays "behavioral-safety" - it is baked into links all
   * over the site and into existing lead rows. Only the label changed. */
  "behavioral-safety": "Behavioral Risk",
  /* The four product pages deep-link with a "-page" suffix. */
  "engage-page": "Engage",
  "assess-page": "Assess",
  "capture-page": "Capture",
  "data-page": "Data Insights",
};

/** ?src= values that name a quote request or focus topic. */
export const SRC_TOPICS: Record<string, { label: string; note: string }> = {
  capture: {
    label: "Content capture focus",
    note: "We will come ready to talk about turning your existing material into orbits. Uncheck if that is not the right starting point.",
  },
  "quote-get-started": {
    label: "Quote request: Single Orbit Solution plan",
    note: "A 30 minute meeting to scope one orbit line and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-department": {
    label: "Quote request: Department plan",
    note: "A 30 minute meeting to scope your department rollout and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-enterprise": {
    label: "Quote request: Full Enterprise plan",
    note: "A 30 minute meeting to scope a system-wide rollout and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-assess-single": {
    label: "Quote request: Assess, Single Program",
    note: "A 30 minute meeting to scope one assessment pathway and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-assess-department": {
    label: "Quote request: Assess, Department",
    note: "A 30 minute meeting to scope department-wide check-ins and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-assess-enterprise": {
    label: "Quote request: Assess, Full Enterprise",
    note: "A 30 minute meeting to scope system-wide patient-reported data and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-captivate-single": {
    label: "Quote request: Capture, Single Collection",
    note: "A 30 minute meeting to scope converting one service line's materials and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-captivate-department": {
    label: "Quote request: Capture, Department",
    note: "A 30 minute meeting to scope a department content library and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
  "quote-captivate-enterprise": {
    label: "Quote request: Capture, Full Enterprise",
    note: "A 30 minute meeting to scope system-wide content conversion and give you a quote. Uncheck if you would rather keep it a general intro.",
  },
};

/** ?src= values that merely name the referring page. Recognised so the src
 *  is still recorded, but they show no context box. */
export const SRC_PAGES: Record<string, string> = {
  home: "the home page",
  platform: "the Platform page",
  outcomes: "the Outcomes & ROI page",
  about: "the About page",
  orbits: "the orbit solutions overview",
  book: "the Book a Call page",
  footer: "the site footer",
};

/** Info-sheet selector. Values are the `sheets/careorbit-<value>-2-page.pdf`
 *  slugs. */
export const SHEET_OPTIONS = [
  { value: "platform", label: "Full platform overview" },
  { value: "oncology", label: "Oncology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "womens-health", label: "Women's Health" },
  { value: "bariatrics", label: "Bariatrics" },
  { value: "behavioral-health", label: "Behavioral Health" },
  { value: "medication-therapy", label: "Medication Therapy & Adherence" },
  { value: "surgical-support", label: "Surgical Support" },
  { value: "behavioral-safety", label: "Behavioral Risk (employers)" },
  { value: "community-research", label: "Community Research" },
  { value: "engage", label: "CareOrbit Engage" },
  { value: "capture", label: "CareOrbit Capture" },
  { value: "assess", label: "CareOrbit Assess" },
  { value: "data", label: "CareOrbit Data Insights" },
];

/* What the booking form's selector offers: the eleven orbit lines and the
 * four platform capabilities, in two labelled groups. The stored value is
 * the visible label, which is what reaches service_line, Calendly's
 * utm_content and /thank-you's ORBIT_BY_LINE lookup. */
export const BOOKING_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Orbit Solutions",
    options: [
      "Oncology",
      "Primary Care",
      "Cardiology",
      "Orthopedics",
      "Women's Health",
      "Bariatrics",
      "Behavioral Health",
      "Medication Therapy & Adherence",
      "Community-Based Research",
      "Surgical Support",
      "Behavioral Risk",
    ],
  },
  {
    label: "Platform",
    options: ["Engage", "Assess", "Capture", "Data Insights"],
  },
];

export const CALENDLY_BASE =
  "https://calendly.com/careorbitceo/20-min-intro-call";

/** Calendly's own origin. Used to validate postMessage events. */
export const CALENDLY_ORIGIN = "https://calendly.com";
