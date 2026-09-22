import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./medication-therapy.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { MedicationTherapyNumbers } from "@/components/orbits/MedicationTherapyNumbers";
import {
  CatalogGrid,
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  LedgerRow,
  MeasureLedger,
  NAVY_PANEL,
  POV_ROW,
  PovRows,
  QuotePair,
  RowHead,
  SECTION_LEAD,
  StatQuad,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import {
  CATALOG,
  MEASURES,
  NAME,
  POV,
  QUOTES,
  ROWS,
  SUB,
  TRIAL_STATS,
  WINDOW,
} from "@/lib/medicationTherapy";

/* Medication Therapy & Adherence orbit page. Port of
 * v2-maven/MedicationTherapyPage.dc.html.
 *
 * Everything except the "By the numbers" block is static, so only that
 * block (with the ROI calculator and sources disclosure) is a client
 * component. `name` and `sub` came from orbits-data.js and are build-time
 * constants here.
 */
const LILAC = "#C0A5E8";
const NAME_LOWER = NAME.toLowerCase();

export const metadata = metadataFor("/orbits/medication-therapy");

export default function MedicationTherapyPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="orbits" />
      <main id="main-content">
        <div
          data-hero-grid="1"
          data-pad="page-top"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "72px 28px 96px",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.2fr) minmax(0,.8fr)",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: LILAC,
                  flexShrink: 0,
                  display: "block",
                }}
              />
              <span style={{ ...EYEBROW, color: "#6A4E9C" }}>{NAME}</span>
            </div>

            <h1
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(34px,4.2vw,50px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Patients who understand their therapy, <Em>and stay on it</Em>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                maxWidth: 600,
                textWrap: "pretty",
              }}
            >
              {SUB}
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                marginTop: 4,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/book-a-call?src=medication-therapy"
                className={hv("ctaWhite")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: "16px 28px",
                  borderRadius: 999,
                  transition: "background .2s,transform .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
              <a
                href="#cta"
                className={hv("ghostNavy")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  padding: "16px 24px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(15,29,46,.2)",
                }}
              >
                Get the {NAME} info sheet
              </a>
            </div>
          </div>

          <div
            style={{
              minWidth: 0,
              animation: "coFloat 6s ease-in-out infinite alternate",
            }}
          >
            <Figure
              src="/images/hero-medication-therapy.webp"
              alt=""
              placeholder="Medication therapy photo"
              radius={32}
              priority
              sizes="(max-width: 1020px) 100vw, 40vw"
              style={{
                display: "block",
                width: "100%",
                height: "clamp(320px,30vw,440px)",
              }}
            />
          </div>
        </div>

        {/* ------------------------------ what an orbit is / three audiences -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 40px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 40 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ ...H2_LIGHT, maxWidth: 520 }}>
                A trusted digital guide your patients keep, from the first fill
                through <Em>long-term adherence</Em>.
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
                Your counseling in your pharmacists&apos; own words, delivered
                when each instruction actually matters. Alongside the printed
                leaflet and the counseling call, an orbit adds a consumer-grade
                digital mentor: engaging video, email, and text outreach that
                keeps patients informed, reassured, and taking the therapy as
                prescribed.
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
                Built to your regimens and protocols before launch. Nothing
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
                src="/images/value-medtherapy.webp"
                alt=""
                placeholder="[Placeholder: pharmacist counseling a patient, vertical crop]"
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
            <PovRows blocks={POV} />
          </Reveal>

          <Reveal
            style={{ display: "flex", flexDirection: "column", marginTop: 14 }}
          >
            {ROWS.map((r) => (
              <LedgerRow key={r.kicker} r={r} />
            ))}
            <div style={{ borderTop: "1px solid rgba(15,29,46,.14)" }} />
          </Reveal>
        </div>

        {/* -------------------------------------------- the understanding gap -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}
        >
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ ...EYEBROW, color: LILAC }}>
                  The understanding gap
                </div>
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  The prescription{" "}
                  <Em color={LILAC} weight={500}>
                    nobody watches
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
                A prescription is written in minutes and taken for years. Nobody
                sees the bottle after it leaves the counter, and roughly half of
                patients on long-term therapy do not take it as prescribed. That
                is the understanding gap, and the figures below are what it
                costs.
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
                None of this is decided at the counter. Each one turns on
                whether a patient understood what the medication does, handled a
                side effect without stopping, and refilled it on time.
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
              {WINDOW.map((w) => (
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
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>Measurable ROI</div>
              <h2 style={H2_LIGHT}>
                How an orbit <Em>provides value</Em>.
              </h2>
            </div>
            <p style={SECTION_LEAD}>
              Every orbit is built based on your target clinical and financial
              outcomes including revenue to protect, costs to lower,
              opportunities to expand and staff resources to support.
            </p>
          </Reveal>

          <Reveal style={{ borderTop: "1px solid rgba(15,29,46,.14)" }}>
            <MeasureLedger measures={MEASURES} />
          </Reveal>
        </div>

        {/* ------------------------------------------------- journeys supported -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 96px" }}
        >
          <Reveal data-pad="64" style={NAVY_PANEL}>
            <Reveal
              data-hdr=""
              data-grid="split"
              style={{ ...HDR, marginBottom: 34 }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  Medication therapy care journeys{" "}
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
                Support your pharmacy and infusion programs with the Medication
                Therapy Support Orbit, in patient and family versions, carrying
                the whole therapy course: what the medication does, what to
                expect, what to do when side effects hit, and when to refill.
                [Placeholder: additional orbits in this library to be supplied
                by the CareOrbit team.]
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
              <CatalogGrid items={CATALOG} accent={LILAC} />
            </Reveal>
          </Reveal>
        </div>

        {/* --------------------------------------------------- clinical evidence -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
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
                The trial <Em>behind the platform</Em>.
              </h2>
            </div>
            <p style={SECTION_LEAD}>
              The platform&apos;s controlled trial was run in surgical oncology,
              not medication therapy. We show it as measured and let you judge
              the transfer.
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
                  Siteman Cancer Center, Washington University School of
                  Medicine
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
                Patients understood the plan, called less, and came back less
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: "rgba(15,29,46,.7)",
                  textWrap: "pretty",
                }}
              >
                A controlled trial in hepatobiliary surgical oncology compared
                an orbit against usual care, including the medication
                instructions patients take home. The mechanism is comprehension,
                not oncology. Applying these percentages to a medication therapy
                population is a modeled transfer, not a measured adherence
                result.
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

            <StatQuad stats={TRIAL_STATS} />
          </Reveal>

          <Reveal
            data-povrow=""
            style={{ ...POV_ROW, padding: "30px 0 0", marginTop: 34 }}
          >
            <RowHead
              kicker="Voices from the pathway"
              label="#A8412F"
              title="What it sounds like when care is guided"
              sub="From live oncology deployments. Medication therapy orbits are built on the same platform."
            />
            <QuotePair quotes={QUOTES} color="#6A4E9C" />
          </Reveal>
        </div>

        <MedicationTherapyNumbers />

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
                {NAME_LOWER} moments are costing your team the most, and give
                you a brief look at the platform. Then we decide together
                whether it is worth a second conversation.
              </p>
              <Link
                href="/book-a-call?src=medication-therapy"
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
              pdf="/sheets/careorbit-medication-therapy-2-page.pdf"
              downloadAs="CareOrbit-Medication-Therapy-Info-Sheet.pdf"
            />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
