import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./escreening-results.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { StudyRequest } from "@/components/evidence/StudyRequest";
import {
  DashList,
  Em,
  EYEBROW,
  H2_LIGHT,
  HDR,
  POV_ROW,
  RowHead,
} from "@/components/orbits/ledger";
import { hv } from "@/lib/hoverStyles";
import {
  IMPL_FINDINGS,
  MEASURES,
  PROVENANCE,
  SCALE_STATS,
  TOPLINE,
} from "@/lib/escreeningResults";

/* VA eScreening published evidence. Port of
 * v2-maven/EScreeningResults.dc.html.
 *
 * Wholly static, so this is a server component; only the gated
 * StudyRequest and the scroll reveals ship JS.
 *
 * The source tags its sections with data-screen-label, which is Claude
 * Design authoring metadata - no stylesheet or script reads it - so it is
 * dropped here, as it was on every page migrated in Phases 4 and 5.
 *
 * CLAUDE.md: study results are gated. The topline sits on the page and the
 * full document is served by StudyRequest.
 */
const TEAL = "#4FB3BF";
const BOOK_HREF = "/book-a-call?src=escreening-results";

const PANEL: React.CSSProperties = {
  background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
  borderRadius: 40,
  padding: "clamp(40px,5vw,72px) clamp(28px,5vw,72px)",
  color: "#FFFFFF",
};

const LEAD: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.72)",
  margin: 0,
  maxWidth: 560,
  textWrap: "pretty",
};

export const metadata = metadataFor("/evidence/escreening-results");

