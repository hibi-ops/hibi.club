"use client";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";

/** Fade-up on scroll into view. Wrap any block: <Reveal as="h2" className="title">…</Reveal> */
export default function Reveal({
  children,
  as: Tag = "div" as ElementType,
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // createElement (not JSX) so a generic ElementType isn't subjected to the
  // three.js intrinsic-children inference that @react-three/fiber adds globally.
  return createElement(
    Tag,
    {
      ref: ref as any,
      className: `reveal ${className}`,
      "data-in": shown,
      style,
    },
    children,
  );
}
