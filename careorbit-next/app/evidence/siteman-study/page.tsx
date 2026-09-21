import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./siteman-study.css";
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
import { DESIGN, MEASURES, QUOTES, TOPLINE } from "@/lib/sitemanStudy";

/* The Siteman controlled clinical trial. Port of
 * v2-maven/SitemanStudy.dc.html.
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
const BOOK_HREF = "/book-a-call?src=siteman-study";

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

export const metadata = metadataFor("/evidence/siteman-study");

export default function SitemanStudyPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="outcomes" />

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
              Oncology · Controlled clinical trial
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
            The Siteman controlled clinical trial: an orbit,{" "}
            <Em>measured against usual care</Em>
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
            Pancreatic cancer surgery patients and their families at Siteman
            Cancer Center, Washington University School of Medicine, were issued
            a CareOrbit and otherwise treated identically to a matched control
            group. These are the results.
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
              Download a summary of the study results
            </a>
            <Link
              href={BOOK_HREF}
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
              Book a 20-minute intro call
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
            src="/images/case-study-siteman.png"
            alt=""
            placeholder="[Placeholder: Siteman care team photo]"
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
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 88px" }}>
        <div style={PANEL}>
          <Reveal
            data-hdr=""
            data-grid="split"
            style={{ ...HDR, marginBottom: 40 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ ...EYEBROW, color: TEAL }}>Topline results</div>
              <h2 style={{ ...H2_LIGHT, color: "#FFFFFF" }}>
                What changed when patients <Em>had an orbit</Em>
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
              Measured against a matched control group receiving identical care
              without CareOrbit.
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
            Controlled study, Siteman Cancer Center. Patient measures vs.
            matched control group.
          </div>
        </div>
      </div>

      {/* ----------------------------------------------- measured results -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#B0A99E" }}>The full ledger</div>
            <h2 style={H2_LIGHT}>
              Every measure, for patients <Em>and their families</Em>
            </h2>
          </div>
          <p style={LEAD}>
            Family members were issued orbits alongside patients, and were
            measured as rigorously. In several categories the family effect was
            the larger one.
          </p>
        </Reveal>

        {MEASURES.map((m) => (
          <Reveal key={m.t} data-povrow="" style={POV_ROW}>
            <RowHead kicker={m.kicker} label={m.label} title={m.t} />
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
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
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

      {/* -------------------------------------------------------- voices -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}>
        <Reveal data-povrow="" style={{ ...POV_ROW, padding: "30px 0 0" }}>
          <RowHead
            kicker="Voices from the study"
            label="#A8412F"
            title="How care teams responded to orbits in action"
            sub="Surgeons, nurses, and managers were interviewed throughout the study. A representative sample of their responses."
          />
          <div
            data-split=""
            data-grid="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "36px 44px",
            }}
          >
            {QUOTES.map((q) => (
              <div
                key={q.who}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  paddingTop: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 19,
                    lineHeight: 1.5,
                    color: "#0F1D2E",
                    textWrap: "pretty",
                  }}
                >
                  &ldquo;{q.t}&rdquo;
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: ".1em",
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

      {/* -------------------------------------------------- study design -- */}
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 92px" }}>
        <Reveal
          data-hdr=""
          data-grid="split"
          style={{ ...HDR, marginBottom: 34 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...EYEBROW, color: "#B0A99E" }}>Study design</div>
            <h2 style={H2_LIGHT}>
              How the study <Em>was run</Em>
            </h2>
          </div>
          <p style={LEAD}>
            A controlled design with a matched comparison group, validated
            survey instruments, and a nationally noted surgical oncologist as
            study author.
          </p>
        </Reveal>

        {DESIGN.map((r) => (
          <Reveal key={r.t} data-povrow="" style={POV_ROW}>
            <RowHead kicker={r.kicker} label={r.label} title={r.t} />
            <DashList dot={r.dot} items={r.items} />
          </Reveal>
        ))}

        <Reveal
          style={{
            borderTop: "1px solid rgba(15,29,46,.14)",
            paddingTop: 22,
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(15,29,46,.6)",
            maxWidth: 760,
            textWrap: "pretty",
          }}
        >
          The information on this page is the extent of what can be publicly
          shared prior to publication of the study. Some details of the
          validated survey instruments remain confidential until that time. Dr.
          Fields has made himself available for discussion with interested
          professional parties, including competitive healthcare systems.
          Siteman Cancer Center is currently expanding use of orbits, with
          multiple orbits now in development.
        </Reveal>
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
              Get the study results, or <Em>talk it through</Em>
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
              Download a summary of the study results, including program
              details. Or bring your own service line numbers and we will walk
              through what an orbit could change for you.
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
              Download the study summary
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.65)",
                marginBottom: 14,
              }}
            >
              Full results and program details, in one document.
            </div>
            <StudyRequest
              label="Download a summary of the study results"
              heading="Download the study summary"
              blurb="Tell us who you are and your download will be ready."
              file="/evidence-docs/CareOrbit-Siteman-Study-Report.pdf"
              downloadLabel="Download the study report"
            />
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
