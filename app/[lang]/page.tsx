import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import LedgerLive from '@/components/LedgerLive';
import Wash from '@/components/Wash';
import WalkIn from '@/components/WalkIn';
import WeekStats from '@/components/WeekStats';
import Footer from '@/components/Footer';
import { Head, PriceTiers, Access, TextLink, ThumbBar, Split, Chrono, Feats, Ticker, BigMarquee } from '@/components/blocks';
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

        {/* HOW */}
        <section className="section tone-paper">
          <div className="wrap">
            <Head label={h.how.label} title={h.how.title} />
            <div className="sec-body"><WalkIn steps={h.how.steps} d={h.how.demo} /></div>
            <div className="record">
              <span className="tag">{h.how.recordTag}</span>
              <p>{h.how.record}</p>
            </div>
            <WeekStats s={h.how.stats} />
          </div>
        </section>

        {/* THREE SIDES */}
        {/* The one spread that goes electric. It earns it: this is the section
            where the whole model is stated — three parties, one transaction —
            and a page needs a second anchor after the hero or it reads as one
            good screen followed by documentation. */}
        <section className="section tone-hibi">
          <div className="wrap">
            <Head label={h.sides.label} title={h.sides.title} wide />
            <div className="sec-body"><Split s={h.sides.split} /></div>
            <div className="sec-body"><Feats items={h.sides.cols} /></div>
          </div>
        </section>

        <BigMarquee text={h.marquee} />

        {/* PRICING */}
        <section className="section tone-paper">
          <div className="wrap">
            <Head label={h.pricing.label} title={h.pricing.title} />
            <div className="sec-body"><PriceTiers tiers={h.pricing.tiers} /></div>
            <div className="grid sec-body" style={{ alignItems: 'center' }}>
              <p className="c8 muted">{h.pricing.foot}</p>
              <div className="c4"><TextLink href={href(lang, 'merchants')}>{h.pricing.cta}</TextLink></div>
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
              </div>
              <Chrono items={h.now.items} />
            </div>
          </div>
        </section>

        {/* MODELS — same rail anatomy */}
        <section className="section tone-paper">
          <div className="wrap">
            <div className="rail">
              <div className="rail-head">
                <span className="label lbl">{h.ai.label}</span>
                <h2 className="h2"><span className="hl">{h.ai.title}</span></h2>
                <p className="lead">{h.ai.lead}</p>
                <p className="muted">{h.ai.close}</p>
              </div>
              <Feats items={h.ai.items} />
            </div>
          </div>
        </section>

        {/* START */}
        <section className="section">
          <div className="wrap">
            <div className="grid" style={{ alignItems: 'end' }}>
              <div className="c7">
                <span className="label">{h.start.label}</span>
                <h2 className="h1 hd sec-body"><span className="hl">{h.start.title}</span></h2>
              </div>
              <div className="c5 stack-l">
                <p className="lead">{h.start.body}</p>
                <div className="cta-row">
                  <Link href={`${href(lang, 'merchants')}#access`} className="btn btn-primary">{h.start.ctaMerchant} <span className="arr" aria-hidden="true">→</span></Link>
                  <TextLink href={`${href(lang, 'creators')}#access`}>{h.start.ctaCreator}</TextLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Access t={t} lang={lang} />
      </main>
      <ThumbBar href={`${href(lang, 'merchants')}#access`} label={h.ctaPrimary} />
      <Footer lang={lang} t={t} />
    </>
  );
}
