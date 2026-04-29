"use client";

import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { useState } from "react";
import Link, { type LinkProps } from "next/link";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";

import { cn } from "@/lib/utils/cn";

const buttonBaseClass =
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border text-sm font-semibold tracking-[-0.01em] transition-[transform,border-color,color,box-shadow,background-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px active:translate-y-0 focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-default disabled:opacity-55 motion-reduce:transform-none motion-reduce:transition-none";

const buttonVariantClasses = {
  primary:
    "border-primary-300/60 bg-linear-to-b from-primary-500 via-primary-500 to-primary-600 text-primary-foreground shadow-[0_12px_30px_rgba(93,56,255,0.3)] hover:shadow-[0_18px_40px_rgba(93,56,255,0.38)]",
  secondary:
    "border-secondary-300/60 bg-linear-to-b from-secondary-500 via-secondary-500 to-secondary-600 text-secondary-foreground shadow-[0_12px_30px_rgba(131,28,145,0.26)] hover:shadow-[0_18px_40px_rgba(131,28,145,0.34)]",
  ghost:
    "border-white/12 bg-linear-to-b from-white/12 to-white/[0.06] text-text shadow-[0_10px_24px_rgba(17,17,17,0.08)] backdrop-blur-xl hover:border-white/18 hover:bg-white/12 hover:shadow-[0_14px_30px_rgba(17,17,17,0.12)]",
  outline:
    "border-primary-200/75 bg-linear-to-b from-surface via-surface to-primary-50/85 text-text shadow-[0_8px_24px_rgba(17,17,17,0.08)] hover:border-primary-300/90 hover:shadow-[0_12px_30px_rgba(93,56,255,0.14)]",
  danger:
    "border-danger-300/60 bg-linear-to-b from-danger-400 via-danger-500 to-danger-600 text-danger-foreground shadow-[0_12px_32px_rgba(131,28,145,0.22)] hover:shadow-[0_18px_40px_rgba(131,28,145,0.3)]",
  success:
    "border-success-300/60 bg-linear-to-b from-success-400 via-success-500 to-success-600 text-success-foreground shadow-[0_12px_32px_rgba(70,44,125,0.22)] hover:shadow-[0_18px_40px_rgba(70,44,125,0.3)]",
} as const;

const buttonSizeClasses = {
  sm: "h-10 px-5 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-12 px-7 text-base",
} as const;

const buttonInnerBorderClasses = {
  primary: "border-white/12",
  secondary: "border-white/12",
  ghost: "border-white/8",
  outline: "border-white/55",
  danger: "border-white/12",
  success: "border-white/12",
} as const;

const labelVariants: Variants = {
  rest: { y: "0%", opacity: 1 },
  hover: { y: "-120%", opacity: 0 },
};

const labelCloneVariants: Variants = {
  rest: { y: "120%", opacity: 0 },
  hover: { y: "0%", opacity: 1 },
};

const iconVariants: Variants = {
  rest: { y: "0%", opacity: 1 },
  hover: { y: "-120%", opacity: 0 },
};

const arrowVariants: Variants = {
  rest: { x: "-120%", opacity: 0 },
  hover: { x: "0%", opacity: 1 },
};

const arrowFromRightVariants: Variants = {
  rest: { x: "120%", opacity: 0 },
  hover: { x: "0%", opacity: 1 },
};

const sharedTransition: Transition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
};

const delayedArrowTransition: Transition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
  delay: 0.04,
};

export type ButtonVariant = keyof typeof buttonVariantClasses;
export type ButtonSize = keyof typeof buttonSizeClasses;
export type ButtonMotion = "auto" | "none" | "label-slide" | "icon-swap";

type ResolvedButtonMotion = Exclude<ButtonMotion, "auto">;
type MotionState = "rest" | "hover";
type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonContentProps = {
  children?: ReactNode;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  motion?: ButtonMotion;
  state: MotionState;
  reducedMotion: boolean;
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
    motion?: ButtonMotion;
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

function resolveButtonMotion({
  motion = "auto",
  loading = false,
  leadingIcon,
  children,
}: Pick<ButtonContentProps, "motion" | "loading" | "leadingIcon" | "children">): ResolvedButtonMotion {
  if (loading || motion === "none") {
    return "none";
  }

  if (motion === "label-slide" || motion === "icon-swap") {
    return motion;
  }

  if (children === null || children === undefined) {
    return "none";
  }

  return leadingIcon ? "icon-swap" : "label-slide";
}

function useButtonMotionState(disabled: boolean) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return {
    isActive: !disabled && (isHovered || isFocused),
    handleMouseEnter: () => setIsHovered(true),
    handleMouseLeave: () => setIsHovered(false),
    handleFocus: () => setIsFocused(true),
    handleBlur: () => setIsFocused(false),
  };
}

