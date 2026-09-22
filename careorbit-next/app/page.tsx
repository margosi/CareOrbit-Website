import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./home.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { OrbitCarousel } from "@/components/home/OrbitCarousel";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { hv } from "@/lib/hoverStyles";
import {
  COST_MOMENTS,
  EXPLORE_CARDS,
  GALLERY,
  ISSUE_METHODS,
  MARQUEE,
  PROOF_STATS,
  type GallerySlide,
} from "@/lib/home";

/* Home. Port of v2-maven/Home.dc.html.
 *
 * Inline styles are verbatim from the original - they are the visual
 * contract the Phase 0 baseline was captured against.
 *
 * Section order (matches CLAUDE.md):
 *   announcement + nav -> hero -> #orbit-grid (tiles + explore) ->
 *   costliest moments -> #orbit-explainer -> sticky banner + donut stats ->
 *   Trusted by marquee -> case study -> CTA -> footer
 *
 * DEAD CODE NOT PORTED: the original's renderVals() also computed
 * orbitRow1/orbitRow2, chips, hasMatch/noMatch/matchKicker/matchTitle/
 * matchHook/matchFile, caseStats and steps. None are referenced anywhere in
 * the markup - they are leftovers from earlier revisions. ("Five steps" now
 * lives on the Platform page.)
 */
const CTA_LABEL = "Book a 20-minute intro call";

