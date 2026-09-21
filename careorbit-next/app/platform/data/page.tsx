import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "../engage/product.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { LedgerHeader } from "@/components/product/Ledger";
import { ProductHero } from "@/components/product/ProductHero";
import { SheetRequestForm } from "@/components/product/SheetRequestForm";
import { hv } from "@/lib/hoverStyles";
import { AI, FAQS, INDEX, INSIGHTS, OWNERSHIP, STEPS } from "@/lib/data";

/* Data. Port of v2-maven/DataPage.dc.html.
 *
 * Structurally identical to Capture (same section order, same ledger and
 * card patterns); only the copy, colours and data differ. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};
const H2: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.6vw,48px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
  textWrap: "balance",
};
const SEC: React.CSSProperties = {
  maxWidth: 1440,
  margin: "96px auto 0",
  boxSizing: "border-box",
};
const ROW: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: ".62fr 1fr",
  gap: 44,
  borderTop: "1px solid rgba(15,29,46,.14)",
};

export const metadata = metadataFor("/platform/data");

export default function DataPage() {
  return (
    <div
      style={{
        fontFamily: "Inter,sans-serif",
        background: "#FAF8F4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteNav active="orbits" />

      <div
        data-screen-label="CareOrbit Data"
        style={{ width: "100%", flex: 1 }}
      >
        <ProductHero
          heading={<em style={{ ...SERIF, color: "#2D5A87" }}>Data</em>}
          blurb="Every action a patient takes, and every one they do not, becomes an engagement signal your teams can act on. Data begins with your first orbit, and you own your own data."
          src="/images/data-hero-1.png"
          placeholder="[Placeholder: Data hero image]"
          bookSrc="data-page"
          sheetLabel="Get the Data info sheet"
        />

        {/* --------------------------------------- track / index / align -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
          <Reveal
            data-panel=""
            style={{
              background: "#F1EDE4",
              borderRadius: 32,
              padding: "clamp(48px,6vw,88px) clamp(28px,5vw,80px)",
              boxSizing: "border-box",
            }}
          >
            <LedgerHeader
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  Track. Index. Align. <em style={SERIF}>Optimize</em>.
                </h2>
              }
            >
              From the first patient in your first orbit, CareOrbit turns
              actions and inactions into an engagement index, aligns it with the
              outcomes you care about, and keeps optimizing each patient&apos;s
              experience.
            </LedgerHeader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {STEPS.map((m) => (
                <div
                  key={m.kicker}
                  data-row=""
                  style={{ ...ROW, padding: "30px 0 34px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        letterSpacing: ".14em",
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
                        lineHeight: 1.16,
                        letterSpacing: "-0.02em",
                        textWrap: "balance",
                      }}
                    >
                      {m.t}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {m.items.map((it) => (
                      <div
                        key={it}
                        style={{
                          display: "flex",
                          gap: 14,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            width: 9,
                            height: 1.5,
                            background: m.dot,
                            display: "inline-block",
                            flexShrink: 0,
                            marginTop: 12,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 17,
                            lineHeight: 1.65,
                            color: "rgba(15,29,46,.82)",
                          }}
                        >
                          {it}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------- data ownership -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="Yours from day one"
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  It begins with your first orbit, and{" "}
                  <em style={SERIF}>it is yours</em>.
                </h2>
              }
            >
              There is no separate data project to stand up. The moment your
              first orbit launches, engagement data starts accruing, in your
              brand, about your patients, and owned by you.
            </LedgerHeader>
          </Reveal>
          <Reveal
            data-two=""
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            {OWNERSHIP.map((ts) => (
              <div
                key={ts.kicker}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,29,46,.1)",
                  borderRadius: 28,
                  padding: 36,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: ts.label,
                  }}
                >
                  {ts.kicker}
                </div>
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(20px,2vw,24px)",
                    lineHeight: 1.16,
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                  }}
                >
                  {ts.t}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "rgba(15,29,46,.7)",
                  }}
                >
                  {ts.d}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {ts.items.map((it) => (
                    <div
                      key={it.t}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: 9,
                          height: 1.5,
                          background: ts.dot,
                          display: "inline-block",
                          flexShrink: 0,
                          marginTop: 12,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 17,
                          lineHeight: 1.65,
                          color: "rgba(15,29,46,.82)",
                        }}
                      >
                        <strong style={{ fontWeight: 600 }}>{it.t}</strong>{" "}
                        {it.d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* ------------------------------------------ engagement index -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 28px" }}>
          <Reveal
            data-panel=""
            style={{
              background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
              borderRadius: 32,
              padding: "clamp(48px,6vw,88px) clamp(28px,5vw,80px)",
              boxSizing: "border-box",
            }}
          >
            <div
              data-hdr=""
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56,
                alignItems: "start",
                marginBottom: 34,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#F2B8C6",
                  }}
                >
                  The engagement index
                </div>
                <h2 style={{ ...H2, color: "#FFFFFF" }}>
                  A number that means{" "}
                  <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                    on track
                  </em>
                  .
                </h2>
              </div>
              <p
                style={{
                  fontSize: "clamp(16px,1.4vw,19px)",
                  lineHeight: 1.65,
                  color: "#B9C8D8",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                CareOrbit tracks every action and inaction across the system and
                scores it against a predetermined ideal: the engagement pattern
                that supports an ideal care journey. The result is an index your
                teams can read at a glance.
              </p>
            </div>
            <div
              data-prob4=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: 32,
              }}
            >
              {INDEX.map((p) => (
                <div
                  key={p.i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: "2px solid #F2B8C6",
                    paddingTop: 18,
                    minHeight: 120,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "#F2B8C6",
                    }}
                  >
                    {p.i}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      lineHeight: 1.35,
                    }}
                  >
                    {p.t}
                  </div>
                  <div
                    style={{ fontSize: 15, lineHeight: 1.5, color: "#B9C8D8" }}
                  >
                    {p.d}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.18)",
                marginTop: 44,
                paddingTop: 32,
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#F2B8C6",
                  marginBottom: 22,
                }}
              >
                Always optimizing
              </div>
              <div
                data-prob4=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 32,
                }}
              >
                {AI.map((ms) => (
                  <div
                    key={ms.t}
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <div
                      style={{
                        fontFamily: "'Source Serif 4',serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 24,
                        color: "#FFFFFF",
                      }}
                    >
                      {ms.t}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#B9C8D8",
                      }}
                    >
                      {ms.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------- Data Insights -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="Data Insights"
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  Insights as <em style={SERIF}>a service</em>.
                </h2>
              }
            >
              Beyond your own reporting, Data Insights offers findings drawn
              from de-identified engagement data as a service, for health
              systems, life sciences, payers, and other industries that need to
              understand how patients actually navigate care.
            </LedgerHeader>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {INSIGHTS.map((br) => (
              <div
                key={br.n}
                data-row=""
                style={{ ...ROW, padding: "26px 0 30px" }}
              >
                <div
                  style={{ display: "flex", gap: 16, alignItems: "baseline" }}
                >
                  <span
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "#E3735C",
                    }}
                  >
                    {br.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(19px,2vw,23px)",
                      lineHeight: 1.16,
                      letterSpacing: "-0.02em",
                      textWrap: "balance",
                    }}
                  >
                    {br.t}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.78)",
                    alignSelf: "center",
                  }}
                >
                  {br.d}
                </div>
              </div>
            ))}
          </div>
          <Reveal
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(15,29,46,.1)",
              borderRadius: 28,
              padding: 36,
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#1F6B73",
              }}
            >
              Privacy, by design
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(20px,2vw,24px)",
                lineHeight: 1.16,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              De-identified, aggregated, and governed.
            </div>
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "rgba(15,29,46,.78)",
                maxWidth: 900,
                textWrap: "pretty",
              }}
            >
              Data Insights draws only on de-identified, aggregated engagement
              data. Your patient-level data stays yours, inside your governance,
              with HIPAA, SOC 2, and HITRUST documentation ready for review.
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------- common questions -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="Common questions"
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  What your team <em style={SERIF}>might ask</em>.
                </h2>
              }
            >
              No new dashboards to learn, no data project to stand up. Data
              comes with your first orbit and grows with every one after.
            </LedgerHeader>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQS.map((q) => (
              <div
                key={q.q}
                data-row=""
                style={{ ...ROW, padding: "26px 0 30px" }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(18px,1.9vw,22px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    textWrap: "balance",
                  }}
                >
                  {q.q}
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.78)",
                    alignSelf: "center",
                  }}
                >
                  {q.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------- CTA -- */}
        <div id="cta" data-sec="" style={{ ...SEC, padding: "0 28px 104px" }}>
          <Reveal
            data-split=""
            data-panel=""
            style={{
              background: "#0F1D2E url(/brand/arc-lines.svg) center/cover",
              borderRadius: 32,
              padding: "clamp(48px,6vw,80px) clamp(28px,5vw,72px)",
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 style={{ ...H2, color: "#FFFFFF" }}>
                See the engagement index on a{" "}
                <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                  real journey
                </em>
                .
              </h2>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.65,
                  color: "#B9C8D8",
                  margin: 0,
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                Twenty minutes, no demo script. Bring one care journey and the
                outcome metrics you already report on, and we will show you what
                Data adds from the first orbit.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 6,
                }}
              >
                <Link
                  href="/book-a-call?src=data-page"
                  className={hv("btnBlush")}
                  style={{
                    textDecoration: "none",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    background: "#FFFFFF",
                    padding: "16px 30px",
                    borderRadius: 999,
                    transition: "background .2s",
                  }}
                >
                  Book a 20-minute intro call
                </Link>
              </div>
            </div>
            <SheetRequestForm
              blurb="Get the CareOrbit Data info sheet by email."
              pdf="/sheets/careorbit-data-2-page.pdf"
              downloadAs="CareOrbit-Data-Info-Sheet.pdf"
            />
          </Reveal>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
