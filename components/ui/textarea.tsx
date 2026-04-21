import type { TextareaHTMLAttributes } from "react";

import { controlClassName, type ControlSize } from "@/components/ui/control";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> & {
  size?: ControlSize;
  invalid?: boolean;
};

export function Textarea({
  size = "md",
  invalid = false,
  className,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        controlClassName({ size, invalid }),
        "h-auto min-h-28 py-2.5",
        className,
      )}
      {...props}
    />
  );
}
