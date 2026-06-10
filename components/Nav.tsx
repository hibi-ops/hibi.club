"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Mark from "./Mark";

type Item = { title: string; sub: string; color: string; href: string };

const FEATURES: Item[] = [
  {
    title: "Verified visit",
    sub: "A visit, not a view",
    color: "var(--sky)",
    href: "/features",
  },
  {
    title: "QR at the register",
    sub: "Scanned at the counter",
    color: "var(--orange)",
    href: "/features",
  },
  {
    title: "Color-coded membership",
    sub: "One colour per place you belong",
    color: "var(--green)",
    href: "/features",
  },
  {
    title: "Merchant payout",
    sub: "Your regulars, on the books",
    color: "var(--pink)",
    href: "/features",
  },
];

const SOLUTIONS: Item[] = [
  {
    title: "For creators",
    sub: "Stamp your hibi",
    color: "var(--pink)",
    href: "/solutions#creator",
  },
  {
    title: "For customers",
    sub: "Belong without trying",
    color: "var(--sky)",
    href: "/solutions#customer",
  },
  {
    title: "For merchants",
    sub: "Pay only when they hibi",
    color: "var(--orange)",
    href: "/solutions#merchant",
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<null | "features" | "solutions">(null);
  const [fIdx, setFIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (m: "features" | "solutions") => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(m);
  };
  const hideSoon = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 130);
  };
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const featPreview = FEATURES[fIdx];

  return (
    <div className="nav-wrap">
      <nav className="hibi-nav">
        <div className="left">
          <button
            className="nav-trigger"
            data-open={open === "features"}
            onMouseEnter={() => show("features")}
            onFocus={() => show("features")}
          >
            Features
          </button>
          <button
            className="nav-trigger"
            data-open={open === "solutions"}
            onMouseEnter={() => show("solutions")}
            onFocus={() => show("solutions")}
          >
            Solutions
          </button>
          <Link
            href="/pricing"
            data-active={isActive("/pricing")}
            onMouseEnter={() => setOpen(null)}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            data-active={isActive("/about")}
            onMouseEnter={() => setOpen(null)}
          >
            About
          </Link>
        </div>

        <Link className="wm" href="/" onMouseEnter={() => setOpen(null)}>
          Hibi
        </Link>

        <div className="right">
          <Link className="login" href="/dashboard">
            Login
          </Link>
          <Link className="btn btn-primary btn-sm" href="/signup">
            Start for free
          </Link>
          <Link className="btn btn-glass btn-sm" href="/contact">
            Book a demo
          </Link>
        </div>
      </nav>

      {open && (
        <div
          className="mega"
          data-menu={open}
          onMouseEnter={() => show(open)}
          onMouseLeave={hideSoon}
        >
          {open === "features" && (
            <div className="mega-inner mega-feat">
              <div className="mega-list">
                <div className="mega-eyebrow">Features</div>
                {FEATURES.map((it, i) => (
                  <Link
                    key={it.title}
                    href={it.href}
                    className="mega-item"
                    data-on={fIdx === i}
                    onMouseEnter={() => setFIdx(i)}
                  >
                    <span className="mega-ic">
                      <Mark size={22} color={it.color} />
                    </span>
                    <span>
                      <span className="mega-it-title">{it.title}</span>
                      <span className="mega-it-sub">{it.sub}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div
                className="mega-preview"
                style={{
                  background: `color-mix(in srgb, ${featPreview.color} 16%, var(--snow))`,
                }}
              >
                <Mark size={108} color={featPreview.color} />
                <div className="mega-preview-cap">
                  <span className="mega-it-title">{featPreview.title}</span>
                  <span className="mega-it-sub">{featPreview.sub}</span>
                </div>
              </div>
            </div>
          )}

          {open === "solutions" && (
            <div className="mega-inner mega-sol">
              <div className="mega-list">
                <div className="mega-eyebrow">Solutions</div>
                {SOLUTIONS.map((it, i) => (
                  <Link
                    key={it.title}
                    href={it.href}
                    className="mega-item"
                    data-on={sIdx === i}
                    onMouseEnter={() => setSIdx(i)}
                  >
                    <span className="mega-ic">
                      <Mark size={22} color={it.color} />
                    </span>
                    <span>
                      <span className="mega-it-title">{it.title}</span>
                      <span className="mega-it-sub">{it.sub}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mega-card">
                <div
                  className="mega-card-art"
                  style={{
                    background: `color-mix(in srgb, ${SOLUTIONS[sIdx].color} 18%, var(--snow))`,
                  }}
                >
                  <Mark size={64} color={SOLUTIONS[sIdx].color} />
                </div>
                <div className="mega-card-title">
                  Hibi for{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      fontFamily: "'Magvix',serif",
                    }}
                  >
                    chains
                  </span>
                </div>
                <p className="mega-card-body">
                  Multi-location membership, SSO, and custom contracts for
                  groups.
                </p>
                <Link href="/solutions" className="btn btn-glass btn-sm">
                  Learn more
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
