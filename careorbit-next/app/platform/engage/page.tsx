import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./product.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { LedgerHeader, LedgerRow } from "@/components/product/Ledger";
import { ProductHero } from "@/components/product/ProductHero";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { hv } from "@/lib/hoverStyles";
import { LAUNCH, MENTOR, MODES, REACH, TRIAL_STATS } from "@/lib/engage";

/* Engage. Port of v2-maven/EngagePage.dc.html.
 * Nav highlights "orbits", as in the original (active="orbits").
 */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

const H2: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.6vw,48px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
  textWrap: "balance",
};

const SEC: React.CSSProperties = {
  maxWidth: 1440,
  margin: "96px auto 0",
  boxSizing: "border-box",
};

const PANEL: React.CSSProperties = {
  background: "#F1EDE4",
  borderRadius: 32,
  padding: "clamp(48px,6vw,88px) clamp(28px,5vw,80px)",
  boxSizing: "border-box",
};

export const metadata = metadataFor("/platform/engage");

export default function EngagePage() {
  return (
    <div
      style={{
        fontFamily: "Inter,sans-serif",
        background: "#FAF8F4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteNav active="orbits" />

      <div
        data-screen-label="CareOrbit Engage"
        style={{ width: "100%", flex: 1 }}
      >
        <ProductHero
          heading={<em style={{ ...SERIF, color: "#2D5A87" }}>Engage</em>}
          blurb="Care-team-approved digital journeys that put your guidance in the patient's hands from diagnosis through recovery, so every patient stays on course between visits."
          src="/images/engage-hero-11.webp"
          placeholder="[Placeholder: Engage hero image]"
          bookSrc="engage-page"
          sheetLabel="Get the Engage info sheet"
        />

        {/* ------------------------------------------------ one orbit -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
          <Reveal data-panel="" style={PANEL}>
            <LedgerHeader
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  One orbit, working the <em style={SERIF}>whole journey</em>.
                </h2>
              }
            >
              Between visits is when readmissions, cancellations, no-shows, and
              avoidable calls happen. Engage works exactly those weeks.
            </LedgerHeader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {MODES.map((m) => (
                <LedgerRow key={m.kicker} block={m} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* -------------------------------------------- virtual mentor -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              heading={
                <h2 style={H2}>
                  A virtual mentor,{" "}
                  <em style={SERIF}>in orbit around every patient</em>.
                </h2>
              }
            >
              An orbit surrounds the patient with the support, information, and
              direction their journey asks for, at every step.
            </LedgerHeader>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {MENTOR.map((m) => (
              <LedgerRow key={m.kicker} block={m} />
            ))}
            <p
              style={{
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.5)",
                margin: "14px 0 0",
                maxWidth: 760,
              }}
            >
              Every orbit starts from the pain points you name: readmissions,
              cancellations, no-shows, call volume. It is designed to move those
              numbers, and then measured against them, so engagement is never
              activity for its own sake.
            </p>
          </div>
        </div>

        {/* -------------------------------------------- pick a journey -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
          <Reveal data-panel="" style={PANEL}>
            <LedgerHeader
              heading={
                <h2 style={H2}>
                  Pick one journey. <em style={SERIF}>Prove it in a quarter</em>
                  .
                </h2>
              }
            >
              Engage launches without an interface project, a portal rollout, or
              new work for your staff. 90 days to launch, and the first cohort
              reports against your baseline inside a quarter.
            </LedgerHeader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {LAUNCH.map((m) => (
                <LedgerRow key={m.kicker} block={m} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------- how it reaches -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="How it reaches patients"
              heading={
                <h2 style={H2}>
                  No app. No login. <em style={SERIF}>No new work</em> for your
                  team.
                </h2>
              }
            >
              Five routes, all from the workflow you already run. In leading
              EHRs like Epic, an orbit can be ordered as easily as ordering
              bloodwork.
            </LedgerHeader>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {REACH.map((r) => (
              <div
                key={r.n}
                data-row=""
                style={{
                  display: "grid",
                  gridTemplateColumns: ".62fr 1fr",
                  gap: 44,
                  borderTop: "1px solid rgba(15,29,46,.14)",
                  padding: "22px 0",
                }}
              >
                <div
                  style={{ display: "flex", gap: 18, alignItems: "baseline" }}
                >
                  <span
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: 20,
                      color: "#E3735C",
                      minWidth: 30,
                    }}
                  >
                    {r.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 900,
                      fontSize: 19,
                      letterSpacing: "-0.01em",
                      color: "#0F1D2E",
                    }}
                  >
                    {r.t}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "rgba(15,29,46,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {r.d}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------- trial results -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="Measured in a controlled trial"
              marginBottom={34}
              lead="flow"
              heading={
                <h2 style={H2}>
                  Engaged patients are your most{" "}
                  <em style={{ ...SERIF, fontWeight: 500 }}>valuable asset</em>.
                </h2>
              }
            >
              In a controlled trial at Siteman Cancer Center with Washington
              University, patients carrying an orbit were compared with patients
              receiving standard education. These are the measured results.
            </LedgerHeader>
            <div
              style={{
                borderTop: "1px solid rgba(15,29,46,.14)",
                marginBottom: 26,
              }}
            />
            <div
              data-stat4=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 32,
              }}
            >
              {TRIAL_STATS.map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: "2px solid #E3735C",
                    paddingTop: 18,
                    minHeight: 130,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(30px,3.2vw,42px)",
                      lineHeight: 1,
                      color: "#0F1D2E",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#A8412F",
                    }}
                  >
                    {s.l}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "rgba(15,29,46,.65)",
                    }}
                  >
                    {s.d}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.5)",
                margin: "26px 0 0",
                maxWidth: 760,
              }}
            >
              Nine in ten patients reported the orbit helped them navigate their
              care.{" "}
              <Link
                href="/evidence/siteman-study"
                className={hv("studyLink")}
                style={{
                  color: "#2D5A87",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(45,90,135,.4)",
                }}
              >
                Read the study results &rarr;
              </Link>
            </p>
          </Reveal>
        </div>

        {/* --------------------------------------------------- CTA -- */}
        <div id="cta" data-sec="" style={{ ...SEC, padding: "0 28px 104px" }}>
          <Reveal
            data-split=""
            data-panel=""
            style={{
              background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
              borderRadius: 32,
              padding: "clamp(48px,6vw,80px) clamp(28px,5vw,72px)",
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 style={{ ...H2, color: "#FFFFFF" }}>
                20 minutes. Your engagement pain points,{" "}
                <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                  our platform
                </em>
                .
              </h2>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.65,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                No demo script, no obligation. We hear which moments between
                visits are costing your program the most, and give you a brief
                look at how Engage works them. Assess folds in when you want
                measures collected along the way.
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
                  href="/book-a-call?src=engage-page"
                  className={hv("btnBlush")}
                  style={{
                    textDecoration: "none",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    background: "#FFFFFF",
                    padding: "16px 30px",
                    borderRadius: 999,
                    transition: "background .2s",
                  }}
                >
                  Book a 20-minute intro call
                </Link>
              </div>
            </div>
            <SheetRequestForm
              blurb="Get the CareOrbit Engage info sheet by email."
              pdf="/sheets/careorbit-engage-2-page.pdf"
              downloadAs="CareOrbit-Engage-Info-Sheet.pdf"
            />
          </Reveal>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
