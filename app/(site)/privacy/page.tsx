import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Hibi handles your data — we collect the minimum needed to verify visits.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Legal</div>
        <h1 className="title">Privacy.</h1>
        <p className="subtitle">Quiet by design.</p>
        <p className="lead">
          Hibi collects the minimum needed to verify visits — nothing more. No
          ad tracking, no selling data, no noise.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="card">
          <p className="body">
            Data we collect: when you scan a QR at the register, we record the
            visit — the place, the day, and your account. That stamp is what
            builds your membership. We do not collect your precise location in
            the background, and we do not buy data about you from anyone.
            TODO(jiaming): legal review.
          </p>
          <p className="body">
            How it is used: visits are used to stamp your days, count your
            progress toward becoming a regular, and bill merchants for verified
            visits — never impressions. We do not sell your data or share it
            with advertisers. TODO(jiaming): legal review.
          </p>
          <p className="body">
            Contact: for privacy questions, data access, or deletion requests,
            reach us at TODO(jiaming): privacy contact email and mailing
            address. We respond within TODO(jiaming): response window.
            TODO(jiaming): legal review.
          </p>
        </div>
      </Section>

      <Section>
        <p className="body">Questions? TODO(jiaming): privacy contact email.</p>
      </Section>
    </>
  );
}
