import type { ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";

type OnboardingLayoutShellProps = {
  children: ReactNode;
};

export function OnboardingLayoutShell({
  children,
}: OnboardingLayoutShellProps) {
  return (
    <main className="min-h-screen bg-background py-10 sm:py-14">
      <Container width="default">
        <Card className="mx-auto max-w-3xl rounded-2xl">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                Onboarding
              </p>
              <div className="h-2 w-full rounded-full bg-surface-strong">
                <div className="h-full w-1/3 rounded-full bg-primary" />
              </div>
            </div>
            {children}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
