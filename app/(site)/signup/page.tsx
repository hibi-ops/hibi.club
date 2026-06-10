import type { Metadata } from "next";
import Section from "@/components/Section";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "Start",
  description:
    "Join Hibi as a creator, a customer, or a merchant — built block by block, starting in Williamsburg.",
};

export default function SignupPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Start for free</div>
        <h1 className="title">
          Pick your <span className="hl">side.</span>
        </h1>
        <p className="subtitle">The same visit, three kinds of belonging.</p>
        <p className="lead">
          Hibi is one loop with three ways in. Choose how you join the block —
          post a place, stamp your days, or count your regulars.
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid-3">
          <div className="card">
            <Mark size={40} color="var(--pink)" />
            <h4>Stamp your hibi</h4>
            <p>
              Post the places you actually go, and watch your block follow your
              footsteps — verified visits, not vanity metrics.
            </p>
            {/* TODO(jiaming): signup flow */}
            <a className="btn btn-primary" href="#">
              Become a creator
            </a>
          </div>
          <div className="card">
            <Mark size={40} color="var(--sky)" />
            <h4>Belong without trying</h4>
            <p>
              Scan a QR at the register, stamp one day, and let fifty of them
              quietly make you a regular.
            </p>
            {/* TODO(jiaming): signup flow */}
            <a className="btn btn-primary" href="#">
              Find your hibis
            </a>
          </div>
          <div className="card">
            <Mark size={40} color="var(--orange)" />
            <h4>Pay only when they hibi</h4>
            <p>
              Every dollar maps to a real footstep at your counter — you pay for
              verified visits, never impressions.
            </p>
            {/* TODO(jiaming): signup flow */}
            <a className="btn btn-primary" href="#">
              Become a hibi
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
