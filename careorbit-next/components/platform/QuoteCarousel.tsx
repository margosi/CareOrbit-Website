"use client";

import { useState } from "react";
import { hv } from "@/lib/hoverStyles";
import { Arrow } from "@/components/platform/CardCarousel";
import { QUOTES, QUOTE_MAX_INDEX } from "@/lib/platform";

/* Patient and care-team quotes, Platform.dc.html lines 178-193.
 *
 * Seven quotes but the index is clamped to 0..4, and the progress bar is
 * computed as (q+1)/5. That is the original's behaviour: the last two
 * quotes are only reachable by the tail of the strip being visible, not by
 * stepping to them. Preserved exactly rather than "fixed" - changing the
 * bound would alter the progress bar and the reachable content.
 */
const SLIDE_VW = 30;
const GAP_PX = 20;
const EDGE_PX = 35;

export function QuoteCarousel() {
  const [q, setQ] = useState(0);

  const shift = `calc(${-q * SLIDE_VW}vw - ${q * GAP_PX - EDGE_PX}px)`;
  const progress = `${Math.round(((q + 1) / 5) * 100)}%`;

  return (
    <>
      <div
        style={{
          overflow: "hidden",
          margin:
            "0 calc(clamp(28px,5vw,108px) * -1 - (100vw - min(1440px,100vw)) / 2)",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP_PX,
            transform: `translateX(${shift})`,
            transition: "transform .6s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {QUOTES.map((quote, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${SLIDE_VW}vw`,
                boxSizing: "border-box",
                background: quote.bg,
                backdropFilter: "blur(10px)",
                borderRadius: 12,
                padding: "26px 26px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                minHeight: "clamp(240px,20vw,320px)",
                color: quote.ink,
              }}
            >
              <div
                style={{
                  fontFamily: "'Source Serif 4',serif",
                  fontWeight: 600,
                  fontSize: 27,
                  lineHeight: 0.5,
                  color: "#4FB3BF",
                }}
              >
                &ldquo;
              </div>
              <div
                style={{
                  fontSize: "clamp(13px,1.05vw,15.5px)",
                  lineHeight: 1.6,
                  flex: 1,
                  textWrap: "pretty",
                }}
              >
                {quote.text}
              </div>
              <div
                style={{
                  fontSize: "clamp(12px,0.95vw,14px)",
                  lineHeight: 1.5,
                }}
              >
                {quote.who}
                <br />
                {quote.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginTop: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,.35)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -0.5,
              height: 2,
              background: "#FFFFFF",
              width: progress,
              transition: "width .5s",
            }}
          />
        </div>
        <button
          onClick={() => setQ((v) => Math.max(0, v - 1))}
          aria-label="Previous"
          className={hv("navWhite")}
          style={navBtn}
        >
          <Arrow dir="left" />
        </button>
        <button
          onClick={() => setQ((v) => Math.min(QUOTE_MAX_INDEX, v + 1))}
          aria-label="Next"
          className={hv("navWhite")}
          style={navBtn}
        >
          <Arrow dir="right" />
        </button>
      </div>
    </>
  );
}

const navBtn: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "#FFFFFF",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0F1D2E",
};
