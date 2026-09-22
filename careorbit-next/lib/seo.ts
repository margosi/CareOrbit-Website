import type { Metadata } from "next";

/* Page titles, descriptions and canonicals.
 *
 * WHERE THIS COPY COMES FROM - this matters, because the site is
 * brief-locked (CLAUDE.md) and v2-maven has NO <title> and no meta
 * description on any page, so all of it is net-new surface.
 *
 * Nothing here is newly written marketing copy:
 *   - every `title` is the page's existing nav label or hero eyebrow,
 *     the vocabulary already approved for the site;
 *   - every `description` is that page's own hero paragraph, VERBATIM.
 *     It is cut at a sentence boundary where whole sentences fit in ~158
 *     characters; where the first sentence is longer than that, it is cut
 *     at the last clause break and marked with an ellipsis. Never a bare
 *     word fragment - a truncated half-word reads badly in a search result.
 *
 * That keeps the search-result text honest about what each page says, and
 * keeps every sourced claim inside copy that was already signed off. Titles
 * and descriptions are still the one part of this migration that is new
 * user-facing text.
 *
 * CLOSEOUT DECISION: keep this generated set. Rewording any of it is a
 * content task, not a migration one - edit the table below, nothing else
 * depends on the wording. The full table is in
 * migration/FINAL-REPORT.md section 6a.
 */

/* careorbit.com is the confirmed production hostname (closeout decision).
 * Canonicals and the sitemap are both built from this; override the env var
 * only to point a preview deployment at a different origin. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://careorbit.com"
).replace(/\/$/, "");

export const SITE_NAME = "CareOrbit";

export type PageSeo = { title: string; description: string };

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "CareOrbit",
    description:
      "Orbits are proven to deliver against measured outcomes with the streamlined, easy experience today\u2019s patients expect.",
  },
  "/platform": {
    title: "Platform",
    description:
      "CareOrbit carries your guidance from diagnosis through recovery, driving better outcomes for patients, families, and care teams.",
  },
  "/platform/engage": {
    title: "Engage",
    description:
      "Care-team-approved digital journeys that put your guidance in the patient's hands from diagnosis through recovery…",
  },
  "/platform/assess": {
    title: "Assess",
    description:
      "Structured patient input for any orbit, from light check-ins to formalized eScreening and PROMs reporting, or entirely on its own.",
  },
  "/platform/capture": {
    title: "Capture",
    description:
      "A digital tool paired with a professional service: our team converts your best patient material into one organized, deployable, trackable…",
  },
  "/platform/data": {
    title: "Data",
    description:
      "Every action a patient takes, and every one they do not, becomes an engagement signal your teams can act on.",
  },
  "/outcomes": {
    title: "Outcomes",
    description:
      "The outcomes that matter most to your organization, and their financial ROI, chosen before the build starts…",
  },
  "/pricing": {
    title: "Pricing",
    description:
      "Start with one orbit line, expand to a department, or roll CareOrbit out across the enterprise. Every plan adds to the tools your teams already use.",
  },
  "/pricing/assess": {
    title: "Assess pricing",
    description:
      "Assess brings patient-reported symptoms and check-ins back to your care teams. Start with one program and grow to system-wide listening.",
  },
  "/pricing/capture": {
    title: "Capture pricing",
    description:
      "Capture turns the education materials you already trust into guided orbits, and captures other informational resources for automatic delivery to patients…",
  },
  "/pricing/data": {
    title: "Data Insights pricing",
    description:
      "Your own engagement data and reporting are included with every orbit, and you own your own data.",
  },
  "/about": {
    title: "About",
    description:
      "CareOrbit is a Digital Patient Engagement Platform designed to support any patient care journey through education, understanding, motivation…",
  },
  "/book-a-call": {
    title: "Book a Call",
    description: "No demo script, no obligation.",
  },
  "/thank-you": {
    title: "Thank you",
    description: "A confirmation is on its way to your email.",
  },
  "/orbits/oncology": {
    title: "Oncology orbit solutions",
    description:
      "Results proven against usual care in a controlled surgical oncology trial.",
  },
  "/orbits/primary-care": {
    title: "Primary Care orbit solutions",
    description:
      "Guided digital support tailored to each condition, visit, and protocol, carried from the first appointment through years of chronic care and prevention.",
  },
  "/orbits/cardiology": {
    title: "Cardiology orbit solutions",
    description:
      "Guided digital support tailored to each condition, procedure, and protocol, carried from diagnosis through rehab and lifelong management.",
  },
  "/orbits/orthopedics": {
    title: "Orthopedics orbit solutions",
    description:
      "Guided digital support tailored to each procedure and each surgeon's protocol, carried through prehab, surgery, and the full recovery window…",
  },
  "/orbits/womens-health": {
    title: "Women's Health orbit solutions",
    description:
      "Women's health is a relationship measured in decades, and almost all of it happens between visits: well-woman care, the operative journeys, pregnancy…",
  },
  "/orbits/bariatrics": {
    title: "Bariatrics orbit solutions",
    description:
      "Guided digital support tailored to each pathway and to your program's requirements, carried from the first seminar through long-term follow-up…",
  },
  "/orbits/behavioral-health": {
    title: "Behavioral Health orbit solutions",
    description:
      "Validated screenings, delivered on schedule, scored automatically, and surfaced to the care team when risk is rising.",
  },
  "/orbits/medication-therapy": {
    title: "Medication Therapy & Adherence orbit solutions",
    description:
      "Specialty and injectable therapies fail most often in the first months, for reasons education and timely check-ins can reach.",
  },
  "/orbits/community-research": {
    title: "Community-Based Research orbit solutions",
    description:
      "Guided digital support tailored to each protocol, cohort, and follow-up window, carried from first contact through the final assessment…",
  },
  "/orbits/surgical-support": {
    title: "Surgical Support orbit solutions",
    description:
      "Surgery is the moment a health system has the least contact and the most at stake.",
  },
  "/orbits/behavioral-risk": {
    title: "Behavioral Risk orbit solutions",
    description:
      "High-risk industries have spent decades engineering physical safety. Behavioral risk has not had the same infrastructure.",
  },
  "/evidence/siteman-study": {
    title: "The Siteman controlled clinical trial",
    description:
      "Pancreatic cancer surgery patients and their families at Siteman Cancer Center, Washington University School of Medicine…",
  },
  "/evidence/pritikin-pilot": {
    title: "The Pritikin cardiac rehab pilot",
    description:
      "Over nine months at a leading Midwest health system, 187 patients referred to Pritikin Intensive Cardiac Rehabilitation were invited to a cardiac rehab…",
  },
  "/evidence/escreening-results": {
    title: "VA eScreening published evidence",
    description:
      "The assessment approach behind CareOrbit Assess was developed at the VA in 2012 and studied in three peer-reviewed publications…",
  },
};

/* Pages kept out of search results. /thank-you is a post-booking
 * confirmation reached only after Calendly redirects; it has no standalone
 * value and would look like a dead end in a search result. */
