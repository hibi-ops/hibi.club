import type { Metadata } from 'next';
import NotFoundBody from '@/components/NotFoundBody';

export const metadata: Metadata = {
  title: '404 — Hibi',
  robots: { index: false, follow: false },
};

/**
 * A real route, not a not-found.tsx, on purpose.
 *
 * Next only emits out/404.html from a ROOT-level not-found, and both of our
 * root layouts live inside route groups (so that /[lang] can own <html lang>,
 * which the CJK typography rules select on). A not-found.tsx inside a group
 * never reaches the static export.
 *
 * So the page is built as /404/ and scripts/post-build.mjs copies it to
 * out/404.html — the file a static host serves for any unmatched path. The
 * not-found.tsx files remain for in-app navigation during dev.
 */
export default function NotFoundPage() {
  return <NotFoundBody />;
}
