export default function Footer() {
  return (
    <footer className="hibi-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-cta">
            <h3 className="title">
              Become someone&apos;s <span style={{ fontStyle: "italic" }}>hibi</span>.
            </h3>
            <div className="row">
              <a className="btn btn-primary" href="#">Start for free</a>
              <a className="btn btn-glass" href="#">Book a demo</a>
            </div>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Product</h4>
              <a href="#">For creators</a>
              <a href="#">For merchants</a>
              <a href="#">For customers</a>
              <a href="#">Pricing</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
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
