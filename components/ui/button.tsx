"use client";

import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils/cn";

const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-default disabled:opacity-55 motion-reduce:transform-none";

const buttonVariantClasses = {
  primary:
    "border-primary-500 bg-primary text-primary-foreground shadow-[0_12px_28px_rgb(70_44_125_/_0.22)] hover:border-primary-400 hover:bg-primary-600",
  secondary:
    "border-secondary-500 bg-secondary text-secondary-foreground shadow-[0_12px_28px_rgb(131_28_145_/_0.2)] hover:border-secondary-400 hover:bg-secondary-600",
  ghost:
    "border-border bg-surface text-text hover:border-primary-200 hover:bg-surface-muted",
  outline:
    "border-primary-200 bg-transparent text-text hover:border-primary-300 hover:bg-primary-50/60",
  danger:
    "border-danger bg-danger text-danger-foreground shadow-[0_12px_28px_rgb(131_28_145_/_0.18)] hover:bg-danger-700",
  success:
    "border-success bg-success text-success-foreground shadow-[0_12px_28px_rgb(70_44_125_/_0.18)] hover:bg-success-700",
} as const;

const buttonSizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof buttonVariantClasses;
export type ButtonSize = keyof typeof buttonSizeClasses;

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonLinkOptions = {
  href?: LinkProps["href"];
  prefetch?: LinkProps["prefetch"];
  replace?: LinkProps["replace"];
  scroll?: LinkProps["scroll"];
  target?: ComponentPropsWithoutRef<"a">["target"];
  rel?: ComponentPropsWithoutRef<"a">["rel"];
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  className,
}: ButtonClassOptions) {
  return cn(
    buttonBaseClass,
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    block && "w-full",
    disabled && "pointer-events-none opacity-55",
    className,
  );
}

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "onFocus" | "onBlur" | "onMouseEnter" | "onMouseLeave"
> &
  ButtonLinkOptions & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
    loading?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    onClick?: MouseEventHandler<ButtonElement>;
    onFocus?: FocusEventHandler<ButtonElement>;
    onBlur?: FocusEventHandler<ButtonElement>;
    onMouseEnter?: MouseEventHandler<ButtonElement>;
    onMouseLeave?: MouseEventHandler<ButtonElement>;
  };

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.85"
      aria-hidden="true"
    >
      <path d="M4.5 10h10" />
      <path d="m10.5 5 5 5-5 5" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

function ButtonContent({
  children,
  loading = false,
  leadingIcon,
  trailingIcon,
}: Pick<ButtonProps, "children" | "loading" | "leadingIcon" | "trailingIcon">) {
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : leadingIcon ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {children !== null && children !== undefined ? (
        <span className="truncate">{children}</span>
      ) : null}
      {!loading && trailingIcon ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </>
  );
}

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
  href,
  prefetch,
  replace,
  scroll,
  target,
  rel,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const sharedClassName = buttonClassName({
    variant,
    size,
    block,
    disabled: Boolean(isDisabled),
    className,
  });
  const resolvedTrailingIcon =
    trailingIcon ?? (href && !loading ? <ArrowRightIcon /> : null);
  const content = (
    <ButtonContent
      loading={loading}
      leadingIcon={leadingIcon}
      trailingIcon={resolvedTrailingIcon}
    >
      {children}
    </ButtonContent>
  );

  if (href) {
    const linkProps = props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        target={target}
        rel={rel}
        {...linkProps}
        className={sharedClassName}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={sharedClassName}
      disabled={isDisabled}
      tabIndex={tabIndex}
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      onFocus={onFocus as FocusEventHandler<HTMLButtonElement> | undefined}
      onBlur={onBlur as FocusEventHandler<HTMLButtonElement> | undefined}
      onMouseEnter={onMouseEnter as MouseEventHandler<HTMLButtonElement> | undefined}
      onMouseLeave={onMouseLeave as MouseEventHandler<HTMLButtonElement> | undefined}
      {...props}
    >
      {content}
    </button>
  );
}
