import type { SelectHTMLAttributes } from "react";

import { controlClassName, type ControlSize } from "@/components/ui/control";
import { cn } from "@/lib/utils/cn";

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  size?: ControlSize;
  invalid?: boolean;
};

export function Select({
  size = "md",
  invalid = false,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClassName({ size, invalid }),
          "appearance-none pr-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-soft"
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M5.25 7.5 10 12.25 14.75 7.5l1.06 1.06L10 14.37 4.19 8.56z" />
        </svg>
      </span>
    </div>
  );
}
