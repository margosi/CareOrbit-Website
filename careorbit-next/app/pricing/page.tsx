import "./pricing.css";
import { metadataFor } from "@/lib/seo";
import { PricingLayout } from "@/components/pricing/PricingLayout";
import { NOTES, ORBIT_PLANS } from "@/lib/pricing";

/* Plans & Pricing - Orbit Solutions. Port of v2-maven/Pricing.dc.html. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

export const metadata = metadataFor("/pricing");

export default function PricingPage() {
  return (
    <PricingLayout
      screenLabel="Plans and Pricing"
      kicker="Plans & Pricing · Orbit Solutions"
      heading={
        <>
          Plans that grow with <em style={SERIF}>your system</em>
        </>
      }
      blurb="Start with one orbit line, expand to a department, or roll CareOrbit out across the enterprise. Every plan adds to the tools your teams already use."
      note={NOTES.orbit}
      plans={ORBIT_PLANS}
    />
  );
}
