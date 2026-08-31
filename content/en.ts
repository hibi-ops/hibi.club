import type { Dict } from './types';

// English copy. Source of truth for wording: 08-27 roadshow deck (EN v7) + CANONICAL.md §10 word list.
// Never: "attribution", "Club", "No visit, no fee", old project names.

export const en: Dict = {
  langName: 'EN',
  nav: { merchants: 'Merchants', creators: 'Creators', about: 'About', cta: 'Get early access' },
  footer: {
    tagline: 'Settlement for walk-in customers.',
    product: 'Product', company: 'Company', contact: 'Contact', legal: 'Legal',
    privacy: 'Privacy', terms: 'Terms', rights: 'All rights reserved.', built: 'Built in New York',
    investors: 'Investors',
  },
  form: {
    title: 'Get early access',
    lead: 'The first cohort opens in New York. Tell us who you are and we will reach out when your neighborhood goes live.',
    role: { merchant: 'I run a store', creator: 'I am a creator' },
    fields: {
      name: 'Your name', email: 'Email', business: 'Business name', handle: 'Main account (Instagram / Xiaohongshu)',
      neighborhood: 'Neighborhood', note: 'Anything else', notePlaceholder: 'Category, a link, a question — optional.',
    },
    submit: 'Request access', submitting: 'Sending…',
    progress: 'Step 2 of 2 — you have already set your cap',
    capPrefix: 'Monthly cap',
    hoodDefault: 'New York',
    fallbackNote: 'This opens a prefilled email to hibi.nyc@gmail.com. Nothing is stored on this site.',
    done: { title: 'Received.', body: 'Thank you — we read every request and reply from hibi.nyc@gmail.com.' },
    error: 'Something went wrong. Email us directly at hibi.nyc@gmail.com.',
  },

  home: {
    meta: {
      title: 'Hibi — Settlement for walk-in customers',
      description: 'A local creator posts with a code. The customer redeems it at your counter. That redemption is the record — source, time, amount, commission — settled weekly. New York.',
    },
    eyebrow: 'Walk-in settlement · New York',
    title: ['Every walk-in', 'is a transaction', 'you can settle.'],
    lead: 'A local creator posts with a code. The customer redeems it at your counter. The redemption is the record — a source, a time, an amount, a commission. One invoice a week, nothing prepaid.',
    ctaPrimary: 'Join as a merchant',
    ctaSecondary: 'Join as a creator',
    facts: ['No subscription, no setup fee', 'Settled weekly, per redemption', 'First cohort: New York, 2026'],
    ledgerCard: {
      label: 'Sample settlement',
      period: 'Mar 2 – Mar 8',
      rows: [
        { who: '@mika.eats', meta: 'Thu 19:24 · first visit', amt: '$68.00', fee: '$10.20' },
        { who: '@bk.noodles', meta: 'Fri 12:05 · returning', amt: '$41.50', fee: '$3.32' },
        { who: '@queens.list', meta: 'Sat 20:11 · first visit', amt: '$96.00', fee: '$14.40' },
        { who: '@mika.eats', meta: 'Sun 13:40 · regular', amt: '$28.00', fee: '$1.12' },
      ],
      pool: [
        { who: '@fort.greene', meta: 'Mon 12:31 · first visit', amt: '$54.00', fee: '$8.10' },
        { who: '@bk.noodles', meta: 'Mon 18:47 · returning', amt: '$33.00', fee: '$2.64' },
        { who: '@queens.list', meta: 'Tue 13:02 · returning', amt: '$61.50', fee: '$4.92' },
        { who: '@mika.eats', meta: 'Tue 20:15 · first visit', amt: '$88.00', fee: '$13.20' },
        { who: '@fort.greene', meta: 'Wed 11:58 · regular', amt: '$24.00', fee: '$0.96' },
        { who: '@bk.noodles', meta: 'Wed 19:33 · first visit', amt: '$47.50', fee: '$7.13' },
      ],
      totalLabel: '23 walk-ins · 4 creators',
      total: '$190.40',
    },
    problem: {
      label: 'The problem',
      title: 'Local advertising is prepaid — and impossible to account for.',
      a: { label: 'What one store prepays / month', num: '$300–3,000', body: 'Instagram, Google, Yelp — spent before a single customer shows up. Which dollar produced which customer: no record exists.' },
      b: { label: 'What a creator earns per walk-in', num: '$0', body: 'Paid per post — flat fees, with agency and MCN cuts off the top. The customers they actually deliver earn them nothing.' },
      close: 'Merchants overpay for attention; creators are underpaid for outcomes. That spread is the business.',
    },
    how: {
      label: 'How it works',
      title: 'What happens when a customer walks in',
      steps: [
        { title: 'The post', body: 'A local creator publishes after visiting. The content carries a unique redemption code.' },
        { title: 'The counter', body: 'The customer redeems at checkout — one tap by staff; the mystery-box reward opens on the spot.' },
        { title: 'The bill', body: 'One customer on the merchant’s bill, one commission for the creator. Settled weekly.' },
      ],
      recordTag: 'The record',
      record: 'Every visit writes one line — source, time, amount, commission. The merchant’s month-end bill is that record, added up.',
      stats: { spark: [2, 3, 4, 3, 5, 2, 4], walkins: 23, walkinsLabel: 'walk-ins', postsLabel: '6 posts · 4 creators', fee: 190.40, feeLabel: 'commission, all week' },
      demo: {
        label: 'Run a walk-in',
        hint: 'The mystery box is real odds — most visits win a slice, a rare one wins the whole bill.',
        code: 'HIBI-M4K2',
        amount: '$68.00',
        redeem: 'Redeem',
        opening: 'Opening…',
        rewardCap: 'off, on the spot',
        jackpotCap: 'the whole bill — jackpot',
        billWho: '@mika.eats · first visit',
        billFee: '$10.20 commission',
        billNew: 'New line',
        again: 'Run another',
      },
    },
    sides: {
      label: 'Three sides, one transaction',
      title: 'Everyone is paid on the same event: a customer at the counter.',
      cols: [
        { label: 'Merchants', title: 'Marketing becomes a cost of goods', body: 'A unit price per walk-in, a monthly cap, billed only on delivery. Customer acquisition is priced like inventory — not gambled like ad spend.' },
        { label: 'Creators', title: 'Influence becomes a sales force', body: 'Every walk-in a creator sends is counted at the counter and paid as commission. Follower counts stop mattering; delivered customers do.' },
        { label: 'Consumers', title: 'Discounts become a game', body: 'Every first visit wins a mystery-box reward, up to the full bill. Return visits enter a sealed draw that keeps them coming back.' },
      ],
      split: {
        total: '$100.00',
        totalLabel: 'a first-visit bill at the counter',
        parts: [
          { k: 'Merchant keeps', v: '$85.00', pct: 85 },
          { k: 'Creator earns', v: '$10.50', pct: 10.5 },
          { k: 'Hibi', v: '$4.50', pct: 4.5 },
        ],
        note: 'Pilot terms: 15% on a first visit, of which the creator keeps 70%. Nothing is charged to the customer.',
      },
    },
    marquee: 'Counted at the counter · 日々 · settled weekly · ',
    pricing: {
      label: 'Pilot pricing',
      title: 'One commission. Three rates. Nothing else.',
      tiers: [
        { num: '15%', title: 'First visit', body: 'Of the customer’s bill, the first time they redeem at your store.', unit: 'of the bill' },
        { num: '8%', title: 'Repeat visit', body: 'On return visits inside the 12-month window opened by the first redemption.', unit: 'of the bill' },
        { num: '4%', title: 'Long-term', body: 'Once a customer has become a regular. The rate steps down as the relationship matures.', unit: 'of the bill' },
      ],
      foot: 'No subscription. No setup fee. You set the monthly cap and can pause anytime. Pilot pricing; final rates are set with the first cohort.',
      cta: 'See how it works for merchants',
    },
    now: {
      label: 'Why now',
      title: 'The model was validated at the top of the market — minus one layer.',
      items: [
        { label: '2024–25', title: 'Trust erodes', body: 'Merchant confidence in impression advertising is exhausted; “I paid and saw no customers” has become the default complaint.' },
        { label: 'Jan 2026', title: 'Claim is acquired', body: 'Wonder, Grubhub’s parent, acquires Claim — pay-per-new-customer cashback, live in New York and expanding nationally.' },
        { label: 'Today', title: 'One layer is missing', body: 'Claim counts visits but has no creators: origins stay unknown, and whoever drove the traffic is not paid.' },
      ],
      close: 'QR redemption has no learning curve in North America. The open layer is Hibi’s entry point.',
    },
    ai: {
      label: 'Models',
      title: 'Three models trained on the redemption record',
      lead: 'Source, store, time, amount, repeat visit — joined at every redemption. It exists nowhere else, and it is the training input for everything below.',
      items: [
        { label: 'Matching', title: 'Which creator for which store', body: 'Redemption history selects the creators most likely to convert for each store — by category, audience, and daypart.' },
        { label: 'Content', title: 'What to post, when', body: 'A trend agent tracks local platform signals and drafts topics and shooting notes, shortening booking-to-post.' },
        { label: 'Risk', title: 'What not to pay for', body: 'Outlier detection across timing, amounts, device and location signals; high-risk transactions go to manual review.' },
      ],
      close: 'Precision grows with every transaction.',
    },
    start: {
      label: 'Where we start',
      title: 'New York. One neighborhood at a time.',
      body: 'Local creators, local merchants, one weekly bill. We prove the loop in one neighborhood, then repeat it in the next. The first cohort is being assembled now.',
      ctaMerchant: 'Join as a merchant',
      ctaCreator: 'Join as a creator',
    },
  },

  merchants: {
    meta: {
      title: 'Hibi for merchants — pay one commission per walk-in',
      description: 'Set a reward, a commission and a monthly cap. Local creators send customers; you pay only when one redeems at your counter. No subscription, no setup fee.',
    },
    eyebrow: 'For merchants',
    title: 'Marketing becomes a cost of goods.',
    lead: 'You set a price per walk-in and a monthly cap. Local creators bring customers to your counter. You are billed only for the ones who show up — priced like inventory, not gambled like ad spend.',
    heroCard: {
      label: 'What you pay',
      rows: [
        { k: 'First visit', v: '15%', u: 'of the bill' },
        { k: 'Repeat visit', v: '8%', u: 'of the bill' },
        { k: 'Long-term', v: '4%', u: 'of the bill' },
        { k: 'Monthly cap', v: 'Yours', u: 'set it, pause anytime' },
      ],
      foot: 'No subscription. No setup fee. Billed only on a redeemed walk-in.',
    },
    calc: {
      label: 'What it would cost you',
      title: 'Move the two numbers you already know.',
      lead: 'Both are pre-set to a typical first-cohort store. Change them to yours — nothing is sent anywhere, and the result carries into the form below.',
      spendLabel: 'Average bill per customer',
      visitsLabel: 'New walk-ins you want per month',
      youPayLabel: 'You would pay',
      perVisitLabel: 'per walk-in',
      capLabel: 'Set this as your monthly cap',
      compareLabel: 'The same month on ad spend',
      compareValue: '$300 – $3,000',
      compareNote: 'Prepaid, whether or not anyone walks in.',
      note: 'First visits at 15%. Repeat visits are 8% and long-term 4%, so a real month costs less than this once customers start coming back.',
      cta: 'Apply with this cap',
    },
    set: {
      label: 'What you set',
      title: 'Three numbers, ten minutes, no contract.',
      rows: [
        { k: 'The reward', v: 'What a first-time customer gets when they redeem — a mystery-box reward you fund from your own menu, capped at the full bill.' },
        { k: 'The commission', v: 'A percentage of the customer’s bill, paid only on redemption. 15% first visit, 8% repeat, 4% long-term during the pilot.' },
        { k: 'The monthly cap', v: 'The most you will spend in a month. When it is reached, your campaign pauses automatically. Change or stop it anytime.' },
      ],
    },
    counter: {
      label: 'At the counter',
      title: 'One tap by staff. The customer just sees a discount.',
      body: 'No new hardware, no POS integration required for the pilot. Staff open the Hibi app, scan or enter the code, confirm the amount. That is the whole procedure.',
      steps: [
        { title: 'Customer shows the code', body: 'From a creator’s post — a unique code per creator, one use per customer.' },
        { title: 'Staff confirm the bill', body: 'Scan, enter the amount, done. Both sides confirm the same number.' },
        { title: 'The reward opens', body: 'The mystery box resolves on the spot. The customer leaves with a reason to come back.' },
      ],
    },
    bill: {
      label: 'Month-end',
      title: 'One bill. Every line is a customer.',
      body: 'Each redemption writes one line: which creator, which post, what time, what amount, what commission. Your month-end bill is that record, added up — you can read every dollar back to a person at your counter.',
      ledger: 'Illustrative: 23 new customers · 6 posts by 4 creators · $1,725 in bills · $190 total commission',
      note: 'Figures are illustrative. Actual numbers come from the first cohort of stores.',
    },
    pricing: {
      label: 'Pilot pricing',
      title: 'One commission. Three rates.',
      tiers: [
        { num: '15%', title: 'First visit', body: 'Of the bill, on a customer’s first redemption.', unit: 'of the bill' },
        { num: '8%', title: 'Repeat visit', body: 'Inside the 12-month window opened by the first visit.', unit: 'of the bill' },
        { num: '4%', title: 'Long-term', body: 'Once the customer is a regular.', unit: 'of the bill' },
      ],
      extras: ['No subscription', 'No setup fee', 'No minimum term', 'Cap and pause anytime', 'Billed weekly, paid by card or ACH'],
      foot: 'Pilot pricing. Final rates are set together with the first cohort and published here.',
    },
    faq: {
      label: 'Questions',
      title: 'What merchants ask first',
      items: [
        { q: 'How is this different from Instagram or Google ads?', a: 'Those charge you before anyone shows up, for impressions or clicks. Hibi charges a commission after a customer has redeemed at your counter. The unit you buy is a person in your store.' },
        { q: 'Who are the creators?', a: 'Local creators — typically 3K to 100K followers on Instagram or Xiaohongshu — who already post about places in your neighborhood. They are paid per customer they deliver, not per post, so their incentive is the same as yours.' },
        { q: 'What do I pay if nobody comes?', a: 'Nothing. There is no subscription and no setup fee. Commission is only generated by a redemption at your counter.' },
        { q: 'Do I need new hardware or a POS integration?', a: 'Not for the pilot. Staff use the Hibi app on any phone or tablet. POS integrations follow once the first cohort is running.' },
        { q: 'How do you prevent fake redemptions?', a: 'One code per creator, one use per customer, staff confirmation of the amount at the counter, and automated outlier detection on timing, amounts, device and location. High-risk transactions go to manual review before any commission is paid.' },
        { q: 'Where is Hibi available?', a: 'We are assembling the first cohort of stores in New York now. Request access and we will tell you when your neighborhood opens.' },
      ],
    },
  },

  creators: {
    meta: {
      title: 'Hibi for creators — paid per customer you send',
      description: 'Commission on every walk-in you deliver, with no flat-fee ceiling. Repeat visits keep paying for 12 months. A verified track record earned at the counter.',
    },
    eyebrow: 'For creators',
    title: 'Influence becomes a sales force.',
    lead: 'Post about places you actually go. Every customer who redeems your code at the counter pays you a commission — on that visit, and on their return visits for a year.',
    heroCard: {
      label: 'What you earn',
      rows: [
        { k: 'Per first visit', v: '15%', u: "of the customer's bill" },
        { k: 'Per return visit', v: '8%', u: 'for 12 months after' },
        { k: 'Paid out', v: 'Weekly', u: 'no invoicing, no chasing' },
        { k: 'Follower minimum', v: 'None', u: 'delivered customers count' },
      ],
      foot: 'No flat fees, no agency cut. You are paid on customers who actually walked in.',
    },
    why: {
      label: 'Why creators join',
      title: 'No flat fees. No agency cut. Nothing capped.',
      cols: [
        { label: 'Uncapped earnings', title: 'No flat fees, no agency cut', body: 'Commission on every walk-in delivered, with no flat-fee ceiling. Earnings scale with delivered customers — not follower counts, not negotiated rates.' },
        { label: 'Trailing income', title: 'Past work keeps paying', body: 'Every delivered customer pays repeat commissions inside a 12-month window. A post from March is still paying in December.' },
        { label: 'Creator Passport', title: 'A verified track record', body: 'Tiers, delivery history, and income record — earned at the counter, not claimed in a media kit. It unlocks higher-value stores, and it exists nowhere else.' },
      ],
    },
    how: {
      label: 'How it works',
      title: 'Four steps, weekly payout',
      steps: [
        { title: 'Pick a store brief', body: 'Merchants near you publish briefs: the reward, the commission, the cap. Take the ones that fit your feed.' },
        { title: 'Visit and post', body: 'Go, experience, publish on Instagram or Xiaohongshu. Your post carries your own redemption code.' },
        { title: 'Customers redeem', body: 'Each redemption at the counter is one line in your ledger — store, time, amount, commission.' },
        { title: 'Get paid weekly', body: 'Commissions settle every week. Repeat visits keep landing for twelve months.' },
      ],
    },
    split: {
      label: 'The split',
      title: 'On a $100 first-visit bill',
      body: 'The merchant pays a 15% commission on a first visit. You keep 70% of it. On repeat visits the merchant pays 8%, and your share continues inside the 12-month window.',
      s: {
        total: '$15.00',
        totalLabel: 'the commission on a $100 first visit',
        parts: [
          { k: 'You keep', v: '$10.50', pct: 70 },
          { k: 'Hibi', v: '$4.50', pct: 30 },
        ],
        note: 'Pilot terms. Rates are confirmed with the first cohort and published here.',
      },
    },
    faq: {
      label: 'Questions',
      title: 'What creators ask first',
      items: [
        { q: 'How many followers do I need?', a: 'There is no threshold. Most creators in the first cohort have 3K to 100K followers. What matters is whether the people who follow you go where you go.' },
        { q: 'Is it exclusive?', a: 'No. Post for whichever stores you like, on whichever platforms you like. Hibi never asks for exclusivity.' },
        { q: 'When and how do I get paid?', a: 'Weekly, to your bank account, once your delivered customers have been confirmed at the counter.' },
        { q: 'What counts as a delivered customer?', a: 'A customer who shows your code at the store, has the amount confirmed by staff, and passes automated risk checks. One code per creator, one use per customer.' },
        { q: 'Which platforms?', a: 'Instagram and Xiaohongshu at launch. Your code works the same everywhere.' },
        { q: 'Where is this available?', a: 'New York first, one neighborhood at a time. Request access and we will tell you when briefs open near you.' },
      ],
    },
  },

  about: {
    meta: {
      title: 'About Hibi',
      description: 'Hibi (日々, “day by day”) is a New York company building pay-per-visit local marketing: merchants pay one commission per walk-in, creators are paid per customer they deliver.',
    },
    eyebrow: 'About',
    title: 'Hibi — 日々, day by day.',
    lead: 'A small team in New York building the missing layer of local marketing: the one where a store pays for the customer who walked in, and the person who sent them gets paid.',
    heroCard: {
      label: 'The facts',
      rows: [
        { k: 'Based in', v: 'New York', u: 'one neighbourhood at a time' },
        { k: 'Team', v: 'Three', u: 'plus part-time contributors' },
        { k: 'First cohort', v: '2026', u: 'merchants and creators, forming now' },
        { k: 'Reach us', v: 'Directly', u: 'hibi.nyc@gmail.com — every reply is read' },
      ],
      foot: 'Everything above is current. We publish pilot results, not projections.',
    },
    what: {
      label: 'What we are building',
      title: 'The billing unit of local advertising should be a customer walking through the door.',
      paras: [
        'A local store spends hundreds to thousands of dollars a month on Instagram, Google and Yelp, and cannot say which dollar brought which customer. Local creators send customers to those same stores every week, and because nobody counts it, they are not paid for it.',
        'Hibi counts it. A creator posts with a code, a customer redeems at the counter, and that single event becomes one line on the merchant’s bill and one commission for the creator. The merchant’s marketing spend is set by the number of new customers who came in and paid — not by impressions.',
        'We are not a marketplace. Marketplaces sell matches, and matches get bypassed. Hibi runs the transaction itself — the reward, the count, the payout — and every week that record gets more valuable to everyone on it.',
      ],
    },
    principles: {
      label: 'How we work',
      title: 'Four commitments',
      cols: [
        { label: '01', title: 'No numbers before data', body: 'We publish pilot results, not projections. No scale narrative before the first cohort has produced its three numbers.' },
        { label: '02', title: 'Consumers are never charged', body: 'Redeeming a code is claiming a discount. Nothing more is asked of the customer.' },
        { label: '03', title: 'No selling of personal data', body: 'What leaves the system is anonymous and aggregated. Merchants see their customers; nobody else does.' },
        { label: '04', title: 'No exclusivity, no rankings, no paid reviews', body: 'Creators post where they like. Merchants buy customers, not praise.' },
      ],
    },
    team: {
      label: 'Team',
      title: 'Founder-led, New York based',
      founder: { name: 'Jiaming Wang', role: 'Founder', bio: 'Leads product, strategy and the first merchant cohort. Writes to hibi.nyc@gmail.com and reads every reply.' },
      body: 'A core team of three plus a circle of part-time contributors across product, design and community outreach. We are adding senior people for the pilot — see the open roles.',
    },
    hiring: {
      label: 'Open roles',
      title: 'We are hiring for the pilot',
      roles: [
        { label: 'Engineering', title: 'Founding engineer', body: 'Redemption, weekly billing, anti-fraud — end to end. Payments experience preferred.' },
        { label: 'Design', title: 'Product designer', body: 'Merchant, creator and consumer surfaces. Mobile first.' },
        { label: 'Sales', title: 'Field sales lead', body: 'Bilingual onboarding through community networks in New York.' },
      ],
      cta: 'Write to us',
    },
    investors: {
      label: 'Investors',
      title: 'Pre-seed, New York',
      body: 'We are raising a pre-seed round to run the first cohort of stores. Materials on request.',
      cta: 'Request the deck',
    },
  },

  legal: {
    meta: { title: 'Privacy & Terms — Hibi', description: 'Privacy policy and terms of service for hibi.club.' },
    eyebrow: 'Legal',
    title: 'Privacy & Terms',
    updated: 'Last updated: August 31, 2026',
    notice: 'Draft for the pilot period. These terms will be replaced by counsel-reviewed versions before the first cohort goes live.',
    privacy: {
      title: 'Privacy policy',
      sections: [
        { h: 'What this site collects', p: ['This website does not set tracking cookies and does not run third-party advertising scripts. If you submit the early-access form, we receive the fields you typed (name, email, business or account name, neighborhood, note) and use them only to contact you about Hibi.'] },
        { h: 'Product data (pilot)', p: ['When the Hibi product is live, a redemption records the store, the creator code, the time, the bill amount and the commission. This record is used to bill merchants, pay creators, and detect fraud. Merchants see redemptions at their own store. Creators see their own deliveries. Consumers are identified only as needed to prevent duplicate redemptions.', 'We do not sell personal data. Anything shared outside the system is anonymous and aggregated.'] },
        { h: 'Retention and your rights', p: ['We keep form submissions until you ask us to delete them. Email hibi.nyc@gmail.com to access, correct or delete anything we hold about you.'] },
        { h: 'Contact', p: ['Hibi, New York. hibi.nyc@gmail.com'] },
      ],
    },
    terms: {
      title: 'Terms of service',
      sections: [
        { h: 'This website', p: ['hibi.club is an informational site. Requesting early access creates no obligation on either side. We may change the site and these terms at any time; the date above tells you when we last did.'] },
        { h: 'Pilot participation', p: ['Merchants and creators who join the pilot sign a separate participation agreement that sets out commissions, payment timing, code rules and fraud policy. Where that agreement and this page differ, the agreement controls.'] },
        { h: 'Codes and redemptions', p: ['A redemption code is one use per customer. Self-redemption, redemption by staff on their own behalf, or coordinated redemption without a real purchase are grounds for withheld commission and removal from the program.'] },
        { h: 'Liability', p: ['The site is provided as is. To the extent permitted by law, Hibi is not liable for indirect or consequential loss arising from use of this site.'] },
      ],
    },
  },
};
