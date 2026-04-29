"use client";

import type { ReactNode } from "react";

import { ScrollSmoother } from "@/components/shared/scroll-smoother";
import { AppToaster } from "@/components/shared/toaster";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ScrollSmoother />
      {children}
      <AppToaster />
    </>
  );
}
