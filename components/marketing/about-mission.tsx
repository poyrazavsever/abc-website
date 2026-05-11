"use client";

import Image from "next/image";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type AboutMissionProps = {
  eyebrow: string;
  heading: string;
  accentPhrase: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
};

export function AboutMission({
  eyebrow,
  heading,
  accentPhrase,
  description,
  imageSrc,
  imageAlt,
  stats,
}: AboutMissionProps) {
  const { ref: sectionRef, hasEntered } = useOnceInView("about-mission", {
    once: true,
    amount: 0.24,
    margin: "0px 0px -12% 0px",
  });

  const hasAccent = heading.includes(accentPhrase);
  const [beforeAccent, afterAccent] = hasAccent
    ? heading.split(accentPhrase)
    : [heading, ""];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(70,44,125,0.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(131,28,145,0.08),transparent_26%)]" />

      <Container width="wide" className="relative">
        <div className="grid items-center gap-12 p-4 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div
            className={cn(
              "relative transform-gpu overflow-hidden rounded-2xl transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              hasEntered
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0",
            )}
          >
            <div className="absolute inset-0 rounded-2xl border border-white/10" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={720}
              height={480}
              className="aspect-[3/2] w-full object-cover"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink-950/30 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p
              className={cn(
                "transform-gpu text-xs font-semibold tracking-[0.26em] text-ink-200 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "200ms" }}
            >
              {eyebrow}
            </p>

            <h2
              className={cn(
                "transform-gpu text-3xl font-semibold tracking-tight text-brand-white transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-4xl",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "300ms" }}
            >
              {hasAccent ? (
                <>
                  {beforeAccent}
                  <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                    {accentPhrase}
                  </SecondaryWordmark>
                  {afterAccent}
                </>
              ) : (
                heading
              )}
            </h2>

            <p
              className={cn(
                "max-w-lg transform-gpu text-sm leading-7 text-ink-300 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "400ms" }}
            >
              {description}
            </p>

            {/* Stats row */}
            <div
              className={cn(
                "grid transform-gpu grid-cols-3 gap-6 border-t border-white/10 pt-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "520ms" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl font-bold text-accent-400 sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-ink-300 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
