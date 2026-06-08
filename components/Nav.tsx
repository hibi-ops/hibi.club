"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="hibi-nav">
      <div className="left">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} data-active={isActive(l.href)}>
            {l.label}
          </Link>
        ))}
      </div>
      <Link className="wm" href="/">
        Hibi
      </Link>
      <div className="right">
        <Link className="login" href="#">
          Login
        </Link>
        <Link className="btn btn-primary btn-sm" href="#">
          Start for free
        </Link>
        <Link className="btn btn-glass btn-sm" href="#">
          Book a demo
        </Link>
      </div>
    </nav>
  );
}
