import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press resources and boilerplate for journalists writing about Hibi.",
};

export default function PressPage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Press</div>
        <h1 className="title">
          The quiet <span className="hl">story.</span>
        </h1>
        <p className="subtitle">Belonging, not transactions.</p>
        <p className="lead">
          Hibi turns real visits into membership. Creators post a place,
          customers scan a QR at the register, and merchants pay only for
          verified visits — never impressions. Writing about us? Everything you
          need is below, and we read every note at TODO(jiaming): press email.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <h2 className="title">For your desk.</h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <h3>Press kit</h3>
            <p className="body">
              Logo, brand mark, and colour palette — the full set, ready to drop
              into a layout. Download the asset bundle at TODO(jiaming): asset
              bundle link.
            </p>
          </div>
          <div className="card">
            <h3>Boilerplate</h3>
            <p className="body">
              Hibi is a loyalty network where the currency is the visit. A
              creator posts a place; a customer scans a QR at the register; the
              merchant pays only for that verified visit, never for impressions.
              Each scan stamps one day (日), fifty days make a regular, and
              every place gets its own colour-coded membership. Hibi is built
              block by block, starting in Williamsburg, NYC.
            </p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Write about the block.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
