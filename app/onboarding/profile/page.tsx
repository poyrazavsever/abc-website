import type { Metadata } from "next";

import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { OnboardingProfileForm } from "@/components/onboarding/onboarding-profile-form";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profile Onboarding",
  description:
    "Ankara Build Club profile onboarding step. Complete your profile photo, location, and role information.",
};

export default async function OnboardingProfilePage() {
  const onboardingState = await requireOnboardingStep("profile");

  return (
    <OnboardingFlowCard activeStep="profile">
      <OnboardingProfileForm
        profile={onboardingState.profile}
        userEmail={onboardingState.user.email ?? null}
      />
    </OnboardingFlowCard>
  );
}
