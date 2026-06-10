import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms of service for Hibi — the agreement between Hibi and the creators, customers and merchants who use it.",
};

export default function TermsPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Legal</div>
        <h1 className="title">Terms.</h1>
        <p className="subtitle">The fine print, kept human.</p>
        <p className="lead">
          These terms are the agreement between Hibi and everyone who uses it —
          creators who post places, customers who scan at the register, and
          merchants who pay for verified visits. By using Hibi, you agree to
          them.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="card">
          <p className="body">
            <strong>The service.</strong> Hibi is a membership layer for local
            commerce. A creator posts a place; a customer scans a QR code at the
            register; each scan stamps one day. Fifty days makes a regular. We
            provide the platform — the places, the people and the visits are
            real. TODO(jiaming): legal review.
          </p>
          <p className="body">
            <strong>Billing.</strong> Customers and creators use Hibi for free.
            Merchants pay only for verified visits — a real person, at the
            register, on a real day. Never for impressions, never for clicks.
            Pricing, billing cycles and refund terms are TODO(jiaming): legal
            review.
          </p>
          <p className="body">
            <strong>Acceptable use.</strong> Don&apos;t fake visits, farm
            stamps, scrape the platform, or misrepresent a place you don&apos;t
            run. We may suspend accounts that abuse the system — quietly, like
            everything else we do. TODO(jiaming): legal review.
          </p>
        </div>
        <p className="body">
          Questions about these terms? Write to TODO(jiaming): legal contact
          email.
        </p>
      </Section>
    </>
  );
}
