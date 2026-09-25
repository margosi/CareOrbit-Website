"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { hv } from "@/lib/hoverStyles";
import { CARD_LOOP, PLATFORM_CARDS } from "@/lib/platform";

/* The four-component carousel under "how orbits work".
 * Platform.dc.html lines 91-110.
 *
 * Nine slides ([last, ...four, ...four]) shifted by transform. The leading
 * duplicate lets index 0 step backwards without a gap.
 *
 * cPrev/cNext reproduce the original's wrap behaviour exactly, including
 * the `cSnap` flag that disables the transition for one frame so the jump
 * back to the cloned slide is invisible:
 *   - prev from 0: jump to 4 with no transition, then animate to 3
 *   - next past 3: animate to 4, then after the 650ms transition snap to 0
 *
 * Below 700px this whole thing is replaced, not resized. The Design swaps
 * in a native scroll-snap strip ([data-pc-mob]) showing one card at a time,
 * and hides the transform track and its nav. A transform carousel sized in
 * vw never reads well on a phone; a swipeable strip does, and it costs no
 * JavaScript to drag. The arrows just scrollBy one card width.
 */
/* Slide width lives in a CSS custom property, not a constant, because the
 * same value drives BOTH the card's flex-basis and the track's translateX.
 * A plain 30vw meant a 117px card on a 390px phone: the body copy was
 * clipped mid-word ("journeys that carry") and a title rendered as
 * "Captu...". A media query in responsive.css now widens the slide below
 * 1020px, and because the transform is expressed in the same variable, the
 * carousel still lands on the correct card at every width. */
const SLIDE = "var(--co-slide-w, 30vw)";
const GAP_PX = 20;
const EDGE_PX = 35;

export function CardCarousel() {
  const [c, setC] = useState(0);
  const [snap, setSnap] = useState(false);

  const shift = `calc(-1 * ${c + 1} * ${SLIDE} - ${(c + 1) * GAP_PX - EDGE_PX}px)`;

  const prev = () => {
    if (c === 0) {
      setC(4);
      setSnap(true);
      window.setTimeout(() => {
        setC(3);
        setSnap(false);
      }, 40);
    } else {
      setC((v) => v - 1);
      setSnap(false);
    }
  };

  const next = () => {
    const n = c + 1;
    setC(n);
    setSnap(false);
    if (n >= 4) {
      window.setTimeout(() => {
        setC(0);
        setSnap(true);
      }, 650);
    }
  };

  /* One card plus the 28px of the next one that peeks in. */
  const scrollByCard = (dir: -1 | 1) => {
    const el = document.querySelector("[data-pc-mob]");
    if (el)
      el.scrollBy({ left: dir * (el.clientWidth - 28), behavior: "smooth" });
  };

  return (
    <>
      <div
        data-pc-desk=""
        style={{
          overflow: "hidden",
          margin: "0 calc(50% - 50vw)",
          width: "100vw",
        }}
      >
        <div
          data-cardtrack=""
          style={{
            display: "flex",
            gap: GAP_PX,
            transform: `translateX(${shift})`,
            transition: snap
              ? "none"
              : "transform .6s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {CARD_LOOP.map((card) => (
            <Link
              key={card.slot}
              href={card.href}
              style={{
                flex: `0 0 ${SLIDE}`,
                boxSizing: "border-box",
                position: "relative",
                display: "block",
                height: "clamp(400px,33vw,500px)",
                borderRadius: 12,
                overflow: "hidden",
                textDecoration: "none",
                color: "#FFFFFF",
              }}
            >
              <Figure
                src={card.img}
                alt=""
                radius={0}
                shape="rect"
                placeholder={card.ph}
                sizes="30vw"
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
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "45%",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  background:
                    "linear-gradient(180deg,rgba(52,48,44,.42) 0%,rgba(42,39,36,.62) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: "26px 28px 28px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: card.dot,
                    boxShadow: "0 0 0 4px rgba(255,255,255,.25)",
                    display: "inline-block",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(21px,1.9vw,28px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {card.name}
                </div>
                <div
                  style={{
                    fontSize: "clamp(14px,1.15vw,16px)",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,.94)",
                    textWrap: "pretty",
                  }}
                >
                  {card.d}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "underline",
                    textUnderlineOffset: 7,
                    alignSelf: "flex-start",
                  }}
                >
                  Learn more
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Phone: a scroll-snap strip in place of the transform track. */}
      <div
        data-pc-mob=""
        style={{
          display: "none",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          margin: "0 -20px",
          padding: "0 20px",
          scrollPadding: "0 20px",
        }}
      >
        {PLATFORM_CARDS.map((card) => (
          <Link
            key={card.slot}
            href={card.href}
            style={{
              flex: "0 0 calc(100% - 28px)",
              scrollSnapAlign: "start",
              boxSizing: "border-box",
              position: "relative",
              display: "block",
              height: "clamp(460px,125vw,560px)",
              borderRadius: 16,
              overflow: "hidden",
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <Figure
              src={card.img}
              alt=""
              radius={0}
              shape="rect"
              placeholder={card.ph}
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
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                background:
                  "linear-gradient(180deg,rgba(52,48,44,.42) 0%,rgba(42,39,36,.62) 100%)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: "24px 22px 26px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: card.dot,
                  boxShadow: "0 0 0 4px rgba(255,255,255,.25)",
                  display: "inline-block",
                }}
              />
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 400,
                  fontSize: 28,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {card.name}
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,.94)",
                  textWrap: "pretty",
                }}
              >
                {card.d}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  textDecoration: "underline",
                  textUnderlineOffset: 7,
                  alignSelf: "flex-start",
                }}
              >
                Learn more
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        data-pc-mobnav=""
        style={{
          display: "none",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 24,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(15,29,46,.18)",
        }}
      >
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          style={mobNavBtn}
        >
          &larr;
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next"
          style={mobNavBtn}
        >
          &rarr;
        </button>
      </div>

      <div
        data-pc-desknav=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginTop: 44,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(15,29,46,.25)" }} />
        <button
          onClick={prev}
          aria-label="Previous"
          className={hv("navNavy")}
          style={navBtn}
        >
          <Arrow dir="left" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className={hv("navNavy")}
          style={navBtn}
        >
          <Arrow dir="right" />
        </button>
      </div>
    </>
  );
}

const mobNavBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "#2D5A87",
  color: "#FFFFFF",
  fontSize: 16,
  cursor: "pointer",
};

const navBtn: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "#2D5A87",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
};

export function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={dir === "left" ? "M17 7H1M7 1L1 7l6 6" : "M1 7h16M11 1l6 6-6 6"}
      />
    </svg>
  );
}
