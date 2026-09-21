/* Home page content, ported verbatim from Home.dc.html's renderVals().
 *
 * Copy is brief-locked (see CLAUDE.md). Every string here is exactly as it
 * appears in v2-maven - do not reword, re-punctuate, or "fix" anything.
 */

export type GallerySlide = {
  title: string;
  sub: string;
  desc: string;
  dot: string;
  slotId: string;
  hint: string;
  href: string;
  src: string;
};

/* Home.dc.html gallerySlides(). Eight tiles: two desktop rows of four, and
 * the same eight as a mobile carousel. */
export const GALLERY: GallerySlide[] = [
  {
    title: "Oncology & Cancer Care",
    sub: "Diagnosis through survivorship",
    desc: "Patients who understand each phase of treatment, from surgery to infusion to recovery.",
    dot: "#4FB3BF",
    slotId: "gallery-oncology",
    hint: "Oncology care photo",
    href: "/orbits/oncology",
    src: "/images/tile-oncology.webp",
  },
  {
    title: "Primary Care & Prevention",
    sub: "First visit through every year after",
    desc: "Chronic conditions, prevention, and annual visits, supported all year between appointments.",
    dot: "#4FB3BF",
    slotId: "gallery-primarycare",
    hint: "Primary care visit photo",
    href: "/orbits/primary-care",
    src: "/images/tile-primarycare.webp",
  },
  {
    title: "Orthopedics & Joint Care",
    sub: "Pre-op through full recovery",
    desc: "Patients ready for surgery day and recovery, with optional integrated PROMs surveys to track their experience.",
    dot: "#5B9BEA",
    slotId: "gallery-orthopedics",
    hint: "Ortho / PT photo",
    href: "/orbits/orthopedics",
    src: "/images/tile-orthopedics.webp",
  },
  {
    title: "Maternity & Women's Health",
    sub: "First visit through menopause",
    desc: "Confident, prepared patients across pregnancy and well-woman care.",
    dot: "#C0A5E8",
    slotId: "gallery-womens",
    hint: "Maternity photo",
    href: "/orbits/womens-health",
    src: "/images/tile-womens.webp",
  },
  {
    title: "Behavioral Health & Screening",
    sub: "Screening through follow-up",
    desc: "Measurement-based care without the administrative weight.",
    dot: "#E9C46A",
    slotId: "gallery-behavioral",
    hint: "Behavioral health photo",
    href: "/orbits/behavioral-health",
    src: "/images/tile-behavioral.webp",
  },
  {
    title: "Cardiology & Cardiac Rehab",
    sub: "Cardiac event through rehab",
    desc: "Stronger cardiac and heart health outcomes, from recovery through lasting lifestyle change.",
    dot: "#E3735C",
    slotId: "gallery-cardiology",
    hint: "Cardiac rehab photo",
    href: "/orbits/cardiology",
    src: "/images/tile-cardiology.webp",
  },
  {
    title: "Bariatrics & Weight Loss Surgery",
    sub: "Patient acquisition built in",
    desc: "More qualified candidates completing the path to surgery.",
    dot: "#4FB3BF",
    slotId: "gallery-bariatrics",
    hint: "Bariatric program photo",
    href: "/orbits/bariatrics",
    src: "/images/tile-bariatrics.webp",
  },
  {
    title: "Medication Therapy & Adherence",
    sub: "From first fill onward",
    desc: "Patients who start therapy, stay on it, and know what to do when side effects hit.",
    dot: "#C0A5E8",
    slotId: "gallery-medication",
    hint: "Infusion / pharmacy photo",
    href: "/orbits/medication-therapy",
    src: "/images/tile-medication.webp",
  },
];

