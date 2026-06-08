import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Mark from "@/components/Mark";
import Check from "@/components/Check";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Features",
  description:
    "The attribution rail for local commerce — verified visits, QR at the register, colour-coded membership, and merchant payouts. Four capabilities, one quiet loop.",
};

type Feature = {
  color: string; // token, e.g. var(--sky)
  eyebrow: string;
  title: string;
  body: string;
  list: string[];
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    color: "var(--sky)",
    eyebrow: "Verified visit",
    title: "A visit, not a view.",
    body: "Attribution starts with a real footstep. A visit only counts when someone walks in and scans at the register — so what you measure is presence, not a passing impression.",
    list: [
      "Counts a physical visit, never a click or a view",
      "Cryptographically tied to one place, one day",
      "No pixels, no tracking, no follower math",
    ],
  },
  {
    color: "var(--orange)",
    eyebrow: "QR at the register",
    title: "Scanned at the counter.",
    body: "The moment of truth is the register. The customer scans a QR where they pay — one tap stamps the day. No app to download, no code to remember, no friction at the line.",
    list: [
      "Works on any phone, straight from the camera",
      "One scan stamps one day (日)",
      "Lives at the point of sale, where the visit is real",
    ],
    reverse: true,
  },
  {
    color: "legend",
    eyebrow: "Membership",
    title: "One colour per place you belong.",
    body: "Every place a customer is a regular at gets a single colour. Its mark, day-count, status, and card border all render in it. The palette is product logic — a way to read your belonging at a glance — not decoration.",
    list: [
      "Four functional colours, assigned per place",
      "The mark doubles as H (Hibi) and 日 (day)",
      "Fifty days in that colour, and you're a regular",
    ],
  },
  {
    color: "var(--green)",
    eyebrow: "Merchant payout",
    title: "Your regulars, on the books.",
    body: "The customer who comes in every Tuesday becomes a number you can see — and pay for. From walk-by to regular, measurable, billed per verified visit and ready for the books.",
    list: [
      "Pay only for verified visits — never impressions",
      "See who's becoming a regular, in real time",
      "Exports and statements that reconcile cleanly",
    ],
    reverse: true,
  },
];

const NEONS = ["var(--sky)", "var(--pink)", "var(--green)", "var(--orange)"];
const NEON_LABELS = [
  "Oslo Coffee",
  "Rosette Wine",
  "Idlewild Books",
  "Saffron Deli",
];

function Media({ color }: { color: string }) {
  if (color === "legend") {
    return (
      <div
        className="split-media legend-media"
        style={{ background: "color-mix(in srgb, var(--ink) 4%, var(--snow))" }}
      >
        <div className="legend">
          {NEONS.map((c, i) => (
            <div key={c} className="lg">
              <Mark size={56} color={c} />
              <span>{NEON_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      className="split-media"
      style={{ background: `color-mix(in srgb, ${color} 12%, var(--snow))` }}
    >
      <Mark size={132} color={color} />
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Features</div>
        <h1 className="title">
          Built around the <span className="hl sky">visit.</span>
        </h1>
        <p className="subtitle">Post, scan, verify, pay — one quiet loop.</p>
        <p className="lead">
          Hibi is the attribution rail for local commerce. Four capabilities
          turn a real footstep into a membership your block can measure, and pay
          for.
        </p>
        <CTAPair center />
      </Section>

      <Section>
        {FEATURES.map((f) => (
          <Reveal
            key={f.eyebrow}
            className={f.reverse ? "split reverse" : "split"}
          >
            <div>
              <div
                className="eyebrow"
                style={f.color !== "legend" ? { color: f.color } : undefined}
              >
                {f.eyebrow}
              </div>
              <h2 className="title">{f.title}</h2>
              <p className="body">{f.body}</p>
              <ul className="split-list">
                {f.list.map((li) => (
                  <li key={li}>
                    <Check />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Media color={f.color} />
          </Reveal>
        ))}
      </Section>

      <div className="divider">Posted · Scanned · Verified ·</div>

      <Section tone="paper" className="cta-band">
        <h2 className="title">One rail, end to end.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
