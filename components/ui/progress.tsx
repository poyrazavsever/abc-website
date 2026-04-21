import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  max?: number;
  showValue?: boolean;
  value: number;
};

export function Progress({
  className,
  label,
  max = 100,
  showValue = false,
  value,
  ...props
}: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((safeValue / safeMax) * 100);

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {(label || showValue) ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          {label ? <span className="font-medium text-text">{label}</span> : null}
          {showValue ? (
            <span className="text-text-muted">{percentage}%</span>
          ) : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className="h-2.5 overflow-hidden rounded-full bg-surface-strong"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
