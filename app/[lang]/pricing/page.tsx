import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Estimator from '@/components/Estimator';
import Wash from '@/components/Wash';
import { Head, PriceTiers, Checks, Faq, Access, ThumbBar } from '@/components/blocks';
import { getDict, href, type Lang } from '@/content';
import { pageMetadata, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, 'pricing', getDict(lang).pricing.meta);
}

export default async function Pricing({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const p = t.pricing;
  return (
    <>
      <Nav lang={lang} t={t} current="pricing" />
      <JsonLd data={faqJsonLd(p.faq.items)} />
      <main id="main" tabIndex={-1}>
        <section className="hero lit">
          <Wash seed={3} />
          <div className="wrap">
            <div className="hero-grid">
              <span className="label rise">{p.eyebrow}</span>
              <h1 className="hero-title rise">{p.title}</h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{p.lead}</p>
                  <div className="cta-row rise sec-body tight">
                    <a href="#access" className="btn btn-primary">{t.nav.cta} <span className="arr" aria-hidden="true">→</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={p.rates.label} title={p.rates.title} />
            <div className="sec-body"><PriceTiers tiers={p.rates.tiers} /></div>
          </div>
        </section>

        {/* the estimator lives on the page that owns the numbers */}
        <section className="section tone-paper relief">
          <Wash variant="field" seed={7} />
          <div className="wrap">
            <Head label={p.calc.label} title={p.calc.title} lead={p.calc.lead} />
            <div className="sec-body"><Estimator c={p.calc} formHref="#access" /></div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={p.free.label} title={p.free.title} />
            <div className="sec-body"><Checks items={p.free.items} /></div>
            <p className="muted sec-body tight">{p.free.note}</p>
          </div>
        </section>

        <section className="section tone-paper">
          <div className="wrap">
            <Head label={p.compare.label} title={p.compare.title} lead={p.compare.body} />
            {/* a comparison table, typeset: the two columns are the argument */}
            <table className="cmp sec-body">
              <thead>
                <tr>
                  <th scope="col"><span className="sr">—</span></th>
                  <th scope="col">{p.compare.adsHead}</th>
                  <th scope="col">{p.compare.hibiHead}</th>
                </tr>
              </thead>
              <tbody>
                {p.compare.rows.map(r => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td className="cmp-ads">{r.ads}</td>
                    <td className="cmp-hibi">{r.hibi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="rail">
              <div className="rail-head">
                <span className="label lbl">{p.faq.label}</span>
                <h2 className="h2"><span className="hl">{p.faq.title}</span></h2>
              </div>
              <Faq items={p.faq.items} />
            </div>
          </div>
        </section>

        <Access t={t} lang={lang} role="merchant" />
      </main>
      <ThumbBar href="#access" label={t.nav.cta} />
      <Footer lang={lang} t={t} />
    </>
  );
}
