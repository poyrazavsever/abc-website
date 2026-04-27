import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Giris Yap",
  description:
    "Ankara Build Club hesabinizla giris yapin ve platform alanina erisin.",
};

export default function LoginPage() {
  return (
    <AuthFormShell
      eyebrow="Auth"
      heading="Hesabiniza giris yapin"
      description="Builder profilinize, eslesme akisina ve topluluk araclarina erismek icin oturum acin."
    >
      <Suspense fallback={<AuthFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthFormShell>
  );
}
