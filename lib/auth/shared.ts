import type { User } from "@supabase/supabase-js";

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

export function getOnboardingHref() {
  return "/onboarding/profile";
}

export function getDefaultAuthedHref() {
  return "/dashboard/profile";
}

export function getProfileHref(
  user: Pick<User, "user_metadata"> | null | undefined,
) {
  return isOnboardingComplete(user)
    ? getDefaultAuthedHref()
    : getOnboardingHref();
}

export function getPostAuthRedirectTarget(
  user: Pick<User, "user_metadata"> | null | undefined,
  next: string | null | undefined,
) {
  if (!isOnboardingComplete(user)) {
    return getOnboardingHref();
  }

  return getSafeNextPath(next) ?? getDefaultAuthedHref();
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
    return "E-posta veya sifre hatali.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Devam etmek icin e-posta adresinizi dogrulayin.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "Bu e-posta adresi ile daha once hesap olusturulmus.";
  }

  if (normalizedMessage.includes("password should be at least")) {
    return "Sifre minimum gereksinimi karsilamiyor.";
  }

  if (normalizedMessage.includes("signup is disabled")) {
    return "Kayit olma akisi su anda kapali.";
  }

  if (normalizedMessage.includes("email link is invalid")) {
    return "Dogrulama baglantisi gecersiz veya suresi dolmus.";
  }

  if (normalizedMessage.includes("code challenge does not match")) {
    return "Dogrulama baglantisi gecersiz veya suresi dolmus.";
  }

  return message?.trim() || "Beklenmeyen bir auth hatasi olustu.";
}
