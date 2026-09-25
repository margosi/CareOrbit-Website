import Link from "next/link";
import type { ReactNode } from "react";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { hv } from "@/lib/hoverStyles";

/* Two-column hero shared by the four product pages.
 * Ported from EngagePage.dc.html lines 38-52; Assess/Capture/Data Insights repeat it
 * with different copy and image.
 *
 * Left: heading + blurb + two buttons. Right: full-bleed image.
 * [data-hero-grid] collapses to one column below 1020px (product.css).
 */
export function ProductHero({
  badge,
  heading,
  blurb,
  src,
  placeholder,
  bookSrc,
  sheetLabel,
}: {
  /** Optional pill above the heading (Capture / Data Insights show NEW CAPABILITY). */
  badge?: ReactNode;
  heading: ReactNode;
  blurb: string;
  src: string;
  placeholder: string;
  /** ?src= value on the Book a Call link, e.g. "engage-page". */
  bookSrc: string;
  /** Label of the secondary button that jumps to #cta. */
  sheetLabel: string;
}) {
  return (
    <Reveal
      data-hero-grid=""
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.15fr",
        alignItems: "center",
        minHeight: "clamp(480px,58vw,680px)",
        marginTop: -104,
        position: "relative",
        zIndex: 0,
      }}
    >
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          alignItems: "flex-start",
          padding: "164px 48px 88px clamp(28px,6vw,96px)",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {badge}
        <h1
          style={{
            fontFamily: "Lato,sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px,7.2vw,104px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: "clamp(17px,1.5vw,20px)",
            lineHeight: 1.6,
            color: "rgba(15,29,46,.75)",
            margin: 0,
            maxWidth: 540,
            textWrap: "pretty",
          }}
        >
          {blurb}
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link
            href={`/book-a-call?src=${bookSrc}`}
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
          <a
            href="#cta"
            className={hv("ghostCoral")}
            style={{
              textDecoration: "none",
              fontSize: 15.5,
              fontWeight: 600,
              color: "#0F1D2E",
              border: "1.5px solid rgba(15,29,46,.25)",
              padding: "15px 30px",
              borderRadius: 999,
              transition: "border-color .2s,color .2s",
            }}
          >
            {sheetLabel}
          </a>
        </div>
      </div>

      <div
        data-hero-media=""
        style={{
          position: "relative",
          alignSelf: "stretch",
          height: "100%",
          minHeight: "clamp(480px,58vw,680px)",
        }}
      >
        <Figure
          src={src}
          alt=""
          radius={0}
          shape="rect"
          placeholder={placeholder}
          sizes="(max-width:1020px) 100vw, 55vw"
          priority
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </Reveal>
  );
}
