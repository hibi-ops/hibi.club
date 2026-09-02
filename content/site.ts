// Site-wide constants. Edit here, never in components.
export const SITE = {
  name: 'Hibi',
  domain: 'hibi.club',
  url: 'https://hibi.club',
  email: 'hello@hibi.club',
  city: 'New York',
  founded: 2026,
  // Optional form endpoint (Formspree / Tally / Basin / your own API).
  // Leave empty → the form falls back to a prefilled email.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',
  social: {
    instagram: 'https://www.instagram.com/hibi_club/',
    xiaohongshu: '', // e.g. https://www.xiaohongshu.com/user/profile/…
    linkedin: 'https://linkedin.com/company/hibi-club',
  },
} as const;

export const LANGS = ['en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export const PATHS = ['', 'merchants', 'creators', 'pricing', 'security', 'about', 'legal'] as const;
export type PathKey = (typeof PATHS)[number];

export function href(lang: Lang, path: PathKey | string = '') {
  const p = String(path).replace(/^\/+|\/+$/g, '');
  return p ? `/${lang}/${p}/` : `/${lang}/`;
}
