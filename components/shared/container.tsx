import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ContainerWidth = "narrow" | "default" | "wide" | "full";
type ContainerPadding = "compact" | "default" | "comfortable";

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "max-w-5xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

const paddingClasses: Record<ContainerPadding, string> = {
  compact: "px-4 sm:px-5 lg:px-6",
  default: "px-4 sm:px-6 lg:px-8 xl:px-10",
  comfortable: "px-6 sm:px-8 lg:px-10 xl:px-12",
};

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  width?: ContainerWidth;
  padding?: ContainerPadding;
};

export function Container({
  children,
  className,
  width = "default",
  padding = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        widthClasses[width],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
