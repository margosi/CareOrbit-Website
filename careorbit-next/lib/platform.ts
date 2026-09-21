/* Platform page content, ported verbatim from Platform.dc.html's
 * renderVals(). Copy is brief-locked - do not reword or re-punctuate.
 *
 * DEAD CODE NOT PORTED: the original also built `oldTabData` (a four-entry
 * Engage/Assess/Capture/Data structure with `items` and `fit` fields) and
 * returned `cards`. Neither is referenced anywhere in the markup - the tabs
 * render from `tabData` and the carousel from `cardLoop`. Leftovers from an
 * earlier revision; see archive/Platform-tabs.dc.html.
 */

export type FeatureTab = {
  name: string;
  slot: string;
  img: string;
  ph: string;
  t: string;
  d: string;
};

export const FEATURE_TABS: FeatureTab[] = [
  {
    name: "Meeting patients where they live",
    slot: "platform-feat-1",
    img: "/images/platform-feat-1f.webp",
    ph: "[Placeholder: unified dashboard image]",
    t: "Meeting patients where they live",
    d: "Your team's guidance travels with the patient, at home, at work, or miles from the clinic, on whatever device is in their pocket. One platform carries journeys, assessments, content, and results into a single record and one dashboard for the care team.",
  },
  {
    name: "Guidance that adapts",
    slot: "platform-feat-2",
    img: "/images/platform-feat-2d.webp",
    ph: "[Placeholder: engagement index image]",
    t: "Guidance that adapts",
    d: "Every action, and every inaction, feeds the Patient Engagement Index. Content, channel, and cadence adjust to each patient's score, so the platform works hardest for the patients who are drifting.",
  },
  {
    name: "Instant access to support",
    slot: "platform-feat-3",
    img: "/images/platform-feat-3b.webp",
    ph: "[Placeholder: patient opening orbit image]",
    t: "Instant access to support",
    d: "No app, no login, no portal account. Patients open their orbit from a text, an email, or a QR code, on any device, and land on the right guidance for exactly where they are in the journey.",
  },
  {
    name: "Nothing added to the day",
    slot: "platform-feat-4",
    img: "/images/platform-feat-4.webp",
    ph: "[Placeholder: EHR order image]",
    t: "Nothing added to the day",
    d: "Orbits, screenings, and content issue from the workflow you already run: an EHR order, a patient list, on-site registration, or a nightly flat file. No new FTEs, no new system to learn.",
  },
  {
    name: "Differentiation that matters",
    slot: "platform-feat-5",
    img: "/images/platform-feat-5b.webp",
    ph: "[Placeholder: care team image]",
    t: "Differentiation that matters",
    /* "withr quarterly reviews" is a typo in the source copy. Preserved
     * verbatim: copy is brief-locked and fixing it is the user's call. */
    d: "A visibly higher standard of care that patients notice, families talk about, and referring physicians and administrators remember. Orbits carry your brand and your clinical voice through the whole journey, setting your program apart when patients choose where to be treated and when systems choose who to partner withr quarterly reviews.",
  },
];

export type PlatformCard = {
  name: string;
  href: string;
  slot: string;
  img: string;
  ph: string;
  dot: string;
  d: string;
};

export const PLATFORM_CARDS: PlatformCard[] = [
  {
    name: "Engage",
    href: "/platform/engage",
    slot: "platform-card-engage",
    img: "/images/platform-card-engage-3.webp",
    ph: "[Placeholder: Engage image]",
    dot: "#E3735C",
    d: "Guided digital journeys that carry your guidance from diagnosis through recovery.",
  },
  {
    name: "Assess",
    href: "/platform/assess",
    slot: "platform-card-assess",
    img: "/images/platform-card-assess-5.webp",
    ph: "[Placeholder: Assess image]",
    dot: "#5B9BEA",
    d: "PROMs, eScreening, and check-ins collected on schedule, without the chasing.",
  },
  {
    name: "Capture",
    href: "/platform/capture",
    slot: "platform-card-capture",
    img: "/images/platform-card-capture-2.webp",
    ph: "[Placeholder: Capture image]",
    dot: "#4FB3BF",
    d: "Your best patient material converted into one organized, trackable system.",
  },
  {
    /* Data has no page of its own; the card points at Outcomes. */
    name: "Data",
    href: "/outcomes",
    slot: "platform-card-data",
    img: "/images/platform-card-data-2.webp",
    ph: "[Placeholder: dashboard image]",
    dot: "#F2B8C6",
    d: "Engagement, adherence, and outcomes measured from the first click, on every orbit.",
  },
];

