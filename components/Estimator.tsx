'use client';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { Dict } from '@/content/types';
import { series, sum, money, whole, pct1, RATE } from '@/lib/model';

/* ===========================================================================
   THE RATE, FALLING — the merchant estimator.
   ---------------------------------------------------------------------------
   The old one multiplied a bill by 15% by a visit count and printed a monthly
   figure, then apologised underneath: "a real month costs less than this once
   customers come back." That apology is the product. It should be the figure.

   So this prices a YEAR, and draws the blend coming down: month one is 15%
   because every customer is new, and every month after it there are returns
   underneath at 8% and then 4%. The headline number is the rate you actually
   end up paying, which is the only rate that matters and the one no ad
   platform can quote you.

   The third control is the honest one. "How often does a customer come back"
   includes "never" — set it there and the figure sits flat at 15% all year.
   A calculator that cannot produce a bad answer is a poster.
   =========================================================================== */

/* months between return visits; 0 = they never come back */
const CADENCE = [0, 6, 2, 1];

export default function Estimator({ c, formHref }: { c: Dict['pricing']['calc']; formHref: string }) {
  const [bill, setBill] = useState(45);
  const [perMonth, setPerMonth] = useState(25);
  const [cad, setCad] = useState(2);            // default: every other month

  const rows = useMemo(() => series(bill, perMonth, CADENCE[cad]), [bill, perMonth, cad]);
  const last = rows[rows.length - 1];
  const yearSales = sum(rows, 'sales');
  const yearFee = sum(rows, 'fee');
  const blended = yearSales ? yearFee / yearSales : RATE.first;
  /* the cap is a ceiling on the most expensive month — month one, when every
     customer is new — so it never sits under the estimate it came from */
  const cap = Math.max(50, Math.ceil(rows[0].fee / 25) * 25);

  /* the contour field behind this section reads the traffic: fixed contour
     interval, so more walk-ins is literally steeper ground. An event, not a
     prop — the same decoupling as hibi:redeem. */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hibi:relief', { detail: { level: (perMonth - 5) / 195 } }));
  }, [perMonth]);

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
          <output className="est-val">{perMonth}</output>
          <input type="range" min={5} max={200} step={5} value={perMonth}
            onChange={e => setPerMonth(+e.target.value)} aria-label={c.visitsLabel} />
        </label>
      </div>

      {/* A choice, not a dial: the cadence is a fact about your category, and
          the reader either knows it or is about to find out they should.
          Reuses the form's own .seg control rather than inventing a second
          segmented control with opposite manners — the wrapper is named
          .cadence because .seg was already taken (see globals.css). */}
      <fieldset className="cadence">
        <legend className="k-head">{c.returnLabel}</legend>
        <div className="seg" role="group">
          {c.returnOpts.map((o, i) => (
            <button key={o} type="button" aria-pressed={i === cad}
              onClick={() => setCad(i)}>{o}</button>
          ))}
        </div>
      </fieldset>

      <div className="est-out est-out-rate">
        <div className="est-primary">
          <span className="k-head">{c.blendedLabel}</span>
          <output className="est-total est-rate">{pct1(blended)}</output>
          <span className="est-sub">{c.blendedNote}</span>
        </div>

        {/* twelve months, height = that month's blended rate against 15%.
            No axes, no gridlines: a baseline rule and the two months that
            need naming. The staircase is the argument.

            TWO THINGS THE STAIRCASE ALONE DID NOT SAY. It showed twelve bars
            getting shorter, and left the reader to work out both what the
            shortening was worth and what it had to do with the number printed
            beside it.
              — The gap is now empty paper, and it grows left to right. It was
                briefly a pale wash, which was wrong twice over: this
                stylesheet draws money that is not there as nothing or as
                outline, and a chart with a tinted region in it is a dashboard.
              — The blended rate is now a line THROUGH the plot rather than
                only a figure next to it, so you can see where it sits: the
                first months run above the rate you end up paying and the later
                ones below it. It is the same .fig-flat device the creator page
                uses for the flat fee, and it slides when the sliders move. */}
        <figure className="fig">
          <div className="fig-plot" role="img"
            aria-label={`${c.blendedLabel}: ${pct1(rows[0].rate)} → ${pct1(last.rate)}`}>
            {/* the ceiling the bars fall away from. Without it the staircase is
                twelve bars of similar height; with it, the growing gap between
                the rule and the bar is the thing being sold. */}
            <span className="fig-flat fig-ceil" style={{ bottom: '100%' }}>
              <em>{c.ceilLabel}</em>
            </span>
            {/* the label hangs above its rule, so near the ceiling it climbs
                out of the plot and floats over the panel. It needs 21px of
                headroom, which it has below 84% of the ceiling; above that it
                flips and hangs under its own rule instead, where the
                right-hand bars are short enough to leave it room.
                At "never comes back" the blend IS 15%, the two rules land on
                top of each other — which is the honest answer, and the rule
                still draws it — so only the number goes, because the ceiling's
                own label and the headline beside it both already say 15%. */}
            <span className="fig-flat fig-mean"
              data-high={blended / RATE.first > 0.84 ? '' : undefined}
              data-flush={blended / RATE.first > 0.98 ? '' : undefined}
              style={{ bottom: `${(blended / RATE.first) * 100}%` }}>
              <em>{pct1(blended)}</em>
            </span>
            {rows.map(r => (
              <span key={r.m} className="fig-col" style={{ '--i': r.m - 1 } as CSSProperties}>
                <span className="fig-bar" style={{ height: `${(r.rate / RATE.first) * 100}%` }}>
                  <span className="fig-tip">{c.monthAxis.replace('{n}', String(r.m))} · {pct1(r.rate)}</span>
                </span>
              </span>
            ))}
          </div>
          <figcaption className="fig-axis">
            <span>{c.monthAxis.replace('{n}', '1')} · {pct1(rows[0].rate)}</span>
            <span>{c.monthAxis.replace('{n}', '12')} · {pct1(last.rate)}</span>
          </figcaption>
        </figure>
      </div>

      <div className="est-year">
        <span className="k-head">{c.yearLabel}</span>
        <span className="est-year-v">{whole(yearFee)}</span>
        <span className="est-sub">{c.yearNote.replace('{sales}', whole(yearSales))}</span>
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
