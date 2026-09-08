'use client';
import { useEffect } from 'react';

/**
 * Pointer-driven surface effects, all below the threshold of notice:
 * the 日々 signature drifts against the cursor, and large panels carry a
 * faint travelling sheen. Buttons deliberately do NOT move — a control that
 * leans toward the cursor reads as a toy (user call, see CLAUDE.md).
 */
export default function Pointer() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;

      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;

      const mark = document.querySelector<HTMLElement>('.hibi-mark');
      if (mark) mark.style.translate = `${nx * -14}px ${ny * -9}px`;

      /* The facts card floats a little against the pointer. Same instrument as
         the signature above, second job, and deliberately a smaller throw: the
         mark is texture at 320px and can move 14px without anyone reading it as
         movement, while this one carries type you are trying to read. 8 and 5
         is enough for the card to sit off the page and not enough to chase.
         This is NOT the magnetic hover that was removed for reading as a toy —
         that was a control leaning toward the cursor when you aimed at it.
         Nothing here is clickable and it never leans in; it drifts away, which
         is parallax, and it does it whether or not you are anywhere near. */
      for (const el of document.querySelectorAll<HTMLElement>('.drift')) {
        el.style.translate = `${nx * -8}px ${ny * -5}px`;
      }

      for (const el of document.querySelectorAll<HTMLElement>('.sheen')) {
        const r = el.getBoundingClientRect();
        if (e.clientY < r.top - 120 || e.clientY > r.bottom + 120) { el.style.removeProperty('--sx'); continue; }
        el.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
