import type { Metadata } from "next";

import { OnboardingDetailsForm } from "@/components/onboarding/onboarding-details-form";
import { OnboardingFlowCard } from "@/components/onboarding/onboarding-flow-card";
import { requireOnboardingStep } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profil Detayları",
  description:
    "Ankara Build Club onboarding detay adımı. Bio ve sosyal medya kullanıcı adlarınızı tamamlayın.",
};

export default async function OnboardingDetailsPage() {
  const onboardingState = await requireOnboardingStep("details");

  return (
    <OnboardingFlowCard activeStep="details">
      <OnboardingDetailsForm profile={onboardingState.profile} />
    </OnboardingFlowCard>
  );
}
