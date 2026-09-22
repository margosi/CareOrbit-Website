import { SITE_NAME, SITE_URL } from "./seo";

/* Site-level JSON-LD.
 *
 * EVERY VALUE HERE IS TAKEN FROM THE SITE ITSELF - the footer on every page
 * carries the company line, postal address, sales address and phone number,
 * and the logo is the asset the nav renders. Nothing is inferred, looked up
 * or embellished.
 *
 * Deliberately ABSENT, because the site does not state them and structured
 * data is not the place to start: ratings, reviews, awards, founding date,
 * employee count, named people, priced services, medical claims, FAQs,
 * social profiles (sameAs), and any of the trial statistics. A schema is a
 * machine-readable claim to search engines; it has to be as sourced as the
 * page copy, which CLAUDE.md already requires.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    /* "CareOrbit is a Total Orbit company." - site footer */
    parentOrganization: { "@type": "Organization", name: "Total Orbit" },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/careorbit-logo-nav2.png`,
      width: 210,
      height: 60,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "4240 Duncan Ave, Suite #200",
      addressLocality: "St. Louis",
      addressRegion: "MO",
      postalCode: "63110",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@totalorbit.com",
      telephone: "+1-314-540-4827",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    /* No SearchAction: the site has no search endpoint, and declaring one
     * that does not exist is exactly the kind of invented markup to avoid. */
  };
}

/** One @graph document for the whole site, emitted once in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), webSiteJsonLd()],
  };
}
