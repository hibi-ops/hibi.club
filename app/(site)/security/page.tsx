import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Hibi protects visit data and payouts — encryption, payments, access, and disclosure.",
};

export default function SecurityPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Security</div>
        <h1 className="title">
          Boring, on <span className="hl">purpose.</span>
        </h1>
        <p className="subtitle">Trust is the product.</p>
        <p className="lead">
          You pay only for verified visits, so the record of those visits has to
          be beyond question. We treat every scan, every stamp, and every payout
          like money — because to you, it is.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">The basics, done properly</div>
          <h2 className="title">Four things we keep boring.</h2>
        </div>
        <div className="grid-2">
          <article className="card">
            <h3>Data</h3>
            <p className="body">
              Visit data is encrypted in transit and at rest. Each scan stamps
              one day — no more, no less — and that ledger is the source of
              truth for what you owe. Specifics on encryption standards:
              TODO(jiaming).
            </p>
          </article>
          <article className="card">
            <h3>Payments</h3>
            <p className="body">
              Payouts and billing run through a dedicated payment processor.
              Card numbers never touch our servers and we never store them.
              Processor name: TODO(jiaming).
            </p>
          </article>
          <article className="card">
            <h3>Access</h3>
            <p className="body">
              Internal access follows least privilege: people see only what
              their job requires, and access is reviewed on a regular cycle.
              Details on review cadence and tooling: TODO(jiaming).
            </p>
          </article>
          <article className="card">
            <h3>Disclosure</h3>
            <p className="body">
              Found something? We run a responsible disclosure programme and
              read every report. Reach our security inbox at TODO(jiaming):
              security email.
            </p>
          </article>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Questions? Talk to us.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
