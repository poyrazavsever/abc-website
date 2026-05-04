"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DarkVeil } from "@/components/marketing/dark-veil";
import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { LinkButton } from "@/components/ui";

type SponsorsHeroProps = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  primaryHref: string;
  secondaryHref: string;
};

const easing = [0.16, 1, 0.3, 1] as const;
const accentPhrases = ["İş Birlikleri"] as const;

function MailPlusIcon() {
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
      <path d="M3.5 5.5h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
      <path d="m3 6 5.8 4.5a2 2 0 0 0 2.4 0L17 6" />
      <path d="M15.75 4v3.5" />
      <path d="M14 5.75h3.5" />
    </svg>
  );
}

function CalendarGridIcon() {
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
      <path d="M4 4.75h12a1.75 1.75 0 0 1 1.75 1.75v8.75A1.75 1.75 0 0 1 16 17H4A1.75 1.75 0 0 1 2.25 15.25V6.5A1.75 1.75 0 0 1 4 4.75Z" />
      <path d="M6.25 3v3.5" />
      <path d="M13.75 3v3.5" />
      <path d="M2.5 8.25h15" />
      <path d="M6.5 11.25h.01" />
      <path d="M10 11.25h.01" />
      <path d="M13.5 11.25h.01" />
      <path d="M6.5 14.25h.01" />
      <path d="M10 14.25h.01" />
      <path d="M13.5 14.25h.01" />
    </svg>
  );
}

export function SponsorsHero({
  hero,
  primaryHref,
  secondaryHref,
}: SponsorsHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const accentPhrase =
    accentPhrases.find((phrase) => hero.title.includes(phrase)) ?? accentPhrases[0];
  const [beforeAccent, afterAccent] = hero.title.split(accentPhrase);
  const hasAccentPhrase = hero.title.includes(accentPhrase);

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
          timeSpeed={0.14}
          colorBalance={-0.12}
          warpStrength={0.9}
          warpFrequency={3.8}
          warpSpeed={1.2}
          warpAmplitude={48}
          blendAngle={24}
          blendSoftness={0.12}
          rotationAmount={180}
          noiseScale={1.4}
          grainAmount={0.04}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.2}
          gamma={1}
          saturation={0.78}
          centerX={0.04}
          centerY={-0.02}
          zoom={0.96}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-85 mix-blend-screen">
        <DarkVeil
          hueShift={-22}
          noiseIntensity={0.04}
          scanlineIntensity={0.08}
          speed={0.28}
          scanlineFrequency={0.65}
          warpAmount={0.12}
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
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-200 backdrop-blur-md"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-3xl text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl"
          >
            {hasAccentPhrase ? (
              <>
                {beforeAccent}
                <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                  {accentPhrase}
                </SecondaryWordmark>
                {afterAccent}
              </>
            ) : (
              hero.title
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-sm leading-8 text-ink-200 md:text-base"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.div variants={itemVariants}>
              <LinkButton
                href={primaryHref}
                size="lg"
                leadingIcon={<MailPlusIcon />}
                className="h-auto px-8 py-3 text-base text-brand-white shadow-[0_18px_48px_rgba(93,56,255,0.34)] hover:shadow-[0_24px_56px_rgba(93,56,255,0.42)]"
              >
                {hero.primaryCtaLabel}
              </LinkButton>
            </motion.div>

            <motion.div variants={itemVariants}>
              <LinkButton
                href={secondaryHref}
                size="lg"
                variant="ghost"
                leadingIcon={<CalendarGridIcon />}
                className="h-auto border-white/14 bg-white/[0.08] px-8 py-3 text-base text-brand-white hover:bg-white/[0.12]"
              >
                {hero.secondaryCtaLabel}
              </LinkButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
