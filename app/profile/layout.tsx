import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type ProfileLayoutProps = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-ink-950 text-text-inverse">
      <Navbar overlay />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </div>
  );
}
