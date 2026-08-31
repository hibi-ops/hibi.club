'use client';
import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/types';

type Row = { who: string; meta: string; amt: string; fee: string };

/**
 * The settlement card, running. Every few seconds the next redemption from the
 * same sample week slides in at the top — the figure shows the record
 * accumulating, which is the product, instead of a frozen screenshot of it.
 *
 * Honesty constraints: the rows all come from the one labelled sample week and
 * the weekly footer total never changes (the visible four are excerpts of the
 * 23, not the whole sum). It pauses under the pointer so it can be read, and
 * never starts at all under prefers-reduced-motion — the static card was
 * already complete.
 */
export default function LedgerLive({ c }: { c: Dict['home']['ledgerCard'] }) {
  const all = useRef<Row[]>([...c.rows, ...c.pool]);
  const [head, setHead] = useState(0);           // index of the newest visible row
  const [live, setLive] = useState(false);
  const hover = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setLive(true);
    const id = setInterval(() => {
      if (!hover.current && !document.hidden) setHead(h => (h + 1) % all.current.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const n = all.current.length;
  const rows = Array.from({ length: 4 }, (_, i) => all.current[(head - i + n * 2) % n]);

  return (
    <figure
      className="ledger-card sheen"
      onPointerEnter={() => { hover.current = true; }}
      onPointerLeave={() => { hover.current = false; }}
    >
      <div className="ledger-head">
        <span className="k">
          {live && <i className="pulse" aria-hidden="true" />}
          {c.label}
        </span>
        <span className="v">{c.period}</span>
      </div>
      <div className="ledger-rows" aria-live="off">
        {rows.map((r, i) => (
          /* key by identity+position-in-week so an arriving row remounts and
             plays its entry once; the others reuse their nodes and just shift */
          <div className="lrow" key={`${(head - i + n * 2) % n}`} data-fresh={live && i === 0 ? '' : undefined}>
            <span className="lsrc">
              <span className="src">{r.who}</span>
              <span className="meta">{r.meta}</span>
            </span>
            <span className="lamt">
              <span className="amt">{r.amt}</span>
              <span className="fee">{r.fee}</span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="ledger-foot">
        <span className="t">{c.totalLabel}</span>
        <span className="n">{c.total}</span>
      </figcaption>
    </figure>
  );
}
