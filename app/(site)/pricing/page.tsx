import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pay only for verified store visits — never impressions, never clicks. Creators and customers use Hibi free; merchants pay per verified visit.",
};

/** Small ink check — General Sans/ink discipline, never a neon. */
function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Tier = {
  name: string;
  who: string;
  amount: string; // "—" placeholder or "Custom"
  unit?: string;
  sub: React.ReactNode;
  featured?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

// TODO(jiaming): confirm tier names, inclusions, and final per-visit pricing.
const TIERS: Tier[] = [
  {
    name: "Counter",
    who: "For a single location.",
    amount: "—",
    unit: "/ verified visit",
    sub: <span className="price-todo">TODO(jiaming): per-visit price</span>,
    features: [
      "Verified-visit billing — pay per scan, never per impression",
      "QR code at the register",
      "Color-coded membership (one colour per regular)",
      "Payout & visit dashboard",
      "Email support",
    ],
    cta: { label: "Start for free", href: "#" },
  },
  {
    name: "Block",
    who: "For a few places on the block.",
    amount: "—",
    unit: "/ verified visit",
    sub: <span className="price-todo">TODO(jiaming): per-visit price</span>,
    featured: true,
    features: [
      "Everything in Counter",
      "Multiple locations on one account",
      "Creator attribution & posts",
      "Exports & monthly statements",
      "Priority support",
    ],
    cta: { label: "Start for free", href: "#" },
  },
  {
    name: "Citywide",
    who: "For chains and groups.",
    amount: "Custom",
    sub: "Volume pricing for groups",
    features: [
      "Everything in Block",
      "Unlimited locations",
      "SSO, roles & audit log",
      "API access & webhooks",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to us", href: "#" },
  },
];

const STEPS = [
  {
    k: "01",
    h: "Only a real visit counts",
    p: "A visit is billable the moment a customer scans your QR at the register — and only then. No scan, no fee.",
  },
  {
    k: "02",
    h: "One scan, one day",
    p: "Each scan stamps a single day (日). You're charged once for that verified visit — never for an impression, a click, or reach.",
  },
  {
    k: "03",
    h: "Every visit, on the books",
    p: "Walk-ins become numbers you can see: who's becoming a regular, what each visit cost, all measurable.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Pricing</div>
        <h1 className="title">
          Pay for the <span className="hl sky">visit.</span>
        </h1>
        <p className="subtitle">Never the impression.</p>
        <p className="lead">
          You're billed only when a customer scans at your register — one
          verified visit, one charge. No scan, no fee. Never for impressions,
          clicks, or reach.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">For merchants</div>
          <h2 className="title">Pay only when they show up.</h2>
          <p className="subtitle">
            No reach to buy, no clicks to chase — just verified visits.
          </p>
        </div>

        <div className="price-grid">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={t.featured ? "price-card featured" : "price-card"}
            >
              <div className="price-head">
                <span className="price-name">{t.name}</span>
                {t.featured && <span className="badge">Most regulars</span>}
              </div>
              <div className="price-who">{t.who}</div>
              <div className="price-amt">
                <span className="n">{t.amount}</span>
                {t.unit && <span className="u">{t.unit}</span>}
              </div>
              <div className="price-sub">{t.sub}</div>
              <ul className="price-list">
                {t.features.map((f) => (
                  <li key={f}>
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a className="btn btn-primary" href={t.cta.href}>
                {t.cta.label}
              </a>
            </div>
          ))}
        </div>

        <p className="price-foot-note">
          Creators and customers use Hibi free — always.
        </p>
      </Section>

      <Section>
        <div className="section-head">
          <div className="eyebrow">How billing works</div>
          <h2 className="title">A visit, or nothing.</h2>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.k} className="step">
              <div className="k">{s.k}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="cta-band">
        <h2 className="title">Start free. Pay only for the footstep.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
