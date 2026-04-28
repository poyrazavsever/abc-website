import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionHeader,
  Divider,
} from "@/components/ui";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import { getPublicBuilderProfile } from "@/lib/services/builders.service";
import { getUserBadges } from "@/lib/services/badges.service";
import Link from "next/link";

type BuilderProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BuilderProfilePage({
  params,
}: BuilderProfilePageProps) {
  const { id } = await params;
  const builderData = await getPublicBuilderProfile(id);
  const { profile, projects = [], badgeCount, isSeriousBuilder } = builderData || {};
  const badges = await getUserBadges(id);

  if (!profile) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-10 text-center text-text-soft">
              Bu builder profili bulunamadı veya gizli.
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeader
          eyebrow="Builder"
          heading={profile.fullName ?? "Builder profili"}
          description={profile.bio ?? "Public builder profil sayfası"}
        />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{profile.fullName}</CardTitle>
              <CardDescription>
                {profile.city} • {roleLabels[profile.role as keyof typeof roleLabels]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{roleLabels[profile.role as keyof typeof roleLabels]}</Badge>
                {profile.activeTag && (
                  <Badge>{tagLabels[profile.activeTag as keyof typeof tagLabels]}</Badge>
                )}
                <Badge variant="secondary">{badgeCount} rozet</Badge>
                <Badge variant="secondary">{projects.length} proje</Badge>
                {isSeriousBuilder && (
                  <Badge variant="success">Ciddi Builder</Badge>
                )}
              </div>

              {profile.linkedinUrl && (
                <div className="pt-2">
                  <Link
                    href={profile.linkedinUrl}
                    target="_blank"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    LinkedIn Profili &rarr;
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projeler</CardTitle>
                  <CardDescription>
                    {projects.length > 0
                      ? "Builder'ın üzerinde çalıştığı veya tamamladığı projeler."
                      : "Henüz bir proje eklenmemiş."}
                  </CardDescription>
                </CardHeader>
                {projects.length > 0 && (
                  <CardContent className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-text">{project.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-soft">{project.description}</p>
                        {project.url && (
                          <Link href={project.url} target="_blank" className="text-xs text-primary hover:underline">
                            Projeyi İncele
                          </Link>
                        )}
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rozetler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {badges.length > 0 ? (
                      <div className="grid gap-4">
                        {badges.map((userBadge) => (
                          <div key={userBadge.id} className="flex items-center gap-4 rounded-lg border border-border bg-surface-muted p-4">
                            {userBadge.badge.icon_url ? (
                              <img src={userBadge.badge.icon_url} alt={userBadge.badge.name} className="h-12 w-12 object-contain" />
                            ) : (
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <h4 className="text-sm font-semibold text-text">{userBadge.badge.name}</h4>
                              <p className="text-xs text-text-soft line-clamp-2">{userBadge.badge.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-text-soft">
                        Kullanıcı henüz bir rozet kazanmamış.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
