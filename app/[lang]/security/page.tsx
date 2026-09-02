import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Wash from '@/components/Wash';
import Footer from '@/components/Footer';
import { Head, Cols, Steps, Checks, Access, TextLink, ThumbBar } from '@/components/blocks';
import { getDict, href, type Lang } from '@/content';
import { SITE } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, 'security', getDict(lang).security.meta);
}

export default async function Security({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const s = t.security;
  return (
    <>
      <Nav lang={lang} t={t} current="security" />
      <main id="main" tabIndex={-1}>
        <section className="hero lit">
          <Wash seed={4} />
          <div className="wrap">
            <div className="hero-grid">
              <span className="label rise">{s.eyebrow}</span>
              <h1 className="hero-title rise">{s.title}</h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{s.lead}</p>
                  <div className="cta-row rise sec-body tight">
                    <TextLink href={href(lang, 'legal')}>{t.footer.privacy}</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={s.pillars.label} title={s.pillars.title} />
            <div className="sec-body"><Cols items={s.pillars.cols} n={2} /></div>
          </div>
        </section>

        {/* the ground behind "the check" is kept smooth; every few seconds one
            isolated spike stands up and is held — the record that does not fit
            the store's own history, drawn as the copy describes it */}
        <section className="section tone-paper relief">
          <Wash variant="outlier" seed={10} />
          <div className="wrap">
            <Head label={s.redemption.label} title={s.redemption.title} />
            <div className="sec-body"><Steps items={s.redemption.steps} /></div>
            <p className="muted sec-body tight">{s.redemption.note}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Head label={s.data.label} title={s.data.title} />
            {/* the same definition-row grammar the merchants page uses */}
            <div className="rows sec-body">
              {s.data.rows.map(r => (
                <div className="row" key={r.k}>
                  <h3 className="h3">{r.k}</h3>
                  <p>{r.v}</p>
                </div>
              ))}
            </div>
            <p className="muted sec-body tight">{s.data.note}</p>
          </div>
        </section>

        {/* the stage section is deliberately the plainest block on the page */}
        <section className="section tone-ink">
          <div className="wrap">
            <div className="rail">
              <div className="rail-head">
                <span className="label lbl">{s.stage.label}</span>
                <h2 className="h2"><span className="hl">{s.stage.title}</span></h2>
                <p className="lead">{s.stage.body}</p>
              </div>
              <div>
                <Checks items={s.stage.items} />
                <div className="cta-row sec-body">
                  <a href={`mailto:${SITE.email}`} className="btn btn-second">
                    {s.stage.cta} <span className="arr" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Access t={t} lang={lang} />
      </main>
      <ThumbBar href="#access" label={t.nav.cta} />
      <Footer lang={lang} t={t} />
    </>
  );
}
