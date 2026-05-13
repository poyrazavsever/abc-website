"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type SponsorsRoadmapSectionProps = {
  eyebrow: string;
  heading: string;
  description: string;
  events: string[];
  future: string[];
};

type IconProps = {
  className?: string;
};

function RoadmapArrowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4.75 12h14.5" />
      <path d="m13.75 5.75 5.5 6.25-5.5 6.25" />
    </svg>
  );
}

function SparkleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m12 3.75 1.45 4.3 4.3 1.45-4.3 1.45L12 15.25l-1.45-4.3-4.3-1.45 4.3-1.45L12 3.75Z" />
    </svg>
  );
}

function PivotBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
      <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-accent-300">
        Pivot Point
      </span>
    </div>
  );
}

function GlassEventCard({
  event,
  index,
  isLast,
  hasAnimatedIn,
  reduceMotion,
}: {
  event: string;
  index: number;
  isLast: boolean;
  hasAnimatedIn: boolean;
  reduceMotion: boolean;
}) {
  const isPivot = event.includes("GTM") || event.includes("VC");

  return (
    <div
      className={cn(
        "group relative transform-gpu will-change-transform transition-[opacity,transform,filter] ease-[cubic-bezier(0.22,1,0.36,1)]",
        hasAnimatedIn
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-10 opacity-0 blur-sm",
      )}
      style={{
        transitionDuration: reduceMotion ? "0ms" : "700ms",
        transitionDelay: reduceMotion ? "0ms" : `${320 + index * 120}ms`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-ink-900/50 px-6 py-5 backdrop-blur-lg transition-all duration-500",
            isPivot
              ? "border-accent-500/30 hover:border-accent-400/50 hover:shadow-[0_0_40px_rgba(255,112,191,0.15)]"
              : "border-ink-800 hover:border-white/15 hover:shadow-[0_0_30px_rgba(131,28,145,0.12)]",
          )}
        >
          {/* Inner gradient on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            isPivot
              ? "bg-[radial-gradient(circle_at_center,rgba(255,112,191,0.08),transparent_70%)]"
              : "bg-linear-to-br from-white/[0.03] via-transparent to-transparent",
          )} />

          <div className="relative flex items-center gap-3">
            {/* Step indicator */}
            <span className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold",
              isPivot
                ? "border-accent-500/30 bg-accent-500/10 text-accent-400"
                : "border-white/10 bg-white/[0.04] text-ink-300",
            )}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className={cn(
              "text-sm font-semibold tracking-tight sm:text-base",
              isPivot ? "text-accent-300" : "text-brand-white",
            )}>
              {event}
            </span>

            {isPivot && (
              <SparkleIcon className="text-accent-400 ml-1" />
            )}
          </div>
        </div>

        {/* Arrow connector */}
        {!isLast && (
          <span className="hidden md:block text-white/15">
            <RoadmapArrowIcon />
          </span>
        )}
      </div>
    </div>
  );
}

export function SponsorsRoadmapSection({
  eyebrow,
  heading,
  description,
  events,
  future,
}: SponsorsRoadmapSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "sponsors-roadmap-section",
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
      className="relative overflow-hidden bg-ink-950 py-20 sm:py-28"
    >
      {/* Ambient radial gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(131,28,145,0.16),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,112,191,0.1),transparent_24%)]" />

      {/* Decorative orbit */}
      <motion.div
        className="pointer-events-none absolute right-[5%] top-[10%] h-64 w-64 rounded-full border border-white/[0.04]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-secondary-400/40" />
      </motion.div>

      <Container width="wide" className="relative">
        <div className="space-y-16 p-4">
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
                <span className="h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_14px_rgba(255,146,206,0.8)]" />
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

          {/* Events Sequence */}
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-3">
              {events.map((event, idx) => (
                <GlassEventCard
                  key={idx}
                  event={event}
                  index={idx}
                  isLast={idx === events.length - 1}
                  hasAnimatedIn={hasAnimatedIn}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          {/* Future Milestones */}
          <div className="mx-auto max-w-4xl">
            <div
              className={cn(
                "relative transform-gpu transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm",
              )}
              style={{
                transitionDelay: reduceMotion ? "0ms" : "800ms",
              }}
            >
              {/* Divider with label */}
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/8 bg-ink-950 px-5 py-2 text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-ink-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-highlight-400/60" />
                  After PoC Validated
                </span>
              </div>

              {/* Future items */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {future.map((item, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group rounded-xl border border-white/6 bg-white/[0.02] px-5 py-3 text-sm font-medium text-ink-200 backdrop-blur-sm transition-all duration-400",
                      "hover:border-white/12 hover:bg-white/[0.04] hover:text-brand-white",
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
