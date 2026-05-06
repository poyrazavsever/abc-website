import type { Metadata } from "next";

import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { OnboardingProjectForm } from "@/components/onboarding/onboarding-project-form";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Proje Onboarding",
  description:
    "Ankara Build Club onboarding proje adımı. İlk projenizi ekleyin veya bu adımı daha sonra tamamlamak üzere atlayın.",
};

export default async function OnboardingProjectPage() {
  const onboardingState = await requireOnboardingStep("project");

  return (
    <OnboardingFlowCard activeStep="project">
      <OnboardingProjectForm
        profile={onboardingState.profile}
        projects={onboardingState.projects}
      />
    </OnboardingFlowCard>
  );
}
