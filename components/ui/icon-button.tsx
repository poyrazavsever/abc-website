import type { ReactNode } from "react";

import {
  Button,
  type ButtonProps,
  type ButtonVariant,
} from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const iconButtonSizeClasses = {
  sm: "h-10 w-10",
  md: "h-11 w-11",
  lg: "h-12 w-12",
} as const;

type IconButtonSize = keyof typeof iconButtonSizeClasses;

type IconButtonProps = Omit<
  ButtonProps,
  "children" | "leadingIcon" | "trailingIcon" | "size"
> & {
  icon: ReactNode;
  label: string;
  size?: IconButtonSize;
  variant?: ButtonVariant;
};

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      motion="icon-swap"
      leadingIcon={icon}
      className={cn("px-0", iconButtonSizeClasses[size], className)}
      aria-label={label}
      title={label}
      {...props}
    />
  );
}
