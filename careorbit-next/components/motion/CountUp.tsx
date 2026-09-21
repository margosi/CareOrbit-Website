"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* Replaces motion.js's countUp().
 *
 * Ported value-for-value from v2-maven:
 *   - text is split with /^([^0-9]*)(\d+)([\s\S]*)$/ so a prefix and suffix
 *     ride along unchanged (e.g. "+65% understanding" animates only the 65)
 *   - easing 1 - (1 - t)^3, duration 1300ms
 *   - fires once (__co_counted in the original; a ref here)
 *   - on completion the ORIGINAL string is restored verbatim, so any
 *     formatting the regex did not capture survives
 *
 * Because the final state is the original text, a visitor who never scrolls
 * it into view still sees the correct number. That is why the baseline
 * screenshots are trustworthy without scripted scrolling.
 */
const DURATION_MS = 1300;
const eased = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  children,
  className,
  style,
}: {
  /** The final string, e.g. "65%" or "9-in-10". Rendered as-is on the server. */
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    const original = el.textContent ?? "";
    const m = original.match(/^([^0-9]*)(\d+)([\s\S]*)$/);
    if (!m) return; // no leading integer: leave the text alone, as motion.js did

    const [, pre, digits, suf] = m;
    const target = parseInt(digits, 10);

    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done.current) continue;
          done.current = true;
          io.unobserve(e.target);

          let t0: number | null = null;
          const step = (ts: number) => {
            if (t0 === null) t0 = ts;
            const p = Math.min(1, (ts - t0) / DURATION_MS);
            el.textContent = pre + Math.round(eased(p) * target) + suf;
            if (p < 1) raf = requestAnimationFrame(step);
            else el.textContent = original;
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={ref} data-count="" className={className} style={style}>
      {children}
    </span>
  );
}
