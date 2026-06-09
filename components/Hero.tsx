import Mark from "./Mark";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import LiquidGlass from "./LiquidGlass";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          The quiet membership your block already runs
        </div>
        <h1 className="title kin title-chrome">
          <span className="w">Become</span>{" "}
          <span className="w">someone&apos;s</span>{" "}
          <span className="w" style={{ fontStyle: "italic" }}>
            hibi.
          </span>
        </h1>
        <p className="subtitle">Where regulars belong.</p>
        <p className="lead">
          Creator posts. Customer scans at the register. You pay only for
          verified store visits — never impressions.
        </p>
        <div className="hero-cta">
          <Magnetic>
            <a className="btn btn-primary" href="#">
              Start for free
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-glass" href="#">
              Book a demo
            </a>
          </Magnetic>
        </div>

        <div className="float">
          <TiltCard max={9}>
            <LiquidGlass
              radius={32}
              bezel={22}
              scale={64}
              className="phone-glass"
            >
              <div className="phone">
                <div className="ph-top">Tuesday · June 7 · morning</div>
                <div className="ph-greet">Good morning, Mia</div>
                <div className="ph-card">
                  <Mark size={64} color="var(--sky)" style={{ flex: "none" }} />
                  <div>
                    <div className="ph-name">Oslo Coffee</div>
                    <div className="ph-day">日 47 / 50</div>
                    <div className="ph-note">3 more days to regular</div>
                  </div>
                </div>
                <div className="ph-sec">Your hibis</div>
                <div className="ph-li">
                  <Mark size={22} color="var(--green)" />
                  <span className="n">Idlewild Books</span>
                  <span className="d">Day 12</span>
                </div>
                <div className="ph-li">
                  <Mark size={22} color="var(--pink)" />
                  <span className="n">Rosette Wine Bar</span>
                  <span className="d">Day 29</span>
                </div>
                <div className="ph-cta">Find your next hibi</div>
              </div>
            </LiquidGlass>
          </TiltCard>
        </div>
      </div>

      <div className="hero-scroll">Scroll ↓</div>
    </header>
  );
}
