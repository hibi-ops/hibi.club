import WeaveLive from './WeaveLive';
import type { Weave } from '@/lib/pattern';

/* A colour object that marks a block: a grainy liquid field with a pattern
   over it.

   `n` picks one of nine palettes and one of three blob geometries. Palettes
   stay nine because nine tiles cycling three was a visible repeat.

   `fill` makes the field the whole card rather than a lid on top of it, with
   the caption printed on the field. The foot is darkened inside the colour
   layer itself (--fade, see figures.css) rather than by an element over it —
   an overlay sits above the grain and wipes it out wherever it covers, which
   is what made the bottom of these cards read as a smooth smudge under a
   textured field. Two other endings were built and dropped: a hard cut to an
   opaque white caption block (cleaner, and it cost two fifths of the picture)
   and a z-index scrim (the smudge).

   Things tried in this slot and removed, so they are not tried again: a
   three.js shader you could push around (busy at tile size); nine data figures
   drawn from each card's own copy (honest, and still wrong — diagrams stacked
   on gradients read as science fiction); a level set with an angular term,
   which makes a five-petalled rosette, which is clip art. Meaning belongs in a
   figure on white with a caption, of which this page already has several. */
const FLOW = ['gx-1', 'gx-2', 'gx-3'] as const;
/* `flow` overrides the one the palette index would pick. The three defaults
   are all horizontal journeys of the light; gx-4 is a diagonal, and the middle
   record card takes it so the row does not read as one layout in three
   colourways. */

export type Pattern = Weave;

/* `mark` puts a register cross on the plate — for the tiles that carry no
   drawing. It is a child and not a pseudo-element on purpose: ::before is the
   colour and ::after is the grain, both taken, and overriding either would put
   the mark where the field used to be. Same collision class as the .field
   accident recorded in globals.css. */
export default function Tile({
  n, pat, ar, fill, flow, mark, className = '',
}: { n: number; pat?: Pattern; ar?: number; fill?: boolean; flow?: string;
     mark?: boolean; className?: string }) {
  const i = ((n - 1) % 9 + 9) % 9;
  return (
    <span
      className={`grain grain-${i + 1} ${flow ?? FLOW[i % 3]} tile ${fill ? 'tile-fill' : ''} ${className}`}
      aria-hidden="true"
    >
      {pat ? <WeaveLive field={pat} ar={ar} /> : null}
      {mark ? <i className="tile-reg">+</i> : null}
    </span>
  );
}
