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
  const builder = await getPublicBuilderProfile(id);

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeader
          eyebrow="Builder"
          heading={builder?.profile.fullName ?? "Builder profili"}
          description={builder?.profile.bio ?? "Public builder profil sayfası"}
        />

        {builder ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{builder.profile.fullName}</CardTitle>
                <CardDescription>
                  {builder.profile.city} • {roleLabels[builder.profile.role]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">{roleLabels[builder.profile.role]}</Badge>
                  {builder.profile.activeTag && (
                    <Badge>{tagLabels[builder.profile.activeTag]}</Badge>
                  )}
                  <Badge variant="secondary">{builder.badgeCount} rozet</Badge>
                  <Badge variant="secondary">{builder.projects.length} proje</Badge>
                  {builder.isSeriousBuilder && (
                    <Badge variant="success">Ciddi Builder</Badge>
                  )}
                </div>

                {builder.profile.linkedinUrl && (
                  <div className="pt-2">
                    <Link
                      href={builder.profile.linkedinUrl}
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
                      {builder.projects.length > 0
                        ? "Builder'ın üzerinde çalıştığı veya tamamladığı projeler."
                        : "Henüz bir proje eklenmemiş."}
                    </CardDescription>
                  </CardHeader>
                  {builder.projects.length > 0 && (
                    <CardContent className="space-y-4">
                      {builder.projects.map((project) => (
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
                    <CardDescription>
                      Kazanılan rozetler ve etkinlik katılım geçmişi çok yakında burada olacak.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-dashed border-border bg-surface-muted p-6 text-center text-sm text-text-soft">
                      0 rozet • Etkinlik katılımı henüz senkronize edilmedi
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-10 text-center text-text-soft">
              Bu builder profili bulunamadı veya gizli.
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
