import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A creator posts a place, a customer scans at the register, and the merchant pays only for that verified visit.",
};

const FAQ_ITEMS = [
  {
    q: "How does verification work?",
    // TODO(jiaming): publish the full verification specifics (device checks, scan windows, fraud handling).
    a: "A customer scans a QR at the register — at the counter, at the moment they pay. That scan is the proof of presence, and it is the only signal Hibi bills against. The full verification spec — device checks, scan windows, fraud handling — publishes alongside the launch.",
  },
  {
    q: "What counts as a visit?",
    a: "One scan stamps one day (日). Scan twice on the same day at the same place and it still counts once — the unit is the day you showed up, not the number of times you tapped. Fifty stamped days at one place, and you're a regular.",
  },
  {
    q: "What do merchants actually pay?",
    // TODO(jiaming): confirm per-visit pricing and billing cadence for the Brooklyn launch.
    a: "Merchants pay only for verified visits — never for impressions, reach, or clicks. If nobody walks in, the bill is zero. Per-visit pricing is confirmed with each block as it goes live.",
  },
  {
    q: "Is my data sold?",
    a: "No. Hibi is quiet by design: no feed of your movements, no audience profiles brokered to third parties. Your stamps belong to you and the places you go — that's the whole point.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        index="01"
        eyebrow="How it works"
        title={
          <>
            Post. Scan. <span className="hl">Belong.</span>
          </>
        }
        subtitle="The currency is the visit."
        lead="A creator posts a place worth walking to. A customer scans a QR at the register when they show up. The merchant pays for that verified visit only — never for impressions."
      />

      {/* 2 — The rail, in three steps */}
      <Section tone="paper">
        <Reveal className="section-head head-row">
          <div className="eyebrow">The rail</div>
          <div>
            <h2 className="title">Three steps, one footstep</h2>
            <p className="lead">
              No points maze, no coupon theatre. Just proof that someone showed
              up — and a bill that only exists because they did.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="steps stagger">
            <div className="step">
              <div className="k">01 — Creator</div>
              <h4>A creator posts a place</h4>
              <p>
                An editorial recommendation, not an ad. A place worth showing up
                for, posted by someone who actually goes — and signed with their
                name.
              </p>
            </div>
            <div className="step">
              <div className="k">02 — Customer</div>
              <h4>A customer scans at the register</h4>
              <p>
                One scan at the counter stamps one day (日). That&apos;s the
                whole ritual: walk in, scan, done. The visit is the receipt.
              </p>
            </div>
            <div className="step">
              <div className="k">03 — Merchant</div>
              <h4>The merchant pays for that visit only</h4>
              <p>
                Verified visits, not vanity metrics. No reach, no impressions,
                no estimated audiences — a real footstep is the only line on the
                bill.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 3 — One colour per place / Fifty days to regular */}
      <Section>
        <Reveal className="split">
          <div>
            <div className="eyebrow" style={{ color: "var(--green)" }}>
              Membership
            </div>
            <h2 className="title">One colour per place</h2>
            <p className="body">
              Every place on Hibi has exactly one colour, and every stamp you
              earn there carries it. Your card fills with the colours of where
              you actually go — a quiet map of your block, not a wallet of
              coupons.
            </p>
            <ul className="split-list">
              <li>
                <Check />
                <span>
                  Each place picks a single colour — it never changes.
                </span>
              </li>
              <li>
                <Check />
                <span>
                  Your stamps stack by place, never blended or pooled.
                </span>
              </li>
              <li>
                <Check />
                <span>No tiers to game, no points to convert — just days.</span>
              </li>
            </ul>
            <div
              className="say"
              style={{ borderLeft: "2px solid var(--green)" }}
            >
              Where regulars belong.
            </div>
          </div>
          <div
            className="split-media"
            style={{
              background: "color-mix(in srgb, var(--green) 12%, var(--snow))",
            }}
          >
            <Mark size={132} color="var(--green)" />
          </div>
        </Reveal>

        <Reveal className="split reverse">
          <div>
            <div className="eyebrow" style={{ color: "var(--sky)" }}>
              The threshold
            </div>
            <h2 className="title">Fifty days to regular</h2>
            <p className="body">
              A regular isn&apos;t a badge you buy — it&apos;s a habit the
              register can count. One scan is one day. Fifty stamped days at one
              place, and the place knows you the way the corner always has: by
              showing up.
            </p>
            <ul className="split-list">
              <li>
                <Check />
                <span>1 scan = 1 day (日) — same-day repeats count once.</span>
              </li>
              <li>
                <Check />
                <span>50 days at one place makes you a regular there.</span>
              </li>
              <li>
                <Check />
                <span>Earned one visit at a time. Never purchasable.</span>
              </li>
            </ul>
          </div>
          <div className="stat-panels">
            <TiltCard className="stat-panel stat-num">
              <div className="display">
                <CountUp to={50} />
                <span style={{ color: "var(--sky)" }}>.</span>
              </div>
              <p className="stat-cap">
                stamped days, and you&apos;re a regular
              </p>
            </TiltCard>
            <div className="stat-panel stat-chip">
              <p className="say">
                Not 100,000 impressions. Fifty real visits to one place.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 4 — FAQ */}
      <Section tone="paper">
        <Reveal className="section-head head-row">
          <div className="eyebrow">Questions</div>
          <div>
            <h2 className="title">The fine print, out loud</h2>
            <p className="lead">
              Quiet by design — including how the mechanics work.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <FAQ items={FAQ_ITEMS} />
        </Reveal>
      </Section>

      {/* 5 — Closing band */}
      <Section className="cta-band">
        <h2 className="title">
          See it on your <span className="hl">block.</span>
        </h2>
        <p className="lead">
          Starting in Brooklyn, NYC — built block by block.
        </p>
        <Magnetic>
          <CTAPair center />
        </Magnetic>
      </Section>
    </>
  );
}
