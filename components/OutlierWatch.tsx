'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/* THE PAGE DEMONSTRATES ITS OWN THIRD CONDITION.
   Section 02 lists what has to be true before a line settles, and the last of
   the three is that the pattern holds up — outliers are held for review instead
   of settling. The contour field behind that section has been standing one
   isolated spike up every six to nine seconds since it was built, and nothing
   on the page ever registered it.

   Now the last condition marks the catch: its ordinal takes the sky block for
   a beat, which is what this site does to any figure it wants to point at.
   Cut in, cut out, no fade.

   A wrapper rather than a prop on Steps: Steps is server-rendered everywhere
   else on the site and has no reason to join the client bundle for this. Only
   the div that carries the class is a client component; the steps inside it
   stay exactly what they were. */
export default function OutlierWatch({ children }: { children: ReactNode }) {
  const [hit, setHit] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const on = () => {
      setHit(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setHit(false), 1400);
    };
    window.addEventListener('hibi:outlier', on);
    return () => {
      window.removeEventListener('hibi:outlier', on);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return <div className={`sec-body outlier-watch${hit ? ' is-held' : ''}`}>{children}</div>;
}
