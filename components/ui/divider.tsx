import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Divider({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative ? "true" : undefined}
      className={cn(
        "shrink-0 bg-border",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
