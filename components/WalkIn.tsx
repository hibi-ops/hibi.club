'use client';
import { useEffect, useRef, useState } from 'react';
import type { Dict, Step } from '@/content/types';

/* ===========================================================================
   THE WALK-IN STAGE — the same customer, five times over.
   ---------------------------------------------------------------------------
   The old version ran one redemption and stopped. It showed the mechanic but
   not the model: a reader could play it ten times and still not learn the one
   thing the whole business rests on — that the rate FALLS as a customer turns
   into a regular, and that nothing was ever prepaid.

   So the demo has a memory now. Press it again and the same person comes back:
   15% → 8% → 8% → 4% → 4%. The tier badge steps down in front of you and the
   ledger accumulates underneath. That is the pricing table, discovered by hand
   instead of read.

   Three more things the rewrite is carrying:

   · ONE OBJECT MAKES THE WHOLE TRIP. A code chip rides the rail from the post
     to the counter, and at the counter it becomes a receipt, and at settlement
     it becomes a ledger line. Same token, three forms — which is exactly the
     claim ("one scan writes the record"), so the animation is the argument.

   · THE REWARD IS A FIRST-VISIT THING, per the deck. Visit one draws real odds
     (usually a slice of the bill, rarely all of it). Returns get points and
     better odds instead. So run two is different in KIND, not just cheaper.

   · A REGULAR IS FASTER. Visit one waits on the box opening; a return skips
     that beat entirely. The regular's redemption is visibly quicker at the
     counter, because it is.

   The bills are the hero ledger card's own rows ($68.00/$10.20, $41.50/$3.32,
   $28.00/$1.12). Play the demo and you write the lines you already scrolled
   past — the card at the top of the page is this, run five times.
   =========================================================================== */

type Tier = 'first' | 'return' | 'regular';
type Phase = 'idle' | 'walking' | 'opening' | 'settled';
type Line = { n: number; bill: number; tier: Tier; rate: number; fee: number };

/* Product logic, not copy: the arithmetic has to be right in both languages,
   so the numbers live here and only their labels come from content/. */
const VISITS: { bill: number; tier: Tier; rate: number }[] = [
  { bill: 68.0, tier: 'first', rate: 0.15 },
  { bill: 41.5, tier: 'return', rate: 0.08 },
  { bill: 52.0, tier: 'return', rate: 0.08 },
  { bill: 28.0, tier: 'regular', rate: 0.04 },
  { bill: 33.0, tier: 'regular', rate: 0.04 },
];

const money = (n: number) => `$${n.toFixed(2)}`;
const inView = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.top >= 0 && r.bottom <= (window.innerHeight || 0);
};
const pct = (r: number) => `${Math.round(r * 100)}%`;

/* First visit only. Real odds — most take a slice off, one in sixteen takes
   the whole bill and hollows the figure to outline (the site's mark of
   absence, the same one the creator's $0 wears in the problem section). */
function drawReward(bill: number) {
  const r = Math.random();
  if (r < 0.06) return { amt: bill, jackpot: true };
  if (r < 0.44) return { amt: Math.round(bill * 5) / 100, jackpot: false };
  if (r < 0.8) return { amt: Math.round(bill * 10) / 100, jackpot: false };
  return { amt: Math.round(bill * 20) / 100, jackpot: false };
}

/* Commission counts up to its value rather than appearing at it: a figure that
   settles reads as computed, a figure that blinks in reads as typed. */
function useCountUp(target: number, run: boolean) {
  const [v, setV] = useState(0);
  const raf = useRef(0);
  const snap = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (!run) { setV(0); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setV(target); return; }
    const t0 = performance.now(), from = v, span = 520;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / span);
      setV(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    /* requestAnimationFrame is throttled to a crawl in a background tab, under
       iOS Low Power Mode, and behind a busy WebGL canvas — and this section
       has one running under it. Measured at 1fps the counter sat on $0.00 for
       seconds while the post card beside it already read the real total. This
       figure is money on a page whose whole claim is that the money adds up,
       so if the frames do not arrive the number still has to. */
    snap.current = setTimeout(() => { cancelAnimationFrame(raf.current); setV(target); }, span + 140);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(snap.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, run]);
  return v;
}

