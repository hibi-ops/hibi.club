import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hibi-footer">
      <div className="wrap">
        <div className="foot-top">
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
          <div className="foot-links">
            <div className="foot-col">
              <h4>Product</h4>
              <Link href="/features">Features</Link>
              <Link href="/solutions#creator">For creators</Link>
              <Link href="/solutions#merchant">For merchants</Link>
              <Link href="/solutions#customer">For customers</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>
        </div>

        <div className="foot-word">
          Hibi
          <span className="foot-dots">
            <span style={{ background: "var(--sky)" }} />
            <span style={{ background: "var(--pink)" }} />
            <span style={{ background: "var(--green)" }} />
            <span style={{ background: "var(--orange)" }} />
          </span>
        </div>

        <div className="foot-base">
          <span>Hibi — Where regulars belong.</span>
          <span>Built block by block · NYC · 2026</span>
        </div>
      </div>
    </footer>
  );
}
