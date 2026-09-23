import type { CSSProperties, ReactNode } from "react";

/* The "ledger row" pattern shared by the four product pages
 * (Engage / Assess / Capture / Data).
 *
 * Structure, from EngagePage.dc.html lines 61-78 and repeated verbatim in
 * the other three: a [data-row] grid with a .62fr label column (kicker,
 * title, sub) and a 1fr column of items. Each item is a dash, a serif
 * number, or nothing, followed by "**bold lead** trailing copy".
 *
 * Kept as a component rather than copy-pasted markup because all four pages
 * repeat it a dozen times each; the inline styles below are the originals.
 */
export type LedgerItem = {
  /** Serif italic number, e.g. "01". Mutually exclusive with `plain`. */
  n?: string;
  /** true renders the short dash rule instead of a number. */
  plain?: boolean;
  t: string;
  d: string;
};

export type LedgerBlock = {
  kicker: string;
  t: string;
  sub: string;
  /** grid-template-columns for the items column, e.g. "1fr" or "1fr 1fr". */
  cols?: string;
  /** Kicker colour. */
  label?: string;
  /** Dash colour. */
  dot?: string;
  items: LedgerItem[];
};

const rowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: ".62fr 1fr",
  gap: 44,
  borderTop: "1px solid rgba(15,29,46,.14)",
  padding: "30px 0 34px",
};

export function LedgerRow({
  block,
  labelColor,
  dotColor,
  numberColor,
}: {
  block: LedgerBlock;
  /** Fallback kicker colour when the block does not carry its own. */
  labelColor?: string;
  dotColor?: string;
  numberColor?: string;
}) {
  const label = block.label ?? labelColor ?? "#1F6B73";
  const dot = block.dot ?? dotColor ?? "#4FB3BF";
  const num = numberColor ?? "#E3735C";
  const cols = block.cols;

  return (
    <div data-row="" style={rowStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: label,
          }}
        >
          {block.kicker}
        </div>
        <div
          style={{
            fontFamily: "Lato,sans-serif",
            fontWeight: 900,
            fontSize: "clamp(21px,2.2vw,26px)",
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            textWrap: "balance",
          }}
        >
          {block.t}
        </div>
        <div
          style={{
            fontSize: 15.5,
            lineHeight: 1.55,
            color: "rgba(15,29,46,.6)",
            maxWidth: 330,
          }}
        >
          {block.sub}
        </div>
      </div>

      {/* cols present -> the two-column [data-two] variant; otherwise a
          simple stacked list with 14px gaps. */}
      {cols ? (
        <div
          data-two=""
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            gap: "16px 36px",
            alignContent: "start",
          }}
        >
          {block.items.map((it) => (
            <LedgerLine key={it.t} item={it} dot={dot} num={num} />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {block.items.map((it) => (
            <LedgerLine key={it.t} item={it} dot={dot} num={num} />
          ))}
        </div>
      )}
    </div>
  );
}

function LedgerLine({
  item,
  dot,
  num,
}: {
  item: LedgerItem;
  dot: string;
  num: string;
}) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      {item.n && (
        <span
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 17,
            color: num,
            flexShrink: 0,
            minWidth: 26,
          }}
        >
          {item.n}
        </span>
      )}
      {/* The original renders the dash when `plain` is truthy, and also for
          rows that carry neither `n` nor `plain` (sc-if on an undefined
          value is falsy there, but those blocks always set one or the
          other). Reproduced: dash unless a number is present. */}
      {!item.n && (
        <span
          style={{
            width: 9,
            height: 1.5,
            background: dot,
            display: "inline-block",
            flexShrink: 0,
            marginTop: 12,
          }}
        />
      )}
      <span
        style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(15,29,46,.82)" }}
      >
        <strong style={{ fontWeight: 600, color: "#0F1D2E" }}>{item.t}</strong>{" "}
        {item.d}
      </span>
    </div>
  );
}

/* Section header used above every ledger group: a 1fr/1fr grid with the
 * heading on the left and supporting copy right-aligned. */
export function LedgerHeader({
  kicker,
  heading,
  children,
  marginBottom = 40,
  lead = "measure",
}: {
  kicker?: string;
  heading: ReactNode;
  children: ReactNode;
  marginBottom?: number;
  /* Two lead-paragraph styles exist in v2-maven. "measure" is the common
   * one - 1.5 line-height, #122536, capped at 540px and pushed right.
   * "flow" appears once, on EngagePage's "Engaged patients are your most
   * valuable asset" header: 1.65 line-height, rgba(15,29,46,.72), no cap
   * and no justify-self, so it fills the column. Transcribing it as
   * "measure" cost 7px of height and cascaded down the page. */
  lead?: "measure" | "flow";
}) {
  return (
    <div
      data-hdr=""
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "start",
        marginBottom,
      }}
    >
      {kicker ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#6F6A62",
            }}
          >
            {kicker}
          </div>
          {heading}
        </div>
      ) : (
        heading
      )}
      <p
        style={
          lead === "flow"
            ? {
                fontSize: "clamp(16px,1.4vw,19px)",
                lineHeight: 1.65,
                color: "rgba(15,29,46,.72)",
                margin: 0,
                textWrap: "pretty",
              }
            : {
                fontSize: "clamp(16px,1.4vw,19px)",
                lineHeight: 1.5,
                color: "#122536",
                margin: 0,
                maxWidth: 540,
                justifySelf: "end",
                textWrap: "pretty",
              }
        }
      >
        {children}
      </p>
    </div>
  );
}
