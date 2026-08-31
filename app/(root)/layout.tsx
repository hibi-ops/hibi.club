/* Separate root layout for `/` — the language picker. Route groups let this
   coexist with app/[lang]/layout.tsx without nesting two <html> elements. */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
