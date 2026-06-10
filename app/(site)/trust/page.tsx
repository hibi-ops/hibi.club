import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "How Hibi verifies every visit merchants pay for — QR at the register, one scan per day, anomaly detection, and disputed visits never billed.",
};

export default function TrustPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Trust report</div>
        <h1 className="title">
          Real visits. <span className="hl">Provably.</span>
        </h1>
        <p className="subtitle">Verified visits, not vanity metrics.</p>
        <p className="lead">
          Every line on your Hibi invoice maps to a person who physically stood
          at your register. No impressions, no estimates, no modelled reach — if
          you paid for it, it happened.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <h2 className="title">How a visit earns its keep</h2>
          <p className="body">
            Four checks stand between a scan and your bill. A visit only becomes
            billable after it clears all of them.
          </p>
        </div>
        <div className="grid-2">
          <div className="card">
            <h4>QR scanned at the register</h4>
            <p>
              The scan happens at your counter, on your premises. A customer has
              to walk in and stand in front of staff to stamp a day — there is
              no remote check-in, no geofence guesswork.
            </p>
          </div>
          <div className="card">
            <h4>One scan per customer per day</h4>
            <p>
              Each customer can stamp one day (日) per place per day. Repeat
              scans the same day count once. You are billed for footsteps, not
              button presses.
            </p>
          </div>
          <div className="card">
            <h4>Anomaly detection on visit patterns</h4>
            <p>
              Unusual scan patterns are flagged and held before they ever reach
              billing. TODO(jiaming): describe verification stack.
            </p>
          </div>
          <div className="card">
            <h4>Disputed visits are never billed</h4>
            <p>
              Flag a visit and it comes off the invoice while we review — not
              after. The burden of proof sits with the visit, never with your
              wallet.
            </p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Pay only for the footstep.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