export const metadata = metadataFor("/");

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: "Inter,sans-serif",
        background: "#0F1D2E",
        overflowX: "clip",
      }}
    >
      <SiteNav active="home" />
      <main id="main-content">
        <HeroSection ctaLabel={CTA_LABEL} />

        {/* ------------------------------------------------ orbit gallery -- */}
        <div
          id="orbit-grid"
          style={{
            background:
              "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
            marginTop: 24,
          }}
        >
          <div
            data-pad="page-top"
            style={{
              maxWidth: 1220,
              margin: "0 auto",
              padding: "72px 28px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              textAlign: "center",
            }}
          >
            <Reveal
              as="div"
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 300,
                fontSize: "clamp(38px,4.6vw,62px)",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                margin: 0,
                color: "#FFFFFF",
                maxWidth: 900,
                textWrap: "balance",
              }}
            >
              <h2
                style={{ font: "inherit", letterSpacing: "inherit", margin: 0 }}
              >
                An orbit for{" "}
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 0,
                    color: "#F2B8C6",
                  }}
                >
                  every
                </em>{" "}
                clinical journey.
              </h2>
            </Reveal>
            <Reveal
              style={{
                fontSize: 19,
                color: "rgba(255,255,255,.85)",
                maxWidth: 720,
                lineHeight: 1.55,
              }}
            >
              Trusted within large, complex health systems to improve outcomes
              across critical care journeys
            </Reveal>
          </div>

          <GalleryRow
            slides={GALLERY.slice(0, 4)}
            style={{ padding: "32px 28px 14px" }}
          />
          <GalleryRow
            slides={GALLERY.slice(4)}
            style={{ padding: "0 28px 56px" }}
          />

          <OrbitCarousel />

          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "8px 28px 72px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            <Reveal
              style={{
                fontSize: "clamp(20px,2.2vw,28px)",
                fontFamily: "Lato,sans-serif",
                fontWeight: 300,
                color: "rgba(255,255,255,.85)",
                textAlign: "center",
                textWrap: "balance",
              }}
            >
              <span style={{ fontWeight: 400 }}>Orbits are expanding:</span>{" "}
              supporting community-based research, protecting high-risk workers
              in the field, and unlocking new capabilities
            </Reveal>

            <div
              data-explore-row=""
              style={{ display: "flex", gap: 14, height: 400 }}
            >
              {EXPLORE_CARDS.map((e) => (
                <div
                  key={e.slotId}
                  data-ex-card=""
                  style={{
                    position: "relative",
                    flex: 1,
                    borderRadius: 20,
                    overflow: "hidden",
                    minWidth: 0,
                  }}
                >
                  <div
                    data-ex-img=""
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Figure
                      src={e.src}
                      alt=""
                      shape="rect"
                      placeholder={e.hint}
                      sizes="(max-width:900px) 100vw, 33vw"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(15,29,46,.35)",
                      pointerEvents: "none",
                      transition: "background .55s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      left: 18,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#0F3D2E",
                      borderRadius: 8,
                      padding: "8px 14px",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#5CE8A4",
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        color: "#FFFFFF",
                      }}
                    >
                      {e.badge}
                    </span>
                  </div>
                  <div
                    data-ex-copy=""
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "26px 24px",
                      background:
                        "linear-gradient(0deg,rgba(15,29,46,.8),rgba(15,29,46,0))",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      data-ex-title=""
                      style={{
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(22px,2vw,30px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        color: "#FFFFFF",
                      }}
                    >
                      {e.title}
                      <em
                        style={{
                          fontFamily: "'Source Serif 4',serif",
                          fontStyle: "italic",
                          fontWeight: 600,
                          letterSpacing: 0,
                        }}
                      >
                        {e.accent}
                      </em>
                    </div>
                    <div data-ex-reveal="">
                      <div style={{ minHeight: 0, overflow: "hidden" }}>
                        <div
                          data-ex-sub=""
                          style={{
                            fontSize: 14,
                            color: "rgba(255,255,255,.85)",
                            marginTop: 8,
                            lineHeight: 1.5,
                            textWrap: "pretty",
                          }}
                        >
                          {e.sub}
                        </div>
                        <Link
                          data-ex-link=""
                          href={e.href}
                          className={hv("tileLearnMore")}
                          style={{
                            pointerEvents: "auto",
                            display: "inline-block",
                            marginTop: 16,
                            textDecoration: "none",
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#FFFFFF",
                            background: "rgba(255,255,255,.22)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                            padding: "12px 26px",
                            borderRadius: 12,
                            transition: "background .2s,color .2s",
                          }}
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------- costliest moments -- */}
        <div style={{ background: "#FAF8F4" }}>
          <div
            data-pad="page-top"
            style={{
              maxWidth: 1220,
              margin: "0 auto",
              padding: "72px 28px 56px",
            }}
          >
            <Reveal
              data-grid="split"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr .9fr",
                gap: 64,
                alignItems: "center",
                marginBottom: 36,
              }}
            >
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(38px,4.4vw,58px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                Your{" "}
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: 0,
                    color: "#E3735C",
                  }}
                >
                  costliest
                </em>{" "}
                moments happen when your patients aren&apos;t with you.
              </h2>
              <p
                data-ml-auto=""
                style={{
                  fontSize: "clamp(18px,1.5vw,22px)",
                  lineHeight: 1.7,
                  color: "rgba(15,29,46,.85)",
                  margin: 0,
                  maxWidth: 520,
                  marginLeft: "auto",
                  textWrap: "pretty",
                }}
              >
                Too often, patient engagement between visits relies on scattered
                handouts, occasional messages and time-consuming manual
                outreach. That gap in connection can carry a heavy price, one
                your system is already paying. As available time with each
                patient gets shorter, and care teams get stretched thinner, the
                time you do have with each patient and family matters more than
                ever.
              </p>
            </Reveal>

            <div
              data-grid="4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
              }}
            >
              {COST_MOMENTS.map((m) => (
                <Reveal
                  key={m.i}
                  className={hv("costCard")}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,29,46,.07)",
                    borderRadius: 22,
                    padding: "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    transition:
                      "transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: 17,
                      color: "#E3735C",
                    }}
                  >
                    {m.i}
                  </div>
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 900,
                      fontSize: 16,
                      lineHeight: 1.22,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {m.t}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(15,29,46,.68)",
                    }}
                  >
                    {m.d}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ------------------------------------------ orbit explainer -- */}
          <div
            id="orbit-explainer"
            style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}
          >
            <Reveal
              data-grid="split"
              style={{
                background:
                  "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
                borderRadius: 40,
                padding: "60px 64px",
                display: "grid",
                gridTemplateColumns: "1.05fr .95fr",
                gap: 56,
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#F2B8C6",
                  }}
                >
                  The answer is an orbit
                </div>
                <h2
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 40,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    color: "#FFFFFF",
                    textWrap: "pretty",
                  }}
                >
                  A guided digital experience supporting{" "}
                  <em
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      letterSpacing: 0,
                      color: "#F2B8C6",
                    }}
                  >
                    any
                  </em>{" "}
                  specific care journey.
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "#B9C8D8",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  An orbit covers the clinical, logistical, emotional,
                  educational, motivational, and tracking sides of a single
                  clinical journey. Patients receive it on any device, with no
                  downloads. All it needs is an email address. When there is
                  less time in the room, an orbit extends your team&apos;s
                  presence into every week between visits.
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 9 }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#5F7690",
                    }}
                  >
                    Issued however your workflow works
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {ISSUE_METHODS.map((im) => (
                      <span
                        key={im}
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#EAF1F8",
                          border: "1px solid #2D5A87",
                          borderRadius: 999,
                          padding: "7px 14px",
                        }}
                      >
                        {im}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 420,
                      height: 420,
                      borderRadius: "50%",
                      border: "1.5px dashed rgba(242,184,198,.25)",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 280,
                    height: 420,
                    animation: "coFloat 6s ease-in-out infinite alternate",
                  }}
                >
                  <Figure
                    src="/images/orbit-phone.webp"
                    alt=""
                    radius={34}
                    placeholder="Product screenshot: patient orbit view (PHI-free)"
                    sizes="280px"
                    style={{ width: 280, height: 420 }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ------------------------- sticky banner + donut-ring statistics -- */}
        <div>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "72vh",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "118%",
              }}
            >
              <Figure
                src="/images/outcomes-banner.webp"
                alt=""
                shape="rect"
                placeholder="[Placeholder: patient at home photo]"
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: -200,
              background: "#FAF8F4",
              borderRadius: "40px 40px 0 0",
            }}
          >
            <Reveal
              style={{
                padding: "72px 24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(38px,4.6vw,62px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  maxWidth: 820,
                  textWrap: "balance",
                }}
              >
                Improving outcomes by
                <br />
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 0,
                  }}
                >
                  engaging patients
                </em>
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.72)",
                  margin: 0,
                  maxWidth: 860,
                  textWrap: "pretty",
                }}
              >
                In a controlled clinical trial at Siteman Cancer Center, a
                CareOrbit journey measurably changed what patients understood,
                did, and needed.
              </p>
            </Reveal>

            <Reveal
              data-grid="4-min0"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                paddingBottom: 64,
              }}
            >
              {PROOF_STATS.map((s) => (
                <div
                  key={s.l}
                  style={{
                    flex: 1,
                    borderLeft: "1px solid rgba(15,29,46,.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(28px,4vw,64px) 24px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "clamp(220px,26vw,300px)",
                      aspectRatio: 1,
                    }}
                  >
                    <svg
                      viewBox="0 0 320 320"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <circle
                        cx="160"
                        cy="160"
                        r="148"
                        fill="none"
                        stroke="rgba(15,29,46,.1)"
                        strokeWidth="14"
                      />
                      <circle
                        className="co-ring"
                        cx="160"
                        cy="160"
                        r="148"
                        fill="none"
                        stroke={s.color}
                        strokeWidth="14"
                        transform="rotate(-90 160 160)"
                        style={
                          {
                            strokeDasharray: 930,
                            strokeDashoffset: 930,
                            "--rt": s.rt,
                          } as React.CSSProperties
                        }
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        padding: "0 40px",
                        textAlign: "center",
                      }}
                    >
                      <CountUp
                        style={{
                          fontFamily: "Lato,sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(40px,4.5vw,56px)",
                          letterSpacing: "-0.02em",
                          color: "#0F1D2E",
                          lineHeight: 1,
                        }}
                      >
                        {s.n}
                      </CountUp>
                      <div
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.5,
                          color: "rgba(15,29,46,.78)",
                        }}
                      >
                        {s.l}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* --------------------------------------------- Trusted by marquee -- */}
        <div
          style={{
            background:
              "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
            marginBottom: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "40px 0 28px",
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#DCE8F3",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#DCE8F3",
                display: "inline-block",
              }}
            />
            Trusted by
          </div>
          <div
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(255,255,255,.16)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "coMarquee 30s linear infinite",
              }}
            >
              {MARQUEE.map((m, i) => (
                <div
                  key={`${m}-${i}`}
                  style={{
                    width: 420,
                    height: 124,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid rgba(255,255,255,.16)",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 700,
                      fontSize: 27,
                      letterSpacing: "-0.01em",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------- case study + CTA -- */}
        <div style={{ background: "#FAF8F4" }}>
          <div
            style={{ maxWidth: 1220, margin: "0 auto", padding: "40px 28px 0" }}
          >
            <Reveal
              data-grid="split"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,29,46,.07)",
                borderRadius: 40,
                padding: 52,
                display: "grid",
                gridTemplateColumns: ".9fr 1.1fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div style={{ height: 330 }}>
                <Figure
                  src="/images/case-study-siteman.webp"
                  alt=""
                  radius={28}
                  placeholder="Care team reviewing the study"
                  sizes="(max-width:1020px) 100vw, 45vw"
                  style={{ width: "100%", height: 330 }}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#E3735C",
                  }}
                >
                  Case study &middot; WashU / Siteman
                </div>
                <h2
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 34,
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  A pancreatic cancer surgery orbit inside one of the
                  nation&apos;s leading academic medical centers.
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
                  Pancreatic Cancer Surgery Support ran at Washington University
                  and Siteman Cancer Center in a controlled clinical trial:
                  patients arrived prepared, care teams fielded fewer calls, and
                  every journey was tracked end to end.
                </p>
                <div style={{ fontSize: 11.5, color: "rgba(15,29,46,.5)" }}>
                  Controlled clinical trial at Siteman Cancer Center.
                </div>
                <Link
                  href="/outcomes"
                  className={hv("caseLink")}
                  style={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#2D5A87",
                    textDecoration: "none",
                  }}
                >
                  Read the case study &rarr;
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}
          >
            <Reveal
              data-pad="section"
              style={{
                background:
                  "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
                borderRadius: 40,
                padding: "72px 64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CtaWatermark />
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(36px,4.5vw,52px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: "#FFFFFF",
                  textWrap: "balance",
                }}
              >
                Your first orbit, live within{" "}
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 0,
                    color: "#F2B8C6",
                  }}
                >
                  a quarter
                </em>
                .
              </h2>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 640,
                  textWrap: "pretty",
                }}
              >
                Issued from inside your existing workflow, with no new FTEs and
                no forced workflows: a measurable lift in the outcomes you
                already track.
              </p>
              <Link
                href="/book-a-call?src=home"
                className={hv("ctaWhite")}
                style={{
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "#FFFFFF",
                  padding: "17px 34px",
                  borderRadius: 999,
                  marginTop: 8,
                  transition: "background .2s,color .2s,transform .2s",
                }}
              >
                {CTA_LABEL}
              </Link>
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/* One row of four orbit tiles. Hidden below 900px, where OrbitCarousel
 * takes over ([data-gallery-row] / [data-gallery-carousel]).
 *
 * The hover-expand animation is DISABLED per CLAUDE.md: the description and
 * the Learn more link are always visible. The original still carries the
 * expand state (exp / exp2) but nothing reads it, so it is not ported. */
