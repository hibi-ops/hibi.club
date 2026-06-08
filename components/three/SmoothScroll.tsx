"use client";
import type { ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { scrollState } from "@/lib/scroll";

/** Reports Lenis scroll progress into the shared singleton (no re-render). */
function ScrollReporter() {
  useLenis((lenis) => {
    scrollState.progress = lenis.progress ?? 0;
    scrollState.velocity = lenis.velocity ?? 0;
  });
  return null;
}

/** Wraps the page in smooth (Lenis) scrolling and reports progress for the 3D scene. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}
    >
      <ScrollReporter />
      {children}
    </ReactLenis>
  );
}
