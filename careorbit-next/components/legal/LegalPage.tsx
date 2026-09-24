import type { CSSProperties } from "react";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";

/* Shared layout for the two legal pages, /privacy and /terms.
 *
 * The body is NOT authored here. Both pages render from JSON extracted
 * programmatically from the supplied Word documents (lib/legal/*.json), so
 * the legal wording is reproduced verbatim rather than retyped. Editing the
 * text means re-exporting the .docx, not editing a component.
 *
 * Deliberately plainer than the marketing pages: one measured column, no
 * imagery, no reveal animation, no conversion furniture. Legal copy is read
 * linearly and often searched with cmd-F, so the priorities are a
 * comfortable measure, unambiguous heading hierarchy, and nothing that
 * moves.
 */

export type Block =
  | { k: "title" | "h2" | "h3" | "p" | "li"; t: string }
  | { k: "table"; rows: string[][] };

const SERIF: CSSProperties = {
  fontFamily: "'Source Serif 4',serif",
  fontStyle: "italic",
  fontWeight: 600,
  letterSpacing: 0,
  color: "#E3735C",
};

/* ~68 characters at this size: the range where long-form prose stays
 * readable without the eye losing the line on return. */
const MEASURE = 680;

export function LegalPage({
  blocks,
  active,
}: {
  blocks: Block[];
  /* Which nav item to mark current. Neither legal page belongs to a nav
   * section, so both pass "home" - matching how the nav treats every page
   * that is not one of its own destinations. */
  active?: "home";
}) {
  /* The document's own Title and the "Effective ..." line become the page
   * header; everything after them is body copy. */
  const title = blocks.find((b) => b.k === "title");
  const rest = blocks.filter((b) => b !== title);
  const effective =
    rest[0]?.k === "p" && /^Effective/i.test(rest[0].t) ? rest[0] : null;
  const body = effective ? rest.slice(1) : rest;

  return (
    <>
      <SiteNav active={active ?? "home"} />
      <main id="main-content">
        <div style={{ background: "#FAF8F4", width: "100%" }}>
          <div
            style={{
              maxWidth: MEASURE,
              margin: "0 auto",
              padding: "clamp(88px,11vw,140px) 24px clamp(72px,9vw,120px)",
            }}
          >
            <header style={{ marginBottom: 44 }}>
              <h1
                style={{
                  fontFamily: "Lato,sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(34px,5vw,50px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#0F1D2E",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                {title && title.k === "title" ? title.t : null}
              </h1>
              {effective && effective.k === "p" ? (
                <p
                  style={{
                    ...SERIF,
                    fontSize: 17,
                    margin: "14px 0 0",
                  }}
                >
                  {effective.t}
                </p>
              ) : null}
            </header>

            {group(body).map((g, i) =>
              Array.isArray(g) ? (
                <BulletList key={i} items={g} />
              ) : (
                <LegalBlock key={i} block={g} />
              ),
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

/* Collapse each run of consecutive bullets into one array, so a run becomes
 * a single <ul> rather than a series of one-item lists. Everything else
 * passes through untouched. */
function group(blocks: Block[]): (Block | string[])[] {
  const out: (Block | string[])[] = [];
  for (const b of blocks) {
    if (b.k === "li") {
      const last = out[out.length - 1];
      if (Array.isArray(last)) last.push(b.t);
      else out.push([b.t]);
    } else {
      out.push(b);
    }
  }
  return out;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: "0 0 18px",
        paddingLeft: 24,
        fontSize: 16.5,
        lineHeight: 1.72,
        color: "rgba(15,29,46,.78)",
      }}
    >
      {items.map((t, i) => (
        <li key={i} style={{ margin: "0 0 9px", textWrap: "pretty" }}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function LegalBlock({ block }: { block: Block }) {
  if (block.k === "table") {
    return (
      <dl
        style={{
          margin: "26px 0 0",
          padding: "24px 26px",
          background: "#FFFFFF",
          border: "1px solid rgba(15,29,46,.10)",
          borderRadius: 18,
          display: "grid",
          gridTemplateColumns: "minmax(0,auto) minmax(0,1fr)",
          gap: "12px 26px",
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        {block.rows.map((r, i) => (
          <div key={i} style={{ display: "contents" }}>
            <dt style={{ fontWeight: 700, color: "#0F1D2E" }}>{r[0]}</dt>
            <dd style={{ margin: 0, color: "rgba(15,29,46,.72)" }}>
              {r.slice(1).join(" ")}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.k === "h2") {
    return (
      <h2
        style={{
          fontFamily: "Lato,sans-serif",
          fontWeight: 900,
          fontSize: "clamp(21px,2.5vw,25px)",
          lineHeight: 1.25,
          color: "#0F1D2E",
          margin: "52px 0 14px",
          textWrap: "balance",
        }}
      >
        {block.t}
      </h2>
    );
  }

  if (block.k === "h3") {
    return (
      <h3
        style={{
          fontFamily: "Lato,sans-serif",
          fontWeight: 700,
          fontSize: 18,
          lineHeight: 1.35,
          color: "#2D5A87",
          margin: "30px 0 10px",
        }}
      >
        {block.t}
      </h3>
    );
  }

  /* `li` never reaches here - group() collects bullets into BulletList. */
  return (
    <p
      style={{
        fontSize: 16.5,
        lineHeight: 1.72,
        color: "rgba(15,29,46,.78)",
        margin: "0 0 18px",
        textWrap: "pretty",
      }}
    >
      {block.t}
    </p>
  );
}
