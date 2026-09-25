"use client";

import Link from "next/link";
import { Figure } from "@/components/media/Figure";
import { GALLERY } from "@/lib/home";
import { hv } from "@/lib/hoverStyles";

/* Mobile view of the orbit gallery, from Home.dc.html.
 *
 * display:none by default; responsive.css flips [data-gallery-carousel] to
 * block at max-width:900px, where the two desktop rows are hidden.
 *
 * The Design replaced the crossfade this used to be with a native
 * scroll-snap strip: eight cards in a row, one per screen with the next
 * peeking in, swipeable. A fader hid seven of the eight orbits behind a
 * control the visitor had to find; the strip shows there is more by
 * letting the next card intrude. The arrows are a convenience on top of
 * the swipe, scrolling by exactly one card.
 *
 * The eight slides are the same GALLERY entries the desktop rows use.
 */
export function OrbitCarousel() {
  const scrollByCard = (dir: -1 | 1) => {
    const el = document.querySelector("[data-gal-row]");
    if (el)
      el.scrollBy({ left: dir * (el.clientWidth - 28), behavior: "smooth" });
  };

  return (
    <div
      data-gallery-carousel=""
      style={{
        display: "none",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 20px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        data-gal-row=""
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          margin: "0 -20px",
          padding: "0 20px",
          scrollPadding: "0 20px",
        }}
      >
        {GALLERY.map((g) => (
          <div
            key={g.slotId}
            style={{
              position: "relative",
              flex: "0 0 calc(100% - 28px)",
              height: "clamp(460px,125vw,560px)",
              borderRadius: 20,
              overflow: "hidden",
              scrollSnapAlign: "start",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              <Figure
                src={g.src}
                alt=""
                shape="rect"
                placeholder={g.hint}
                sizes="100vw"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(15,29,46,.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: g.dot,
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "28px 22px",
                background:
                  "linear-gradient(0deg,rgba(15,29,46,.88) 0%,rgba(15,29,46,.55) 55%,rgba(15,29,46,0) 100%)",
              }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(28px,6vw,38px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                  textWrap: "balance",
                }}
              >
                {g.title}
              </div>
              <div
                style={{
                  fontSize: 14.5,
                  color: "rgba(255,255,255,.85)",
                  marginTop: 8,
                }}
              >
                {g.sub}
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  color: "#FFFFFF",
                  marginTop: 10,
                  lineHeight: 1.55,
                  textWrap: "pretty",
                }}
              >
                {g.desc}
              </div>
              <Link
                href={g.href}
                className={hv("tileLearnMore")}
                style={{
                  display: "inline-block",
                  marginTop: 18,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "rgba(255,255,255,.22)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  padding: "12px 26px",
                  borderRadius: 12,
                  transition: "background .2s,color .2s",
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 24,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,.18)",
          marginBottom: 56,
        }}
      >
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous orbit"
          style={navBtn}
        >
          &larr;
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next orbit"
          style={navBtn}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,.12)",
  color: "#FFFFFF",
  fontSize: 16,
  cursor: "pointer",
};
