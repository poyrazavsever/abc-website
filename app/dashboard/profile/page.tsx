import type { Metadata } from "next";

import { LogoutButton } from "@/components/auth/logout-button";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LinkButton,
  SectionHeader,
} from "@/components/ui";
import {
  getUserFullName,
  isOnboardingComplete,
} from "@/lib/auth/shared";
import { requireAuthenticatedUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profilim",
  description:
    "Ankara Build Club dashboard profil alani. Oturum ve onboarding durumu burada gorunur.",
};

export default async function DashboardProfilePage() {
  const user = await requireAuthenticatedUser("/dashboard/profile");
  const fullName = getUserFullName(user) ?? "Builder";
  const onboardingComplete = isOnboardingComplete(user);

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeader
          eyebrow="Dashboard"
          heading={`${fullName} profili`}
          description="Auth, session ve onboarding durumunuz bu temel profil ekraninda gorunuyor. Ileri fazlarda builder detaylari ve topluluk verileri bu modulu genisletecek."
          actions={<LogoutButton variant="outline">Cikis Yap</LogoutButton>}
        />

        <Card>
          <CardHeader>
            <CardTitle>Hesap durumu</CardTitle>
            <CardDescription>
              Bu sayfa auth akisinin gercek hedeflerinden biridir. Session
              korumasi aktiftir ve onboarding tamamlanmis kullanicilar burada
              kalir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Email auth aktif</Badge>
              <Badge variant="secondary">SSR session korunuyor</Badge>
              <Badge>
                {onboardingComplete
                  ? "Onboarding tamamlandi"
                  : "Onboarding bekliyor"}
              </Badge>
            </div>

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
            <CardTitle>Sonraki alanlar</CardTitle>
            <CardDescription>
              Mevcut auth akisi tamamlandi. Topluluk akisina devam etmek veya
              etkinlik sayfasina donmek icin asagidaki kisayollari kullanin.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <LinkButton href="/events" variant="outline">
              Etkinlikleri Incele
            </LinkButton>
            <LinkButton href="/sponsors" variant="ghost">
              Partner Sayfasini Ac
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
