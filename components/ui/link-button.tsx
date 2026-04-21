"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import Link from "next/link";

import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";

type NativeLinkProps = ComponentProps<typeof Link>;

type LinkButtonProps = Omit<NativeLinkProps, "children" | "className"> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  onClick,
  ...props
}: LinkButtonProps) {
  const isDisabled = disabled || loading;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  return (
    <Link
      className={buttonClassName({
        variant,
        size,
        block,
        className,
      })}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      onClick={handleClick}
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
      {!loading ? trailingIcon : null}
    </Link>
  );
}
