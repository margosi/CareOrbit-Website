import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./community-research.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import {
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  LedgerRow,
  MeasureLedger,
  NAVY_PANEL,
  PovRows,
  SECTION_LEAD,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import { GAPS, LIBRARY, MEASURES, POV, ROWS } from "@/lib/communityResearch";

/* Community Research. Port of v2-maven/CommunityResearch.dc.html.
 *
 * Unlike the other orbit pages this one has no separate *Page component -
 * the file IS the page - and no state beyond the info-sheet form, so this
 * is a server component.
 *
 * It is also the page whose hero float animation differs: see the
 * @keyframes coFloat override at the top of community-research.css.
 *
 * SiteNav gets active="research", which highlights no nav item and only
 * feeds the nav's ?src= parameter, exactly as in the source.
 */
const TEAL = "#4FB3BF";

export const metadata = metadataFor("/orbits/community-research");

export default function CommunityResearchPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="research" />
      <main id="main-content">
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
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
              <span style={{ ...EYEBROW, color: "#1F7B87" }}>
                Community research orbit solutions
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
              Your protocol in the participant&apos;s hands,{" "}
              <Em>every week between visits</Em>
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
              Guided digital support tailored to each protocol, cohort, and
              follow-up window, carried from first contact through the final
              assessment, so every participant knows what the study asks and
              when it asks it.
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
                href="/book-a-call?src=research"
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
                Get the research info sheet
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
              src="/images/research-hero.webp"
              alt=""
              placeholder="[Placeholder: community research team photo]"
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

        {/* ------------------------------ what an orbit is / three audiences -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 40 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ ...H2_LIGHT, maxWidth: 520 }}>
                A trusted guide your participants keep, from first contact
                through <Em>close-out</Em>.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p
                style={{
                  fontSize: 20,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.72)",
                  margin: 0,
                  maxWidth: 600,
                  textWrap: "pretty",
                }}
              >
                Your consent language and your visit schedule, delivered when
                each one actually matters. Alongside the packet at enrollment
                and the coordinator&apos;s reminder call, an orbit adds a
                consumer-grade digital mentor: engaging video, email, and text
                outreach that keeps people informed, oriented, and on protocol
                between visits.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "rgba(15,29,46,.6)",
                  margin: 0,
                  maxWidth: 600,
                  textWrap: "pretty",
                }}
              >
                Built to your protocol before launch. Nothing added to a
                coordinator&apos;s week.
              </p>
            </div>
          </Reveal>

          <Reveal
            data-value=""
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,.82fr) minmax(0,1.18fr)",
              gap: 60,
              alignItems: "start",
            }}
          >
            <div style={{ position: "relative", minWidth: 0 }}>
              <Figure
                src="/images/value-research.webp"
                alt=""
                placeholder="[Placeholder: study participant on a phone at home, vertical crop]"
                radius={28}
                sizes="(max-width: 1020px) 100vw, 40vw"
                style={{
                  display: "block",
                  width: "100%",
                  height: "clamp(420px,42vw,600px)",
                }}
              />
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: "rgba(15,29,46,.5)",
                  maxWidth: 300,
                  textWrap: "pretty",
                }}
              >
                One orbit, issued once, working for three audiences at the same
                time.
              </div>
            </div>
            <PovRows blocks={POV} />
          </Reveal>

          <Reveal
            style={{ display: "flex", flexDirection: "column", marginTop: 14 }}
          >
            {ROWS.map((r) => (
              <LedgerRow key={r.kicker} r={r} />
            ))}
            <div
              style={{
                borderTop: "1px solid rgba(15,29,46,.14)",
                paddingTop: 20,
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.55)",
                maxWidth: 820,
                textWrap: "pretty",
              }}
            >
              Instrument names are referenced to describe configuration only.
              CareOrbit is not affiliated with, and does not license or
              distribute, third-party assessment instruments; licensing stays
              with the instrument owner and your research agreement.
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------- where studies lose ground -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}
        >
          <Reveal
            data-pad="64"
            style={{
              ...NAVY_PANEL,
              display: "flex",
              flexDirection: "column",
              gap: 44,
            }}
          >
            <div data-hdr="" data-grid="split" style={HDR}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ ...EYEBROW, color: TEAL }}>
                  Where studies lose ground
                </div>
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  Attrition is rarely one failure. It is a hundred{" "}
                  <Em color={TEAL} weight={500}>
                    small gaps
                  </Em>
                  .
                </h2>
              </div>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                Community-based studies run for years across sites nobody staffs
                full time. Between visits, the protocol lives entirely in what a
                participant remembers and whether anyone can still reach them.
              </p>
            </div>

            <div
              data-hdr=""
              style={{
                borderTop: "1px solid #2D5A87",
                paddingTop: 26,
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: "32px 56px",
                alignItems: "start",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".13em",
                    textTransform: "uppercase",
                    color: TEAL,
                  }}
                >
                  What the gap costs
                </div>
                <div
                  style={{
                    fontSize: 16.5,
                    lineHeight: 1.6,
                    color: "#B9C8D8",
                    textWrap: "pretty",
                  }}
                >
                  None of this is decided at a study visit. Each one turns on
                  whether a participant understood what they agreed to,
                  remembered the window, and could still be reached when it
                  opened.
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 19,
                    lineHeight: 1.5,
                    color: "#FFFFFF",
                    textWrap: "pretty",
                  }}
                >
                  Behavioral health research demands deep, continuous patient
                  engagement, yet current tools fall short of capturing
                  real-world experience.
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    color: "#7E93AB",
                  }}
                >
                  National Institute of Mental Health, Research Priorities
                  Report
                </div>
              </div>
            </div>

            <div
              data-stat5=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                gap: "32px 56px",
                alignItems: "stretch",
                marginTop: -14,
              }}
            >
              {GAPS.map((g) => (
                <div
                  key={g.t}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: `2px solid ${TEAL}`,
                    paddingTop: 18,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 300,
                      fontSize: g.size,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "#FFFFFF",
                    }}
                  >
                    {g.n}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: ".11em",
                      textTransform: "uppercase",
                      color: TEAL,
                      lineHeight: 1.35,
                    }}
                  >
                    {g.t}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "#B9C8D8",
                      textWrap: "pretty",
                    }}
                  >
                    {g.d}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 14,
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: ".09em",
                      textTransform: "uppercase",
                      color: "#7E93AB",
                    }}
                  >
                    {g.src}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "#7E93AB",
                maxWidth: 900,
                textWrap: "pretty",
              }}
            >
              CareOrbit has no published outcome data in community-based
              research. The orbits on this page are blueprints built on the
              platform&apos;s engagement work in clinical care.
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- measurable value -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>
                Measurable value
              </div>
              <h2 style={H2_LIGHT}>
                How an orbit <Em>provides value</Em>.
              </h2>
            </div>
            <p style={SECTION_LEAD}>
              Every orbit is built against at least one named study metric and
              the accrual or follow-up it protects, agreed before the build
              starts.
            </p>
          </Reveal>

          <Reveal
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#1F7B87",
              }}
            >
              Targeted Outcomes
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "rgba(15,29,46,.78)",
              }}
            >
              What an orbit is built and tracked against from the first
              participant forward.
            </div>
          </Reveal>

          <Reveal style={{ borderTop: "1px solid rgba(15,29,46,.14)" }}>
            <MeasureLedger measures={MEASURES} numberColor="#1F7B87" />
          </Reveal>
        </div>

        {/* ------------------------------------------ what is in this solution -- */}
        <div
          id="assess"
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}
        >
          <Reveal data-pad="64" style={NAVY_PANEL}>
            <Reveal
              data-hdr=""
              data-grid="split"
              style={{ ...HDR, marginBottom: 34 }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ ...EYEBROW, color: TEAL }}>
                  What is in this solution
                </div>
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  Three capabilities. One{" "}
                  <Em color={TEAL} weight={500}>
                    participant experience
                  </Em>
                  .
                </h2>
              </div>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                A participant receives education and motivation, validated
                instruments arrive inside the same orbit, and every response is
                captured, structured, and exported to the team drawing the
                conclusions.
              </p>
            </Reveal>

            <Reveal
              data-catalog=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: "0 44px",
                borderTop: "1px solid #2D5A87",
              }}
            >
              {LIBRARY.map((c) => (
                <div
                  key={c.t}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    padding: "22px 0",
                    borderBottom: "1px solid rgba(45,90,135,.55)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Source Serif 4',serif",
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: 14,
                        color: TEAL,
                        minWidth: 24,
                      }}
                    >
                      {c.n}
                    </span>
                    <div
                      style={{
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 900,
                        fontSize: 21,
                        lineHeight: 1.2,
                        letterSpacing: "-0.015em",
                        color: "#FFFFFF",
                      }}
                    >
                      {c.t}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: "#B9C8D8",
                      textWrap: "pretty",
                    }}
                  >
                    {c.v}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginTop: 2,
                    }}
                  >
                    {c.items.map((it) => (
                      <div
                        key={it}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "14px minmax(0,1fr)",
                          gap: 12,
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            width: 9,
                            height: 1.5,
                            borderRadius: 1,
                            background: TEAL,
                            transform: "translateY(-4px)",
                          }}
                        />
                        <div
                          style={{
                            fontSize: 13.5,
                            lineHeight: 1.55,
                            color: "#8FA5BC",
                            textWrap: "pretty",
                          }}
                        >
                          {it}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal
              as="p"
              style={{
                margin: "26px 0 0",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#7E93AB",
                maxWidth: 940,
                textWrap: "pretty",
              }}
            >
              HIPAA-compliant, BAA-ready, EHR-friendly, and configurable to any
              study protocol. [Placeholder: the named orbit library for a given
              study is defined with the CareOrbit team during protocol scoping.]
            </Reveal>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------- CTA -- */}
        <div
          id="cta"
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 104px" }}
        >
          <Reveal
            data-split=""
            data-grid="split"
            data-pad="section"
            style={{
              background:
                "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
              borderRadius: 40,
              padding: "72px 64px",
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(30px,3.4vw,38px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: "#FFFFFF",
                  textWrap: "pretty",
                }}
              >
                20 minutes.{" "}
                <Em color={TEAL} weight={500}>
                  Your
                </Em>{" "}
                study population,{" "}
                <Em color={TEAL} weight={500}>
                  our
                </Em>{" "}
                platform.
              </h2>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                No demo script, no obligation. We get introduced, hear which
                follow-up windows are costing your study the most, and give you
                a brief look at the platform. Then we decide together whether it
                is worth a second conversation.
              </p>
              <Link
                href="/book-a-call?src=research"
                className={hv("navyPill")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "#FFFFFF",
                  padding: "16px 28px",
                  borderRadius: 999,
                  alignSelf: "flex-start",
                  marginTop: 4,
                  transition: "background .2s,color .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
            </div>

            <SheetRequestForm
              blurb="Get the community research info sheet by email."
              focus="inputFocusTealBorder"
              hover="bgTeal"
              resetOnEdit={false}
              pdf="/sheets/careorbit-community-research-2-page.pdf"
              downloadAs="CareOrbit-Community-Research-Info-Sheet.pdf"
            />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
