import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { Head, Steps, PriceTiers, Faq, Access, TextLink, ThumbBar, SpecCard } from '@/components/blocks';
import { getDict, href, type Lang } from '@/content';
import { pageMetadata, faqJsonLd } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, 'merchants', getDict(lang).merchants.meta);
}

export default async function Merchants({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const m = t.merchants;
  return (
    <>
      <Nav lang={lang} t={t} current="merchants" />
      <JsonLd data={faqJsonLd(m.faq.items)} />
      <main id="main" tabIndex={-1}>
        <section className="hero lit">
          <div className="wrap">
            <div className="hero-grid">
              <span className="label rise">{m.eyebrow}</span>
              <h1 className="hero-title rise">{m.title}</h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{m.lead}</p>
                  <div className="cta-row rise sec-body">
                <a href="#access" className="btn btn-primary">{t.nav.cta} <span className="arr" aria-hidden="true">→</span></a>
                <TextLink href={href(lang, 'creators')}>{t.nav.creators}</TextLink>
              </div>
                </div>
                <SpecCard c={m.heroCard} />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={m.set.label} title={m.set.title} />
            <div className="rows sec-body">
              {m.set.rows.map(r => (
                <div className="row" key={r.k}>
                  <h3 className="h2">{r.k}</h3>
                  <p className="lead" style={{ fontSize: 'var(--t-body)' }}>{r.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section tone-paper">
          <div className="wrap">
            <Head label={m.counter.label} title={m.counter.title} lead={m.counter.body} />
            <div className="sec-body"><Steps items={m.counter.steps} /></div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid">
              <div className="c5">
                <Head label={m.bill.label} title={m.bill.title} />
              </div>
              <div className="c7 stack">
                <p className="lead">{m.bill.body}</p>
                <p className="ledger sec-body hairline-top">{m.bill.ledger}</p>
                <p className="small muted">{m.bill.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section tone-paper" id="pricing">
          <div className="wrap">
            <Head label={m.pricing.label} title={m.pricing.title} />
            <div className="sec-body"><PriceTiers tiers={m.pricing.tiers} /></div>
            <div className="grid sec-body" style={{ alignItems: 'center' }}>
              <p className="c7 muted">{m.pricing.foot}</p>
              <div className="c5">
                <TextLink href={href(lang, 'pricing')}>{t.footer.fullPricing}</TextLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="rail">
              <div className="rail-head">
                <span className="label lbl">{m.faq.label}</span>
                <h2 className="h2"><span className="hl">{m.faq.title}</span></h2>
              </div>
              <Faq items={m.faq.items} />
            </div>
          </div>
        </section>


        <Access t={t} lang={lang} role="merchant" />
      </main>
      <ThumbBar href={'#access'} label={t.nav.cta} />
      <Footer lang={lang} t={t} />
    </>
  );
}
