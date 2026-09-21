import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    /* v2-maven ships ~2 MB PNGs at roughly 1500x1000. next/image re-encodes
     * to these formats on demand. The source files are optimised separately
     * in Phase 10; this only governs what is served. */
    formats: ["image/avif", "image/webp"],
    /* Widths chosen to straddle the four breakpoints the baseline is
     * captured at (1020 / 900 / 640 / 620) plus retina variants. */
    deviceSizes: [390, 640, 768, 828, 1024, 1280, 1440, 1920, 2560],
  },

  /* Every URL v2-maven can be reached at today, pointed at its replacement.
   *
   * WHY PERMANENT (308). These paths are being retired, not moved
   * temporarily, so search engines and anyone's bookmarks should update.
   *
   * WHY BOTH `X.dc.html` AND `XPage.dc.html` FOR THE ORBITS. In v2-maven
   * the thin wrapper (Cardiology.dc.html) imports the real page
   * (CardiologyPage.dc.html), and BOTH render a full page when opened
   * directly, so both can have been linked or bookmarked. They collapse to
   * one route here.
   *
   * NOT REDIRECTED, deliberately:
   *   Login.dc.html            - /login is excluded from the launch site
   *                              by decision; it should 404, not land
   *                              somewhere misleading.
   *   OrbitPage.dc.html        - dead template, never a route.
   *   *-print.dc.html,
   *   PritikinPilotSummaryPDF  - unlinked internal print tooling, pending
   *                              the decision recorded in the final report.
   *   SiteNav / SiteFooter /
   *   StudyRequest             - components, not pages.
   *   "CardiologyPage v1",
   *   "CommunityResearch v1"   - superseded drafts kept in v2-maven.
   */
  async redirects() {
    return [
      { source: "/About.dc.html", destination: "/about", permanent: true },
      {
        source: "/AssessPage.dc.html",
        destination: "/platform/assess",
        permanent: true,
      },
      {
        source: "/Bariatrics.dc.html",
        destination: "/orbits/bariatrics",
        permanent: true,
      },
      {
        source: "/BariatricsPage.dc.html",
        destination: "/orbits/bariatrics",
        permanent: true,
      },
      {
        source: "/BehavioralHealth.dc.html",
        destination: "/orbits/behavioral-health",
        permanent: true,
      },
      {
        source: "/BehavioralHealthPage.dc.html",
        destination: "/orbits/behavioral-health",
        permanent: true,
      },
      {
        source: "/BehavioralSafety.dc.html",
        destination: "/orbits/behavioral-risk",
        permanent: true,
      },
      {
        source: "/BookACall.dc.html",
        destination: "/book-a-call",
        permanent: true,
      },
      {
        source: "/CapturePage.dc.html",
        destination: "/platform/capture",
        permanent: true,
      },
      {
        source: "/Cardiology.dc.html",
        destination: "/orbits/cardiology",
        permanent: true,
      },
      {
        source: "/CardiologyPage.dc.html",
        destination: "/orbits/cardiology",
        permanent: true,
      },
      {
        source: "/CommunityResearch.dc.html",
        destination: "/orbits/community-research",
        permanent: true,
      },
      {
        source: "/DataPage.dc.html",
        destination: "/platform/data",
        permanent: true,
      },
      {
        source: "/EScreeningResults.dc.html",
        destination: "/evidence/escreening-results",
        permanent: true,
      },
      {
        source: "/EngagePage.dc.html",
        destination: "/platform/engage",
        permanent: true,
      },
      { source: "/Home.dc.html", destination: "/", permanent: true },
      {
        source: "/MedicationTherapy.dc.html",
        destination: "/orbits/medication-therapy",
        permanent: true,
      },
      {
        source: "/MedicationTherapyPage.dc.html",
        destination: "/orbits/medication-therapy",
        permanent: true,
      },
      {
        source: "/Oncology.dc.html",
        destination: "/orbits/oncology",
        permanent: true,
      },
      {
        source: "/OncologyPage.dc.html",
        destination: "/orbits/oncology",
        permanent: true,
      },
      {
        source: "/Orthopedics.dc.html",
        destination: "/orbits/orthopedics",
        permanent: true,
      },
      {
        source: "/OrthopedicsPage.dc.html",
        destination: "/orbits/orthopedics",
        permanent: true,
      },
      {
        source: "/Outcomes.dc.html",
        destination: "/outcomes",
        permanent: true,
      },
      {
        source: "/Platform.dc.html",
        destination: "/platform",
        permanent: true,
      },
      { source: "/Pricing.dc.html", destination: "/pricing", permanent: true },
      {
        source: "/PricingAssess.dc.html",
        destination: "/pricing/assess",
        permanent: true,
      },
      {
        source: "/PricingCapture.dc.html",
        destination: "/pricing/capture",
        permanent: true,
      },
      {
        source: "/PricingData.dc.html",
        destination: "/pricing/data",
        permanent: true,
      },
      {
        source: "/PrimaryCare.dc.html",
        destination: "/orbits/primary-care",
        permanent: true,
      },
      {
        source: "/PrimaryCarePage.dc.html",
        destination: "/orbits/primary-care",
        permanent: true,
      },
      {
        source: "/PritikinPilot.dc.html",
        destination: "/evidence/pritikin-pilot",
        permanent: true,
      },
      {
        source: "/SitemanStudy.dc.html",
        destination: "/evidence/siteman-study",
        permanent: true,
      },
      {
        source: "/SurgicalSupport.dc.html",
        destination: "/orbits/surgical-support",
        permanent: true,
      },
      {
        source: "/SurgicalSupportPage.dc.html",
        destination: "/orbits/surgical-support",
        permanent: true,
      },
      {
        source: "/ThankYou.dc.html",
        destination: "/thank-you",
        permanent: true,
      },
      {
        source: "/WomensHealth.dc.html",
        destination: "/orbits/womens-health",
        permanent: true,
      },
      {
        source: "/WomensHealthPage.dc.html",
        destination: "/orbits/womens-health",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
