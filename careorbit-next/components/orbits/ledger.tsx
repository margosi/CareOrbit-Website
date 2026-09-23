import type { CSSProperties, ReactNode } from "react";
import { hv } from "@/lib/hoverStyles";

/* Shared primitives for the orbit pages' "editorial ledger system"
 * (v2-maven/PAGE-STANDARD.md).
 *
 * Every orbit page renders the same three shapes with different copy and
 * accent colours:
 *   - the audience row  (kicker / title / optional sub, then a dash list)
 *   - the dash list     (r.plain in the source)
 *   - the stepped list  (r.seq in the source)
 * The markup below is a byte-faithful port of those blocks; the values that
 * actually vary between pages arrive as props or as data.
 *
 * Server-safe: no hooks, no browser APIs. Pages that need state wrap these
 * in their own client component.
 */

export const H2_LIGHT: CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 300,
  fontSize: "clamp(30px,3.6vw,42px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: 0,
  textWrap: "balance",
};

export const HDR: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 56,
  alignItems: "start",
};

export const EYEBROW: CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: ".14em",
  textTransform: "uppercase",
};

export const SECTION_LEAD: CSSProperties = {
  fontSize: "clamp(16px,1.4vw,19px)",
  lineHeight: 1.5,
  color: "#122536",
  margin: 0,
  maxWidth: 540,
  justifySelf: "end",
  textWrap: "pretty",
};

export const POV_ROW: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0,.62fr) minmax(0,1fr)",
  gap: "16px 40px",
  alignItems: "start",
  padding: "26px 0",
  borderTop: "1px solid rgba(15,29,46,.14)",
};

export const POV_KICKER: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".13em",
  textTransform: "uppercase",
};

export const POV_TITLE: CSSProperties = {
  fontFamily: "Lato,sans-serif",
  fontWeight: 900,
  fontSize: "clamp(21px,2.2vw,26px)",
  lineHeight: 1.14,
  letterSpacing: "-0.02em",
  color: "#0F1D2E",
  textWrap: "balance",
};

export const POV_SUB: CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.6)",
  textWrap: "pretty",
  maxWidth: 330,
};

export const DASH_GRID: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "14px minmax(0,1fr)",
  gap: 12,
  alignItems: "baseline",
};

export const DASH_TEXT: CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.6,
  color: "rgba(15,29,46,.7)",
  textWrap: "pretty",
};

export const NAVY_PANEL: CSSProperties = {
  background: "#0F1D2E url(/brand/arc-lines.svg) center/cover no-repeat",
  borderRadius: 40,
  padding: "64px 56px",
};

/** The short rule used as a list bullet. */
export function dash(color: string): CSSProperties {
  return {
    width: 9,
    height: 1.5,
    borderRadius: 1,
    background: color,
    transform: "translateY(-4px)",
  };
}

/** 01, 02, ... exactly as String(i + 1).padStart(2, "0") produced. */
export function pad(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/* ---------------------------------------------------------------- rows -- */

export type DashItem = { t: string; d: string };

export type SeqItem = {
  v: string;
  cBorder: string;
  cBg: string;
  cFg: string;
  cLine: string;
  line: boolean;
  t: string;
  tag: string;
  d: string;
};

export type PlainRowData = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  sub?: string;
  items: DashItem[];
  plain?: true;
};

export type SeqRowData = {
  kicker: string;
  t: string;
  label: string;
  dot: string;
  sub?: string;
  items: SeqItem[];
  seq: true;
};

export type AnyRow = PlainRowData | SeqRowData;

function isSeq(r: AnyRow): r is SeqRowData {
  return "seq" in r && r.seq === true;
}

/** Left-hand column of every ledger row. */
export function RowHead({
  kicker,
  label,
  title,
  sub,
}: {
  kicker: string;
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ ...POV_KICKER, color: label }}>{kicker}</div>
      <div style={POV_TITLE}>{title}</div>
      {sub === undefined ? null : <div style={POV_SUB}>{sub}</div>}
    </div>
  );
}

