/* ===========================================================================
   THE PILOT MODEL — the arithmetic both calculators draw from.
   ---------------------------------------------------------------------------
   Kept in one file on purpose. The merchant page and the creator page are two
   ends of the same transaction, and the fastest way to lose a reader who is
   actually checking is to let the two sides disagree by a cent.

   Rates: 15% of a first visit, 8% of a return, 4% from the fourth visit on and
   for as long as that customer keeps coming. The creator keeps 70% of a
   first-visit commission and 55% of every one after.
   =========================================================================== */

export const RATE = { first: 0.15, ret: 0.08, regular: 0.04 } as const;
export const SHARE = { first: 0.7, after: 0.55 } as const;
export const REGULAR_FROM = 4;   // the visit index at which 8% becomes 4%
export const MONTHS = 12;

/** The store's rate on a customer's n-th visit (1-based). */
export function rateAt(visit: number) {
  if (visit <= 1) return RATE.first;
  return visit >= REGULAR_FROM ? RATE.regular : RATE.ret;
}
/** The creator's share of that commission. */
export function shareAt(visit: number) {
  return visit <= 1 ? SHARE.first : SHARE.after;
}

export type MonthRow = {
  m: number;          // 1-based month
  visits: number;
  sales: number;
  fee: number;        // what the store pays that month
  earn: number;       // what the creator earns that month
  rate: number;       // blended rate for the month: fee / sales
};

/**
 * Twelve months of a store that acquires `perMonth` new customers every month,
 * where each acquired customer comes back once every `everyMonths` months
 * (0 = never comes back).
 *
 * The whole point of the figure this feeds: month one is 15% because every
 * customer is new, and the blend falls from there as returns pile up
 * underneath. Set `everyMonths` to 0 and it stays at 15% forever — the
 * calculator is allowed to produce the answer that is bad for us.
 */
export function series(bill: number, perMonth: number, everyMonths: number, months = MONTHS): MonthRow[] {
  const out: MonthRow[] = [];
  for (let m = 0; m < months; m++) {
    let visits = 0, fee = 0, earn = 0;
    for (let c = 0; c <= m; c++) {          // the cohort acquired in month c
      const age = m - c;
      let idx = 0;
      if (age === 0) idx = 1;                                   // their first visit
      else if (everyMonths && age % everyMonths === 0) idx = 1 + age / everyMonths;
      if (!idx) continue;
      const r = rateAt(idx);
      visits += perMonth;
      fee += perMonth * bill * r;
      earn += perMonth * bill * r * shareAt(idx);
    }
    const sales = visits * bill;
    out.push({ m: m + 1, visits, sales, fee, earn, rate: sales ? fee / sales : RATE.first });
  }
  return out;
}

export const sum = (rows: MonthRow[], k: 'sales' | 'fee' | 'earn' | 'visits') =>
  rows.reduce((s, r) => s + r[k], 0);

/* Money the way the rest of the site sets it: cents kept, because the claim is
   that every dollar reads back to a person at the counter. */
export const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const whole = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
export const pct1 = (n: number) => (n * 100).toFixed(1).replace(/\.0$/, '') + '%';
