"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Figure } from "@/components/media/Figure";
import { hv } from "@/lib/hoverStyles";
import { FEATURE_TABS, TAB_INTERVAL_MS } from "@/lib/platform";

/* Platform "features" section, from Platform.dc.html lines 133-148.
 *
 * Five tabs that auto-advance every 18s. Clicking a tab selects it AND
 * restarts the timer (the original's _pick() cleared and re-set the
 * interval), so a visitor who picks a tab gets a full 18s on it.
 *
 * The active tab's underline is animated by the `tabProgress` keyframe in
 * globals.css, which runs for exactly the same 18s. It is keyed on the tab
 * index so React remounts the span and the animation restarts on change.
 *
 * Server renders tab 0, which is what the Phase 0 baseline captured.
 */
export function FeatureTabs() {
  const [tab, setTab] = useState(0);
  const timer = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(
      () => setTab((t) => (t + 1) % FEATURE_TABS.length),
      TAB_INTERVAL_MS,
    );
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [start]);

  const pick = (i: number) => {
    start();
    setTab(i);
  };

  const active = FEATURE_TABS[tab];

  return (
    <>
      <div
        data-feat-tabs=""
        style={{ display: "flex", gap: "clamp(12px,2vw,32px)" }}
      >
        {FEATURE_TABS.map((t, i) => (
          <button
            key={t.slot}
            onClick={() => pick(i)}
            className={hv("featTab")}
            style={{
              position: "relative",
              flex: 1,
              fontFamily: "Inter,sans-serif",
              fontSize: "clamp(14px,1.2vw,16.5px)",
              fontWeight: 500,
              textAlign: "center",
              color: i === tab ? "#0F1D2E" : "rgba(15,29,46,.5)",
              background: "none",
              border: "none",
              borderBottom: "1px solid rgba(15,29,46,.18)",
              padding: "0 8px 18px",
              cursor: "pointer",
              transition: "color .2s",
            }}
          >
            {t.name}
            {i === tab && (
              <span
                key={tab}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: 2,
                  background: "#1F6B73",
                  animation: "tabProgress 18s linear forwards",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        data-hdr=""
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "clamp(36px,5vw,88px)",
          alignItems: "end",
          paddingTop: "clamp(40px,5vw,80px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            alignSelf: "center",
            paddingBottom: "clamp(40px,5vw,80px)",
          }}
        >
          <h3
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 300,
              fontSize: "clamp(28px,3.2vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "#0F1D2E",
              textWrap: "balance",
            }}
          >
            {active.t}
          </h3>
          <p
            style={{
              fontSize: "clamp(16px,1.5vw,19px)",
              lineHeight: 1.68,
              color: "rgba(15,29,46,.75)",
              margin: 0,
              maxWidth: 520,
              textWrap: "pretty",
            }}
          >
            {active.d}
          </p>
        </div>
        <div
          style={{
            aspectRatio: "21/20",
            borderRadius: "16px 16px 0 0",
            overflow: "hidden",
          }}
        >
          <Figure
            src={active.img}
            alt=""
            radius={0}
            shape="rect"
            placeholder={active.ph}
            sizes="(max-width:1020px) 100vw, 55vw"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </div>
    </>
  );
}
