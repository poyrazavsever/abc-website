import type { ReactNode } from "react";

import { AuthShell } from "@/components/auth/auth-shell";

type PremiumLoginShellProps = {
  children: ReactNode;
};

export function PremiumLoginShell({ children }: PremiumLoginShellProps) {
  return <AuthShell>{children}</AuthShell>;
}
