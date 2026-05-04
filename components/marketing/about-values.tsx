"use client";

import type { ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type ValueItem = {
  title: string;
  description: string;
};

type AboutValuesProps = {
  eyebrow: string;
  heading: string;
  description: string;
  values: ValueItem[];
};

type IconProps = {
  className?: string;
};

function BoltIcon({ className }: IconProps) {
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
      <path d="M12.5 3.75 7.75 12h4.25L11.5 20.25 16.25 12H12l.5-8.25Z" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
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
      <path d="M8.5 12.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M15.75 10.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
      <path d="M4.75 18.5a4.75 4.75 0 0 1 7.5-3.86" />
      <path d="M13.75 18.5a3.75 3.75 0 0 1 5.5-3.31" />
    </svg>
  );
}

function EyeIcon({ className }: IconProps) {
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
      <path d="M12 5.25C7 5.25 2.75 12 2.75 12S7 18.75 12 18.75 21.25 12 21.25 12 17 5.25 12 5.25Z" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

function RefreshIcon({ className }: IconProps) {
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
      <path d="M4.75 12a7.25 7.25 0 0 1 12.45-5.05" />
      <path d="M19.25 12a7.25 7.25 0 0 1-12.45 5.05" />
      <path d="M17.25 3.75v3.5h-3.5" />
      <path d="M6.75 20.25v-3.5h3.5" />
    </svg>
  );
}

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
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}

const valueIcons = [
  <BoltIcon key="bolt" />,
  <UsersIcon key="users" />,
  <EyeIcon key="eye" />,
  <RefreshIcon key="refresh" />,
];

export function AboutValues({
  eyebrow,
  heading,
  description,
  values,
}: AboutValuesProps) {
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "about-values",
    {
      once: true,
      amount: 0.28,
      margin: "0px 0px -12% 0px",
    },
  );

  const hasAnimatedIn = hasEntered;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.14),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(255,112,191,0.08),transparent_24%)]" />

      <Container width="wide" className="relative">
        <div className="space-y-12 p-4">
          {/* Header */}
          <div className="mx-auto max-w-2xl space-y-4 text-center">
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
                "transform-gpu text-3xl font-semibold tracking-tight text-brand-white transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl lg:text-5xl",
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
                "mx-auto max-w-lg transform-gpu text-sm leading-7 text-ink-300 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasAnimatedIn ? "0ms" : "160ms" }}
            >
              {description}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 p-7 backdrop-blur-lg transition-all duration-500 hover:border-secondary-500/40 hover:shadow-[0_0_30px_rgba(131,28,145,0.12)]",
                  "transform-gpu will-change-transform transition-[opacity,transform,border-color,box-shadow] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  hasAnimatedIn
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
                style={{
                  transitionDuration: "760ms",
                  transitionDelay: hasAnimatedIn
                    ? "0ms"
                    : `${280 + index * 140}ms`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/[0.03] via-transparent to-secondary-950/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex min-h-[14rem] flex-col justify-between gap-6">
                  <GlassIconBadge>
                    {valueIcons[index] ?? <BoltIcon />}
                  </GlassIconBadge>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-brand-white">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-6 text-ink-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
