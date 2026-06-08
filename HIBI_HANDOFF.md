# Hibi — Build Handoff (self-contained)

> **Purpose.** Everything a fresh agent needs to build the Hibi website from zero — no access to any prior repo or chat required. This is the single source of truth. The brand is **Hibi** (a brand-new project; *not* "Push", which was the internal codename).
> **Last updated:** 2026-06-08 · Design system **v13** · Edition 01.

---

## 0 · How to use this doc

1. Start a new repo (suggested stack in §10). **Do not** import anything named "Push".
2. Copy the **fonts** (§9) and the **mark SVG** (§4) into the new project.
3. Paste the **`:root` token block** (§5.1) as your global CSS variables. Everything downstream references these tokens — never hardcode a hex or a spacing value.
4. Build the homepage section-by-section from §8. The canonical visual reference is `hibi-homepage-prototype.html` (ships alongside this doc) — open it in a browser to see the target.
5. Obey the discipline rules (§5–§7). They are why it looks premium instead of "ugly."

**Files that ship with this handoff** (in `/brand-hibi/`):
- `hibi-homepage-prototype.html` — ✅ the visual target. Pixel-faithful, self-contained, fonts embedded.
- `hibi-brand-guide.html` — full brand guide (mark construction, color, type, applications).
- `hibi-mark.svg` (in `/masters/`) — the logo master.
- `fonts/` — all self-hosted font files.

---

## 1 · What Hibi is

**Hibi** (日々, Japanese for "day by day") is the **verified-visit membership layer for local commerce**. A creator posts a place. A customer scans a QR at the register. The merchant pays only for the **verified store visit** — never impressions.

- **One-liner:** *Hibi is the attribution rail for local commerce. Creator posts, customer scans at the register, merchant pays per verified store visit.*
- **Brand promise:** belonging, not transactions.
- **Mechanic → metaphor:** each scan = stamping one "day" (日). 50 days at a place = you're a regular. The product logic and the brand story are the same thing.

**Four pillars:** **Daily** (the regular, not the special occasion) · **Quiet** (anti-loyalty-spam; *Kinfolk*, not *Groupon*) · **Real** (verified physical visits, not tracked clicks) · **Local** (block by block — "we don't enter cities, we enter blocks").

**Anti-positioning — Hibi is NOT:** a loyalty stamp-card app · a creator-marketing platform · a coupon/delivery app · a foot-traffic analytics tool · web3/token loyalty. **It is:** membership infrastructure that makes "I'm a regular here" a measurable, payable, beautiful thing.

---

## 2 · Taglines & key copy (use verbatim)

**Hero options:** "Where regulars belong." · "The quiet membership your block already runs." · "Become someone's hibi." · "Day by day. Block by block."

**Section sub-taglines:** "Verified visits, not vanity metrics." · "Pay only when they show up." · "The currency is the visit." · "Built block by block." · "Quiet by design."

**Signature divider phrases (Magvix italic):** `Posted · Scanned · Verified ·` · `End of day · Hibi ·` · `Day 47 at this place ·`

---

## 3 · Voice (three audiences)

| Audience | Tone | Say | Never |
|---|---|---|---|
| **Creator** | Editorial, understated (*Eater*, not influencer) | "I'm stamping my hibi at Oslo." · "The block I belong to." | "Use my code" · "10% off" · "Limited time" |
| **Customer** | Warm, intimate, anti-app-spam | "Find your hibis." · "Belong without trying." | "Earn points" · "Rewards await" · "Spin to win" |
| **Merchant** | Professional, money-talking, confident | "Pay only when they hibi." · "Your regulars, finally on the books." | "Boost engagement" · "Maximize ROI" |

**Rule:** the product name lives only in the domain `hibi.club`. The word **"Club" never appears** in logo, copy, UI, or deck. The brand is always just **Hibi**.

---

## 4 · The mark

**The idea (dual reading).** The ring is the last stroke of 日. Remove the ring → the letter **H** (Hibi). Add the ring → a round **日** (day). Every stroke serves both writing systems; nothing is decoration.

**Geometry.** A solid disc minus four rounded counters. Pure vector, single color, fillets baked into the path (no filter, no stroke, no sharp corners). Stems at ±0.382R (1/φ²), ring weight 0.130R, stem 0.120R, bar 0.087R, bar lifted +0.033R (optical). Min size 16px digital / 8mm print.

