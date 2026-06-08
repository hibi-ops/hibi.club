import type { Metadata } from "next";
import "./globals.css";
import MarkDefs from "@/components/MarkDefs";

export const metadata: Metadata = {
  title: "Hibi — Where regulars belong",
  description:
    "The verified-visit membership layer for local commerce. Creator posts, customer scans at the register, merchant pays per verified store visit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MarkDefs />
        {children}
      </body>
    </html>
  );
}
