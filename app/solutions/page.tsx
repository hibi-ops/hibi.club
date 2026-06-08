import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Mark from "@/components/Mark";
import Check from "@/components/Check";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One rail, three sides of the block. What a verified visit means to creators, customers, and merchants — and how each one belongs.",
};

type Audience = {
  id: string;
  color: string;
  tag: string;
  title: string;
  body: string;
  list: string[];
  say: string;
  cta: { label: string; href: string };
  reverse?: boolean;
};

const AUDIENCES: Audience[] = [
  {
    id: "creator",
    color: "var(--pink)",
    tag: "Creator",
    title: "Stamp your hibi.",
    body: "Post the place you actually go. When someone walks in and scans, the visit is yours — verified, attributable, paid. No codes, no link in bio, no vanity reach.",
    list: [
      "Post real places, not discount codes",
      "Get credit for the visit, not the click",
      "Editorial by default — no influencer theatrics",
    ],
    say: "“I'm stamping my hibi at Oslo.” — the block I belong to.",
    cta: { label: "Become a creator", href: "#" },
  },
  {
    id: "customer",
    color: "var(--sky)",
    tag: "Customer",
    title: "Belong without trying.",
    body: "Scan once at the register. Come back. Day by day, the places you already love become a quiet membership — no points, no spam, no spin-to-win.",
    list: [
      "One scan at the register, that's it",
      "Your hibis, colour-coded and quiet",
      "Belong without earning anything",
    ],
    say: "日々、ひとつずつ。 — one visit at a time.",
    cta: { label: "Find your hibis", href: "#" },
    reverse: true,
  },
  {
    id: "merchant",
    color: "var(--orange)",
    tag: "Merchant",
    title: "Pay only when they hibi.",
    body: "The customer who walks in every Tuesday is finally a number you can see — and pay for. From walk-by to regular, measurable, and ready for the books.",
    list: [
      "Pay only for verified visits",
      "Watch regulars form, in real time",
      "Reconciles cleanly to the books",
    ],
    say: "From walk-by to regular — measurable.",
    cta: { label: "Become a hibi", href: "#" },
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Solutions</div>
        <h1 className="title">One rail, three sides of the block.</h1>
        <p className="subtitle">
          The same visit means something different to everyone.
        </p>
        <p className="lead">
          A creator posts, a customer scans, a merchant pays — one verified
          visit, three kinds of belonging. Here's what Hibi does for each side
          of the counter.
        </p>
        <CTAPair center />
      </Section>

      {AUDIENCES.map((a, i) => (
        <Section
          key={a.id}
          id={a.id}
          tone={i % 2 === 1 ? "paper" : "snow"}
          className="anchor"
        >
          <div className={a.reverse ? "split reverse" : "split"}>
            <div>
              <div className="eyebrow" style={{ color: a.color }}>
                {a.tag}
              </div>
              <h2 className="title">{a.title}</h2>
              <p className="body">{a.body}</p>
              <ul className="split-list">
                {a.list.map((li) => (
                  <li key={li}>
                    <Check />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <div
                className="say"
                style={{ borderLeft: `2px solid ${a.color}` }}
              >
                {a.say}
              </div>
              <a className="btn btn-primary" href={a.cta.href}>
                {a.cta.label}
              </a>
            </div>
            <div
              className="split-media"
              style={{
                background: `color-mix(in srgb, ${a.color} 12%, var(--snow))`,
              }}
            >
              <Mark size={132} color={a.color} />
            </div>
          </div>
        </Section>
      ))}

      <div className="divider">Posted · Scanned · Verified ·</div>

      <Section className="cta-band">
        <h2 className="title">One visit. Three ways to belong.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