**Master SVG** (paste as `hibi-mark.svg`; `--mc` controls color, defaults to ink):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
    <rect width="200" height="200" fill="#fff"/>
    <g fill="#000" stroke="#000" stroke-width="12" stroke-linejoin="round" stroke-linecap="round">
      <path d="M 76.4 87 L 76.4 29.9 A 74 74 0 0 1 123.6 29.9 L 123.6 87 Z"/>
      <path d="M 76.4 107 L 76.4 170.1 A 74 74 0 0 0 123.6 170.1 L 123.6 107 Z"/>
      <path d="M 53.4 42.5 L 53.4 157.5 A 74 74 0 0 1 53.4 42.5 Z"/>
      <path d="M 146.6 42.5 L 146.6 157.5 A 74 74 0 0 0 146.6 42.5 Z"/>
    </g>
  </mask>
  <circle cx="100" cy="100" r="92" fill="var(--mc,#15141a)" mask="url(#cut)"/>
</svg>
```
For reuse across a page, register it once as an SVG `<symbol id="mk">` and place with `<use href="#mk">`, setting `style="--mc:#52b6dd"` per instance.

**Mark states (only these):**
1. **Default — ink** (`#15141a`) on white. Everything: wordmark lockup, favicon, print.
2. **Color-coded — neon.** Each place a user is a regular at gets ONE neon; that place's mark, day-count, status pill, and card border render in its color. This is product logic, not styling.
3. **On dark — reverse** (`--mc:#ffffff`) on the rare dark surface.

**Never:** rotate, stretch, gradient-fill, add drop-shadow, recolor outside the token set, or pair with the word "Club". There is **no red/vermilion seal** (retired).

**Wordmark.** "Hibi" set in **Magvix Regular**, sentence case, no added tracking.

---

## 5 · Design system v13

### 5.1 — Token block (paste into `:root`)
```css
:root{
  /* color — white-first */
  --snow:#ffffff; --paper:#f8f8f6; --paper-2:#eeeeec; --line:#e6e6e3; --mist:#dcdcd8;
  --ink:#15141a; --ink-2:#42424a; --gray-s:#76756f;
  /* four functional neons (desaturated) */
  --sky:#52b6dd; --pink:#f079a6; --green:#4bc78f; --orange:#f5854a;
  /* spacing — 8px base, used as tokens EVERYWHERE (no eyeballed values) */
  --s1:8px; --s2:16px; --s3:24px; --s4:32px; --s5:48px; --s6:64px; --s7:96px; --s8:128px; --s9:168px;
  /* radii — iOS 26 continuous */
  --r-s:12px; --r-m:18px; --r-l:24px; --r-xl:32px; --r-pill:999px;
  /* glass + elevation + motion */
  --glass:rgba(255,255,255,.66); --line-glass:rgba(255,255,255,.7);
  --sh-1:0 1px 2px rgba(21,20,26,.04); --sh-2:0 8px 30px rgba(21,20,26,.07); --sh-3:0 24px 60px rgba(21,20,26,.10);
  --ease:cubic-bezier(.32,.72,.28,1);
}
```

### 5.2 — Color discipline (🔒 STRICT)
- **White + ink carry ~95% of every surface.** There is no single brand color; the signature is the discipline + the color-coding system.
- **The four neons are functional, not free.** Jobs: (1) color-code each place [primary], (2) highlighter swash behind one key word per section, (3) today-dot / progress, (4) tab/category pill, (5) occasional mark pop.
- **Any neon is a *point*, never a *plane*.** ≤2 neons visible per viewport (except a 4-color legend).
- **Primary CTA is always `--ink` fill.** Secondary is glass/ghost. **A neon NEVER fills a primary button** (candy-site failure).
- Body text is `--ink-2`, never a neon. Eyebrow/subtitle/caption are `--gray-s`. Titles are `--ink`.
- **Retired forever:** vermilion/朱 seal, matcha green, champagne/gold-on-screen, oat cream, and all legacy "Push-era" brand colors. Gold exists only as a physical foil process, never a screen hex.

