import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const avatarSizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
} as const;

export type AvatarSize = keyof typeof avatarSizeClasses;

type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  alt: string;
  src?: string;
  size?: AvatarSize;
  fallback?: string;
};

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  alt,
  src,
  size = "md",
  fallback,
  className,
  ...props
}: AvatarProps) {
  const initials = fallback ?? getInitials(alt);
  const safeSrc = src?.trim() ?? "";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-muted font-semibold text-text",
        avatarSizeClasses[size],
        className,
      )}
      aria-label={alt}
      {...props}
    >
      {safeSrc ? (
        // Avatar image optimization strategy is intentionally deferred.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={safeSrc} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
