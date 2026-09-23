"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { hv } from "@/lib/hoverStyles";
import { EXACT_PIXELS } from "@/lib/migration";
import {
  CHAT_HINT_DEFAULT,
  CHAT_HINT_MISS,
  logQuery,
  matchOrbit,
} from "@/lib/home";

/* Home hero: five-image cross-fader, dot controls, and the chat box.
 *
 * Ported from Home.dc.html lines 48-99. Inline styles verbatim.
 *
 * The fader is the reason baseline captures pin setInterval: it advances
 * every 6s, so an unpinned screenshot is non-deterministic. Server renders
 * heroIdx = 0, matching the baseline.
 *
 * Note the frame order - the original uses hero-1,2,3,4 and then hero-7
 * (not hero-5 or hero-6, which exist in the folder but are unused).
 */
const FRAMES = [
  { src: "/images/hero-1.webp", pos: "78% 34%" },
  { src: "/images/hero-2.webp", pos: "80% 32%" },
  { src: "/images/hero-3.webp", pos: "88% 38%" },
  { src: "/images/hero-4.webp", pos: "80% 32%" },
  { src: "/images/hero-7.webp", pos: "60% 40%" },
];

const CHAT_LINKS = [
  { label: "Book a meeting", href: "/book-a-call?src=home" },
  { label: "Browse orbit solutions", href: "#orbit-grid" },
  { label: "See the outcomes", href: "/outcomes" },
];

export function HeroSection({
  heroWord = "valuable",
  ctaLabel = "Book a 20-minute intro call",
}: {
  heroWord?: string;
  ctaLabel?: string;
}) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [chatMiss, setChatMiss] = useState(false);
  const timer = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    timer.current = window.setInterval(
      () => setHeroIdx((i) => (i + 1) % 5),
      6000,
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  /* Clicking a dot stops the rotation, exactly as heroGoN did. */
  const goTo = (i: number) => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setHeroIdx(i);
  };

  const chatGo = () => {
    if (!query || query.length < 2) return;
    logQuery(query);
    const m = matchOrbit(query);
    if (m) router.push(m.href);
    else setChatMiss(true);
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: -92,
        zIndex: 0,
        padding: "0 14px",
      }}
    >
      <div
        data-hero-height=""
        style={{
          position: "relative",
          borderRadius: 30,
          overflow: "hidden",
          height: "clamp(740px,96vh,960px)",
          background: "#1E3A5F",
        }}
      >
        {FRAMES.map((f, i) => (
          <Image
            key={f.src}
            src={f.src}
            alt=""
            fill
            priority={i === 0}
            unoptimized={EXACT_PIXELS}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: f.pos,
              transition: "opacity 1.4s ease",
              opacity: heroIdx === i ? 1 : 0,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(15,29,46,.62) 0%,rgba(15,29,46,.32) 42%,rgba(15,29,46,0) 68%)",
            pointerEvents: "none",
          }}
        />

        <div
          data-pad="hero"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 26,
            padding: "0 64px 72px",
            maxWidth: 720,
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 300,
              fontSize: "clamp(48px,6.2vw,84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "#FFFFFF",
              textWrap: "balance",
            }}
          >
            Engaged patients are your most{" "}
            <em
              style={{
                fontFamily: "'Source Serif 4',serif",
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: 0,
              }}
            >
              {heroWord}
            </em>{" "}
            asset.
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,.92)",
              margin: 0,
              maxWidth: 520,
              textWrap: "pretty",
            }}
          >
            Orbits are proven to deliver against measured outcomes with the
            streamlined, easy experience today&rsquo;s patients expect. Orbits
            can be used to support any clinical journey, and can be issued from
            your existing workflow.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/book-a-call?src=home"
              className={hv("heroCta")}
              style={{
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontSize: 15.5,
                fontWeight: 600,
                color: "#0F1D2E",
                background: "#F2B8C6",
                padding: "17px 32px",
                borderRadius: 12,
                transition: "background .2s,transform .2s",
              }}
            >
              {ctaLabel}
            </Link>
            <a
              href="#orbit-explainer"
              className={hv("heroGhost")}
              style={{
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontSize: 15.5,
                fontWeight: 600,
                color: "#FFFFFF",
                padding: "17px 28px",
                borderRadius: 12,
                border: "1.5px solid rgba(255,255,255,.7)",
                transition: "background .2s",
              }}
            >
              See how it works &darr;
            </a>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {FRAMES.map((f, i) => (
              <button
                key={f.src}
                onClick={() => goTo(i)}
                aria-label={`Image ${i + 1}`}
                data-hero-dot=""
                style={{
                  width: heroIdx === i ? "28px" : "8px",
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background:
                    heroIdx === i ? "#FFFFFF" : "rgba(255,255,255,.45)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all .4s",
                }}
              />
            ))}
          </div>
        </div>

        <HeroArcs />

        <div
          data-hero-chat=""
          style={{
            position: "absolute",
            right: 40,
            bottom: 44,
            width: 264,
            background: "rgba(255,255,255,.55)",
            backdropFilter: "blur(8px)",
            borderRadius: 18,
            boxShadow: "0 24px 64px rgba(15,29,46,.3)",
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 11,
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(15,29,46,.14)",
                borderRadius: 999,
                padding: "5px 14px 5px 6px",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#0F1D2E",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 33 C18.8 29.2 14.8 25.9 14.8 21.5 c0-3 2.4-5.4 5.4-5.4 1.9 0 3.7 1 4.6 2.7 0.9-1.7 2.7-2.7 4.6-2.7 3 0 5.4 2.4 5.4 5.4 0 4.4-4 7.7-9.8 11.5z"
                    fill="#FFFFFF"
                  />
                </svg>
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0F1D2E" }}>
                Find your orbit solution
              </span>
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.5, color: "#0F1D2E" }}>
            Are you exploring how CareOrbit can improve outcomes for your
            service line?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {CHAT_LINKS.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  className={hv("chatLink")}
                  style={chatLinkStyle}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className={hv("chatLink")}
                  style={chatLinkStyle}
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              border: "1.5px solid rgba(15,29,46,.14)",
              borderRadius: 10,
              padding: "3px 3px 3px 12px",
            }}
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setChatMiss(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") chatGo();
              }}
              placeholder="Ask a question&hellip;"
              aria-label="Ask a question"
              style={{
                flex: 1,
                border: "none",
                /* outline removed at rest only. The :focus-visible rule
                 * in globals.css supplies the keyboard indicator; this
                 * input previously had none at all. */
                outline: "none",
                fontFamily: "Inter,sans-serif",
                fontSize: 12.5,
                color: "#0F1D2E",
                background: "none",
                minWidth: 0,
              }}
            />
            <button
              onClick={chatGo}
              aria-label="Go"
              className={hv("chatGo")}
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                border: "none",
                background: "#EAF1F8",
                color: "#1E3A5F",
                fontSize: 14,
                cursor: "pointer",
                flexShrink: 0,
                transition: "background .15s",
              }}
            >
              &rarr;
            </button>
          </div>

          <div
            style={{
              fontSize: 10.5,
              lineHeight: 1.45,
              color: "rgba(15,29,46,.5)",
              textAlign: "center",
            }}
          >
            {chatMiss ? CHAT_HINT_MISS : CHAT_HINT_DEFAULT}
          </div>
        </div>
      </div>
    </div>
  );
}

const chatLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  textAlign: "center",
  fontSize: 12.5,
  fontWeight: 600,
  color: "#1E3A5F",
  background: "#EAF1F8",
  borderRadius: 8,
  padding: "8px 12px",
  transition: "background .15s",
};

/* Decorative orbit traces across the hero. Paths and timings verbatim. */
function HeroArcs() {
  return (
    <svg
      viewBox="0 0 1200 300"
      style={{
        position: "absolute",
        left: -20,
        bottom: -10,
        width: "72%",
        pointerEvents: "none",
      }}
      fill="none"
    >
      <path
        d="M-60 210 C 160 130, 360 268, 620 190 S 1010 100, 1260 170"
        stroke="#4FB3BF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="240 900"
        style={{ animation: "coDash 9s linear infinite" }}
      />
      <path
        d="M-60 250 C 200 190, 420 300, 680 232 S 1040 150, 1260 215"
        stroke="#E9C46A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="200 940"
        style={{
          animation: "coDash 12s linear infinite",
          animationDelay: "-4s",
        }}
      />
      <path
        d="M-60 170 C 180 100, 400 220, 660 150 S 1020 60, 1260 130"
        stroke="#C0A5E8"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="170 970"
        style={{
          animation: "coDash 15s linear infinite",
          animationDelay: "-8s",
        }}
      />
      <circle
        cx="620"
        cy="190"
        r="4"
        fill="#E9C46A"
        style={{ animation: "coPulse 4s ease-in-out infinite" }}
      />
      <circle
        cx="400"
        cy="220"
        r="3.5"
        fill="#4FB3BF"
        style={{
          animation: "coPulse 5s ease-in-out infinite",
          animationDelay: "-2s",
        }}
      />
      <circle
        cx="820"
        cy="205"
        r="3.5"
        fill="#C0A5E8"
        style={{
          animation: "coPulse 6s ease-in-out infinite",
          animationDelay: "-3.5s",
        }}
      />
    </svg>
  );
}
