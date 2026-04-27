import type { ReactNode } from "react";

import { OnboardingLayoutShell } from "@/components/onboarding/onboarding-layout-shell";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export default function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  return <OnboardingLayoutShell>{children}</OnboardingLayoutShell>;
}
