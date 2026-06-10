import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Journal",
  description: "Dispatches from the neighbourhoods Hibi runs on.",
};

export default function JournalPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Journal</div>
        <h1 className="title">
          Notes from the <span className="hl">block.</span>
        </h1>
        <p className="subtitle">Stories of regulars.</p>
        <p className="lead">
          Dispatches from the neighbourhoods Hibi runs on. Slow notes on places,
          the people who keep coming back, and what we learn block by block.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">Latest</div>
          <h2 className="title">Recent entries</h2>
        </div>
        <div className="grid-3">
          <article className="card">
            <h3>Day 50 at Oslo Coffee — TODO(jiaming)</h3>
            <p className="body">
              What it looks like when a customer&apos;s fiftieth stamp lands and
              a visitor quietly becomes a regular.
            </p>
          </article>
          <article className="card">
            <h3>Why we never count impressions — TODO(jiaming)</h3>
            <p className="body">
              On verified visits, vanity metrics, and why the only number we
              trust is a scan at the register.
            </p>
          </article>
          <article className="card">
            <h3>Williamsburg, week one — TODO(jiaming)</h3>
            <p className="body">
              Field notes from the first blocks Hibi went live on, one colour
              and one place at a time.
            </p>
          </article>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">More soon.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
