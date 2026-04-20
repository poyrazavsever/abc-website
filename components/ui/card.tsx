import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const cardSurfaceClasses = {
  default: "bg-surface",
  muted: "bg-surface-muted",
  soft: "bg-surface-soft",
} as const;

export type CardSurface = keyof typeof cardSurfaceClasses;

type CardProps = HTMLAttributes<HTMLDivElement> & {
  surface?: CardSurface;
  elevated?: boolean;
};

export function Card({
  surface = "default",
  elevated = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border",
        cardSurfaceClasses[surface],
        elevated ? "shadow-sm" : "shadow-none",
        className,
      )}
      {...props}
    />
  );
}

type CardSectionProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function CardHeader({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    />
  );
}

type CardTitleProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-lg font-semibold text-text", className)}
      {...props}
    />
  );
}

type CardDescriptionProps = PropsWithChildren<
  HTMLAttributes<HTMLParagraphElement>
>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cn("text-sm text-text-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn("flex items-center gap-2 p-6 pt-0", className)}
      {...props}
    />
  );
}

type CardMediaProps = {
  media: ReactNode;
  className?: string;
};

export function CardMedia({ media, className }: CardMediaProps) {
  return (
    <div className={cn("overflow-hidden rounded-t-lg", className)}>{media}</div>
  );
}
