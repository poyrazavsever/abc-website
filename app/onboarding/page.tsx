import { redirect } from "next/navigation";

import { getOnboardingHref } from "@/lib/auth/shared";

export default function OnboardingPage() {
  redirect(getOnboardingHref());
}
