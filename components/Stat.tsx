import Reveal from "./Reveal";

export default function Stat() {
  return (
    <section className="section stat">
      <div className="wrap">
        <div className="grid">
          <Reveal>
            <div className="display">
              50<span className="u">.</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="ptag">The currency is the visit</div>
            <h2 className="title">
              Fifty <span className="hl2">stamps</span>, and someone is a regular.
            </h2>
            <p className="body">
              Not 100,000 impressions. Not a follower count. Fifty real visits to one place —
              the quietest, truest signal a local business has ever been able to buy.
            </p>
            <p className="say" style={{ fontFamily: "'Shippori Mincho', serif", color: "var(--gray-s)" }}>
              圆，是「日」的最后一笔。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
