"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DarkVeil } from "@/components/marketing/dark-veil";
import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { LinkButton } from "@/components/ui";

type AboutHeroProps = {
  eyebrow: string;
  title: string;
  accentPhrase: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const easing = [0.16, 1, 0.3, 1] as const;

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-[0.95rem] w-[0.95rem]"
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

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-[0.95rem] w-[0.95rem]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M7 10.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M13.5 9.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
      <path d="M3.25 16.5a4.75 4.75 0 0 1 7.5-3.86" />
      <path d="M12 16.5a3.75 3.75 0 0 1 5.5-3.31" />
    </svg>
  );
}

export function AboutHero({
  eyebrow,
  title,
  accentPhrase,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: AboutHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const hasAccent = title.includes(accentPhrase);
  const [beforeAccent, afterAccent] = hasAccent
    ? title.split(accentPhrase)
    : [title, ""];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : 0.14,
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.8,
        ease: easing,
      },
    },
  };

  return (
    <section className="relative isolate h-screen overflow-hidden bg-brand-black text-brand-white">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Grainient
          color1="var(--color-primary-700)"
          color2="var(--color-secondary-800)"
          color3="var(--color-brand-black)"
          timeSpeed={0.12}
          colorBalance={-0.1}
          warpStrength={0.85}
          warpFrequency={3.6}
          warpSpeed={1.0}
          warpAmplitude={44}
          blendAngle={18}
          blendSoftness={0.14}
          rotationAmount={200}
          noiseScale={1.5}
          grainAmount={0.04}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.18}
          gamma={1}
          saturation={0.72}
          centerX={-0.02}
          centerY={0.04}
          zoom={0.94}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-85 mix-blend-screen">
        <DarkVeil
          hueShift={-18}
          noiseIntensity={0.04}
          scanlineIntensity={0.06}
          speed={0.22}
          scanlineFrequency={0.6}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-brand-black/40 via-brand-black/55 to-brand-black/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48 bg-linear-to-t from-brand-black via-brand-black/70 to-transparent" />

      <Container className="relative z-10 flex h-screen flex-col items-center justify-center overflow-hidden text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex max-w-5xl flex-col items-center justify-center"
        >
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-ink-200 backdrop-blur-md"
          >
            <SparkIcon />
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-3xl text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl lg:text-6xl"
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
              title
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-sm leading-8 text-ink-200 md:text-base"
          >
            {description}
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.div variants={itemVariants}>
              <LinkButton
                href={primaryCtaHref}
                size="lg"
                trailingIcon={null}
                className="h-auto px-8 py-3 text-base text-brand-white shadow-[0_18px_48px_rgba(93,56,255,0.34)] hover:shadow-[0_24px_56px_rgba(93,56,255,0.42)]"
              >
                {primaryCtaLabel}
              </LinkButton>
            </motion.div>

            <motion.div variants={itemVariants}>
              <LinkButton
                href={secondaryCtaHref}
                size="lg"
                variant="ghost"
                trailingIcon={null}
                className="h-auto border-white/14 bg-white/[0.08] px-8 py-3 text-base text-brand-white hover:bg-white/[0.12]"
              >
                {secondaryCtaLabel}
              </LinkButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
