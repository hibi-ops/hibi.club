import Link from 'next/link';
import Wordmark from './Wordmark';
import { href, type Lang, type PathKey } from '@/content/site';
import type { Dict } from '@/content/types';

export default function Nav({ lang, t, current }: { lang: Lang; t: Dict; current: PathKey }) {
  const links: { key: PathKey; label: string }[] = [
    { key: 'merchants', label: t.nav.merchants },
    { key: 'creators', label: t.nav.creators },
    { key: 'about', label: t.nav.about },
  ];
  return (
    <header className="nav">
      <div className="wrap">
        <div className="nav-in">
          <Link href={href(lang)} aria-label="Hibi — home"><Wordmark /></Link>
          <nav className="nav-links" aria-label="Primary">
            {links.map(l => (
              <Link key={l.key} href={href(lang, l.key)} aria-current={current === l.key ? 'page' : undefined}>{l.label}</Link>
            ))}
          </nav>
          <div className="nav-right">
            <span className="lang" aria-label="Language">
              <Link href={href('en', current)} aria-current={lang === 'en' ? 'true' : undefined} hrefLang="en" lang="en">EN</Link>
              <span className="sep" aria-hidden="true">/</span>
              <Link href={href('zh', current)} aria-current={lang === 'zh' ? 'true' : undefined} hrefLang="zh" lang="zh">中文</Link>
            </span>
            <Link href={`${href(lang)}#access`} className="btn btn-primary btn-nav">{t.nav.cta}</Link>
          </div>
        </div>
        <nav className="nav-mobile-links" aria-label="Primary (mobile)">
          {links.map(l => (
            <Link key={l.key} href={href(lang, l.key)} aria-current={current === l.key ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
