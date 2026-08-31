'use client';
import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/types';

/**
 * The sample week as a tape, not a sentence. Three figures count up when the
 * row scrolls into view, and the loop demo below writes into them: running a
 * redemption ticks walk-ins to 24 and adds its $10.20 to the week — the demo
 * and the tally are the same record, which is the entire pitch.
 */
export default function WeekStats({ s }: { s: Dict['home']['how']['stats'] }) {
  const host = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);            // count-up progress; 1 = settled
  const [extra, setExtra] = useState(0);    // demo redemptions landed this visit

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        /* rAF hands us the frame's start time, which can precede the
           performance.now() we captured — clamp low or the ease goes negative
           and the tape briefly reads "-1 walk-ins" */
        const x = Math.min(1, Math.max(0, (t - t0) / 900));
        setP(1 - (1 - x) ** 3);            // ease-out — figures settle, not slam
        if (x < 1) raf = requestAnimationFrame(tick);
      };
      setP(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const up = () => setExtra(x => x + 1);
    const down = () => setExtra(x => Math.max(0, x - 1));
    window.addEventListener('hibi:redeem', up);
    window.addEventListener('hibi:reset', down);
    return () => { window.removeEventListener('hibi:redeem', up); window.removeEventListener('hibi:reset', down); };
  }, []);

  const walkins = Math.round(s.walkins * p) + extra;
  const fee = s.fee * p + extra * 10.2;
  const max = Math.max(...s.spark) + 1;

  return (
    <div className="wkstats" ref={host}>
      {/* seven days of the same week — the shape of the record, 28px tall */}
      <svg className="wk-spark" viewBox="0 0 62 28" aria-hidden="true">
        {s.spark.map((v, i) => {
          const bump = i === s.spark.length - 1 ? extra : 0;
          const h = ((v + bump) / max) * 24;
          return <rect key={i} x={i * 9} y={28 - h} width="6" height={h} rx="1.5"
            className={bump ? 'wk-bar wk-bar-hot' : 'wk-bar'} />;
        })}
      </svg>
      <div className="wk-stat">
        <span className="wk-n" data-hot={extra > 0 ? '' : undefined}>{walkins}</span>
        <span className="k-head">{s.walkinsLabel}</span>
      </div>
      <div className="wk-stat">
        <span className="wk-n wk-n-dim">{s.postsLabel}</span>
        <span className="k-head">&nbsp;</span>
      </div>
      <div className="wk-stat">
        <span className="wk-n wk-fee" data-hot={extra > 0 ? '' : undefined}>
          ${fee.toFixed(2)}
        </span>
        <span className="k-head">{s.feeLabel}</span>
      </div>
    </div>
  );
}
