"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils/cn";

type SponsorsPartnersSectionProps = {
  eyebrow: string;
  heading: string;
  toolPartners: string[];
  communityPartners: string[];
};

export function SponsorsPartnersSection({
  eyebrow,
  heading,
  toolPartners,
  communityPartners,
}: SponsorsPartnersSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-violet-500">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-instrument text-2xl font-bold tracking-tight text-text sm:text-4xl">
              {heading}
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/5 pt-12 dark:border-white/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
                Tool Partners
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {toolPartners.map((partner, idx) => (
                  <div key={idx} className="rounded-lg bg-surface/50 border border-black/5 dark:border-white/5 px-4 py-2 font-medium text-text">
                    {partner}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
                Community & Ecosystem Partners
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {communityPartners.map((partner, idx) => (
                  <div key={idx} className="rounded-lg bg-surface/50 border border-black/5 dark:border-white/5 px-4 py-2 font-medium text-text">
                    {partner}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
