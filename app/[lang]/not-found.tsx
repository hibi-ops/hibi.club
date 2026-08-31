import NotFoundBody from '@/components/NotFoundBody';

/* Catches /en/anything and /zh/anything, which never reach the root group. */
export default function NotFound() {
  return <NotFoundBody />;
}
