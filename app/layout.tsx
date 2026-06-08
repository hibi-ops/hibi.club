import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import MarkDefs from "@/components/MarkDefs";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: {
    default: "Hibi — Where regulars belong",
    template: "%s · Hibi",
  },
  description:
    "The verified-visit membership layer for local commerce. Creator posts, customer scans at the register, merchant pays per verified store visit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* mark registered once for every route (marketing + product) */}
        <MarkDefs />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
