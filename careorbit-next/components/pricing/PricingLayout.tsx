import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { hv } from "@/lib/hoverStyles";
import type { Plan } from "@/lib/pricing";

/* Shared layout for the four plan pages, ported from Pricing.dc.html.
 * Inline styles verbatim. The four pages differ only in header copy, plan
 * data, the footer note, and two optional card elements (price line, add-on
 * box) - all driven by props here rather than four copies of the markup.
 */
export function PricingLayout({
  screenLabel,
  kicker,
  heading,
  blurb,
  note,
  plans,
}: {
  screenLabel: string;
  kicker: string;
  heading: ReactNode;
  blurb: string;
  note: string;
  plans: Plan[];
}) {
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
      <SiteNav active="pricing" />
      <main id="main-content">
        {/* data-pad="page-top": v2-maven's SiteNav stylesheet matched
          div[style*="padding: 72px 28px"] and cut padding-top below 1020px.
          Without it the plan grid sat 40px low at 768px. */}
        <div
          data-screen-label={screenLabel}
          data-pad="page-top"
          style={{
            maxWidth: 1280,
            width: "100%",
            margin: "0 auto",
            padding: "72px 28px 110px",
            boxSizing: "border-box",
            flex: 1,
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 720,
              margin: "0 auto 58px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#A4503F",
              }}
            >
              {kicker}
            </div>
            <h1
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px,4.8vw,58px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {heading}
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {blurb}
            </p>
          </div>

          <div
            data-plan-grid=""
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 26,
              alignItems: "stretch",
            }}
          >
            {plans.map((p) => (
              <Reveal
                key={p.name}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,29,46,.07)",
                  borderRadius: 28,
                  padding: "34px 32px 38px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  boxShadow: "none",
                  position: "relative",
                }}
              >
                <PlanRings ring2={p.ring2} ring3={p.ring3} />
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(15,29,46,.66)",
                    marginTop: 6,
                    lineHeight: 1.5,
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(15,29,46,.55)",
                    marginTop: 16,
                    lineHeight: 1.55,
                    minHeight: 66,
                    /* Pages with a price line carry the bottom gap on that line
                     * instead; pages without it put the 30px here. */
                    ...(p.price ? null : { marginBottom: 30 }),
                  }}
                >
                  {p.scope}
                </div>
                {p.price && (
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "#A4503F",
                      marginTop: 14,
                      marginBottom: 24,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.price}
                  </div>
                )}
                <Link
                  href={p.href}
                  className={hv("planCta")}
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#FFFFFF",
                    background: "#0F1D2E",
                    borderRadius: 12,
                    padding: "16px 24px",
                    transition: "background .2s,transform .2s",
                  }}
                >
                  Get a quote
                </Link>
                <div
                  style={{
                    height: 1,
                    background: "rgba(15,29,46,.08)",
                    margin: "28px 0 22px",
                  }}
                />
                {p.inherit && (
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 14,
                    }}
                  >
                    {p.inherit}
                  </div>
                )}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {p.items.map((it) => (
                    <div
                      key={it}
                      style={{
                        display: "flex",
                        gap: 11,
                        alignItems: "flex-start",
                      }}
                    >
                      <CheckMark />
                      <span
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.55,
                          color: "rgba(15,29,46,.82)",
                        }}
                      >
                        {it}
                      </span>
                    </div>
                  ))}
                </div>
                {p.assess && (
                  <div style={{ marginTop: "auto", paddingTop: 26 }}>
                    <div
                      style={{
                        background: "#FAF8F4",
                        border: "1px dashed rgba(15,29,46,.18)",
                        borderRadius: 16,
                        padding: "16px 18px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#A4503F",
                          marginBottom: 6,
                        }}
                      >
                        Optional add-on
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0F1D2E",
                        }}
                      >
                        Assess
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          color: "rgba(15,29,46,.66)",
                          marginTop: 4,
                        }}
                      >
                        {p.assess}
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "rgba(15,29,46,.55)",
              marginTop: 44,
              lineHeight: 1.6,
              textWrap: "pretty",
            }}
          >
            {note}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/* Orbit mark above each plan name. The outer rings fade in as the tier
 * grows: ring2/ring3 are 0 or 1 opacity, straight from the plan data. */
function PlanRings({ ring2, ring3 }: { ring2: number; ring3: number }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden="true"
      style={{ marginBottom: 20 }}
    >
      <circle cx="22" cy="22" r="6" fill="#E3735C" />
      <circle
        cx="22"
        cy="22"
        r="13"
        fill="none"
        stroke="#0F1D2E"
        strokeWidth="1.6"
        opacity={ring2}
      />
      <circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke="#0F1D2E"
        strokeWidth="1.6"
        opacity={ring3}
      />
      <circle cx="35" cy="22" r="3" fill="#5B9BEA" opacity={ring2} />
      <circle cx="22" cy="2.5" r="2.5" fill="#4FB3BF" opacity={ring3} />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      style={{ flexShrink: 0, marginTop: 3 }}
      aria-hidden="true"
    >
      <path
        d="M2.5 8l3.2 3.2L12.5 4"
        stroke="#4FB3BF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
