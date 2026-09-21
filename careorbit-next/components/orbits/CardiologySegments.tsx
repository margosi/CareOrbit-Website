"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { hv } from "@/lib/hoverStyles";
import {
  CARD_SEGMENTS,
  DEPLOY_ROW,
  QUOTES,
  VALUE_SRC,
  type BeginItem,
} from "@/lib/cardiology";

/* Everything on the Cardiology page below the hero. Port of
 * CardiologyPage.dc.html lines 86-292 plus the segment half of renderVals().
 *
 * WHY THIS IS ONE CLIENT COMPONENT
 * Four segment tabs swap the copy of every section from the tab bar down to
 * the closing CTA (the CTA reads `nameLower`), so the whole run shares one
 * piece of state. The hero above it is static and stays on the server.
 *
 * The 01/02/... numbering on the measures and library rows is derived at
 * render time exactly as the original did:
 *   seg.measures.map((m, i) => ({...m, n: String(i+1).padStart(2, "0")}))
 */

const SERIF_600: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

const SERIF_500: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 500,
  letterSpacing: 0,
  color: "#E3735C",
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

const STAT_BIG: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(28px,3vw,38px)",
  lineHeight: 1,
  letterSpacing: "-0.035em",
  color: "#0F1D2E",
};

const STAT_LABEL: React.CSSProperties = {
  fontSize: 12.5,
  lineHeight: 1.45,
  color: "rgba(15,29,46,.62)",
  textWrap: "pretty",
};

function dash(color: string) {
  return {
    width: 9,
    height: 1.5,
    borderRadius: 1,
    background: color,
    transform: "translateY(-4px)",
  } as React.CSSProperties;
}

/** 01, 02, ... exactly as String(i + 1).padStart(2, "0") produced. */
function pad(i: number) {
  return String(i + 1).padStart(2, "0");
}

export function CardiologySegments({ name }: { name: string }) {
  const [seg, setSeg] = useState(0);
  const s = CARD_SEGMENTS[seg];

  const rows = [
    {
      kicker: "How to begin",
      t: "Start with one, add the rest",
      label: "#A8412F",
      dot: "#E3735C",
      sub: s.beginSub,
      items: s.beginItems as BeginItem[],
    },
    DEPLOY_ROW,
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
            {CARD_SEGMENTS.map((seg2, i) => (
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
              Built to your protocols before launch. Nothing added to your
              team&apos;s day.
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
              placeholder="[Placeholder: cardiology care team with a patient, vertical crop]"
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
            {s.pov.map((p) => (
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

        <Reveal
          style={{ display: "flex", flexDirection: "column", marginTop: 14 }}
        >
          {rows.map((r) => (
            <div key={r.kicker} data-povrow="" style={POV_ROW}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ ...POV_KICKER, color: r.label }}>{r.kicker}</div>
                <div style={POV_TITLE}>{r.t}</div>
                <div
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.6)",
                    textWrap: "pretty",
                    maxWidth: 330,
                  }}
                >
                  {r.sub}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  paddingTop: 2,
                }}
              >
                {r.items.map((it) => (
                  <div key={it.t} style={DASH_GRID}>
                    <span style={dash(r.dot)} />
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
          ))}
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
              <div style={{ ...EYEBROW, color: "#E3735C" }}>
                The understanding gap
              </div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                {s.gapLead} <em style={SERIF_500}>{s.gapEm}</em>.
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
                color: "#E3735C",
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
            {s.money.map((m) => (
              <div
                key={m.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: "2px solid #E3735C",
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(30px,3.2vw,42px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  {m.v}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: ".11em",
                    textTransform: "uppercase",
                    color: "#E3735C",
                    lineHeight: 1.35,
                  }}
                >
                  {m.t}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "#B9C8D8",
                    textWrap: "pretty",
                  }}
                >
                  {m.d}
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
                  {m.src}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#7E93AB",
              maxWidth: 900,
              textWrap: "pretty",
            }}
          >
            Industry rates from CMS, CDC, and published analyses, not CareOrbit
            outcomes. Rates vary substantially by program and payer mix; bring
            your own figures and we will work from those.
          </p>
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
              color: "#2D5A87",
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
            What an orbit is built and tracked against from the first patient
            forward.
          </div>
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
                Cardiology care journeys{" "}
                <em style={SERIF_500}>currently supported</em>.
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
                    color: "#E3735C",
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
              {s.studyLead} <em style={SERIF_600}>{s.studyEm}</em>.
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
            {s.studySub}
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
                  color: "#0F1D2E",
                  background: "#F2B8C6",
                  borderRadius: 6,
                  padding: "6px 11px",
                }}
              >
                Pilot with results
              </span>
              <span style={{ fontSize: 12.5, color: "rgba(15,29,46,.6)" }}>
                Pritikin Intensive Cardiac Rehabilitation
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
              Patients who opened their orbit started rehab at more than twice
              the rate
            </div>
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                textWrap: "pretty",
              }}
            >
              Over nine months at a leading Midwest health system, 187 patients
              referred to Pritikin ICR were invited to a cardiac rehab orbit. Of
              the patients who activated theirs, 52% went on to start the
              program; of those who never activated, 24% did. An observational
              pilot, not a randomized trial, since patients chose whether to
              activate.
            </div>
            <Link
              href="/evidence/pritikin-pilot"
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
              Read the pilot results &rarr;
            </Link>
            <StudyRequest
              label="Download a summary of the pilot results"
              heading="Download the pilot summary"
              file="/evidence-docs/CareOrbit-Pritikin-Pilot-Report.pdf"
              downloadLabel="Download the pilot report"
              blurb="Tell us who you are and your download will be ready."
            />
          </div>

          <div
            data-study-stats=""
            data-grid="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22px 32px",
            }}
          >
            {[
              {
                v: "52%",
                d: "of patients who activated their orbit started ICR",
              },
              {
                v: "24%",
                d: "of patients who never activated started ICR",
              },
              { v: "187", d: "patients invited to an orbit over nine months" },
              {
                v: "2,704",
                d: "ICR sessions completed across both cohorts",
              },
            ].map((st) => (
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
                <div style={STAT_BIG}>{st.v}</div>
                <div style={STAT_LABEL}>{st.d}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          data-povrow=""
          style={{
            ...POV_ROW,
            padding: "30px 0 0",
            marginTop: 34,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ ...POV_KICKER, color: "#A8412F" }}>
              Voices from the pathway
            </div>
            <div style={POV_TITLE}>
              What it sounds like when recovery is guided
            </div>
            <div
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.6)",
                textWrap: "pretty",
                maxWidth: 330,
              }}
            >
              From live oncology deployments. Cardiology orbits are built on the
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
                    color: "#B84A34",
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
              20 minutes. <em style={SERIF_500}>Your</em> {s.nameLower} pain
              points, <em style={SERIF_500}>our</em> platform.
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
              No demo script, no obligation. We get introduced, hear which{" "}
              {s.nameLower} moments are costing your team the most, and give you
              a brief look at the platform. Then we decide together whether it
              is worth a second conversation.
            </p>
            <Link
              href="/book-a-call?src=cardiology"
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
            focus="inputFocusCoralBorder"
            resetOnEdit={false}
            pdf="/sheets/careorbit-cardiology-2-page.pdf"
            downloadAs="CareOrbit-Cardiology-Info-Sheet.pdf"
          />
        </Reveal>
      </div>
    </>
  );
}
