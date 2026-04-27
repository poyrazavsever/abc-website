import type { Metadata } from "next";

import { OnboardingCompleteForm } from "@/components/onboarding/onboarding-complete-form";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  SectionHeader,
} from "@/components/ui";
import {
  getUserFullName,
  isOnboardingComplete,
} from "@/lib/auth/shared";
import { requireAuthenticatedUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "Ankara Build Club onboarding adimi. Hesabinizi tamamlayip dashboard alanina gecin.",
};

export default async function OnboardingProfilePage() {
  const user = await requireAuthenticatedUser("/onboarding/profile");
  const fullName = getUserFullName(user) ?? "Builder";

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Onboarding"
        heading="Hesabinizi aktive edin"
        description="Platforma gecmeden once temel auth profilinizi kontrol edin. Bu adim tamamlandiginda dashboard alanina yonlendirileceksiniz."
        className="sm:flex-col sm:items-start sm:justify-start"
      />

      <Card>
        <CardHeader>
          <CardTitle>Hesap ozeti</CardTitle>
          <CardDescription>
            Bu gorevde ayri bir profil tablosu acilmiyor. Ilk auth metadata
            degerleri dogrudan Supabase kullanici kaydi uzerinde tutuluyor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Email auth</Badge>
            <Badge variant="secondary">SSR session</Badge>
            <Badge>{isOnboardingComplete(user) ? "Tamamlandi" : "Bekliyor"}</Badge>
          </div>

          <Divider />

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">
                Ad soyad
              </dt>
              <dd className="text-sm text-text">{fullName}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">
                E-posta
              </dt>
              <dd className="text-sm text-text">{user.email ?? "-"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card surface="soft">
        <CardHeader>
          <CardTitle>Sonraki adim</CardTitle>
          <CardDescription>
            Devam ettiginizde `onboarding_completed` metadata alani isaretlenir
            ve dashboard profil sayfasina gecersiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingCompleteForm />
        </CardContent>
      </Card>
    </div>
  );
}
