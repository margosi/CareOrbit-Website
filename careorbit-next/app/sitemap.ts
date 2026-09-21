import type { MetadataRoute } from "next";
import { NOINDEX, PAGE_SEO, SITE_URL } from "@/lib/seo";

/* Generated from the same route table that supplies titles and canonicals,
 * so a page cannot be added to the site and forgotten here. Anything in
 * NOINDEX is left out: listing a page we ask crawlers to skip is a mixed
 * signal. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.keys(PAGE_SEO)
    .filter((route) => !NOINDEX.includes(route))
    .map((route) => ({
      url: SITE_URL + (route === "/" ? "" : route),
      lastModified,
      changeFrequency: "monthly" as const,
      /* The home page, then the section landings, then everything else. */
      priority: route === "/" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
    }));
}
