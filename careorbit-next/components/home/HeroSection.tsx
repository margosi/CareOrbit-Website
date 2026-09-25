"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hv } from "@/lib/hoverStyles";
import { EXACT_PIXELS } from "@/lib/migration";

/* Home hero. Ported from the Claude Design export, v2-maven/Home.dc.html
 * lines 85-102 plus the `_runLines()` routine in its component script.
 *
 * What the Design replaced, and why none of it is kept:
 *   - hero-1 is no longer the opening frame; hero-8 is, at 74% 40%.
 *   - The dot controls are gone. Nothing advances the fader by hand any
 *     more - the ribbon animation below owns the index.
 *   - The static three-arc `coDash` SVG is gone, replaced by the drawn
 *     ribbons (see `useHeroRibbons`).
 *   - The chat box left the hero entirely. It is now a page-level fixed
 *     launcher, `components/home/OrbitChat.tsx`.
 *
 * The copy block's bottom padding is deliberately enormous -
 * clamp(200px,25svh,300px) - because the ribbons sweep across the lower
 * third and the headline has to clear them.
 */

const FRAMES = [
  { src: "/images/hero-8.webp", pos: "74% 40%" },
  { src: "/images/hero-2.webp", pos: "80% 32%" },
  { src: "/images/hero-3.webp", pos: "88% 38%" },
  { src: "/images/hero-4.webp", pos: "80% 32%" },
  { src: "/images/hero-7.webp", pos: "60% 40%" },
];

/* One label per frame. Shown two ways: on the ribbon head at >640px, and in
 * the pill above the headline at <=640px, where the ribbons are hidden. */
const LABELS = [
  "Supporting cancer care",
  "Supporting expecting mothers",
  "Supporting joint recovery",
  "Supporting weight-loss surgery",
  "Supporting behavioral health",
];

