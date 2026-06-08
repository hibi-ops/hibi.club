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

/** Pinned stage with kinetic per-letter reveal scrubbed by scroll. */
export default function PinnedChapters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const letterSets = items.current.map((el) =>
      el ? Array.from(el.querySelectorAll<HTMLElement>(".pin-l")) : [],
    );
    let raf = 0;
    const loop = () => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, track.offsetHeight - vh);
      const p = clamp(-r.top / total);
      const n = CH.length;
      for (let i = 0; i < n; i++) {
        const el = items.current[i];
        if (!el) continue;
        const center = (i + 0.5) / n;
        const vis = clamp(1 - Math.abs(p - center) * n * 1.7);
        el.style.setProperty("--vis", String(vis));
        const letters = letterSets[i];
        const L = letters.length || 1;
        for (let li = 0; li < letters.length; li++) {
          const stagger = (li / L) * 0.55;
          const lv = clamp((vis - stagger) / (1 - stagger || 1));
          const e = letters[li];
          e.style.opacity = String(lv);
          e.style.transform = `translateY(${((1 - lv) * 0.5).toFixed(3)}em) rotate(${((1 - lv) * 6).toFixed(2)}deg)`;
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
              <Mark size={56} color={c.color} />
            </div>
            <div className="display kin-word">
              {Array.from(c.word).map((ch, ci) => (
                <span key={ci} className="pin-l">
                  {ch}
                </span>
              ))}
            </div>
            <p className="subtitle">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
