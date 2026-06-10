import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Merchants, creators, press — three doors, one team. Say hi to Hibi.",
};

export default function ContactPage() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <PageHero
        index="13"
        eyebrow="Contact"
        title={
          <>
            Say <span className="hl">hi.</span>
          </>
        }
        subtitle="Quiet by design — but we answer."
        lead="No chat bubble, no ticket queue, no autoresponder pretending to be a person. Write to us and a human on the Hibi team writes back — usually the one who can actually fix the thing."
      />

      {/* ------------------------------------------------- three doors */}
      <Section tone="paper">
        <Reveal className="section-head head-row">
          <div className="eyebrow">Who are you?</div>
          <div>
            <h2 className="title">
              Three doors, <span className="hl">one team.</span>
            </h2>
            <p className="body">
              Pick the door that fits. Everything lands with people who read it
              the same day.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid-3 stagger">
            <TiltCard>
              <article className="card">
                <Mark size={48} color="var(--orange)" />
                <h3>Merchants</h3>
                <p className="body">
                  See how verified visits work at your register. You pay only
                  when a regular actually shows up — never for impressions.
                  Thirty minutes, real numbers, no deck-padding.
                </p>
                <Magnetic>
                  {/* TODO(jiaming): calendly link */}
                  <a className="btn btn-primary" href="/signup">
                    Book a demo
                  </a>
                </Magnetic>
                <p className="body">Booking opens at launch.</p>
              </article>
            </TiltCard>

            <article className="card">
              <Mark size={48} color="var(--pink)" />
              <h3>Creators</h3>
              <p className="body">
                You post a place; your people show up; the till proves it. If
                you want to bring your block onto Hibi — or pitch us the next
                one — this is your door.
              </p>
              {/* TODO(jiaming): creator email */}
              <p className="body">Inbox opens with the Brooklyn launch.</p>
            </article>

            <article className="card">
              <Mark size={48} color="var(--sky)" />
              <h3>Press</h3>
              <p className="body">
                Covering loyalty, local retail, or what&apos;s happening in
                Brooklyn? We&apos;ll talk on the record and show you verified
                visits, not vanity metrics.
              </p>
              {/* TODO(jiaming): press email */}
              <p className="body">Inbox opens with the Brooklyn launch.</p>
            </article>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ on the block */}
      <Section>
        <Reveal className="split">
          <div>
            <div className="eyebrow" style={{ color: "var(--green)" }}>
              Where we are
            </div>
            <h2 className="title">Find us on the block.</h2>
            <p className="body">
              Hibi is built block by block, and it starts on ours. We work out
              of Brooklyn — close enough to the registers we verify that we can
              walk to them.
            </p>
            <ul className="split-list">
              <li>
                <Check />
                <span>Brooklyn — NYC first, then outward</span>
              </li>
              <li>
                <Check />
                {/* TODO(jiaming): street address */}
                <span>Street address published at launch</span>
              </li>
              <li>
                <Check />
                <span>
                  Drop by if you run a place nearby — we&apos;d rather meet at
                  your counter than on a call
                </span>
              </li>
            </ul>
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

      {/* ------------------------------------------------------ closing */}
      <Section className="cta-band">
        <h2 className="title">Become someone&apos;s hibi.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
