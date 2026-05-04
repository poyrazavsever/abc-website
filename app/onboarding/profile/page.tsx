import type { Metadata } from "next";

import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { OnboardingProfileForm } from "@/components/onboarding/onboarding-profile-form";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profil Onboarding",
  description:
    "Ankara Build Club profil onboarding adımı. Profil fotoğrafı, konum ve genel ünvan bilgilerinizi tamamlayın.",
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
