'use client';
import { useEffect, useState } from 'react';
import Tile from './Tile';
import type { HeroCard } from '@/content/types';

type Role = 'merchant' | 'creator';

/* THE PLATE BESIDE THE FORM IS ABOUT JOINING, NOT ABOUT PRICING.
   Second correction on this one card. It first printed the same three lines on
   all seven pages, which is wallpaper. It then printed the role's rate rows —
   the return rate, the rate after that, the cap — which follows the toggle but
   answers a question nobody is asking at the moment they fill in their name.
   A rate table beside a sign-up form is the pricing page wandering in.

   What belongs here is what you are actually joining: where it is, when the
   first cohort opens, and that a person reads what you send. Those three are
   already written, as the about page's own "the facts", and they do not change
   with which side you are on — the answer to "what am I signing up to" should
   not depend on which page you happened to be reading when you decided.

   What DOES change with the side you are on is what it costs you to be here,
   so that is the line at the foot, in each role's own words, and the palette
   turns over with it. The role arrives on `hibi:role`, not as a prop — the
   same decoupling the walk-in counter and the contour field use. */
export default function AccessPlate(
  { rows, merchantFoot, creatorFoot, initialRole = 'merchant' }:
  { rows: HeroCard['rows']; merchantFoot: string; creatorFoot: string; initialRole?: Role },
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
        <p className="plate-foot">{role === 'merchant' ? merchantFoot : creatorFoot}</p>
      </div>
    </div>
  );
}
