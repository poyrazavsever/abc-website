import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionHeader,
} from "@/components/ui";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import { getPublicBuilderProfile } from "@/lib/services/builders.service";

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
          heading={builder?.fullName ?? "Builder profili"}
          description="Public builder profil sayfası hazır olduğunda admin bağlantıları bu route üzerinden gerçek profile gider."
        />

        <Card>
          <CardHeader>
            <CardTitle>{builder?.fullName ?? id}</CardTitle>
            <CardDescription>
              Profil verisi bağlandığında public builder detayları burada görünür.
            </CardDescription>
          </CardHeader>
          {builder ? (
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="info">{roleLabels[builder.role]}</Badge>
              <Badge>{tagLabels[builder.activeTag]}</Badge>
              <Badge>{builder.city}</Badge>
              <Badge variant="secondary">{builder.badgeCount} rozet</Badge>
              <Badge variant="secondary">{builder.projectCount} proje</Badge>
              {builder.isSeriousBuilder ? (
                <Badge variant="success">Ciddi Builder</Badge>
              ) : null}
            </CardContent>
          ) : null}
        </Card>
      </div>
    </main>
  );
}