/** Right-hand column: plain strings, or bolded lead-in plus description. */
export function DashList({
  dot,
  items,
}: {
  dot: string;
  items: readonly (string | DashItem)[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 9,
        paddingTop: 2,
      }}
    >
      {items.map((it) => {
        const key = typeof it === "string" ? it : it.t;
        return (
          <div key={key} style={DASH_GRID}>
            <span style={dash(dot)} />
            <div style={DASH_TEXT}>
              {typeof it === "string" ? (
                it
              ) : (
                <>
                  <span style={{ fontWeight: 600, color: "#0F1D2E" }}>
                    {it.t}
                  </span>{" "}
                  {it.d}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Right-hand column: numbered circles joined by a gradient rule. */
export function SeqList({ items }: { items: readonly SeqItem[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingTop: 2,
      }}
    >
      {items.map((it) => (
        <div
          key={it.v}
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0,1fr)",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              alignSelf: "stretch",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: `1px solid ${it.cBorder}`,
                background: it.cBg,
                fontFamily: "Lato,sans-serif",
                fontWeight: 700,
                fontSize: 12.5,
                color: it.cFg,
                flexShrink: 0,
              }}
            >
              {it.v}
            </span>
            {it.line ? (
              <span
                style={{
                  flex: 1,
                  width: 1,
                  background: `linear-gradient(${it.cLine},rgba(79,179,191,.12))`,
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              paddingBottom: 22,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: "-0.01em",
                  color: "#0F1D2E",
                }}
              >
                {it.t}
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: ".11em",
                  textTransform: "uppercase",
                  color: it.cFg,
                }}
              >
                {it.tag}
              </span>
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(15,29,46,.7)",
                textWrap: "pretty",
              }}
            >
              {it.d}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** One full ledger row, in whichever of the two shapes it declares. */
export function LedgerRow({ r }: { r: AnyRow }) {
  return (
    <div data-povrow="" style={POV_ROW}>
      <RowHead kicker={r.kicker} label={r.label} title={r.t} sub={r.sub} />
      {isSeq(r) ? (
        <SeqList items={r.items} />
      ) : (
        <DashList dot={r.dot} items={r.items} />
      )}
    </div>
  );
}

/** The three-audiences block under the value image. */
export function PovRows({
  blocks,
}: {
  blocks: readonly {
    kicker: string;
    t: string;
    label: string;
    dot: string;
    items: readonly string[];
  }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {blocks.map((p) => (
        <div key={p.kicker} data-povrow="" style={POV_ROW}>
          <RowHead kicker={p.kicker} label={p.label} title={p.t} />
          <DashList dot={p.dot} items={p.items} />
        </div>
      ))}
    </div>
  );
}

/** The numbered "Targeted outcomes" ledger. */
export function MeasureLedger({
  measures,
  numberColor = "#2D5A87",
}: {
  measures: readonly { t: string; d: string }[];
  /** Community Research numbers its rows in teal rather than navy-blue. */
  numberColor?: string;
}) {
  return (
    <>
      {measures.map((m, i) => (
        <div
          key={m.t}
          data-ledger=""
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
            gap: "24px 56px",
            alignItems: "baseline",
            padding: "22px 0",
            borderBottom: "1px solid rgba(15,29,46,.14)",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
            <div
              style={{
                fontFamily: "'Source Serif 4',serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 15,
                color: numberColor,
                flexShrink: 0,
                minWidth: 24,
              }}
            >
              {pad(i)}
            </div>
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 700,
                fontSize: "clamp(19px,2vw,23px)",
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
              }}
            >
              {m.t}
            </div>
          </div>
          <div
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.68)",
              textWrap: "pretty",
            }}
          >
            {m.d}
          </div>
        </div>
      ))}
    </>
  );
}

/** The navy "care journeys currently supported" list. */
export function CatalogGrid({
  items,
  accent,
}: {
  items: readonly { t: string; v: string }[];
  accent: string;
}) {
  return (
    <>
      {items.map((c, i) => (
        <div
          key={c.t}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "baseline",
            padding: "16px 0",
            borderBottom: "1px solid rgba(45,90,135,.55)",
          }}
        >
          <span
            style={{
              fontFamily: "'Source Serif 4',serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 14,
              color: accent,
              minWidth: 24,
            }}
          >
            {pad(i)}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: "Lato,sans-serif",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              {c.t}
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: "#8FA5BC",
                textWrap: "pretty",
              }}
            >
              {c.v}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/** Two pull-quotes beside a ledger row head. */
export function QuotePair({
  quotes,
  color,
}: {
  quotes: readonly { text: string; who: string }[];
  color: string;
}) {
  return (
    <div
      data-split=""
      data-grid="split"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}
    >
      {quotes.map((q) => (
        <div
          key={q.who}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div
            style={{
              fontFamily: "'Source Serif 4',serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 19,
              lineHeight: 1.5,
              color,
              textWrap: "pretty",
            }}
          >
            {q.text}
          </div>
          <div
            style={{
              marginTop: "auto",
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: ".09em",
              textTransform: "uppercase",
              color: "rgba(15,29,46,.5)",
            }}
          >
            {q.who}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Serif italic accent word inside a heading. */
export function Em({
  children,
  /* #D4644E rather than the brand #E3735C. These accent words are large
   * display text, so WCAG asks 3:1, and #E3735C lands at 2.88 on the paper
   * background - a miss, not a margin. This is the same hue one step down
   * its own ramp: 3.22 on paper, 3.42 on white, and still 4.97 on navy, so
   * the accent reads correctly on both light sections and dark panels. */
  color = "#D4644E",
  weight = 600,
}: {
  children: ReactNode;
  color?: string;
  weight?: 500 | 600;
}) {
  return (
    <em
      style={{
        fontFamily: "'Source Serif 4',serif",
        fontStyle: "italic",
        fontWeight: weight,
        letterSpacing: 0,
        color,
      }}
    >
      {children}
    </em>
  );
}

/** The segment tab bar with its strapline. Identical markup on every orbit
 * page that has one; only the labels and the active index differ. Rendered
 * inside the caller's <Reveal>, which owns the rules above and below. */
export function SegmentTabs({
  labels,
  active,
  onPick,
  line,
  lineMaxWidth = 660,
}: {
  labels: readonly string[];
  active: number;
  onPick: (i: number) => void;
  line: string;
  /** BehavioralSafety uses 640; the orbit pages use 660. */
  lineMaxWidth?: number;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 34,
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => onPick(i)}
            aria-pressed={i === active}
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
              color: i === active ? "#0F1D2E" : "rgba(15,29,46,.42)",
            }}
          >
            {label}
            {i === active ? (
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
            ) : null}
          </button>
        ))}
      </div>
      <div
        style={{
          fontSize: 15.5,
          lineHeight: 1.6,
          color: "rgba(15,29,46,.66)",
          maxWidth: lineMaxWidth,
          textWrap: "pretty",
        }}
      >
        {line}
      </div>
    </>
  );
}