/* [last, ...all, ...all] = 9 slides. The leading duplicate is what lets the
 * carousel step backwards from index 0 without a visible gap. Slot ids get
 * an index suffix because the same card appears three times. */
export const CARD_LOOP = [
  PLATFORM_CARDS[3],
  ...PLATFORM_CARDS,
  ...PLATFORM_CARDS,
].map((c, i) => ({ ...c, slot: `${c.slot}-${i}` }));

export const QUOTES = [
  {
    bg: "rgba(120,100,90,.45)",
    ink: "#FFFFFF",
    text: "“I finally understood what was coming next instead of being afraid of it. My whole family read my orbit with me.”",
    who: "Denise,",
    role: "Oncology patient",
  },
  {
    bg: "rgba(250,248,244,.96)",
    ink: "#122536",
    text: "“Patients see it as incredibly easy to understand and use. We use it to open up dialogues so much faster. Families just run with it!”",
    who: "Chief of Section,",
    role: "Surgical Oncology",
  },
  {
    bg: "rgba(120,100,90,.45)",
    ink: "#FFFFFF",
    text: "“I have never seen anything like this, ever. I showed my friends at church and they couldn't believe it either.”",
    who: "Stan,",
    role: "Oncology patient",
  },
  {
    bg: "rgba(250,248,244,.96)",
    ink: "#122536",
    text: "“I wish my dad had something like this when he went through his procedure.”",
    who: "Nurse,",
    role: "Oncology",
  },
  {
    bg: "rgba(120,100,90,.45)",
    ink: "#FFFFFF",
    text: "“Between visits I always knew what to do and who to call. It took so much worry off my shoulders.”",
    who: "Marcus,",
    role: "Oncology patient",
  },
  {
    bg: "rgba(250,248,244,.96)",
    ink: "#122536",
    text: "“It's seen as incredibly easy to understand and use. They (patients and families) just run with it.”",
    who: "Nurse Navigator,",
    role: "Siteman Cancer Center Surgical Department",
  },
  {
    bg: "rgba(120,100,90,.45)",
    ink: "#FFFFFF",
    text: "“Everything my care team told me was right there when I got home. I did not have to remember it all on my own.”",
    who: "Carol,",
    role: "Oncology patient",
  },
];

/* Siteman controlled-trial figures. Same numbers as Home's donut rings.
 * `l` is unused by the markup but kept alongside its source data. */
export const TRIAL_STATS = [
  {
    v: "+65%",
    l: "Understanding",
    d: "Better understanding of the plan of care.",
  },
  {
    v: "−53%",
    l: "Inbound calls",
    d: "Fewer calls to the nursing line with questions the orbit answered first.",
  },
  {
    v: "−41%",
    l: "Readmissions",
    d: "Fewer readmissions among patients carrying an orbit.",
  },
  { v: "+22%", l: "Satisfaction", d: "Higher patient satisfaction scores." },
];

export const AUDIENCES = [
  "For Health Systems",
  "For Service Lines",
  "For Practices",
  "For Employers",
];

/* Tab auto-advance interval, and the quote carousel's fixed bound. */
export const TAB_INTERVAL_MS = 18000;
export const QUOTE_MAX_INDEX = 4;
