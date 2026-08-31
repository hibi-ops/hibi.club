import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { LANGS, SITE, type Lang } from '@/content/site';
import { getDict } from '@/content';
import JsonLd from '@/components/JsonLd';
import Pointer from '@/components/Pointer';
import Cursor from '@/components/Cursor';
import { orgJsonLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.map(lang => ({ lang })); }

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Hibi', template: '%s' },
  applicationName: 'Hibi',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#15141a', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params as { lang: Lang };
  getDict(lang);
  return (
    <html lang={lang === 'zh' ? 'zh-Hans' : 'en'} data-lang={lang}>
      <body>
        <JsonLd data={orgJsonLd(lang)} />
        <Pointer />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
