import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./womens-health.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Em, EYEBROW } from "@/components/orbits/ledger";
import { WomensHealthBody } from "@/components/orbits/WomensHealthBody";
import { hv } from "@/lib/hoverStyles";
import { NAME, SUB } from "@/lib/womensHealth";

/* Women's Health orbit page. Port of v2-maven/WomensHealthPage.dc.html.
 *
 * `name` came from orbits-data.js (ORBITS["womens-health"]) and is a
 * build-time constant here. `sub` did NOT: renderVals() overrode the data
 * file's copy with its own literal, which is what SUB holds.
 */
export const metadata = metadataFor("/orbits/womens-health");

export default function WomensHealthPage() {
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
                background: "#C0A5E8",
                flexShrink: 0,
                display: "block",
              }}
            />
            <span style={{ ...EYEBROW, color: "#6A4E9C" }}>{NAME}</span>
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
            Confident, prepared patients at <Em>every stage of her care</Em>
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "rgba(15,29,46,.7)",
              margin: 0,
              maxWidth: 600,
              textWrap: "pretty",
            }}
          >
            {SUB}
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
              href="/book-a-call?src=womens-health"
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
              Get the {NAME} info sheet
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
            src="/images/hero-womens-health.png"
            alt=""
            placeholder="Maternal health photo"
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

      <WomensHealthBody />

      <SiteFooter />
    </div>
  );
}
