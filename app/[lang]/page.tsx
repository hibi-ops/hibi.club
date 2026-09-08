import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import LedgerLive from '@/components/LedgerLive';
import Wash from '@/components/Wash';
import WalkIn from '@/components/WalkIn';
import Panel from '@/components/Panel';
import ChainMatrix from '@/components/ChainMatrix';
import Footer from '@/components/Footer';
import { Head, PriceTiers, Access, TextLink, ThumbBar, Split, Chrono, Cols, Trio, Ticker, BigMarquee } from '@/components/blocks';
import Tile from '@/components/Tile';
import { getDict, href, type Lang } from '@/content';
import { pageMetadata } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, '', getDict(lang).home.meta);
}

export default async function Home({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const h = t.home;
  return (
    <>
      <Nav lang={lang} t={t} current="" />
      <main id="main" tabIndex={-1}>
        {/* HERO — the underlight belongs here and nowhere else: it is what the
            ledger card floats on. §5.4 says one hue per page, the page's own. */}
        <section className="hero lit">
          <Wash />
          <div className="wrap">
            <div className="hero-grid">
              <span className="hibi-mark" aria-hidden="true">日々</span>
              <span className="label rise">{h.eyebrow}</span>
              <h1 className="hero-title rise">
                <span className="line">{h.title[0]}</span>
                <span className="line">{h.title[1]}</span>
                <span className="line accent">{h.title[2]}</span>
              </h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{h.lead}</p>
                  <div className="cta-row rise sec-body tight">
                    <Link href={`${href(lang, 'merchants')}#access`} className="btn btn-primary">{h.ctaPrimary} <span className="arr" aria-hidden="true">→</span></Link>
                    <TextLink href={`${href(lang, 'creators')}#access`}>{h.ctaSecondary}</TextLink>
                  </div>
                  <div className="hero-foot">
                    {h.facts.map(f => (
                      <span key={f}><i className="dot" aria-hidden="true" />{f}</span>
                    ))}
                  </div>
                </div>
                <LedgerLive c={h.ledgerCard} />
              </div>
            </div>
          </div>
          <Ticker c={h.ledgerCard} />
        </section>

        {/* PROBLEM */}
        <section className="section">
          <div className="wrap">
            <Head label={h.problem.label} title={h.problem.title} />
            <div className="numpair sec-body">
              <div>
                <span className="label gray">{h.problem.a.label}</span>
                <div className="num">{h.problem.a.num}</div>
                <p>{h.problem.a.body}</p>
              </div>
              <div>
                <span className="label gray">{h.problem.b.label}</span>
                <div className="num num-void">{h.problem.b.num}</div>
                <p>{h.problem.b.body}</p>
              </div>
            </div>            <p className="h2 sec-body" style={{ maxWidth: '30ch' }}>{h.problem.close}</p>
          </div>
        </section>

        {/* HOW — the walk-in stage stands on the survey sheet too, and here the
            sheet answers the stage: a redemption raises the ground under the
            counter node (Wash 'counter' hears hibi:redeem).
            A week-summary strip used to sit under this (24 walk-ins / $200.60,
            ticking up with the demo). It was cut: those figures arrive from
            nowhere, and the hero's own ledger card already shows the same week.
            The demo's result belongs in the demo — the third column IS the
            settled line. */}
        <section className="section tone-paper relief">
          <Wash variant="counter" seed={9} />
          <div className="wrap">
            <Head label={h.how.label} title={h.how.title} />
            {/* The hero prototype, staged the way ElevenLabs stages a demo:
                on a panel, the field bleeding in from the left and along the
                bottom, and the record line — which used to be a bordered box
                floating under the stage — as the white caption on the colour. */}
            <div className="sec-body">
              <Panel cap={{ k: h.how.recordTag, p: h.how.record }}>
                <WalkIn steps={h.how.steps} d={h.how.demo} />
              </Panel>
            </div>
          </div>
        </section>

        {/* THREE SIDES */}
        {/* Stays on paper. This was a full-bleed ink plate for a while, on the
            argument that the page wanted a second anchor after the hero — but
            it already has five (the outline $0, the $300-3,000, the walk-in
            stage, the marquee, the rate staircase), and one dark band in the
            middle of a light page reads as a box pasted on rather than a
            chapter. The deciding rule is the site's own: data lives on paper,
            dark grounds are for statements (about's open roles, security's
            "what we have not done"). A split of someone's bill is data. */}
        <section className="section">
          <div className="wrap">
            <Head label={h.sides.label} title={h.sides.title} wide />
            <div className="sec-body"><Split s={h.sides.split} /></div>
            {/* Three panels, one per party. The bar directly above names the
                three, so each block wears the same name plus its own colour
                tile — the tile is what makes them tellable apart at a glance
                without the label doing all the work. */}
            <div className="sec-body"><Trio items={h.sides.cols} tiles={[1, 4, 7]} /></div>
          </div>
        </section>

        <BigMarquee text={h.marquee} />

        {/* PRICING */}
        <section className="section tone-paper">
          <div className="wrap">
            <Head label={h.pricing.label} title={h.pricing.title} />
            <div className="sec-body"><PriceTiers tiers={h.pricing.tiers} /></div>
            {/* c8 of twelve put this footnote on a 91-character line. Small
                grey type is the last thing that should be running the widest
                measure on the page. */}
            {/* The page's only CTA between the hero and the form, and this is
                where it belongs: the reader has just been shown 15 / 8 / 4 and
                knows what the thing costs. It used to sit five sections lower
                in a "New York. One neighborhood at a time." block whose body
                repeated the hero's own facts line and the form's own opening
                sentence, and whose two buttons were word-for-word the hero's.
                Same buttons, at the moment someone might actually press one. */}
            <div className="grid sec-body" style={{ alignItems: 'center' }}>
              <p className="c6 muted">{h.pricing.foot}</p>
              <div className="c5 c-end cta-row">
                <Link href={`${href(lang, 'merchants')}#access`} className="btn btn-primary">{h.ctaPrimary} <span className="arr" aria-hidden="true">→</span></Link>
                <TextLink href={`${href(lang, 'creators')}#access`}>{h.ctaSecondary}</TextLink>
              </div>
            </div>
          </div>
        </section>

        {/* WHY NOW — heading rail left, the chronology right */}
        <section className="section">
          <div className="wrap">
            <div className="rail">
              <div className="rail-head">
                <span className="label lbl">{h.now.label}</span>
                <h2 className="h2"><span className="hl">{h.now.title}</span></h2>
                <p className="lead">{h.now.close}</p>
                {/* the rail's left column runs out well above the chronology
                    beside it; the tile is what stops it trailing into white */}
                <Tile n={2} mark className="rail-tile" />
              </div>
              <Chrono items={h.now.items} />
            </div>
          </div>
        </section>

        {/* THE CHAIN — its own chapter, on the same rail anatomy as the two
            sections around it. It used to hang full-bleed under the why-now
            rail: 1104px wide, which is wider than the deck ever draws it, and
            it pushed that one section to 1157px — half again the height of any
            other. Heading and verdict left, matrix right, caption out from
            under the table. */}
        <section className="section">
          <div className="wrap">
            {/* Deliberately NOT the rail the two sections around it use —
                three consecutive spreads with a heading left and a rule down
                the middle is one idea printed three times.
                The verdict rides with the heading rather than in a column
                beside the chart: three lines of text against six rows of bars
                left a third of the section empty on the right, which is the
                kind of imbalance you feel before you can name it. Heading and
                argument on top, figure underneath at a measure it can be read
                at. */}
            <Head label={h.chain.label} title={h.chain.title} lead={h.chain.caption} />
            <div className="sec-body"><ChainMatrix c={h.chain} /></div>
          </div>
        </section>

        {/* THE RECORD — heading across the top, three full-bleed cards under it.
            It was a rail: heading right, three cards squeezed into the left
            column at 215px wide and 548 tall. Two things were wrong with that.
            A 1:2.5 slab is the wrong shape for a card whose whole surface is
            the picture — the field had no room to be a field. And the rail's
            text column ran out early, so it carried a fourth colour block with
            nothing in it, which made the section read as four unrelated
            coloured things rather than as one heading and its three examples.
            Full width gives the cards a 3:4 and drops the orphan.
            It does not repeat 03, which is a bar figure over three short
            lidded cards; these are tall and printed on. */}
        <section className="section tone-paper">
          <div className="wrap">
            <Head label={h.ai.label} title={h.ai.title} lead={h.ai.lead} />
            <div className="sec-body">
              <Trio items={h.ai.items} tiles={[7, 5, 9]}
                pats={['moire', 'truchet', 'flow']}
                flows={['gx-1', 'gx-5', 'gx-3']} ar={0.78} wash />
              <p className="muted rec-close">{h.ai.close}</p>
            </div>
          </div>
        </section>

        {/* START */}

        <Access t={t} lang={lang} />
      </main>
      <ThumbBar href={`${href(lang, 'merchants')}#access`} label={h.ctaPrimary} />
      <Footer lang={lang} t={t} />
    </>
  );
}
