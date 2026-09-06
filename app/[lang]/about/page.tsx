import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Wash from '@/components/Wash';
import Footer from '@/components/Footer';
import { Head, Cols, Access, ThumbBar, SpecCard } from '@/components/blocks';
import { getDict, SITE, type Lang } from '@/content';
import { pageMetadata } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return pageMetadata(lang, 'about', getDict(lang).about.meta);
}

export default async function About({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const a = t.about;
  const mail = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <>
      <Nav lang={lang} t={t} current="about" />
      <main id="main" tabIndex={-1}>
        <section className="hero lit">
          <Wash seed={5} />
          <div className="wrap">
            <div className="hero-grid">
              <span className="label rise">{a.eyebrow}</span>
              <h1 className="hero-title rise">{a.title}</h1>
              <div className="hero-sub">
                <div>
                  <p className="lead rise">{a.lead}</p>
                </div>
                <SpecCard c={a.heroCard} />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid">
              <div className="c5"><Head label={a.what.label} title={a.what.title} /></div>
              <div className="c7 stack-l">
                {a.what.paras.map(p => <p className="lead" key={p.slice(0, 24)} style={{ fontSize: 'var(--t-body)' }}>{p}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section tone-paper">
          <div className="wrap">
            <Head label={a.principles.label} title={a.principles.title} />
            {/* Four items in a three-up feat grid left an orphan on row two,
                and the run-in clause was swallowing the 01-04 numbering these
                commitments are written to carry. Cols at two columns: 2x2, the
                numbers visible, each cell ruled. */}
            <div className="sec-body"><Cols items={a.principles.cols} n={2} /></div>
          </div>
        </section>

        <section className="section tone-ink" id="hiring">
          <div className="wrap">
            <Head label={a.hiring.label} title={a.hiring.title} />
            {/* the terms come before the list on purpose: a role is only worth
                reading once you know these are pre-funding seats */}
            <div className="sec-body"><p className="lead" style={{ maxWidth: '62ch' }}>{a.hiring.note}</p></div>
            <div className="sec-body"><Cols items={a.hiring.roles} n={3} /></div>
            <div className="sec-body">
              <a className="btn btn-primary" href={mail('Hibi — role')}>{a.hiring.cta} <span className="arr" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="section" id="investors">
          <div className="wrap">
            <div className="grid" style={{ alignItems: 'end' }}>
              <div className="c7"><Head label={a.investors.label} title={a.investors.title} /></div>
              <div className="c5 stack-l">
                <p className="lead">{a.investors.body}</p>
                <a className="btn btn-text" href={mail('Hibi — investor materials')}>{a.investors.cta} <span className="arr" aria-hidden="true">→</span></a>
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
