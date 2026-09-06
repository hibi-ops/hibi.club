import type { Dict } from '@/content/types';

/* ===========================================================================
   THE CHAIN — the deck's competitive matrix, rebuilt for a page.
   ---------------------------------------------------------------------------
   The slide is 6 rows x 8 columns of ticks. Forty-eight glyphs is a thing you
   narrate, not a thing anyone reads on a website: the eye has nowhere to land
   and the conclusion never arrives.

   FIRST ATTEMPT, AND WHY IT WAS WRONG. It drew each row as a bar whose length
   was "reach" — how many links you hold before the first gap — with a dot per
   column on top. Claim holds links 3 and 5 but not 1, so its reach was zero:
   the row rendered a zero-width bar underneath two solid dots. A reader sees a
   competitor marked as having two of the five things and simultaneously as
   reaching nothing, and the honest reading of that is that we cooked the bar.
   A competitive chart that understates a competitor is the fastest way to lose
   the person checking it, and the person checking it is the investor.

   WHAT IT IS NOW. The chain is five links, drawn as five segments of one
   track, per row. Held links are solid; missing links are the site's outline —
   the same mark of absence the creator's $0 wears in the problem section. No
   score, no derived number, nothing to dispute: every cell says exactly what
   the deck's tick said, and the shape does the arguing.

   Hibi is the only row with no gaps in it, so it is the only row that reads as
   one continuous bar. You see that before you have read a single label, which
   is the whole job. Everyone else is islands.
   =========================================================================== */
export default function ChainMatrix({ c }: { c: Dict['home']['chain'] }) {
  return (
    <figure className="chain">
      {/* the header is built from the SAME two-part grid as a row, with the
          five labels in their own nested track. Laid out as one flat 6-column
          grid it used a different gap budget from the rows and the labels
          drifted off their segments by 12px at the left edge, closing to 3px
          at the right — the kind of misalignment you feel before you find. */}
      <div className="chain-head" aria-hidden="true">
        <span />
        <span className="chain-head-links">
          {c.links.map(l => <span key={l} className="chain-link">{l}</span>)}
        </span>
      </div>

      <ol className="chain-rows">
        {c.rows.map(r => {
          const held = r.has.filter(Boolean).length;
          return (
            <li key={r.who} className="chain-row" data-us={r.us ? '' : undefined}>
              <span className="chain-who">
                <b>{r.who}</b><em>{r.what}</em>
              </span>
              <span className="chain-track"
                role="img"
                aria-label={`${r.who}: ${held ? r.has.map((on, i) => on ? c.links[i] : null).filter(Boolean).join(', ') : c.none}`}>
                {/* A row that holds nothing drew five empty boxes AND a label
                    reading "none of it" — the same fact stated twice, with the
                    label sitting inside the first box as though that link were
                    the one being denied. It says it once now. */}
                {held === 0
                  ? <span className="chain-none">{c.none}</span>
                  : r.has.map((on, i) => (
                    <span key={i} className="chain-seg" data-on={on ? '' : undefined}>
                      {/* the link name rides inside the segment on small
                          screens, where the header row is gone */}
                      <span className="chain-seg-k">{c.links[i]}</span>
                    </span>
                  ))}
              </span>
            </li>
          );
        })}
      </ol>

      <figcaption className="chain-cap">{c.caption}</figcaption>
    </figure>
  );
}
