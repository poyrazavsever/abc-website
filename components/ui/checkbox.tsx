"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: ReactNode;
  description?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox({
  className,
  label,
  description,
  disabled,
  onChange,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-start gap-3",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            onCheckedChange?.(event.currentTarget.checked);
          }}
          {...props}
        />
        <span className="flex h-5 w-5 items-center justify-center rounded border border-border bg-surface text-primary transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2 peer-disabled:opacity-60">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
            <path d="m7.8 13.2-3-3L3.75 11.25 7.8 15.3 16.25 6.85 15.2 5.8z" />
          </svg>
        </span>
      </span>

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
    </label>
  );
}
