import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./behavioral-risk.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { BehavioralRiskBody } from "@/components/orbits/BehavioralRiskBody";
import { hv } from "@/lib/hoverStyles";

/* Behavioral Risk. Port of v2-maven/BehavioralSafety.dc.html.
 *
 * The legacy file passed active="behavioral-safety" to SiteNav, which
 * highlights no nav item and only feeds the nav's Book a Call href. That
 * value is kept verbatim so the ?src= parameter still reads
 * "behavioral-safety" on the booking page.
 *
 * The route is /orbits/behavioral-risk, matching the nav label the site
 * already uses for this page ("Behavioral Risk").
 */
export const metadata = metadataFor("/orbits/behavioral-risk");

export default function BehavioralRiskPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="behavioral-safety" />
      <main id="main-content">
        <div
          data-two=""
          data-grid="split"
          data-pad="page-top"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "76px 28px 96px",
            display: "grid",
            gridTemplateColumns: "1.05fr .95fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0F3D2E",
                  borderRadius: 8,
                  padding: "7px 13px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#5CE8A4",
                  }}
                />
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    color: "#FFFFFF",
                  }}
                >
                  NEW
                </span>
              </span>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#8A6516",
                }}
              >
                Behavioral Risk
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
              The most dangerous risk on the jobsite is the one{" "}
              <em
                style={{
                  fontFamily: "'Source Serif 4',serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  letterSpacing: 0,
                  color: "#E3735C",
                }}
              >
                nobody reports
              </em>
              .
            </h1>

            <p
              style={{
                fontSize: 17.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.72)",
                margin: 0,
                maxWidth: 640,
                textWrap: "pretty",
              }}
            >
              High-risk industries have spent decades engineering physical
              safety. Behavioral risk has not had the same infrastructure.
              CareOrbit delivers a private, mobile orbit to every worker: what
              to watch for, where to get help, and a way to reach it without
              going through a supervisor.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 6,
              }}
            >
              <Link
                href="/book-a-call?src=behavioral-safety"
                className={hv("coralLift")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: "16px 30px",
                  borderRadius: 999,
                  transition: "background .2s,transform .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
              <a
                href="#how"
                className={hv("sheetBtn")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,29,46,.12)",
                  padding: "16px 30px",
                  borderRadius: 999,
                  transition: "border-color .2s",
                }}
              >
                How it works in the field
              </a>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <Figure
              src="/images/offering-behavioral-safety.webp"
              alt=""
              placeholder="[Placeholder: field worker photo]"
              radius={32}
              priority
              sizes="(max-width: 1020px) 100vw, 45vw"
              style={{
                display: "block",
                width: "100%",
                height: "clamp(320px,30vw,440px)",
              }}
            />
          </div>
        </div>

        <BehavioralRiskBody />
      </main>
      <SiteFooter />
    </div>
  );
}
