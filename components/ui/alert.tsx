import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const alertVariantClasses = {
  default: "border-border bg-surface text-text",
  info: "border-info-200 bg-info-50 text-info-800",
  success: "border-success-200 bg-success-50 text-success-800",
  warning: "border-warning-200 bg-warning-50 text-warning-900",
  danger: "border-danger-200 bg-danger-50 text-danger-800",
} as const;

export type AlertVariant = keyof typeof alertVariantClasses;

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  variant?: AlertVariant;
};

export function Alert({
  className,
  icon,
  variant = "default",
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border px-4 py-3 shadow-xs",
        alertVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon ? <div className="mt-0.5 shrink-0">{icon}</div> : null}
      <div className="min-w-0 space-y-1">{children}</div>
    </div>
  );
}

export type AlertTitleProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h3 className={cn("text-sm font-semibold leading-none", className)} {...props} />
  );
}

export type AlertDescriptionProps = PropsWithChildren<
  HTMLAttributes<HTMLParagraphElement>
>;

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return <p className={cn("text-sm leading-relaxed", className)} {...props} />;
}
