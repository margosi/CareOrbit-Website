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
import {
  BRING,
  FAQS,
  MEASURES,
  PROBLEMS,
  STEPS,
  TOOL_SERVICE,
} from "@/lib/capture";

/* Capture. Port of v2-maven/CapturePage.dc.html. */
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

export const metadata = metadataFor("/platform/capture");

export default function CapturePage() {
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
        data-screen-label="CareOrbit Capture"
        style={{ width: "100%", flex: 1 }}
      >
        <ProductHero
          badge={
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#0F3D2E",
                borderRadius: 8,
                padding: "8px 14px",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#5CE8A4",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".09em",
                  color: "#FFFFFF",
                }}
              >
                NEW CAPABILITY
              </span>
            </span>
          }
          heading={<em style={{ ...SERIF, color: "#2D5A87" }}>Capture</em>}
          blurb="A digital tool paired with a professional service: our team converts your best patient material into one organized, deployable, trackable, HIPAA compliant system, and keeps it that way."
          src="/images/capture-hero-2.webp"
          placeholder="[Placeholder: Capture hero image]"
          bookSrc="capture-page"
          sheetLabel="Get the Capture info sheet"
        />

        {/* ------------------------------------------- five-step process -- */}
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
                  Intake. Organize. Distribute. <em style={SERIF}>Measure</em>.
                </h2>
              }
            >
              From binder to delivered, in five steps, with expert guidance end
              to end. Capture is built in starting with your first orbit, and
              its use can grow from there to a department or the full system.
            </LedgerHeader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {STEPS.map((m) => (
                <div
                  key={m.n}
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

        {/* ------------------------------------------- tool and service -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="A tool and a service"
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  A digital tool, and a team that{" "}
                  <em style={SERIF}>guides the work</em>.
                </h2>
              }
            >
              Most software leaves the conversion work on your staff. Capture
              pairs the platform with CareOrbit&apos;s professional service: we
              guide the work and help facilitate it, so your material becomes a
              working system instead of a project on someone&apos;s desk.
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
            {TOOL_SERVICE.map((ts) => (
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

        {/* ------------------------------------------- the content problem -- */}
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
                  Why it matters
                </div>
                <h2 style={{ ...H2, color: "#FFFFFF" }}>
                  The content problem{" "}
                  <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                    nobody owns
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
                Every service line writes its own material. None of it is
                versioned, findable, or reachable by the patient who needs it at
                9pm on a Sunday.
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
              {PROBLEMS.map((p) => (
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
                What you can finally measure
              </div>
              <div
                data-prob4=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 32,
                }}
              >
                {MEASURES.map((ms) => (
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

        {/* ------------------------------------------------- how to begin -- */}
        <div data-sec="" style={{ ...SEC, padding: "0 clamp(28px,5vw,108px)" }}>
          <Reveal>
            <LedgerHeader
              kicker="How to begin"
              marginBottom={34}
              heading={
                <h2 style={H2}>
                  It usually starts with <em style={SERIF}>your first orbit</em>
                  .
                </h2>
              }
            >
              Capture is included with your first orbit, gathering and
              converting the material that journey needs. From there, bring one
              packet, binder, or shared drive at a time; converted content is
              reviewed and approved by your team before it reaches a patient.
            </LedgerHeader>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {BRING.map((br) => (
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
              The extended Capture subscription
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
              Starts with your first orbit. Grows with every one after.
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
              Capture is how each orbit gets its content: your material,
              converted and structured for that journey. It is part of every
              CareOrbit engagement, and it does not have to end there. An
              extended subscription keeps both the tool and the service running
              beyond the orbits you launch, so quarter after quarter more of
              what your teams rely on becomes organized, deployable, trackable,
              HIPAA compliant material, ready wherever it needs to go.
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
              Built to slot in, not bolt on. No new FTEs, white-label in your
              brand, live in a quarter, with HIPAA, SOC 2, and HITRUST
              documentation ready for review.
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
                Show us one binder. We will show you what Capture{" "}
                <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                  does with it
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
                Twenty minutes, no demo script. Start with a single journey,
                with or without an associated orbit, priced by project or
                included with an associated orbit, and scale from there.
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
                  href="/book-a-call?src=capture-page"
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
              blurb="Get the CareOrbit Capture info sheet by email."
              pdf="/sheets/careorbit-capture-2-page.pdf"
              downloadAs="CareOrbit-Capture-Info-Sheet.pdf"
            />
          </Reveal>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
