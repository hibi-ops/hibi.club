"use client";
import { useEffect, useMemo, useRef } from "react";
import { scrollState } from "@/lib/scroll";

/**
 * lesse-style scroll reveal: words fill from gray to ink as you scroll through
 * the [from, to] slice of page progress. Updates the DOM directly (no per-frame
 * React re-render).
 */
export default function ScrollFillText({
  text,
  from = 0,
  to = 0.12,
  className = "",
}: {
  text: string;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("span[data-w]"));
    const n = spans.length;
    let raf = 0;
    const loop = () => {
      const p = Math.max(
        0,
        Math.min(1, (scrollState.progress - from) / (to - from)),
      );
      for (let i = 0; i < n; i++) {
        const wp = Math.max(0, Math.min(1, p * n - i));
        spans[i].style.opacity = String(0.26 + 0.74 * wp);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [from, to]);

  return (
    <p ref={ref} className={`fill-text ${className}`.trim()}>
      {words.map((w, i) => (
        <span key={i} data-w style={{ opacity: 0.26 }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
