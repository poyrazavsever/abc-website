"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type Stage = {
  step: string;
  title: string;
  subtitle: string;
};

type SponsorsPipelineSectionProps = {
  eyebrow: string;
  heading: string;
  description: string;
  stages: Stage[];
};

type IconProps = {
  className?: string;
};

function BuilderIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.25" />
      <path d="M6.75 19.25a5.25 5.25 0 0 1 10.5 0" />
    </svg>
  );
}

function ExploreIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7.25" />
      <path d="m14.5 9.5-3.8 1.7-1.7 3.8 3.8-1.7 1.7-3.8Z" />
    </svg>
  );
}

function PrototypeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="m12 3.75 1.45 4.3 4.3 1.45-4.3 1.45L12 15.25l-1.45-4.3-4.3-1.45 4.3-1.45L12 3.75Z" />
      <path d="m18.25 14.25.7 2.1 2.05.7-2.05.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" />
    </svg>
  );
}

function InsightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 3.75v1.5" />
      <path d="M18.36 5.64l-1.06 1.06" />
      <path d="M20.25 12h-1.5" />
      <path d="M18.36 18.36l-1.06-1.06" />
      <path d="M12 18.75v1.5" />
      <path d="M5.64 18.36l1.06-1.06" />
      <path d="M3.75 12h1.5" />
      <path d="M5.64 5.64l1.06 1.06" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function StartupIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M8 15.75 15.75 8" />
      <path d="M9.75 8h6.25v6.25" />
      <path d="M5.75 19.25c1.75-.15 3.2-.65 4.25-1.5l-2.75-2.75c-.85 1.05-1.35 2.5-1.5 4.25Z" />
    </svg>
  );
}

const stageIcons: ((props: IconProps) => ReactNode)[] = [
  BuilderIcon,
  ExploreIcon,
  PrototypeIcon,
  InsightIcon,
  StartupIcon,
];

const stageAccents = [
  { ring: "border-violet-500/40", glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]", text: "text-violet-400", bg: "bg-violet-500/10" },
  { ring: "border-primary-400/40", glow: "shadow-[0_0_20px_rgba(70,44,125,0.3)]", text: "text-primary-300", bg: "bg-primary-500/10" },
  { ring: "border-secondary-400/40", glow: "shadow-[0_0_20px_rgba(131,28,145,0.3)]", text: "text-secondary-300", bg: "bg-secondary-500/10" },
  { ring: "border-accent-400/40", glow: "shadow-[0_0_20px_rgba(255,112,191,0.3)]", text: "text-accent-400", bg: "bg-accent-500/10" },
  { ring: "border-highlight-400/40", glow: "shadow-[0_0_20px_rgba(213,82,163,0.3)]", text: "text-highlight-400", bg: "bg-highlight-500/10" },
];

function GlassIconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SponsorsPipelineSection({
  eyebrow,
  heading,
  description,
  stages,
}: SponsorsPipelineSectionProps) {
  const reduceMotion = useReducedMotion();
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "sponsors-pipeline-section",
    {
      once: true,
      amount: 0.24,
      margin: "0px 0px -12% 0px",
    },
  );
  const hasAnimatedIn = reduceMotion || hasEntered;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-20 sm:py-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(131,28,145,0.14),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(70,44,125,0.12),transparent_26%)]" />

      <Container width="wide" className="relative">
        <div className="space-y-14 p-4">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div
              className={cn(
                "transform-gpu transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm",
              )}
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.8)]" />
                <p className="text-xs font-semibold tracking-[0.26em] text-ink-200">
                  {eyebrow}
                </p>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
                {heading}
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-300 sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="mx-auto max-w-5xl">
            {/* Connecting line */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-accent-500/30 to-highlight-500/20 md:hidden" />
              <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-violet-500/40 via-accent-500/30 to-highlight-500/20" />

              <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
                {stages.map((stage, i) => {
                  const accent = stageAccents[i] ?? stageAccents[0];
                  const IconComponent = stageIcons[i] ?? BuilderIcon;

                  return (
                    <div
                      key={stage.step}
                      className={cn(
                        "group relative transform-gpu will-change-transform transition-[opacity,transform,filter] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        hasAnimatedIn
                          ? "translate-y-0 opacity-100 blur-0"
                          : "translate-y-12 opacity-0 blur-sm",
                      )}
                      style={{
                        transitionDuration: reduceMotion ? "0ms" : "760ms",
                        transitionDelay: reduceMotion ? "0ms" : `${300 + i * 140}ms`,
                      }}
                    >
                      {/* Card */}
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 p-6 backdrop-blur-lg transition-all duration-500",
                          "hover:border-white/15 hover:shadow-[0_0_30px_rgba(131,28,145,0.12)]",
                        )}
                      >
                        {/* Subtle inner gradient */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Stage number badge */}
                        <div className="relative flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <GlassIconBadge className={cn(accent.ring, accent.glow)}>
                              <IconComponent className={accent.text} />
                            </GlassIconBadge>
                            <span className={cn("text-[0.65rem] font-bold tracking-[0.3em] uppercase", accent.text)}>
                              {stage.step}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold tracking-tight text-brand-white">
                              {stage.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-ink-300">
                              {stage.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={cn(
                          "absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          "bg-gradient-to-r from-transparent via-accent-400/50 to-transparent",
                        )} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
