import type { ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background py-14">
      <Container width="narrow">
        <Card className="rounded-xl">
          <CardContent className="p-6 sm:p-8">{children}</CardContent>
        </Card>
      </Container>
    </main>
  );
}
