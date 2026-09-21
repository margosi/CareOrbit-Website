"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* Replaces motion.js's global scroll-reveal observer.
 *
 * v2-maven ran ONE IntersectionObserver plus a MutationObserver that
 * rescanned the DOM for [data-rv] whenever nodes were added, because the
 * dc-runtime mounted content asynchronously. React tells us when a component
 * mounts, so each Reveal owns its observer and the MutationObserver is not
 * needed.
 *
 * Preserved exactly from motion.js:
 *   threshold 0.12, adds the class "in", unobserves after firing (one-shot).
 *
 * The visual transition itself lives in globals.css ([data-rv] / [data-rv].in),
 * including the prefers-reduced-motion override the baseline depends on.
 *
 * NOTE on client-side navigation: v2-maven full-page-loaded on every link, so
 * this logic re-ran for free. Here the effect runs per mount, which is what
 * makes reveals work after an App Router client-side navigation.
 */
type RevealProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Element to render. Defaults to div. */
  as?: "div" | "section" | "header" | "li" | "article" | "span" | "p";
} & Record<`data-${string}`, string | undefined>;

export function Reveal({
  children,
  className,
  style,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support: show content rather than leaving it at opacity 0.
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      data-rv=""
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
