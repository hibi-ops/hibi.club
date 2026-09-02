'use client';
import { useEffect, useState } from 'react';
import type { Dict } from '@/content/types';

/* every figure carries cents: the product's claim is that each dollar reads
   back to a person at the counter, so its own calculator does not round */
const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const whole = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
/* half-up on the half-cent, not toFixed's binary truncation */
const unit = (n: number) => '$' + (Math.round(n * 100 + 1e-6) / 100).toFixed(2);

/* Defaults are a typical first-cohort store, not zeroes. An empty calculator
   asks the visitor to invent two numbers before it will tell them anything;
   a pre-filled one has already answered the question and invites a correction.
   The result is then handed to the form, so the visitor confirms rather than
   re-enters. */
export default function Estimator({ c, formHref }: { c: Dict['pricing']['calc']; formHref: string }) {
  const [bill, setBill] = useState(45);
  const [visits, setVisits] = useState(25);

  const perVisit = bill * 0.15;
  const monthly = perVisit * visits;
  /* the cap is a ceiling, so it rounds UP to the next $25 — never below the
     estimate it came from. The CTA says so. */
  const cap = Math.max(50, Math.ceil(monthly / 25) * 25);

  /* The walk-ins figure drives the contour field behind this section: fixed
     contour interval, so more traffic is literally steeper ground. Published
     as an event rather than a prop so the renderer stays decoupled — the same
     shape as hibi:redeem. */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hibi:relief', {
      detail: { level: (visits - 5) / 195 },
    }));
  }, [visits]);

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
          <span className="est-sub">{unit(perVisit)} {c.perVisitLabel}</span>
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
        {c.cta} · {whole(cap)} <span className="arr" aria-hidden="true">→</span>
      </a>
      <span className="est-sub">{c.capNote}</span>
      <span className="est-cap-note k-head">{c.capLabel}</span>
    </div>
  );
}
