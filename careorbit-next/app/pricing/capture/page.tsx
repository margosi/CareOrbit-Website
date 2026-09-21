import "../pricing.css";
import { metadataFor } from "@/lib/seo";
import { PricingLayout } from "@/components/pricing/PricingLayout";
import { CAPTURE_PLANS, NOTES } from "@/lib/pricing";

/* Plans & Pricing - Capture. Port of v2-maven/PricingCapture.dc.html.
 * Note the legacy screen label reads "Captivate Pricing", an older product
 * name. Preserved verbatim. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

export const metadata = metadataFor("/pricing/capture");

export default function PricingCapturePage() {
  return (
    <PricingLayout
      screenLabel="Captivate Pricing"
      kicker="Plans & Pricing · Capture"
      heading={
        <>
          Your materials, made to <em style={SERIF}>reach patients</em>
        </>
      }
      blurb="Capture turns the education materials you already trust into guided orbits, and captures other informational resources for automatic delivery to patients and family members already active in their CareOrbit. It adds to your discharge folder and follow-up calls, never replaces them. Every plan pairs the platform with our expert conversion service: our team guides the intake so what gets converted, and in what order, is set up to succeed."
      note={NOTES.capture}
      plans={CAPTURE_PLANS}
    />
  );
}
