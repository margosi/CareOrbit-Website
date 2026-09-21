"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { hv } from "@/lib/hoverStyles";
import {
  DEPLOY_ROW,
  EVOLVE_ROW,
  ORTHO_SEGMENTS,
  QUOTES,
  VALUE_SRC,
} from "@/lib/orthopedics";

/* Everything on the Orthopedics page below the hero. Port of
 * OrthopedicsPage.dc.html lines 84-306 plus the segment half of
 * renderVals().
 *
 * Same shape as CardiologySegments - four tabs drive every section down to
 * the closing CTA - with four real differences carried over from the
 * source:
 *   1. the ledger has THREE rows, and the middle one renders as a stepped
 *      sequence (legacy: r.seq) rather than a dash list (r.plain)
 *   2. the "what the gap costs" stats come from `window`, which has no
 *      source line and no disclaimer paragraph under it, and whose fourth
 *      entry is set larger (legacy: w.hero)
 *   3. there is no "Targeted Outcomes" sub-header above the ROI ledger
 *   4. the evidence block is the Siteman trial and is static; only the
 *      accent colours and the "orthopedic" wording change from Cardiology
 */

const SERIF_600: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

const SERIF_500_BLUE: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 500,
  letterSpacing: 0,
  color: "#5B9BEA",
};

const H2_LIGHT: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.6vw,42px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
  textWrap: "balance",
};

const HDR: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 56,
  alignItems: "start",
};

const NAVY_PANEL: React.CSSProperties = {
  background: "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
  borderRadius: 40,
  padding: "64px 56px",
};

const EYEBROW: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: ".14em",
  textTransform: "uppercase",
};

const POV_ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0,.62fr) minmax(0,1fr)",
  gap: "16px 40px",
  alignItems: "start",
  padding: "26px 0",
  borderTop: "1px solid rgba(15,29,46,.14)",
};

const POV_KICKER: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".13em",
  textTransform: "uppercase",
};

const POV_TITLE: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 900,
  fontSize: "clamp(21px,2.2vw,26px)",
  lineHeight: 1.14,
  letterSpacing: "-0.02em",
  color: "#0F1D2E",
  textWrap: "balance",
};

const POV_SUB: React.CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.6)",
  textWrap: "pretty",
  maxWidth: 330,
};

const DASH_GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "14px minmax(0,1fr)",
  gap: 12,
  alignItems: "baseline",
};

const DASH_TEXT: React.CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.7)",
  textWrap: "pretty",
};

const TRIAL_STATS = [
  { v: "+65%", d: "better understanding of the plan and side effects" },
  { v: "−53%", d: "fewer calls to the office" },
  { v: "−41%", d: "fewer readmissions" },
  { v: "+22%", d: "higher patient satisfaction" },
];

function dash(color: string) {
  return {
    width: 9,
    height: 1.5,
    borderRadius: 1,
    background: color,
    transform: "translateY(-4px)",
  } as React.CSSProperties;
}

function pad(i: number) {
  return String(i + 1).padStart(2, "0");
}

