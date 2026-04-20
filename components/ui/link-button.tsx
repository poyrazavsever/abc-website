import type { ComponentProps, ReactNode } from "react";
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
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  block = false,
  leadingIcon,
  trailingIcon,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={buttonClassName({ variant, size, block, className })}
      {...props}
    >
      {leadingIcon}
      <span className="truncate">{children}</span>
      {trailingIcon}
    </Link>
  );
}
