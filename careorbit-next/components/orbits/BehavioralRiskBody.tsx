"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { RoiCalculator } from "@/components/orbits/RoiCalculator";
import { hv } from "@/lib/hoverStyles";
import { exportRoiCsv, money, printRoiSheet } from "@/lib/roiExport";
import {
  AUD_COPY,
  BEGIN_ROW,
  BENCHMARKS,
  CALC_FIELDS,
  EMPTY_CALC,
  IMPACT,
  NUMBERS,
  POV,
  ROI,
  ROWS_TAIL,
  computeRoi,
  type Audience,
  type CalcKey,
  type CalcState,
  type LedgerRow,
} from "@/lib/behavioralSafety";

/* Behavioral Risk page body. Port of BehavioralSafety.dc.html lines 58-306
 * plus renderVals().
 *
 * Two pieces of state, exactly as the original:
 *   `aud`  - the employers / associations toggle, which swaps eight copy
 *            values and the first ledger row
 *   `calc` - the ROI calculator, which is REAL on this page (unlike
 *            Cardiology and Orthopedics, where the #roi-calculator CSS is
 *            inherited boilerplate with no matching element)
 *
 * The calculator's Export menu keeps both original outputs: a CSV blob
 * download and a one-page print view built by injecting a #print-only
 * element and calling window.print(). Both are unchanged, including the
 * afterprint cleanup and its 1.5s fallback timer.
 */

const SERIF_600: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

const SERIF_500_GOLD: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 500,
  letterSpacing: 0,
  color: "#E9C46A",
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

const GOLD_STAT_LABEL: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: ".11em",
  textTransform: "uppercase",
  color: "#E9C46A",
  lineHeight: 1.35,
};

const STAT_BODY: React.CSSProperties = {
  fontSize: 13.5,
  lineHeight: 1.55,
  color: "#B9C8D8",
  textWrap: "pretty",
};

const STAT_SRC: React.CSSProperties = {
  marginTop: "auto",
  paddingTop: 14,
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: ".09em",
  textTransform: "uppercase",
  color: "#7E93AB",
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

/** Renders one ledger row in whichever of the two shapes it declares. */
function LedgerRowView({ r }: { r: LedgerRow }) {
  return (
    <div data-povrow="" style={POV_ROW}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ ...POV_KICKER, color: r.label }}>{r.kicker}</div>
        <div style={POV_TITLE}>{r.t}</div>
        <div style={POV_SUB}>{r.sub}</div>
      </div>

      {"plain" in r ? (
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
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: 2,
          }}
        >
          {r.items.map((it) => (
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
      )}
    </div>
  );
}

