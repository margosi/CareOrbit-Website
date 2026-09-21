import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./cardiology.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { CardiologySegments } from "@/components/orbits/CardiologySegments";
import { hv } from "@/lib/hoverStyles";

/* Cardiology orbit page. Port of v2-maven/CardiologyPage.dc.html.
 *
 * The orbit name came from an async import of orbits-data.js
 * (ORBITS["cardiology"].name), so the first paint rendered an empty string
 * and the name appeared a frame later. It is a build-time constant here.
 * The Phase 0 baseline was captured after that import resolved, so the
 * rendered result is the same.
 *
 * Nav highlights "orbits", as in the original (active="orbits").
 */
const NAME = "Cardiology";

export const metadata = metadataFor("/orbits/cardiology");

export default function CardiologyPage() {
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
                background: "#E3735C",
                flexShrink: 0,
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#B84A34",
              }}
            >
              Cardiology orbit solutions
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
            Your plan of care in the patient&apos;s hands,{" "}
            <em
              style={{
                fontFamily: "'Source Serif 4',serif",
                fontStyle: "italic",
                fontWeight: 600,
                letterSpacing: 0,
                color: "#E3735C",
              }}
            >
              every day between visits
            </em>
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
            Guided digital support tailored to each condition, procedure, and
            protocol, carried from diagnosis through rehab and lifelong
            management. Engagement is tracked at every step, so patients
            understand how and why to stay on track and your team knows who
            needs a nudge.
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
              href="/book-a-call?src=cardiology"
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
            src="/images/hero-cardiology.webp"
            alt=""
            placeholder="Cardiology care photo"
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

      <CardiologySegments name={NAME} />

      <SiteFooter />
    </div>
  );
}
