import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getDefaultAuthedHref,
  getLoginHref,
  getOnboardingHref,
  getSafeNextPath,
} from "@/lib/auth/shared";
import {
  getIncompleteOnboardingStep,
  getProfileSnapshotForUser,
} from "@/lib/services/profile.service";
import type { OnboardingState, OnboardingStep } from "@/lib/types/profile";

const onboardingStepOrder: OnboardingStep[] = ["profile", "details", "project"];

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

function buildOnboardingState(user: User, snapshot: {
  profile: OnboardingState["profile"];
  projects: OnboardingState["projects"];
}): OnboardingState {
  const nextStep = getIncompleteOnboardingStep(snapshot.profile);

  return {
    user,
    profile: snapshot.profile,
    projects: snapshot.projects,
    nextStep,
    isComplete: nextStep === null,
  };
}

export async function requireAuthenticatedUser(nextPath: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(getLoginHref(nextPath));
  }

  return user;
}

export async function getCurrentOnboardingState(): Promise<OnboardingState | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const snapshot = await getProfileSnapshotForUser(user);
  return buildOnboardingState(user, snapshot);
}

async function requireCurrentOnboardingState(nextPath: string) {
  const user = await requireAuthenticatedUser(nextPath);
  const snapshot = await getProfileSnapshotForUser(user);

  return buildOnboardingState(user, snapshot);
}

export async function resolveAuthenticatedRedirect(
  nextPath: string | null | undefined,
) {
  const onboardingState = await getCurrentOnboardingState();

  if (!onboardingState) {
    return getLoginHref(nextPath);
  }

  if (!onboardingState.isComplete) {
    return getOnboardingHref(onboardingState.nextStep ?? "profile");
  }

  return getSafeNextPath(nextPath) ?? getDefaultAuthedHref(onboardingState.user);
}

export async function resolveAuthEntryRedirect(
  nextPath: string | null | undefined,
) {
  const onboardingState = await getCurrentOnboardingState();

  if (!onboardingState) {
    return null;
  }

  if (!onboardingState.isComplete) {
    return getOnboardingHref(onboardingState.nextStep ?? "profile");
  }

  return getSafeNextPath(nextPath) ?? getDefaultAuthedHref(onboardingState.user);
}

export async function requireCompletedOnboarding(nextPath: string) {
  const onboardingState = await requireCurrentOnboardingState(nextPath);

  if (!onboardingState.isComplete) {
    redirect(getOnboardingHref(onboardingState.nextStep ?? "profile"));
  }

  return onboardingState;
}

export async function requireOnboardingStep(step: OnboardingStep) {
  const onboardingState = await requireCurrentOnboardingState(
    getOnboardingHref(step),
  );

  if (onboardingState.isComplete) {
    redirect(getDefaultAuthedHref(onboardingState.user));
  }

  const nextStep = onboardingState.nextStep ?? step;
  const requestedStepIndex = onboardingStepOrder.indexOf(step);
  const nextStepIndex = onboardingStepOrder.indexOf(nextStep);

  if (requestedStepIndex > nextStepIndex) {
    redirect(getOnboardingHref(nextStep));
  }

  return onboardingState;
}
