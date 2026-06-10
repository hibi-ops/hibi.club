import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hibi is membership infrastructure for local commerce — belonging, not transactions. Built block by block on four ideas: Daily, Quiet, Real, Local.",
};

const PILLARS = [
  {
    k: "Daily",
    h: "The regular, not the occasion.",
    p: "Hibi is built for the place you go on an ordinary Tuesday — not the once-a-year splurge. Belonging is a habit, measured one day at a time.",
  },
  {
    k: "Quiet",
    h: "Anti-spam by design.",
    p: "No points to farm, no spam, no spin-to-win. The membership stays in the background until it matters. Kinfolk, not Groupon.",
  },
  {
    k: "Real",
    h: "Verified physical visits.",
    p: "A footstep at the register, not a tracked click. What gets counted actually happened — presence you can stand behind.",
  },
  {
    k: "Local",
    h: "Block by block.",
    p: "We don't enter cities; we enter blocks. One register, one regular, one corner at a time — until a neighbourhood is on the books.",
  },
];

const IS = [
  "Verified-visit attribution for physical commerce",
  "A quiet membership layer customers actually want",
  "A measurable, payable signal: “I'm a regular here”",
  "Belonging, finally on the books",
];

const IS_NOT = [
  "A loyalty stamp-card app",
  "A creator-marketing platform",
  "A coupon or delivery app",
  "A foot-traffic analytics tool",
  "Web3 / token loyalty",
];

function Minus() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 12h12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="08"
        eyebrow="About"
        title={
          <>
            We don't enter cities. We enter{" "}
            <span className="hl green">blocks.</span>
          </>
        }
        subtitle="Day by day. Block by block."
        lead={
          <>
            Hibi is the verified-visit membership layer for local commerce. The
            promise is belonging, not transactions — making “I'm a regular here”
            a real, payable, beautiful thing.
          </>
        }
      />

      <Section tone="paper">
        <div className="manifesto">
          <p className="subtitle">The mechanic is the metaphor.</p>
          <p className="body">
            Each scan stamps one day — 日. Fifty days at a place, and you're a
            regular. The product logic and the brand story are the same thing: a
            quiet record of where you keep showing up, and a way for those
            places to pay for the regulars they earn.
          </p>
          <p className="manifesto-cjk">日々、ひとつずつ。</p>
        </div>
      </Section>

      <Section>
        <div className="section-head head-row">
          <div className="eyebrow">What we believe</div>
          <div>
            <h2 className="title">Four ideas, one practice.</h2>
            <p className="subtitle">The discipline behind every screen.</p>
          </div>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div key={p.k} className="pillar">
              <div className="k">{p.k}</div>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="section-head head-row">
          <div className="eyebrow">Anti-positioning</div>
          <div>
            <h2 className="title">What Hibi is — and isn't.</h2>
          </div>
        </div>
        <div className="isnot">
          <div className="card">
            <h4 className="isnot-h">Hibi is</h4>
            <ul className="isnot-list is">
              {IS.map((i) => (
                <li key={i}>
                  <Check />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h4 className="isnot-h muted">Hibi is not</h4>
            <ul className="isnot-list isnt">
              {IS_NOT.map((i) => (
                <li key={i}>
                  <Minus />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="divider">Built block by block ·</div>

      <Section className="cta-band">
        <h2 className="title">Become someone's hibi.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