export function OrthopedicsSegments({ name }: { name: string }) {
  const [seg, setSeg] = useState(0);
  const s = ORTHO_SEGMENTS[seg];

  const pov = [
    {
      kicker: "For the patient",
      t: s.povPat.t,
      label: "#A8412F",
      dot: "#E3735C",
      items: s.povPat.items,
    },
    {
      kicker: "For your team",
      t: s.povTeam.t,
      label: "#2D5A87",
      dot: "#2D5A87",
      items: s.povTeam.items,
    },
    {
      kicker: "For the practice",
      t: s.pov3.t,
      label: "#5B9BEA",
      dot: "#5B9BEA",
      items: s.pov3.items,
    },
  ];

  return (
    <>
      {/* ------------------------------------------------ segment tab bar -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 52px" }}>
        <Reveal
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid rgba(15,29,46,.14)",
            borderBottom: "1px solid rgba(15,29,46,.14)",
            padding: "22px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 34,
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            {ORTHO_SEGMENTS.map((seg2, i) => (
              <button
                key={seg2.label}
                onClick={() => setSeg(i)}
                aria-pressed={i === seg}
                style={{
                  position: "relative",
                  fontFamily: "Lato,sans-serif",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: "0 0 9px",
                  fontWeight: 900,
                  fontSize: "clamp(18px,1.9vw,22px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  transition: "color .2s",
                  color: i === seg ? "#0F1D2E" : "rgba(15,29,46,.42)",
                }}
              >
                {seg2.label}
                {i === seg ? (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 2,
                      background: "#E3735C",
                    }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <div
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.66)",
              maxWidth: 660,
              textWrap: "pretty",
            }}
          >
            {s.line}
          </div>
        </Reveal>
      </div>

      {/* ------------------------------- what an orbit is / three audiences -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 40 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ ...H2_LIGHT, maxWidth: 520 }}>
              {s.headLead} <em style={SERIF_600}>{s.headEm}</em>.
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
              {s.intro}
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
              Built to each surgeon&apos;s protocol before launch. Nothing added
              to your team&apos;s day.
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
              src={VALUE_SRC[seg]}
              alt=""
              placeholder="[Placeholder: orthopedic surgeon or therapist with a patient, vertical crop]"
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
          <div
            style={{ display: "flex", flexDirection: "column", minWidth: 0 }}
          >
            {pov.map((p) => (
              <div key={p.kicker} data-povrow="" style={POV_ROW}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  <div style={{ ...POV_KICKER, color: p.label }}>
                    {p.kicker}
                  </div>
                  <div style={POV_TITLE}>{p.t}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                    paddingTop: 2,
                  }}
                >
                  {p.items.map((it) => (
                    <div key={it} style={DASH_GRID}>
                      <span style={dash(p.dot)} />
                      <div style={DASH_TEXT}>{it}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Three ledger rows: dash list, stepped sequence, dash list. */}
        <Reveal
          style={{ display: "flex", flexDirection: "column", marginTop: 14 }}
        >
          <div data-povrow="" style={POV_ROW}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ ...POV_KICKER, color: "#A8412F" }}>
                How to begin
              </div>
              <div style={POV_TITLE}>Start with one, add the rest</div>
              <div style={POV_SUB}>{s.beginSub}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                paddingTop: 2,
              }}
            >
              {s.beginItems.map((it) => (
                <div key={it.t} style={DASH_GRID}>
                  <span style={dash("#E3735C")} />
                  <div style={DASH_TEXT}>
                    <span style={{ fontWeight: 600, color: "#0F1D2E" }}>
                      {it.t}
                    </span>{" "}
                    {it.d}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-povrow="" style={POV_ROW}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ ...POV_KICKER, color: EVOLVE_ROW.label }}>
                {EVOLVE_ROW.kicker}
              </div>
              <div style={POV_TITLE}>{EVOLVE_ROW.t}</div>
              <div style={POV_SUB}>{EVOLVE_ROW.sub}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingTop: 2,
              }}
            >
              {EVOLVE_ROW.items.map((it) => (
                <div
                  key={it.v}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto minmax(0,1fr)",
                    gap: 18,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      alignSelf: "stretch",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: `1px solid ${it.cBorder}`,
                        background: it.cBg,
                        fontFamily: "Lato,sans-serif",
                        fontWeight: 700,
                        fontSize: 12.5,
                        color: it.cFg,
                        flexShrink: 0,
                      }}
                    >
                      {it.v}
                    </span>
                    {it.line ? (
                      <span
                        style={{
                          flex: 1,
                          width: 1,
                          background: `linear-gradient(${it.cLine},rgba(79,179,191,.12))`,
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      paddingBottom: 22,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Lato,sans-serif",
                          fontWeight: 700,
                          fontSize: 17,
                          letterSpacing: "-0.01em",
                          color: "#0F1D2E",
                        }}
                      >
                        {it.t}
                      </span>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing: ".11em",
                          textTransform: "uppercase",
                          color: it.cFg,
                        }}
                      >
                        {it.tag}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "rgba(15,29,46,.7)",
                        textWrap: "pretty",
                      }}
                    >
                      {it.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-povrow="" style={POV_ROW}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ ...POV_KICKER, color: DEPLOY_ROW.label }}>
                {DEPLOY_ROW.kicker}
              </div>
              <div style={POV_TITLE}>{DEPLOY_ROW.t}</div>
              <div style={POV_SUB}>{DEPLOY_ROW.sub}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                paddingTop: 2,
              }}
            >
              {DEPLOY_ROW.items.map((it) => (
                <div key={it.t} style={DASH_GRID}>
                  <span style={dash(DEPLOY_ROW.dot)} />
                  <div style={DASH_TEXT}>
                    <span style={{ fontWeight: 600, color: "#0F1D2E" }}>
                      {it.t}
                    </span>{" "}
                    {it.d}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(15,29,46,.14)" }} />
        </Reveal>
      </div>

      {/* -------------------------------------------- the understanding gap -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#5B9BEA" }}>
                The understanding gap
              </div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                {s.gapLead} <em style={SERIF_500_BLUE}>{s.gapEm}</em>.
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
              {s.gapIntro}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #2D5A87",
              paddingTop: 26,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: "#5B9BEA",
              }}
            >
              What the gap costs
            </div>
            <div
              style={{
                fontSize: 16.5,
                lineHeight: 1.6,
                color: "#B9C8D8",
                maxWidth: 900,
                textWrap: "pretty",
              }}
            >
              {s.gapBridge}
            </div>
          </div>

          <div
            data-stat5=""
            data-grid="4-min0"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: 32,
              alignItems: "stretch",
              marginTop: -14,
            }}
          >
            {s.window.map((w) => (
              <div
                key={w.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: "2px solid #5B9BEA",
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    /* legacy: w.hero ? larger : default */
                    fontSize: w.hero
                      ? "clamp(34px,3.8vw,50px)"
                      : "clamp(30px,3.2vw,42px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  {w.n}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".11em",
                    textTransform: "uppercase",
                    color: "#5B9BEA",
                    lineHeight: 1.35,
                  }}
                >
                  {w.t}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "#B9C8D8",
                    textWrap: "pretty",
                  }}
                >
                  {w.d}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---------------------------------------------------- measurable ROI -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#B0A99E" }}>Measurable ROI</div>
            <h2 style={H2_LIGHT}>
              How an orbit <em style={SERIF_600}>provides value</em>.
            </h2>
          </div>
          <p
            style={{
              fontSize: "clamp(16px,1.4vw,19px)",
              lineHeight: 1.5,
              color: "#122536",
              margin: 0,
              maxWidth: 540,
              justifySelf: "end",
              textWrap: "pretty",
            }}
          >
            Every orbit is built based on your target clinical and financial
            outcomes including revenue to protect, costs to lower, opportunities
            to expand and staff resources to support.
          </p>
        </Reveal>

        <Reveal style={{ borderTop: "1px solid rgba(15,29,46,.14)" }}>
          {s.measures.map((m, i) => (
            <div
              key={m.t}
              data-ledger=""
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
                gap: "24px 56px",
                alignItems: "baseline",
                padding: "22px 0",
                borderBottom: "1px solid rgba(15,29,46,.14)",
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#2D5A87",
                    flexShrink: 0,
                    minWidth: 24,
                  }}
                >
                  {pad(i)}
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(19px,2vw,23px)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {m.t}
                </div>
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.68)",
                  textWrap: "pretty",
                }}
              >
                {m.d}
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ------------------------------------------------- journeys supported -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}>
        <Reveal data-pad="64" style={NAVY_PANEL}>
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                Orthopedic care journeys{" "}
                <em style={SERIF_500_BLUE}>currently supported</em>.
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
              {s.libIntro}
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
            {s.catalog.map((c, i) => (
              <div
                key={c.t}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "baseline",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(45,90,135,.55)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#5B9BEA",
                    minWidth: 24,
                  }}
                >
                  {pad(i)}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "#FFFFFF",
                    }}
                  >
                    {c.t}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#8FA5BC",
                      textWrap: "pretty",
                    }}
                  >
                    {c.v}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </div>

      {/* --------------------------------------------------- clinical evidence -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#B0A99E" }}>
              Clinical evidence
            </div>
            <h2 style={H2_LIGHT}>
              The trial <em style={SERIF_600}>behind the platform</em>.
            </h2>
          </div>
          <p
            style={{
              fontSize: "clamp(16px,1.4vw,19px)",
              lineHeight: 1.5,
              color: "#122536",
              margin: 0,
              maxWidth: 540,
              justifySelf: "end",
              textWrap: "pretty",
            }}
          >
            The platform&apos;s controlled trial was run in surgical oncology,
            not orthopedics. We show it as measured and let you judge the
            transfer.
          </p>
        </Reveal>

        <Reveal
          data-study=""
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.05fr) minmax(0,.95fr)",
            gap: 56,
            alignItems: "start",
            borderTop: "1px solid rgba(15,29,46,.14)",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
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
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  borderRadius: 6,
                  padding: "6px 11px",
                }}
              >
                Controlled clinical trial
              </span>
              <span style={{ fontSize: 12.5, color: "rgba(15,29,46,.6)" }}>
                Siteman Cancer Center, Washington University School of Medicine
              </span>
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(21px,2.2vw,26px)",
                lineHeight: 1.16,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              Patients arrived better prepared, called less, and came back less
            </div>
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                textWrap: "pretty",
              }}
            >
              A controlled trial in hepatobiliary surgical oncology compared an
              orbit against usual care across the same surgical pathway an
              orthopedic episode follows: preparation, discharge instructions,
              home recovery, and the calls in between. The mechanism is
              comprehension, not oncology. Applying these percentages to an
              orthopedic population is a modeled transfer, not a measured
              orthopedic result.
            </div>
            <Link
              href="/evidence/siteman-study"
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
              Read the study results &rarr;
            </Link>
            <StudyRequest
              label="Download a summary of the study results"
              heading="Download the study summary"
              blurb="Tell us who you are and your download will be ready."
              file="/evidence-docs/CareOrbit-Siteman-Study-Report.pdf"
              downloadLabel="Download the study report"
            />
          </div>

          <div
            data-grid="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22px 32px",
            }}
          >
            {TRIAL_STATS.map((st) => (
              <div
                key={st.v}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  borderTop: "1px solid rgba(15,29,46,.14)",
                  paddingTop: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(28px,3vw,38px)",
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    color: "#0F1D2E",
                  }}
                >
                  {st.v}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    color: "rgba(15,29,46,.62)",
                    textWrap: "pretty",
                  }}
                >
                  {st.d}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          data-povrow=""
          style={{ ...POV_ROW, padding: "30px 0 0", marginTop: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ ...POV_KICKER, color: "#A8412F" }}>
              Voices from the pathway
            </div>
            <div style={POV_TITLE}>
              What it sounds like when recovery is guided
            </div>
            <div style={POV_SUB}>
              From live oncology deployments. Orthopedic orbits are built on the
              same platform.
            </div>
          </div>
          <div
            data-split=""
            data-grid="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 36,
            }}
          >
            {QUOTES.map((q) => (
              <div
                key={q.who}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 19,
                    lineHeight: 1.5,
                    color: "#2D5A87",
                    textWrap: "pretty",
                  }}
                >
                  {q.text}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    color: "rgba(15,29,46,.5)",
                  }}
                >
                  {q.who}
                </div>
              </div>
            ))}
          </div>
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
              20 minutes. <em style={SERIF_500_BLUE}>Your</em> orthopedic pain
              points, <em style={SERIF_500_BLUE}>our</em> platform.
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
              orthopedic moments are costing your team the most, and give you a
              brief look at the platform. Then we decide together whether it is
              worth a second conversation.
            </p>
            <Link
              href="/book-a-call?src=orthopedics"
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
            blurb={`Get the ${name} info sheet by email.`}
            focus="inputFocusBlue"
            resetOnEdit={false}
            pdf="/sheets/careorbit-orthopedics-2-page.pdf"
            downloadAs="CareOrbit-Orthopedics-Info-Sheet.pdf"
          />
        </Reveal>
      </div>
    </>
  );
}
