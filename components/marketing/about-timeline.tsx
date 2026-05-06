"use client";

import Link from "next/link";

import { Container } from "@/components/shared/container";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type MilestoneItem = {
  year: string;
  title: string;
  description: string;
};

type AboutTimelineProps = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  milestones: MilestoneItem[];
};

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M4.25 10h11.5" />
      <path d="m11.25 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function MilestoneIcon({ index }: { index: number }) {
  const icons = [
    // Flag
    <svg key="flag" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M5.75 4.75v14.5" />
      <path d="M5.75 4.75h10l-3 4.5 3 4.5h-10" />
    </svg>,
    // Rocket
    <svg key="rocket" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 15.75 15.75 8" />
      <path d="M9.75 8h6.25v6.25" />
      <path d="M5.75 19.25c1.75-.15 3.2-.65 4.25-1.5l-2.75-2.75c-.85 1.05-1.35 2.5-1.5 4.25Z" />
    </svg>,
    // Code
    <svg key="code" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="m8.75 8.25-4.5 3.75 4.5 3.75" />
      <path d="m15.25 8.25 4.5 3.75-4.5 3.75" />
    </svg>,
    // Sparkle
    <svg key="sparkle" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4.75 13.75 10 19.25 12 13.75 14 12 19.25 10.25 14 4.75 12 10.25 10 12 4.75Z" />
    </svg>,
  ];

  return icons[index % icons.length];
}

export function AboutTimeline({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  milestones,
}: AboutTimelineProps) {
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "about-timeline",
    {
      once: true,
      amount: 0.22,
      margin: "0px 0px -10% 0px",
    },
  );

  const hasAnimatedIn = hasEntered;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(70,44,125,0.14),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(131,28,145,0.08),transparent_24%)]" />

      <Container width="wide" className="relative">
        <div className="grid gap-12 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          {/* Left panel */}
          <div className="space-y-6">
            <p
              className={cn(
                "transform-gpu text-xs font-semibold uppercase tracking-[0.26em] text-ink-200 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
            >
              {eyebrow}
            </p>
            <h2
              className={cn(
                "transform-gpu text-3xl font-semibold tracking-tight text-brand-white transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "80ms" }}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "max-w-md transform-gpu text-sm leading-7 text-ink-300 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "160ms" }}
            >
              {description}
            </p>
            <Link
              href={ctaHref}
              className={cn(
                "inline-flex transform-gpu items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-400 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-300",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "240ms" }}
            >
              {ctaLabel}
              <ArrowRightIcon />
            </Link>
          </div>

          {/* Right panel — Timeline */}
          <div className="relative">
            {/* Horizontal connecting line — desktop only */}
            <div
              className={cn(
                "pointer-events-none absolute left-0 right-0 top-[2.75rem] hidden h-px transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block",
                hasAnimatedIn
                  ? "scale-x-100 opacity-100"
                  : "origin-left scale-x-0 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "400ms" }}
              aria-hidden="true"
            >
              <div className="h-full w-full bg-gradient-to-r from-ink-700 via-ink-600 to-ink-700" />
            </div>

            {/* Vertical connecting line — mobile only */}
            <div
              className={cn(
                "pointer-events-none absolute bottom-0 left-[1.375rem] top-0 w-px transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
                hasAnimatedIn
                  ? "scale-y-100 opacity-100"
                  : "origin-top scale-y-0 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "400ms" }}
              aria-hidden="true"
            >
              <div className="h-full w-full bg-gradient-to-b from-ink-700 via-ink-600 to-ink-700" />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
              {milestones.map((milestone, index) => (
                <article
                  key={milestone.year}
                  className={cn(
                    "relative transform-gpu pl-12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform lg:pl-0",
                    hasAnimatedIn
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : "translate-x-6 opacity-0 lg:translate-x-0 lg:translate-y-6",
                  )}
                  style={{
                    transitionDelay: hasAnimatedIn
                      ? "0ms"
                      : `${480 + index * 160}ms`,
                  }}
                >
                  {/* Icon circle */}
                  <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 bg-ink-900 text-ink-400 transition-colors duration-500 hover:border-accent-400/40 hover:text-accent-300">
                      <MilestoneIcon index={index} />
                    </div>
                  </div>

                  {/* Dot on the line — desktop */}
                  <div className="mt-3 hidden lg:block" aria-hidden="true">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_14px_rgba(255,112,191,0.7)]" />
                  </div>

                  {/* Content */}
                  <div className="mt-0 space-y-2 lg:mt-4">
                    <p className="text-sm font-semibold text-accent-400">
                      {milestone.year}
                    </p>
                    <h3 className="text-lg font-semibold text-brand-white">
                      {milestone.title}
                    </h3>
                    <p className="max-w-[24ch] text-sm leading-6 text-ink-300">
                      {milestone.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
