import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55";

const buttonVariantClasses = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:bg-primary-700",
  secondary:
    "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary-700",
  ghost: "border-transparent bg-transparent text-text hover:bg-surface-muted",
  outline: "border-border bg-surface text-text hover:bg-surface-muted",
  danger: "border-danger bg-danger text-danger-foreground hover:bg-danger-700",
} as const;

const buttonSizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
} as const;

export type ButtonVariant = keyof typeof buttonVariantClasses;
export type ButtonSize = keyof typeof buttonSizeClasses;

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: ButtonClassOptions) {
  return cn(
    buttonBaseClass,
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    block && "w-full",
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, block, className })}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leadingIcon
      )}
      <span className="truncate">{children}</span>
      {trailingIcon}
    </button>
  );
}