function ButtonChrome({ variant = "primary" }: { variant?: ButtonVariant }) {
  return (
    <span className="pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true">
      <span
        className={cn(
          "absolute inset-[1px] rounded-[inherit] border",
          buttonInnerBorderClasses[variant],
        )}
      />
      <span className="absolute inset-x-[12%] top-px h-[48%] rounded-full bg-linear-to-b from-white/34 via-white/12 to-transparent opacity-90" />
      <span className="absolute left-[12%] top-[14%] h-[38%] w-[34%] rounded-full bg-white/18 blur-md opacity-85" />
      <span className="absolute inset-x-[10%] bottom-px h-[36%] rounded-full bg-linear-to-t from-black/16 to-transparent opacity-70" />
      <span className="absolute -left-1/3 top-[-30%] h-[165%] w-[42%] rotate-[18deg] bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 blur-md transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[320%] group-hover:opacity-100 group-focus-visible:translate-x-[320%] group-focus-visible:opacity-100 motion-reduce:hidden" />
    </span>
  );
}

function AnimatedLabel({
  children,
  state,
}: {
  children: ReactNode;
  state: MotionState;
}) {
  return (
    <span className="relative inline-flex h-[1.15em] min-w-0 items-center justify-center overflow-hidden leading-none">
      <motion.span
        initial={false}
        variants={labelVariants}
        animate={state}
        transition={sharedTransition}
        className="block truncate will-change-transform"
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={false}
        variants={labelCloneVariants}
        animate={state}
        transition={sharedTransition}
        className="pointer-events-none absolute inset-x-0 top-0 block truncate will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}

function AnimatedLeadingIcon({
  icon,
  state,
  iconOnly = false,
}: {
  icon: ReactNode;
  state: MotionState;
  iconOnly?: boolean;
}) {
  return (
    <span
      className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <motion.span
        initial={false}
        variants={iconVariants}
        animate={state}
        transition={sharedTransition}
        className="absolute inset-0 flex h-4 w-4 items-center justify-center will-change-transform"
      >
        {icon}
      </motion.span>
      <motion.span
        initial={false}
        variants={iconOnly ? arrowFromRightVariants : arrowVariants}
        animate={state}
        transition={state === "hover" ? delayedArrowTransition : sharedTransition}
        className="absolute inset-0 flex h-4 w-4 items-center justify-center will-change-transform"
      >
        <ArrowRightIcon />
      </motion.span>
    </span>
  );
}

function ButtonContent({
  children,
  loading = false,
  leadingIcon,
  trailingIcon,
  motion = "auto",
  state,
  reducedMotion,
}: ButtonContentProps) {
  const hasLabel = children !== null && children !== undefined;
  const resolvedMotion = resolveButtonMotion({
    motion,
    loading,
    leadingIcon,
    children,
  });
  const motionState = reducedMotion || resolvedMotion === "none" ? "rest" : state;
  const iconOnly = !hasLabel;

  const leadingContent = loading ? (
    <LoadingSpinner />
  ) : leadingIcon ? (
    resolvedMotion === "icon-swap" ? (
      <AnimatedLeadingIcon icon={leadingIcon} state={motionState} iconOnly={iconOnly} />
    ) : (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
        {leadingIcon}
      </span>
    )
  ) : null;

  return (
    <span className="relative z-10 inline-flex min-w-0 items-center justify-center gap-2">
      {leadingContent}
      {hasLabel ? (
        resolvedMotion === "label-slide" ? (
          <AnimatedLabel state={motionState}>{children}</AnimatedLabel>
        ) : (
          <span className="truncate">{children}</span>
        )
      ) : null}
      {!loading && trailingIcon ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </span>
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
  motion = "auto",
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
  const prefersReducedMotion = useReducedMotion();
  const { isActive, handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } =
    useButtonMotionState(Boolean(isDisabled));
  const state: MotionState = isActive ? "hover" : "rest";
  const sharedClassName = buttonClassName({
    variant,
    size,
    block,
    disabled: Boolean(isDisabled),
    className,
  });

  if (href) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        target={target}
        rel={rel}
        {...props}
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
        onFocus={(event) => {
          handleFocus();
          onFocus?.(event);
        }}
        onBlur={(event) => {
          handleBlur();
          onBlur?.(event);
        }}
        onMouseEnter={(event) => {
          handleMouseEnter();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          handleMouseLeave();
          onMouseLeave?.(event);
        }}
      >
        <ButtonChrome variant={variant} />
        <ButtonContent
          loading={loading}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          motion={motion}
          state={state}
          reducedMotion={Boolean(prefersReducedMotion)}
        >
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={sharedClassName}
      disabled={isDisabled}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={(event) => {
        handleFocus();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        handleBlur();
        onBlur?.(event);
      }}
      onMouseEnter={(event) => {
        handleMouseEnter();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        handleMouseLeave();
        onMouseLeave?.(event);
      }}
      {...props}
    >
      <ButtonChrome variant={variant} />
      <ButtonContent
        loading={loading}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        motion={motion}
        state={state}
        reducedMotion={Boolean(prefersReducedMotion)}
      >
        {children}
      </ButtonContent>
    </button>
  );
}
