import type { Metadata } from "next";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Hibi handles your data — we collect the minimum needed to verify visits. No ad tracking, no selling data, no noise.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="page-hero">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--green)" }}>
            Legal
          </div>
          <h1 className="title">Privacy.</h1>
          <p className="subtitle">Quiet by design.</p>
          <p className="lead">
            Hibi collects the minimum needed to verify visits — nothing more.
            The currency is the visit, not your attention. No ad tracking, no
            selling data, no noise.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal>
          <div className="card">
            <p className="body">
              <strong>What we collect.</strong> When you scan a QR at the
              register, we record the visit: the place, the day, and your
              account. One scan is one day (日) — that stamp is the whole
              record. We do not track your location in the background, we do not
              read your contacts, and we do not buy data about you from anyone.
            </p>
            <p className="body">
              <strong>How we use it.</strong> Visits stamp your days, count your
              progress toward becoming a regular (50 days), and let us bill
              merchants for verified visits — never impressions. That is the
              entire loop. Nothing in it requires an advertising profile, so we
              do not build one.
            </p>
            <p className="body">
              <strong>What we never do.</strong> We never sell your data. We
              never share it with advertisers or data brokers. We never track
              you across the web, and we never trade your visit history for
              anything. Verified visits, not vanity metrics — the model works
              precisely because your data stays inside it.
            </p>
            <p className="body">
              <strong>Retention.</strong> TODO(jiaming): legal review —
              retention periods for visit records, account data, and deletion
              timelines to be confirmed with counsel.
            </p>
            <p className="body">
              <strong>Your rights.</strong> TODO(jiaming): legal review —
              access, correction, export, and deletion rights (including
              region-specific rights for NYC and beyond) to be confirmed with
              counsel.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <p className="body" style={{ textAlign: "center" }}>
            Questions? TODO(jiaming): privacy email.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
