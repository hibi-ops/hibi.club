# Hibi — Web

The Hibi marketing site. White-first, functional-neon, iOS 26 design system (**v13**).
This is a fresh project — **not** "Push" (the old internal codename).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Build: `npm run build && npm start`.

## What's here

```
app/
  globals.css     ← design tokens + every component class. Edit tokens here, never hardcode.
  layout.tsx      ← mounts <MarkDefs/> once; sets metadata
  page.tsx        ← composes the homepage sections
components/
  MarkDefs.tsx    ← registers the logo <symbol> once
  Mark.tsx        ← <Mark size color/> → uses --mc token
  Reveal.tsx      ← scroll fade-up (client)
  Nav, Hero, Roles, Chapter, Stat, Footer
public/fonts/     ← self-hosted fonts (Magvix, General Sans, Shippori Mincho, Noto Sans JP)
HIBI_HANDOFF.md   ← the full spec (brand, voice, design system, page spec)
```

## The rules (read `HIBI_HANDOFF.md` for the rest)

- **Two art cuts only:** Magvix = TITLE, Magvix Italic = SUBTITLE. Everything else — body, **buttons**, labels, eyebrows, nav, numbers, giant words — is **General Sans** (natural). Buttons are sentence case, never an art font.
- **White + ink ≈ 95%.** Four neons (sky / pink / green / orange) are *functional* accents: each place a user is a regular at gets one color. A neon is a *point, never a plane*; ≤2 per viewport.
- **Primary CTA is always ink fill.** A neon-filled big button is forbidden. CTAs appear as a pair (ink + glass).
- **Spacing is token-only** (`--s1…--s9`, the 8px scale). No eyeballed values. iOS 26 radii + liquid-glass nav.
- **Verify at 1440px and 390px** after every change. Never redraw a separate mobile layout — same composition, fluid type (`clamp`), nav collapses to wordmark + single primary pill.
- The word **"Club" never appears** anywhere. There is **no red seal**.

## Next pages to build

Pricing · Features (per-feature) · Merchant dashboard (Product register). Reuse the tokens; keep the paper/snow registers separate from any dense product UI.
