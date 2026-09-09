import type { CSSProperties } from 'react';
import type { Dict } from '@/content/types';

/* ===========================================================================
   COMPETITIVE LANDSCAPE — the deck's matrix, with the moat drawn in it.
   ---------------------------------------------------------------------------
   The plain tick table was right and dull: correct, conventional, and saying
   nothing a reader could not have got from a spreadsheet. The device that
   earns its place here is not decoration, it is arithmetic already sitting in
   the data and never shown.

   The caption claims "three of these columns are not features a competitor
   can ship". That is checkable, so it is checked — in code, at render, not by
   hand in the copy. A column where the only dot belongs to us is marked, and
   the count comes out at three: post → visit traced, creator paid per visit,
   dynamic rewards. If a competitor's row ever gains one of those, the mark
   disappears on its own and the sentence stops being true out loud rather
   than quietly.

   So the figure reads as one horizontal band (our row) crossing three vertical
   ones (the columns only we hold). Where they meet is the argument.

   Dots, not ticks: solid for held, a hollow ring for absent — the site's own
   mark of absence, the same one the creator's $0 wears.

   ON A PHONE IT STAYS A MATRIX. It used to break into six stacked blocks,
   each listing its held criteria down the page — six lists where the whole
   point is a comparison you make with your eyes across a grid. Nine hundred
   pixels of vertical text that answered a question nobody asked one row at a
   time.

   Squeezing the desktop grid down was not the answer either: eight dot columns
   crammed into 60% of a phone while each row stood 110px tall is the worst of
   both — cramped across, wasteful down.

   So on a phone it is a list, the shape phones are built out of. One block per
   player: name and tally on the first line, the eight dots spread across the
   FULL width underneath. The dots still line up column-for-column between
   blocks, so it is still a matrix you read by sweeping down — it just stops
   pretending to be a table. Headers are 1–8 over the same eight positions and
   the words sit in a legend below.
   =========================================================================== */
export default function ChainMatrix({ c }: { c: Dict['home']['chain'] }) {
  const us = c.rows.find(r => r.us);
  /* a column is ours alone when we hold it and nobody else does */
  const only = c.links.map((_, i) =>
    !!us?.has[i] && c.rows.every(r => r.us || !r.has[i]));

  return (
    <figure className="cmatrix-fig">
    <table className="cmatrix">
      <thead>
        <tr>
          <th scope="col"><span className="sr">{c.rowHead}</span></th>
          {c.links.map((l, i) => (
            <th key={l} scope="col" data-col={i} data-only={only[i] ? '' : undefined}>
              <span className="cm-h">{l}</span>
              <span className="cm-i" aria-hidden="true">{i + 1}</span>
              {only[i] && <i className="cm-only" aria-hidden="true" />}
            </th>
          ))}
          <th scope="col" className="cm-total-h"><span className="sr">{c.heldHead}</span></th>
        </tr>
      </thead>
      <tbody>
        {/* Ordered by coverage, not by the deck's slide order. Down the right
            edge the numerals then step 8 → 3 → 3 → 2 → 2 → 2 instead of
            bouncing 8 → 2 → 3 → 2 → 3 → 2, and a staircase is the rhythm this
            block was missing. Claim keeps its billing in the sentence above,
            which is where "closest" is a judgement rather than a count. */}
        {[...c.rows]
          .map((r, i) => ({ r, i, n: r.has.filter(Boolean).length }))
          .sort((a, b) => b.n - a.n || a.i - b.i)
          .map(({ r }) => (
          <tr key={r.who} data-us={r.us ? '' : undefined}>
            <th scope="row"><b>{r.who}</b><em>{r.what}</em></th>
            {/* Three spans per cell: the stacked layout needs the criterion
                NAMED beside the dot, while the wide layout gets it from the
                column header. The yes/no word is for screen readers only — it
                must never surface next to a dot that already says it. */}
            {r.has.map((on, i) => (
              <td key={i} data-col={i} data-on={on ? '' : undefined} data-only={only[i] ? '' : undefined}>
                <span className="cm-mark" aria-hidden="true" />
                <span className="sr">{on ? c.yes : c.no}</span>
                <span className="cm-name" aria-hidden="true">{c.links[i]}</span>
              </td>
            ))}
            {/* THE TALLY IS THE HEADLINE, and its SIZE is the score.
                Same device as the rate staircase elsewhere on this site: the
                numeral's area encodes the value, on a square root because the
                eye compares areas rather than heights. Eight out of eight is
                twice the type size of two out of eight, so the ranking is read
                before a single dot is. A figure that has to be tallied by the
                reader is a table; one that states its own answer at four
                different sizes is a chart. */}
            <td className="cm-total" aria-hidden="true"
              style={{ '--n': Math.sqrt(r.has.filter(Boolean).length / c.links.length).toFixed(3) } as CSSProperties}>
              <b>{r.has.filter(Boolean).length}</b><i>/{c.links.length}</i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* the words the numbered headers stand in for, narrow widths only */}
      <figcaption className="cmatrix-key" aria-hidden="true">
        {c.links.map((l, i) => (
          <span key={l} data-only={only[i] ? '' : undefined}>
            <b>{i + 1}</b>{l}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
