import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar overlay />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </div>
  );
}
