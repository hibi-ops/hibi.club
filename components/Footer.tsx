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
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { label: "For creators", href: "/solutions#creator" },
      { label: "For customers", href: "/solutions#customer" },
      { label: "For merchants", href: "/solutions#merchant" },
      // TODO(jiaming): restore "Gift a membership" once the feature exists
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Trust report", href: "/trust" },
      { label: "Cities we serve", href: "/explore" },
      { label: "Security", href: "/security" },
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
              <Link className="btn btn-primary" href="/signup">
                Start for free
              </Link>
              <Link className="btn btn-glass" href="/contact">
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
          {/* TODO(jiaming): add Cookies / Accessibility pages when they exist */}
          <div className="foot-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
            <Link href="/trust">Trust</Link>
          </div>
          <div className="foot-meta">
            <span className="foot-status">
              <span className="dot" /> All systems normal
            </span>
            <span>NYC · EN</span>
            <span>© 2026 Hibi</span>
          </div>
          {/* TODO(jiaming): add social links (IG / TikTok / X / LinkedIn) once the accounts exist */}
          <div className="foot-social">
            <Link href="/journal">Journal</Link>
            <Link href="/explore">Explore</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
