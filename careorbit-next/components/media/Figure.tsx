import Image from "next/image";
import type { CSSProperties } from "react";
import { EXACT_PIXELS } from "@/lib/migration";

/* Replacement for v2-maven's <image-slot> custom element.
 *
 * WHAT IS DROPPED, DELIBERATELY
 * image-slot persisted drag-and-dropped images to a .image-slots.state.json
 * sidecar written through window.omelette, a bridge that exists only inside
 * Claude Design. Its own docs: "Outside the omelette runtime the slot is
 * read-only." Per locked decision 4, the authoring workflow is replaced by
 * plain files in public/images/. Display behaviour is preserved.
 *
 * WHAT IS PRESERVED
 *   - every slot in v2-maven carries a real src, so images render the same
 *   - object-fit: cover framing (image-slot's `fit` default)
 *   - shape / radius corner treatment
 *   - the visible "[Placeholder: ...]" caption when no src is set, which
 *     CLAUDE.md requires stay visibly labelled
 *
 * The empty-state chrome approximates image-slot's (centred caption on a
 * faint tint, 13px system-ui, .75 opacity). It is calibrated against a real
 * diff in Phase 3, where the first placeholder-bearing page is converted.
 */
export type FigureShape = "rect" | "rounded" | "circle" | "pill";

function radiusFor(shape: FigureShape, radius?: number): string | undefined {
  switch (shape) {
    case "rect":
      return undefined;
    case "circle":
      return "50%";
    case "pill":
      return "999px";
    case "rounded":
    default:
      return `${radius ?? 12}px`;
  }
}

export function Figure({
  src,
  alt = "",
  placeholder,
  shape = "rounded",
  radius,
  fit = "cover",
  objectPosition,
  style,
  sizes = "100vw",
  priority = false,
}: {
  src?: string;
  alt?: string;
  /** Visible caption when src is absent. Keep the "[Placeholder: ...]" text. */
  placeholder?: string;
  shape?: FigureShape;
  radius?: number;
  fit?: "cover" | "contain";
  /** CSS object-position, e.g. "78% 34%" for the hero frames. */
  objectPosition?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
}) {
  const borderRadius = radiusFor(shape, radius);

  const frame: CSSProperties = {
    display: "block",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    /* Matches image-slot's host rule exactly:
     *   :host{display:block;position:relative;width:100%;height:100%;aspect-ratio:3/2}
     *
     * This is NOT decorative. In a CSS grid, `1fr` means
     * `minmax(auto, 1fr)`, so a track cannot shrink below its content's
     * min-content width. With the case-study panel's fixed 330px height,
     * image-slot contributes 330 x 1.5 = 495px; without aspect-ratio a
     * fill-positioned image contributes 0. Omitting it collapsed that
     * column from 495px to 480px at 1440 (and to ~367px at 1024), changing
     * the heading's line breaks and the page height by -89px.
     *
     * Explicit width/height still win for the used size; aspect-ratio only
     * restores the intrinsic contribution. Callers can override via `style`,
     * which is spread last. */
    aspectRatio: "3 / 2",
    borderRadius,
    ...style,
  };

  if (!src) {
    /* Empty state, reproduced from image-slot.js's shadow stylesheet so an
     * unfilled slot looks the same as it does today:
     *
     *   .frame  background rgba(127,127,127,.08), clipped, rounded
     *   .empty  inset:0 flex column, centred, gap 6, padding 12
     *   svg     28x28 stroke currentColor, opacity .45
     *   .cap    max-width 90%, weight 500, letter-spacing .01em, opacity .75
     *   .ring   inset:0, 1.5px dashed currentColor, opacity .35
     *
     * The host sets `font:13px/1.3 system-ui,-apple-system,sans-serif` and
     * `color:inherit`, so the chrome takes the section's own text colour.
     *
     * The ring carries no radius of its own: it is clipped by the frame's
     * overflow:hidden, which is what rounds it in v2-maven too.
     *
     * NOT reproduced: the "or browse files" sub-line. image-slot hides it
     * whenever the slot is not editable (`_sub.style.display = editable ?
     * '' : 'none'`), and editing only exists inside Claude Design, so it is
     * never visible on the published site.
     */
    return (
      <div
        style={{
          ...frame,
          background: "rgba(127,127,127,.08)",
          font: "13px/1.3 system-ui, -apple-system, sans-serif",
          color: "inherit",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            textAlign: "center",
            padding: 12,
            boxSizing: "border-box",
            userSelect: "none",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.45 }}
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <div
            style={{
              maxWidth: "90%",
              fontWeight: 500,
              letterSpacing: ".01em",
              opacity: 0.75,
            }}
          >
            {placeholder ?? "Drop an image"}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            border: "1.5px dashed currentColor",
            opacity: 0.35,
          }}
        />
      </div>
    );
  }

  return (
    <div style={frame}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={EXACT_PIXELS}
        style={{ objectFit: fit, objectPosition }}
      />
    </div>
  );
}