### 5.3 — Type stack (🔒 STRICT): two art cuts, everything else natural
**Rule: art type appears in exactly two roles — TITLE and SUBTITLE. Everything else (body, buttons, labels, eyebrows, nav, numbers, giant display words) is the natural workhorse. Buttons must NOT use an art font.**

| Role | Font | Spec |
|---|---|---|
| **TITLE (art #1)** | **Magvix Regular** | wordmark, hero headline, every `h2`/`h3`. `letter-spacing:-.015em; line-height:1.02`. Never < 24px. |
| **SUBTITLE (art #2)** | **Magvix Italic** | line under a title; signature dividers; one inline accent word in a title. `line-height:1.24`, color `--gray-s`. |
| Body / lead | **General Sans 400** | body 18px/1.62 (`--ink-2`); lead 20px/1.55. |
| **Buttons** | **General Sans 600** | 15px, `letter-spacing:.005em`, **sentence case** ("Start for free"). iOS 26 rounded. |
| Eyebrow | General Sans 600 | 13px, `.16em`, UPPERCASE, `--gray-s`. |
| Label / nav / pill / tab / caption | General Sans 500–600 | 13–15px, near-zero tracking. |
| **Giant display word** (VISIT / 50 / footer HIBI) | **General Sans 600** | natural, just big: `clamp(72px,17vw,184px)`, `letter-spacing:-.04em; line-height:.92`. |
| Numbers | General Sans 600 | tabular where columnar. |
| Ceremonial CJK / kana | Shippori Mincho 500–700 | 明朝体; pairs Magvix. 「日々」, `日 47/50` live here. |
| UI CJK / kana | Noto Sans JP 400–600 | dashboards / dense CJK. |

**Darky is retired** (do not use). Switzer is optional, reserved for a colder dashboard register only.

### 5.4 — @font-face (self-hosted, files in §9)
```css
@font-face{font-family:'Magvix';src:url('/fonts/Magvix-Regular.ttf');font-display:swap;}
@font-face{font-family:'Magvix';src:url('/fonts/Magvix-Italic.ttf');font-style:italic;font-display:swap;}
@font-face{font-family:'General Sans';src:url('/fonts/GeneralSans-400.woff2');font-weight:400;font-display:swap;}
@font-face{font-family:'General Sans';src:url('/fonts/GeneralSans-500.woff2');font-weight:500;font-display:swap;}
@font-face{font-family:'General Sans';src:url('/fonts/GeneralSans-600.woff2');font-weight:600;font-display:swap;}
@font-face{font-family:'Shippori Mincho';src:url('/fonts/ShipporiMincho-500.ttf');font-weight:500;font-display:swap;}
@font-face{font-family:'Noto Sans JP';src:url('/fonts/NotoSansJP-400.ttf');font-weight:400;font-display:swap;}
@font-face{font-family:'Noto Sans JP';src:url('/fonts/NotoSansJP-600.ttf');font-weight:600;font-display:swap;}
/* body default */ body{font-family:'General Sans',sans-serif;color:var(--ink);background:var(--snow);}
```

### 5.5 — Buttons (iOS 26)
```css
.btn{font-family:'General Sans';font-weight:600;font-size:15px;letter-spacing:.005em;border-radius:var(--r-m);
  padding:14px 24px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;
  transition:transform .25s var(--ease),box-shadow .25s var(--ease);}
.btn-primary{background:var(--ink);color:var(--snow);box-shadow:var(--sh-2);}
.btn-primary:hover{transform:translateY(-1px);box-shadow:var(--sh-3);}
.btn-glass{background:var(--glass);border:1px solid var(--line);color:var(--ink);backdrop-filter:blur(12px);}
.btn-glass:hover{background:#fff;transform:translateY(-1px);}
.btn-sm{padding:11px 18px;font-size:14px;border-radius:var(--r-s);}
```
**CTAs always appear as a pair:** primary (ink) + glass/ghost — e.g. "Start for free" + "Book a demo". Never a lone third style.

---

## 6 · Spacing, radii, glass, motion (the unification fix)

"Still ugly" was unsystematic spacing. Use the 8px scale as tokens — **never eyeball**.

- **Section vertical padding:** `--s9` desktop / `--s7` mobile. Container max-width **1120px**, side padding `--s6` / `--s3`.
- **Vertical rhythm (identical on every surface):** eyebrow→title `--s4` · title→subtitle `--s2`–`--s3` · subtitle→body `--s4` · body→CTA `--s5` · adjacent buttons `--s2`.
- **Card/panel padding** `--s6` (→ `--s4` mobile); **card grid gap** `--s3`–`--s4`; **section head→content** `--s5`–`--s6`.
- **Radii (iOS 26 continuous):** button `--r-m`; card/panel `--r-xl`; pill/tab `--r-pill`; input `--r-s`.
- **Liquid Glass:** nav + floating tiles = `--glass` + `backdrop-filter:blur(20px) saturate(1.4)` + 1px `--line` border + soft layered shadow.
- **Motion:** ease `--ease`. Hover = `translateY(-1px)` + shadow lift (no big scale). Scroll-reveal: fade up 20px, 0.8s, IntersectionObserver `threshold:.15`.

---

## 7 · Layout & responsive (🔒 — verified at 390px & 1440px)

Same composition + hierarchy across breakpoints; only spacing scale + column count change (never a redrawn mobile layout). Breakpoints **860px** (nav/grid) and **780px** (two-col → stack).

- **Nav:** desktop = `[links | centered wordmark | Login + paired CTAs]`. **≤860px:** hide links + Login + the ghost CTA; nav becomes `[wordmark left | single primary pill right]`, side padding `--s3`. **Nav actions must never wrap.**
- **Type fluidity:** every title/giant size is `clamp(min,vw,max)` so nothing overflows 390px. Body stays 18px fixed.
- **Two-col → stack at 780px:** roles panel, stat, footer top. Stacked gap `--s4`–`--s5`.
- **Touch targets ≥44px.** Tabs/pills wrap centered (no horizontal scroll).
- **Text-wrap:** natural wrapping, no forced `<br>` that breaks badly narrow; titles may wrap 2–3 lines; a highlighter swash never splits across a line.

**Micro-typography:** tracking by tier (display negative, body 0, eyebrow `.16em`); line-height by tier (giant `.92`/title `1.02`/subtitle `1.24`/lead `1.55`/body `1.62`); body measure ~520–560px (60–70 chars). Highlighter swash: `top:42%; bottom:9%` of the word, `rotate(-1.2deg)`, `--r-s` corners, `z-index:-1`, one per viewport on the inline Magvix-italic accent word only.

---

## 8 · Homepage spec (build this)

The metaphor is **"a block's day"** (Hibi = 日々 = one day): morning-light hero → daytime scan → dusk close → footer. Structure, in order:

**8.1 Nav (sticky, liquid glass).** Left: Features · Solutions · Pricing · About. Center: **Hibi** wordmark (Magvix). Right: Login + `Start for free` (primary) + `Book a demo` (glass). Mobile per §7.

**8.2 Hero (white, full viewport, centered).**
- Eyebrow: `THE QUIET MEMBERSHIP YOUR BLOCK ALREADY RUNS`.
- Title (Magvix): **Become someone's _hibi._** — the word "hibi." is Magvix-italic with a **green highlighter swash**.
- Subtitle (Magvix italic): *Where regulars belong.*
- Lead (natural): "Creator posts. Customer scans at the register. You pay only for verified store visits — never impressions."
- CTA pair: `Start for free` (ink) + `Book a demo` (glass).
- Below: a **floating product card** (glass/white, `--r-xl`) = a phone showing the consumer app home: "Good morning, Mia" + an Oslo Coffee card (`日 47 / 50`, sky-coded) + a "Your hibis" list (Idlewild Books green / Rosette Wine pink) + a "Find your next hibi" ink button.

**8.3 Roles (paper bg).** Title (Magvix): "One rail, three sides of the block." Subtitle (italic): "The same visit means something different to everyone." Then a **pill-tab switcher**: Creator (pink) · Customer (sky) · Merchant (orange) — active tab fills with that neon. Each panel (`--r-xl` card): color-coded eyebrow, Magvix `h3` title, natural body, a Shippori-Mincho pull-quote with a neon left-border, an ink CTA, and a neon-tinted square holding the mark in that neon.
- Creator → "Stamp your hibi." · Customer → "Belong without trying." · Merchant → "Pay only when they hibi." (full copy in `hibi-homepage-prototype.html`).

**8.4 Divider (Magvix italic):** `Posted · Scanned · Verified ·`

**8.5 Three chapters (full-viewport each, near-white with a faint tint, one neon per chapter).** Eyebrow (`01 — Morning`), the mark in that chapter's neon, a **giant natural word** (General Sans 600), and a Magvix-italic subtitle.
- **VISIT** (sky, morning) — "A creator posts the matcha shop on the corner. Someone walks in the next morning. The day begins with a real footstep — not a click."
- **STAMP** (orange, midday) — "At the register, they scan. One day, stamped. The merchant pays only for this — a verified visit, not an impression."
- **BELONG** (green, dusk) — "Fifty days in, they're a regular — and they belong to this block, measurably. The day closes. Tomorrow, another stamp. 日々."

**8.6 Stat (paper, two-col).** Left: giant natural **`50.`** (period in sky). Right: green eyebrow "THE CURRENCY IS THE VISIT", Magvix title "Fifty **stamps** [sky highlighter], and someone is a regular.", natural body, a Shippori-Mincho line "圆，是「日」的最后一笔。".

**8.7 Divider:** `End of day · Hibi ·`

**8.8 Footer (white).** Top row: Magvix CTA "Become someone's _hibi_." + button pair; two link columns (Product / Company). Then a **giant natural "Hibi"** wordmark with the **four neon dots** as its trailing period. Base line: "Hibi — Where regulars belong." · "Built block by block · NYC · 2026".

> The exact copy, structure, and CSS for all of the above is in **`hibi-homepage-prototype.html`** — treat it as the spec. Rebuild it cleanly in your chosen framework; don't regress the tokens.

---

## 9 · Fonts (self-host — copy these files)

Put in `/public/fonts/` (or your equivalent). All are free for commercial use.

| Family | Files | Source / license |
|---|---|---|
| **Magvix** (art) | `Magvix-Regular.ttf`, `Magvix-Italic.ttf` | provided in `/brand-hibi/fonts/` (carry over) |
| **General Sans** (natural) | `GeneralSans-400.woff2`, `-500`, `-600` | Fontshare — free commercial |
| **Shippori Mincho** (CJK ceremonial) | `ShipporiMincho-500.ttf`, `-700` | Google Fonts (OFL) |
| **Noto Sans JP** (CJK UI) | `NotoSansJP-400.ttf`, `-600` | Google Fonts (OFL) |

(Switzer 400/500/600 is also in the folder — optional dashboard register only. Darky and Open Sans files exist but are **retired** — do not use.)

---

## 10 · Build instructions for the new repo

**Suggested stack:** Next.js (App Router) + TypeScript + vanilla CSS (or CSS Modules). Vanilla CSS is preferred — the system is token-driven and doesn't need a framework. If you use Tailwind, map the tokens in §5.1 to your theme; do not introduce off-token values.

**First steps:**
1. `globals.css`: paste §5.1 `:root`, §5.4 `@font-face`, §5.5 buttons, plus base resets.
2. Register the mark once (`components/Mark.tsx` rendering the §4 `<symbol>`); accept a `color` prop → `style={{'--mc':color}}`.
3. Build the homepage from §8, section by section, using only tokens. Keep a single `<Section>` wrapper that applies `--s9/--s7` padding + 1120px container.
4. Verify at **1440px and 390px** after each section (the two breakpoints this system is tuned for).

**Do-not list:** no Darky/Open Sans · no vermilion/matcha/champagne/oat · no neon-filled primary buttons · no art font in buttons/labels · no eyeballed spacing (tokens only) · no forced `<br>` in titles · the word "Club" never appears.

**Definition of done (per page):** matches `hibi-homepage-prototype.html` visually; passes 1440px + 390px; all CTAs paired; ≤2 neons per viewport; every dimension on the 8px scale.

---

## 11 · Reference files (open these)

- `hibi-homepage-prototype.html` — **the visual target.** Open first.
- `hibi-brand-guide.html` — mark construction, color, type, 12+ applications.
- `masters/hibi-mark.svg` — logo master.
- `hibi-font-study.html`, `hibi-palette-white.html` — the decisions behind the type + color choices (context, optional).

*This handoff supersedes any prior Push-era spec. Build as Hibi.*