export function BehavioralRiskBody() {
  const [aud, setAud] = useState<Audience>("employers");
  const [calcOpen, setCalcOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(BENCHMARKS);

  const copy = AUD_COPY[aud];
  const rows: LedgerRow[] = [BEGIN_ROW[aud], ...ROWS_TAIL];
  const { num, groupTotal, results } = computeRoi(calc);

  /* Legacy setCalc: clamps negatives to 0. Unlike the Cardiology model
   * there is no percentage ceiling here. */
  const onCalcChange = (k: string, raw: string) => {
    let v = raw;
    if (v !== "" && parseFloat(v) < 0) v = "0";
    setCalc((st) => ({ ...st, [k as CalcKey]: v }));
  };

  const exportExcel = () => {
    exportRoiCsv({
      docTitle: "CareOrbit behavioral risk ROI model",
      filename: "careorbit-behavioral-safety-roi.csv",
      fields: CALC_FIELDS,
      values: calc,
      results,
      total: groupTotal,
      /* This page counts "% of wage" as a percentage field; the others test
       * for an exact "%". Preserved. */
      percentMode: "prefix",
    });
  };

  const printCalc = () => {
    printRoiSheet({
      docTitle: "Behavioral risk orbit ROI model",
      scaleLine:
        (parseFloat(calc.headcount) || 0).toLocaleString() + " field workers",
      footNote:
        "Modeled illustration built on arithmetic from the inputs shown. Not a guarantee of results. Replacement-cost ranges are published SHRM and Gallup benchmarks; turnover, absence, and claims reductions are modeled assumptions, and every rate and unit cost is supplied by the user. careorbit.com",
      fields: CALC_FIELDS,
      values: calc,
      results,
      total: groupTotal,
    });
  };

  const calcTotalNote = num("headcount")
    ? "Across " + num("headcount").toLocaleString() + " field workers a year"
    : "Enter your headcount to scale the model";
  const crewLabel = num("headcount")
    ? num("headcount").toLocaleString() + " field workers"
    : "your workforce";

  return (
    <>
      {/* -------------------------------------------------- audience tabs -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 52px" }}>
        <Reveal
          data-start=""
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0,1fr)",
            gap: "18px 32px",
            alignItems: "center",
            borderTop: "1px solid rgba(15,29,46,.14)",
            borderBottom: "1px solid rgba(15,29,46,.14)",
            padding: "22px 0",
          }}
        >
          <div style={{ display: "flex", gap: 34, alignItems: "baseline" }}>
            {(
              [
                ["employers", "For employers"],
                ["associations", "For associations"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setAud(key)}
                aria-pressed={aud === key}
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
                  color: aud === key ? "#0F1D2E" : "rgba(15,29,46,.42)",
                }}
              >
                {label}
                {aud === key ? (
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
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            {copy.audLine}
          </div>
        </Reveal>
      </div>

      {/* ------------------------------------------------- how it works -- */}
      <div
        id="how"
        style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}
      >
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 40 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ ...H2_LIGHT, maxWidth: 520 }}>
              A private support guide every worker keeps,{" "}
              <em style={SERIF_600}>long before a crisis</em>.
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
              Your resources and your language, reaching the field the way
              safety already does. Alongside the toolbox talk and the benefits
              packet, an orbit adds a consumer-grade digital mentor: short
              video, plain-language guidance, and text outreach that keeps a
              worker informed and one tap from help.
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
              No app, no account, and no supervisor in the middle. A worker
              orbit is private to the worker; leaders see aggregate reach only.
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
              src="/images/safety-toolbox-talk.png"
              alt=""
              placeholder="[Placeholder: crew toolbox talk photo, vertical crop]"
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
              One orbit, issued once, working for the worker, the crew, and the
              company at the same time.
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", minWidth: 0 }}
          >
            {POV.map((p) => (
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
            <LedgerRowView key={r.kicker} r={r} />
          ))}
          <div
            style={{
              borderTop: "1px solid rgba(15,29,46,.14)",
              paddingTop: 20,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.55)",
              maxWidth: 760,
              textWrap: "pretty",
            }}
          >
            CareOrbit is not a crisis line and does not replace emergency
            services. Orbits route workers to the crisis and clinical resources
            your organization designates. Engagement is reported in aggregate
            only, never by individual.
          </div>
        </Reveal>
      </div>

      {/* --------------------------------------------------- the exposure -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}>
        <Reveal
          data-pad="64"
          style={{
            background:
              "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
            borderRadius: 40,
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <div data-hdr="" data-grid="split" style={HDR}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#E9C46A" }}>The exposure</div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                The risk is <em style={SERIF_500_GOLD}>already measured</em>.
                The response is not.
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
              Published federal data on the trades, not CareOrbit projections.
              Every figure is an industry rate describing the exposure an orbit
              is built to reach, and every one of them turns on whether a worker
              knew what to watch for and had a private way to ask for help.
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
                color: "#E9C46A",
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
              None of this is decided in a benefits meeting. It is decided on
              the drive home, in the truck, and on the shifts between toolbox
              talks, where the company has almost no presence.
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
            {NUMBERS.map((n) => (
              <div
                key={n.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: "2px solid #E9C46A",
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(30px,3.2vw,44px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  {n.v}
                </div>
                <div style={GOLD_STAT_LABEL}>{n.t}</div>
                <div style={STAT_BODY}>{n.d}</div>
                <div style={STAT_SRC}>{n.src}</div>
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
            CareOrbit has no published behavioral risk outcome data.
            [Placeholder: program engagement and outcome figures once a first
            employer deployment is measured.] Rates vary by trade, region, and
            employer; bring your own figures and we will work from those.
          </p>
        </Reveal>
      </div>

      {/* ----------------------------------------------- the financial case -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#B0A99E" }}>{copy.finKicker}</div>
            <h2 style={H2_LIGHT}>
              {copy.finHeadA} <em style={SERIF_600}>{copy.finHeadEm}</em>.
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
            {copy.finIntro}
          </p>
        </Reveal>

        <Reveal
          data-povrow=""
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,.62fr) minmax(0,1fr)",
            gap: "16px 40px",
            alignItems: "start",
            borderTop: "1px solid rgba(15,29,46,.14)",
            padding: "30px 0 34px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ ...POV_KICKER, color: "#A8412F" }}>
              Where it lands
            </div>
            <div style={POV_TITLE}>
              Six places behavioral risk shows up on the books
            </div>
            <div style={POV_SUB}>
              Published construction industry figures, not CareOrbit outcomes.
              Your own loss runs will differ.
            </div>
          </div>
          <div
            data-costgrid=""
            data-grid="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 40px",
            }}
          >
            {IMPACT.map((im) => (
              <div
                key={im.i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0,1fr)",
                  gap: 14,
                  alignItems: "baseline",
                  padding: "13px 0",
                  borderBottom: "1px solid rgba(15,29,46,.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: "#E3735C",
                  }}
                >
                  {im.i}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                      color: "#0F1D2E",
                    }}
                  >
                    {im.t}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "rgba(15,29,46,.66)",
                      textWrap: "pretty",
                    }}
                  >
                    {im.d}
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: ".09em",
                      textTransform: "uppercase",
                      color: "rgba(15,29,46,.72)",
                    }}
                  >
                    {im.src}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          style={{
            background:
              "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
            borderRadius: 40,
            padding: "56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 34,
          }}
        >
          <div
            data-three=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: 48,
            }}
          >
            {ROI.map((r) => (
              <div
                key={r.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: "2px solid #E9C46A",
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(30px,3.2vw,42px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "#FFFFFF",
                  }}
                >
                  {r.v}
                </div>
                <div style={GOLD_STAT_LABEL}>{r.t}</div>
                <div style={STAT_BODY}>{r.d}</div>
                <div style={STAT_SRC}>{r.src}</div>
              </div>
            ))}
          </div>

          <div
            data-start=""
            style={{
              borderTop: "1px solid #2D5A87",
              paddingTop: 26,
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) auto",
              gap: "24px 40px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "#B9C8D8",
                maxWidth: 620,
                textWrap: "pretty",
              }}
            >
              {copy.calcInvite}
            </div>
            <button
              onClick={() => setCalcOpen((v) => !v)}
              className={hv("navyPill")}
              style={{
                fontFamily: "Inter,sans-serif",
                alignSelf: "flex-start",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
                color: "#0F1D2E",
                background: "#FFFFFF",
                padding: "14px 26px",
                borderRadius: 999,
                marginTop: 14,
                transition: "background .2s,color .2s",
              }}
            >
              {calcOpen ? "Hide the calculator" : "Run the numbers"}
            </button>
          </div>
        </Reveal>

        {calcOpen ? (
          <RoiCalculator
            eyebrow="Run the numbers"
            title="Put your own workforce in."
            blurb="Prefilled with 500 workers and published replacement-cost benchmarks. Replace them with your own figures; the totals update as you type."
            fields={CALC_FIELDS}
            values={calc}
            onChange={onCalcChange}
            results={results}
            total={money(groupTotal)}
            totalNote={calcTotalNote}
            totalAccent="#E9C46A"
            totalClaim="This is arithmetic applying the rates you entered to your own headcount and wage, not a CareOrbit performance claim."
            footNote={`Modeled illustration for ${crewLabel}. Arithmetic on the inputs above, not a guarantee of results. CareOrbit, careorbit.com`}
            bookHref="/book-a-call?src=behavioral-safety"
            onLoadBenchmarks={() => setCalc({ ...BENCHMARKS })}
            onClear={() => setCalc({ ...EMPTY_CALC })}
            onClose={() => setCalcOpen(false)}
            onExportCsv={exportExcel}
            onPrint={printCalc}
          />
        ) : null}

        <Reveal
          as="p"
          style={{
            margin: "24px 0 0",
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "rgba(15,29,46,.52)",
            maxWidth: 940,
            textWrap: "pretty",
          }}
        >
          Replacement-cost ranges are published HR benchmarks: SHRM and Gallup
          put full replacement at 50–200% of annual salary depending on role,
          and a conservative frontline figure is 30–50% of annual wage. Absence,
          incident, and claims values are yours; CareOrbit makes no claim about
          them. [Placeholder: engagement and retention effect of a behavioral
          risk orbit, to be measured in a first employer deployment.] Every
          dollar figure here is arithmetic on the assumptions shown, not a
          CareOrbit performance claim.
        </Reveal>
      </div>

      {/* ------------------------------------------------------------- CTA -- */}
      <div
        id="cta"
        style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 104px" }}
      >
        <Reveal
          data-two=""
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
              20 minutes. <em style={SERIF_500_GOLD}>Your</em> crews,{" "}
              <em style={SERIF_500_GOLD}>our</em> platform.
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
              {copy.ctaLine}
            </p>
            <Link
              href="/book-a-call?src=behavioral-safety"
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

          <div
            style={{
              background: "#1E3A5F",
              borderRadius: 28,
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: 19,
                color: "#FFFFFF",
              }}
            >
              What to bring
            </div>
            {copy.bring.map((b) => (
              <div key={b} style={DASH_GRID}>
                <span style={dash("#F2B8C6")} />
                <div
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "#B9C8D8",
                    textWrap: "pretty",
                  }}
                >
                  {b}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
