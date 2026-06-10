import type { Metadata } from "next";
import Section from "@/components/Section";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Join Hibi as a creator, a customer, or a merchant. The same visit, three kinds of belonging — built block by block, starting in Williamsburg.",
};

const roles = [
  {
    color: "var(--pink)",
    title: "Stamp your hibi.",
    body: "You post a place because it deserves the ink, not the algorithm. Your block follows your footsteps — and the footsteps are real.",
    list: [
      "One colour per place, signed by you",
      "Verified visits, not vanity metrics",
    ],
    cta: "Become a creator",
  },
  {
    color: "var(--sky)",
    title: "Belong without trying.",
    body: "No feed to perform for, no points maze to solve. Scan the QR at the register and the day is quietly yours.",
    list: ["1 scan = 1 day (日)", "50 days makes you a regular"],
    cta: "Find your hibis",
  },
  {
    color: "var(--orange)",
    title: "Pay only when they hibi.",
    body: "Every line on your bill is a verified visit at your counter. Impressions never make the invoice.",
    list: [
      "Pay only when they show up",
      "Quiet by design — no blasts, no spam",
    ],
    cta: "Become a hibi",
  },
];

export default function SignupPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Start for free</div>
        <h1 className="title">
          Pick your <span className="hl">side.</span>
        </h1>
        <p className="subtitle">The same visit, three kinds of belonging.</p>
        <p className="lead">
          Hibi is one loop with three ways in. A creator posts a place, a
          customer stamps a day, a merchant counts the regulars — choose where
          you stand on the block.
        </p>
      </Section>

      <Section>
        <Reveal>
          <div className="grid-3 stagger">
            {roles.map((r) => (
              <TiltCard key={r.cta}>
                <div className="card">
                  <Mark size={40} color={r.color} />
                  <h4>{r.title}</h4>
                  <p>{r.body}</p>
                  <ul className="split-list">
                    {r.list.map((li) => (
                      <li key={li}>
                        <Check />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic>
                    <a className="btn btn-primary" href="#">
                      {r.cta}
                    </a>
                  </Magnetic>
                  <p className="price-foot-note">TODO(jiaming): signup flow</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal className="section-head">
          <h2 className="title">What happens next</h2>
          <p className="lead">
            The currency is the visit. Everything starts with one.
          </p>
        </Reveal>
        <Reveal>
          <div className="steps stagger">
            <div className="step">
              <div className="k">01</div>
              <h4>Pick a side</h4>
              <p>
                Creator, customer, or merchant — one account, one role on the
                block. You can always stand somewhere else later.
              </p>
            </div>
            <div className="step">
              <div className="k">02</div>
              <h4>First post, or first scan</h4>
              <p>
                A creator posts a place worth walking to. A customer scans the
                QR at the register. A merchant puts the code by the till and
                waits for footsteps.
              </p>
            </div>
            <div className="step">
              <div className="k">03</div>
              <h4>Fifty days later</h4>
              <p>
                One scan is one day (日). Fifty of them, and the place knows
                your name. Where regulars belong.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="section-head">
          <p className="body">
            Already have an account? Login from the top bar.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
