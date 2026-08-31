import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { Head, Cols, Steps, Faq, Access, TextLink, ThumbBar, SpecCard, Split } from '@/components/blocks';
import { getDict, href, type Lang } from '@/content';
import { pageMetadata, faqJsonLd } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, 'creators', getDict(lang).creators.meta);
}

export default async function Creators({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const c = t.creators;
  return (
    <>
      <Nav lang={lang} t={t} current="creators" />
      <JsonLd data={faqJsonLd(c.faq.items)} />
      <main>
        <section className="hero lit-pink lit">
          <div className="wrap">
            <div className="hero-grid">
              <span className="label rise">{c.eyebrow}</span>
              <h1 className="hero-title rise">{c.title}</h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{c.lead}</p>
                  <div className="cta-row rise sec-body">
                <a href="#access" className="btn btn-primary">{t.nav.cta} <span className="arr" aria-hidden="true">→</span></a>
                <TextLink href={href(lang, 'merchants')}>{t.nav.merchants}</TextLink>
              </div>
                </div>
                <SpecCard c={c.heroCard} />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={c.why.label} title={c.why.title} />
            <div className="sec-body"><Cols items={c.why.cols} /></div>
          </div>
        </section>

        <section className="section tone-paper">
          <div className="wrap">
            <Head label={c.how.label} title={c.how.title} />
            <div className="sec-body"><Steps items={c.how.steps} /></div>
          </div>
        </section>

        <section className="section tone-paper">
          <div className="wrap">
            <Head label={c.split.label} title={c.split.title} lead={c.split.body} />
            <div className="sec-body"><Split s={c.split.s} /></div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid">
              <div className="c4"><Head label={c.faq.label} title={c.faq.title} small /></div>
              <div className="c8"><Faq items={c.faq.items} /></div>
            </div>
          </div>
        </section>

        <Access t={t} lang={lang} role="creator" />
      </main>
      <ThumbBar href={'#access'} label={t.nav.cta} />
      <Footer lang={lang} t={t} />
    </>
  );
}
