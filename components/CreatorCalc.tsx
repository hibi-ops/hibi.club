'use client';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { Dict } from '@/content/types';
import { series, money, whole } from '@/lib/model';

/* ===========================================================================
   THE CROSSOVER — the creator calculator.
   ---------------------------------------------------------------------------
   A creator's real question is not "how much per customer". It is "is this
   better than the flat fee I already get". So the figure answers that one,
   with the creator's own rate as an input.

   Two things race across twelve months: a flat fee, paid once and flat forever
   after, and Hibi's line, which climbs every month because the customers from
   March keep coming back in December. The month they cross is printed.

   THE FLAT FEE IS A SLIDER, and it goes to $2,000. Put a big number in and the
   crossover moves out or stops happening, and the figure says so in plain
   words. That is the only version of this comparison worth showing: a creator
   with a real rate card will test it against their real rate within about four
   seconds, and a chart that cannot lose is a chart they stop trusting.
   =========================================================================== */

export default function CreatorCalc({ c, href }: { c: Dict['creators']['calc']; href: string }) {
  const [bill, setBill] = useState(45);
  const [perMonth, setPerMonth] = useState(20);
  const [flat, setFlat] = useState(300);

  const rows = useMemo(() => series(bill, perMonth, 2), [bill, perMonth]);

  /* cumulative creator earnings, month by month */
  const cume = useMemo(() => {
    let s = 0;
    return rows.map(r => (s += r.earn));
  }, [rows]);

  const total = cume[cume.length - 1];
  const peak = Math.max(total, flat);
  const crossIdx = cume.findIndex(v => v >= flat);        // -1 = never, inside a year
  const crossed = crossIdx >= 0;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hibi:relief', { detail: { level: (perMonth - 5) / 115 } }));
  }, [perMonth]);

  return (
    <div className="est">
      <div className="est-controls est-controls-3">
        <label className="est-field">
          <span className="k-head">{c.billLabel}</span>
          <output className="est-val">{money(bill)}</output>
          <input type="range" min={10} max={200} step={5} value={bill}
            onChange={e => setBill(+e.target.value)} aria-label={c.billLabel} />
        </label>
        <label className="est-field">
          <span className="k-head">{c.visitsLabel}</span>
          <output className="est-val">{perMonth}</output>
          <input type="range" min={5} max={120} step={5} value={perMonth}
            onChange={e => setPerMonth(+e.target.value)} aria-label={c.visitsLabel} />
        </label>
        {/* the reader's own rate card, against us */}
        <label className="est-field est-field-alt">
          <span className="k-head">{c.flatLabel}</span>
          <output className="est-val">{whole(flat)}</output>
          <input type="range" min={50} max={2000} step={50} value={flat}
            onChange={e => setFlat(+e.target.value)} aria-label={c.flatLabel} />
        </label>
      </div>

      <div className="est-out est-out-rate">
        <div className="est-primary">
          <span className="k-head">{crossed ? c.crossLabel : c.crossNeverLabel}</span>
          <output className="est-total">
            {crossed ? c.crossMonth.replace('{n}', String(crossIdx + 1)) : c.crossNever}
          </output>
          <span className="est-sub">
            {c.yearLabel.replace('{hibi}', whole(total)).replace('{flat}', whole(flat))}
          </span>
        </div>

        {/* twelve columns, cumulative. The flat fee is one horizontal rule
            across the whole plot, because that is exactly what it is: paid
            once, then never again. */}
        <figure className="fig">
          <div className="fig-plot" role="img"
            aria-label={`${c.hibiLabel}: ${whole(total)} · ${c.flatSeriesLabel}: ${whole(flat)}`}>
            <span className="fig-flat fig-flat-l" style={{ bottom: `${(flat / peak) * 100}%` }}>
              <em>{c.flatSeriesLabel} · {whole(flat)}</em>
            </span>
            {/* the mark turns sky the month the running total passes the fee,
                so the first blue mark IS the crossover the headline names and
                the distance it has climbed above the rule is legible on the
                ruler. No key to read, and nothing coded that the picture does
                not already show. */}
            {rows.map((r, i) => (
              <span key={r.m} className="fig-col" data-over={cume[i] >= flat ? '' : undefined}
                style={{ '--i': i } as CSSProperties}>
                <span className="fig-bar" style={{ height: `${(cume[i] / peak) * 100}%` }}>
                  <span className="fig-tip">{c.monthAxis.replace('{n}', String(r.m))} · {whole(cume[i])}</span>
                </span>
              </span>
            ))}
          </div>
          <figcaption className="fig-axis">
            <span>{c.monthAxis.replace('{n}', '1')}</span>
            <span>{c.hibiLabel} · {whole(total)}</span>
          </figcaption>
        </figure>
      </div>

      <p className="est-note">{c.note}</p>
      <a className="btn btn-primary btn-lg est-cta" href={href}>
        {c.cta} <span className="arr" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
