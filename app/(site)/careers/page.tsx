import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the small NYC team making belonging measurable, one verified visit at a time.",
};

export default function CareersPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Careers</div>
        <h1 className="title">
          Build the <span className="hl">block.</span>
        </h1>
        <p className="subtitle">Day by day. Block by block.</p>
        <p className="lead">
          We are a small team in New York making belonging measurable — one
          scan, one stamp, one regular at a time. If you want your work to show
          up on an actual street, this is the place.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <h2 className="title">Open roles</h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <h4>Founding engineer — TODO(jiaming): confirm roles</h4>
            <p className="body">
              Ship the product that turns a QR scan at the register into a
              verified visit. To apply, email TODO(jiaming): hiring email.
            </p>
          </div>
          <div className="card">
            <h4>Williamsburg field lead — TODO(jiaming)</h4>
            <p className="body">
              Walk the neighbourhood, sign up the places worth being a regular
              at, and keep them happy. To apply, email TODO(jiaming): hiring
              email.
            </p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Come be a regular.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
