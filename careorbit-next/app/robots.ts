import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* robots.txt
 *
 * THE FAILURE MODE THIS GUARDS AGAINST works in both directions, and they
 * are not equally bad:
 *
 *   - a preview deployment that says "crawl everything" gets the staging
 *     copy indexed and competing with production;
 *   - a production deployment that says "crawl nothing" silently removes
 *     the entire site from search.
 *
 * The second is far worse, so the default is ALLOW and only an explicitly
 * recognised non-production environment opts out. An unset VERCEL_ENV - a
 * self-hosted production box, say - is treated as production.
 */
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    /* No sitemap reference either: a preview must not advertise a URL set
     * that points at the production origin. */
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* /thank-you is only reachable after Calendly redirects and has no
         * standalone value; it is noindex in metadataFor() as well. The
         * Next image endpoint is infrastructure, not content. */
        disallow: ["/thank-you", "/_next/image"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
