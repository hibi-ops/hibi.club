/* The only icons left are the ones that do a job no word does: a tick in a
   list of guarantees, and a tick on the form's confirmation. Everything else
   was a coloured plate restating the label printed next to it. */
export default function Icon({ name, size = 16 }: { name: 'check'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4.5 12.5 4.8 4.8L19.5 7" />
    </svg>
  );
}
