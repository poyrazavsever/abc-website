import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const spinnerSizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-[3px]",
} as const;

export type SpinnerSize = keyof typeof spinnerSizeClasses;

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  size?: SpinnerSize;
};

export function Spinner({
  className,
  label = "Yukleniyor",
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent",
          spinnerSizeClasses[size],
        )}
        aria-hidden="true"
      />
    </span>
  );
}
