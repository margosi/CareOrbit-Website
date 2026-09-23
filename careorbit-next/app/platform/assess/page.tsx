import Image from "next/image";
import { metadataFor } from "@/lib/seo";
import Link from "next/link";
import "../engage/product.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { LedgerHeader, LedgerRow } from "@/components/product/Ledger";
import { ProductHero } from "@/components/product/ProductHero";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { hv } from "@/lib/hoverStyles";
import { EXACT_PIXELS } from "@/lib/migration";
import {
  INSIDE,
  LAUNCH,
  MANDATE_STATS,
  MODES,
  PAY_QUAD,
  VA_STATS,
} from "@/lib/assess";

/* Assess. Port of v2-maven/AssessPage.dc.html. */
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
const PANEL_BASE: React.CSSProperties = {
  borderRadius: 32,
  padding: "clamp(48px,6vw,88px) clamp(28px,5vw,80px)",
  boxSizing: "border-box",
};

export const metadata = metadataFor("/platform/assess");

export default function AssessPage() {
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
      <main id="main-content">
        <div
          data-screen-label="CareOrbit Assess"
          style={{ width: "100%", flex: 1 }}
        >
          <ProductHero
            heading={<em style={{ ...SERIF, color: "#2D5A87" }}>Assess</em>}
            blurb="Structured patient input for any orbit, from light check-ins to formalized eScreening and PROMs reporting, or entirely on its own. No app, no login, no new FTEs."
            src="/images/assess-hero-5.webp"
            placeholder="[Placeholder: Assess hero image]"
            bookSrc="assess-page"
            sheetLabel="Get the Assess info sheet"
          />

          {/* ------------------------------------------ three ways to listen -- */}
          <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
            <Reveal
              data-panel=""
              style={{ ...PANEL_BASE, background: "#F1EDE4" }}
            >
              <LedgerHeader
                marginBottom={34}
                heading={
                  <h2 style={H2}>
                    One tool, <em style={SERIF}>three ways</em> to listen.
                  </h2>
                }
              >
                Between visits is when symptoms shift, screenings lapse, and
                reportable outcomes go uncollected. Assess turns that quiet
                stretch into structured, usable data.
              </LedgerHeader>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {MODES.map((m) => (
                  <LedgerRow key={m.kicker} block={m} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ why now -- */}
          <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
            <Reveal
              data-panel=""
              style={{
                ...PANEL_BASE,
                background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
              }}
            >
              <div
                data-hdr=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 56,
                  alignItems: "start",
                  marginBottom: 34,
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#4FB3BF",
                    }}
                  >
                    Why now
                  </div>
                  <h2 style={{ ...H2, color: "#FFFFFF" }}>
                    PROMs stopped being{" "}
                    <em style={{ ...SERIF, fontWeight: 500, color: "#4FB3BF" }}>
                      optional
                    </em>
                    .
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: "clamp(16px,1.4vw,19px)",
                    lineHeight: 1.65,
                    color: "#B9C8D8",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  CMS now requires patient-reported outcomes for hip and knee
                  replacement, and has announced expansion beyond the hospital.
                  Collection is the hard part: patients are home when the
                  surveys come due. That is exactly where Assess lives.
                </p>
              </div>
              <div
                style={{
                  borderTop: "1px solid #2D5A87",
                  paddingTop: 26,
                  marginBottom: 22,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#4FB3BF",
                  }}
                >
                  The orthopedic mandate, by the numbers
                </div>
              </div>
              <div
                data-stat5=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 32,
                }}
              >
                {MANDATE_STATS.map((s) => (
                  <div
                    key={s.l}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      borderTop: "2px solid #4FB3BF",
                      paddingTop: 18,
                      minHeight: 150,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(30px,3.2vw,42px)",
                        lineHeight: 1,
                        color: "#FFFFFF",
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
                        color: "#4FB3BF",
                      }}
                    >
                      {s.l}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#B9C8D8",
                      }}
                    >
                      {s.d}
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "#7E93AB",
                        marginTop: "auto",
                      }}
                    >
                      {s.src}
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#7E93AB",
                  margin: "26px 0 0",
                  maxWidth: 760,
                }}
              >
                Hip and knee arthroplasty is where the mandate starts, not where
                it ends. CMS has finalized expansion of the same measure to
                outpatient and ambulatory surgical settings, and value-based
                programs continue to push patient-reported measures into
                additional service lines.
              </p>
            </Reveal>
          </div>

          {/* --------------------------------------- reimbursement quadrant -- */}
          <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
            <Reveal
              data-panel=""
              style={{ ...PANEL_BASE, background: "#EEF2F7" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 24,
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#2D5A87",
                  }}
                >
                  Reimbursement and funding
                </div>
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "rgba(15,29,46,.55)",
                  }}
                >
                  Screening that pays its way
                </div>
              </div>
              <div
                data-stat5=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 32,
                }}
              >
                {PAY_QUAD.map((p) => (
                  <div
                    key={p.t}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      borderTop: "2px solid #2D5A87",
                      paddingTop: 16,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 900,
                        fontSize: 17,
                        letterSpacing: "-0.01em",
                        color: "#0F1D2E",
                      }}
                    >
                      {p.t}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "rgba(15,29,46,.65)",
                      }}
                    >
                      {p.d}
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.5)",
                  margin: "26px 0 0",
                }}
              >
                CPT codes shown as examples. Billing eligibility depends on
                payer policy and documentation.
              </p>
            </Reveal>
          </div>

          {/* ----------------------------------------- every patient scored -- */}
          <div
            data-sec=""
            style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}
          >
            <Reveal>
              <LedgerHeader
                marginBottom={34}
                heading={
                  <h2 style={H2}>
                    Every patient scored,{" "}
                    <em style={SERIF}>every score routed</em>.
                  </h2>
                }
              >
                Most systems stop when the assessment is submitted. Assess keeps
                working the result: scores are routed, patients are supported,
                and the next assessment is already scheduled.
              </LedgerHeader>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {INSIDE.map((m) => (
                <LedgerRow key={m.kicker} block={m} />
              ))}
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.5)",
                  margin: "14px 0 0",
                }}
              >
                Instruments and schedules are configured to your protocols and
                approved by your team.
              </p>
            </div>
          </div>

          {/* --------------------------------------------- eScreening study -- */}
          <div
            data-sec=""
            style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}
          >
            <Reveal>
              <LedgerHeader
                kicker="Proven in the field"
                marginBottom={34}
                heading={
                  <h2 style={H2}>
                    eScreening, tested where the stakes are{" "}
                    <em style={SERIF}>highest</em>.
                  </h2>
                }
              >
                The eScreening approach behind Assess is a proven solution in
                use across VA medical centers nationwide, where screening
                completion is a matter of safety, not paperwork.
              </LedgerHeader>
            </Reveal>
            <Reveal
              data-study=""
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56,
                borderTop: "1px solid rgba(15,29,46,.14)",
                paddingTop: 34,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      background: "#EBF4EE",
                      color: "#1A6B3C",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: ".04em",
                      padding: "6px 13px",
                      borderRadius: 999,
                    }}
                  >
                    Deployed at scale
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(22px,2.4vw,28px)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                  }}
                >
                  Adopted across VA medical centers, with measured gains over
                  paper screening.
                </div>
                <p
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: "rgba(15,29,46,.7)",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  In a published VA study of 1,372 newly enrolling veterans,
                  electronic screening beat paper on accessibility, completion
                  rate, clinical processes, speed of connection to care, and
                  time to document required suicide risk assessments. By 2022
                  the program had been adopted at 19 VA medical centers with 18
                  more adoptions in progress. These are VA program results,
                  cited as evidence for the approach Assess is built on.
                </p>
                <Link
                  href="/evidence/escreening-results"
                  className={hv("studyLink")}
                  style={{
                    alignSelf: "flex-start",
                    textDecoration: "none",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#2D5A87",
                    paddingBottom: 3,
                    borderBottom: "1.5px solid rgba(45,90,135,.4)",
                    transition: "color .2s,border-color .2s",
                  }}
                >
                  Read the eScreening evidence &rarr;
                </Link>
                <div
                  style={{
                    height: "clamp(180px,20vw,240px)",
                    position: "relative",
                  }}
                >
                  <Image
                    src="/images/assess-escreening.webp"
                    alt="A veteran completing eScreening assessments at a VA medical center with his care team"
                    fill
                    unoptimized={EXACT_PIXELS}
                    sizes="(max-width:820px) 100vw, 45vw"
                    style={{
                      objectFit: "cover",
                      borderRadius: 24,
                      display: "block",
                    }}
                  />
                </div>
              </div>
              {/* data-grid="split": v2-maven's GLOBAL responsive.css collapsed
                any div[style*="grid-template-columns: 1fr 1fr"] to one column
                below 1020px. This grid carries no page-level data attribute,
                so that global rule was the only thing collapsing it - without
                the tag it stayed two-up and the study block came out 245px
                short at 768px. */}
              <div
                data-grid="split"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 32,
                  alignContent: "start",
                }}
              >
                {VA_STATS.map((s) => (
                  <div
                    key={s.l}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      borderTop: "1px solid rgba(15,29,46,.14)",
                      paddingTop: 18,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(30px,3.2vw,40px)",
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
                        color: "#1F7B87",
                      }}
                    >
                      {s.l}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "rgba(15,29,46,.62)",
                      }}
                    >
                      {s.d}
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "#6F6A62",
                      }}
                    >
                      {s.src}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------- pick a requirement -- */}
          <div
            data-sec=""
            style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}
          >
            <Reveal>
              <LedgerHeader
                marginBottom={34}
                heading={
                  <h2 style={H2}>
                    Pick one requirement.{" "}
                    <em style={SERIF}>Prove it in a quarter</em>.
                  </h2>
                }
              >
                Assess launches without an interface project, a portal rollout,
                or new work for your staff. 90 days to launch, and the first
                cohort reports capture rates against your baseline inside a
                quarter.
              </LedgerHeader>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {LAUNCH.map((m) => (
                <LedgerRow key={m.kicker} block={m} />
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------- CTA -- */}
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <h2 style={{ ...H2, color: "#FFFFFF" }}>
                  Start listening{" "}
                  <em style={{ ...SERIF, fontWeight: 500, color: "#4FB3BF" }}>
                    between visits
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
                  Bring one screening mandate, one PROMs requirement, or one
                  orbit you want to hear back from. We will show you what Assess
                  collects and where it lands in your workflow.
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
                    href="/book-a-call?src=assess-page"
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
                blurb="Get the CareOrbit Assess info sheet by email."
                pdf="/sheets/careorbit-assess-2-page.pdf"
                downloadAs="CareOrbit-Assess-Info-Sheet.pdf"
                focus="inputFocusTeal"
              />
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
