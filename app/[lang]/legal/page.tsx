import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getDict, type Lang } from '@/content';
import { pageMetadata } from '@/lib/seo';

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params as { lang: Lang };
  return { ...pageMetadata(lang, 'legal', getDict(lang).legal.meta), robots: { index: false, follow: true } };
}

const slug = (s: string, i: number) => `s${i}-${s.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 32)}`;

export default async function Legal({ params }: P) {
  const { lang } = await params as { lang: Lang };
  const t = getDict(lang);
  const l = t.legal;
  const docs = [
    { id: 'privacy', title: l.privacy.title, sections: l.privacy.sections },
    { id: 'terms', title: l.terms.title, sections: l.terms.sections },
  ];
  return (
    <>
      <Nav lang={lang} t={t} current="legal" />
      <main>
        <section className="hero lit">
          <div className="wrap">
            <span className="label">{l.eyebrow}</span>
            <h1 className="h1 sec-body">{l.title}</h1>
            <p className="small muted sec-body tight">{l.updated}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <p className="notice">{l.notice}</p>
            {/* Two columns with a sticky index — a long legal document is the one
                place on the site where the reader arrives looking for a specific
                clause, and a flat scroll gives them no way to find it. */}
            <div className="doc sec-body">
              <nav className="doc-nav" aria-label={l.title}>
                {docs.map(d => (
                  <div key={d.id}>
                    <span className="label">{d.title}</span>
                    <ul>
                      {d.sections.map((s, i) => (
                        <li key={s.h}><a href={`#${slug(s.h, i)}`}>{s.h}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="doc-body">
                {docs.map(d => (
                  <section key={d.id} id={d.id} className="doc-part">
                    <h2 className="h2">{d.title}</h2>
                    {d.sections.map((s, i) => (
                      <article key={s.h} id={slug(s.h, i)} className="doc-sec">
                        <h3>{s.h}</h3>
                        {s.p.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
                      </article>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
