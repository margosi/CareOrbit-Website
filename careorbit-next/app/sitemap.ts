import type { MetadataRoute } from "next";
import { NOINDEX, PAGE_SEO, absoluteUrl } from "@/lib/seo";

/* Generated from the same route table that supplies titles and canonicals,
 * so a page cannot be added to the site and forgotten here. Anything in
 * NOINDEX is left out: listing a page we ask crawlers to skip is a mixed
 * signal.
 *
 * NO lastModified. The previous version stamped `new Date()` on every entry,
 * which claimed that all 27 pages changed at the moment of the build - a
 * statement that was false on every deploy. Google treats an inaccurate
 * lastmod as a reason to stop trusting the field, so an absent date is
 * strictly better than a manufactured one. If we ever want real dates, they
 * have to come from something that actually knows when a page changed (the
 * commit that last touched its source), not from the clock.
 *
 * changeFrequency is omitted for the same reason - it was a guess, and
 * Google has said for years that it ignores it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(PAGE_SEO)
    .filter((route) => !NOINDEX.includes(route))
    .map((route) => ({
      url: absoluteUrl(route),
      /* Priority is relative within our own sitemap only: the home page,
       * then section landings, then leaf pages. */
      priority: route === "/" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
    }));
}
