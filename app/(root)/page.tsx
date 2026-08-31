import type { Metadata } from 'next';

/* `/` is not a real page — it hands the visitor to /en/ or /zh/.
   output:'export' rules out middleware and redirect(), so this is a meta
   refresh with a script that honours the browser language first. */
export const metadata: Metadata = {
  title: 'Hibi',
  robots: { index: false, follow: true },
};

const PICK = `(function(){try{var l=(navigator.language||'en').toLowerCase();location.replace(l.indexOf('zh')===0?'/zh/':'/en/');}catch(e){location.replace('/en/');}})();`;

export default function Root() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <script dangerouslySetInnerHTML={{ __html: PICK }} />
      <noscript>
        <a href="/en/">English</a> · <a href="/zh/">中文</a>
      </noscript>
    </>
  );
}
