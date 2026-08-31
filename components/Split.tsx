'use client';
import { useState } from 'react';
import type { SplitData } from '@/content/types';

/**
 * One bar, its shares. Pointing at a segment or its key selects the pair —
 * and the headline figure ANSWERS: it cuts, hard, to that share's value. The
 * diagram is an instrument; the total is its display.
 */
export default function Split({ s }: { s: SplitData }) {
  const [on, setOn] = useState<number | null>(null);

  return (
    <div className="split" data-on={on ?? undefined}>
      <div className="split-head">
        <span className="split-total">{on === null ? s.total : s.parts[on].v}</span>
        <span className="split-cap">{on === null ? s.totalLabel : s.parts[on].k}</span>
      </div>
      <div className="split-bar" role="img" aria-label={s.parts.map(p => `${p.k} ${p.v}`).join(', ')}>
        {s.parts.map((p, i) => (
          <span
            key={p.k}
            className={`sg sg-${i}`}
            style={{ flexBasis: `${p.pct}%` }}
            data-dim={on !== null && on !== i ? '' : undefined}
            onPointerEnter={() => setOn(i)}
            onPointerLeave={() => setOn(null)}
          />
        ))}
      </div>
      <dl className="split-keys">
        {s.parts.map((p, i) => (
          <div
            key={p.k}
            data-dim={on !== null && on !== i ? '' : undefined}
            onPointerEnter={() => setOn(i)}
            onPointerLeave={() => setOn(null)}
          >
            <dt><i className={`sk-dot sg-${i}`} aria-hidden="true" />{p.k}</dt>
            <dd>{p.v}</dd>
          </div>
        ))}
      </dl>
      <p className="split-note">{s.note}</p>
    </div>
  );
}
