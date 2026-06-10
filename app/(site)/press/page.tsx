import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press resources for journalists writing about Hibi — boilerplate, fast facts, brand assets, and a press inbox. Verified visits, not vanity metrics.",
};

const FAST_FACTS = [
  "Founded: TODO(jiaming)",
  "Headquarters: New York City — first blocks in Williamsburg",
  "Model: merchants pay per verified visit, never per impression",
];

const KIT_ITEMS = [
  "The Hibi mark, in every approved colour",
  "Wordmark and lockups, light and dark",
  "Palette and typography reference",
];

export default function PressPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section className="page-hero">
        <div className="eyebrow" style={{ color: "var(--sky)" }}>
          Press
        </div>
        <h1 className="title">
          The quiet <span className="hl">story.</span>
        </h1>
        <p className="subtitle">Verified visits, not vanity metrics.</p>
        <p className="lead">
          Hibi is the membership layer for local commerce — a way for the places
          people actually return to, to know it, prove it, and pay only for it.
          If you&apos;re writing about us, everything you need is on this page,
          and a person reads every note.
        </p>
        <CTAPair
          center
          primary={{ label: "Email press", href: "#" }}
          secondary={{ label: "Read the boilerplate", href: "#boilerplate" }}
        />
      </Section>

      {/* 2 — Boilerplate + fast facts */}
      <Section tone="paper" id="boilerplate">
        <Reveal className="split">
          <div>
            <div className="eyebrow" style={{ color: "var(--sky)" }}>
              Boilerplate
            </div>
            <h2 className="title">Hibi, in one paragraph.</h2>
            <p className="body">
              Hibi is a loyalty network where the currency is the visit. A
              creator posts a place; a customer scans a QR code at the register;
              the merchant pays only for that verified visit — never for
              impressions. Each scan stamps one day (日), fifty days make a
              regular, and every place carries one colour of its own. There are
              no points to farm and nothing to game: a footstep at the counter,
              not a tracked click. Hibi is quiet by design and built block by
              block, starting in Williamsburg, New York. Where regulars belong.
            </p>
            <ul className="split-list">
              {FAST_FACTS.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="say" style={{ borderLeft: "2px solid var(--ink)" }}>
              The currency is the visit.
            </div>
          </div>
          <div
            className="split-media"
            style={{
              background: "color-mix(in srgb, var(--ink) 6%, var(--snow))",
            }}
          >
            <Mark size={132} color="var(--ink)" />
          </div>
        </Reveal>
      </Section>

      {/* 3 — Press kit + coverage */}
      <Section>
        <div className="section-head">
          <div className="eyebrow" style={{ color: "var(--sky)" }}>
            Resources
          </div>
          <h2 className="title">For your desk.</h2>
          <p className="subtitle">Assets first, adjectives second.</p>
        </div>
        <Reveal>
          <div className="grid-2 stagger">
            <div className="card">
              <Mark size={40} color="var(--ink)" />
              <h3>Press kit</h3>
              <p className="body">
                The mark, the wordmark, and the palette — one bundle, ready to
                drop into a layout. Please don&apos;t redraw the mark or set it
                in a colour a place hasn&apos;t earned.
              </p>
              <p className="body">TODO(jiaming): asset bundle link</p>
            </div>
            <div className="card">
              <Mark size={40} color="var(--ink)" />
              <h3>Coverage</h3>
              <p className="body">
                What others have written about paying for verified visits
                instead of impressions, and about building a network one block
                at a time.
              </p>
              <p className="body">TODO(jiaming): press mentions</p>
            </div>
          </div>
        </Reveal>
        <p className="price-foot-note">
          For interviews, embargoes, or fact-checking, write to TODO(jiaming):
          press email — replies come from a person, not a tool.
        </p>
      </Section>

      {/* 4 — Closing */}
      <Section className="cta-band">
        <Reveal>
          <h2 className="title">Write about the block.</h2>
          <p className="lead">Built block by block. Quiet by design.</p>
          <Magnetic>
            <CTAPair
              center
              primary={{ label: "Email press", href: "#" }}
              secondary={{ label: "How Hibi works", href: "/how-it-works" }}
            />
          </Magnetic>
          <p className="price-foot-note">
            TODO(jiaming): press email — link the button above once the inbox
            exists.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
