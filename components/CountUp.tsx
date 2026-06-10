"use client";
import { useEffect, useRef, useState } from "react";

/** Number that counts up (ease-out) when scrolled into view. Style via the
 *  surrounding element (e.g. wrap in .display). */
export default function CountUp({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR/no-JS shows the real number; JS rewinds to 0 and counts up on view
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    setVal(0);
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const loop = (t: number) => {
          const p = Math.min(1, (t - t0) / (duration * 1000));
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
