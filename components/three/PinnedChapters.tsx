"use client";
import { useEffect, useRef } from "react";
import Mark from "../Mark";

const CH = [
  {
    eyebrow: "01 — Morning",
    color: "var(--sky)",
    word: "VISIT",
    sub: "A creator posts the matcha shop on the corner. Someone walks in the next morning. The day begins with a real footstep — not a click.",
  },
  {
    eyebrow: "02 — Midday",
    color: "var(--orange)",
    word: "STAMP",
    sub: "At the register, they scan. One day, stamped. The merchant pays only for this — a verified visit, not an impression.",
  },
  {
    eyebrow: "03 — Dusk",
    color: "var(--green)",
    word: "BELONG",
    sub: "Fifty days in, they're a regular — and they belong to this block, measurably. The day closes. Tomorrow, another stamp. 日々.",
  },
];

/** Pinned stage: the chapter stays fixed while VISIT/STAMP/BELONG scrub-crossfade. */
export default function PinnedChapters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const loop = () => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, track.offsetHeight - vh);
      const p = Math.max(0, Math.min(1, -r.top / total));
      const n = CH.length;
      for (let i = 0; i < n; i++) {
        const el = items.current[i];
        if (!el) continue;
        const center = (i + 0.5) / n;
        const vis = Math.max(0, 1 - Math.abs(p - center) * n * 1.7);
        el.style.opacity = String(vis);
        el.style.transform = `scale(${(0.92 + 0.08 * vis).toFixed(3)}) translateY(${((1 - vis) * 24).toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={trackRef} className="pin-track">
      <div className="pin-stage">
        {CH.map((c, i) => (
          <div
            key={c.word}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="pin-item"
          >
            <div className="eyebrow">{c.eyebrow}</div>
            <div className="ch-seal">
              <Mark size={56} color={c.color} />
            </div>
            <div className="display">{c.word}</div>
            <p className="subtitle">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
