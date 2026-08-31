'use client';
import { useState } from 'react';
import type { Dict } from '@/content/types';

const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
/* a unit price carries cents: rounding $4.73 to $5 is a 6% lie about the rate */
const unit = (n: number) => '$' + n.toFixed(2);

/* Pilot terms, stated once here so the arithmetic is auditable:
   the merchant pays 15% of a first-visit bill and 8% of a return visit;
   the creator keeps 70% of whichever commission was charged. */
const FIRST = 0.15 * 0.70;   // 10.5% of a first-visit bill
const REPEAT = 0.08 * 0.70;  // 5.6% of a return-visit bill
const RETURNS = 2;           // assumed returns per customer inside the window

/**
 * The creator's side of the merchant estimator: the same two sliders, the same
 * pre-filled defaults, the other end of the same transaction.
 *
 * The second figure is the one that makes this product different from a flat
 * fee — a post keeps paying for twelve months — so it is shown beside the
 * first, and the assumption behind it is printed rather than buried.
 */
export default function CreatorCalc({ c, href }: { c: Dict['creators']['calc']; href: string }) {
  const [bill, setBill] = useState(45);
  const [visits, setVisits] = useState(20);

  const perVisit = bill * FIRST;
  const month = perVisit * visits;
  const trailing = bill * REPEAT * RETURNS * visits;

  return (
    <div className="est">
      <div className="est-controls">
        <label className="est-field">
          <span className="k-head">{c.billLabel}</span>
          <output className="est-val">{money(bill)}</output>
          <input type="range" min={10} max={200} step={5} value={bill}
            onChange={e => setBill(+e.target.value)} aria-label={c.billLabel} />
        </label>
        <label className="est-field">
          <span className="k-head">{c.visitsLabel}</span>
          <output className="est-val">{visits}</output>
          <input type="range" min={5} max={120} step={5} value={visits}
            onChange={e => setVisits(+e.target.value)} aria-label={c.visitsLabel} />
        </label>
      </div>

      <div className="est-out">
        <div className="est-primary">
          <span className="k-head">{c.firstLabel}</span>
          <output className="est-total">{money(month)}</output>
          <span className="est-sub">{unit(perVisit)} {c.perVisitLabel}</span>
        </div>
        {/* the trailing figure is the argument; it is set smaller because it is
            an estimate resting on a stated assumption, not a rate */}
        <div className="est-compare">
          <span className="k-head">{c.trailLabel}</span>
          <span className="est-alt est-alt-earn">+{money(trailing)}</span>
          <span className="est-sub">{c.trailNote}</span>
        </div>
      </div>

      <p className="est-note">{c.note}</p>
      <a className="btn btn-primary btn-lg est-cta" href={href}>
        {c.cta} <span className="arr" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
