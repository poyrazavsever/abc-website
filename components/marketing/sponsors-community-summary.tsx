"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/shared/container";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type CommunityStat = {
  value: number;
  label: string;
  detail: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

type SponsorsCommunitySummaryProps = {
  eyebrow: string;
  heading: string;
  description: string;
  proofTitles: string[];
  stats: CommunityStat[];
};

type IconProps = {
  className?: string;
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 28,
  },
  show: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.74,
      delay: 0.16 + index * 0.14,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const statCardClasses = [
  "md:col-span-1 md:row-span-1 min-h-[15rem]",
  "md:col-span-1 md:row-span-1 min-h-[15rem]",
  "md:col-span-1 md:row-span-1 min-h-[15rem]",
  "md:col-span-2 md:row-span-1 min-h-[16rem]",
] as const;

function UsersClusterIcon({ className }: IconProps) {
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

function PulseGridIcon({ className }: IconProps) {
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
      <path d="M4.75 6.75h14.5" />
      <path d="M4.75 12h6l1.75-3.25 2.5 6 1.75-2.75h2.5" />
      <path d="M4.75 17.25h14.5" />
    </svg>
  );
}

function GlobeOrbitIcon({ className }: IconProps) {
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
      <circle cx="12" cy="12" r="7.25" />
      <path d="M4.75 12h14.5" />
      <path d="M12 4.75c2.15 2.1 3.3 4.53 3.3 7.25 0 2.72-1.15 5.15-3.3 7.25-2.15-2.1-3.3-4.53-3.3-7.25 0-2.72 1.15-5.15 3.3-7.25Z" />
    </svg>
  );
}

function LayerStackIcon({ className }: IconProps) {
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
      <path d="m12 4.75 7.25 4L12 12.75l-7.25-4L12 4.75Z" />
      <path d="m4.75 12.25 7.25 4 7.25-4" />
      <path d="m4.75 15.75 7.25 4 7.25-4" />
    </svg>
  );
}

function SparkArrowIcon({ className }: IconProps) {
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
      <path d="m6.25 16.75 4.5-4.5 3 3 4-5" />
      <path d="M14.75 10.25h3.5v3.5" />
    </svg>
  );
}

function MeshWavePattern() {
  return (
    <svg
      viewBox="0 0 640 320"
      className="absolute inset-x-0 bottom-0 h-[62%] w-full opacity-80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="community-mesh" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(131,28,145,0)" />
          <stop offset="38%" stopColor="rgba(131,28,145,0.36)" />
          <stop offset="72%" stopColor="rgba(255,112,191,0.52)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0 235C85 200 150 140 220 152s104 92 173 87 117-84 247-74"
        stroke="url(#community-mesh)"
        strokeWidth="2.4"
        fill="none"
      />
      <path
        d="M0 258c85-30 157-95 230-76 71 18 103 82 168 76 69-6 124-59 242-40"
        stroke="url(#community-mesh)"
        strokeWidth="1.6"
        fill="none"
        opacity="0.65"
      />
      {Array.from({ length: 18 }).map((_, index) => (
        <circle
          key={index}
          cx={180 + index * 18}
          cy={208 + Math.sin(index * 0.55) * 20}
          r="1.8"
          fill="rgba(255,146,206,0.72)"
        />
      ))}
    </svg>
  );
}

function DotFieldPattern() {
  return (
    <div
      className="absolute bottom-5 right-5 h-24 w-24 opacity-70"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,146,206,0.75) 1.1px, transparent 1.1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

function BarsPattern() {
  return (
    <div className="absolute inset-x-6 bottom-6 flex h-20 items-end justify-end gap-2 opacity-80" aria-hidden="true">
      {[28, 46, 36, 60, 42, 34, 48, 26].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-3 rounded-full bg-linear-to-t from-primary-500/40 via-accent-500/60 to-white/65"
          style={{ height }}
        />
      ))}
    </div>
  );
}

function OrbStackPattern() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-[42%] items-center justify-center overflow-hidden" aria-hidden="true">
      {[0, 24, 48, 72].map((offset, index) => (
        <span
          key={offset}
          className="absolute h-32 w-32 rounded-full border border-accent-300/18 bg-linear-to-br from-accent-400/28 to-primary-700/18 shadow-[0_0_60px_rgba(213,82,163,0.12)] backdrop-blur-sm"
          style={{
            transform: `translate(${index * 12}px, ${index * 10}px)`,
          }}
        />
      ))}
    </div>
  );
}

