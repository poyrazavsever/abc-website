import { notFound, redirect } from "next/navigation";

import { requireCompletedOnboarding } from "@/lib/auth/server";
import { getLoginHref } from "@/lib/auth/shared";

function parseAllowlist(value: string | undefined) {
  return new Set(
    value
      ?.split(",")
      .map((email) => email.trim().toLocaleLowerCase("en"))
      .filter(Boolean) ?? [],
  );
}

export async function requireAdminAccess(nextPath = "/admin") {
  let onboardingState;

  try {
    onboardingState = await requireCompletedOnboarding(nextPath);
  } catch {
    redirect(getLoginHref(nextPath));
  }

  const allowlist = parseAllowlist(process.env.ADMIN_EMAIL_ALLOWLIST);

  if (allowlist.size === 0 && process.env.NODE_ENV !== "production") {
    return;
  }

  if (allowlist.size === 0) {
    notFound();
  }

  const email = onboardingState.user.email?.toLocaleLowerCase("en");

  if (!email || !allowlist.has(email)) {
    notFound();
  }
}