export default function EScreeningResultsPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="outcomes" />
      <main id="main-content">
        <div
          data-hero-grid="1"
          data-pad="page-top"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "72px 28px 88px",
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
                  background: TEAL,
                  flexShrink: 0,
                  display: "block",
                }}
              />
              <span style={{ ...EYEBROW, color: "#1F7B87" }}>
                CareOrbit Assess · Published VA evidence
              </span>
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
              eScreening across the VA: the engine behind Assess,{" "}
              <Em>tested in the open literature</Em>
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.7)",
                margin: 0,
                maxWidth: 620,
                textWrap: "pretty",
              }}
            >
              The assessment approach behind CareOrbit Assess was developed at
              the VA in 2012 and studied in three peer-reviewed publications: a
              1,372-veteran comparison against paper screening, a four-clinic
              implementation study, and a veteran satisfaction study. These are
              VA program results, cited as evidence for the approach Assess is
              built on.
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
              <a
                href="#request"
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
                Download a summary of the eScreening results
              </a>
              <Link
                href="/platform/assess"
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
                See CareOrbit Assess
              </Link>
            </div>
          </div>

          <div
            style={{
              minWidth: 0,
              animation: "coFloat 6s ease-in-out infinite alternate",
            }}
          >
            <Figure
              src="/images/study-va-escreening.webp"
              alt=""
              placeholder="[Placeholder: screening in clinic photo]"
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

        {/* ------------------------------------------------------- topline -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}
        >
          <div style={PANEL}>
            <Reveal
              data-hdr=""
              data-grid="split"
              style={{ ...HDR, marginBottom: 40 }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ ...EYEBROW, color: TEAL }}>Topline results</div>
                <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                  Electronic screening against <Em>paper</Em>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 20,
                  lineHeight: 1.6,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                1,372 newly enrolling post-9/11 veterans in two cohorts: 795
                screened on paper, 577 through eScreening, otherwise following
                the same enrollment process.
              </p>
            </Reveal>

            <Reveal
              data-stat5=""
              data-grid="4-min0"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 32,
              }}
            >
              {TOPLINE.map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: `2px solid ${TEAL}`,
                    paddingTop: 16,
                    minHeight: 120,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(30px,3.2vw,42px)",
                      lineHeight: 1,
                      letterSpacing: "-0.035em",
                      color: "#FFFFFF",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: ".11em",
                      textTransform: "uppercase",
                      color: TEAL,
                    }}
                  >
                    {s.l}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "#B9C8D8",
                      textWrap: "pretty",
                    }}
                  >
                    {s.d}
                  </div>
                </div>
              ))}
            </Reveal>

            <div
              style={{
                marginTop: 36,
                paddingTop: 18,
                borderTop: "1px solid #2D5A87",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#8FA5BC",
              }}
            >
              Pittman et al., Psychological Services, 2017. VA San Diego
              Healthcare System.
            </div>
          </div>
        </div>

        {/* ----------------------------------------------- measured results -- */}
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
                The full ledger
              </div>
              <h2 style={H2_LIGHT}>
                What the published studies <Em>measured</Em>
              </h2>
            </div>
            <p style={LEAD}>
              Each measure below is drawn from the peer-reviewed publications,
              cited by author and year.
            </p>
          </Reveal>

          {MEASURES.map((m) => (
            <Reveal key={m.t} data-povrow="" style={POV_ROW}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".13em",
                    textTransform: "uppercase",
                    color: m.label,
                  }}
                >
                  {m.kicker}
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(21px,2.2vw,26px)",
                    lineHeight: 1.14,
                    letterSpacing: "-0.02em",
                    color: "#0F1D2E",
                    textWrap: "balance",
                  }}
                >
                  {m.t}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#B0A99E",
                  }}
                >
                  {m.src}
                </div>
              </div>
              <div
                data-two=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)",
                  gap: 36,
                  alignItems: "start",
                }}
              >
                <div
                  data-restat=""
                  data-grid="split"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 22,
                  }}
                >
                  {m.stats.map((sv) => (
                    <div
                      key={sv.l}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Source Serif 4',serif",
                          fontStyle: "italic",
                          fontWeight: 600,
                          fontSize: "clamp(30px,3vw,40px)",
                          lineHeight: 1,
                          color: m.dot,
                        }}
                      >
                        {sv.n}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          lineHeight: 1.45,
                          color: "rgba(15,29,46,.62)",
                          textWrap: "pretty",
                        }}
                      >
                        {sv.l}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: "rgba(15,29,46,.7)",
                    textWrap: "pretty",
                    paddingTop: 4,
                  }}
                >
                  {m.d}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------------ implementation honesty -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal data-povrow="" style={{ ...POV_ROW, padding: "30px 0 0" }}>
            <RowHead
              kicker="Honest scorekeeping"
              label="#A8412F"
              title="What the implementation study found, including the clinic that said no"
              sub="A mixed-method study followed eScreening into four diverse VA clinics for six months. We cite the result as published, not just the flattering half. Pittman et al., BMC Health Services Research, 2019."
            />
            <DashList dot="#E3735C" items={IMPL_FINDINGS} />
          </Reveal>
        </div>

        {/* ---------------------------------------------------- scale model -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal data-povrow="" style={{ ...POV_ROW, padding: "30px 0 0" }}>
            <RowHead
              kicker="What the paperwork costs at scale"
              label="#1F6B73"
              title="A modeled projection, labeled as a model"
              sub="An internal VA time-driven activity-based costing exercise projected what clinician-administered questionnaires cost across 130 VA medical centers each year. It is a projection from one site's inputs, not a measured national result."
            />
            {/* No data-grid here on purpose: the legacy global selector is
              `repeat(3, 1fr)` and this grid is `repeat(3, minmax(0,1fr))`,
              which never matched it. Only the page rule at 900px applies. */}
            <div
              data-restat=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: 22,
                paddingTop: 2,
              }}
            >
              {SCALE_STATS.map((sv) => (
                <div
                  key={sv.l}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    borderTop: "1px solid rgba(15,29,46,.14)",
                    paddingTop: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(26px,2.6vw,36px)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#0F1D2E",
                    }}
                  >
                    {sv.n}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: "rgba(15,29,46,.62)",
                      textWrap: "pretty",
                    }}
                  >
                    {sv.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- provenance -- */}
        <div
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}
        >
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 34 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: "#B0A99E" }}>Provenance</div>
              <h2 style={H2_LIGHT}>
                Where eScreening <Em>comes from</Em>
              </h2>
            </div>
            <p style={LEAD}>
              Built by clinicians inside the largest integrated health system in
              the United States, then spread facility by facility.
            </p>
          </Reveal>

          {PROVENANCE.map((r) => (
            <Reveal key={r.t} data-povrow="" style={POV_ROW}>
              <RowHead kicker={r.kicker} label={r.label} title={r.t} />
              <DashList dot={r.dot} items={r.items} />
            </Reveal>
          ))}
        </div>

        {/* --------------------------------------------------- request / CTA -- */}
        <div
          id="request"
          style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 104px" }}
        >
          <div
            data-hero-grid="1"
            style={{
              ...PANEL,
              display: "grid",
              gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ ...EYEBROW, color: TEAL }}>Go deeper</div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                Get the summary, or <Em>talk it through</Em>
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 540,
                  textWrap: "pretty",
                }}
              >
                A summary of the published eScreening evidence and how it maps
                to CareOrbit Assess. Or bring your screening requirements and we
                will walk through what Assess could collect for you.
              </p>
              <div>
                <Link
                  href={BOOK_HREF}
                  className={hv("ctaWhite")}
                  style={{
                    textDecoration: "none",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    background: "#FFFFFF",
                    padding: "16px 28px",
                    borderRadius: 999,
                    display: "inline-block",
                    transition: "background .2s,transform .2s",
                  }}
                >
                  Book a 20-minute intro call
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "#FAF8F4",
                borderRadius: 28,
                padding: 32,
                color: "#0F1D2E",
              }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  marginBottom: 6,
                }}
              >
                Download the eScreening summary
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.65)",
                  marginBottom: 14,
                }}
              >
                The published results and citations, in one document.
              </div>
              <StudyRequest
                label="Download a summary of the eScreening results"
                heading="Download the eScreening summary"
                blurb="Tell us who you are and your download will be ready."
                file="/evidence-docs/CareOrbit-VA-eScreening-Report.pdf"
                downloadLabel="Download the eScreening report"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