export function HeroSection({
  heroWord = "valuable",
  ctaLabel = "Book a 20-minute intro call",
}: {
  heroWord?: string;
  ctaLabel?: string;
}) {
  const [heroIdx, setHeroIdx] = useState(0);
  const linesRef = useRef<HTMLDivElement | null>(null);

  useHeroRibbons(linesRef, setHeroIdx);

  return (
    <div
      data-hero-wrap=""
      style={{
        position: "relative",
        marginTop: -26,
        zIndex: 0,
        padding: "0 14px",
      }}
    >
      <div
        data-hero-box=""
        style={{
          position: "relative",
          borderRadius: 30,
          overflow: "hidden",
          height: "max(640px,calc(100svh - 62px))",
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
          data-hero-shade=""
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(15,29,46,.62) 0%,rgba(15,29,46,.32) 42%,rgba(15,29,46,0) 68%)",
            pointerEvents: "none",
          }}
        />

        <div
          data-hero-copy=""
          style={{
            zIndex: 1,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 26,
            padding: "0 64px clamp(200px,25svh,300px)",
            maxWidth: 760,
            boxSizing: "border-box",
          }}
        >
          <div
            data-hero-pill=""
            style={{
              display: "none",
              alignItems: "center",
              gap: 10,
              alignSelf: "center",
              background: "rgba(255,255,255,.16)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              letterSpacing: ".04em",
              color: "#FFFFFF",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#F2B8C6",
              }}
            />
            {/* Keyed so a new label remounts and replays coPillIn. */}
            <span
              key={`m${heroIdx}`}
              style={{
                display: "inline-block",
                animation: "coPillIn .5s ease-out forwards",
              }}
            >
              {LABELS[heroIdx]}
            </span>
          </div>

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
            Proven digital education and engagement supporting any care journey,
            issued from your existing workflow.
          </p>

          <div
            data-hero-btns=""
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
            <Link
              href="/platform"
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
              Explore platform
            </Link>
          </div>
        </div>

        {/* Ribbon host. Purely decorative: the label it carries is repeated
         * as real text in the pill above, which is what a screen reader
         * gets at any width. */}
        <div
          data-hero-lines=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "3%",
            height: "clamp(150px,21%,210px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div ref={linesRef} style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */

/* Four coloured ribbons that draw in from the left edge, settle, then take
 * turns sweeping the full width of the hero with a label riding the head.
 *
 * Ported from the Design's `_runLines()` essentially line for line. The
 * geometry is built imperatively rather than as JSX because every control
 * point is a fraction of the live box size and the head position comes from
 * `getPointAtLength()` on the path itself - there is nothing for React to
 * usefully re-render, and re-rendering it per frame would be far worse.
 *
 * The sweep loop is also what advances the photo fader: `setHeroIdx` is
 * called at the top of each pass. That coupling is the Design's, and it is
 * why the dot controls could be dropped. Below 640px the host is
 * display:none so `layout()` no-ops, but the loop keeps running and the
 * photos and pill keep cycling on the same cadence.
 *
 * NOT in the Design: the reduced-motion branch. The Design animates
 * unconditionally. Here, `prefers-reduced-motion: reduce` draws the four
 * ribbons once at their resting length and never starts the loop, so the
 * hero holds frame 1 and nothing moves.
 */
const LINE_DEFS = [
  {
    col: "#F2B8C6",
    p0: [-0.005, 0.5],
    c1: [0.09, 0.02],
    c2: [0.19, -0.02],
    e: [0.245, 0.12],
  },
  {
    col: "#4FB3BF",
    p0: [-0.005, 0.79],
    c1: [0.1, 0.36],
    c2: [0.19, 0.19],
    e: [0.295, 0.3],
  },
  {
    col: "#5B9BEA",
    p0: [-0.005, 0.66],
    c1: [0.1, 0.95],
    c2: [0.18, 1.03],
    e: [0.254, 0.83],
  },
  {
    col: "#E3735C",
    p0: [-0.005, 0.23],
    c1: [0.07, 0.18],
    c2: [0.19, 0.79],
    e: [0.284, 0.77],
  },
];

const NS = "http://www.w3.org/2000/svg";

type Ribbon = (typeof LINE_DEFS)[number] & {
  p: SVGPathElement;
  c: SVGCircleElement;
  /* Fraction of the full path currently drawn. */
  u: number;
  total: number;
  /* Fraction at which the ribbon rests between sweeps. */
  rest: number;
  atRest: boolean;
};

function useHeroRibbons(
  hostRef: React.RefObject<HTMLDivElement | null>,
  setHeroIdx: (i: number) => void,
) {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let dead = false;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;overflow:visible";
    host.appendChild(svg);

    const pill = document.createElement("div");
    pill.setAttribute("data-hero-pillend", "");
    pill.setAttribute("aria-hidden", "true");
    pill.style.cssText =
      "position:absolute;display:inline-flex;align-items:center;height:32px;margin-top:-16px;padding:0 16px;border-radius:999px;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);color:#FFFFFF;font:500 13px Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;opacity:0;clip-path:inset(0 100% 0 0 round 999px)";
    host.appendChild(pill);

    const lines: Ribbon[] = LINE_DEFS.map((d) => {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", d.col);
      p.setAttribute("stroke-width", "0.9");
      p.setAttribute("stroke-linecap", "round");
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "3.2");
      c.setAttribute("fill", d.col);
      c.style.opacity = "0";
      svg.append(p, c);
      return { ...d, p, c, u: 0, total: 1, rest: 0, atRest: false };
    });

    const draw = () =>
      lines.forEach((l) => {
        const len = l.u * l.total;
        l.p.setAttribute("stroke-dasharray", `${len} ${l.total + 20}`);
        let pt = { x: -99, y: -99 };
        try {
          pt = l.p.getPointAtLength(Math.max(len, 0.01));
        } catch {
          /* path not measurable yet */
        }
        l.c.setAttribute("cx", String(pt.x));
        l.c.setAttribute("cy", String(pt.y));
        l.c.style.opacity = l.u > 0.004 ? "1" : "0";
      });

    /* Rebuild every path in pixel space for the current box size. Each
     * ribbon is one curve in from the left edge (its resting shape), then
     * three more that dip, rise and run out to the label. */
    const layout = () => {
      const W = host.clientWidth;
      const H = host.clientHeight;
      if (!W || !H) return;
      const pw = pill.offsetWidth || 300;
      const EX = Math.min(W * 0.8, W - pw - 30);
      const EY = H * 0.62;
      lines.forEach((l) => {
        const X = (v: number) => (v * W).toFixed(1);
        const Y = (v: number) => (v * H).toFixed(1);
        const [ex, ey] = l.e;
        const [c2x, c2y] = l.c2;
        const first = `M ${X(l.p0[0])} ${Y(l.p0[1])} C ${X(l.c1[0])} ${Y(
          l.c1[1],
        )} ${X(c2x)} ${Y(c2y)} ${X(ex)} ${Y(ey)}`;
        const sx = ex * W;
        const sy = ey * H;
        const span = Math.max(EX - sx, 60);
        const hl = span * 0.16;
        const dx = sx + span * 0.36;
        const dy = H * 0.76;
        const cx = sx + span * 0.76;
        const cy = H * 0.15;
        const tl = Math.hypot(sx - c2x * W, sy - c2y * H) || 1;
        const tk = (span * 0.14) / tl;
        const f = (n: number) => n.toFixed(1);
        const full =
          first +
          ` C ${f(sx + (sx - c2x * W) * tk)} ${f(
            sy + (sy - c2y * H) * tk,
          )} ${f(dx - hl)} ${f(dy)} ${f(dx)} ${f(dy)}` +
          ` C ${f(dx + hl)} ${f(dy)} ${f(cx - hl)} ${f(cy)} ${f(cx)} ${f(cy)}` +
          ` C ${f(cx + hl * 0.7)} ${f(cy)} ${f(EX - span * 0.08)} ${f(
            EY - H * 0.14,
          )} ${f(EX)} ${f(EY)}`;
        try {
          l.p.setAttribute("d", first);
          const fl = l.p.getTotalLength();
          l.p.setAttribute("d", full);
          l.total = l.p.getTotalLength() || 1;
          l.rest = fl / l.total;
        } catch {
          l.p.setAttribute("d", full);
        }
        if (l.atRest) l.u = l.rest;
      });
      pill.style.left = `${EX + 12}px`;
      pill.style.top = `${EY}px`;
      draw();
    };

    const eo = (t: number) => 1 - Math.pow(1 - t, 3);
    const eio = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const wait = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));
    const tw = (
      l: Ribbon,
      to: number,
      dur: number,
      ease: (t: number) => number,
    ) =>
      new Promise<void>((res) => {
        const from = l.u;
        const t0 = performance.now();
        const step = (now: number) => {
          if (dead) return;
          const k = Math.min(1, (now - t0) / dur);
          l.u = from + (to - from) * ease(k);
          draw();
          if (k < 1) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      });

    const clipIn: Keyframe[] = [
      { clipPath: "inset(0 100% 0 0 round 999px)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0 round 999px)", opacity: 1 },
    ];

    pill.textContent = LABELS[0];

    let lw = 0;
    let lh = 0;
    const ro = new ResizeObserver(() => {
      if (host.clientWidth === lw && host.clientHeight === lh) return;
      lw = host.clientWidth;
      lh = host.clientHeight;
      layout();
    });
    ro.observe(host);
    layout();

    if (reduce) {
      /* Resting state, held. No sweep, no photo rotation. */
      lines.forEach((l) => {
        l.u = l.rest;
        l.atRest = true;
      });
      draw();
      return () => {
        dead = true;
        ro.disconnect();
        svg.remove();
        pill.remove();
      };
    }

    void (async () => {
      await Promise.all(
        lines.map((l, i) =>
          wait(300 + i * 380)
            .then(() => tw(l, l.rest, 1900, eo))
            .then(() => {
              l.atRest = true;
            }),
        ),
      );
      let k = 0;
      while (!dead) {
        await wait(k === 0 ? 700 : 900);
        if (dead) return;
        const idx = k % FRAMES.length;
        setHeroIdx(idx);
        pill.textContent = LABELS[idx];
        layout();
        const l = lines[k % lines.length];
        l.atRest = false;
        await tw(l, 1, 2800, eio);
        if (dead) return;
        pill.animate(clipIn, {
          duration: 650,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "forwards",
        });
        await wait(650 + 3200);
        if (dead) return;
        pill.animate(clipIn.slice().reverse(), {
          duration: 480,
          easing: "cubic-bezier(.6,0,.8,.4)",
          fill: "forwards",
        });
        await wait(480);
        await tw(l, l.rest, 2400, eio);
        l.atRest = true;
        k++;
      }
    })();

    return () => {
      dead = true;
      ro.disconnect();
      svg.remove();
      pill.remove();
    };
  }, [hostRef, setHeroIdx]);
}