/** The four-across "what the gap costs" stats on the navy panel, in the
 * shape Cardiology and Primary Care use (value / label / body / source). */
export function MoneyStats({
  stats,
  accent,
}: {
  stats: readonly { v: string; t: string; d: string; src: string }[];
  accent: string;
}) {
  return (
    <>
      {stats.map((m) => (
        <div
          key={m.t}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            borderTop: `2px solid ${accent}`,
            paddingTop: 18,
          }}
        >
          <div
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 300,
              fontSize: "clamp(30px,3.2vw,42px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            {m.v}
          </div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: ".11em",
              textTransform: "uppercase",
              color: accent,
              lineHeight: 1.35,
            }}
          >
            {m.t}
          </div>
          <div
            style={{
              fontSize: 13.5,
              lineHeight: 1.55,
              color: "#B9C8D8",
              textWrap: "pretty",
            }}
          >
            {m.d}
          </div>
          <div
            style={{
              marginTop: "auto",
              paddingTop: 14,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: ".09em",
              textTransform: "uppercase",
              color: "#7E93AB",
            }}
          >
            {m.src}
          </div>
        </div>
      ))}
    </>
  );
}

/** A 2x2 block of big figures under a rule. Used by every evidence panel.
 *
 * `studyStats` puts data-study-stats on the grid itself rather than on a
 * wrapper, which is where the source carries it - the Cardiology sheet has
 * a [data-study-stats] rule that swaps its left border for a top border
 * below 820px, and an extra wrapper element would change the DOM shape the
 * computed-style audit compares. */
