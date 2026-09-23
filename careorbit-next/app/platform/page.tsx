import Link from "next/link";
import { metadataFor } from "@/lib/seo";
import "./platform.css";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { CardCarousel } from "@/components/platform/CardCarousel";
import { FeatureTabs } from "@/components/platform/FeatureTabs";
import { QuoteCarousel } from "@/components/platform/QuoteCarousel";
import { hv } from "@/lib/hoverStyles";
import { AUDIENCES, TRIAL_STATS } from "@/lib/platform";

/* Platform. Port of v2-maven/Platform.dc.html.
 *
 * Carries the four anchors the site footer links to:
 *   #how-orbits-work  #features  #outcomes  #experiences
 * These ids are part of the public contract - do not rename them.
 *
 * Inline styles verbatim; page-scoped media queries live in platform.css.
 */
const HERO_IMAGES = [
  {
    attr: "data-hero-img1",
    src: "/images/platform-hero-1.webp",
    ph: "[Placeholder: hero image 1]",
    radius: 0,
    style: {
      top: 72,
      left: 0,
      width: "clamp(160px,17vw,330px)",
      aspectRatio: "9/10",
      borderRadius: "0 20px 20px 0",
    },
  },
  {
    attr: "data-hero-img2",
    src: "/images/platform-hero-2.webp",
    ph: "[Placeholder: hero image 2]",
    radius: 0,
    style: {
      top: 36,
      right: 0,
      width: "clamp(220px,23vw,480px)",
      aspectRatio: "5/4",
      borderRadius: "20px 0 0 20px",
    },
  },
  {
    attr: "data-hero-img3",
    src: "/images/platform-hero-3.webp",
    ph: "[Placeholder: hero image 3]",
    radius: 20,
    style: {
      bottom: 0,
      left: "clamp(24px,3vw,70px)",
      width: "clamp(220px,22vw,480px)",
      aspectRatio: "16/9",
      borderRadius: 20,
    },
  },
  {
    attr: "data-hero-img4",
    src: "/images/platform-hero-4b.webp",
    ph: "[Placeholder: hero image 4]",
    radius: 0,
    style: {
      bottom: -96,
      right: 0,
      width: "clamp(210px,22vw,460px)",
      aspectRatio: "8/7",
      borderRadius: "20px 0 0 0",
    },
  },
] as const;

export const metadata = metadataFor("/platform");

