import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./outcomes.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { OutcomesTabs } from "@/components/outcomes/OutcomesTabs";
import { hv } from "@/lib/hoverStyles";
import { HOW, ROI, ROI_EXAMPLES, STUDIES } from "@/lib/outcomes";

/* Outcomes & ROI. Port of v2-maven/Outcomes.dc.html. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};
const WRAP: React.CSSProperties = { maxWidth: 1220, margin: "0 auto" };
const SECTION_H2: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.5vw,40px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
  maxWidth: 520,
};
const SECTION_P: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.72)",
  margin: 0,
  textWrap: "pretty",
};
const CARD: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(15,29,46,.07)",
  borderRadius: 28,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  transition: "transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s",
};
const TAG_ROW: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};
const TAG_TXT: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "rgba(15,29,46,.55)",
};

function SectionHeader({
  heading,
  children,
}: {
  heading: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      data-hdr=""
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "start",
        marginBottom: 44,
      }}
    >
      {heading}
      <p style={SECTION_P}>{children}</p>
    </Reveal>
  );
}

export const metadata = metadataFor("/outcomes");

export default function OutcomesPage() {
  /* Tab 0 content */
  const outcomesTab = (
    <>
      <div style={{ ...WRAP, padding: "0 28px 96px" }}>
        <SectionHeader
          heading={
            <h2 style={SECTION_H2}>
              Key <em style={SERIF}>studies</em> and deployments.
            </h2>
          }
        >
          The evidence behind the platform. Topline results are shown here, and
          each full write-up is available by request.
        </SectionHeader>
        <div
          data-grid3=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 18,
          }}
        >
          {STUDIES.map((st) => (
            <Reveal key={st.slot} className={hv("liftCard")} style={CARD}>
              <div style={{ height: 200 }}>
                <Figure
                  src={st.src}
                  alt=""
                  placeholder={st.imgHint}
                  sizes="(max-width:1020px) 100vw, 33vw"
                  style={{ width: "100%", height: 200 }}
                />
              </div>
              <div
                style={{
                  padding: "26px 26px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                <div style={TAG_ROW}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: st.dot,
                      display: "inline-block",
                    }}
                  />
                  <span style={TAG_TXT}>{st.tag}</span>
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {st.t}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.68)",
                    flex: 1,
                  }}
                >
                  {st.d}
                </div>
                <Link
                  href={st.href}
                  className={hv("linkCoral")}
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#2D5A87",
                    textDecoration: "none",
                  }}
                >
                  {st.cta} &rarr;
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Engagement Index sample card */}
      <div style={{ ...WRAP, padding: "0 28px 96px" }}>
        <Reveal
          data-split=""
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                /* 12.5px eyebrow on paper: same reasoning as Home. */
                color: "#B15948",
              }}
            >
              Reporting, shown
            </div>
            <h2
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: 33,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              &quot;Trackable&quot; lands harder when you can{" "}
              <em style={SERIF}>see</em> the tracking.
            </h2>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              Every patient carries an Engagement Index: one at-a-glance score,
              broken into knowledge, feeling, and actions, flagging topics not
              yet engaged or past due. Program dashboards roll it up across
              every orbit, and any view exports in one click.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,29,46,.07)",
                borderRadius: 26,
                boxShadow: "0 24px 56px rgba(15,29,46,.08)",
                padding: 26,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                  Engagement Index &middot; J. Patient
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 27,
                    letterSpacing: "-0.02em",
                    color: "#1A6B3C",
                  }}
                >
                  8.2
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  { l: "Knowledge", w: "88%", c: "#2D5A87", v: "8.8" },
                  { l: "Feeling", w: "76%", c: "#5B9BEA", v: "7.6" },
                  { l: "Actions", w: "81%", c: "#E3735C", v: "8.1" },
                ].map((b) => (
                  <div
                    key={b.l}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ fontSize: 12, color: "#5A7089", width: 80 }}>
                      {b.l}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 9,
                        background: "#FAF8F4",
                        borderRadius: 5,
                      }}
                    >
                      <div
                        style={{
                          width: b.w,
                          height: 9,
                          background: b.c,
                          borderRadius: 5,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#1E3A5F",
                      }}
                    >
                      {b.v}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#FBEDE9",
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 12,
                  color: "#A4503F",
                  fontWeight: 500,
                }}
              >
                2 topics past due: &quot;Managing side effects&quot;, &quot;Your
                2-minute check-in&quot;
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );

  /* Tab 1 content */
  const roiTab = (
    <>
      <div style={{ ...WRAP, padding: "0 28px 96px" }}>
        <SectionHeader
          heading={
            <h2 style={SECTION_H2}>
              Targeted ROI, built on the goals that{" "}
              <em style={SERIF}>matter most</em>.
            </h2>
          }
        >
          Each orbit targets the financial outcomes that matter most to your
          organization, chosen before the build. Here is what that looks like:
          the outcome, and how it was tracked and delivered.
        </SectionHeader>
        <div
          data-grid2=""
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {ROI_EXAMPLES.map((e) => (
            <Reveal key={e.slot} className={hv("liftCard")} style={CARD}>
              <div style={{ height: 210 }}>
                <Figure
                  src={e.src}
                  alt=""
                  placeholder={e.imgHint}
                  sizes="(max-width:1020px) 100vw, 50vw"
                  style={{ width: "100%", height: 210 }}
                />
              </div>
              <div
                style={{
                  padding: "28px 28px 30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  flex: 1,
                }}
              >
                <div style={TAG_ROW}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: e.dot,
                      display: "inline-block",
                    }}
                  />
                  <span style={TAG_TXT}>{e.tag}</span>
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {e.t}
                </div>
                {[
                  { k: "The outcome", c: "#E3735C", v: e.outcome },
                  { k: "How we track and deliver", c: "#2D5A87", v: e.tracked },
                ].map((blk) => (
                  <div
                    key={blk.k}
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: blk.c,
                      }}
                    >
                      {blk.k}
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "rgba(15,29,46,.75)",
                      }}
                    >
                      {blk.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ ...WRAP, padding: "0 28px 96px" }}>
        <SectionHeader
          heading={
            <h2 style={SECTION_H2}>
              Where the ROI <em style={SERIF}>shows up</em>.
            </h2>
          }
        >
          Three places an orbit pays for itself, whatever the service line.
        </SectionHeader>
        <div
          data-grid3=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 18,
          }}
        >
          {ROI.map((r) => (
            <Reveal
              key={r.t}
              className={hv("liftCard")}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,29,46,.07)",
                borderRadius: 30,
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition:
                  "transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 6,
                  borderRadius: 3,
                  background: r.accent,
                }}
              />
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: 21,
                  letterSpacing: "-0.01em",
                }}
              >
                {r.t}
              </div>
              {r.points.map((p) => (
                <div
                  key={p}
                  style={{ display: "flex", gap: 9, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: r.accent,
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "rgba(15,29,46,.7)",
                    }}
                  >
                    {p}
                  </div>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="outcomes" />
      <main id="main-content">
        <div data-screen-label="Outcomes and ROI" style={{ width: "100%" }}>
          {/* ------------------------------------------------------- hero -- */}
          {/* data-pad="page-top": v2-maven's SiteNav stylesheet matched
            div[style*="padding: 76px 28px"] and reduced padding-top below
            1020px. Without the tag the hero kept 76px and pushed the whole
            page down 40px at 768px. */}
          <div
            data-pad="page-top"
            style={{
              ...WRAP,
              padding: "76px 28px 56px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(36px,4.4vw,54px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                maxWidth: 880,
                textWrap: "balance",
              }}
            >
              Every orbit is designed <em style={SERIF}>backwards</em> from a
              measurable outcome.
            </h1>
            <p
              style={{
                fontSize: 17.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                maxWidth: 760,
                textWrap: "pretty",
              }}
            >
              The outcomes that matter most to your organization, and their
              financial ROI, chosen before the build starts, with trackable
              reporting that continuously proves both the human and financial
              value. This page holds all the real evidence in one place you can
              send to your CFO or committee.
            </p>
          </div>

          {/* ----------------------------------------------- how we work -- */}
          <Reveal style={{ position: "relative", margin: "12px 0 56px" }}>
            <Figure
              src="/images/how-we-work-bg.webp"
              alt=""
              radius={0}
              shape="rect"
              placeholder="[Placeholder: full-width care team photo]"
              sizes="100vw"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15,29,46,.62)",
              }}
            />
            <div style={{ position: "relative", padding: "110px 0" }}>
              <div style={{ ...WRAP, padding: "48px 28px 0" }}>
                <h2
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(30px,3.6vw,42px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    margin: "0 0 34px",
                    color: "#FFFFFF",
                  }}
                >
                  How we <em style={{ ...SERIF, color: "#F2B8C6" }}>work</em>.
                </h2>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.28)" }}>
                <div style={{ ...WRAP, padding: "0 28px" }}>
                  <div
                    data-how4=""
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                    }}
                  >
                    {HOW.map((h) => (
                      <div
                        key={h.n}
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,.28)",
                          padding: "26px 24px 38px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,.16)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Source Serif 4',serif",
                            fontStyle: "italic",
                            fontWeight: 600,
                            fontSize: 15,
                            color: "#F2B8C6",
                          }}
                        >
                          {h.n}
                        </div>
                        <div
                          style={{
                            fontFamily: "Lato,sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(17px,1.6vw,20px)",
                            lineHeight: 1.22,
                            letterSpacing: "-0.01em",
                            color: "#FFFFFF",
                            textWrap: "balance",
                          }}
                        >
                          {h.t}
                        </div>
                        <div
                          style={{
                            fontSize: 13.5,
                            lineHeight: 1.6,
                            color: "#D5DEE8",
                            flex: 1,
                            textWrap: "pretty",
                          }}
                        >
                          {h.d}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <OutcomesTabs outcomes={outcomesTab} roi={roiTab} />

          {/* -------------------------------------------------------- CTA -- */}
          <div style={{ ...WRAP, padding: "0 28px 104px" }}>
            <Reveal
              data-pad="section"
              style={{
                background:
                  "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
                borderRadius: 40,
                padding: "80px 64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px,3.4vw,42px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: "#FFFFFF",
                  textWrap: "balance",
                }}
              >
                Walk through the numbers for{" "}
                <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                  your
                </em>{" "}
                service line.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 560,
                }}
              >
                20 minutes, your goals mapped against a proven blueprint, and
                the outcomes an orbit would target for you.
              </p>
              <Link
                href="/book-a-call?src=outcomes"
                className={hv("ctaWhite")}
                style={{
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "#FFFFFF",
                  padding: "17px 32px",
                  borderRadius: 999,
                  marginTop: 6,
                  transition: "background .2s,color .2s,transform .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
