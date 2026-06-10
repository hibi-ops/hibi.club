import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the small NYC team making belonging measurable — one verified visit, one block at a time. Open roles in engineering, field, brand, and merchant success.",
};

const ROLES = [
  {
    title: "Founding engineer",
    note: "TODO(jiaming): confirm role",
    line: "Own the path from a QR scan at the register to a verified visit on the books — small surface, zero tolerance for fake numbers.",
  },
  {
    title: "Williamsburg field lead",
    note: "TODO(jiaming): confirm role",
    line: "Walk the neighbourhood, sign the places worth being a regular at, and stay close enough to every counter to know when something is off.",
  },
  {
    title: "Brand designer",
    note: "TODO(jiaming): confirm role",
    line: "One colour per place, one mark, one quiet voice — keep Hibi feeling like Kinfolk on a street where everything else shouts.",
  },
  {
    title: "Merchant success",
    note: "TODO(jiaming): confirm role",
    line: "Help owners read their regulars, not their impressions — you are the person they text when the numbers finally make sense.",
  },
];

const HIRING_STEPS = [
  {
    k: "01 — Write",
    h: "A short note, not a cover letter.",
    p: "Tell us about a place you are a regular at and why. That tells us more than a CV ever will. Send it to TODO(jiaming): hiring email.",
  },
  {
    k: "02 — Talk",
    h: "Two real conversations.",
    p: "One on the work, one on the why. No riddles, no take-home theatre — we respect your evenings the way we respect our merchants' counters.",
  },
  {
    k: "03 — Walk",
    h: "A day on the block.",
    p: "Meet the team in Williamsburg, walk the registers we verify, and decide if this is the corner you want your work to live on.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section className="page-hero">
        <div className="eyebrow">Careers</div>
        <h1 className="title">
          Build the <span className="hl">block.</span>
        </h1>
        <p className="subtitle">Where regulars belong.</p>
        <p className="lead">
          We are a small team in New York making belonging measurable — one
          scan, one stamp, one regular at a time. If you want your work to show
          up on an actual street, not just a dashboard, this is the place.
        </p>
        <CTAPair
          center
          primary={{ label: "See open roles", href: "#roles" }}
          secondary={{ label: "Say hello", href: "/contact" }}
        />
      </Section>

      {/* 2 — Why join */}
      <Section tone="paper">
        <Reveal className="split">
          <div>
            <div className="eyebrow">Why join</div>
            <h2 className="title">
              Small team. Real streets. Quiet by design.
            </h2>
            <p className="body">
              Hibi is the verified-visit membership layer for local commerce.
              The currency is the visit: a creator posts a place, a customer
              scans at the register, a merchant pays only when a regular
              actually shows up. We start in Williamsburg and earn the city
              block by block — and the people who build that need to believe
              what the product believes.
            </p>
            <ul className="split-list">
              <li>
                <Check />
                <span>
                  Daily — we build for the ordinary Tuesday, not the launch-day
                  spike. Belonging is a habit, and so is good work.
                </span>
              </li>
              <li>
                <Check />
                <span>
                  Real — verified footsteps, never impressions. We do not ship
                  vanity metrics to merchants, and we do not run on them
                  internally either.
                </span>
              </li>
              <li>
                <Check />
                <span>
                  Local — your work lands on a register you can walk to. NYC
                  first, one neighbourhood at a time.
                </span>
              </li>
            </ul>
            <p className="say">
              Verified visits, not vanity metrics — for our merchants, and for
              ourselves.
            </p>
          </div>
          <div
            className="split-media"
            style={{
              background: "color-mix(in srgb, var(--green) 12%, var(--snow))",
            }}
          >
            <Mark size={132} color="var(--green)" />
          </div>
        </Reveal>
      </Section>

      {/* 3 — Open roles */}
      <Section id="roles">
        <div className="section-head">
          <div className="eyebrow">Open roles</div>
          <h2 className="title">Four seats at the counter.</h2>
          <p className="subtitle">
            TODO(jiaming): confirm open roles before publishing.
          </p>
        </div>
        <Reveal>
          <div className="grid-2 stagger">
            {ROLES.map((r) => (
              <article key={r.title} className="card">
                <div className="eyebrow">{r.note}</div>
                <h4>{r.title}</h4>
                <p className="body">{r.line}</p>
                <p className="body">
                  Write to TODO(jiaming): hiring email — subject line: the role,
                  plus the place you are a regular at.
                </p>
              </article>
            ))}
          </div>
        </Reveal>
        <p className="price-foot-note">
          Nothing that fits? Write anyway — the best people on a block rarely
          match a job title.
        </p>
      </Section>

      {/* 4 — How we hire */}
      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">How we hire</div>
          <h2 className="title">Three steps, no theatre.</h2>
        </div>
        <Reveal>
          <div className="steps stagger">
            {HIRING_STEPS.map((s) => (
              <div key={s.k} className="step">
                <div className="k">{s.k}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 5 — Closing */}
      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Come be a regular.</h2>
          <p className="lead">Built block by block. Day by day.</p>
          <Magnetic>
            <CTAPair
              center
              primary={{ label: "See open roles", href: "#roles" }}
              secondary={{ label: "Say hello", href: "/contact" }}
            />
          </Magnetic>
          <p className="price-foot-note">
            TODO(jiaming): hiring email — link the primary button once the inbox
            exists.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
