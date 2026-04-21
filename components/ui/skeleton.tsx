import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const skeletonVariantClasses = {
  block: "rounded-lg",
  circle: "rounded-full",
  line: "rounded-md",
} as const;

export type SkeletonVariant = keyof typeof skeletonVariantClasses;

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  animate?: boolean;
  variant?: SkeletonVariant;
};

export function Skeleton({
  animate = true,
  className,
  variant = "block",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface-strong",
        animate && "animate-pulse",
        skeletonVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
