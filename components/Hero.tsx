import Mark from "./Mark";

export default function Hero() {
  return (
    <header className="hero">
      <div className="eyebrow">The quiet membership your block already runs</div>
      <h1 className="title">
        Become someone&apos;s <span className="hl">hibi.</span>
      </h1>
      <p className="subtitle">Where regulars belong.</p>
      <p className="lead">
        Creator posts. Customer scans at the register. You pay only for verified store
        visits — never impressions.
      </p>
      <div className="hero-cta">
        <a className="btn btn-primary" href="#">Start for free</a>
        <a className="btn btn-glass" href="#">Book a demo</a>
      </div>

      <div className="float">
        <div className="phone">
          <div className="ph-top">Tuesday · June 7 · morning</div>
          <div className="ph-greet">Good morning, Mia</div>
          <div className="ph-card">
            <Mark size={76} color="#52b6dd" style={{ flex: "none" }} />
            <div>
              <div className="ph-name">Oslo Coffee</div>
              <div className="ph-day">日 47 / 50</div>
              <div className="ph-note">3 more days to regular</div>
            </div>
          </div>
          <div className="ph-sec">Your hibis</div>
          <div className="ph-li">
            <Mark size={22} color="#4bc78f" />
            <span className="n">Idlewild Books</span>
            <span className="d">Day 12</span>
          </div>
          <div className="ph-li">
            <Mark size={22} color="#f079a6" />
            <span className="n">Rosette Wine Bar</span>
            <span className="d">Day 29</span>
          </div>
          <div className="ph-cta">Find your next hibi</div>
        </div>
      </div>
    </header>
  );
}
