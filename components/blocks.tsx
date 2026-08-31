import Link from 'next/link';
import AccessForm from './AccessForm';
import Icon from './Icon';
import type { Col, Step, QA, Dict, HeroCard } from '@/content/types';
import type { Lang } from '@/content/site';

/* Section header: tracked label + index on a hairline (deck style) */
export function Head({ label, title, lead, wide, small }: { label: string; title: string; lead?: string; wide?: boolean; small?: boolean }) {
  return (
    <>
      <span className="label lbl">{label}</span>
      <h2 className={`${small ? 'h2' : 'h1'} hd${wide ? ' hd-wide' : ''}`}><span className="hl">{title}</span></h2>
      {lead && <p className="lead sec-lead">{lead}</p>}
    </>
  );
}

export function Cols({ items, n }: { items: Col[]; n?: number }) {
  return (
    <div className="cols" style={{ ['--n' as string]: n ?? items.length }}>
      {items.map(c => (
        <div key={c.title}>
          <span className="label">{c.label}</span>
          <h3 className="h3">{c.title}</h3>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: Step[] }) {
  return (
    <div className="steps" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((s, i) => (
        <div className="step" key={s.title}>
          <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="h3">{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((x, i) => (
        <details key={x.q} open={i === 0}>
          <summary>{x.q}</summary>
          <p className="a">{x.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PriceTiers({ tiers }: { tiers: Dict['home']['pricing']['tiers'] }) {
  return (
    <div className="rates">
      {tiers.map((p, i) => (
        <div className="rate" key={p.title}>
          <span className="rk">{p.title}</span>
          <span className="rd">{p.body}</span>
          <span className="rv">
            <span className="rn">{p.num}</span>
            {p.unit && <span className="ru">{p.unit}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

/* A dense benefit grid — six items readable without scrolling past three cards */
export function Feats({ items }: { items: Col[] }) {
  return (
    <div className="feat">
      {items.map(c => (
        <p key={c.title}>
          {/* the separator is punctuation, and punctuation is language-specific:
              a Latin full stop after Han text is simply the wrong glyph */}
          <b className="ft">{c.title}</b><span className="fb">{c.body}</span>
        </p>
      ))}
    </div>
  );
}

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map(x => <li key={x}><Icon name="check" size={16} />{x}</li>)}
    </ul>
  );
}

/* Fixed to the viewport, so it lives on the page root and never inside a
   scrolling section (the app's §8.1 rule). */
export function ThumbBar({ href, label }: { href: string; label: string }) {
  return (
    <div className="thumb-bar">
      <Link href={href} className="btn btn-primary">{label} <span className="arr" aria-hidden="true">→</span></Link>
    </div>
  );
}

export function Access({ t, lang, role }: { t: Dict; lang: Lang; role?: 'merchant' | 'creator' }) {
  return (
    <section className="section tone-paper access" id="access">
      <div className="wrap">
        <div className="grid">
          <div className="c5 stack">
            <span className="label">{t.nav.cta}</span>
            <h2 className="h1">{t.form.title}</h2>
            <p className="lead">{t.form.lead}</p>
          </div>
          <div className="c7">
            <AccessForm t={t.form} lang={lang} initialRole={role} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn btn-second">{children} <span className="arr" aria-hidden="true">→</span></Link>
  );
}

/* The artefact the product produces, rendered as itself. Not a screenshot:
   real text scales, translates, and stays readable to a screen reader. */
export function LedgerCard({ c }: { c: Dict['home']['ledgerCard'] }) {
  return (
    <figure className="ledger-card sheen">
      <div className="ledger-head">
        <span className="k">{c.label}</span>
        <span className="v">{c.period}</span>
      </div>
      <div className="ledger-rows">
        {c.rows.map((r, i) => (
          <div className="lrow" key={i}>
            <span className="lsrc">
              <span className="src">{r.who}</span>
              <span className="meta">{r.meta}</span>
            </span>
            <span className="lamt">
              <span className="amt">{r.amt}</span>
              <span className="fee">{r.fee}</span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="ledger-foot">
        <span className="t">{c.totalLabel}</span>
        <span className="n">{c.total}</span>
      </figcaption>
    </figure>
  );
}

/* The number, beside the headline, without a click. */
export function SpecCard({ c }: { c: HeroCard }) {
  return (
    <aside className="spec-card sheen">
      <span className="k">{c.label}</span>
      <div className="spec-rows">
        {c.rows.map(r => (
          <div className="srow" key={r.k}>
            <span className="sk">{r.k}</span>
            <span className="sv">{r.v}{r.u && <span className="su">{r.u}</span>}</span>
          </div>
        ))}
      </div>
      <p className="spec-foot">{c.foot}</p>
    </aside>
  );
}

/* ---------------------------------------------------------------------------
   Four sections used to share one three-card grid. Squinting at the page, they
   were indistinguishable — which is the tell of a layout chosen by convenience
   rather than by what the content is. Each of the following says one thing the
   others cannot: a sequence, a division, a chronology.
   ------------------------------------------------------------------------ */


export { default as Split } from './Split';

/* A chronology. The axis is horizontal and the dates sit on it, because the
   claim being made is that these events happened in this order. */
export function Chrono({ items }: { items: Col[] }) {
  return (
    <ol className="chrono">
      {items.map(c => (
        <li key={c.title}>
          <span className="chrono-when">{c.label}</span>
          <h3 className="h3">{c.title}</h3>
          <p>{c.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* The week as a wire feed: one line, monospaced, crawling under the hero.
   Real rows from the labelled sample week — a data stream, not a marquee of
   slogans. Content is duplicated once so the CSS loop is seamless; static
   under prefers-reduced-motion (the first copy simply stands still). */
export function Ticker({ c }: { c: Dict['home']['ledgerCard'] }) {
  const rows = [...c.rows, ...c.pool];
  const line = rows.map(r => `${r.who} · ${r.amt} → ${r.fee}`);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-in">
        {[0, 1].map(k => (
          <span className="ticker-run" key={k}>
            {line.map((t, i) => <span className="tk" key={i}>{t}</span>)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* One phrase, outline, monumental, crawling once between acts. It reuses the
   ticker's loop mechanics at poster scale — data crawls small at the top of
   the page, the brand crawls huge in the middle, and nothing else moves on
   its own. */
export function BigMarquee({ text }: { text: string }) {
  return (
    <div className="bigmq" aria-hidden="true">
      <div className="bigmq-in">
        {[0, 1].map(k => <span className="bigmq-run" key={k}>{text.repeat(3)}</span>)}
      </div>
    </div>
  );
}
