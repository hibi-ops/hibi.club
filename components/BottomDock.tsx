"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

/** iOS 26 liquid-glass floating dock, bottom-center. Hides on scroll-down,
 *  reveals on scroll-up; complements the top nav. */
export default function BottomDock() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true); // hidden in the hero by default

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // never alongside the top nav in the hero (one menu at a time);
      // past the hero it appears on scroll-up, hides on scroll-down
      setHidden(y < window.innerHeight * 0.85 || y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`dock ${hidden ? "dock--hidden" : ""}`}
      aria-label="Quick navigation"
    >
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="dock-item"
          data-active={active(l.href)}
        >
          {l.label}
        </Link>
      ))}
      <Link href="#" className="dock-cta">
        Start for free
      </Link>
    </nav>
  );
}
