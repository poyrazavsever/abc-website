import { cn } from "@/lib/utils/cn";

const controlSizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3.5 text-sm",
  lg: "h-11 px-4 text-base",
} as const;

export type ControlSize = keyof typeof controlSizeClasses;

type ControlClassOptions = {
  size?: ControlSize;
  invalid?: boolean;
  className?: string;
};

export function controlClassName({
  size = "md",
  invalid = false,
  className,
}: ControlClassOptions) {
  return cn(
    "w-full rounded-md border bg-surface text-text shadow-xs transition placeholder:text-text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    invalid
      ? "border-danger-300 focus-visible:ring-danger-200"
      : "border-border hover:border-border-strong",
    controlSizeClasses[size],
    className,
  );
}
