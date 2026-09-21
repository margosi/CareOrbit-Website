import "../pricing.css";
import { metadataFor } from "@/lib/seo";
import { PricingLayout } from "@/components/pricing/PricingLayout";
import { ASSESS_PLANS, NOTES } from "@/lib/pricing";

/* Plans & Pricing - Assess. Port of v2-maven/PricingAssess.dc.html. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

export const metadata = metadataFor("/pricing/assess");

export default function PricingAssessPage() {
  return (
    <PricingLayout
      screenLabel="Assess Pricing"
      kicker="Plans & Pricing · Assess"
      heading={
        <>
          Hear from patients <em style={SERIF}>between visits</em>
        </>
      }
      blurb="Assess brings patient-reported symptoms and check-ins back to your care teams. Start with one program and grow to system-wide listening."
      note={NOTES.assess}
      plans={ASSESS_PLANS}
    />
  );
}
