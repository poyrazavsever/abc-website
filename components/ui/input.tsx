import type { InputHTMLAttributes } from "react";

import { controlClassName, type ControlSize } from "@/components/ui/control";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  invalid?: boolean;
};

export function Input({
  type = "text",
  size = "md",
  invalid = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={controlClassName({ size, invalid, className })}
      {...props}
    />
  );
}
