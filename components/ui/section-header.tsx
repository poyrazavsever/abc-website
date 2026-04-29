import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  heading: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  actions,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        isCentered &&
          "items-center text-center sm:flex-col sm:items-center sm:justify-center",
        className,
      )}
      {...props}
    >
      <div className="space-y-1.5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-semibold text-text sm:text-2xl">
          {heading}
        </h2>
        {description ? (
          <p className="text-sm leading-relaxed text-text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
