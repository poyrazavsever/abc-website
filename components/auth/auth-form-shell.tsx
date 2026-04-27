import type { ReactNode } from "react";

import { Divider, SectionHeader } from "@/components/ui";

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
      <SectionHeader
        eyebrow={eyebrow}
        heading={heading}
        description={description}
        className="sm:flex-col sm:items-start sm:justify-start"
      />

      <Divider />

      {children}
    </div>
  );
}
