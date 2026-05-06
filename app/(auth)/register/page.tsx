import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthFormFallback } from "@/components/auth/auth-form-fallback";
import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
import { RegisterForm } from "@/components/auth/register-form";
import { resolveAuthEntryRedirect } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your account and start the Ankara Build Club onboarding flow.",
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
    <section className="relative isolate overflow-hidden bg-brand-black text-white">
      <div className="absolute inset-0 -z-30">
        <Grainient
          color1="var(--color-accent-500)"
          color2="var(--color-secondary-500)"
          color3="var(--color-primary-950)"
          timeSpeed={0.22}
          colorBalance={-0.16}
          warpStrength={1.12}
          warpFrequency={4.9}
          warpSpeed={1.8}
          warpAmplitude={56}
          blendAngle={12}
          blendSoftness={0.05}
          rotationAmount={420}
          noiseScale={1.9}
          grainAmount={0.09}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.42}
          gamma={1}
          saturation={0.98}
          centerX={0}
          centerY={0.02}
          zoom={0.94}
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,rgba(20,12,35,0.72),rgba(0,0,0,0.92))]" />
      <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />
      <div className="absolute bottom-12 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative flex min-h-[calc(100vh-9rem)] items-center justify-center py-14 sm:py-18 lg:py-24">
        <section className="relative w-full max-w-xl">
          <div className="absolute inset-x-10 top-8 h-28 rounded-full bg-white/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(13,13,14,0.92),rgba(31,18,53,0.9))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <AuthFormShell
                eyebrow="Join The Community"
                heading="Create your account"
                description="Sign up with your full name, email, and password. Once your account is ready, you will continue to onboarding."
              >
                <Suspense fallback={<AuthFormFallback />}>
                  <RegisterForm />
                </Suspense>
              </AuthFormShell>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}
