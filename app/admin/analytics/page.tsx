import {
  AdminMetricGrid,
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
} from "@/components/admin/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { getAnalyticsOverview } from "@/lib/services/analytics.service";

export const dynamic = "force-dynamic";

export default async function AnalyticsDashboardPage() {
  const overview = await getAnalyticsOverview();

  const metrics = [
    {
      label: "Sayfa Görüntülenme",
      value: String(overview.totalPageViews),
      hint: "Tüm sayfalardaki toplam tıklama/görüntüleme sayısı",
    },
    {
      label: "Yeni Kayıtlar",
      value: String(overview.totalRegistrations),
      hint: "Sisteme başarıyla kayıt olan kullanıcılar",
    },
    {
      label: "Tamamlanan Onboarding",
      value: String(overview.totalOnboardings),
      hint: "Profil bilgilerini dolduran kullanıcılar",
    },
    {
      label: "Dönüşüm Oranı",
      value: overview.totalRegistrations > 0 
        ? `${Math.round((overview.totalOnboardings / overview.totalRegistrations) * 100)}%` 
        : "0%",
      hint: "Kayıt olup onboarding tamamlayanların oranı",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analitik & Veri Toplama"
        description="Sistemdeki kullanıcıların etkileşimlerini, kayıt akışlarını ve genel kullanım istatistiklerini buradan takip edebilirsiniz."
      />

      <AdminMetricGrid metrics={metrics} />

      <Card>
        <CardHeader>
          <CardTitle>Son Etkinlikler</CardTitle>
          <CardDescription>
            Sistemde son gerçekleşen kullanıcı ve sistem olaylarının detaylı dökümü.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {overview.recentEvents.length > 0 ? (
            <AdminTable columns={["Tarih", "Olay Adı", "Kullanıcı ID", "Detaylar"]}>
              {overview.recentEvents.map((event) => (
                <tr key={event.id}>
                  <AdminTableCell className="whitespace-nowrap text-xs text-text-muted">
                    {new Date(event.created_at).toLocaleString('tr-TR')}
                  </AdminTableCell>
                  <AdminTableCell>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {event.event_name}
                    </span>
                  </AdminTableCell>
                  <AdminTableCell className="text-xs font-mono text-text-soft">
                    {event.user_id || "-"}
                  </AdminTableCell>
                  <AdminTableCell className="text-xs text-text-muted">
                    <pre className="max-w-xs truncate">{JSON.stringify(event.properties)}</pre>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTable>
          ) : (
            <div className="py-8 text-center text-sm text-text-muted">Henüz veri toplanmadı.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
