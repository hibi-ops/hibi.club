import Link from 'next/link';
import AccessForm from './AccessForm';
import Icon from './Icon';
import Tile, { type Pattern } from './Tile';
import AccessPlate from './AccessPlate';
import type { CSSProperties, ReactNode } from 'react';
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
    /* the column count is a class, not just a custom property: the hairline
       rules need to know where a row starts, and CSS cannot read a variable
       inside :nth-child() */
    <div className={`cols cols-${n ?? items.length}`}>
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

/* NO TILES ON THE STEPS. Built twice — one palette across three bands at 84px,
   then three palettes at 132 — and cut both times for the same reason. The
   grain is inset -22% and blurred 24px, so the blur is a fraction of the BOX:
   7% of the width on a 357px record card, 18-29% of the height on a band. What
   comes out is a soft grey-green smear, three of them in a row, and no amount
   of palette fixes a box that is too small for the instrument. The colour on
   this page went where it has room instead — the readout in 01 and the rail
   tile under the questions. */
/* THE COMMITMENTS ARE THE PAGE, SO THEY GET THE PAGE'S VOICE.
   Four of them sat in a 2x2 of 15px cards, which is where you put things you
   have to list — and these are the one part of an about page anyone quotes
   back at you. One per row now: the commitment at heading size, the reasoning
   beside it at reading size, ruled between like every other table here. The
   lead row opens on an ink rule and the rest on hairlines, the same grammar
   as .step and .rate.

   The titles carry .hl, so each inverts under the cursor. That gesture is
   protected and its note asks for it to be used MORE; a page of promises is
   exactly where you want the reader striking them one at a time. */
