import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BottomDock from "@/components/BottomDock";

/** Marketing shell: glass-pill nav + floating bottom dock + footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <BottomDock />
    </>
  );
}
