import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./primary-care.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Em, EYEBROW } from "@/components/orbits/ledger";
import { PrimaryCareSegments } from "@/components/orbits/PrimaryCareSegments";
import { hv } from "@/lib/hoverStyles";

/* Primary Care orbit page. Port of v2-maven/PrimaryCarePage.dc.html.
 *
 * Unlike the other orbit pages this one never imported orbits-data.js -
 * there is no "primary-care" entry in it - so the name was already
 * hard-coded in the markup.
 *
 * KNOWN, PRESERVED: the info-sheet form points at
 * /sheets/careorbit-primary-care-2-page.pdf, which does not exist in
 * v2-maven either. The broken download is carried over rather than
 * papered over; it is item 3 in POST-MIGRATION-IDEAS.md.
 */
export const metadata = metadataFor("/orbits/primary-care");

export default function PrimaryCarePage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="orbits" />

      <div
        data-hero-grid="1"
        data-pad="page-top"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "72px 28px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.2fr) minmax(0,.8fr)",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#4FB3BF",
                flexShrink: 0,
                display: "block",
              }}
            />
            <span style={{ ...EYEBROW, color: "#1F7B87" }}>
              Primary care orbit solutions
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 900,
              fontSize: "clamp(34px,4.2vw,50px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Your guidance in every patient&apos;s hands,{" "}
            <Em>all year between visits</Em>
          </h1>

          <p
            style={{
              fontSize: 17.5,
              lineHeight: 1.65,
              color: "rgba(15,29,46,.72)",
              margin: 0,
              maxWidth: 620,
              textWrap: "pretty",
            }}
          >
            Guided digital support tailored to each condition, visit, and
            protocol, carried from the first appointment through years of
            chronic care and prevention. Engagement is tracked at every step, so
            patients understand how and why to stay on track and your team knows
            who needs a nudge.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              marginTop: 4,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/book-a-call?src=primary-care"
              className={hv("ctaWhite")}
              style={{
                textDecoration: "none",
                fontSize: 15.5,
                fontWeight: 600,
                color: "#FFFFFF",
                background: "#0F1D2E",
                padding: "16px 28px",
                borderRadius: 999,
                transition: "background .2s,transform .2s",
              }}
            >
              Book a 20-minute intro call
            </Link>
            <a
              href="#cta"
              className={hv("ghostNavy")}
              style={{
                textDecoration: "none",
                fontSize: 15.5,
                fontWeight: 600,
                color: "#0F1D2E",
                padding: "16px 24px",
                borderRadius: 999,
                border: "1.5px solid rgba(15,29,46,.2)",
              }}
            >
              Get the Primary Care info sheet
            </a>
          </div>
        </div>

        <div
          style={{
            minWidth: 0,
            animation: "coFloat 6s ease-in-out infinite alternate",
          }}
        >
          <Figure
            src="/images/primarycare-hero.png"
            alt=""
            placeholder="[Placeholder: primary care visit photo]"
            radius={32}
            priority
            sizes="(max-width: 1020px) 100vw, 40vw"
            style={{
              display: "block",
              width: "100%",
              height: "clamp(320px,30vw,440px)",
            }}
          />
        </div>
      </div>

      <PrimaryCareSegments />

      <SiteFooter />
    </div>
  );
}
