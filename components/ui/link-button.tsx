"use client";

import { Button, type ButtonProps } from "@/components/ui/button";

export type LinkButtonProps = Omit<ButtonProps, "href"> & {
  href: NonNullable<ButtonProps["href"]>;
};

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button href={href} {...props} />;
}
