"use client";
import { useEffect, useRef } from "react";

/** Premium custom cursor: a dot + a lagging ring that grows over interactive
 *  elements. Fine-pointer only; respects reduced-motion; native cursor on touch. */
export default function Cursor() {
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = matchMedia("(pointer:fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!fine || calm) return;
    document.documentElement.classList.add("has-cursor");

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element)?.closest?.(
        "a,button,[data-cursor],input,.tab",
      );
      if (ring.current) ring.current.dataset.state = t ? "link" : "";
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    addEventListener("pointerover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <span ref={dot} className="cur-dot" aria-hidden="true" />
      <span ref={ring} className="cur-ring" aria-hidden="true" />
    </>
  );
}
