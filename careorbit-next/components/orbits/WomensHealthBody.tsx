"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { RoiCalculator } from "@/components/orbits/RoiCalculator";
import { SourcesDisclosure } from "@/components/orbits/SourcesDisclosure";
import {
  CatalogGrid,
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  LedgerRow,
  MeasureLedger,
  ModeledExposure,
  MoneyCards,
  NAVY_PANEL,
  PovRows,
  SECTION_LEAD,
  SegmentTabs,
  type AnyRow,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import { clampOrbitInput } from "@/lib/orbitRoi";
import { exportRoiCsv, money, printRoiSheet } from "@/lib/roiExport";
import {
  BENCHMARKS,
  DEPLOY_ROW,
  ECON_FIXED_ROWS,
  EMPTY_CALC,
  NAME,
  SEGMENTS,
  SOURCES,
  TRANSFER_LINE,
  VALUE_SRC,
  calcFields,
  computeRoi,
  type CalcKey,
  type CalcState,
} from "@/lib/womensHealth";

/* Women's Health page body. Port of WomensHealthPage.dc.html lines 60-353
 * plus renderVals().
 *
 * Four segment tabs drive every section, including the ROI calculator -
 * its field labels, result labels, document title and CSV filename are all
 * per-segment, which is unusual and is preserved.
 *
 * Segment 0 ("All of women's health") has no value image: the legacy
 * ternary falls through to "" and image-slot shows its placeholder
 * caption. That is the default tab, so the Phase 0 baseline shows the
 * placeholder, and Figure reproduces it.
 */
const LILAC = "#C0A5E8";
const NAME_LOWER = NAME.toLowerCase();
const BOOK_HREF = "/book-a-call?src=womens-health";

export function WomensHealthBody() {
  const [seg, setSeg] = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(BENCHMARKS);

  const s = SEGMENTS[seg];
  const fields = calcFields(s);
  const { num, groupTotal, results } = computeRoi(calc, s);

  const rows: AnyRow[] = [
    {
      kicker: "How to begin",
      t: "Start with one, add the rest",
      label: "#A8412F",
      dot: "#E3735C",
      sub: s.beginSub,
      items: s.beginItems,
    },
    {
      kicker: "A patient’s orbit can evolve as their journey needs change",
      t: "One orbit supports the full journey, adapting as needs change",
      label: "#1F6B73",
      dot: "#4FB3BF",
      seq: true,
      sub: s.seqSub,
      items: s.seqItems,
    },
    DEPLOY_ROW,
  ];

  const econRows: AnyRow[] = [
    {
      kicker: "Adherence, then billing",
      t: "The services you already ordered, actually completed",
      label: "#A8412F",
      dot: "#E3735C",
      sub: s.econ.sub,
      items: s.econ.items,
    },
    ...ECON_FIXED_ROWS,
  ];

  /* Legacy setCalc: clamp negatives to 0, and percentage fields to 100. */
  const onCalcChange = (k: string, raw: string) => {
    setCalc((st) => ({ ...st, [k as CalcKey]: clampOrbitInput(k, raw) }));
  };

  const calcTotalNote = num("volume")
    ? "Across " + num("volume").toLocaleString() + " patients a year"
    : "Enter your volume to scale the model";
  const practiceLabel = num("volume")
    ? num("volume").toLocaleString() + " patients a year"
    : "your program";

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
          <SegmentTabs
            labels={SEGMENTS.map((x) => x.label)}
            active={seg}
            onPick={setSeg}
            line={s.line}
            lineMaxWidth={640}
          />
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
              {s.headLead} <Em>{s.headEm}</Em>.
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
              Built to your practice&apos;s protocols before launch. Nothing
              added to your team&apos;s day.
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
              src={VALUE_SRC[s.key]}
              alt=""
              placeholder="[Placeholder: clinician with a patient in a women's health setting, vertical crop]"
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
          <PovRows blocks={s.pov} />
        </Reveal>

        <Reveal
          style={{ display: "flex", flexDirection: "column", marginTop: 14 }}
        >
          {rows.map((r) => (
            <LedgerRow key={r.kicker} r={r} />
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
              <div style={{ ...EYEBROW, color: LILAC }}>
                The understanding gap
              </div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                {s.gapLead}{" "}
                <Em color={LILAC} weight={500}>
                  {s.gapEm}
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
                color: LILAC,
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
                  borderTop: `2px solid ${LILAC}`,
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: w.size,
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
                    color: LILAC,
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
            <div style={{ ...EYEBROW, color: "#6F6A62" }}>Measurable ROI</div>
            <h2 style={H2_LIGHT}>
              How an orbit <Em>provides value</Em>.
            </h2>
          </div>
          <p style={SECTION_LEAD}>
            Every orbit is built based on your target clinical and financial
            outcomes including revenue to protect, costs to lower, opportunities
            to expand and staff resources to support.
          </p>
        </Reveal>

        <Reveal style={{ borderTop: "1px solid rgba(15,29,46,.14)" }}>
          <MeasureLedger measures={s.measures} />
        </Reveal>
      </div>

      {/* ------------------------------------- practice and group economics -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#6F6A62" }}>
              Practice and group economics
            </div>
            <h2 style={H2_LIGHT}>
              Adherence is the difference between care ordered and care{" "}
              <Em>actually billed</Em>.
            </h2>
          </div>
          <p style={SECTION_LEAD}>{s.econ.intro}</p>
        </Reveal>

        <Reveal style={{ display: "flex", flexDirection: "column" }}>
          {econRows.map((r) => (
            <LedgerRow key={r.kicker} r={r} />
          ))}
          <div style={{ borderTop: "1px solid rgba(15,29,46,.14)" }} />
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
                Women&rsquo;s health care journeys{" "}
                <Em color={LILAC} weight={500}>
                  currently supported
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
              {s.blurb}
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
            <CatalogGrid items={s.orbits} accent={LILAC} />
          </Reveal>
        </Reveal>
      </div>

      {/* ------------------------------------------------------ by the numbers -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 44px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#6F6A62" }}>By the numbers</div>
            <h2 style={H2_LIGHT}>
              Where adherence in women&apos;s health <Em>actually stands</Em>.
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#FFFFFF",
                border: "1px solid rgba(15,29,46,.12)",
                borderRadius: 8,
                padding: "7px 13px",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#E3735C",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#0F1D2E",
                }}
              >
                Published national figures, not CareOrbit results
              </span>
            </span>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.55,
                color: "rgba(15,29,46,.66)",
                maxWidth: 520,
              }}
            >
              {TRANSFER_LINE}
            </div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.72)",
                margin: 0,
                maxWidth: 520,
                textWrap: "pretty",
              }}
            >
              {s.calc.worked}
            </p>
          </div>
        </Reveal>

        <Reveal
          data-money=""
          data-grid="4-min0"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(0,1fr))",
            gap: 14,
          }}
        >
          <MoneyCards stats={s.money} />
        </Reveal>

        <Reveal
          data-split=""
          style={{
            background:
              "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
            borderRadius: 30,
            padding: "38px 40px",
            display: "grid",
            gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)",
            gap: 40,
            alignItems: "center",
            marginTop: 34,
          }}
        >
          <ModeledExposure
            accent={LILAC}
            figures={[
              {
                v: "$97K",
                d: "On 600 patients a year, at the rates shown below",
              },
              {
                v: "286 hrs",
                d: "Nursing time returned over the same year",
              },
            ]}
            note={s.calc.worked2}
            buttonLabel={
              calcOpen
                ? "Hide the calculator"
                : "Run the model with your numbers"
            }
            onToggle={() => setCalcOpen((v) => !v)}
          />
        </Reveal>

        {calcOpen ? (
          <RoiCalculator
            backdropAttr
            eyebrow="ROI calculator"
            title="Put your own numbers in."
            blurb="Prefilled with 600 patients a year and published national rates. Replace them with your own; the totals update as you type."
            fields={fields}
            values={calc}
            onChange={onCalcChange}
            results={results.map((r) => ({ ...r, v: money(r.raw) }))}
            total={money(groupTotal)}
            totalNote={calcTotalNote}
            totalAccent={LILAC}
            totalClaim="This is arithmetic applying the percentages entered to your own volumes and unit costs, not a guarantee."
            footNote={`Modeled illustration for ${practiceLabel}. Arithmetic on the inputs above, not a guarantee of results. CareOrbit, careorbit.com`}
            bookHref={BOOK_HREF}
            onLoadBenchmarks={() => setCalc({ ...BENCHMARKS })}
            onClear={() => setCalc({ ...EMPTY_CALC })}
            onClose={() => setCalcOpen(false)}
            onExportCsv={() =>
              exportRoiCsv({
                docTitle: "CareOrbit " + s.calc.doc,
                filename: s.calc.csv,
                fields,
                values: calc,
                results,
                total: groupTotal,
              })
            }
            onPrint={() =>
              printRoiSheet({
                docTitle: s.calc.doc,
                scaleLine:
                  (parseFloat(calc.volume) || 0).toLocaleString() +
                  " patients a year",
                footNote:
                  "Modeled illustration built on arithmetic from the inputs shown. Not a guarantee of results. Call reduction, utilization, and visit-attendance improvements are modeled assumptions for a " +
                  s.calc.transferNoun +
                  " population. Rates and unit costs are supplied by the user. careorbit.com",
                fields,
                values: calc,
                results,
                total: groupTotal,
              })
            }
          />
        ) : null}

        <SourcesDisclosure sources={SOURCES} marginTop={20} />
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
              <Em color={LILAC} weight={500}>
                Your
              </Em>{" "}
              {NAME_LOWER} pain points,{" "}
              <Em color={LILAC} weight={500}>
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
              No demo script, no obligation. We get introduced, hear which{" "}
              {NAME_LOWER} moments are costing your team the most, and give you
              a brief look at the platform. Then we decide together whether it
              is worth a second conversation.
            </p>
            <Link
              href={BOOK_HREF}
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
            blurb={`Get the ${NAME} info sheet by email.`}
            focus="inputFocusLilac"
            resetOnEdit={false}
            pdf="/sheets/careorbit-womens-health-2-page.pdf"
            downloadAs="CareOrbit-Womens-Health-Info-Sheet.pdf"
          />
        </Reveal>
      </div>
    </>
  );
}
