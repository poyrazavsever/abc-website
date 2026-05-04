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
    "Ankara Build Club onboarding adımı. Hesabınızı tamamlayıp dashboard alanına geçin.",
};

export default async function OnboardingProfilePage() {
  const user = await requireAuthenticatedUser("/onboarding/profile");
  const fullName = getUserFullName(user) ?? "Builder";

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Onboarding"
        heading="Hesabınızı aktive edin"
        description="Platforma geçmeden önce temel auth profilinizi kontrol edin. Bu adım tamamlandığında dashboard alanına yönlendirileceksiniz."
        className="sm:flex-col sm:items-start sm:justify-start"
      />

      <Card>
        <CardHeader>
          <CardTitle>Hesap özeti</CardTitle>
          <CardDescription>
            Bu görevde ayrı bir profil tablosu açılmıyor. İlk auth metadata
            değerleri doğrudan Supabase kullanıcı kaydı üzerinde tutuluyor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Email auth</Badge>
            <Badge variant="secondary">SSR session</Badge>
            <Badge>{isOnboardingComplete(user) ? "Tamamlandı" : "Bekliyor"}</Badge>
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
          <CardTitle>Sonraki adım</CardTitle>
          <CardDescription>
            Devam ettiğinizde `onboarding_completed` metadata alanı işaretlenir
            ve dashboard profil sayfasına geçersiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingCompleteForm />
        </CardContent>
      </Card>
    </div>
  );
}
