import type { Metadata } from "next";

import { OnboardingDetailsForm } from "@/components/onboarding/onboarding-details-form";
import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profile Details",
  description:
    "Ankara Build Club onboarding details step. Complete your bio and social media usernames.",
};

export default async function OnboardingDetailsPage() {
  const onboardingState = await requireOnboardingStep("details");

  return (
    <OnboardingFlowCard activeStep="details">
      <OnboardingDetailsForm profile={onboardingState.profile} />
    </OnboardingFlowCard>
  );
}
