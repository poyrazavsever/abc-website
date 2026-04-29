import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Lobster } from "next/font/google";

import { cn } from "@/lib/utils/cn";

const lobster = Lobster({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const secondaryWordmarkClassName = cn(
  lobster.className,
  "inline-block bg-linear-to-r from-primary-100 via-white to-primary-200 bg-clip-text text-transparent tracking-[0.01em] [-webkit-text-stroke:0.35px_rgba(255,255,255,0.16)] drop-shadow-[0_10px_24px_rgba(93,56,255,0.24)]",
);

type SecondaryWordmarkProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
};

export function SecondaryWordmark({
  children,
  className,
  ...props
}: SecondaryWordmarkProps) {
  return (
    <span className={cn(secondaryWordmarkClassName, className)} {...props}>
      {children}
    </span>
  );
}
