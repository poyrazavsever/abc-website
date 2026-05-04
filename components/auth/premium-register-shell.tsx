import type { ReactNode } from "react";

import { AuthShell } from "@/components/auth/auth-shell";

type PremiumRegisterShellProps = {
  children: ReactNode;
};

export function PremiumRegisterShell({
  children,
}: PremiumRegisterShellProps) {
  return <AuthShell>{children}</AuthShell>;
}
