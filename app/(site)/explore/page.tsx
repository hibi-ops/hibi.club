import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse the blocks Hibi runs on — Williamsburg first — and find the places you already love.",
};

export default function ExplorePage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section className="page-hero">
        <Reveal>
          <div className="eyebrow">Explore</div>
          <h1 className="title">
            Find your <span className="hl">hibis.</span>
          </h1>
          <p className="subtitle">The places you already love.</p>
          <p className="lead">
            Hibi is built block by block, starting in Williamsburg. No feed to
            scroll, no points to chase — just your spots, one colour each. Scan
            once at the register and the day is yours.
          </p>
          <CTAPair center />
        </Reveal>
      </Section>

      {/* 2 — Neighbourhoods */}
      <Section tone="paper">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ color: "var(--green)" }}>
            Neighbourhoods
          </div>
          <h2 className="title">Blocks we run on</h2>
          <p className="lead">
            One neighbourhood at a time, on purpose. Quiet by design.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid-3 stagger">
            <TiltCard>
              <div className="card">
                <Mark size={40} color="var(--green)" />
                <h3 className="title">Williamsburg</h3>
                <p className="body">
                  Bedford coffee counters, bagel lines, late-night slices.
                </p>
                <p className="body">
                  Live — TODO(jiaming) confirm launch status
                  <br />
                  places TODO(jiaming)
                </p>
              </div>
            </TiltCard>
            <div className="card">
              <Mark size={40} color="var(--sky)" />
              <h3 className="title">Greenpoint</h3>
              <p className="body">
                One bridge over — Polish bakeries and waterfront cafés.
              </p>
              <p className="body">
                Next
                <br />
                places TODO(jiaming)
              </p>
            </div>
            <div className="card">
              <Mark size={40} color="var(--orange)" />
              <h3 className="title">Bushwick</h3>
              <p className="body">
                Warehouse espresso, taquerias, galleries that double as bars.
              </p>
              <p className="body">
                Soon
                <br />
                places TODO(jiaming)
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 3 — Request your block */}
      <Section>
        <Reveal className="split">
          <div>
            <div className="eyebrow">Not on your street yet?</div>
            <h2 className="title">Request your block</h2>
            <p className="body">
              Hibi grows where regulars already are. Tell us the corner you keep
              coming back to — the coffee shop that knows your order, the bakery
              you defend in arguments — and we&apos;ll bring Hibi there. Built
              block by block.
            </p>
            <ul className="split-list">
              <li>
                <Check /> Name the place you&apos;re already a regular at
              </li>
              <li>
                <Check /> We reach out to the people behind the counter
              </li>
              <li>
                <Check /> You get a note when your block goes live — that&apos;s
                it, no spam
              </li>
            </ul>
            <CTAPair
              primary={{ label: "Request your block", href: "/contact" }}
            />
          </div>
          <div className="split-media">
            <Mark size={120} color="var(--pink)" />
          </div>
        </Reveal>
      </Section>

      {/* 4 — Stats */}
      <Section tone="paper">
        <Reveal>
          <div className="stat-panels">
            <div className="stat-panel">
              <div className="stat-num">
                <span className="display">
                  <CountUp to={1} suffix=" block" />
                </span>
              </div>
              <div className="stat-cap">
                live today — Williamsburg, NYC first
              </div>
            </div>
            <div className="stat-panel">
              <div className="stat-num">
                <span className="display">
                  <CountUp to={50} suffix=" days" />
                </span>
              </div>
              <div className="stat-cap">
                of showing up makes you a regular — 1 scan = 1 day (日)
              </div>
            </div>
            <div className="stat-chip">Day by day. Block by block.</div>
          </div>
        </Reveal>
      </Section>

      {/* 5 — Closing */}
      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Your spots, made membership.</h2>
          <p className="lead">Where regulars belong.</p>
          <Magnetic>
            <CTAPair center />
          </Magnetic>
        </Reveal>
      </Section>
    </>
  );
}