function GalleryRow({
  slides,
  style,
}: {
  slides: GallerySlide[];
  style?: React.CSSProperties;
}) {
  return (
    <div
      data-gallery-row=""
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        gap: 14,
        height: 400,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {slides.map((g) => (
        <div
          key={g.slotId}
          data-tile-card=""
          style={{
            position: "relative",
            flex: 1,
            borderRadius: 20,
            overflow: "hidden",
            cursor: "pointer",
            minWidth: 90,
          }}
        >
          <div data-tile-img="" style={{ position: "absolute", inset: 0 }}>
            <Figure
              src={g.src}
              alt=""
              shape="rect"
              placeholder={g.hint}
              sizes="(max-width:900px) 100vw, 25vw"
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(15,29,46,.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: g.dot,
                display: "block",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "28px 26px",
              background:
                "linear-gradient(0deg,rgba(15,29,46,.78),rgba(15,29,46,0))",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: "#FFFFFF",
              }}
            >
              {g.title}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,.85)",
                marginTop: 4,
              }}
            >
              {g.sub}
            </div>
            <div>
              <div
                style={{
                  fontSize: 14.5,
                  color: "#FFFFFF",
                  marginTop: 10,
                  maxWidth: 460,
                  lineHeight: 1.5,
                }}
              >
                {g.desc}
              </div>
              <Link
                href={g.href}
                className={hv("tileLearnMore")}
                style={{
                  pointerEvents: "auto",
                  display: "inline-block",
                  marginTop: 14,
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "rgba(255,255,255,.22)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  padding: "12px 26px",
                  borderRadius: 12,
                  transition: "background .2s,color .2s",
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Faded orbit mark behind the closing CTA. Only the first eleven dots of the
 * logomark are drawn, exactly as in the original. */
const CTA_DOTS: [number, number, number][] = [
  [42, 24, 3.4],
  [40.3, 16.4, 2.8],
  [35.6, 10.2, 2],
  [28.7, 6.6, 1.3],
  [22.4, 6.1, 0.9],
  [17.2, 7.3, 1.3],
  [11.3, 11.3, 2.1],
  [7.1, 17.8, 2.9],
  [6.1, 25.6, 2],
  [7.7, 31.6, 1.3],
  [10.6, 36, 0.8],
];

function CtaWatermark() {
  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 48 48"
      style={{
        position: "absolute",
        right: -88,
        bottom: -96,
        opacity: 0.11,
        pointerEvents: "none",
      }}
      fill="none"
    >
      {CTA_DOTS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#FFFFFF" />
      ))}
    </svg>
  );
}
