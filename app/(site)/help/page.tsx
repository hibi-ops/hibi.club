import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Answers for customers, creators and merchants — one visit at a time.",
};

export default function HelpPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Help center</div>
        <h1 className="title">
          Stuck? <span className="hl">Quick.</span>
        </h1>
        <p className="subtitle">One visit at a time.</p>
        <p className="lead">
          Whether you scan, post or run the register, the answers live here.
          Short reads for customers, creators and merchants.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <h2 className="title">Pick your side of the counter.</h2>
        </div>
        <div className="grid-3">
          <div className="card">
            <h3>Customers</h3>
            <p className="body">
              How do I scan? Point your camera at the QR at the register — one
              scan stamps one day (日).
            </p>
            <p className="body">
              Where are my hibis? Every place you visit gets its own colour, and
              50 days makes you a regular.
            </p>
            <p className="body">TODO(jiaming): link customer help articles</p>
          </div>
          <div className="card">
            <h3>Creators</h3>
            <p className="body">
              How do I post a place? Share a spot you love — Hibi handles the
              rest.
            </p>
            <p className="body">
              How do I get paid? Attribution follows the visit: when someone you
              sent shows up and scans, it counts.
            </p>
            <p className="body">TODO(jiaming): link creator help articles</p>
          </div>
          <div className="card">
            <h3>Merchants</h3>
            <p className="body">
              How do I set up my QR? It lives at the register — setup takes
              minutes.
            </p>
            <p className="body">
              How does billing work? You pay only for verified visits, never
              impressions, and your dashboard shows every one.
            </p>
            <p className="body">TODO(jiaming): link merchant help articles</p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Still stuck? Write to us.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
