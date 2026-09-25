"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { hv } from "@/lib/hoverStyles";
import {
  CHAT_HINT_DEFAULT,
  CHAT_HINT_MISS,
  logQuery,
  matchOrbit,
} from "@/lib/home";

/* "Find your orbit solution".
 *
 * Until the Design refresh this lived inside the hero as a translucent card
 * pinned to the bottom-right of the photo, and was hidden outright below
 * 1020px because there was no room for it there. The Design pulled it out:
 * it is now a fixed launcher in the viewport corner, collapsed by default
 * and open only on click, so it survives the scroll and works at every
 * width. Ported from v2-maven/Home.dc.html lines 302-327.
 *
 * Home-only, and rendered as a sibling of <main> rather than inside the
 * hero, matching where the Design puts it in the document.
 */

const CHAT_LINKS = [
  { label: "Book a meeting", href: "/book-a-call?src=home" },
  { label: "Browse orbit solutions", href: "#orbit-grid" },
  { label: "See the outcomes", href: "/outcomes" },
];

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  textAlign: "center",
  fontSize: 13,
  fontWeight: 600,
  color: "#1E3A5F",
  background: "#EAF1F8",
  borderRadius: 10,
  padding: "10px 12px",
  transition: "background .15s",
};

export function OrbitChat() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [miss, setMiss] = useState(false);
  const router = useRouter();

  const chatGo = () => {
    if (!query || query.length < 2) return;
    logQuery(query);
    const m = matchOrbit(query);
    if (m) router.push(m.href);
    else setMiss(true);
  };

  return (
    <div
      data-hero-chat=""
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
        maxWidth: "calc(100vw - 40px)",
      }}
    >
      {open ? (
        <div
          style={{
            width: 280,
            maxWidth: "100%",
            background: "rgba(255,255,255,.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(15,29,46,.28)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
            transformOrigin: "bottom right",
            animation: "coChatUp .35s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0F1D2E" }}>
              Find your orbit solution
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className={hv("chatClose")}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "none",
                background: "#F1EDE4",
                color: "#0F1D2E",
                fontSize: 17,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>

          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#0F1D2E" }}>
            Are you exploring how CareOrbit can improve outcomes for your
            service line?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {CHAT_LINKS.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={hv("chatLink")}
                  style={linkStyle}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className={hv("chatLink")}
                  style={linkStyle}
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
              borderRadius: 12,
              padding: "4px 4px 4px 12px",
            }}
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setMiss(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") chatGo();
              }}
              placeholder="Ask a question&hellip;"
              aria-label="Ask a question"
              style={{
                flex: 1,
                border: "none",
                /* Rest state only; globals.css supplies the
                 * :focus-visible ring. */
                outline: "none",
                fontFamily: "Inter,sans-serif",
                fontSize: 13,
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
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                background: "#EAF1F8",
                color: "#1E3A5F",
                fontSize: 15,
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
              fontSize: 11,
              lineHeight: 1.45,
              color: "#5A6B7E",
              textAlign: "center",
            }}
          >
            {miss ? CHAT_HINT_MISS : CHAT_HINT_DEFAULT}
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={hv("chatLaunch")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
          background: "rgba(255,255,255,.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 999,
          padding: "6px 18px 6px 6px",
          boxShadow: "0 10px 30px rgba(15,29,46,.18)",
          gap: 10,
          fontFamily: "Inter,sans-serif",
          transition: "transform .2s",
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#0F1D2E",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 120 122"
            width="30"
            height="30"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <circle
              cx="60"
              cy="61"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,.45)"
              strokeWidth="1.5"
            />
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "60px 61px",
                animation: "coSpin 12s linear infinite",
              }}
            >
              <circle cx="60" cy="19" r="8" fill="#FFFFFF" fillOpacity="0.5" />
            </g>
            <path
              d="M60 75 C 42 61 39 49 48 44.5 C 55 41 60 45.5 60 50 C 60 45.5 65 41 72 44.5 C 81 49 78 61 60 75 Z"
              fill="#FFFFFF"
              transform="translate(0,1.875)"
            />
          </svg>
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#1E3A5F",
            whiteSpace: "nowrap",
          }}
        >
          Find your orbit solution
        </span>
      </button>
    </div>
  );
}
