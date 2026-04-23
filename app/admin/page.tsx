import {
  AdminMetricGrid,
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
  StatusBadge,
  applicationStatusLabels,
  operationStatusLabels,
  roleLabels,
  tagLabels,
} from "@/components/admin/admin-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LinkButton,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { overview } = await getAdminDataset();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Admin operasyon merkezi"
        description="ABC yönetim ekibinin günlük işi tek ekranda takip edebilmesi için içerik, builder başvuruları, rozetler ve operasyon job'ları burada özetlenir."
        actions={
          <>
            <LinkButton href="/admin/operations">Başvuruları incele</LinkButton>
            <LinkButton href="/admin/builders" variant="outline">
              Builder yönet
            </LinkButton>
          </>
        }
      />

      <AdminMetricGrid metrics={overview.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Bekleyen ciddi builder başvuruları</CardTitle>
            <CardDescription>
              Motivasyon, beklenti ve haftalık müsaitlik okunarak karar verilir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminTable
              columns={["Builder", "Motivasyon", "Durum", "Aksiyon"]}
            >
              {overview.recentApplications.map((application) => (
                <tr key={application.id}>
                  <AdminTableCell>
                    <div className="space-y-1">
                      <p className="font-semibold text-text">
                        {application.builderName}
                      </p>
                      <p className="text-xs text-text-muted">
                        {roleLabels[application.role]} ·{" "}
                        {tagLabels[application.activeTag]}
                      </p>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell className="max-w-md">
                    <p className="line-clamp-3 text-text-muted">
                      {application.motivation}
                    </p>
                  </AdminTableCell>
                  <AdminTableCell>
                    <StatusBadge
                      label={applicationStatusLabels[application.status]}
                      status={application.status}
                    />
                  </AdminTableCell>
                  <AdminTableCell>
                    <LinkButton
                      href={`/admin/operations?application=${application.id}`}
                      size="sm"
                      variant="outline"
                    >
                      Aç
                    </LinkButton>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTable>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temel operasyonlar</CardTitle>
            <CardDescription>
              Admin tarafının elle takip ettiği job ve modül durumları.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overview.operations.map((operation) => (
              <div
                key={operation.id}
                className="rounded-lg border border-border bg-surface-muted p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-text">{operation.name}</p>
                    <p className="text-sm text-text-muted">
                      {operation.description}
                    </p>
                  </div>
                  <StatusBadge
                    label={operationStatusLabels[operation.status]}
                    status={operation.status}
                  />
                </div>
                <p className="mt-3 text-xs text-text-soft">
                  Son çalışma: {operation.lastRunAt} · {operation.owner}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
