import type { ReactNode } from "react";

import { Divider } from "@/components/ui";

type AuthFormShellProps = {
  eyebrow: string;
  heading: string;
  description: string;
  children: ReactNode;
};

export function AuthFormShell({
  eyebrow,
  heading,
  description,
  children,
}: AuthFormShellProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <p className="text-xs font-semibold tracking-[0.14em] text-white/50">
          {eyebrow}
        </p>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm leading-relaxed text-white/68 sm:text-base">
          {description}
        </p>
      </div>

      <Divider className="bg-white/10" />

      {children}
    </div>
  );
}
