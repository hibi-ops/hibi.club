import Reveal from "./Reveal";

/** The 50-days stat as a cluster of glass panels (air.inc layout language:
 *  copy lives INSIDE panels, several panels composed together). */
export default function Stat() {
  return (
    <section className="section stat">
      <div className="wrap">
        <div className="stat-panels">
          <Reveal className="stat-panel stat-num">
            <div className="display">
              50<span className="u">.</span>
            </div>
            <p className="stat-cap">days, and you&apos;re a regular</p>
          </Reveal>

          <Reveal className="stat-panel stat-copy">
            <div className="ptag">The currency is the visit</div>
            <h2 className="title">
              Fifty <span className="hl2">stamps</span>, and someone is a
              regular.
            </h2>
            <p className="body">
              Not 100,000 impressions. Not a follower count. Fifty real visits
              to one place — the quietest, truest signal a local business has
              ever been able to buy.
            </p>
          </Reveal>

          <Reveal className="stat-panel stat-chip">
            <p
              className="say"
              style={{ fontFamily: "'Shippori Mincho', serif" }}
            >
              圆，是「日」的最后一笔。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
