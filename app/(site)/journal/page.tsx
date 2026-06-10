import type { Metadata } from "next";
import Section from "@/components/Section";
import CTAPair from "@/components/CTAPair";
import Check from "@/components/Check";
import Mark from "@/components/Mark";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Dispatches from the neighbourhoods Hibi runs on — slow notes on places, regulars, and what we learn block by block.",
};

const POSTS = [
  {
    date: "TODO(jiaming): date",
    name: "Day 50 at Oslo Coffee",
    teaser:
      "The fiftieth scan lands on an ordinary Tuesday and nobody claps. The card just turns — and a visitor quietly becomes a regular.",
  },
  {
    date: "TODO(jiaming): date",
    name: "Why we never count impressions",
    teaser:
      "An impression is a maybe; a scan at the register is a fact. Notes on building a business where the currency is the visit.",
  },
  {
    date: "TODO(jiaming): date",
    name: "Williamsburg, week one",
    teaser:
      "Field notes from the first blocks Hibi went live on — one colour per place, one register, the first regulars on the books.",
  },
];

export default function JournalPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section className="page-hero">
        <Reveal>
          <div className="eyebrow">Journal</div>
          <h1 className="title">
            Notes from the <span className="hl">block.</span>
          </h1>
          <p className="subtitle">Slow writing about fast neighbourhoods.</p>
          <p className="lead">
            Dispatches from the streets Hibi runs on. We write the way the
            product works — quietly, in seasons, about places and the people who
            keep showing up to them. Built block by block.
          </p>
          <CTAPair center />
        </Reveal>
      </Section>

      {/* 2 — Latest entries */}
      <Section>
        <Reveal className="section-head">
          <div className="eyebrow">Latest</div>
          <h2 className="title">First entries, in progress.</h2>
          <p className="subtitle">Three pieces we&apos;re writing now.</p>
        </Reveal>
        <Reveal>
          <div className="grid-3 stagger">
            {POSTS.map((post) => (
              <article key={post.name} className="card">
                <div className="eyebrow" style={{ color: "var(--sky)" }}>
                  {post.date}
                </div>
                <h3
                  className="title"
                  style={{ margin: "var(--s2) 0 var(--s2)" }}
                >
                  {post.name}
                </h3>
                <p className="body">{post.teaser}</p>
                <p className="eyebrow" style={{ marginTop: "var(--s3)" }}>
                  Read soon — TODO(jiaming)
                </p>
              </article>
            ))}
          </div>
        </Reveal>
        <p className="price-foot-note">
          No archive yet — the journal is as new as the blocks it covers.
        </p>
      </Section>

      {/* 3 — Newsletter */}
      <Section tone="paper">
        <Reveal className="split">
          <div>
            <div className="eyebrow" style={{ color: "var(--sky)" }}>
              Newsletter
            </div>
            <h2 className="title">The quiet newsletter.</h2>
            <p className="body">
              Once a season, we send one letter: what changed on the block,
              which places found their regulars, and what we got wrong along the
              way. That&apos;s the whole cadence — four letters a year, written
              by hand, sent when there&apos;s something worth saying.
            </p>
            <ul className="split-list">
              <li>
                <Check /> One letter a season — never more
              </li>
              <li>
                <Check /> Stories of places and their regulars, not promos
              </li>
              <li>
                <Check /> Unsubscribe is one click, no guilt trip
              </li>
            </ul>
            <p className="say">Quiet by design.</p>
            <CTAPair
              primary={{ label: "Subscribe", href: "#" }}
              secondary={{ label: "About Hibi", href: "/about" }}
            />
            <p className="price-foot-note" style={{ textAlign: "left" }}>
              TODO(jiaming): hook the subscribe button to the newsletter service
              once it exists.
            </p>
          </div>
          <div className="split-media">
            <Mark size={120} color="var(--sky)" />
          </div>
        </Reveal>
      </Section>

      {/* 4 — Closing */}
      <Section className="cta-band">
        <Reveal>
          <h2 className="title">More from the block.</h2>
          <p className="lead">Where regulars belong.</p>
          <Magnetic>
            <CTAPair
              center
              secondary={{ label: "How Hibi works", href: "/how-it-works" }}
            />
          </Magnetic>
        </Reveal>
      </Section>
    </>
  );
}
