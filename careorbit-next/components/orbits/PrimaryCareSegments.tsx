"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import {
  CatalogGrid,
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  LedgerRow,
  MeasureLedger,
  MoneyStats,
  NAVY_PANEL,
  POV_ROW,
  PovRows,
  QuotePair,
  RowHead,
  SECTION_LEAD,
  SegmentTabs,
  StatQuad,
  type AnyRow,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import { FIXED_ROWS, PC_SEGMENTS, QUOTES, VALUE_SRC } from "@/lib/primaryCare";

/* Everything on the Primary Care page below the hero. Port of
 * PrimaryCarePage.dc.html lines 45-262 plus renderVals().
 *
 * Same four-tab shape as Cardiology. The differences are all in the data
 * and the accent colour, except the evidence block, which is static here:
 * Primary Care shows the Siteman trial rather than a per-segment study.
 */
const TEAL = "#4FB3BF";
const NAME = "Primary Care";

const TRIAL_STATS = [
  { v: "+65%", d: "patient understanding of the plan and side effects" },
  { v: "−53%", d: "patient calls to the office" },
  { v: "−41%", d: "re-admission rate against usual care" },
  { v: "+22%", d: "patient satisfaction" },
];

export function PrimaryCareSegments() {
  const [seg, setSeg] = useState(0);
  const s = PC_SEGMENTS[seg];

  const rows: AnyRow[] = [
    {
      kicker: "How to begin",
      t: "Start with one, add the rest",
      label: "#A8412F",
      dot: "#E3735C",
      sub: s.beginSub,
      items: s.beginItems,
    },
    ...FIXED_ROWS,
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
          <SegmentTabs
            labels={PC_SEGMENTS.map((x) => x.label)}
            active={seg}
            onPick={setSeg}
            line={s.line}
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
              placeholder="[Placeholder: primary care team with a patient, vertical crop]"
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
              <div style={{ ...EYEBROW, color: TEAL }}>
                The understanding gap
              </div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                {s.gapLead} <Em weight={500}>{s.gapEm}</Em>.
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
            <MoneyStats stats={s.money} accent={TEAL} />
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
            Industry rates from CDC, CMS, and published analyses, not CareOrbit
            outcomes. Rates vary substantially by practice and payer mix; bring
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
          <MeasureLedger measures={s.measures} />
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
                Primary care journeys <Em weight={500}>an orbit can carry</Em>.
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
            <CatalogGrid items={s.catalog} accent={TEAL} />
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
            <div style={{ ...EYEBROW, color: "#6F6A62" }}>
              Clinical evidence
            </div>
            <h2 style={H2_LIGHT}>
              The trial <Em>behind the platform</Em>.
            </h2>
          </div>
          <p style={SECTION_LEAD}>
            CareOrbit&apos;s controlled clinical trial ran in surgical oncology.
            Applied to a primary care panel, its percentages are a modeled
            transfer, not a measured primary care result.
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
                Controlled clinical trial
              </span>
              <span style={{ fontSize: 12.5, color: "rgba(15,29,46,.6)" }}>
                Siteman Cancer Center and Washington University
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
              Guided patients understood more, called less, and stayed out of
              the hospital
            </div>
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                textWrap: "pretty",
              }}
            >
              Measured against usual care in hepatobiliary surgical oncology:
              65% better understanding of the plan and side effects, 53% fewer
              calls to the office, 41% fewer readmissions, and 22% higher
              satisfaction. The engagement mechanism is the same one a primary
              care orbit runs on; the percentages are a modeled transfer, not a
              measured primary care result.
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
              Read the trial results &rarr;
            </Link>
            <StudyRequest
              label="Download a summary of the trial results"
              heading="Download the trial summary"
              file="/evidence-docs/CareOrbit-Siteman-Study-Report.pdf"
              downloadLabel="Download the trial report"
              blurb="Tell us who you are and your download will be ready."
            />
          </div>

          <StatQuad stats={TRIAL_STATS} studyStats />
        </Reveal>

        <Reveal
          data-povrow=""
          style={{ ...POV_ROW, padding: "30px 0 0", marginTop: 34 }}
        >
          <RowHead
            kicker="Voices from the platform"
            label="#A8412F"
            title="What it sounds like when care is guided"
            sub="From live oncology deployments. Primary care orbits are built on the same platform."
          />
          <QuotePair quotes={QUOTES} color="#B84A34" />
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
              20 minutes. <Em weight={500}>Your</Em> primary care pain points,{" "}
              <Em weight={500}>our</Em> platform.
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
              primary care moments are costing your team the most, and give you
              a brief look at the platform. Then we decide together whether it
              is worth a second conversation.
            </p>
            <Link
              href="/book-a-call?src=primary-care"
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
            focus="inputFocusCoralBorder"
            resetOnEdit={false}
            pdf="/sheets/careorbit-primary-care-2-page.pdf"
            downloadAs="CareOrbit-Primary-Care-Info-Sheet.pdf"
          />
        </Reveal>
      </div>
    </>
  );
}
