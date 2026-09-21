"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RoiCalculator } from "@/components/orbits/RoiCalculator";
import { SourcesDisclosure } from "@/components/orbits/SourcesDisclosure";
import {
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  ModeledExposure,
  MoneyCards,
} from "@/components/orbits/ledger";
import { clampOrbitInput } from "@/lib/orbitRoi";
import { exportRoiCsv, money, printRoiSheet } from "@/lib/roiExport";
import {
  BENCHMARKS,
  CALC_FIELDS,
  EMPTY_CALC,
  MONEY,
  SOURCES,
  computeRoi,
  type CalcState,
} from "@/lib/surgicalSupport";

/* The "By the numbers" section of the Surgical Support page, plus its ROI
 * calculator and sources disclosure. Port of SurgicalSupportPage.dc.html
 * lines 266-387.
 *
 * This is the one page in the family whose percentages are MEASURED on its
 * own pathway rather than transferred, so the badge, the heading and the
 * exposure label all say so. The wording is the source's, unchanged.
 *
 * Split out from the page so the rest of it, which is entirely static,
 * stays a server component.
 */
const BLUE = "#5B9BEA";
const BOOK_HREF = "/book-a-call?src=surgical-support";

export function SurgicalSupportNumbers() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(BENCHMARKS);

  const { num, groupTotal, results } = computeRoi(calc);

  const calcTotalNote = num("volume")
    ? "Across " + num("volume").toLocaleString() + " cases a year"
    : "Enter your volume to scale the model";
  const practiceLabel = num("volume")
    ? num("volume").toLocaleString() + " cases a year"
    : "your program";

  return (
    <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 44px" }}>
      <Reveal
        data-hdr=""
        data-grid="split"
        style={{ ...HDR, marginBottom: 34 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ ...EYEBROW, color: "#B0A99E" }}>By the numbers</div>
          <h2 style={H2_LIGHT}>
            Measured in a <Em>controlled trial</Em>, not modeled.
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
              Trial results, applied to your volume
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
            Percentages are measured trial outcomes in surgical oncology. Case
            volume, rates, and unit costs are your figures.
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
            These reductions were measured against usual care in a controlled
            clinical trial at Siteman Cancer Center. Surgical support is the
            pathway the trial ran on, so the percentages here are results rather
            than projections. The dollar figures apply them to your own volume
            and costs.
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
        <MoneyCards stats={MONEY} />
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
          accent={BLUE}
          label="Annual value at your volume"
          figures={[
            {
              v: "$678K",
              d: "On 800 cases a year, at the rates shown below",
            },
            { v: "382 hrs", d: "Nursing time returned over the same year" },
          ]}
          note="Worked on 800 cases a year at a 10% readmission rate and $14,000 per readmission, six calls per patient at nine minutes each with a $45 loaded hourly staff cost, and 10% of cases cancelled or delayed for preparation gaps at $6,000 collected per case. The percentage reductions are the trial's measured outcomes. Substitute your own rates and costs and the totals move accordingly."
          buttonLabel={
            calcOpen ? "Hide the calculator" : "Run the model with your numbers"
          }
          onToggle={() => setCalcOpen((v) => !v)}
        />
      </Reveal>

      {calcOpen ? (
        <RoiCalculator
          backdropAttr
          eyebrow="ROI calculator"
          title="Put your own numbers in."
          blurb="Prefilled with 800 cases a year and the trial's measured reductions. Replace the rates and unit costs with your own; the totals update as you type."
          fields={CALC_FIELDS}
          values={calc}
          onChange={(k, raw) =>
            setCalc((st) => ({ ...st, [k]: clampOrbitInput(k, raw) }))
          }
          results={results.map((r) => ({ ...r, v: money(r.raw) }))}
          total={money(groupTotal)}
          totalNote={calcTotalNote}
          totalAccent={BLUE}
          totalClaim="This is arithmetic applying the percentages entered to your own volumes and unit costs, not a guarantee."
          footNote={`Modeled illustration for ${practiceLabel}. Arithmetic on the inputs above, not a guarantee of results. CareOrbit, careorbit.com`}
          bookHref={BOOK_HREF}
          onLoadBenchmarks={() => setCalc({ ...BENCHMARKS })}
          onClear={() => setCalc({ ...EMPTY_CALC })}
          onClose={() => setCalcOpen(false)}
          onExportCsv={() =>
            exportRoiCsv({
              docTitle: "CareOrbit surgical support ROI model",
              filename: "careorbit-surgical-support-roi.csv",
              fields: CALC_FIELDS,
              values: calc,
              results,
              total: groupTotal,
            })
          }
          onPrint={() =>
            printRoiSheet({
              docTitle: "Surgical support orbit ROI model",
              scaleLine:
                (parseFloat(calc.volume) || 0).toLocaleString() +
                " cases a year",
              footNote:
                "Modeled illustration built on arithmetic from the inputs shown. Not a guarantee of results. Readmission and call-reduction figures are the measured outcomes of the CareOrbit controlled clinical trial in surgical oncology at Siteman Cancer Center. Volumes and unit costs are supplied by the user. careorbit.com",
              fields: CALC_FIELDS,
              values: calc,
              results,
              total: groupTotal,
            })
          }
        />
      ) : null}

      <SourcesDisclosure sources={SOURCES} marginTop={20} />
    </div>
  );
}
