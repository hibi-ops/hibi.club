import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Hibi handles your data — we collect the minimum needed to verify visits. No ad tracking, no selling data, no noise.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        index="15"
        eyebrow="Privacy"
        title={<>Privacy.</>}
        subtitle="Quiet by design."
        lead="Hibi collects the minimum needed to verify visits — nothing more. The currency is the visit, not your attention. No ad tracking, no selling data, no noise."
        cta={false}
      />

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
            {/* TODO(jiaming): legal review before publication */}
            <p className="body">
              <strong>Retention.</strong> Retention periods for visit records,
              account data, and deletion timelines are being confirmed with
              counsel and publish with the launch.
            </p>
            <p className="body">
              <strong>Your rights.</strong> Access, correction, export, and
              deletion rights — including region-specific rights for NYC and
              beyond — are being confirmed with counsel and publish with the
              launch.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          {/* TODO(jiaming): publish a dedicated privacy email */}
          <p className="body" style={{ textAlign: "center" }}>
            Questions? Reach us through the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
