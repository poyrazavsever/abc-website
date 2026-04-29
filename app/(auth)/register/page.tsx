import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { resolveAuthEntryRedirect } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Kayit Ol",
  description:
    "Ankara Build Club topluluguna kaydolun ve onboarding akisina baslayin.",
};

type RegisterPageProps = {
  searchParams: Promise<{ next?: string | string[] | undefined }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
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
    <AuthFormShell
      eyebrow="Topluluga Katil"
      heading="Yeni hesap olusturun"
      description="Ad soyad, e-posta ve sifre ile kaydolun. Hesabiniz acildiginda onboarding adimina yonlendirileceksiniz."
    >
      <Suspense fallback={<AuthFormFallback />}>
        <RegisterForm />
      </Suspense>
    </AuthFormShell>
  );
}