export const EXPLORE_CARDS = [
  {
    title: "Explore Community Research",
    accent: "",
    sub: "Orbits supporting community-based research: enrollment, education, assessments, and retention.",
    href: "/orbits/community-research",
    badge: "NEW",
    slotId: "explore-research",
    src: "/images/offering-research.webp",
    hint: "[Placeholder: clinical research photo]",
  },
  {
    title: "Explore Behavioral Risk",
    accent: "",
    sub: "Behavioral health and suicide-risk avoidance for high-risk industries like construction.",
    href: "/orbits/behavioral-risk",
    badge: "NEW",
    slotId: "explore-behavioral-safety",
    src: "/images/offering-behavioral-safety.webp",
    hint: "[Placeholder: construction workforce photo]",
  },
  {
    title: "Explore ",
    accent: "Capture",
    sub: "A new way to intake, organize, and share a health system's information.",
    href: "/platform/capture",
    badge: "NEW CAPABILITY",
    slotId: "explore-capture",
    src: "/images/offering-capture-2.webp",
    hint: "[Placeholder: health information photo]",
  },
];

/* Six entries, not three: the marquee scrolls -50% so the list must be
 * duplicated for the loop to be seamless. */
export const MARQUEE = [
  "Washington University",
  "Siteman Cancer Center",
  "BJC HealthCare",
  "Washington University",
  "Siteman Cancer Center",
  "BJC HealthCare",
];

export const COST_MOMENTS = [
  {
    i: "01",
    t: "Missed appointments and no-shows",
    d: "Unused capacity and journeys that stall before they start.",
  },
  {
    i: "02",
    t: "Delayed procedures and lost capacity",
    d: "Unprepared patients mean wasted resources, lost opportunities and lower revenue.",
  },
  {
    i: "03",
    t: "Poor adherence, uneven outcomes",
    d: "The between-visit behaviors that decide clinical and financial results.",
  },
  {
    i: "04",
    t: "Rising coordination burden",
    d: "Stretched staff carrying education and outreach by hand.",
  },
  {
    i: "05",
    t: "Avoidable readmissions",
    d: "Recovery instructions that were never read, understood, or followed at home.",
  },
  {
    i: "06",
    t: "Repeat calls to the office",
    d: "The same questions answered one patient at a time, all day long.",
  },
  {
    i: "07",
    t: "Medication errors and gaps",
    d: "New regimens started without the guidance to take them correctly.",
  },
  {
    i: "08",
    t: "Patients lost to follow-up",
    d: "Journeys that quietly end between one visit and the next.",
  },
];

export const ISSUE_METHODS = [
  "EHR order trigger",
  "Provided patient list",
  "QR code",
  "Text message",
  "On-site registration",
];

/* Siteman controlled-trial numbers. CLAUDE.md: only real, sourced numbers.
 * rt is the ring's final stroke-dashoffset: circumference 930 scaled by the
 * remaining fraction, exactly as the original computed it. */
const RAW_STATS = [
  {
    n: "+65%",
    l: "increase in patient understanding of treatment plan and side effects",
    pct: 65,
    color: "#4FB3BF",
  },
  {
    n: "−53%",
    l: "fewer patient calls to the office",
    pct: 53,
    color: "#5B9BEA",
  },
  { n: "−41%", l: "reduction in re-admission rate", pct: 41, color: "#2D5A87" },
  {
    n: "+22%",
    l: "increase in patient satisfaction",
    pct: 22,
    color: "#E3735C",
  },
];

export const PROOF_STATS = RAW_STATS.map((s) => ({
  ...s,
  rt: `${Math.round(930 * (1 - s.pct / 100))}px`,
}));

/* ---------------------------------------------------------------- chat --
 * The hero chat box maps a typed phrase to an orbit.
 *
 * BUG FIXED FROM v2-maven (flagged for ratification):
 * The original iterated ORBIT_ORDER, which has EIGHT entries, against a
 * keyword map with SEVEN - "surgical-support" was missing. Because the guard
 * was `kw[key].some(...)`, any query that did not match one of the first
 * seven orbits threw:
 *     TypeError: Cannot read properties of undefined (reading 'some')
 * Reproduced against the live site: "zzzqqq", "diabetes" and "surgical" all
 * threw. Two consequences on the legacy site:
 *   - the "No direct match" hint could never be shown
 *   - the Primary Care and Platform fallbacks below were unreachable
 * Iterating a table keyed by its own entries removes the mismatch, so the
 * fallbacks and the hint now work as the original code plainly intended.
 */
