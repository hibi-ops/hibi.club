import NotFoundBody from '@/components/NotFoundBody';

/* Also the source of out/404.html — what a static host serves for any path it
   cannot match. */
export default function NotFound() {
  return <NotFoundBody />;
}
