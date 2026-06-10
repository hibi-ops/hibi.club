import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "How Hibi verifies every visit merchants pay for — QR at the register, one scan per day, anomaly detection, and disputed visits never billed.",
};

const SAFEGUARDS = [
  {
    h: "QR scanned at the register",
    p: "The scan happens at your counter, on your premises, in front of your staff. There is no remote check-in and no geofence guesswork — a billable visit starts with a person physically standing at the register.",
    list: [
      "Scanned on-site, at the point of sale",
      "No remote or drive-by check-ins",
      "Staff see every scan as it happens",
    ],
  },
  {
    h: "One scan per customer per day",
    p: "One scan stamps one day (日). A customer can stamp each place once per day, full stop. Repeat scans the same day collapse into a single visit — you are billed for footsteps, not button presses.",
    list: [
      "1 scan = 1 day, per place, per customer",
      "Same-day repeats count once",
      "Fifty stamped days make a regular — earned, never bought",
    ],
  },
  {
    h: "Anomaly detection on every pattern",
    // TODO(jiaming): describe the verification stack in detail.
    p: "Scan behaviour that does not look like a human walking into a shop is flagged and held before it ever reaches your invoice. The full verification stack publishes alongside the launch.",
    list: [
      "Unusual patterns held out of billing automatically",
      "Reviewed before they can cost you anything",
      // TODO(jiaming): detection methodology summary
      "Methodology summary published with the launch",
    ],
  },
  {
    h: "Disputed visits are never billed",
    p: "Flag a visit and it comes off the invoice while we review — not after. The burden of proof sits with the visit, never with your wallet.",
    list: [
      "Disputes pause billing immediately",
      "Removed first, investigated second",
      "Resolved disputes documented on your statement",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What if someone scans twice in one day?",
    a: "Nothing happens to your bill. One scan stamps one day (日), and a customer can stamp each place once per day — every repeat scan that day collapses into the same single visit. You are charged for the footstep, not for how many times a phone touched the QR.",
  },
  {
    q: "How do refunds work?",
    // TODO(jiaming): publish the refund policy — timelines, the dispute window, and how credits appear on the invoice.
    a: "If a billed visit should not have been billed, it is credited back. The full refund policy — timelines, the dispute window, and how credits appear on the invoice — publishes alongside the launch.",
  },
  {
    q: "Can visits be faked?",
    // TODO(jiaming): detail the full anti-fraud stack.
    a: "We design for defense in depth: the scan must happen at your register, one scan can only ever stamp one day, anomalous patterns are held before billing, and anything you dispute comes off the invoice while we review. No single layer is the whole story. The full anti-fraud stack is documented as each block goes live.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Trust"
        title={
          <>
            Real visits. <span className="hl">Provably.</span>
          </>
        }
        subtitle="Verified visits, not vanity metrics."
        lead="Every line on your Hibi invoice maps to a person who physically stood at your register. No impressions, no estimates, no modelled reach — if you paid for it, it happened."
      />

      <Section tone="paper">
        <Reveal className="section-head">
          <h2 className="title">Four checks before a single cent</h2>
          <p className="body">
            A scan only becomes a billable visit after it clears every
            safeguard. Here is what stands between a tap and your invoice.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid-2 stagger">
            {SAFEGUARDS.map((s) => (
              <div className="card" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                <ul className="split-list">
                  {s.list.map((li) => (
                    <li key={li}>
                      <Check />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="stat-panels">
            <TiltCard className="stat-panel stat-num">
              <div className="display">
                <CountUp to={100} suffix="%" />
              </div>
              <p className="stat-cap">of billed visits are register-scanned</p>
            </TiltCard>

            <div className="stat-panel stat-copy">
              <div className="eyebrow" style={{ color: "var(--orange)" }}>
                The billing rule
              </div>
              <h2 className="title">What you pay for happened.</h2>
              <p className="body">
                Not estimated, not extrapolated, not attributed by a model. A
                verified footstep at your counter is the only thing Hibi will
                ever put on your bill — pay only when they show up.
              </p>
            </div>

            <div className="stat-panel stat-chip">
              {/* TODO(jiaming): publish quarterly trust metrics — scans held, disputes resolved, credits issued. */}
              <p className="say">
                Quarterly trust metrics — scans held, disputes resolved, credits
                issued — will publish right here.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal className="section-head">
          <h2 className="title">Questions merchants ask first</h2>
          <p className="body">
            The short answers, before your accountant asks the long ones.
          </p>
        </Reveal>
        <Reveal>
          <FAQ items={FAQ_ITEMS} />
        </Reveal>
      </Section>

      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Pay only for the footstep.</h2>
          <Magnetic strength={0.12}>
            <CTAPair center />
          </Magnetic>
        </Reveal>
      </Section>
    </>
  );
}
