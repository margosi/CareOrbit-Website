import "../pricing.css";
import { metadataFor } from "@/lib/seo";
import { PricingLayout } from "@/components/pricing/PricingLayout";
import { DATA_PLANS, NOTES } from "@/lib/pricing";

/* Plans & Pricing - Data Insights. Port of v2-maven/PricingData.dc.html. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

export const metadata = metadataFor("/pricing/data");

export default function PricingDataPage() {
  return (
    <PricingLayout
      screenLabel="Data Insights Pricing"
      kicker="Plans & Pricing · Data Insights"
      heading={
        <>
          Engagement data that <em style={SERIF}>predicts outcomes</em>
        </>
      }
      blurb="Your own engagement data and reporting are included with every orbit, and you own your own data. Data Insights goes further: findings drawn from de-identified, aggregated engagement data, delivered as a service for health systems, life sciences, payers, and other industries."
      note={NOTES.data}
      plans={DATA_PLANS}
    />
  );
}
