'use client';
import { useEffect, useRef, useState } from 'react';
import type { Dict, Step } from '@/content/types';

type Phase = 'idle' | 'walking' | 'opening' | 'done';

/* The mystery box is the product's own mechanic, so the demo rolls real odds:
   most visits win a slice of the bill, a rare one wins all of it. Rolled at
   click time — the prerendered page carries no random state. */
function roll(): { amt: string; jackpot: boolean } {
  const r = Math.random();
  if (r < 0.06) return { amt: '−$68.00', jackpot: true };
  if (r < 0.40) return { amt: '−$3.40', jackpot: false };
  if (r < 0.78) return { amt: '−$6.80', jackpot: false };
  return { amt: '−$13.60', jackpot: false };
}

export default function WalkIn({ steps, d }: { steps: Step[]; d: Dict['home']['how']['demo'] }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [prize, setPrize] = useState<{ amt: string; jackpot: boolean } | null>(null);
  /* idle preview: the customer walks to whichever stage the pointer reads */
  const [peek, setPeek] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const post = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    if (phase !== 'idle') return;
    const p = roll();
    setPrize(p);
    setPhase('walking');                                   // the dot sets off
    timers.current.push(setTimeout(() => setPhase('opening'), 460));
    timers.current.push(setTimeout(() => {
      setPhase('done');                                    // box opens, dot walks on
      window.dispatchEvent(new CustomEvent('hibi:redeem'));
    }, 1150));
  };
  const reset = () => {
    setPhase('idle'); setPrize(null);
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

  // the customer dot rides the path: station centres sit at 1/6, 3/6, 5/6.
  // While idle it previews the journey, following the column under the pointer.
  const STOPS = ['16.66%', '50%', '83.33%'];
  const dotLeft = phase === 'idle' ? STOPS[peek ?? 0]
    : phase === 'walking' || phase === 'opening' ? STOPS[1] : STOPS[2];

  return (
    <div className="wi" data-phase={phase}>
      <div className="wi-top">
        <span className="k-head">{d.label}</span>
        <span className="wi-hint">{d.hint}</span>
      </div>

      <div className="wi-stage">
        <div className="wi-path" aria-hidden="true" />
        {[0, 1, 2].map(i => <i key={i} className={`wi-node wi-node-${i}`} aria-hidden="true" />)}
        <i className="wi-cust" style={{ left: dotLeft }} aria-hidden="true" />

        <div className="wi-cols">
          {/* 1 · the post */}
          <div className="wi-col" onPointerEnter={() => setPeek(0)} onPointerLeave={() => setPeek(null)}>
            <span className="wi-ord" aria-hidden="true">01</span>
            <h3 className="wi-t">{steps[0].title}</h3>
            <div className="wi-post" ref={post} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="wi-handle">@mika.eats</span>
              <span className="wi-code" data-spent={phase === 'done' ? '' : undefined}>{d.code}</span>
            </div>
            <p className="wi-cap">{steps[0].body}</p>
          </div>

          {/* 2 · the counter */}
          <div className="wi-col" onPointerEnter={() => setPeek(1)} onPointerLeave={() => setPeek(null)}>
            <span className="wi-ord" aria-hidden="true">02</span>
            <h3 className="wi-t">{steps[1].title}</h3>
            <div className="wi-ticket">
              <span className="wi-amt"
                data-void={phase === 'done' && prize?.jackpot ? '' : undefined}>{d.amount}</span>
              <div className="wi-act">
                {phase === 'done' && prize ? (
                  <span className={`wi-prize${prize.jackpot ? ' wi-jackpot' : ''}`} role="status">
                    <b>{prize.amt}</b> {prize.jackpot ? d.jackpotCap : d.rewardCap}
                  </span>
                ) : (
                  <>
                    <button type="button" className="btn btn-primary wi-btn" onClick={run}
                      disabled={phase !== 'idle'}>
                      {phase === 'idle' ? d.redeem : d.opening}
                    </button>
                    <span className="wi-box" data-wait={phase === 'opening' ? '' : undefined}
                      aria-hidden="true">?</span>
                  </>
                )}
              </div>
            </div>
            <p className="wi-cap">{steps[1].body}</p>
          </div>

          {/* 3 · the bill */}
          <div className="wi-col" onPointerEnter={() => setPeek(2)} onPointerLeave={() => setPeek(null)}>
            <span className="wi-ord" aria-hidden="true">03</span>
            <h3 className="wi-t">{steps[2].title}</h3>
            <div className={`wi-bill${phase === 'done' ? '' : ' wi-bill-empty'}`}
              data-on={phase === 'done' ? '' : undefined} role={phase === 'done' ? 'status' : undefined}>
              {phase === 'done' && <span className="chip-new">{d.billNew}</span>}
              <span className="wi-bill-who">{phase === 'done' ? d.billWho : '— · —'}</span>
              <span className="wi-bill-fee">{phase === 'done' ? d.billFee : '$0.00'}</span>
            </div>
            <p className="wi-cap">{steps[2].body}</p>
          </div>
        </div>
      </div>

      {phase === 'done' && (
        <button type="button" className="btn btn-text wi-again" onClick={reset}>
          {d.again} <span className="arr" aria-hidden="true">↺</span>
        </button>
      )}
    </div>
  );
}
