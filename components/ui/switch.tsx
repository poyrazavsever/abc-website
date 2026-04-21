"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: ReactNode;
  description?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  className,
  label,
  description,
  disabled,
  onChange,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {(label || description) ? (
        <span className="space-y-1">
          {label ? (
            <span className="block text-sm font-semibold text-text">{label}</span>
          ) : null}
          {description ? (
            <span className="block text-sm text-text-muted">{description}</span>
          ) : null}
        </span>
      ) : null}

      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          role="switch"
          className="peer sr-only"
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            onCheckedChange?.(event.currentTarget.checked);
          }}
          {...props}
        />
        <span className="h-6 w-11 rounded-full border border-border bg-surface-muted transition peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2" />
        <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-surface shadow-xs transition peer-checked:translate-x-5 peer-checked:bg-primary-foreground" />
      </span>
    </label>
  );
}
