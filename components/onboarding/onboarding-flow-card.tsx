import type { ReactNode } from "react";

import { onboardingSteps } from "@/lib/data/onboarding.data";
import type { OnboardingStep } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";

type OnboardingFlowCardProps = {
  activeStep: OnboardingStep;
  children: ReactNode;
};

const stepOrder: OnboardingStep[] = ["profile", "details", "project"];

export function OnboardingFlowCard({
  activeStep,
  children,
}: OnboardingFlowCardProps) {
  const activeIndex = stepOrder.indexOf(activeStep);

  return (
    <section className="w-full rounded-md border border-white/16 bg-black/42 px-7 py-8 shadow-[0_28px_80px_rgb(0_0_0_/_0.42)] backdrop-blur-md sm:px-8">
      <ol className="mb-9 grid grid-cols-3 gap-0">
        {onboardingSteps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isComplete = index < activeIndex;

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex flex-col items-center gap-3 text-center",
                index < onboardingSteps.length - 1 &&
                  "after:absolute after:left-1/2 after:top-4 after:h-px after:w-full after:bg-white/22",
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                  isActive
                    ? "border-white bg-white text-brand-black shadow-[0_0_0_3px_rgb(255_255_255_/_0.12)]"
                    : isComplete
                      ? "border-white/70 bg-white/16 text-white"
                      : "border-white/28 bg-black text-white/58",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "relative z-10 text-sm",
                  isActive ? "text-white" : "text-white/56",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
      {children}
    </section>
  );
}
