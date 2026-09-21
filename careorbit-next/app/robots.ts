import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Allow everything except the post-booking confirmation, which is only
 * reachable after Calendly redirects and has no standalone value. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
