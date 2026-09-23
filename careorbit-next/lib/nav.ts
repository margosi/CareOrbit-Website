/* Navigation data, ported from the hardcoded arrays in SiteNav.dc.html
 * (lines 173-185, 200-205) and SiteFooter.dc.html (lines 54-84).
 *
 * In v2-maven the nav's 11-item orbit list and the footer's 11-item orbit
 * list were maintained separately and could silently drift. Both now derive
 * from ORBITS below.
 *
 * Hrefs use the approved nested route shape. Targets that do not exist yet
 * will 404 until their phase lands; that is expected during migration.
 */

export type OrbitStatus =
  "Live" | "Blueprint" | "In build" | "In integration" | "New";

export type OrbitLink = {
  name: string;
  href: string;
  status: OrbitStatus;
};

/* Order and labels are verbatim from SiteNav.dc.html. Do not reorder:
 * the dropdown and the mobile drawer both render this sequence. */
export const ORBITS: OrbitLink[] = [
  { name: "Oncology", href: "/orbits/oncology", status: "Live" },
  { name: "Primary Care", href: "/orbits/primary-care", status: "Blueprint" },
  { name: "Cardiology", href: "/orbits/cardiology", status: "Blueprint" },
  { name: "Orthopedics", href: "/orbits/orthopedics", status: "Blueprint" },
  { name: "Women's Health", href: "/orbits/womens-health", status: "In build" },
  { name: "Bariatrics", href: "/orbits/bariatrics", status: "In build" },
  {
    name: "Behavioral Health",
    href: "/orbits/behavioral-health",
    status: "In build",
  },
  {
    name: "Medication Therapy & Adherence",
    href: "/orbits/medication-therapy",
    status: "In integration",
  },
  {
    name: "Community-Based Research",
    href: "/orbits/community-research",
    status: "New",
  },
  {
    name: "Surgical Support",
    href: "/orbits/surgical-support",
    status: "Live",
  },
  { name: "Behavioral Risk", href: "/orbits/behavioral-risk", status: "New" },
];

/* The four product pages, shown in the right-hand column of the orbit
 * dropdown. Labelled "Data Insights", matching Pricing. */
export const PRODUCTS = [
  { name: "Engage", href: "/platform/engage" },
  { name: "Assess", href: "/platform/assess" },
  { name: "Capture", href: "/platform/capture" },
  { name: "Data Insights", href: "/platform/data" },
];

export const PRICING_LINKS = [
  { name: "Engage", href: "/pricing" },
  { name: "Assess", href: "/pricing/assess" },
  { name: "Capture", href: "/pricing/capture" },
  { name: "Data Insights", href: "/pricing/data" },
];

/* Status chip colours, from SiteNav.dc.html lines 170-172. Computed there
 * for every orbit link but never rendered in the nav - the dropdown shows
 * only the name. Kept here because the chips ARE rendered elsewhere. */
export const STATUS_COLORS: Record<
  OrbitStatus,
  { color: string; background: string }
> = {
  New: { color: "#0F3D2E", background: "#E4F6EC" },
  Live: { color: "#1A6B3C", background: "#EBF4EE" },
  Blueprint: { color: "#2D5A87", background: "#EAF1F8" },
  "In build": { color: "#A4503F", background: "#FBEDE9" },
  "In integration": { color: "#A4503F", background: "#FBEDE9" },
};

/* Which top-level nav item is highlighted coral. */
/* "behavioral-safety" and "research" highlight no nav item - it is only used to build the
 * nav's Book a Call href (?src=behavioral-safety), exactly as v2-maven's
 * BehavioralSafety.dc.html passed active="behavioral-safety". */
export type NavActive =
  | "home"
  | "platform"
  | "orbits"
  | "outcomes"
  | "pricing"
  | "about"
  | "behavioral-safety"
  | "research";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "How orbits work", href: "/platform#how-orbits-work" },
      { label: "Platform features", href: "/platform#features" },
      { label: "Patient outcomes", href: "/platform#outcomes" },
      { label: "CareOrbit experiences", href: "/platform#experiences" },
    ],
  },
  {
    /* Footer order differs from the nav's: Surgical Support precedes
     * Community-Based Research here. Preserved from the original. */
    title: "Orbit Solutions",
    links: [
      "Oncology",
      "Primary Care",
      "Cardiology",
      "Orthopedics",
      "Women's Health",
      "Bariatrics",
      "Behavioral Health",
      "Medication Therapy & Adherence",
      "Surgical Support",
      "Community-Based Research",
      "Behavioral Risk",
    ].map((name) => {
      const o = ORBITS.find((x) => x.name === name);
      if (!o) throw new Error(`footer references unknown orbit: ${name}`);
      return { label: o.name, href: o.href };
    }),
  },
  {
    title: "Resources",
    links: [
      { label: "Outcomes & ROI", href: "/outcomes" },
      {
        label: "Platform infosheet",
        href: "/sheets/careorbit-platform-2-page.pdf",
      },
      { label: "Government (VA / DOD)", href: "/book-a-call?src=footer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book a Call", href: "/book-a-call?src=footer" },
      { label: "Contact", href: "mailto:sales@totalorbit.com" },
    ],
  },
];
