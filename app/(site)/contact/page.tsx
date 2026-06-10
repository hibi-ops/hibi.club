import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Contact",
  description: "Merchants, creators, press — one inbox. Say hi to Hibi.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Contact</div>
        <h1 className="title">
          Say <span className="hl">hi.</span>
        </h1>
        <p className="subtitle">Quiet by design — but we answer.</p>
        <p className="lead">
          Merchants, creators, press — it all lands in one inbox, read by
          people, not bots. Tell us what you&apos;re building, what you&apos;re
          covering, or which block you want Hibi on next.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">Who are you?</div>
          <h2 className="title">One inbox, three doors.</h2>
        </div>
        <div className="grid-3">
          <article className="card">
            <h3>Merchants</h3>
            <p className="body">
              Book a demo and see how verified visits work at your register —
              you pay only when regulars show up, never for impressions.
            </p>
            <p className="body">TODO(jiaming): sales email</p>
          </article>
          <article className="card">
            <h3>Creators</h3>
            <p className="body">
              Post the places you actually go back to. If you want to bring your
              neighbourhood onto Hibi, write to us.
            </p>
            <p className="body">TODO(jiaming): creator email</p>
          </article>
          <article className="card">
            <h3>Press</h3>
            <p className="body">
              Covering loyalty, local retail, or what&apos;s happening in
              Williamsburg? We&apos;re happy to talk — and to show our numbers.
            </p>
            <p className="body">TODO(jiaming): press email</p>
          </article>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Become someone&apos;s hibi.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
