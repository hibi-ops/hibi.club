import type { ReactNode } from 'react';

/* ===========================================================================
   PANEL — a framed block.
   ---------------------------------------------------------------------------
   A hairline on all four sides, isolating one piece of content. That is the
   whole idea: the page is already ruled down both content edges, and a frame
   closes those rules into a box so each block is a thing you can point at.

   NOTHING COLOURED GOES DOWN THE LEFT EDGE OF THIS PANEL. It has been tried
   twice and rejected twice: once as a gradient spine, once as a masked bleed
   argued as "not a stripe, a ground". The distinction did not matter — from
   the outside both are a coloured band running down one side of a working
   figure, and the user's answer both times was the same. Do not build a third
   version of it. Colour on this page lives in Tile, as a block above content,
   and nowhere else.
   =========================================================================== */
export default function Panel({
  cap, children, className = '',
}: { cap?: { k: string; p: string }; children: ReactNode; className?: string }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-body">{children}</div>
      {cap && (
        <div className="panel-cap">
          <span className="k-head">{cap.k}</span>
          <p>{cap.p}</p>
        </div>
      )}
    </div>
  );
}
