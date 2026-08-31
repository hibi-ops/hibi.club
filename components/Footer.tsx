import Link from 'next/link';
import Wordmark from './Wordmark';
import { SITE, href, type Lang } from '@/content/site';
import type { Dict } from '@/content/types';

export default function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Wordmark className="giant" />
          <p className="lead" style={{ maxWidth: '28ch' }}>{t.footer.tagline}</p>
        </div>
        <div className="footer-cols">
          <div>
            <span className="label gray">{t.footer.product}</span>
            <Link href={href(lang, 'merchants')}>{t.nav.merchants}</Link>
            <Link href={href(lang, 'creators')}>{t.nav.creators}</Link>
            <Link href={`${href(lang)}#access`}>{t.nav.cta}</Link>
          </div>
          <div>
            <span className="label gray">{t.footer.company}</span>
            <Link href={href(lang, 'about')}>{t.nav.about}</Link>
            <Link href={`${href(lang, 'about')}#hiring`}>{t.about.hiring.label}</Link>
            <Link href={`${href(lang, 'about')}#investors`}>{t.footer.investors}</Link>
          </div>
          <div>
            <span className="label gray">{t.footer.contact}</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.city}</span>
            {SITE.social.instagram && <a href={SITE.social.instagram} rel="noopener">Instagram</a>}
            {SITE.social.xiaohongshu && <a href={SITE.social.xiaohongshu} rel="noopener">小红书</a>}
          </div>
          <div>
            <span className="label gray">{t.footer.legal}</span>
            <Link href={`${href(lang, 'legal')}#privacy`}>{t.footer.privacy}</Link>
            <Link href={`${href(lang, 'legal')}#terms`}>{t.footer.terms}</Link>
            <Link href={href(lang === 'en' ? 'zh' : 'en')} hrefLang={lang === 'en' ? 'zh' : 'en'}>{lang === 'en' ? '中文' : 'English'}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {SITE.name}. {t.footer.rights}</span>
          <span>{t.footer.built} · 日々</span>
        </div>
      </div>
    </footer>
  );
}
