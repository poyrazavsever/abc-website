import type { User } from "@supabase/supabase-js";

import type { OnboardingStep } from "@/lib/types/profile";

export type AuthUserMetadata = {
  full_name?: string;
  onboarding_completed?: boolean;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isSafeRelativePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export function getAuthUserMetadata(
  user: Pick<User, "user_metadata"> | null | undefined,
): AuthUserMetadata {
  const metadata =
    user?.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  return {
    full_name: isNonEmptyString(metadata.full_name)
      ? metadata.full_name.trim()
      : undefined,
    onboarding_completed: metadata.onboarding_completed === true,
  };
}

export function getUserFullName(
  user: Pick<User, "user_metadata"> | null | undefined,
) {
  return getAuthUserMetadata(user).full_name ?? null;
}

export function isOnboardingComplete(
  user: Pick<User, "user_metadata"> | null | undefined,
) {
  return getAuthUserMetadata(user).onboarding_completed === true;
}

export function getSafeNextPath(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  const trimmedPath = path.trim();

  if (!isNonEmptyString(trimmedPath) || !isSafeRelativePath(trimmedPath)) {
    return null;
  }

  if (
    trimmedPath === "/login" ||
    trimmedPath === "/register" ||
    trimmedPath.startsWith("/auth/callback")
  ) {
    return null;
  }

  return trimmedPath;
}

export function getLoginHref(next: string | null | undefined) {
  const safeNext = getSafeNextPath(next);

  if (!safeNext) {
    return "/login";
  }

  return `/login?next=${encodeURIComponent(safeNext)}`;
}

export function getRegisterHref(next: string | null | undefined) {
  const safeNext = getSafeNextPath(next);

  if (!safeNext) {
    return "/register";
  }

  return `/register?next=${encodeURIComponent(safeNext)}`;
}

export function getOnboardingHref(step: OnboardingStep = "profile") {
  return `/onboarding/${step}`;
}

export function getDefaultAuthedHref(
  user?: Pick<User, "id" | "user_metadata"> | null,
) {
  if (user?.id) {
    return `/profile/${user.id}`;
  }
  return "/builders";
}

export function getAuthContinueHref(next: string | null | undefined) {
  const safeNext = getSafeNextPath(next);

  if (!safeNext) {
    return "/auth/continue";
  }

  return `/auth/continue?next=${encodeURIComponent(safeNext)}`;
}

export function getProfileHref(
  user: Pick<User, "id" | "user_metadata"> | null | undefined,
) {
  return isOnboardingComplete(user)
    ? getDefaultAuthedHref(user)
    : getOnboardingHref();
}

export function getPostAuthRedirectTarget(
  _user: Pick<User, "user_metadata"> | null | undefined,
  next: string | null | undefined,
) {
  return getAuthContinueHref(next);
}

export function buildAuthCallbackUrl(
  appUrl: string,
  next: string | null | undefined,
) {
  const callbackUrl = new URL("/auth/callback", appUrl);
  const safeNext = getSafeNextPath(next);

  if (safeNext) {
    callbackUrl.searchParams.set("next", safeNext);
  }

  return callbackUrl.toString();
}

export function getAuthErrorMessage(message: string | null | undefined) {
  const normalizedMessage = message?.trim().toLocaleLowerCase("en") ?? "";

  if (normalizedMessage.includes("invalid login credentials")) {
    return "Incorrect email or password.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Please verify your email address to continue.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "An account with this email address already exists.";
  }

  if (normalizedMessage.includes("password should be at least")) {
    return "Password does not meet the minimum requirement.";
  }

  if (normalizedMessage.includes("signup is disabled")) {
    return "Sign-up is currently disabled.";
  }

  if (normalizedMessage.includes("email link is invalid")) {
    return "The verification link is invalid or has expired.";
  }

  if (normalizedMessage.includes("code challenge does not match")) {
    return "The verification link is invalid or has expired.";
  }

  return message?.trim() || "An unexpected authentication error occurred.";
}