export default function PlatformPage() {
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#FAF8F4" }}>
      <SiteNav active="platform" />
      <main id="main-content">
        {/* ------------------------------------------------------- hero -- */}
        <div style={{ position: "relative", marginTop: -104, paddingTop: 104 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <div
              data-hero-glow=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "85%",
                height: "clamp(300px,36vw,520px)",
                background:
                  "radial-gradient(90% 100% at 50% 0%,rgba(91,155,234,.55) 0%,rgba(91,155,234,.26) 48%,rgba(91,155,234,0) 78%)",
                filter: "blur(28px)",
                animation: "heroSweep 36s ease-in-out infinite",
              }}
            />
          </div>

          <Reveal
            style={{
              position: "relative",
              padding: "48px 28px 72px",
              boxSizing: "border-box",
              minHeight: "clamp(500px,42vw,680px)",
            }}
          >
            <div
              data-hero-center=""
              style={{
                position: "relative",
                width: "min(760px,44vw)",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 24,
                paddingTop: 28,
                zIndex: 1,
              }}
            >
              <h1
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(34px,4vw,54px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                The patient engagement platform for{" "}
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: 0,
                    color: "#2D5A87",
                  }}
                >
                  the whole clinical journey
                </em>
                .
              </h1>
              <p
                style={{
                  fontSize: "clamp(17px,1.5vw,20px)",
                  lineHeight: 1.6,
                  color: "rgba(15,29,46,.7)",
                  margin: 0,
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                CareOrbit carries your guidance from diagnosis through recovery,
                driving better outcomes for patients, families, and care teams.
              </p>
              <Link
                href="/book-a-call?src=platform"
                className={hv("navyPill")}
                style={{
                  textDecoration: "none",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  padding: "16px 30px",
                  borderRadius: 999,
                  transition: "background .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  columnGap: 12,
                  rowGap: 6,
                  maxWidth: "100%",
                  fontSize: 13.5,
                  fontWeight: 400,
                  letterSpacing: 0,
                  lineHeight: 1.2,
                  color: "#0F1D2E",
                }}
              >
                {AUDIENCES.map((a, i) => (
                  <span key={a} style={{ display: "contents" }}>
                    <span style={{ whiteSpace: "nowrap" }}>{a}</span>
                    {i < AUDIENCES.length - 1 && <span>&bull;</span>}
                  </span>
                ))}
              </div>
            </div>

            {HERO_IMAGES.map((h) => (
              <div
                key={h.attr}
                {...{ [h.attr]: "" }}
                style={{ position: "absolute", overflow: "hidden", ...h.style }}
              >
                <Figure
                  src={h.src}
                  alt=""
                  radius={h.radius}
                  shape={h.radius === 0 ? "rect" : "rounded"}
                  placeholder={h.ph}
                  sizes="(max-width:700px) 100vw, 25vw"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
              </div>
            ))}
          </Reveal>
        </div>

        {/* --------------------------------------------- how orbits work -- */}
        <div
          id="how-orbits-work"
          data-sec=""
          style={{
            background: "#F1EDE4",
            margin: "96px 0 0",
            padding: "clamp(80px,9vw,150px) 0 clamp(56px,7vw,96px)",
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "0 clamp(28px,5vw,108px)",
              boxSizing: "border-box",
            }}
          >
            <Reveal
              data-hdr=""
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56,
                alignItems: "start",
                marginBottom: 64,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 26 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "#2D5A87",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#2D5A87",
                    }}
                  >
                    Our platform
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(32px,4vw,52px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.022em",
                    margin: 0,
                    color: "#122536",
                    textWrap: "balance",
                  }}
                >
                  Care and guidance for
                  <br />
                  <em
                    style={{
                      fontFamily: "'Source Serif 4',serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      letterSpacing: 0,
                      color: "#2D5A87",
                    }}
                  >
                    every clinical journey
                  </em>
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 44,
                  alignItems: "flex-start",
                  maxWidth: 540,
                  justifySelf: "end",
                  paddingTop: 10,
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(16px,1.5vw,20px)",
                    lineHeight: 1.5,
                    color: "#122536",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  Our platform is built around the journeys that cost systems
                  the most, pairing guided support with seamless measurement to
                  help patients achieve better outcomes.
                </p>
                <Link
                  href="/book-a-call?src=platform"
                  className={hv("linkCoral")}
                  style={{
                    textDecoration: "underline",
                    textUnderlineOffset: 10,
                    fontSize: 17,
                    fontWeight: 500,
                    color: "#2D5A87",
                  }}
                >
                  Learn more
                </Link>
              </div>
            </Reveal>

            <CardCarousel />
          </div>
        </div>

        {/* -------------------------------------------- statement banner -- */}
        <Reveal
          style={{
            position: "relative",
            marginTop: 0,
            minHeight: "clamp(520px,52vw,760px)",
            overflow: "hidden",
          }}
        >
          <Figure
            src="/images/platform-statement-2.webp"
            alt=""
            radius={0}
            shape="rect"
            placeholder="[Placeholder: full-width lifestyle photo]"
            sizes="100vw"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(100deg,rgba(15,29,46,.55) 0%,rgba(15,29,46,.3) 55%,rgba(15,29,46,.15) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 1440,
              margin: "0 auto",
              padding: "clamp(48px,6vw,88px) clamp(28px,5vw,108px)",
              boxSizing: "border-box",
              minHeight: "inherit",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 48,
              pointerEvents: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px,3.4vw,44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#FFFFFF",
                maxWidth: 640,
                textWrap: "balance",
              }}
            >
              A clinical journey doesn&apos;t happen in fragments.{" "}
              <em
                style={{
                  fontFamily: "'Source Serif 4',serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: 0,
                }}
              >
                Neither should the guidance.
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                maxWidth: 520,
              }}
            >
              <p style={statementP}>
                When guidance is scattered across portals, papers, and
                voicemails, it fails patients, drives up costs, and wastes staff
                time.
              </p>
              <p style={statementP}>
                CareOrbit brings guidance, assessment, content, and data
                together on one platform, from diagnosis through recovery.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---------------------------------------------------- features -- */}
        <div
          id="features"
          style={{
            background: "#F1EDE4",
            margin: 0,
            padding: "clamp(48px,6vw,88px) 0 0",
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "0 clamp(28px,5vw,108px)",
              boxSizing: "border-box",
            }}
          >
            <Reveal
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 16,
                marginBottom: 52,
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#6F6A62",
                }}
              >
                Platform features
              </div>
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(30px,3.6vw,48px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  maxWidth: 820,
                  textWrap: "balance",
                }}
              >
                The intersection of healthcare{" "}
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: 0,
                    color: "#E3735C",
                  }}
                >
                  and technology
                </em>
                .
              </h2>
              <p
                style={{
                  fontSize: "clamp(16px,1.4vw,19px)",
                  lineHeight: 1.65,
                  color: "rgba(15,29,46,.72)",
                  margin: 0,
                  maxWidth: 640,
                  textWrap: "pretty",
                }}
              >
                Every inch of the platform is built for action, connection, and
                better outcomes.
              </p>
            </Reveal>

            <FeatureTabs />
          </div>
        </div>

        {/* ---------------------------------------------------- outcomes -- */}
        <div
          id="outcomes"
          data-sec=""
          style={{
            maxWidth: 1440,
            margin: "96px auto 0",
            padding: "0 clamp(28px,5vw,108px)",
            boxSizing: "border-box",
          }}
        >
          <Reveal
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <h2
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 300,
                fontSize: "clamp(34px,4.2vw,58px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: 820,
                textWrap: "balance",
              }}
            >
              Empowering
              <br />
              <em
                style={{
                  fontFamily: "'Source Serif 4',serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: 0,
                  color: "#2D5A87",
                }}
              >
                leading health systems
              </em>
            </h2>
            <p
              style={{
                fontSize: "clamp(16px,1.4vw,19px)",
                lineHeight: 1.55,
                color: "#122536",
                margin: 0,
                maxWidth: 560,
                textWrap: "pretty",
              }}
            >
              In a controlled trial at Siteman Cancer Center with Washington
              University, patients carrying an orbit were compared with patients
              receiving standard education. See the measured results{" "}
              <Link
                href="/outcomes"
                className={hv("linkCoral")}
                style={{
                  color: "#1F6B73",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                here
              </Link>
              .
            </p>
          </Reveal>

          <Reveal
            data-lowrisk=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: "clamp(20px,2.5vw,40px)",
            }}
          >
            {TRIAL_STATS.map((s) => (
              <div
                key={s.l}
                style={{
                  aspectRatio: "1/1",
                  border: "clamp(8px,0.9vw,13px) solid #E7E0D4",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  padding: "11%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(38px,4.2vw,62px)",
                    lineHeight: 1,
                    color: "#122536",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: "clamp(13.5px,1.15vw,16px)",
                    lineHeight: 1.5,
                    color: "#122536",
                    textWrap: "pretty",
                  }}
                >
                  {s.d}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal
            as="div"
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.5)",
              margin: "30px 0 0",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, font: "inherit", color: "inherit" }}>
              Nine in ten patients reported the orbit helped them navigate their
              care.
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------------- experiences -- */}
        <div
          id="experiences"
          data-sec=""
          style={{ position: "relative", marginTop: 96, overflow: "hidden" }}
        >
          <Figure
            src="/images/platform-experiences.webp"
            alt=""
            radius={0}
            shape="rect"
            placeholder="[Placeholder: full-width member photo]"
            sizes="100vw"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg,rgba(15,29,46,.5) 0%,rgba(15,29,46,.25) 45%,rgba(15,29,46,.45) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 1440,
              margin: "0 auto",
              padding:
                "clamp(72px,8vw,130px) clamp(28px,5vw,108px) clamp(48px,5vw,72px)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Reveal
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 18,
                marginBottom: "clamp(56px,7vw,110px)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.85)",
                }}
              >
                CareOrbit experiences
              </div>
              <h2
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(34px,4.2vw,58px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: "#FFFFFF",
                  maxWidth: 760,
                  textWrap: "balance",
                }}
              >
                Trusted by care teams,
                <br />
                <em
                  style={{
                    fontFamily: "'Source Serif 4',serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 0,
                  }}
                >
                  carried by patients
                </em>
              </h2>
              <p
                style={{
                  fontSize: "clamp(16px,1.4vw,19px)",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,.92)",
                  margin: 0,
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                Hear from the teams choosing CareOrbit to transform care, and
                the patients carrying it.
              </p>
              <Link
                href="/outcomes"
                className={hv("linkBlush")}
                style={{
                  pointerEvents: "auto",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: 8,
                }}
              >
                Explore the outcomes
              </Link>
            </Reveal>

            <QuoteCarousel />
          </div>
        </div>

        {/* --------------------------------------------------------- CTA -- */}
        <div
          data-sec=""
          style={{
            maxWidth: 1440,
            margin: "96px auto 0",
            padding: "0 28px 104px",
            boxSizing: "border-box",
          }}
        >
          <Reveal
            data-panel=""
            style={{
              background:
                "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
              borderRadius: 32,
              padding: "clamp(44px,5vw,64px)",
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
                fontWeight: 300,
                fontSize: "clamp(30px,3.6vw,48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#FFFFFF",
                textWrap: "balance",
              }}
            >
              Experience{" "}
              <em
                style={{
                  fontFamily: "'Source Serif 4',serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: 0,
                  color: "#F2B8C6",
                }}
              >
                smarter engagement
              </em>{" "}
              today.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "#B9C8D8",
                margin: 0,
                maxWidth: 600,
                textWrap: "pretty",
              }}
            >
              20 minutes: we map your improvement goals against a proven
              blueprint and show you exactly which component, or combination,
              would target them.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              <Link
                href="/book-a-call?src=platform"
                className={hv("ctaWhite")}
                style={{
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "#FFFFFF",
                  padding: "17px 32px",
                  borderRadius: 999,
                  transition: "background .2s,color .2s,transform .2s",
                }}
              >
                Book a 20-minute intro call
              </Link>
              <Link
                href="/outcomes"
                className={hv("ghostBlush")}
                style={{
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  border: "1.5px solid rgba(255,255,255,.5)",
                  padding: "16px 32px",
                  borderRadius: 999,
                  transition: "border-color .2s,color .2s",
                }}
              >
                Explore the outcomes
              </Link>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".04em",
                color: "#7E93AB",
                marginTop: 8,
              }}
            >
              For Health Systems&nbsp;&nbsp;&bull;&nbsp;&nbsp;For Service
              Lines&nbsp;&nbsp;&bull;&nbsp;&nbsp;For
              Practices&nbsp;&nbsp;&bull;&nbsp;&nbsp;For Employers
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const statementP: React.CSSProperties = {
  fontSize: "clamp(17px,1.5vw,21px)",
  lineHeight: 1.6,
  color: "#FFFFFF",
  margin: 0,
  textWrap: "pretty",
};
