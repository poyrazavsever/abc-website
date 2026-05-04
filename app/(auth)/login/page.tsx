import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { LoginForm } from "@/components/auth/login-form";
import { resolveAuthEntryRedirect } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description:
    "Ankara Build Club hesabınızla giriş yapın ve platform alanına erişin.",
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
    <AuthShell>
      <Suspense fallback={<AuthFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
