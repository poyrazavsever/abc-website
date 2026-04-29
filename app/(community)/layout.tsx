import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/shared/container";

type CommunityLayoutProps = {
  children: ReactNode;
};

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-black text-text-inverse">
      <Navbar />
      <main className="min-h-[60vh] py-10">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
