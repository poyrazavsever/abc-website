"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

type CollaborationPillIcon =
  | "cube"
  | "calendar"
  | "users"
  | "pin"
  | "spark"
  | "launch";

export type CollaborationPill = {
  label: string;
  icon: CollaborationPillIcon;
  accent?: "violet" | "pink";
  offsetClassName?: string;
};

type SponsorsCollaborationPanelProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  highlightPhrase?: string;
  email: string;
  ctaLabel: string;
  ctaHref: string;
  pills: CollaborationPill[];
};

type IconProps = {
  className?: string;
};

const introTransition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1] as const,
};

const contentTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

function CubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="m12 3.75 7 4.1v8.3l-7 4.1-7-4.1v-8.3l7-4.1Z" />
      <path d="m5 8.35 7 4.15 7-4.15" />
      <path d="M12 12.5v7.65" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <rect x="4.25" y="5.75" width="15.5" height="14" rx="3" />
      <path d="M8 3.75v4" />
      <path d="M16 3.75v4" />
      <path d="M4.25 10.5h15.5" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="M15.5 19.25v-1a3.75 3.75 0 0 0-3.75-3.75H8A3.75 3.75 0 0 0 4.25 18.25v1" />
      <circle cx="9.875" cy="8.75" r="3.25" />
      <path d="M19.75 19.25v-.75a3 3 0 0 0-2.5-2.95" />
      <path d="M15.75 5.9a3 3 0 0 1 0 5.7" />
    </svg>
  );
}

function PinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="M12 20.25s5.25-5 5.25-9.25a5.25 5.25 0 1 0-10.5 0c0 4.25 5.25 9.25 5.25 9.25Z" />
      <circle cx="12" cy="10.75" r="1.9" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="m12 3.75 1.45 4.3 4.3 1.45-4.3 1.45L12 15.25l-1.45-4.3-4.3-1.45 4.3-1.45L12 3.75Z" />
      <path d="m18.25 14.25.7 2.1 2.05.7-2.05.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" />
    </svg>
  );
}

function LaunchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="M8 15.75 15.75 8" />
      <path d="M9.75 8h6.25v6.25" />
      <path d="M5.75 19.25c1.75-.15 3.2-.65 4.25-1.5l-2.75-2.75c-.85 1.05-1.35 2.5-1.5 4.25Z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <rect x="3.75" y="5.5" width="16.5" height="13" rx="3" />
      <path d="m5.75 8 6.25 4.75L18.25 8" />
    </svg>
  );
}

function renderIcon(icon: CollaborationPillIcon) {
  switch (icon) {
    case "cube":
      return <CubeIcon />;
    case "calendar":
      return <CalendarIcon />;
    case "users":
      return <UsersIcon />;
    case "pin":
      return <PinIcon />;
    case "spark":
      return <SparkIcon />;
    case "launch":
      return <LaunchIcon />;
    default:
      return null;
  }
}

