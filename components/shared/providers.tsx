"use client";

import type { ReactNode } from "react";

import { AppToaster } from "@/components/shared/toaster";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <AppToaster />
    </>
  );
}
