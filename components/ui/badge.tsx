import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const badgeVariantClasses = {
  default: "border-border bg-surface-muted text-text",
  primary: "border-primary-200 bg-primary-50 text-primary-700",
  secondary: "border-secondary-200 bg-secondary-50 text-secondary-700",
  success: "border-success-200 bg-success-50 text-success-700",
  warning: "border-warning-200 bg-warning-50 text-warning-800",
  danger: "border-danger-200 bg-danger-50 text-danger-700",
  info: "border-info-200 bg-info-50 text-info-700",
} as const;

const badgeSizeClasses = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
} as const;

export type BadgeVariant = keyof typeof badgeVariantClasses;
export type BadgeSize = keyof typeof badgeSizeClasses;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        badgeVariantClasses[variant],
        badgeSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
