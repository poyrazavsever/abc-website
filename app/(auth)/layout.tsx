import type { ReactNode } from "react";

import { Container } from "@/components/shared/container";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background py-14">
      <Container width="narrow">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </Container>
    </main>
  );
}
