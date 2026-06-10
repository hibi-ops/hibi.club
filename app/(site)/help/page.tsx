import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTAPair from "@/components/CTAPair";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Answers for customers, creators and merchants — one visit at a time.",
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        index="12"
        eyebrow="Help"
        title={
          <>
            Stuck? <span className="hl">Quick.</span>
          </>
        }
        subtitle="Short answers, no runaround."
        lead="Whether you scan at the register, post the places you love, or run the counter — the answers live here. Quiet by design, even the help page."
        primary={{ label: "Contact support", href: "/contact" }}
        secondary={{ label: "How Hibi works", href: "/how-it-works" }}
      />

      <Section>
        <Reveal className="section-head head-row">
          <div className="eyebrow">Start here</div>
          <div>
            <h2 className="title">Pick your side of the counter.</h2>
            <p className="lead">
              Three roles, one loop. Find yours and skim the three questions we
              hear most.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid-3 stagger">
            <div className="card">
              <Mark size={40} color="var(--sky)" />
              <h3>Customers</h3>
              <p className="body">
                <strong>How do I get a day?</strong> Scan the QR at the register
                when you visit. One scan stamps one day — 日.
              </p>
              <p className="body">
                <strong>What do my days add up to?</strong> Each place keeps its
                own count in its own colour. Fifty days at one place makes you a
                regular.
              </p>
              <p className="body">
                <strong>Will I get spammed?</strong> No. Hibi is quiet by design
                — no feeds to refresh, no notifications begging you back. The
                currency is the visit, not your attention.
              </p>
            </div>
            <div className="card">
              <Mark size={40} color="var(--pink)" />
              <h3>Creators</h3>
              <p className="body">
                <strong>What do I actually post?</strong> A place. Not a deal,
                not an ad — a spot you genuinely return to, in your own words.
              </p>
              <p className="body">
                <strong>What counts for me?</strong> Verified visits. When
                someone you sent shows up and scans at the register, that visit
                is attributed to you. Views don&apos;t count; doors do.
              </p>
              <p className="body">
                <strong>Where does this work today?</strong> Brooklyn first,
                then NYC, block by block. If your neighbourhood isn&apos;t live
                yet, it&apos;s coming.
              </p>
            </div>
            <div className="card">
              <Mark size={40} color="var(--orange)" />
              <h3>Merchants</h3>
              <p className="body">
                <strong>What am I paying for?</strong> Verified visits only — a
                real person, at your register, scanning your QR. Never
                impressions, never reach.
              </p>
              <p className="body">
                <strong>What do I have to install?</strong> A QR code at the
                register. No new hardware, no POS surgery, no staff training
                beyond &ldquo;point here.&rdquo;
              </p>
              <p className="body">
                <strong>How do I know it&apos;s working?</strong> Your dashboard
                counts visits and returning regulars — the people who actually
                walked in, not the ones who scrolled past.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal className="section-head head-row">
          <div className="eyebrow">Common questions</div>
          <div>
            <h2 className="title">The five we answer most.</h2>
          </div>
        </Reveal>
        <Reveal>
          <FAQ
            items={[
              {
                q: "How do I scan?",
                // TODO(jiaming): confirm whether a scan works straight from the camera with no app installed, or whether the Hibi app is required.
                a: "Open your phone camera and point it at the Hibi QR at the register. That's the whole gesture — one scan, one day stamped. The full scan how-to publishes alongside the launch.",
              },
              {
                q: "Where do my days show up?",
                a: "Every place you visit gets its own card in your Hibi, in that place's one colour. Each verified visit adds one day (日) to that place's count — and at 50 days, you're a regular there. Days never mix between places; your count at the coffee shop is yours and the coffee shop's alone.",
              },
              {
                q: "I scanned but didn't get a stamp. What now?",
                // TODO(jiaming): document the support flow for missing stamps — where to report, what info to include, expected turnaround.
                a: "First, check you scanned the Hibi QR at the register (not a menu or payment code) and that you have a connection. One scan counts once per day per place, so a second scan the same day won't add another 日. If a legitimate visit still isn't showing, tell us — the full missing-stamp flow publishes at launch.",
              },
              {
                q: "How do creators get paid?",
                // TODO(jiaming): confirm payout rates, schedule, and minimum threshold.
                a: "Earnings follow verified visits: when someone discovers a place through your post and then shows up and scans at the register, that visit is attributed to you. You're never paid for impressions or clicks — only for people who walked through the door. Payout rates and schedule are confirmed at launch.",
              },
              {
                q: "How does billing work for merchants?",
                // TODO(jiaming): confirm per-visit pricing, billing cycle, and any caps.
                a: "You pay only when someone shows up — each verified scan at your register is a billable visit, and nothing else is. No charges for impressions, profile views, or posts about your place. Your dashboard lists every visit you're billed for, so the invoice and the foot traffic always match. Per-visit pricing is confirmed with each block as it goes live.",
              },
            ]}
          />
        </Reveal>
        <Reveal>
          <p className="price-foot-note">
            Verified visits, not vanity metrics — that rule answers most
            questions before they&apos;re asked.
          </p>
        </Reveal>
      </Section>

      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Still stuck? Write to us.</h2>
          <p className="lead">
            A person reads every message. We answer the way we build — quiet,
            direct, no runaround.
          </p>
          <Magnetic>
            <CTAPair
              center
              primary={{ label: "Contact support", href: "/contact" }}
              secondary={{ label: "How Hibi works", href: "/how-it-works" }}
            />
          </Magnetic>
        </Reveal>
      </Section>
    </>
  );
}