function formatMetric(
  value: number,
  {
    prefix = "",
    suffix = "",
    decimals = 0,
  }: Pick<CommunityStat, "prefix" | "suffix" | "decimals">,
) {
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formatter.format(value)}${suffix}`;
}

function CountUpValue({
  value,
  prefix,
  suffix,
  decimals,
  active,
}: Pick<CommunityStat, "value" | "prefix" | "suffix" | "decimals"> & {
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const finalValue = formatMetric(value, { prefix, suffix, decimals });
  const hasAnimatedRef = useRef(active);
  const [displayValue, setDisplayValue] = useState(() =>
    active ? finalValue : formatMetric(0, { prefix, suffix, decimals }),
  );

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduceMotion) {
      hasAnimatedRef.current = true;
      return;
    }

    if (hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;

    const controls = animate(0, value, {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded =
          decimals && decimals > 0
            ? Number(latest.toFixed(decimals))
            : Math.round(latest);

        setDisplayValue(formatMetric(rounded, { prefix, suffix, decimals }));
      },
    });

    return () => {
      controls.stop();
    };
  }, [active, decimals, prefix, reduceMotion, suffix, value]);

  if (reduceMotion && active) {
    return <span aria-label={finalValue}>{finalValue}</span>;
  }

  return <span aria-label={finalValue}>{displayValue}</span>;
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

export function SponsorsCommunitySummary({
  eyebrow,
  heading,
  description,
  proofTitles,
  stats,
}: SponsorsCommunitySummaryProps) {
  const { ref: sectionRef, hasEntered: inView } = useOnceInView(
    "sponsors-community-summary",
    {
      once: true,
      amount: 0.38,
      margin: "0px 0px -14% 0px",
    },
  );

  const proofIcons = [
    <UsersClusterIcon key="users" />,
    <PulseGridIcon key="pulse" />,
    <GlobeOrbitIcon key="globe" />,
    <LayerStackIcon key="layers" />,
  ];

  const statDecor = [
    {
      icon: <UsersClusterIcon />,
      pattern: <div className="absolute -right-10 -top-4 h-28 w-28 rounded-full bg-accent-500/12 blur-3xl" aria-hidden="true" />,
    },
    {
      icon: <GlobeOrbitIcon />,
      pattern: <DotFieldPattern />,
    },
    {
      icon: <PulseGridIcon />,
      pattern: <BarsPattern />,
    },
    {
      icon: <LayerStackIcon />,
      pattern: <OrbStackPattern />,
    },
  ] as const;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950 py-14 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.18),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(255,112,191,0.12),transparent_24%)]" />

      <Container width="wide" className="relative">
        <div className="grid gap-4 p-4 md:grid-cols-3">
          <motion.article
            custom={0}
            initial={inView ? false : "hidden"}
            animate={inView ? "show" : "hidden"}
            variants={cardVariants}
            className="relative overflow-hidden rounded-[2rem] border border-ink-800 bg-ink-900/50 p-7 backdrop-blur-lg md:col-span-2 md:row-span-2 md:min-h-[26rem] lg:p-9"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.05] via-transparent to-primary-950/70" />
            <div className="absolute inset-y-0 right-0 w-[48%] bg-linear-to-l from-primary-950/20 to-transparent" />
            <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-secondary-500/12 blur-3xl" />
            <MeshWavePattern />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_14px_rgba(255,146,206,0.8)]" />
                  <p className="text-xs font-semibold tracking-[0.26em] text-ink-200">
                    {eyebrow}
                  </p>
                </div>

                <div className="max-w-xl space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                    {heading}
                  </h2>
                  <p className="max-w-lg text-sm leading-7 text-ink-300 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {proofTitles.map((title, index) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
                  >
                    <GlassIconBadge className="h-10 w-10 rounded-xl">
                      {proofIcons[index] ?? <SparkArrowIcon />}
                    </GlassIconBadge>
                    <p className="text-sm font-medium text-ink-100">{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          {stats.map((stat, index) => {
            const decor = statDecor[index];
            const isWide = index === stats.length - 1;

            return (
              <motion.article
                key={stat.label}
                custom={index + 1}
                initial={inView ? false : "hidden"}
                animate={inView ? "show" : "hidden"}
                variants={cardVariants}
                className={cn(
                  "relative overflow-hidden rounded-[2rem] border border-ink-800 bg-ink-900/50 p-6 backdrop-blur-lg lg:p-7",
                  statCardClasses[index] ?? "md:col-span-1",
                )}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/[0.04] via-transparent to-secondary-950/60" />
                {decor?.pattern}

                <div
                  className={cn(
                    "relative flex h-full flex-col justify-between gap-8",
                    isWide && "max-w-[58%]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <GlassIconBadge>{decor?.icon ?? <SparkArrowIcon />}</GlassIconBadge>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.22em] text-ink-300">
                      <SparkArrowIcon className="text-accent-300" />
                      Build
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-5xl font-bold text-accent-400 drop-shadow-[0_0_24px_rgba(255,112,191,0.22)]">
                      <CountUpValue
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        active={inView}
                      />
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm tracking-[0.28em] text-ink-300">
                        {stat.label}
                      </p>
                      <p className="max-w-[24ch] text-sm leading-6 text-ink-100/88">
                        {stat.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
