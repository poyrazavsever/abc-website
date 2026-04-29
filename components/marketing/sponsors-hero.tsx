"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DarkVeil } from "@/components/marketing/dark-veil";
import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
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

export function SponsorsHero({
  hero,
  primaryHref,
  secondaryHref,
}: SponsorsHeroProps) {
  const prefersReducedMotion = useReducedMotion();

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
    <section className="relative h-screen overflow-hidden bg-brand-black text-brand-white">
      <div className="absolute inset-0 -z-20">
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

      <div className="absolute inset-0 -z-10 opacity-75">
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

      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-brand-black/40 via-brand-black/55 to-brand-black/80" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />

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
            className="mt-8 max-w-5xl text-6xl font-medium tracking-tight text-brand-white md:text-8xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-8 text-ink-200"
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
                className="h-auto rounded-full border-primary-600 bg-primary-600 px-8 py-3 text-base text-brand-white transition-all hover:bg-primary-500"
              >
                {hero.primaryCtaLabel}
              </LinkButton>
            </motion.div>

            <motion.div variants={itemVariants}>
              <LinkButton
                href={secondaryHref}
                size="lg"
                variant="ghost"
                className="h-auto rounded-full border border-white/20 bg-white/10 px-8 py-3 text-base text-brand-white backdrop-blur-md transition-all hover:bg-white/20"
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
