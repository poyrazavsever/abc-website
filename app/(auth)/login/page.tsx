import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { LoginForm } from "@/components/auth/login-form";
import { PremiumLoginShell } from "@/components/auth/premium-login-shell";
import { resolveAuthEntryRedirect } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Giris Yap",
  description:
    "Ankara Build Club hesabinizla giris yapin ve platform alanina erisin.",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string | string[] | undefined }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const query = await searchParams;
  const next =
    typeof query.next === "string"
      ? query.next
      : Array.isArray(query.next)
        ? query.next[0]
        : null;
  const target = await resolveAuthEntryRedirect(next);

  if (target) {
    redirect(target);
  }

  return (
    <PremiumLoginShell>
      <Suspense fallback={<AuthFormFallback />}>
        <LoginForm />
      </Suspense>
    </PremiumLoginShell>
  );
}
