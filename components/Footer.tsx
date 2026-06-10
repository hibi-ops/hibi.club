import Link from "next/link";
import Reveal from "./Reveal";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
      { label: "Merchant dashboard", href: "/dashboard" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { label: "For creators", href: "/solutions#creator" },
      { label: "For customers", href: "/solutions#customer" },
      { label: "For merchants", href: "/solutions#merchant" },
      { label: "Gift a membership", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "#" },
      { label: "Community guidelines", href: "#" },
      { label: "Cities we serve", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hibi-footer">
      <div className="wrap">
        {/* closing CTA + newsletter */}
        <Reveal className="foot-cta-band">
          <div className="foot-cta">
            <h3 className="title">
              Become someone&apos;s{" "}
              <span style={{ fontStyle: "italic" }}>hibi</span>.
            </h3>
            <div className="row">
              <Link className="btn btn-primary" href="#">
                Start for free
              </Link>
              <Link className="btn btn-glass" href="#">
                Book a demo
              </Link>
            </div>
          </div>
          <div className="foot-news">
            <span className="foot-news-label">
              The quiet newsletter — once a season
            </span>
            <div className="foot-news-row">
              <input
                type="email"
                placeholder="you@yourblock.com"
                aria-label="Email address"
                className="foot-news-input"
              />
              <button
                type="button"
                className="foot-news-btn"
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
            <span className="foot-news-note">
              No spam. Unsubscribe anytime.
            </span>
          </div>
        </Reveal>

        {/* sitemap */}
        <Reveal className="foot-grid">
          {COLUMNS.map((col) => (
            <div className="foot-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </Reveal>

        {/* giant chrome wordmark */}
        <Reveal className="foot-word">
          Hibi
          <span className="foot-dots">
            <span style={{ background: "var(--sky)" }} />
            <span style={{ background: "var(--pink)" }} />
            <span style={{ background: "var(--green)" }} />
            <span style={{ background: "var(--orange)" }} />
          </span>
        </Reveal>

        {/* legal / utility row */}
        <div className="foot-base">
          <div className="foot-legal">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
            <Link href="#">Accessibility</Link>
          </div>
          <div className="foot-meta">
            <span className="foot-status">
              <span className="dot" /> All systems normal
            </span>
            <span>NYC · EN</span>
            <span>© 2026 Hibi</span>
          </div>
          <div className="foot-social">
            <Link href="#" aria-label="Instagram">
              IG
            </Link>
            <Link href="#" aria-label="TikTok">
              TikTok
            </Link>
            <Link href="#" aria-label="X">
              X
            </Link>
            <Link href="#" aria-label="LinkedIn">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