export function Manifesto({ items }: { items: Col[] }) {
  return (
    <ol className="manif">
      {items.map(c => (
        <li key={c.title}>
          <span className="manif-n" aria-hidden="true">{c.label}</span>
          <h3 className="manif-t"><span className="hl">{c.title}</span></h3>
          <p className="manif-b">{c.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Steps({ items }: { items: Step[] }) {
  /* a custom property, not an inline grid-template: an inline declaration
     outranks the mobile media query and four columns would overflow 390px */
  return (
    <div className="steps" style={{ '--n': items.length } as CSSProperties}>
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
  /* The numeral's area carries the rate, so its height is the square root of
     the value normalised to the largest — the eye compares areas, not heights.
     Read off the copy rather than hardcoded, so the type cannot end up
     describing a rate table that has since changed. */
  const vals = tiers.map(p => parseFloat(p.num));
  const top = Math.max(...vals.filter(v => Number.isFinite(v) && v > 0), 0);
  return (
    <div className="rates">
      {tiers.map((p, i) => (
        <div className="rate" key={p.title}
          style={{ '--rw': top && Number.isFinite(vals[i]) && vals[i] > 0
            ? (Math.sqrt(vals[i]) / Math.sqrt(top)).toFixed(3) : 1 } as React.CSSProperties}>
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
/* Three panels, each marked by a colour tile. The card-thumbnail pattern:
   the tile gives the block an identity you can point at, and because it sits
   ABOVE the type rather than behind it, nothing has to be read off a gradient.
   `tiles` and `pats` name the palette and the pattern for each column, and
   `ar` the rough shape of a tile in this trio — measured, because the two
   trios sit at different widths (a full-width card runs about 3:2, the same
   card in a rail runs closer to square) and the pattern is generated at that
   shape rather than cropped to it. All props and not derived: the page has two
   trios, and derived values made the second a repeat of the first. */
export function Trio({ items, tiles, pats, flows, ar, wash }:
  { items: Col[]; tiles: number[]; pats?: Pattern[]; flows?: string[]; ar?: number; wash?: boolean }) {
  return (
    <div className={wash ? 'trio trio-wash' : 'trio'}>
      {items.map((c, i) => (
        <div className="panel" key={c.title}>
          {pats ? (
            <Tile n={tiles[i % tiles.length]} pat={pats[i % pats.length]}
              flow={flows?.[i % flows.length]} ar={ar} fill={wash} />
          ) : null}
          <div className="panel-body">
            <span className="tl-k">{c.label}</span>
            <h3 className="tl-t">{c.title}</h3>
            {/* wrapped so the record cards can fold it away at rest — the
                collapse is a grid-template-rows transition on this element and
                needs a single child to clip. Everywhere else it is inert. */}
            <div className="tl-more"><p className="tl-p">{c.body}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

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

/* Two states, because two lists here mean opposite things and were wearing the
   same tick. "No subscription" under Everything else is zero is a confirmed
   absence — a tick is right. "No SOC 2 audit yet" under What we have not done
   yet is an OPEN item, and a green tick beside it reads as though not being
   audited were an accomplishment. An unticked box says the true thing: on the
   list, not done. */
/* `rows` sets the list one item per line, ruled, at a size a statement can
   carry. It exists for the one place on the site where the list IS the
   section — security's "what we have not done yet" — where the compact
   two-column cluster left a 274px band of ink between two 620px sections,
   which is the pasted-box failure the ink rule warns about rather than a
   chapter. Everywhere else the compact form is right: those lists sit beside
   something else that is doing the arguing. */
export function Checks({ items, pending, rows }: { items: string[]; pending?: boolean; rows?: boolean }) {
  return (
    <ul className={`checks${rows ? ' checks-rows' : ''}`} data-pending={pending ? '' : undefined}>
      {items.map(x => (
        <li key={x}>
          {pending
            ? <span className="checks-box" aria-hidden="true" />
            : <Icon name="check" size={16} />}
          {x}
        </li>
      ))}
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

/* THE PLATE, WITH SOMETHING PRINTED ON IT.
   These two columns end in a sheet of ink that closes them so they do not
   trail into white. That job is real, but a plate with nothing on it reads as
   a picture that failed to load — and the fix is not another drawing (the
   contour fields that used to sit here were taken off as noise; the record
   cards are the only patterned tiles left). It is the thing a printed plate
   actually carries: a register cross, and a line of type at the foot.
   The copy is not new. Both plates reprint strings this site already has, in
   the place where they are worth having again — no line here was written for
   the sake of filling the box. */
export function Plate({ n, className = '', children }:
  { n: number; className?: string; children: ReactNode }) {
  return (
    <div className={`plate ${className}`}>
      <Tile n={n} mark className="plate-bg" />
      <div className="plate-body">{children}</div>
    </div>
  );
}

export function Access({ t, lang, role }: { t: Dict; lang: Lang; role?: 'merchant' | 'creator' }) {
  return (
    <section className="section tone-paper access" id="access">
      {/* THE HEADING SPANS, SO THE TWO COLUMNS CAN END TOGETHER. It used to sit
          inside the left column above the plate, which made that column the
          heading block plus a plate — 535px against a 394px form, so the form
          stopped 141px short of the section foot and the section finished on
          one side only. No floor on the plate could fix it: even at its natural
          height the left column came to 456, still taller than the form.
          Above the grid, the row is just plate against form. They start
          together, they end together, and the plate takes the form's full
          height instead of a floor invented to keep it from collapsing. */}
      <div className="wrap">
        <div className="access-head">
          <span className="label">{t.nav.cta}</span>
          <h2 className="h1">{t.form.title}</h2>
          <p className="lead">{t.form.lead}</p>
        </div>
        <div className="grid sec-body">
          <div className="c5 access-side">
            {/* it follows the visitor's role rather than repeating the same
                three lines on all seven pages — see AccessPlate. */}
            <AccessPlate rows={t.about.heroCard.rows}
              merchantFoot={t.merchants.heroCard.foot}
              creatorFoot={t.creators.heroCard.foot} initialRole={role} />
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

export function SpecCard({ c, drift }: { c: HeroCard; drift?: boolean }) {
  return (
    <aside className={`spec-card sheen${drift ? ' drift' : ''}`}>
      <span className="k">{c.label}</span>
      <div className="spec-rows">
        {c.rows.map(r => (
          <div className="srow" key={r.k}>
            <span className="sk">{r.k}</span>
            <span className="sv">{r.v}</span>
            {r.u && <span className="su">{r.u}</span>}
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
