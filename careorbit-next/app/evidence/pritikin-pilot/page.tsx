import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./pritikin-pilot.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import {
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  POV_ROW,
  RowHead,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import { COHORTS, GOALS, OBSTACLES, TOPLINE } from "@/lib/pritikinPilot";

/* The Pritikin ICR pilot. Port of v2-maven/PritikinPilot.dc.html.
 *
 * Wholly static; only the gated StudyRequest and the scroll reveals ship
 * JS. The source's data-screen-label attributes are Claude Design
 * authoring metadata and are dropped, as on every other migrated page.
 */
const BLUE = "#5B9BEA";
const BOOK_HREF = "/book-a-call?src=pritikin-pilot";

const PANEL: React.CSSProperties = {
  background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
  borderRadius: 40,
  padding: "clamp(40px,5vw,72px) clamp(28px,5vw,72px)",
  color: "#FFFFFF",
};

const LEAD: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.72)",
  margin: 0,
  maxWidth: 560,
  textWrap: "pretty",
};

export const metadata = metadataFor("/evidence/pritikin-pilot");

export default function PritikinPilotPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="outcomes" />
      <main id="main-content">
        <div
          data-hero-grid="1"
          data-pad="page-top"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "72px 28px 88px",
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
                  background: BLUE,
                  flexShrink: 0,
                  display: "block",
                }}
              />
              <span style={{ ...EYEBROW, color: "#2D5A87" }}>
                Cardiology · Observational pilot
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
              The Pritikin Cardiac Rehab pilot: patients who opened their orbit
              started rehab at <Em>more than twice the rate</Em>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                maxWidth: 620,
                textWrap: "pretty",
              }}
            >
              Over nine months at a leading Midwest health system, 187 patients
              referred to Pritikin Intensive Cardiac Rehabilitation were invited
              to a cardiac rehab orbit. Of those who activated it, 52% went on
              to start the program. Of those who never activated, 24% did.
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
              <a
                href="#request"
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
                Download a summary of the pilot results
              </a>
              <Link
                href={BOOK_HREF}
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
                Book a 20-minute intro call
              </Link>
            </div>
          </div>

          <div
            style={{
              minWidth: 0,
              animation: "coFloat 6s ease-in-out infinite alternate",
            }}
          >
            <Figure
              src="/images/study-cardiac-rehab.webp"
              alt=""
              placeholder="[Placeholder: cardiac rehab photo]"
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

        {/* ------------------------------------------------------- topline -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}
        >
          <div style={PANEL}>
            <Reveal
              data-hdr=""
              data-grid="split"
              style={{ ...HDR, marginBottom: 40 }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ ...EYEBROW, color: BLUE }}>The finding</div>
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  Activation predicted <Em>enrollment</Em>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 20,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                One number carried the pilot: the gap in rehab start rate
                between patients who activated their orbit and patients who
                never did.
              </p>
            </Reveal>

            <Reveal
              data-stat5=""
              data-grid="4-min0"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 32,
              }}
            >
              {TOPLINE.map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: `2px solid ${BLUE}`,
                    paddingTop: 16,
                    minHeight: 120,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(30px,3.2vw,42px)",
                      lineHeight: 1,
                      letterSpacing: "-0.035em",
                      color: s.c,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: ".11em",
                      textTransform: "uppercase",
                      color: BLUE,
                    }}
                  >
                    {s.l}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "#B9C8D8",
                      textWrap: "pretty",
                    }}
                  >
                    {s.d}
                  </div>
                </div>
              ))}
            </Reveal>

            <div
              style={{
                marginTop: 36,
                paddingTop: 18,
                borderTop: "1px solid #2D5A87",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#8FA5BC",
              }}
            >
              Cohorts as reported by Pritikin ICR, December 2023. Observational
              pilot, not a randomized trial.
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- cohort ledger -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>
                The two cohorts
              </div>
              <h2 style={H2_LIGHT}>
                Same invitation, <Em>different journeys</Em>
              </h2>
            </div>
            <p style={LEAD}>
              All 187 patients were referred to the program and invited to an
              orbit. What separated them was whether they activated it.
            </p>
          </Reveal>

          {COHORTS.map((c) => (
            <Reveal key={c.kicker} data-povrow="" style={POV_ROW}>
              <RowHead
                kicker={c.kicker}
                label={c.label}
                title={c.t}
                sub={c.sub}
              />
              <div
                data-two=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,.55fr) minmax(0,1.45fr)",
                  gap: 36,
                  alignItems: "start",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: "clamp(38px,4vw,54px)",
                      lineHeight: 1,
                      color: c.dot,
                    }}
                  >
                    {c.rate}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: "rgba(15,29,46,.62)",
                    }}
                  >
                    of this cohort started ICR
                  </div>
                </div>
                <div
                  data-restat=""
                  data-grid="4-min0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                    gap: 22,
                  }}
                >
                  {c.rows.map((row) => (
                    <div
                      key={row.k}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        borderTop: "1px solid rgba(15,29,46,.14)",
                        paddingTop: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Lato,sans-serif",
                          fontWeight: 300,
                          fontSize: "clamp(24px,2.4vw,32px)",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          color: "#0F1D2E",
                        }}
                      >
                        {row.v}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          lineHeight: 1.45,
                          color: "rgba(15,29,46,.62)",
                          textWrap: "pretty",
                        }}
                      >
                        {row.k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal
            style={{
              borderTop: "1px solid rgba(15,29,46,.14)",
              paddingTop: 22,
              fontSize: 14,
              lineHeight: 1.65,
              color: "rgba(15,29,46,.6)",
              maxWidth: 760,
              textWrap: "pretty",
            }}
          >
            This was an observational pilot, not a randomized trial: patients
            chose whether to activate, so activation and program start may share
            underlying causes such as motivation or staff contact. The
            pilot&apos;s own recommendation is a randomized design next.
          </Reveal>
        </div>

        {/* -------------------------------------------------- against goals -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>
                Honest scorekeeping
              </div>
              <h2 style={H2_LIGHT}>
                Against the pilot&apos;s <Em>own goals</Em>
              </h2>
            </div>
            <p style={LEAD}>
              Three KPIs were set before the pilot began. Two could not be
              evaluated, and one fell short of its target. We report all three.
            </p>
          </Reveal>

          {GOALS.map((g) => (
            <Reveal key={g.name} data-povrow="" style={POV_ROW}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".13em",
                    textTransform: "uppercase",
                    color: g.tone,
                  }}
                >
                  {g.verdict}
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(19px,2vw,24px)",
                    lineHeight: 1.16,
                    letterSpacing: "-0.02em",
                    color: "#0F1D2E",
                    textWrap: "balance",
                  }}
                >
                  {g.name}
                </div>
                <div
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.6)",
                  }}
                >
                  Target: {g.target}
                </div>
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: "rgba(15,29,46,.7)",
                  textWrap: "pretty",
                  paddingTop: 2,
                }}
              >
                {g.result}
              </div>
            </Reveal>
          ))}
        </div>

        {/* ----------------------------------------------------- obstacles -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>
                What we learned
              </div>
              <h2 style={H2_LIGHT}>
                Obstacles, and <Em>what we changed</Em>
              </h2>
            </div>
            <p style={LEAD}>
              A pilot exists to surface problems before full deployment. These
              are the five that mattered, each with the fix it produced.
            </p>
          </Reveal>

          {OBSTACLES.map((o) => (
            <Reveal
              key={o.n}
              data-povrow=""
              style={{ ...POV_ROW, padding: "24px 0" }}
            >
              <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 22,
                    color: BLUE,
                  }}
                >
                  {o.n}
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    textWrap: "pretty",
                  }}
                >
                  {o.t}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "14px minmax(0,1fr)",
                  gap: 12,
                  alignItems: "baseline",
                  paddingTop: 2,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 1.5,
                    borderRadius: 1,
                    background: "#E3735C",
                    transform: "translateY(-4px)",
                  }}
                />
                <div
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {o.s}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* --------------------------------------------------- request / CTA -- */}
        <div
          id="request"
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 104px" }}
        >
          <div
            data-hero-grid="1"
            style={{
              ...PANEL,
              display: "grid",
              gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ ...EYEBROW, color: BLUE }}>Go deeper</div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                Get the pilot results, or <Em>talk it through</Em>
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 540,
                  textWrap: "pretty",
                }}
              >
                Download a summary of the nine-month pilot results, including
                cohort detail, the KPI scorecard, and the obstacles as we
                reported them. Or bring your own rehab enrollment numbers and we
                will walk through what an orbit could change.
              </p>
              <div>
                <Link
                  href={BOOK_HREF}
                  className={hv("ctaWhite")}
                  style={{
                    textDecoration: "none",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    background: "#FFFFFF",
                    padding: "16px 28px",
                    borderRadius: 999,
                    display: "inline-block",
                    transition: "background .2s,transform .2s",
                  }}
                >
                  Book a 20-minute intro call
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "#FAF8F4",
                borderRadius: 28,
                padding: 32,
                color: "#0F1D2E",
              }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  marginBottom: 6,
                }}
              >
                Download the pilot summary
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.65)",
                  marginBottom: 14,
                }}
              >
                Full nine-month results and program detail, in one document.
              </div>
              <StudyRequest
                label="Download a summary of the pilot results"
                heading="Download the pilot summary"
                blurb="Tell us who you are and your download will be ready."
                file="/evidence-docs/CareOrbit-Pritikin-Pilot-Report.pdf"
                downloadLabel="Download the pilot report"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
