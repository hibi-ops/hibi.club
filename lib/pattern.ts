/* ===========================================================================
   PATTERNS — three that are not isolines.
   ---------------------------------------------------------------------------
   The contour fields carry the small tiles well enough, but a level set of a
   closed function makes lobes and rosettes, and a rosette on a marketing tile
   is a clip-art flower. These three are the ones that hold up at card size,
   and none of them is decoration invented here — each is a form with a long
   history in print and in plotter work, which is why they read as designed
   rather than generated:

   · TRUCHET. A square tile with two quarter arcs, rotated per cell. The arcs
     meet across every edge, so a grid of them resolves into long continuous
     paths that wander the whole field — the pattern looks planned because it
     IS continuous, and it is different in every tile because the rotations
     come from a hash. Arcs rather than the straight variant: the straight one
     is architectural, the arcs are organic and sit better under type.
   · MOIRÉ. Two families of parallel lines a few degrees apart. Nothing curved
     is drawn; the bands are interference, produced by the eye. It is the one
     pattern here whose structure is bigger than anything in the file, which is
     what makes it look expensive.
   · FLOW. Streamlines through a smooth vector field, each one integrated from
     its own seed. Long thin curves that travel together and never cross — the
     generative-art form that predates the phrase.

   All deterministic: a hash of the index, never Math.random, so the server and
   the client draw the same thing and it is the same thing every visit.
   =========================================================================== */

export type Weave = 'truchet' | 'moire' | 'flow';

