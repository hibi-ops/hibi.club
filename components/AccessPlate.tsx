'use client';
import { useEffect, useState } from 'react';
import Tile from './Tile';
import type { HeroCard } from '@/content/types';

type Role = 'merchant' | 'creator';

/* THE PLATE BESIDE THE FORM ANSWERS THE FORM.
   It used to print the same three lines on all seven pages, which is the
   definition of wallpaper: identical everywhere, and addressed to nobody. A
   store owner and a creator are signing up to two different deals, and the
   toggle two inches to the right already knows which one you are — so the
   plate follows it.

   Three lines per role, taken from that role's own spec: the ones about
   joining rather than about rates. The row shows what it is and what it is;
   reaching a row opens the qualifier under it. Nothing is written for this
   plate — every string here is already on the page it belongs to.

   The role arrives on `hibi:role`, not as a prop. Same decoupling as the
   walk-in counter and the contour field: the control does not know what is
   listening. */
export default function AccessPlate(
  { merchant, creator, initialRole = 'merchant' }:
  { merchant: HeroCard['rows']; creator: HeroCard['rows']; initialRole?: Role },
) {
  const [role, setRole] = useState<Role>(initialRole);
  useEffect(() => {
    const on = (e: Event) => {
      const r = (e as CustomEvent<{ role: Role }>).detail?.role;
      if (r) setRole(r);
    };
    window.addEventListener('hibi:role', on);
    return () => window.removeEventListener('hibi:role', on);
  }, []);

  const rows = (role === 'merchant' ? merchant : creator).slice(-3);
  return (
    <div className="plate access-plate">
      <Tile n={role === 'merchant' ? 9 : 3} mark className="plate-bg" />
      <div className="plate-body">
        <ul className="plate-facts">
          {rows.map(r => (
            <li key={r.k}>
              <span className="plate-lk">{r.k}</span>
              <b className="plate-lv">{r.v}</b>
              {r.u && <span className="plate-more"><span><em>{r.u}</em></span></span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
