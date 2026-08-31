/**
 * Shared 404 body. Two not-found.tsx files use it: one in the (root) group
 * (which also produces out/404.html — the file a static host serves for every
 * unmatched path) and one inside [lang], which catches /en/anything.
 *
 * Neither knows the visitor's language: not-found.tsx receives no params. So
 * it offers both rather than guessing. The numeral is hollow because outline
 * means absence everywhere else on the site.
 */
export default function NotFoundBody() {
  return (
    <main className="nf">
      <div className="wrap">
        <span className="num num-void nf-num" aria-hidden="true">404</span>
        <h1 className="h1 nf-title"><span className="hl">This page does not exist.</span></h1>
        <p className="lead nf-lead">
          The link may be old, or the page may have moved. Both languages start here.
        </p>
        <p className="lead nf-lead" lang="zh">这个页面不存在。链接可能过期，或者页面已经移走。</p>
        <div className="cta-row nf-cta">
          <a href="/en/" className="btn btn-primary" hrefLang="en">
            English <span className="arr" aria-hidden="true">→</span>
          </a>
          <a href="/zh/" className="btn btn-second" hrefLang="zh" lang="zh">
            中文 <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
