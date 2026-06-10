import type { Metadata } from "next";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms of service for Hibi — the agreement between Hibi and the creators, customers and merchants who use it.",
};

export default function TermsPage() {
  return (
    <>
      <Section className="page-hero">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--green)" }}>
            Legal
          </div>
          <h1 className="title">Terms.</h1>
          <p className="subtitle">The fine print, kept human.</p>
          <p className="lead">
            These terms are the agreement between Hibi and everyone who uses it
            — creators who post places, customers who scan at the register, and
            merchants who pay for verified visits. By using Hibi, you agree to
            them. Quiet by design, even here.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal>
          <div className="card">
            <p className="body">
              <strong>The service.</strong> Hibi is a membership layer for local
              commerce. A creator posts a place; a customer scans a QR code at
              the register; each scan stamps one day (日). Fifty days makes a
              regular. One colour per place, one stamp per day. We provide the
              platform — the places, the people and the visits are real,
              starting in Williamsburg, NYC, and built block by block.
            </p>
            <p className="body">
              <strong>Accounts.</strong> You need an account to post a place,
              collect days, or run a merchant dashboard. Keep your credentials
              to yourself, keep your details accurate, and tell us if something
              looks wrong. One person, one account — a regular is a person, not
              a profile farm. You&apos;re responsible for what happens under
              your account; we&apos;re responsible for keeping the system
              honest.
            </p>
            <p className="body">
              <strong>Billing.</strong> Customers and creators use Hibi for
              free. Merchants pay only for verified visits — a real person, at
              the register, on a real day. Never for impressions, never for
              clicks. Creators are paid per attributed visit when someone they
              brought through the door actually shows up. TODO(jiaming): creator
              rates, merchant pricing, billing cycles and refund terms.
            </p>
            <p className="body">
              <strong>Acceptable use.</strong> Don&apos;t fake visits, farm
              stamps, lend your phone around the counter, scrape the platform,
              or claim a place you don&apos;t run. The currency is the visit —
              counterfeit it and the whole neighbourhood pays. We may suspend or
              close accounts that abuse the system, quietly, like everything
              else we do.
            </p>
            <p className="body">
              <strong>Liability.</strong> Hibi is provided as-is. We verify
              visits; we don&apos;t guarantee outcomes, foot traffic, or that
              your favourite seat is free. Limitations of liability,
              indemnification, governing law and dispute resolution are
              TODO(jiaming): legal review before publication.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <p className="body" style={{ textAlign: "center" }}>
            Questions about these terms? Write to TODO(jiaming): legal email.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
