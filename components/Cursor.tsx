'use client';
import { useEffect } from 'react';

/**
 * One ink dot, following at a lag; it grows into a ring over anything that
 * answers the pointer. mix-blend-difference keeps it legible on every ground —
 * ink on paper, paper on ink — with a single colour.
 *
 * The native cursor is hidden only while this one is alive (fine pointers,
 * motion allowed). Text inputs keep the caret cursor: a writing tool should
 * look like one.
 */
const HOT = 'a,button,[role="button"],summary,input[type="range"],.shot,.lrow,.rate,.srow,.sg,.split-keys>div';

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.documentElement.classList.add('has-cursor');

    let x = -100, y = -100, tx = -100, ty = -100;
    let raf = 0;
    let hot = false, down = false, seen = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform =
        `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${down ? 0.7 : hot ? 1 : 1})`;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!seen) { seen = true; x = tx; y = ty; dot.style.opacity = '1'; }
      /* a pointer event's target can be window or document (synthetic
         dispatches, edge cases) — only Elements have closest() */
      const t = e.target instanceof Element ? e.target : null;
      const nowHot = !!t?.closest(HOT);
      if (nowHot !== hot) { hot = nowHot; dot.classList.toggle('cursor-hot', hot); }
      // over text fields the caret cursor matters more than the gesture
      const typing = !!t?.closest('input:not([type="range"]),textarea,select');
      dot.classList.toggle('cursor-off', typing);
    };
    const onDown = () => { down = true; };
    const onUp = () => { down = false; };
    const onLeave = () => { dot.style.opacity = '0'; seen = false; };
    const onEnter = () => { dot.style.opacity = '1'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      dot.remove();
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return null;
}
