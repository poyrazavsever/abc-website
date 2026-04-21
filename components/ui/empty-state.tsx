import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  align?: "left" | "center";
};

export function EmptyState({
  actions,
  align = "center",
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-surface-muted px-6 py-10",
        isCentered ? "text-center" : "text-left",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex max-w-xl flex-col gap-4",
          isCentered ? "items-center" : "items-start",
        )}
      >
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-text-muted">
            {icon}
          </div>
        ) : null}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          {description ? (
            <p className="text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
