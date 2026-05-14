"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { useOnceInView } from "@/components/marketing/use-once-in-view";
import { cn } from "@/lib/utils/cn";

type AboutCommunityProps = {
  eyebrow: string;
  heading: string;
  accentPhrase: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: { title: string; description: string; featured?: boolean }[];
  ctaLabel: string;
  ctaHref: string;
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

export function AboutCommunity({
  eyebrow,
  heading,
  accentPhrase,
  description,
  imageSrc,
  imageAlt,
  features,
  ctaLabel,
  ctaHref,
}: AboutCommunityProps) {
  const { ref: sectionRef, hasEntered } = useOnceInView("about-community", {
    once: true,
    amount: 0.22,
    margin: "0px 0px -10% 0px",
  });

  const hasAccent = heading.includes(accentPhrase);
  const [beforeAccent, afterAccent] = hasAccent
    ? heading.split(accentPhrase)
    : [heading, ""];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(131,28,145,0.12),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(70,44,125,0.1),transparent_24%)]" />

      <Container width="wide" className="relative">
        <div className="grid items-center gap-12 p-4 lg:grid-cols-2 lg:gap-16">
          {/* Content — left on desktop */}
          <div className="order-2 space-y-6 lg:order-1">
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

            {/* Feature list */}
            <div
              className={cn(
                "transform-gpu space-y-4 border-t border-white/10 pt-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "520ms" }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    "flex items-start gap-3 transform-gpu transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    hasEntered
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0",
                  )}
                  style={{
                    transitionDelay: hasEntered
                      ? "0ms"
                      : `${600 + index * 100}ms`,
                  }}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      feature.featured
                        ? "bg-accent-400 shadow-[0_0_10px_rgba(255,112,191,0.6)]"
                        : "bg-white/30",
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        feature.featured ? "text-brand-white" : "text-white/70",
                      )}
                    >
                      {feature.title}
                    </p>
                    <p
                      className={cn(
                        "text-sm leading-6",
                        feature.featured ? "text-ink-300" : "text-white/55",
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={ctaHref}
              className={cn(
                "inline-flex transform-gpu items-center gap-2 text-sm font-semibold tracking-[0.14em] text-accent-400 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-300",
                hasEntered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: hasEntered ? "0ms" : "800ms" }}
            >
              {ctaLabel}
              <ArrowRightIcon />
            </Link>
          </div>

          {/* Image — right on desktop */}
          <div
            className={cn(
              "relative order-1 transform-gpu overflow-hidden rounded-2xl transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:order-2",
              hasEntered
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0",
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
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-black/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-brand-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
