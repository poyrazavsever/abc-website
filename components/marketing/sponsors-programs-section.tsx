"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type SponsorProgramCard = {
  name: string;
  rhythm: string;
  outcome: string;
};

type SponsorsProgramsSectionProps = {
  heading: string;
  description: string;
  highlightPhrase?: string;
  items: SponsorProgramCard[];
};

type IconProps = {
  className?: string;
};

function FocusFrameIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5.25 8V5.25H8" />
      <path d="M16 5.25h2.75V8" />
      <path d="M18.75 16v2.75H16" />
      <path d="M8 18.75H5.25V16" />
      <rect x="7.5" y="7.5" width="9" height="9" rx="2.25" />
    </svg>
  );
}

function SprintBoltIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12.5 3.75 7.75 12h4.25L11.5 20.25 16.25 12H12l.5-8.25Z" />
      <path d="M3.5 11.5h2.75" />
      <path d="M17.75 7.75h2.75" />
    </svg>
  );
}

function ShipLaunchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M8 15.75 15.75 8" />
      <path d="M9.75 8h6.25v6.25" />
      <path d="M5.75 19.25c1.75-.15 3.2-.65 4.25-1.5l-2.75-2.75c-.85 1.05-1.35 2.5-1.5 4.25Z" />
    </svg>
  );
}

function CornerPattern({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute right-5 top-5 flex h-20 w-20 items-start justify-end overflow-hidden rounded-tr-[1.2rem] rounded-bl-[1rem] border-t border-r border-white/8 opacity-60 transition-all duration-500 group-hover:border-secondary-500/50 group-hover:opacity-100",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

function DotsPattern() {
  return (
    <div
      className="absolute bottom-6 right-6 h-16 w-16 opacity-45 transition-all duration-500 group-hover:opacity-80"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,146,206,0.8) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    />
  );
}

function SpeedPattern() {
  return (
    <motion.div
      className="absolute left-6 top-8 flex flex-col gap-2 opacity-35 transition-all duration-500 group-hover:opacity-75"
      aria-hidden="true"
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="h-px w-10 bg-secondary-400/65" />
      <span className="h-px w-6 bg-accent-400/65" />
      <span className="h-px w-14 bg-secondary-400/45" />
    </motion.div>
  );
}

function OrbitPattern() {
  return (
    <motion.div
      className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full border border-secondary-500/20 opacity-55 transition-all duration-500 group-hover:border-secondary-500/45 group-hover:opacity-90"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <span className="absolute left-3 top-3 h-20 w-20 rounded-full border border-accent-400/18" />
      <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_16px_rgba(255,146,206,0.7)]" />
    </motion.div>
  );
}

function IconTile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-ink-400 transition-all duration-500 group-hover:text-accent-400",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SponsorsProgramsSection({
  heading,
  description,
  highlightPhrase,
  items,
}: SponsorsProgramsSectionProps) {
  const reduceMotion = useReducedMotion();
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "sponsors-programs-section",
    {
      once: true,
      amount: 0.28,
      margin: "0px 0px -12% 0px",
    },
  );
  const hasHighlight = Boolean(highlightPhrase && heading.includes(highlightPhrase));
  const [beforeHighlight, afterHighlight] = hasHighlight
    ? heading.split(highlightPhrase as string)
    : [heading, ""];
  const hasAnimatedIn = reduceMotion || hasEntered;

  const decorations = [
    {
      icon: <FocusFrameIcon />,
      pattern: (
        <>
          <CornerPattern />
          <DotsPattern />
        </>
      ),
    },
    {
      icon: <SprintBoltIcon />,
      pattern: (
        <>
          <CornerPattern>
            <span className="mt-3 mr-3 h-2.5 w-2.5 rounded-full bg-secondary-400/70 shadow-[0_0_18px_rgba(131,28,145,0.55)]" />
          </CornerPattern>
          <SpeedPattern />
        </>
      ),
    },
    {
      icon: <ShipLaunchIcon />,
      pattern: (
        <>
          <CornerPattern className="w-24" />
          <OrbitPattern />
        </>
      ),
    },
  ] as const;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(131,28,145,0.12),transparent_24%),radial-gradient(circle_at_100%_60%,rgba(255,112,191,0.08),transparent_22%)]" />

      <Container width="wide" className="relative">
        <div className="space-y-10 p-4">
          <div className="max-w-2xl space-y-3">
            <h2
              className={cn(
                "transform-gpu text-3xl font-semibold tracking-tight text-brand-white transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:text-4xl",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm",
              )}
            >
              {hasHighlight && highlightPhrase ? (
                <>
                  {beforeHighlight}
                  <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                    {highlightPhrase}
                  </SecondaryWordmark>
                  {afterHighlight}
                </>
              ) : (
                heading
              )}
            </h2>
            <p
              className={cn(
                "transform-gpu text-sm leading-7 text-ink-300 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:text-base",
                hasAnimatedIn
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm",
              )}
              style={{
                transitionDelay: reduceMotion ? "0ms" : "140ms",
              }}
            >
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => {
            const decor = decorations[index];

            return (
              <article
                key={item.name}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 p-8 transition-all duration-500 hover:border-secondary-500 hover:shadow-[0_0_30px_rgba(131,28,145,0.15)]",
                  "transform-gpu will-change-transform transition-[opacity,transform,filter,border-color,box-shadow] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  hasAnimatedIn
                    ? "translate-x-0 opacity-100 blur-0"
                    : "-translate-x-12 opacity-0 blur-sm",
                )}
                style={{
                  transitionDuration: reduceMotion ? "0ms" : "760ms",
                  transitionDelay: reduceMotion ? "0ms" : `${320 + index * 180}ms`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(131,28,145,0.12),transparent_26%)] opacity-0 transition-all duration-500 group-hover:opacity-100" />
                {decor?.pattern}

                <div className="relative flex h-full min-h-[21rem] flex-col justify-between gap-10">
                  <div className="space-y-6">
                    <IconTile>{decor?.icon}</IconTile>

                    <div className="space-y-3">
                      <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-ink-400 transition-all duration-500 group-hover:text-ink-200">
                        {item.rhythm}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-brand-white">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-[28ch] text-base leading-8 text-ink-300">
                    {item.outcome}
                  </p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}
