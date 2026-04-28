import type { Metadata } from "next";
import Link from "next/link";

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
import { roleLabels } from "@/components/admin/admin-shell";
import { ActiveTagForm } from "@/components/profile/active-tag-form";
import { getProfileSnapshotForUser } from "@/lib/services/profile.service";
import { requireAuthenticatedUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Profilim",
  description: "Ankara Build Club dashboard profil alani.",
};

export default async function DashboardProfilePage() {
  const user = await requireAuthenticatedUser("/dashboard/profile");
  const { profile, projects } = await getProfileSnapshotForUser(user);

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeader
          eyebrow="Dashboard"
          heading={`${profile.fullName} profili`}
          description="Profil bilgilerinizi, projelerinizi ve topluluk durumunuzu buradan yönetebilirsiniz."
          actions={
            <div className="flex items-center gap-3">
              <LinkButton href="/dashboard/linkedin-card" variant="outline">
                LinkedIn'de Paylaş
              </LinkButton>
              <LinkButton href={`/builders/${profile.id}`} variant="outline">
                Public Profili Gör
              </LinkButton>
              <LogoutButton variant="ghost">Çıkış Yap</LogoutButton>
            </div>
          }
        />

        <ActiveTagForm currentTag={profile.activeTag} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>Temel bilgileriniz ve iletişim detaylarınız.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="space-y-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">Ad Soyad</dt>
                  <dd className="text-sm text-text">{profile.fullName}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">Rol & Konum</dt>
                  <dd className="text-sm text-text">
                    <Badge variant="info" className="mr-2">{roleLabels[profile.role]}</Badge>
                    {profile.city}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">Biyografi</dt>
                  <dd className="text-sm text-text">{profile.bio || "Biyografi eklenmemiş."}</dd>
                </div>
                {(profile.publicEmail || profile.linkedinUrl) && (
                  <div className="space-y-1">
                    <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">İletişim</dt>
                    <dd className="flex flex-col gap-1 text-sm text-text">
                      {profile.publicEmail && <span>{profile.publicEmail}</span>}
                      {profile.linkedinUrl && (
                        <Link href={profile.linkedinUrl} target="_blank" className="text-primary hover:underline">
                          LinkedIn
                        </Link>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projelerim</CardTitle>
              <CardDescription>Sisteme kayıtlı projeleriniz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="space-y-1 rounded-md border border-border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-text">{project.name}</h4>
                      <Badge variant="secondary" className="text-xs">{project.status}</Badge>
                    </div>
                    <p className="line-clamp-2 text-xs text-text-soft">{project.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-text-soft">Henüz proje eklemediniz.</div>
              )}
              <LinkButton href="/dashboard/my-projects" variant="outline" className="w-full">
                Projeleri Yönet
              </LinkButton>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Rozetler ve Etkinlikler</CardTitle>
              <CardDescription>
                Katıldığınız etkinlikler ve Luma üzerinden kazandığınız rozetler burada görünür.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-dashed border-border bg-surface-muted p-8 text-center">
                <p className="text-sm text-text-soft">Henüz etkinlik verisi senkronize edilmedi.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
