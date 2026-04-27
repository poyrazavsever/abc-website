import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/server";
import {
  getLoginHref,
  getOnboardingHref,
  isOnboardingComplete,
} from "@/lib/auth/shared";

function parseAllowlist(value: string | undefined) {
  return new Set(
    value
      ?.split(",")
      .map((email) => email.trim().toLocaleLowerCase("en"))
      .filter(Boolean) ?? [],
  );
}

export async function requireAdminAccess(nextPath = "/admin") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(getLoginHref(nextPath));
  }

  if (!isOnboardingComplete(user)) {
    redirect(getOnboardingHref());
  }

  const allowlist = parseAllowlist(process.env.ADMIN_EMAIL_ALLOWLIST);

  if (allowlist.size === 0 && process.env.NODE_ENV !== "production") {
    return;
  }

  if (allowlist.size === 0) {
    notFound();
  }

  const email = user?.email?.toLocaleLowerCase("en");

  if (!email || !allowlist.has(email)) {
    notFound();
  }
}
