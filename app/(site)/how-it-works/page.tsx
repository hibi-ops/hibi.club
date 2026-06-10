import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A creator posts a place, a customer scans at the register, and the merchant pays only for that verified visit.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">How it works</div>
        <h1 className="title">
          Post. Scan. <span className="hl">Belong.</span>
        </h1>
        <p className="subtitle">One visit at a time.</p>
        <p className="lead">
          A creator posts a place worth showing up for, and a customer scans a
          QR at the register when they do. The merchant pays for that verified
          visit only — never for impressions.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <h2 className="title">The rail, in three steps</h2>
          <p className="lead">
            The currency is the visit. Nothing else counts.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="k">01</div>
            <h4>A creator posts a place</h4>
            <p>
              An editorial recommendation, not an ad. A place worth walking to,
              posted by someone who actually goes.
            </p>
          </div>
          <div className="step">
            <div className="k">02</div>
            <h4>A customer scans at the register</h4>
            <p>
              One scan stamps one day (日). No app gymnastics, no points maze —
              just proof you showed up.
            </p>
          </div>
          <div className="step">
            <div className="k">03</div>
            <h4>The merchant pays for that visit only</h4>
            <p>
              No impressions, no reach, no vanity metrics. A verified footstep
              is the only thing on the bill.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="section-head">
          <h2 className="title">What the stamps add up to</h2>
          <p className="lead">Verified visits, not vanity metrics.</p>
        </div>
        <div className="grid-3">
          <div className="card">
            <h4>50 days</h4>
            <p>
              Fifty stamped days at one place and you become a regular — earned
              one visit at a time, never bought.
            </p>
          </div>
          <div className="card">
            <h4>One colour per place</h4>
            <p>
              Every place has its own colour-coded membership. Your card fills
              with the colours of where you actually go.
            </p>
          </div>
          <div className="card">
            <h4>No impressions</h4>
            <p>
              Only footsteps. Starting in Williamsburg, NYC — built block by
              block.
            </p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">See it on your block.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