export function StatQuad({
  stats,
  studyStats = false,
}: {
  stats: readonly { v: string; d: string }[];
  studyStats?: boolean;
}) {
  return (
    <div
      data-grid="split"
      data-study-stats={studyStats ? "" : undefined}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "22px 32px",
      }}
    >
      {stats.map((st) => (
        <div
          key={st.v + st.d}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderTop: "1px solid rgba(15,29,46,.14)",
            paddingTop: 14,
          }}
        >
          <div
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 300,
              fontSize: "clamp(28px,3vw,38px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "#0F1D2E",
            }}
          >
            {st.v}
          </div>
          <div
            style={{
              fontSize: 12.5,
              lineHeight: 1.45,
              color: "rgba(15,29,46,.62)",
              textWrap: "pretty",
            }}
          >
            {st.d}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The light-background "by the numbers" cards: a big figure, a title, a
 * body and a sourced footnote, four across. Used by the pages that carry a
 * modelled-exposure block (Women's Health, Behavioral Health, Medication
 * Therapy, Surgical Support). */
export function MoneyCards({
  stats,
}: {
  stats: readonly { v: string; t: string; d: string; src: string }[];
}) {
  return (
    <>
      {stats.map((m) => (
        <div
          key={m.t}
          style={{
            borderTop: "2px solid #0F1D2E",
            padding: "22px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 300,
              fontSize: "clamp(38px,4.2vw,54px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "#0F1D2E",
            }}
          >
            {m.v}
          </div>
          <div
            style={{
              fontFamily: "Lato,sans-serif",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.3,
              color: "#0F1D2E",
            }}
          >
            {m.t}
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(15,29,46,.68)",
              textWrap: "pretty",
            }}
          >
            {m.d}
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "rgba(15,29,46,.7)",
              marginTop: "auto",
              paddingTop: 12,
              borderTop: "1px solid rgba(15,29,46,.1)",
            }}
          >
            {m.src}
          </div>
        </div>
      ))}
    </>
  );
}

/** The navy "modelled annual exposure" panel that sits under those cards,
 * with the button that opens the ROI calculator. */
export function ModeledExposure({
  accent,
  label = "Modeled annual exposure",
  figures,
  note,
  buttonLabel,
  onToggle,
}: {
  accent: string;
  /** Surgical Support reads "Annual value at your volume", because its
   * percentages are measured trial outcomes rather than assumptions. */
  label?: string;
  figures: readonly { v: string; d: string }[];
  note: string;
  buttonLabel: string;
  onToggle: () => void;
}) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {figures.map((f, i) => (
            <div
              key={f.v}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                ...(i === 0
                  ? {}
                  : { borderTop: "1px solid #2D5A87", paddingTop: 14 }),
              }}
            >
              <div
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(36px,4.4vw,54px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#FFFFFF",
                }}
              >
                {f.v}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "#B9C8D8" }}>
                {f.d}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "#8FA3B8",
            margin: 0,
            textWrap: "pretty",
          }}
        >
          {note}
        </p>
        <button
          onClick={onToggle}
          className={hv("navyPill")}
          style={{
            fontFamily: "Inter,sans-serif",
            alignSelf: "flex-start",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            color: "#0F1D2E",
            background: "#FFFFFF",
            padding: "14px 26px",
            borderRadius: 999,
            marginTop: 18,
            transition: "background .2s,color .2s",
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </>
  );
}
