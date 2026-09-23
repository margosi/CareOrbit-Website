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
} from "@/lib/medicationTherapy";

/* The "By the numbers" section of the Medication Therapy page, plus its
 * ROI calculator and sources disclosure. Port of
 * MedicationTherapyPage.dc.html lines 266-387.
 *
 * Split out from the page so the rest of it, which is entirely static,
 * stays a server component.
 */
const LILAC = "#C0A5E8";
const BOOK_HREF = "/book-a-call?src=medication-therapy";

export function MedicationTherapyNumbers() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(BENCHMARKS);

  const { num, groupTotal, results } = computeRoi(calc);

  const calcTotalNote = num("volume")
    ? "Across " + num("volume").toLocaleString() + " patients a year"
    : "Enter your volume to scale the model";
  const practiceLabel = num("volume")
    ? num("volume").toLocaleString() + " patients a year"
    : "your program";

  return (
    <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 44px" }}>
      <Reveal
        data-hdr=""
        data-grid="split"
        style={{ ...HDR, marginBottom: 34 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ ...EYEBROW, color: "#6F6A62" }}>By the numbers</div>
          <h2 style={H2_LIGHT}>
            What better adherence is <Em>worth</Em> in a year.
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
              Modeled illustration, not observed results
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
            Call-reduction figures are measured in surgical oncology and applied
            here as a modeled transfer to a medication therapy population.
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
            Worked on 2,000 patients a year at a 10% avoidable admission rate
            and $12,000 per admission, with half of patients nonadherent. The
            call reduction is a measured trial outcome; the admission and
            adherence improvements are modeled. Every rate and unit cost is a
            figure you supply.
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
          accent={LILAC}
          figures={[
            {
              v: "$510K",
              d: "On 2,000 patients a year, at the rates shown below",
            },
            {
              v: "424 hrs",
              d: "Pharmacist and nursing time returned over the same year",
            },
          ]}
          note="Worked on 2,000 patients a year at a 10% avoidable admission rate, $12,000 per admission, three calls per patient at eight minutes each, and a $40 loaded hourly staff cost. Substitute your own figures and the totals move accordingly."
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
          blurb="Prefilled with 2,000 patients a year and published adherence rates. Replace them with your own; the totals update as you type."
          fields={CALC_FIELDS}
          values={calc}
          onChange={(k, raw) =>
            setCalc((st) => ({ ...st, [k]: clampOrbitInput(k, raw) }))
          }
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
              docTitle: "CareOrbit medication therapy ROI model",
              filename: "careorbit-medication-therapy-roi.csv",
              fields: CALC_FIELDS,
              values: calc,
              results,
              total: groupTotal,
            })
          }
          onPrint={() =>
            printRoiSheet({
              docTitle: "Medication therapy orbit ROI model",
              scaleLine:
                (parseFloat(calc.volume) || 0).toLocaleString() +
                " patients a year",
              footNote:
                "Modeled illustration built on arithmetic from the inputs shown. Not a guarantee of results. Call-reduction and understanding figures are from the CareOrbit controlled clinical trial at Siteman Cancer Center and are applied here as a modeled transfer. Admission and adherence improvements are modeled assumptions. Rates and unit costs are supplied by the user. careorbit.com",
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