type MatchTarget = { name: string; href: string };

const ORBIT_KEYWORDS: { key: string; target: MatchTarget; words: string[] }[] =
  [
    {
      key: "oncology",
      target: { name: "Oncology", href: "/orbits/oncology" },
      words: [
        "oncolog",
        "cancer",
        "tumor",
        "ent",
        "breast",
        "readmission",
        "chemo",
        "radiation",
        "surgery prep",
      ],
    },
    {
      key: "cardiology",
      target: { name: "Cardiology", href: "/orbits/cardiology" },
      words: ["cardio", "cardiac", "rehab", "heart"],
    },
    {
      key: "orthopedics",
      target: { name: "Orthopedics", href: "/orbits/orthopedics" },
      words: ["ortho", "prom", "joint", "knee", "hip", "bundle"],
    },
    {
      key: "womens-health",
      target: { name: "Women's Health", href: "/orbits/womens-health" },
      words: [
        "women",
        "pregnan",
        "ob",
        "maternal",
        "prenatal",
        "postpartum",
        "gyn",
      ],
    },
    {
      key: "bariatrics",
      target: { name: "Bariatrics", href: "/orbits/bariatrics" },
      words: ["bariatric", "weight", "sleeve", "bypass"],
    },
    {
      key: "behavioral-health",
      target: { name: "Behavioral Health", href: "/orbits/behavioral-health" },
      words: [
        "behavior",
        "mental",
        "psych",
        "screening",
        "escreening",
        "no-show",
        "depression",
        "anxiety",
      ],
    },
    {
      key: "medication-therapy",
      target: {
        name: "Medication Therapy & Adherence",
        href: "/orbits/medication-therapy",
      },
      words: [
        "medicat",
        "adheren",
        "injection",
        "infusion",
        "pharma",
        "drug",
        "refill",
        "therapy",
      ],
    },
    {
      /* Present in ORBIT_ORDER but had no keyword list in v2-maven, which is
       * what caused the crash. Matched on its name only, as the original's
       * name check would have done. */
      key: "surgical-support",
      target: { name: "Surgical Support", href: "/orbits/surgical-support" },
      words: [],
    },
  ];

const PRIMARY_CARE_WORDS = [
  "primary",
  "family med",
  "pcp",
  "wellness",
  "prevent",
  "hypertension",
  "diabet",
];

const PLATFORM_WORDS = ["education", "engagement", "platform"];

export function matchOrbit(query: string): MatchTarget | null {
  if (!query) return null;
  const s = query.toLowerCase();

  for (const { target, words } of ORBIT_KEYWORDS) {
    if (
      words.some((w) => s.includes(w)) ||
      target.name.toLowerCase().includes(s)
    ) {
      return target;
    }
  }
  if (PRIMARY_CARE_WORDS.some((w) => s.includes(w))) {
    return { name: "Primary Care", href: "/orbits/primary-care" };
  }
  if (PLATFORM_WORDS.some((w) => s.includes(w))) {
    return { name: "the Platform", href: "/platform" };
  }
  return null;
}

export const CHAT_HINT_DEFAULT =
  "Type your problem and we'll point you to the right orbit.";
export const CHAT_HINT_MISS =
  "No direct match. Browse the orbits below, or book a call and we'll map it to a blueprint.";

/* Home.dc.html logged every query to localStorage under this key, capped at
 * the most recent 200. Kept so the behaviour is unchanged. */
export function logQuery(label: string) {
  try {
    const k = "co_orbit_queries";
    const arr = JSON.parse(localStorage.getItem(k) || "[]");
    arr.push({ q: label, t: Date.now() });
    localStorage.setItem(k, JSON.stringify(arr.slice(-200)));
  } catch {
    /* private mode / blocked storage: logging is best-effort */
  }
}
