import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Hibi protects visit data and payouts — encryption, payments, access, and disclosure. Boring, on purpose.",
};

const PILLARS = [
  {
    name: "Data",
    body: "Visit records are the ledger you pay against, so we guard them the way you guard a balance sheet.",
    list: [
      "Encrypted in transit and at rest — standards: TODO(jiaming)",
      "One scan stamps one day (日); the ledger is append-only",
      "Backup and retention specifics: TODO(jiaming)",
    ],
  },
  {
    name: "Payments",
    body: "Money moves through a dedicated payment processor — never through our own database.",
    list: [
      "Card numbers never touch Hibi servers",
      "Processor and PCI scope: TODO(jiaming)",
      "Payouts reconcile against verified visits, never impressions",
    ],
  },
  {
    name: "Access",
    body: "Least privilege inside the company, role-based control inside your account.",
    list: [
      "Internal access is least-privilege and logged",
      "Review cadence and tooling: TODO(jiaming)",
      "Separate roles for managers and registers",
    ],
  },
  {
    name: "Disclosure",
    body: "If something breaks, you hear it from us first — plainly, and fast.",
    list: [
      "Responsible disclosure programme; every report is read",
      "Security inbox: TODO(jiaming)",
      "Incident notification window: TODO(jiaming)",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you store card numbers?",
    a: "No. Billing and payouts run through a dedicated payment processor — TODO(jiaming): processor name — and card numbers never touch Hibi servers. We hold a reference token, nothing more.",
  },
  {
    q: "How do I report a vulnerability?",
    a: "Email TODO(jiaming): security email. We read every report, respond within TODO(jiaming): response window, and credit researchers who disclose responsibly.",
  },
  {
    q: "Do you support SSO for chains?",
    a: "Yes. Single sign-on is available on the Citywide plan, so multi-location teams manage every register and every seat from one identity provider.",
  },
];

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
        <Magnetic>
          <CTAPair
            center
            primary={{ label: "Start for free", href: "/signup" }}
            secondary={{ label: "Talk to us", href: "/contact" }}
          />
        </Magnetic>
      </Section>

      <Section tone="paper">
        <Reveal className="section-head">
          <div className="eyebrow">The basics, done properly</div>
          <h2 className="title">Four things we keep boring.</h2>
          <p className="lead">
            No clever architecture, no exotic promises. The fundamentals,
            audited and repeated, every day.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid-2 stagger">
            {PILLARS.map((p) => (
              <article key={p.name} className="card">
                <h3>{p.name}</h3>
                <p className="body">{p.body}</p>
                <ul className="split-list">
                  {p.list.map((li) => (
                    <li key={li}>
                      <Check />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="split">
          <div>
            <div className="eyebrow" style={{ color: "var(--sky)" }}>
              Why it holds
            </div>
            <h2 className="title">Verification is security.</h2>
            <p className="body">
              Every paid event on Hibi is a verified visit — a scan at your
              register, at a moment in time. Because the proof and the product
              are the same thing, securing one secures the other. There is no
              impression to inflate, no click to spoof; the currency is the
              visit.
            </p>
            <ul className="split-list">
              <li>
                <Check />
                <span>
                  Each scan is cryptographically tied to one register and one
                  timestamp
                </span>
              </li>
              <li>
                <Check />
                <span>
                  1 scan = 1 day (日) — no double-stamping, no inflation
                </span>
              </li>
              <li>
                <Check />
                <span>Anomaly detection on scan patterns: TODO(jiaming)</span>
              </li>
            </ul>
            <p className="say">Verified visits, not vanity metrics.</p>
          </div>
          <TiltCard>
            <div
              className="split-media"
              style={{
                background: "color-mix(in srgb, var(--sky) 12%, var(--snow))",
              }}
            >
              <Mark size={132} color="var(--sky)" />
            </div>
          </TiltCard>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal className="section-head">
          <div className="eyebrow">Straight answers</div>
          <h2 className="title">What merchants ask first.</h2>
        </Reveal>
        <Reveal>
          <FAQ items={FAQ_ITEMS} />
        </Reveal>
      </Section>

      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Questions? Talk to us.</h2>
          <p className="lead">
            Security review, vendor questionnaire, or something that does not
            fit a form — a human answers.
          </p>
          <Magnetic>
            <CTAPair
              center
              primary={{ label: "Talk to us", href: "/contact" }}
              secondary={{ label: "Visit the trust page", href: "/trust" }}
            />
          </Magnetic>
        </Reveal>
      </Section>
    </>
  );
}
