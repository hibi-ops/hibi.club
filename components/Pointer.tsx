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

      const mark = document.querySelector<HTMLElement>('.hibi-mark');
      if (mark) {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        mark.style.translate = `${nx * -14}px ${ny * -9}px`;
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
