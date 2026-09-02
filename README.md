# hibi.club — company website

Static, bilingual (EN / 中文), zero-backend. Next.js 15 App Router with `output: 'export'`, so the build is a folder of HTML that any host serves.

- English: `/en/` · 中文: `/zh/` · root `/` redirects by browser language.
- Pages: Home · Merchants · Creators · About · Legal, each in both languages.
- Visual system: **editorial** — white ground, tracked-caps labels, giant numbers, hairline grid. No gradients, no cards, no pills, no glass (this is the 2026-08-27 deck verdict; the June "iOS 26 glass" site is archived in `_archive/`).

## Run

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm run build      # → out/  (static)
npm run check      # tsc + forbidden-word lint (scripts/check-copy.mjs)
```

Node 20+ and TypeScript 5.x (Next 15 does not support TS 7).

## Where things live

```
content/
  en.ts, zh.ts   ← ALL copy. Edit text here, never in components. Same keys in both files.
  site.ts        ← email, domain, social links, form endpoint
  types.ts       ← the shape both dictionaries must satisfy (TS enforces parity)
app/
  globals.css    ← design tokens + every class. Token-only; no new hex values.
  [lang]/        ← one folder per page; pages only arrange content, they contain no text
  sitemap.ts, robots.ts
components/      ← Nav, Footer, Wordmark (duo logo as inline SVG), AccessForm, blocks
lib/seo.ts       ← metadata, hreflang alternates, Organization + FAQ JSON-LD
public/
  fonts/         ← self-hosted General Sans + FoodDelicious (logo only)
  llms.txt       ← plain-text summary for AI crawlers
  index.html     ← root language redirect
  og.png, favicons, site.webmanifest
vercel.json      ← / → /en/ redirect, security headers, font caching
scripts/check-copy.mjs ← fails on forbidden words (CANONICAL.md §10)
```

## Editing copy (for everyone on the team)

1. Open `content/en.ts` and/or `content/zh.ts`.
2. Change the string. Keep both languages in sync — the build fails if a key is missing in one.
3. Run `npm run check`. It rejects: "attribution", "Club", "No visit, no fee", 归因, 赋能, old project names, and pilot street names.
4. Open a PR. Vercel builds a preview URL per PR; merge to `main` deploys.

Rules that are not negotiable (from `06-Design/AGENT-DESIGN-GUIDE.md` and `04-Strategy/CANONICAL.md`):
- The brand is **Hibi**. "Club" only ever appears inside the domain name.
- The logo is the duo wordmark from `06-Design/Brand/Logo/` — never redraw it, never add a tagline.
- Only the palette in `globals.css :root`. Primary CTA is `--brandD`; secondary actions are plain text.
- No made-up numbers. Everything shown is pilot pricing or marked *illustrative*.
- Sign-off is "Jiaming Wang, Founder" — no CEO title on public material.

## Forms

`AccessForm` posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT` if set (Formspree, Tally, Basin, your own API). If not set, it opens a prefilled email to `hello@hibi.club` — nothing is stored on the site. Set the variable in Vercel → Project → Environment Variables and redeploy.

## Deploy & multi-person management

Recommended: **GitHub org repo + Vercel**.

1. Create a GitHub organization (e.g. `hibi-club`), push this folder as `website`. Protect `main` (require PR + 1 review).
2. Vercel → *Add New Project* → import the repo. Framework: Next.js. No env vars required. Vercel detects `output: 'export'` automatically.
3. Domain: Vercel → Project → Domains → add `hibi.club` and `www.hibi.club` (www → apex redirect). Point the registrar's DNS to Vercel (A `76.76.21.21` or the CNAME Vercel shows). Keep the registrar account under a shared company login with 2FA, not a personal one.
4. Invite the team to both the GitHub org and the Vercel team so no single person is a bottleneck.

Any static host also works: `npm run build` → upload `out/`. For GitHub Pages / Cloudflare Pages, keep `trailingSlash: true` (already set) so `/en/merchants/` resolves.

## Not yet done (intentionally)

- Team page shows only the founder; add people when you are ready to name them.
- Legal pages are a labeled draft; replace with counsel-reviewed text before the pilot goes live.
- Social links in `content/site.ts` are empty until the accounts exist.
- No analytics. If you add one, prefer a cookieless option (Vercel Analytics, Plausible) so the privacy page stays true.