export const NOINDEX: string[] = ["/thank-you"];

/* Open Graph / Twitter image.
 *
 * There is no branded share card yet, and inventing one is a design task.
 * OG_IMAGE is therefore undefined by default: a link preview then shows
 * title and description with no picture, which is honest, rather than a
 * cropped photograph pretending to be a share card.
 *
 * Set it to a 1200x630 asset under /public when the card exists, or pass
 * `image` to metadataFor() to override a single page. Both paths feed the
 * same absolute-URL construction, so nothing else has to change.
 */
export const OG_IMAGE:
  { url: string; width: number; height: number; alt: string } | undefined =
  undefined;

export type MetadataOverrides = {
  /** Absolute path under /public, e.g. "/images/hero-cardiology.webp". */
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  /** Point the canonical somewhere other than this route's own URL. */
  canonical?: string;
  noindex?: boolean;
};

export function absoluteUrl(pathname: string): string {
  return SITE_URL + (pathname === "/" ? "" : pathname);
}

/** Metadata for one route. Call from a page's `export const metadata`. */
export function metadataFor(
  route: string,
  o: MetadataOverrides = {},
): Metadata {
  const seo = PAGE_SEO[route];
  if (!seo) throw new Error(`No SEO entry for route ${route}`);

  const url = absoluteUrl(o.canonical ?? route);
  const noindex = o.noindex ?? NOINDEX.includes(route);
  const title =
    o.title ?? (route === "/" ? seo.title : `${seo.title} | ${SITE_NAME}`);
  const description = o.description ?? seo.description;

  const image = o.image
    ? [{ url: o.image, alt: o.imageAlt ?? title }]
    : OG_IMAGE
      ? [
          {
            url: OG_IMAGE.url,
            width: OG_IMAGE.width,
            height: OG_IMAGE.height,
            alt: OG_IMAGE.alt,
          },
        ]
      : undefined;

  return {
    /* `absolute` so the root layout's title template does NOT append the
     * site name a second time - these strings already carry it, and the
     * exact wording is the closeout-approved set. The template stays in
     * the layout as a safety net for any future page that sets a bare
     * title without going through this function. */
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title,
      description,
      ...(image ? { images: image } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: image.map((i) => i.url) } : {}),
    },
  };
}
