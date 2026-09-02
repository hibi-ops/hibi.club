'use client';
import { useEffect, useState } from 'react';
import type { Dict } from '@/content/types';

/* every figure carries cents: the product's claim is that each dollar reads
   back to a person at the counter, so its own calculator does not round */
const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/* half-up on the half-cent, not toFixed's binary truncation (4.725 → 4.73) */
const unit = (n: number) => '$' + (Math.round(n * 100 + 1e-6) / 100).toFixed(2);

/* Pilot terms, stated once here so the arithmetic is auditable:
   the merchant pays 15% of a first-visit bill and 8% of a return visit;
   the creator keeps 70% of a first-visit commission and 55% of a repeat one
   (PRICING-MODEL-SPEC §1.2). */
const FIRST = 0.15 * 0.70;   // 10.5% of a first-visit bill
const REPEAT = 0.08 * 0.55;  // 4.4% of a return-visit bill
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

  /* The walk-ins figure drives the contour field behind this section: fixed
     contour interval, so more traffic is literally steeper ground. Published
     as an event rather than a prop so the renderer stays decoupled — the same
     shape as hibi:redeem. */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hibi:relief', {
      detail: { level: (visits - 5) / 115 },
    }));
  }, [visits]);

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