export default function WalkIn({ steps, d }: { steps: Step[]; d: Dict['home']['how']['demo'] }) {
  const [i, setI] = useState(0);                 // which visit we are on
  const [phase, setPhase] = useState<Phase>('idle');
  const [prize, setPrize] = useState<{ amt: number; jackpot: boolean } | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [peek, setPeek] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const post = useRef<HTMLDivElement>(null);
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const v = VISITS[Math.min(i, VISITS.length - 1)];
  const isFirst = v.tier === 'first';
  const fee = Math.round(v.bill * v.rate * 100) / 100;
  const total = lines.reduce((s, l) => s + l.fee, 0);
  const shownTotal = useCountUp(total, lines.length > 0);
  const LAST = VISITS.length - 1;
  const exhausted = i >= VISITS.length;
  const settled = phase === 'settled';
  const finished = settled && i >= LAST;

  const run = () => {
    if (phase !== 'idle' || exhausted) return;
    const p = isFirst ? drawReward(v.bill) : null;
    setPrize(p);
    setPhase('walking');
    /* A first visit waits on the box; a regular does not. The return path is
       ~40% shorter, which is the point being made. */
    const walk = 420;
    const open = isFirst ? 620 : 0;
    if (isFirst) timers.current.push(setTimeout(() => setPhase('opening'), walk));
    timers.current.push(setTimeout(() => {
      setPhase('settled');
      setLines(ls => [{ n: i + 1, bill: v.bill, tier: v.tier, rate: v.rate, fee }, ...ls].slice(0, 5));
      window.dispatchEvent(new CustomEvent('hibi:redeem', { detail: { jackpot: !!p?.jackpot } }));
      /* Stacked on a phone, the three columns are one long scroll: the reader
         taps Redeem and the line it writes lands ~300px below the fold, so the
         demo's whole payoff happens off-screen. Bring the ledger to them —
         block:'nearest' means this is a no-op on any viewport where the
         settlement column was already visible, which is every desktop. */
      const el = out.current;
      if (el && !inView(el)) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      }
    }, walk + open));
  };

  const next = () => { setI(n => n + 1); setPhase('idle'); setPrize(null); };
  const restart = () => {
    setI(0); setPhase('idle'); setPrize(null); setLines([]);
    window.dispatchEvent(new CustomEvent('hibi:reset'));
  };

  /* the post card leans toward the pointer — it wants to be picked up */
  const tilt = (e: React.PointerEvent) => {
    const el = post.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(560px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg)`;
  };
  const untilt = () => { if (post.current) post.current.style.transform = ''; };

  /* The token rides the rail: station centres sit at 1/6, 3/6, 5/6. Idle, it
     previews the journey by following whichever column the pointer is over. */
  const STOPS = ['16.66%', '50%', '83.33%'];
  const at = phase === 'idle' ? (peek ?? 0) : phase === 'settled' ? 2 : 1;

  const customerPays = prize ? Math.max(0, v.bill - prize.amt) : v.bill;

  return (
    <div className="wi" data-phase={phase}>
      <div className="wi-top">
        <span className="k-head">{d.label}</span>
        <span className="wi-hint">{lines.length === 0 ? d.hint : d.hintBack}</span>
      </div>

      <div className="wi-stage">
        <div className="wi-path" aria-hidden="true" />
        {[0, 1, 2].map(n => (
          <i key={n} className={`wi-node wi-node-${n}`} data-on={at >= n ? '' : undefined} aria-hidden="true" />
        ))}
        {/* one object, three forms: the chip that becomes a receipt that
            becomes a ledger line. It is the only thing that moves. */}
        <span className="wi-token" style={{ left: STOPS[at] }} data-phase={phase} aria-hidden="true">
          {d.code}
        </span>

        <div className="wi-cols">
          {/* 1 · the post ------------------------------------------------ */}
          <div className="wi-col" onPointerEnter={() => setPeek(0)} onPointerLeave={() => setPeek(null)}>
            <h3 className="wi-t">{steps[0].title}</h3>
            <div className="wi-post" ref={post} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="wi-handle">{d.handle}</span>
              <span className="wi-code" data-spent={settled ? '' : undefined}>{d.code}</span>
              {/* the SAME animated figure as the ledger foot. These were two
                  sources — money(total) here, money(shownTotal) there — so for
                  the length of every count-up the page showed a creator credited
                  $13.52 next to a settlement of $10.17. On a site arguing that
                  every dollar reads back to a person, two totals is the one
                  inconsistency that costs the argument. */}
              <span className="wi-credit">
                {lines.length > 0 ? `${money(shownTotal)} ${d.credited}` : d.uncredited}
              </span>
            </div>
            <p className="wi-cap">{steps[0].body}</p>
          </div>

          {/* 2 · the counter --------------------------------------------- */}
          <div className="wi-col" onPointerEnter={() => setPeek(1)} onPointerLeave={() => setPeek(null)}>
            <h3 className="wi-t">{steps[1].title}</h3>

            <div className="wi-ticket">
              <span className="wi-amt" data-void={settled && prize?.jackpot ? '' : undefined}>
                {money(v.bill)}
              </span>

              {/* the receipt prints a line at a time, in reading order */}
              <div className="wi-rcpt" data-on={settled ? '' : undefined} role={settled ? 'status' : undefined}>
                {settled && prize && (
                  <span className="wi-rline" style={{ '--i': 0 } as React.CSSProperties}>
                    <em>{prize.jackpot ? d.jackpotCap : d.rewardLabel}</em>
                    <b>−{money(prize.amt)}</b>
                  </span>
                )}
                {settled && !prize && (
                  <span className="wi-rline" style={{ '--i': 0 } as React.CSSProperties}>
                    <em>{d.rewardLabel}</em><b className="wi-loyal">{d.loyalty}</b>
                  </span>
                )}
                {settled && (
                  <span className="wi-rline wi-rpays" style={{ '--i': 1 } as React.CSSProperties}>
                    <em>{d.paysLabel}</em><b>{money(customerPays)}</b>
                  </span>
                )}
                {/* A jackpot puts $0.00 next to a $10.20 commission, which is
                    the one number in this demo a sharp reader will stop on.
                    Better the demo says it than that they catch it. */}
                {settled && prize?.jackpot && (
                  <span className="wi-jnote" style={{ '--i': 2 } as React.CSSProperties}>{d.jackpotNote}</span>
                )}
              </div>

              {!settled && (
                <div className="wi-act">
                  {/* three phases, three labels. The old code said "Opening…"
                      for anything not idle, so a return visit — which draws no
                      reward at all, as the line beside the button says — spent
                      its whole walk claiming a box was opening. */}
                  <button type="button" className="btn btn-primary wi-btn" onClick={run}
                    disabled={phase !== 'idle'}>
                    {phase === 'idle' ? d.redeem : phase === 'opening' ? d.opening : d.confirming}
                  </button>
                  {isFirst && (
                    <span className="wi-box" data-wait={phase === 'opening' ? '' : undefined} aria-hidden="true">?</span>
                  )}
                  <span className="wi-sec">{isFirst ? d.secFirst : d.secBack}</span>
                </div>
              )}
            </div>
            <p className="wi-cap">{steps[1].body}</p>
          </div>

          {/* 3 · settlement ---------------------------------------------- */}
          <div className="wi-col" ref={out} onPointerEnter={() => setPeek(2)} onPointerLeave={() => setPeek(null)}>
            <h3 className="wi-t">{steps[2].title}</h3>

            <div className="wi-ledger">
              {lines.length === 0 && <span className="wi-empty">{d.empty}</span>}
              {lines.map(l => (
                <span key={l.n} className="wi-lrow">
                  <span className="wi-ltier" data-t={l.tier}>{pct(l.rate)}</span>
                  <span className="wi-lwho">{d.handle} · {d.tiers[l.tier]}</span>
                  <span className="wi-lbill">{money(l.bill)}</span>
                  <span className="wi-lfee">{money(l.fee)}</span>
                </span>
              ))}
              {lines.length > 0 && (
                <span className="wi-lfoot">
                  <span>{d.ledgerFoot.replace('{n}', String(lines.length))}</span>
                  <b>{money(shownTotal)}</b>
                </span>
              )}
            </div>
            <p className="wi-cap">{steps[2].body}</p>
          </div>
        </div>
      </div>

      {/* "Same customer, next visit" used to survive the fifth settlement, and
          clicking it landed the reader on a greyed-out Redeem button beside the
          fifth bill with nothing to explain it. There is no sixth visit, so the
          offer of one is the bug — not the dead end it leads to. */}
      <div className="wi-foot">
        {settled && !finished && (
          <button type="button" className="btn btn-text wi-again" onClick={next}>
            {d.again} <span className="arr" aria-hidden="true">→</span>
          </button>
        )}
        {lines.length > 0 && (
          <button type="button" className="btn btn-text wi-over" onClick={restart}>
            {d.over} <span className="arr" aria-hidden="true">↺</span>
          </button>
        )}
        {lines.length > 0 && (
          <span className="wi-note" data-done={finished ? '' : undefined}>
            {finished ? d.doneNote : d.rateNote}
          </span>
        )}
      </div>
    </div>
  );
}
