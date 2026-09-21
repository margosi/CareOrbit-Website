"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { hv } from "@/lib/hoverStyles";

/* The ROI calculator modal, shared by the five orbit pages that carry a
 * live one: Behavioral Risk, Women's Health, Behavioral Health, Medication
 * Therapy and Surgical Support.
 *
 * Every one of them ships the same markup - the same #roi-calculator shell,
 * the same Export menu with a CSV and a one-page print view, the same
 * [data-calc-grid] / [data-calc-out] / [data-calc-total] blocks that the
 * page stylesheets target. Only the labels, the accent on the total, and
 * the arithmetic differ, so those arrive as props.
 *
 * The page owns the field values and the model; this owns the chrome.
 */

export type CalcFieldView = {
  k: string;
  label: string;
  ph: string;
  step: string;
  prefix: string;
  suffix: string;
  hint: string;
};

export type CalcResultView = { v: string; t: string; d: string };

export function RoiCalculator({
  backdropAttr = false,
  eyebrow,
  title,
  blurb,
  fields,
  values,
  onChange,
  results,
  total,
  totalNote,
  totalAccent,
  totalClaim,
  footNote,
  bookHref,
  onLoadBenchmarks,
  onClear,
  onClose,
  onExportCsv,
  onPrint,
}: {
  /** Women's Health tags its backdrop with data-roi-backdrop; the others
   * do not. Kept so each page's DOM matches its source exactly. */
  backdropAttr?: boolean;
  eyebrow: string;
  title: string;
  blurb: string;
  fields: readonly CalcFieldView[];
  values: Readonly<Record<string, string>>;
  onChange: (k: string, v: string) => void;
  results: readonly CalcResultView[];
  total: string;
  totalNote: string;
  /** Colour of the "Total annual opportunity" eyebrow. */
  totalAccent: string;
  totalClaim: ReactNode;
  footNote: ReactNode;
  bookHref: string;
  onLoadBenchmarks: () => void;
  onClear: () => void;
  onClose: () => void;
  onExportCsv: () => void;
  onPrint: () => void;
}) {
  const [exportOpen, setExportOpen] = useState(false);

  const closeMenuThen = (fn: () => void) => () => {
    setExportOpen(false);
    fn();
  };

  return (
    <div
      data-roi-backdrop={backdropAttr ? "" : undefined}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "rgba(15,29,46,.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5vh 20px",
        overflow: "auto",
      }}
    >
      <div
        id="roi-calculator"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1000,
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.6)",
          boxShadow: "0 40px 90px rgba(15,29,46,.35)",
          borderRadius: 30,
          padding: 36,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <div
          data-print-hide=""
          style={{
            position: "absolute",
            top: 20,
            right: 22,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ position: "relative", display: "inline-flex" }}>
            <button
              onClick={() => setExportOpen((v) => !v)}
              className={hv("darkFill")}
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#0F1D2E",
                background: "#FFFFFF",
                border: "1.5px solid rgba(15,29,46,.16)",
                borderRadius: 999,
                padding: "9px 18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "background .2s,color .2s,border-color .2s",
              }}
            >
              Export
              <span style={{ fontSize: 10, lineHeight: 1 }}>▾</span>
            </button>
            {exportOpen ? (
              <span
                style={{
                  position: "absolute",
                  top: 44,
                  right: 0,
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,29,46,.12)",
                  borderRadius: 14,
                  boxShadow: "0 18px 40px rgba(15,29,46,.18)",
                  padding: 6,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 190,
                  zIndex: 5,
                }}
              >
                <button
                  onClick={closeMenuThen(onPrint)}
                  className={hv("menuItem")}
                  style={MENU_BTN}
                >
                  PDF, one page
                </button>
                <button
                  onClick={closeMenuThen(onExportCsv)}
                  className={hv("menuItem")}
                  style={MENU_BTN}
                >
                  Excel spreadsheet
                </button>
              </span>
            ) : null}
          </span>
          <button
            onClick={onClose}
            aria-label="Close calculator"
            className={hv("darkFill")}
            style={{
              fontFamily: "Inter,sans-serif",
              fontSize: 16,
              lineHeight: 1,
              color: "#0F1D2E",
              background: "#FFFFFF",
              border: "1.5px solid rgba(15,29,46,.16)",
              borderRadius: 999,
              width: 34,
              height: 34,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background .2s,color .2s",
            }}
          >
            ×
          </button>
        </div>

        <div
          data-hdr=""
          data-grid="split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
            paddingRight: 200,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#B0A99E",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.68)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {blurb}
            </p>
            <div
              data-print-hide=""
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              <button
                onClick={onLoadBenchmarks}
                className={hv("navyToCoral")}
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  background: "#0F1D2E",
                  border: "none",
                  borderRadius: 999,
                  padding: "9px 16px",
                  cursor: "pointer",
                  transition: "background .2s",
                }}
              >
                Load published figures
              </button>
              <button
                onClick={onClear}
                className={hv("sheetBtn")}
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  background: "none",
                  border: "1.5px solid rgba(15,29,46,.16)",
                  borderRadius: 999,
                  padding: "9px 16px",
                  cursor: "pointer",
                  transition: "border-color .2s",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div
          data-calc-grid=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: "18px 24px",
          }}
        >
          {fields.map((f) => (
            <label
              key={f.k}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#0F1D2E",
                  lineHeight: 1.3,
                }}
              >
                {f.label}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1.5px solid rgba(15,29,46,.14)",
                  borderRadius: 12,
                  padding: "0 12px",
                  background: "#FAF8F4",
                }}
              >
                <span style={{ fontSize: 14, color: "rgba(15,29,46,.7)" }}>
                  {f.prefix}
                </span>
                <input
                  type="number"
                  min="0"
                  step={f.step}
                  value={values[f.k]}
                  placeholder={f.ph}
                  onChange={(e) => onChange(f.k, e.target.value)}
                  style={{
                    fontFamily: "Inter,sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0F1D2E",
                    border: "none",
                    background: "none",
                    outline: "none",
                    padding: "12px 0",
                    width: "100%",
                    minWidth: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(15,29,46,.7)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.suffix}
                </span>
              </span>
              <span
                style={{
                  fontSize: 12,
                  lineHeight: 1.45,
                  color: "rgba(15,29,46,.68)",
                }}
              >
                {f.hint}
              </span>
            </label>
          ))}
        </div>

        <div
          data-calc-out=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gap: 14,
            borderTop: "1px solid rgba(15,29,46,.12)",
            paddingTop: 24,
          }}
        >
          {results.map((r) => (
            <div
              key={r.t}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(30px,3.4vw,42px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#0F1D2E",
                }}
              >
                {r.v}
              </div>
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: 1.25,
                }}
              >
                {r.t}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "rgba(15,29,46,.66)",
                }}
              >
                {r.d}
              </div>
            </div>
          ))}
        </div>

        <div
          data-calc-total=""
          style={{
            background: "#0F1D2E",
            borderRadius: 22,
            padding: "28px 30px",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: totalAccent,
              }}
            >
              Total annual opportunity
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 300,
                fontSize: "clamp(38px,4.6vw,58px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
              }}
            >
              {total}
            </div>
            <div style={{ fontSize: 12.5, color: "#B9C8D8" }}>{totalNote}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#B9C8D8",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {totalClaim}
            </p>
            <Link
              data-print-hide=""
              href={bookHref}
              className={hv("navyPill")}
              style={{
                textDecoration: "none",
                fontSize: 14.5,
                fontWeight: 600,
                color: "#0F1D2E",
                background: "#FFFFFF",
                padding: "13px 24px",
                borderRadius: 999,
                transition: "background .2s,color .2s",
              }}
            >
              Walk through it with us
            </Link>
          </div>
        </div>

        <div
          style={{
            fontSize: 11.5,
            lineHeight: 1.5,
            color: "rgba(15,29,46,.6)",
          }}
        >
          {footNote}
        </div>
      </div>
    </div>
  );
}

const MENU_BTN: React.CSSProperties = {
  fontFamily: "Inter,sans-serif",
  textAlign: "left",
  fontSize: 13.5,
  fontWeight: 500,
  color: "#0F1D2E",
  background: "none",
  border: "none",
  borderRadius: 9,
  padding: "11px 12px",
  cursor: "pointer",
};
