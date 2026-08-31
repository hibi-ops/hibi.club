export type Col = { label: string; title: string; body: string };
export type Step = { title: string; body: string };
export type QA = { q: string; a: string };
export type SplitData = { total: string; totalLabel: string; parts: { k: string; v: string; pct: number }[]; note: string };
/* Shown beside a sub-page headline. The point is that the visitor gets the
   number without scrolling or clicking — the banner-then-click pattern makes
   them pay a cost before seeing whether anything is worth reading. */
export type HeroCard = { label: string; rows: { k: string; v: string; u?: string }[]; foot: string };
export type Meta = { title: string; description: string };

export type FormCopy = {
  title: string;
  lead: string;
  role: { merchant: string; creator: string };
  fields: {
    name: string;
    email: string;
    business: string;   // merchant: business name
    handle: string;     // creator: main account
    neighborhood: string;
    note: string;
    notePlaceholder: string;
  };
  submit: string;
  submitting: string;
  /* Progress that does not start at zero, and a default the visitor confirms
     rather than composes. */
  progress: string;
  capPrefix: string;
  hoodDefault: string;
  fallbackNote: string; // shown when no endpoint: "opens your email client"
  done: { title: string; body: string };
  error: string;
};

export type Dict = {
  langName: string;
  nav: { merchants: string; creators: string; pricing: string; security: string; about: string; cta: string };
  footer: {
    tagline: string;
    fullPricing: string;
    product: string; company: string; contact: string; legal: string;
    privacy: string; terms: string; rights: string; built: string;
    investors: string;
  };
  form: FormCopy;

  home: {
    meta: Meta;
    eyebrow: string;
    title: [string, string, string];
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    facts: string[];
    /* the settlement ledger shown beside the headline — this is the artefact
       the whole product produces, so the home page opens with it */
    ledgerCard: {
      label: string;
      period: string;
      rows: { who: string; meta: string; amt: string; fee: string }[];
      /* the rest of the same sample week — the card pages through them, so the
         figure shows the record accumulating instead of a frozen screenshot */
      pool: { who: string; meta: string; amt: string; fee: string }[];
      totalLabel: string;
      total: string;
    };
    problem: {
      label: string; title: string;
      a: { label: string; num: string; body: string };
      b: { label: string; num: string; body: string };
      close: string;
    };
    how: {
      label: string; title: string; steps: Step[]; recordTag: string; record: string;
      /* the sample week as figures, not prose — and the demo writes into it:
         a redemption in the loop below ticks the tally up by one */
      stats: { spark: number[]; walkins: number; walkinsLabel: string; postsLabel: string; fee: number; feeLabel: string };
      /* the loop, playable: show the code, tap redeem, watch the line land on
         the bill — the Stripe checkout-demo move, on our own transaction */
      demo: {
        label: string; hint: string;
        code: string; amount: string;
        redeem: string; opening: string; rewardCap: string; jackpotCap: string;
        billWho: string; billFee: string; billNew: string;
        again: string;
      };
    };
    sides: {
      label: string; title: string; cols: Col[];
      /* the same transaction, split — one bar beats three cards because the
         whole point is that the three shares come out of ONE payment */
      split: SplitData;
    };
    /* one giant outline phrase crawling between acts — the brand speaking in
       its own mixed tongue (NY English × 日々), once per page */
    marquee: string;
    pricing: { label: string; title: string; tiers: { num: string; title: string; body: string; unit?: string }[]; foot: string; cta: string };
    now: { label: string; title: string; items: Col[]; close: string };
    ai: { label: string; title: string; lead: string; items: Col[]; close: string };
    start: { label: string; title: string; body: string; ctaMerchant: string; ctaCreator: string };
  };

  merchants: {
    meta: Meta;
    eyebrow: string; title: string; lead: string; heroCard: HeroCard;
    set: { label: string; title: string; rows: { k: string; v: string }[] };
    counter: { label: string; title: string; body: string; steps: Step[] };
    bill: { label: string; title: string; body: string; ledger: string; note: string };
    pricing: { label: string; title: string; tiers: { num: string; title: string; body: string; unit?: string }[]; foot: string };
    faq: { label: string; title: string; items: QA[] };
  };

  creators: {
    meta: Meta;
    eyebrow: string; title: string; lead: string; heroCard: HeroCard;
    why: { label: string; title: string; cols: Col[] };
    how: { label: string; title: string; steps: Step[] };
    split: { label: string; title: string; body: string; s: SplitData };
    faq: { label: string; title: string; items: QA[] };
  };

  about: {
    meta: Meta;
    eyebrow: string; title: string; lead: string; heroCard: HeroCard;
    what: { label: string; title: string; paras: string[] };
    principles: { label: string; title: string; cols: Col[] };
    team: { label: string; title: string; founder: { name: string; role: string; bio: string }; body: string };
    hiring: { label: string; title: string; roles: Col[]; cta: string };
    investors: { label: string; title: string; body: string; cta: string };
  };

  /* The authoritative price page. Merchants keeps a summary and links here —
     Stripe's pattern: one page owns the numbers, everything else cites it. */
  pricing: {
    meta: Meta;
    eyebrow: string; title: string; lead: string;
    rates: { label: string; title: string; tiers: { num: string; title: string; body: string; unit?: string }[] };
    /* An estimator, not a marketing widget: it answers "what would this cost
       me?" before asking for anything, and hands its own number to the form. */
    calc: {
      label: string; title: string; lead: string;
      spendLabel: string; visitsLabel: string;
      youPayLabel: string; perVisitLabel: string; capLabel: string;
      compareLabel: string; compareValue: string; compareNote: string;
      note: string; cta: string;
    };
    free: { label: string; title: string; items: string[]; note: string };
    compare: {
      label: string; title: string; body: string;
      rows: { k: string; ads: string; hibi: string }[];
      adsHead: string; hibiHead: string;
    };
    faq: { label: string; title: string; items: QA[] };
  };

  /* Not a trust-badge page: what actually happens to a redemption and to the
     data around it, at pilot stage, stated plainly. */
  security: {
    meta: Meta;
    eyebrow: string; title: string; lead: string;
    pillars: { label: string; title: string; cols: Col[] };
    redemption: { label: string; title: string; steps: Step[]; note: string };
    data: { label: string; title: string; rows: { k: string; v: string }[]; note: string };
    stage: { label: string; title: string; body: string; items: string[]; cta: string };
  };

  legal: {
    meta: Meta;
    eyebrow: string; title: string; updated: string; notice: string;
    privacy: { title: string; sections: { h: string; p: string[] }[] };
    terms: { title: string; sections: { h: string; p: string[] }[] };
  };
};
