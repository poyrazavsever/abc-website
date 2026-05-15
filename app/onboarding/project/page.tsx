import type { Metadata } from "next";

import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { OnboardingProjectForm } from "@/components/onboarding/onboarding-project-form";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Project Onboarding",
  description:
    "Ankara Build Club project onboarding step. Add your first project or skip this step and complete it later.",
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
