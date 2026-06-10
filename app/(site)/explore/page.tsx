import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse the blocks Hibi runs on — Williamsburg first — and find the places you already love.",
};

export default function ExplorePage() {
  return (
    <>
      <Section className="page-hero">
        <div className="eyebrow">Explore</div>
        <h1 className="title">
          Find your <span className="hl">hibis.</span>
        </h1>
        <p className="subtitle">The places you already love.</p>
        <p className="lead">
          Hibi runs block by block, starting in Williamsburg. Browse the
          neighbourhoods we&apos;re live on, scan once at the register, and let
          your spots quietly become memberships.
        </p>
        <CTAPair center />
      </Section>

      <Section tone="paper">
        <div className="section-head">
          <div className="eyebrow">Neighbourhoods</div>
          <h2 className="title">Blocks we run on</h2>
        </div>
        <div className="grid-3">
          <div className="card">
            <Mark size={40} color="var(--green)" />
            <h3>Williamsburg</h3>
            <p className="body">
              Live now — TODO(jiaming): confirm launch status. The first blocks
              Hibi runs on. Scan at the register and start stamping your days,
              one visit at a time.
            </p>
          </div>
          <div className="card">
            <Mark size={40} color="var(--sky)" />
            <h3>Greenpoint</h3>
            <p className="body">
              Next up. One bridge over, same idea: your coffee shop, your
              bakery, your corner spot — colour-coded and quiet, no points and
              no spam.
            </p>
          </div>
          <div className="card">
            <Mark size={40} color="var(--pink)" />
            <h3>Your block</h3>
            <p className="body">
              Not on your street yet? Tell us where you&apos;re a regular and
              we&apos;ll bring Hibi there — built block by block, request yours
              at TODO(jiaming).
            </p>
          </div>
        </div>
      </Section>

      <Section className="cta-band">
        <h2 className="title">Your spots, made membership.</h2>
        <CTAPair center />
      </Section>
    </>
  );
}
