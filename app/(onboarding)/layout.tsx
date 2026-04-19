import type { ReactNode } from "react";

import { Container } from "@/components/shared/container";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <main className="min-h-screen bg-background py-10 sm:py-14">
      <Container width="default">
        <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
              Onboarding
            </p>
            <div className="h-2 w-full rounded-full bg-surface-strong">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
          </div>
          {children}
        </div>
      </Container>
    </main>
  );
}
