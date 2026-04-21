import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  optionalLabel?: ReactNode;
};

export function Label({
  className,
  children,
  required = false,
  optionalLabel,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-text",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {required ? (
        <span className="text-danger" aria-hidden="true">
          *
        </span>
      ) : optionalLabel ? (
        <span className="text-xs font-medium text-text-soft">{optionalLabel}</span>
      ) : null}
    </label>
  );
}
