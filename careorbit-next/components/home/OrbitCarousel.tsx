"use client";

import Link from "next/link";
import { useState } from "react";
import { Figure } from "@/components/media/Figure";
import { GALLERY } from "@/lib/home";
import { hv } from "@/lib/hoverStyles";

/* Mobile view of the orbit gallery, from Home.dc.html lines 138-164.
 *
 * display:none by default; responsive.css flips [data-gallery-carousel] to
 * block at max-width:900px, where the two desktop rows are hidden.
 *
 * The eight slides are the same GALLERY entries the desktop rows use.
 */
export function OrbitCarousel() {
  const [slide, setSlide] = useState(0);

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
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          height: 520,
        }}
      >
        {GALLERY.map((g, i) => (
          <div
            key={g.slotId}
            style={{
              position: "absolute",
              inset: 0,
              opacity: slide === i ? 1 : 0,
              transition: "opacity .6s ease",
              pointerEvents: slide === i ? "auto" : "none",
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
                padding: "30px 26px",
                background:
                  "linear-gradient(0deg,rgba(15,29,46,.82),rgba(15,29,46,0) 80%)",
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          borderTop: "1px solid rgba(255,255,255,.25)",
          marginTop: 28,
          padding: "18px 2px 72px",
        }}
      >
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          {GALLERY.map((g, i) => (
            <span
              key={g.slotId}
              onClick={() => setSlide(i)}
              title={g.title}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: slide === i ? g.dot : "rgba(255,255,255,.3)",
                display: "block",
                cursor: "pointer",
                transition: "background .3s",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setSlide((s) => (s + 7) % 8)}
            aria-label="Previous orbit"
            className={hv("carouselNav")}
            style={navBtn}
          >
            &#8592;
          </button>
          <button
            onClick={() => setSlide((s) => (s + 1) % 8)}
            aria-label="Next orbit"
            className={hv("carouselNav")}
            style={navBtn}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,.14)",
  color: "#FFFFFF",
  fontSize: 19,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background .2s",
};
