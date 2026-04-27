import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Kayit Ol",
  description:
    "Ankara Build Club topluluguna kaydolun ve onboarding akisina baslayin.",
};

export default function RegisterPage() {
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
