"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { LightRays } from "@/components/ui/light-rays";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-5 py-10 text-brand-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] min-h-80 opacity-70">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff70bf"
          raysSpeed={0.7}
          lightSpread={0.78}
          rayLength={1.35}
          fadeDistance={0.82}
          saturation={0.85}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.035}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.1),rgb(0_0_0_/_0.84)_48%,rgb(0_0_0_/_1))]" />
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </main>
  );
}
