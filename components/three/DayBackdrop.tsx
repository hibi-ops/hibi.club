"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Canvas is client-only — three.js can't server-render.
const DayCanvas = dynamic(() => import("./DayCanvas"), { ssr: false });

/**
 * Fixed full-viewport 3D backdrop ("a block's day"). Progressive enhancement:
 * renders nothing under prefers-reduced-motion or without WebGL, in which case
 * the page falls back to the calm static homepage. Adds a `hibi-3d` flag to
 * <html> so transparent-section CSS only applies when the world is live.
 */
export default function DayBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    // gentle pastel gradient — show it whenever WebGL exists (don't gate on
    // reduced-motion; the motion is slow). The component itself eases motion.
    if (webgl) {
      document.documentElement.classList.add("hibi-3d");
      setEnabled(true);
    }
    return () => document.documentElement.classList.remove("hibi-3d");
  }, []);

  if (!enabled) return null;

  return (
    <div className="day-canvas" aria-hidden="true">
      <DayCanvas />
    </div>
  );
}
