import type { ReactNode } from "react";

import { LightRays } from "@/components/ui/light-rays";

type OnboardingLayoutShellProps = {
  children: ReactNode;
};

export function OnboardingLayoutShell({
  children,
}: OnboardingLayoutShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-5 py-10 text-brand-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] min-h-80 opacity-65">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff70bf"
          raysSpeed={0.65}
          lightSpread={0.74}
          rayLength={1.25}
          fadeDistance={0.84}
          saturation={0.82}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.035}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.08),rgb(0_0_0_/_0.78)_48%,rgb(0_0_0_/_1))]" />
      <div className="relative z-10 w-full max-w-[548px]">{children}</div>
    </main>
  );
}
