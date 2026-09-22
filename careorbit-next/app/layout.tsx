import type { Metadata } from "next";
import "./globals.css";
import "./hover.css";
import "./responsive.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { siteJsonLd } from "@/lib/structuredData";

/* Site-wide metadata defaults.
 *
 * metadataBase is what lets every page express its canonical, OG url and OG
 * image as a path and have Next resolve it to an absolute URL. Without it,
 * Next warns at build time and social scrapers receive relative URLs they
 * cannot fetch. It is built from SITE_URL, which is careorbit.com unless
 * NEXT_PUBLIC_SITE_URL overrides it - so a localhost origin can never leak
 * into a canonical tag on a real deployment.
 *
 * Per-page titles and descriptions come from metadataFor() in lib/seo.ts.
 * The template below only applies to a page that sets a bare `title`, which
 * no page currently does; it is here so that a future page cannot ship
 * without the site name.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Orbits are proven to deliver against measured outcomes with the streamlined, easy experience today’s patients expect.",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US" },
};

/* The four faces above the fold on nearly every page: Lato 300 (hero
 * display), Lato 900 (section heads), Inter 400 (body) and Source Serif 4
 * italic 500 (accent words). Preloading them avoids a visible swap.
 *
 * Inter 400 and Source Serif 4 italic 500 are the variable files that now
 * also serve 500/600 and 600 respectively (see app/fonts.css), so these four
 * preloads cover every weight the site renders above the fold. */
const PRELOAD = [
  "/fonts/lato-normal-300-latin.woff2",
  "/fonts/lato-normal-900-latin.woff2",
  "/fonts/inter-normal-400-latin.woff2",
  "/fonts/source-serif-4-italic-500-latin.woff2",
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {PRELOAD.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
        {/* Organization + WebSite, emitted once for the whole site. Every
         * value is sourced from the footer that renders on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
