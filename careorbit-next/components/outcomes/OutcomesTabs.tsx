"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TAB_LINES } from "@/lib/outcomes";

/* Outcomes / ROI tab switch, from Outcomes.dc.html lines 62-71.
 *
 * Two tabs that swap entire page sections. Tab 0 (Outcomes) is the default,
 * which is what the Phase 0 baseline captured, so the ROI sections are
 * hidden on first render in both builds.
 *
 * The sections are passed in as props so they remain server-rendered; only
 * this switch needs to be a client component.
 */
export function OutcomesTabs({
  outcomes,
  roi,
}: {
  outcomes: ReactNode;
  roi: ReactNode;
}) {
  const [tab, setTab] = useState(0);

  const btn = (i: number, label: string) => (
    <button
      onClick={() => setTab(i)}
      style={{
        position: "relative",
        fontFamily: "Lato,sans-serif",
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: "0 0 9px",
        fontWeight: 900,
        fontSize: "clamp(18px,1.9vw,22px)",
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
        transition: "color .2s",
        color: tab === i ? "#0F1D2E" : "rgba(15,29,46,.42)",
      }}
    >
      {label}
      {tab === i && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            background: "#E3735C",
          }}
        />
      )}
    </button>
  );

  return (
    <>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 28px 56px" }}>
        <Reveal
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderTop: "1px solid rgba(15,29,46,.14)",
            borderBottom: "1px solid rgba(15,29,46,.14)",
            padding: "22px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 34,
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            {btn(0, "Outcomes")}
            {btn(1, "ROI")}
          </div>
          <div
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.66)",
              maxWidth: 660,
              textWrap: "pretty",
            }}
          >
            {TAB_LINES[tab]}
          </div>
        </Reveal>
      </div>

      {tab === 0 ? outcomes : roi}
    </>
  );
}
