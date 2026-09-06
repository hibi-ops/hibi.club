'use client';
import { useEffect, useRef } from 'react';
import { weave, type Weave } from '@/lib/pattern';

/* The three record tiles, with a hand on them.

   Each answers the cursor in the terms its own construction allows — a Truchet
   subdivides, a moiré turns one of its two line families, a flow field gets a
   deflection added to the field and is re-integrated. The same generic push
   applied to all three would look bolted on to all three. See lib/pattern.ts.

   These are the only patterned tiles left. Six others carried contour fields
   and a particle arc; all of it is gone. Nine drawings over nine gradients was
   noise, and the patterns that survived are the ones on the cards that needed
   a picture. Everywhere else the colour field is enough.

   Paths are mutated by ref inside rAF; running
   this through React state re-rendered the whole set sixty times a second and
   the card stuttered. The listener sits on the card, not on the strip of
   colour, which is otherwise dead most of the time the pointer is in the
   panel. */
const S = 1000;

export default function WeaveLive({ field, ar = 1.2 }:
  { field: Weave; ar?: number }) {
  const host = useRef<HTMLSpanElement>(null);
  const refs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card: HTMLElement = el.closest('.panel') ?? el.parentElement ?? el;

    let hot = 0, target = 0, bx = 0, by = 0, raf = 0;
    const draw = () => {
      const d = weave(field, S, ar, { x: bx, y: by, hot });
      for (let i = 0; i < refs.current.length; i++) refs.current[i]?.setAttribute('d', d[i] ?? '');
    };
    const tick = () => {
      hot += (target - hot) * 0.13;
      if (Math.abs(target - hot) < 0.002) { hot = target; raf = 0; draw(); return; }
      draw(); raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      /* undo the slice transform: the square is scaled by the LONGER side and
         centred on a box of aspect `ar`, so this is where the pointer lands in
         field coordinates */
      const k = Math.max(r.width / ar, r.height);
      bx = ((e.clientX - r.left) - r.width / 2) / (k / 2);
      /* THE CARD'S HEIGHT IS COMPRESSED INTO THE PART YOU CAN SEE. On a
         full-bleed card the field runs the whole panel but its bottom two
         fifths are under the scrim, near-solid so the caption is legible. Mapped
         one to one, moving the cursor over that caption — which is most of
         where a cursor goes — put the disturbance where nothing shows, and the
         card read as dead. The pointer's travel is squeezed into the top ~62%
         instead, so every part of the card drives a part of the drawing you can
         actually watch move. */
      const py = (e.clientY - r.top) / r.height;
      const vis = (0.04 + Math.max(0, Math.min(1, py)) * 0.58) * r.height;
      by = (vis - r.height / 2) / (k / 2);
      target = 1;
      if (still) { hot = 1; draw(); } else { draw(); wake(); }
    };
    const leave = () => { target = 0; if (still) { hot = 0; draw(); } else wake(); };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    };
  }, [field, ar]);

  const rest = weave(field, S, ar);
  return (
    <span ref={host} className="tl-field" aria-hidden="true">
      <svg viewBox={`0 0 ${(S * ar).toFixed(0)} ${S}`}
        preserveAspectRatio="xMidYMid slice" focusable="false">
        {rest.map((p, i) => (
          <path key={i} ref={el => { refs.current[i] = el; }} d={p} />
        ))}
      </svg>
    </span>
  );
}
