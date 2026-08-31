'use client';
import { useState } from 'react';
import type { Dict } from '@/content/types';

const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/* Defaults are a typical first-cohort store, not zeroes. An empty calculator
   asks the visitor to invent two numbers before it will tell them anything;
   a pre-filled one has already answered the question and invites a correction.
   The result is then handed to the form, so the visitor confirms rather than
   re-enters. */
export default function Estimator({ c, formHref }: { c: Dict['merchants']['calc']; formHref: string }) {
  const [bill, setBill] = useState(45);
  const [visits, setVisits] = useState(25);

  const perVisit = bill * 0.15;
  const monthly = perVisit * visits;
  const cap = Math.max(50, Math.round(monthly / 25) * 25);

  return (
    <div className="est">
      <div className="est-controls">
        <label className="est-field">
          <span className="k-head">{c.spendLabel}</span>
          <output className="est-val">{money(bill)}</output>
          <input type="range" min={10} max={200} step={5} value={bill}
            onChange={e => setBill(+e.target.value)} aria-label={c.spendLabel} />
        </label>
        <label className="est-field">
          <span className="k-head">{c.visitsLabel}</span>
          <output className="est-val">{visits}</output>
          <input type="range" min={5} max={200} step={5} value={visits}
            onChange={e => setVisits(+e.target.value)} aria-label={c.visitsLabel} />
        </label>
      </div>

      <div className="est-out">
        <div className="est-primary">
          <span className="k-head">{c.youPayLabel}</span>
          <output className="est-total">{money(monthly)}</output>
          <span className="est-sub">{money(Math.round(perVisit))} {c.perVisitLabel}</span>
        </div>
        {/* The comparison is never shown alone — a number only means something
            against the number the reader already lives with. */}
        <div className="est-compare">
          <span className="k-head">{c.compareLabel}</span>
          <span className="est-alt">{c.compareValue}</span>
          <span className="est-sub">{c.compareNote}</span>
        </div>
      </div>

      <p className="est-note">{c.note}</p>
      {/* query string BEFORE the fragment — `#access?cap=1` puts the pair inside
          the hash, where location.search never sees it */}
      <a className="btn btn-primary btn-lg est-cta" href={`?cap=${cap}${formHref}`}>
        {c.cta} · {money(cap)} <span className="arr" aria-hidden="true">→</span>
      </a>
      <span className="est-cap-note k-head">{c.capLabel}</span>
    </div>
  );
}
