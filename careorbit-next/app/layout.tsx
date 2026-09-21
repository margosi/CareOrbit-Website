import type { Metadata } from "next";
import "./globals.css";
import "./hover.css";
import "./responsive.css";

/* Placeholder metadata only. Real titles, descriptions, canonicals and OG
 * tags are authored in Phase 8 and require sign-off, because v2-maven has
 * no <title> or meta description on any page and the copy is brief-locked. */
export const metadata: Metadata = {
  title: "CareOrbit",
  description: "CareOrbit website.",
};

/* The four faces above the fold on nearly every page: Lato 300 (hero
 * display), Lato 900 (section heads), Inter 400 (body) and Source Serif 4
 * italic 500 (accent words). Preloading them avoids a visible swap. */
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
      </head>
      <body>{children}</body>
    </html>
  );
}
