"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Stack_Sans_Headline } from "next/font/google";

import { Grainient } from "@/components/marketing/grainient";
import { HeroBirds } from "@/components/marketing/hero-birds";
import { RotatingText } from "@/components/marketing/rotating-text";
import { Container } from "@/components/shared/container";
import { LinkButton } from "@/components/ui/link-button";

const easing = [0.16, 1, 0.3, 1] as const;
const heroHeadlineFont = Stack_Sans_Headline({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

type LandingHeroProps = {
  featuredNames: string[];
};

export function LandingHero({ featuredNames }: LandingHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : 0.12,
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 26,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.78,
        ease: easing,
      },
    },
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-brand-black text-primary-foreground">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: easing }}
        className="absolute inset-0 -z-30"
      >
        <Grainient
          color1="var(--color-accent-500)"
          color2="var(--color-secondary-500)"
          color3="var(--color-primary-950)"
          timeSpeed={0.25}
          colorBalance={-0.16}
          warpStrength={1.15}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={59}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-primary/55 via-primary-800/40 to-primary-950/65" />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                y: [0, -18, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                opacity: { duration: 1, ease: easing },
                scale: { duration: 1.1, ease: easing },
                y: {
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                },
              }
        }
        className="absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-3xl"
      />

      <Container className="flex min-h-screen items-center justify-center py-20 sm:py-24 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex w-full max-w-6xl flex-col items-center gap-7 text-center md:gap-8"
        >
          <motion.div
            variants={containerVariants}
            className="relative space-y-5 md:space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="pointer-events-none absolute left-1/2 top-10 z-20 flex h-44 w-[120%] -translate-x-1/2 items-center justify-center sm:top-8 sm:h-56 md:top-6 md:h-72"
            >
              <div className="absolute inset-x-[10%] top-1/2 h-24 -translate-y-1/2 rounded-full bg-white/10 blur-3xl sm:h-28 md:h-32" />
              <HeroBirds className="relative h-full w-full max-w-[34rem] opacity-95 mix-blend-screen sm:max-w-[44rem] md:max-w-[56rem] lg:max-w-[68rem]" />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="relative z-30 text-xs font-semibold tracking-[0.4em] text-white/80 sm:text-sm"
            >
              SHIPIN
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className={`${heroHeadlineFont.className} relative z-10 mx-auto max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]`}
            >
              Ideas Don&apos;t Matter Shipping Does
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="relative z-30 mx-auto max-w-3xl text-base leading-8 text-white/82 sm:text-lg"
            >
              Shipin is where builders turn ideas into shipped products, real
              users, and actual traction.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
            transition={{ duration: 0.28, ease: easing }}
            className="w-full max-w-[28rem] rounded-[1.35rem] border border-white/20 bg-white/8 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:max-w-[32rem] sm:p-2"
          >
            <div className="flex flex-col gap-1.5 rounded-[1.1rem] border border-white/10 bg-white/6 p-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:p-2">
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-[0.9rem] px-2 py-1 text-center sm:max-w-[8.5rem] sm:items-start sm:px-2.5 sm:text-left">
                <div className="flex items-baseline justify-center text-[0.78rem] font-semibold tracking-[-0.04em] text-white/88 sm:justify-start sm:text-base">
                  <span className="shrink-0">shipin.city/</span>
                  <RotatingText
                    items={featuredNames}
                    intervalMs={3200}
                    className="ml-0.5 inline-block min-w-[4.5ch] text-left text-accent-300 transition-all duration-500"
                  />
                </div>
              </div>

              <LinkButton
                href="/register"
                className="h-9 shrink-0 rounded-[0.95rem] border-0 bg-[linear-gradient(90deg,var(--color-highlight-400),var(--color-accent-500),var(--color-info-400))] px-4 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(213,82,163,0.28)] transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(131,28,145,0.26)] sm:h-10 sm:px-5 sm:text-sm"
              >
                Join the community
              </LinkButton>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="-mt-1 max-w-xl text-xs tracking-[0.24em] text-white/60 sm:text-sm"
          >
            COMMUNITY, EVENTS, BUILDERS, COLLABORATION.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