function OrbitField({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute left-[2%] top-[2%] h-[78%] w-[92%] rounded-full border border-white/8"
        animate={reduceMotion ? undefined : { rotate: [0, 3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] top-[16%] h-[56%] w-[78%] rounded-full border border-primary-300/12"
        animate={reduceMotion ? undefined : { rotate: [0, -4, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[18%] top-[26%] h-[40%] w-[62%] rounded-full border border-secondary-300/12"
        animate={reduceMotion ? undefined : { rotate: [0, 5, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {[
        "left-[18%] top-[15%]",
        "left-[74%] top-[24%]",
        "left-[28%] top-[67%]",
        "left-[86%] top-[76%]",
      ].map((position, index) => (
        <motion.span
          key={position}
          className={cn(
            "absolute h-2.5 w-2.5 rounded-full bg-primary-200 shadow-[0_0_18px_rgba(162,91,255,0.7)]",
            position,
          )}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.3, 1, 0.4],
                  scale: [0.9, 1.2, 0.95],
                }
          }
          transition={{
            duration: 3.8 + index * 0.45,
            delay: index * 0.22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function SponsorsCollaborationPanel({
  eyebrow = "İş birliği alanları",
  heading,
  description,
  highlightPhrase,
  email,
  ctaLabel,
  ctaHref,
  pills,
}: SponsorsCollaborationPanelProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { ref: sectionRef, hasEntered } = useOnceInView(
    "sponsors-collaboration-panel",
    {
      once: true,
      amount: 0.3,
      margin: "0px 0px -10% 0px",
    },
  );
  const isVisible = reduceMotion || hasEntered;
  const hasHighlight = Boolean(highlightPhrase && heading.includes(highlightPhrase));
  const [beforeHighlight, afterHighlight] = hasHighlight
    ? heading.split(highlightPhrase as string)
    : [heading, ""];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-24 sm:py-28 lg:py-32"
    >
      <motion.div
        className="absolute left-1/2 top-1/2 z-0 h-[22rem] w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-900/20 blur-[120px]"
        animate={
          reduceMotion
            ? { opacity: 0.72, scale: 1 }
            : {
                opacity: [0.42, 0.78, 0.52],
                scale: [0.95, 1.04, 0.98],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container width="wide" className="relative z-10">
        <motion.article
          initial={false}
          animate={
            isVisible
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.95, y: 24 }
          }
          transition={introTransition}
          className="relative overflow-hidden rounded-[2rem] border border-ink-800 bg-ink-900/40 p-8 backdrop-blur-2xl sm:p-10 lg:p-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(162,91,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(255,112,191,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-primary-200/45 to-transparent" />

          <div className="relative flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-16">
            <motion.div
              initial={false}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -28 }
              }
              transition={{ ...contentTransition, delay: 0.16 }}
              className="relative flex min-h-[22rem] flex-1 items-center overflow-hidden rounded-[1.75rem] border border-white/6 bg-black/12 px-5 py-8 sm:px-7 lg:px-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(162,91,255,0.16),transparent_24%),radial-gradient(circle_at_72%_68%,rgba(255,112,191,0.12),transparent_22%)]" />
              <OrbitField reduceMotion={reduceMotion} />

              <div className="relative flex max-w-[34rem] flex-wrap items-center gap-4">
                {pills.map((pill, index) => (
                  <motion.div
                    key={pill.label}
                    initial={false}
                    animate={
                      isVisible
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -24 }
                    }
                    transition={{
                      ...contentTransition,
                      delay: 0.28 + index * 0.08,
                    }}
                    className={cn("will-change-transform", pill.offsetClassName)}
                  >
                    <motion.div
                      animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4 + index * 0.35,
                        delay: index * 0.18,
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "group relative inline-flex items-center gap-3 rounded-full border border-ink-700 bg-ink-950/50 px-6 py-3 text-sm tracking-wide text-ink-200 shadow-[0_18px_36px_rgba(6,8,16,0.28)] backdrop-blur-xl",
                        pill.accent === "pink"
                          ? "before:bg-[radial-gradient(circle_at_top_left,rgba(255,112,191,0.28),transparent_62%)]"
                          : "before:bg-[radial-gradient(circle_at_top_left,rgba(162,91,255,0.28),transparent_62%)]",
                        "before:absolute before:inset-0 before:rounded-full before:opacity-100 before:content-['']",
                      )}
                    >
                      <span
                        className={cn(
                          "relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 text-primary-100",
                          pill.accent === "pink" && "text-accent-300",
                        )}
                        aria-hidden="true"
                      >
                        {renderIcon(pill.icon)}
                      </span>
                      <span className="relative">{pill.label}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              transition={{ ...contentTransition, delay: 0.28 }}
              className="flex flex-1 flex-col justify-center"
            >
              <div className="max-w-xl">
                <p className="text-[0.72rem] font-semibold tracking-[0.38em] text-primary-200/80">
                  {eyebrow}
                </p>

                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-brand-white sm:text-5xl">
                  {hasHighlight && highlightPhrase ? (
                    <>
                      {beforeHighlight}
                      <SecondaryWordmark className="px-[0.02em] text-[1.02em]">
                        {highlightPhrase}
                      </SecondaryWordmark>
                      {afterHighlight}
                    </>
                  ) : (
                    heading
                  )}
                </h2>

                <p className="mt-6 text-lg leading-8 text-ink-300">
                  {description}
                </p>

                <div className="mt-10 w-full max-w-md">
                  <div className="relative">
                    <div className="flex min-h-16 items-center gap-3 rounded-full border border-ink-700 bg-ink-950/80 py-4 pl-6 pr-40 text-brand-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none">
                      <MailIcon className="shrink-0 text-ink-500" />
                      <span className="truncate text-sm text-ink-300 sm:text-base">
                        {email}
                      </span>
                    </div>

                    <Button
                      href={ctaHref}
                      aria-label={`${ctaLabel} - ${email}`}
                      variant="ghost"
                      size="md"
                      leadingIcon={<MailIcon className="h-4 w-4" />}
                      className="absolute right-2 top-2 min-h-12 border-transparent bg-brand-white px-6 py-2.5 font-medium text-brand-black shadow-none hover:bg-ink-100 hover:shadow-none"
                    >
                      <span>{ctaLabel}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
