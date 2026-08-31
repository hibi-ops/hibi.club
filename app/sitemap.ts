import type { MetadataRoute } from 'next';
import { SITE, LANGS, PATHS, href } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap(p => LANGS.map(l => ({
    url: `${SITE.url}${href(l, p)}`,
    lastModified: now,
    changeFrequency: (p === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: p === '' ? 1 : p === 'legal' ? 0.2 : 0.8,
    alternates: { languages: Object.fromEntries(LANGS.map(x => [x === 'zh' ? 'zh-Hans' : x, `${SITE.url}${href(x, p)}`])) },
  })));
}
