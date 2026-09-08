'use client';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import Tile from './Tile';
import type { Dict } from '@/content/types';
import { RATE, money, whole } from '@/lib/model';

/* ===========================================================================
   THE CAMPAIGN, COMPOSED — the merchant page's figure.
   ---------------------------------------------------------------------------
   This section used to be four paragraphs describing the four things a store
   sets. It was the only page on the site with nothing to touch, and it was
   describing a form the reader is about to fill in — so let them fill it in.

   But the reason it earns a figure is the reframe, not the interaction. A
   store owner sets a cap in dollars because that is how every ad platform has
   ever asked the question. This product's whole claim is that the unit is a
   person, so the readout is a headcount: $600 is not a budget, it is
   eighty-eight people through the door.

   And then the second bar makes the pricing table land in the owner's own
   units. The same $600 buys 88 first visits, 166 returns, or 333 visits by
   regulars — because the rate falls. That is 15/8/4 stated as purchasing
   power instead of as three percentages, and it is the one place on the site
   where a merchant can see what the falling rate is actually worth to them.

   It does not repeat the other two figures: pricing's estimator is the rate
   over TIME, the creator's is against a flat fee. This one is the cap over
   PEOPLE. Same instrument family (.est controls, .seg cadence, .fig bars),
   third job.
   =========================================================================== */

/* campaign length in months; 0 = left open */
const LENGTHS = [0.5, 1, 3, 0];

export default function CampaignSetup({ c }: { c: Dict['merchants']['set'] }) {
  const [bill, setBill] = useState(45);
  const [cap, setCap] = useState(600);
  const [len, setLen] = useState(1);

  /* how many visits of each kind the same cap pays for */
  const rows = useMemo(() => ([
    { k: c.tiers.first, rate: RATE.first, n: Math.floor(cap / (bill * RATE.first)) },
    { k: c.tiers.ret, rate: RATE.ret, n: Math.floor(cap / (bill * RATE.ret)) },
    { k: c.tiers.regular, rate: RATE.regular, n: Math.floor(cap / (bill * RATE.regular)) },
  ]), [bill, cap, c]);

  const first = rows[0].n;
  const widest = rows[rows.length - 1].n || 1;
  const months = LENGTHS[len];
  const open = months === 0;

  /* the contour field behind this section reads the headcount, the same way
     the other two calculators drive it — fixed contour interval, so more
     people is steeper ground */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hibi:relief', { detail: { level: Math.min(1, first / 200) } }));
  }, [first]);

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
          <span className="k-head">{c.capLabel}</span>
          <output className="est-val">{whole(cap)}</output>
          <input type="range" min={100} max={4000} step={50} value={cap}
            onChange={e => setCap(+e.target.value)} aria-label={c.capLabel} />
        </label>
      </div>

      <fieldset className="cadence">
        <legend className="k-head">{c.lengthLabel}</legend>
        <div className="seg" role="group">
          {c.lengths.map((o, i) => (
            <button key={o} type="button" aria-pressed={i === len}
              onClick={() => setLen(i)}>{o}</button>
          ))}
        </div>
      </fieldset>

      <div className="est-out est-out-rate">
        {/* THE ANSWER TAKES THE COLOUR; THE CONTROLS KEEP THE PAPER.
            Everything in this panel used to sit at one weight — two sliders, a
            segmented control, the headcount and a paragraph, all on the same
            white. Squinting at it, nothing came forward, and the one thing the
            section exists to say ("your cap is a number of PEOPLE") was the
            middle item in a list. The field marks the answer and nothing else.
            The bars stay on white beside it: figures on gradients were tried
            in the tiles and removed for reading as science fiction, and that
            verdict holds here — a number is not a diagram. */}
        <div className="est-primary est-lit">
          <Tile n={3} className="est-lit-bg" />
          <span className="k-head">{c.peopleLabel}</span>
          <output className="est-total est-rate">{first.toLocaleString('en-US')}</output>
          <span className="est-sub">{c.perNote.replace('{each}', money(bill * RATE.first))}</span>
        </div>

        {/* Horizontal, because the quantity being compared is a headcount and
            a headcount reads along a line.
            SPLIT WHERE THE FIRST-VISIT RATE RUNS OUT. It was monochrome on the
            argument that the length says everything — but three grey bars of
            three lengths do not say WHY the lower two are longer, and that is
            the only thing this figure is for. So each bar is graphite up to
            what the same cap buys at the first-visit rate, and sky past it:
            the blue is the extra people the falling rate pays for. The first
            row has no blue, because it is the baseline the other two are
            measured against.
            Same device and same meaning as the creator plot's surplus cap and
            the pricing plot's tint — one accent, one thing it means, three
            figures. */}
        <figure className="fig">
          <ul className="barset">
            {rows.map((r, i) => (
              <li key={r.k} className="barset-row" style={{ '--i': i } as CSSProperties}>
                <span className="barset-k">{r.k}</span>
                <span className="barset-track">
                  <span className="barset-bar" style={{ width: `${(r.n / widest) * 100}%` }}>
                    {r.n > first && (
                      <span className="barset-over" aria-hidden="true"
                        style={{ '--base': `${(first / r.n) * 100}%` } as CSSProperties} />
                    )}
                  </span>
                </span>
                <span className="barset-n">{r.n.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ul>
          <figcaption className="fig-axis fig-axis-1">
            <span>{c.stretch
              .replace('{a}', money(bill * RATE.first))
              .replace('{b}', money(bill * RATE.regular))}</span>
          </figcaption>
        </figure>
      </div>

      {/* Outline, not solid: a ceiling that may never be touched, drawn the
          way the site draws money that is not there.
          An open-ended campaign HAS no total ceiling, so it does not get to
          print one — it showed the bare cap under a label reading "most this
          campaign can cost", which is a number we would have had to honour. */}
      <div className="est-year">
        <span className="k-head">{open ? c.exposureOpenLabel : c.exposureLabel}</span>
        <span className="est-year-v est-hollow">{whole(open ? cap : cap * months)}</span>
        <span className="est-sub">{open ? c.exposureOpenNote : c.exposureNote}</span>
      </div>

      <p className="est-note">{c.note}</p>
    </div>
  );
}
