"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

/* The "View sources" disclosure at the foot of the evidence section.
 * Port of the toggleSources block shared by the orbit pages.
 *
 * The count label is derived the same way the original did:
 *   sourceCount: sourcesList.length + " references"
 */
export function SourcesDisclosure({
  sources,
  marginTop = 34,
}: {
  sources: readonly string[];
  /** Women's Health sets 20px; the others 34px. */
  marginTop?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal
      style={{
        marginTop,
        maxWidth: 1000,
        borderTop: "1px solid rgba(15,29,46,.12)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          fontFamily: "Inter,sans-serif",
          background: "none",
          border: "none",
          padding: "16px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#0F1D2E",
          width: "100%",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          {open ? "Hide sources" : "View sources"}
        </span>
        <span style={{ fontSize: 12, color: "rgba(15,29,46,.7)" }}>
          {sources.length} references
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            lineHeight: 1,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .25s",
          }}
        >
          ▾
        </span>
      </button>
      {open ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            padding: "0 0 4px",
          }}
        >
          {sources.map((x) => (
            <div
              key={x}
              style={{
                fontSize: 12.5,
                lineHeight: 1.55,
                color: "rgba(15,29,46,.68)",
              }}
            >
              {x}
            </div>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}
