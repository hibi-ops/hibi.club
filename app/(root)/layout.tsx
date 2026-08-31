import '../globals.css';

/* Root layout for the two pages that sit outside /[lang]: the language picker
   at `/` and the 404. Route groups let this coexist with app/[lang]/layout.tsx
   without nesting two <html> elements. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
