import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionHeader,
} from "@/components/ui";

export default function DashboardProfilePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeader
          eyebrow="Profil"
          heading="Profil Sayfası"
          description="Builder profil bilgileri, rozetler ve topluluk etiketleri burada yönetilecek."
        />

        <Card>
          <CardHeader>
            <CardTitle>ABC Builder Profili</CardTitle>
            <CardDescription>
              Bu sayfa profil modülü bağlandığında kullanıcının public ve dashboard
              bilgilerini gösterecek.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="primary">Ciddi Builder</Badge>
            <Badge>Co-founder arıyor</Badge>
            <Badge variant="secondary">Ankara</Badge>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
