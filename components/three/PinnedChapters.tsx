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

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Pinned stage. Each chapter word reveals with a diagonal clip-path wipe while
 * filling from outline to ink (award-grade, not a per-letter stagger), scrubbed
 * by scroll. A mild velocity skew adds kinetic energy.
 */
export default function PinnedChapters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const words = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let lastY = window.scrollY;
    let vel = 0;
    const loop = () => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, track.offsetHeight - vh);
      const p = clamp(-r.top / total);
      vel = clamp((window.scrollY - lastY) / 36, -1, 1);
      lastY = window.scrollY;
      const n = CH.length;
      for (let i = 0; i < n; i++) {
        const el = items.current[i];
        const w = words.current[i];
        if (!el) continue;
        const center = (i + 0.5) / n;
        const vis = clamp(1 - Math.abs(p - center) * n * 1.55);
        const rv = smooth(vis);
        el.style.setProperty("--vis", String(rv));
        if (w) {
          w.style.setProperty("--p", String(rv));
          w.style.setProperty("--skew", String(vel * (1 - rv) * 6));
        }
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
              <Mark size={52} color={c.color} />
            </div>
            <div
              ref={(el) => {
                words.current[i] = el;
              }}
              className="display kw"
              data-text={c.word}
            >
              {c.word}
            </div>
            <p className="subtitle">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
