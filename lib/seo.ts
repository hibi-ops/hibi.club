import type { Metadata } from 'next';
import { SITE, LANGS, href, type Lang, type PathKey } from '@/content/site';
import type { Meta } from '@/content/types';

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', zh: 'zh_CN' };

export function pageMetadata(lang: Lang, path: PathKey, m: Meta): Metadata {
  const url = `${SITE.url}${href(lang, path)}`;
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l === 'zh' ? 'zh-Hans' : l] = `${SITE.url}${href(l, path)}`;
  languages['x-default'] = `${SITE.url}${href('en', path)}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: m.title, description: m.description, url, siteName: SITE.name, type: 'website',
      locale: OG_LOCALE[lang], alternateLocale: LANGS.filter(l => l !== lang).map(l => OG_LOCALE[l]),
      images: [{ url: `${SITE.url}/og.png`, width: 1200, height: 630, alt: 'Hibi' }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [`${SITE.url}/og.png`] },
  };
}

export function orgJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon-512.png`,
    email: SITE.email,
    foundingDate: String(SITE.founded),
    address: { '@type': 'PostalAddress', addressLocality: 'New York', addressRegion: 'NY', addressCountry: 'US' },
    description: lang === 'zh'
      ? '本地创作者发帖带客，客人到店核销，商家只为进门消费的客人付一笔佣金。'
      : 'Pay-per-visit local marketing: merchants pay one commission per walk-in; creators are paid per customer they deliver.',
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(x => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
  };
}