const h = (i: number, s: number) => {
  const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/* The pointer, in field coordinates: x in [-ar, ar], y in [-1, 1], and `hot`
   easing 0 to 1 as it arrives. Each pattern answers it in the way its own
   construction allows, which is the only kind of interaction worth having —
   a generic "push the geometry sideways" would look bolted on to all three.

   A GRID AND A RING FIELD WERE TRIED HERE AND REMOVED. Both worked and both
   read as stock: a mesh that bulges under the cursor is the magnifier effect
   every generated site ships with, and concentric rings with a second centre
   is the same idea in polar form. What is here instead are three deformations
   that are specific to the thing being deformed — a Truchet can only subdivide,
   a moire can only turn, a comb can only part — which is the difference
   between an interaction and an effect. */
export type Hand = { x: number; y: number; hot: number };

export function weave(kind: Weave, S: number, ar: number, m?: Hand): string[] {
  const W = S * ar;
  const hot = m ? m.hot : 0;

  if (kind === 'truchet') {
    /* A square tile with two quarter arcs, rotated per cell. The arcs meet
       across every edge, so a grid of them resolves into long continuous paths
       that wander the whole field — the pattern looks planned because it IS
       continuous, and differs everywhere because the rotations come from a
       hash. Arcs and not the straight variant: straight is architectural, the
       arcs are organic and sit better under type.

       S/5 read as three amoebas — at that size you see individual arcs, not
       the paths they join into. S/9 was better and still broke up into loose
       scales. Thirteen is where the paths get long enough to be paths. */
    const base = S / 13;
    const out: string[] = [];
    const arcs = (x: number, y: number, c: number, flip: boolean) => {
      const r = c / 2;
      return flip
        ? `M${x + r},${y}A${r},${r} 0 0 1 ${x + c},${y + r}` +
          `M${x},${y + r}A${r},${r} 0 0 0 ${x + r},${y + c}`
        : `M${x},${y + r}A${r},${r} 0 0 1 ${x + r},${y}` +
          `M${x + r},${y + c}A${r},${r} 0 0 1 ${x + c},${y + r}`;
    };
    const cols = Math.ceil(W / base), rows = Math.ceil(S / base);
    /* THE INTERACTION IS SUBDIVISION, NOT DISPLACEMENT. A Truchet cannot be
       bent — move the arcs and the edges stop meeting, which destroys the one
       property that makes the pattern continuous. What it can do is what a
       multi-scale Truchet already does: cells split into four. Detail blooms
       where the pointer is and the paths stay joined, because a split cell
       still lands on the same edge midpoints. */
    /* REST IS THE SUBDIVIDED STATE. It used to sit at 14% split and bloom to
       nearly all of them under the pointer; the resting card was the sparse
       one and it looked unfinished. Now 78% are split at rest — what the card
       looked like mid-hover — and the cursor goes a level FURTHER, splitting
       those quarters into sixteenths. Detail still blooms where you point,
       which is the behaviour worth keeping; it just starts from a finished
       drawing instead of an empty one. */
    let coarse = '', fine = '';
    const cx = m ? ((m.x + ar) / (2 * ar)) * W : -1e9;
    const cy = m ? ((m.y + 1) / 2) * S : -1e9;
    const sig = S * 0.5;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = i * base, y = j * base;
        const dx = (x + base / 2 - cx) / sig, dy = (y + base / 2 - cy) / sig;
        const near = hot * Math.exp(-(dx * dx + dy * dy) / 2);
        if (h(i * 31 + j, 5) < 0.78) {
          const c = base / 2;
          for (let b = 0; b < 4; b++) {
            const qx = x + (b % 2) * c, qy = y + ((b / 2) | 0) * c;
            if (near > 0.14 && h(i * 53 + j * 17 + b, 4) < near * 0.95) {
              const q = c / 2;
              for (let e = 0; e < 4; e++) {
                fine += arcs(qx + (e % 2) * q, qy + ((e / 2) | 0) * q, q,
                             h(i * 91 + j * 29 + b * 7 + e, 6) < 0.5);
              }
            } else {
              fine += arcs(qx, qy, c, h(i * 71 + j * 13 + b, 9) < 0.5);
            }
          }
        } else {
          coarse += arcs(x, y, base, h(i * 17 + j * 7, 3) < 0.5);
        }
      }
    }
    out.push(coarse, fine);
    return out;
  }

  if (kind === 'moire') {
    /* Two families of parallel lines a few degrees apart. Nothing curved is
       drawn; the bands are interference, produced by the eye. It is the one
       pattern here whose structure is bigger than anything in the file, which
       is what makes it look expensive.
       The two pitches are deliberately close and the angles only a few degrees
       apart: widen either and the interference falls apart into two visible
       grids, which is just a plaid. */
    /* THE LINES ARE WAVES, NOT STRAIGHTS. Straight-line moire is the textbook
       version and it read as corduroy next to a card of straight lanes. Both
       families carry the SAME wave in their own rotated frame, so the
       interference survives — the beat is still the angle between them — and
       what you get is an organic band instead of a plaid. Amplitude is held
       under half the pitch; past that neighbouring lines touch and the two
       families stop being readable as families. */
    const fam = (deg: number, pitch: number, amp: number) => {
      const a = (deg * Math.PI) / 180;
      const ux = Math.cos(a), uy = Math.sin(a);
      const nx = -uy, ny = ux;
      const reach = (W + S) * 0.8;
      const n = Math.ceil((Math.abs(W * nx) + Math.abs(S * ny)) / pitch) + 2;
      const NP = 26;
      let d = '';
      for (let k = -n; k <= n; k++) {
        const cx = W / 2 + nx * k * pitch, cy = S / 2 + ny * k * pitch;
        for (let i = 0; i < NP; i++) {
          const t = reach * (2 * (i / (NP - 1)) - 1);
          const off = amp * Math.sin(t / (S * 0.21) + k * 0.55);
          const x = cx + ux * t + nx * off, y = cy + uy * t + ny * off;
          d += (i ? 'L' : 'M') + `${x.toFixed(1)},${y.toFixed(1)}`;
        }
      }
      return d;
    };
    /* THE INTERACTION IS THE ANGLE. Moire's whole nature is that a fraction of
       a degree moves the bands a long way. The base separation is 4.5, so the
       useful range is roughly 1 to 8: near 1 the two families almost coincide
       and the beat stretches wider than the tile, near 8 it packs to four or
       five bands. Sweeping across that is the whole show. Vertical travel
       tilts both families together, so it answers in both axes. */
    const turn = m ? m.x * 8.4 * hot : 0;
    const tilt = m ? m.y * 12 * hot : 0;
    /* the wave deepens with the pointer too, so the answer is not only a
       rotation — the field limbers up as well as turns */
    const amp = (S / 26) * (0.34 + 0.26 * hot);
    return [fam(-14 + tilt, S / 26, amp), fam(-9.5 + tilt + turn, S / 26, amp)];
  }

  /* ===== flow =============================================================
     LANES WITH A DISPLACEMENT, NOT INTEGRATED STREAMLINES.

     The honest version — seed a hundred points and integrate each through the
     vector field — was built first and thrown away twice. Streamlines go where
     the field sends them: they bunch, they leave holes, and with any real
     swing in the field most of them wander out of a cropped box. Two attempts
     at retuning the seeds and the bias produced a tile whose path data looked
     healthy and whose visible area was empty.

     Evenly spaced lanes displaced by a smooth 2D function give the same
     picture with none of that. Coverage is guaranteed because the lanes are
     placed, not discovered; the displacement depends on both x and the lane's
     own y, so neighbouring lines bend differently and it reads as a field
     rather than as one wave copied down the page; and the amplitude is held
     under the lane spacing, which is what keeps them from ever crossing —
     crossing is the single thing that would break the illusion of a flow.
     ======================================================================= */
  const ROWS = 30;
  const gap = (S * 1.24) / ROWS;
  const A = gap * 0.92;
  const out: string[] = [];
  let d = '';
  for (let k = 0; k <= ROWS; k++) {
    const y0 = -S * 0.12 + k * gap;
    let seg = '';
    const NPT = 44;
    for (let i2 = 0; i2 < NPT; i2++) {
      const x = -W * 0.04 + (W * 1.08 * i2) / (NPT - 1);
      const u = (x / S) * 2 - ar, v = (y0 / S) * 2 - 1;
      /* the horizontal frequencies are up from 1.35 / 2.6: at those the card
         held barely one period and the lanes read as a slow tilt rather than
         as waves. Squeezing x is the only lever — raising the amplitude
         instead would make them cross. */
      let dy =
        A * (Math.sin(u * 2.9 + v * 0.85) * 0.72 +
             Math.sin(u * 5.4 - v * 1.5 + 1.7) * 0.28);
      if (m && hot > 0.001) {
        /* odd about the pointer's own lane: zero on it, outward above and
           below, decaying away — contours parting around a rise, which is the
           same gesture the rest of the site's terrain uses.
           Reach matters as much as amount: at sigma .62 only a few lanes moved
           and this card measured a third of the other two. .85 puts most of
           the field in play, which is what makes it read as the surface
           bending rather than as two lines twitching. */
        const dx = (u - m.x) / 0.85, dv = (v - m.y) / 0.85;
        dy += hot * gap * 5.6 * dv * Math.exp(-(dx * dx + dv * dv) / 2);
      }
      seg += (i2 ? 'L' : 'M') + `${x.toFixed(1)},${(y0 + dy).toFixed(1)}`;
    }
    d += seg;
    if (k % 11 === 10) { out.push(d); d = ''; }
  }
  if (d) out.push(d);
  return out;
}
