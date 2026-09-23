import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./about.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { hv } from "@/lib/hoverStyles";
import { FACTS, TEAM } from "@/lib/about";

/* About. Port of v2-maven/About.dc.html. */
const SERIF: React.CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  /* 13.5px is normal-size text, so it needs 4.5:1; the brand coral gives
   * 3.06 on paper. Same hue, darkened to 4.51. */
  color: "#B15948",
};
const WRAP: React.CSSProperties = { maxWidth: 1220, margin: "0 auto" };
const H2: React.CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.5vw,40px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
};
const LEDE: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.72)",
  margin: 0,
  textWrap: "pretty",
};

export const metadata = metadataFor("/about");

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="about" />
      <main id="main-content">
        {/* data-pad="page-top": legacy matched div[style*="padding: 76px 28px"] */}
        <div
          data-pad="page-top"
          style={{
            ...WRAP,
            padding: "76px 28px 88px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px,4.4vw,54px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: 880,
              textWrap: "balance",
            }}
          >
            Ten years building patient engagement that health focused
            organizations can <em style={SERIF}>actually run</em>.
          </h1>
          <p
            style={{
              fontSize: 17.5,
              lineHeight: 1.65,
              color: "rgba(15,29,46,.7)",
              margin: 0,
              maxWidth: 760,
              textWrap: "pretty",
            }}
          >
            CareOrbit is a Digital Patient Engagement Platform designed to
            support any patient care journey through education, understanding,
            motivation, and insight-driven improvement. We are a Total Orbit
            company, built in St. Louis, shaped by more than a decade of work
            alongside Washington University, Siteman Cancer Center, and BJC
            HealthCare.
          </p>
        </div>

        {/* ------------------------------------------------- leadership -- */}
        <div style={{ ...WRAP, padding: "0 28px 96px" }}>
          <Reveal
            data-hdr=""
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "start",
              marginBottom: 44,
            }}
          >
            <h2 style={H2}>Leadership</h2>
            <p style={LEDE}>
              Lean, senior, and hands-on with every client. The people you meet
              on the first call are the people who build your orbit.
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 20,
            }}
          >
            {TEAM.map((p) => (
              <Reveal
                key={p.slotId}
                className={hv("liftCard")}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,29,46,.07)",
                  borderRadius: 30,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition:
                    "transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s",
                }}
              >
                <Figure
                  src={p.src}
                  alt=""
                  shape="circle"
                  placeholder="Headshot"
                  sizes="110px"
                  style={{ width: 110, height: 110 }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "Lato,sans-serif",
                      fontWeight: 900,
                      fontSize: 22,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      /* 13.5px role byline on paper: 3.06:1 against a 4.5
                       * requirement. Same hue at 4.51. */
                      color: "#B15948",
                    }}
                  >
                    {p.role}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(15,29,46,.68)",
                  }}
                >
                  {p.bio}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------- how we work -- */}
        <div style={{ ...WRAP, padding: "0 28px 96px" }}>
          <Reveal
            data-hdr=""
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "start",
              marginBottom: 38,
            }}
          >
            <h2 style={H2}>
              How we <em style={SERIF}>work</em>.
            </h2>
            <p style={LEDE}>
              We have been at this for more than ten years, and we still run
              lean by choice. No layers between you and the people doing the
              work: the team that scopes your orbit builds it, launches it, and
              sits in your quarterly reviews.
            </p>
          </Reveal>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "22px 32px",
            }}
          >
            {FACTS.map((f) => (
              <div
                key={f}
                style={{
                  borderTop: "1px solid rgba(15,29,46,.14)",
                  paddingTop: 16,
                  fontSize: 15,
                  lineHeight: 1.55,
                  fontWeight: 500,
                  textWrap: "pretty",
                }}
              >
                {f}
              </div>
            ))}
          </Reveal>
        </div>

        {/* --------------------------------------------------------- CTA -- */}
        <div style={{ ...WRAP, padding: "0 28px 104px" }}>
          <Reveal
            data-pad="section"
            style={{
              background:
                "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
              borderRadius: 40,
              padding: "80px 64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px,3.4vw,42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#FFFFFF",
              }}
            >
              Put a{" "}
              <em style={{ ...SERIF, fontWeight: 500, color: "#F2B8C6" }}>
                face
              </em>{" "}
              to the platform.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "#B9C8D8",
                margin: 0,
                maxWidth: 520,
              }}
            >
              20 minutes with the people who will actually build your orbit.
            </p>
            <Link
              href="/book-a-call?src=about"
              className={hv("ctaWhite")}
              style={{
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                color: "#0F1D2E",
                background: "#FFFFFF",
                padding: "17px 32px",
                borderRadius: 999,
                marginTop: 6,
                transition: "background .2s,color .2s,transform .2s",
              }}
            >
              Book a 20-minute intro call
            </Link>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
