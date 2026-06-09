import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { useCartSync } from "@/hooks/useCartSync";

export function SiteLayout({ children }: { children: ReactNode }) {
  useCartSync();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

