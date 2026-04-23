import {
  approveSeriousBuilderApplicationAction,
  rejectSeriousBuilderApplicationAction,
} from "@/app/admin/actions";
import Link from "next/link";
import {
  AdminPageHeader,
  StatusBadge,
  applicationStatusLabels,
  operationStatusLabels,
  roleLabels,
  tagLabels,
} from "@/components/admin/admin-shell";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Textarea,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";

type OperationsPageProps = {
  searchParams?: Promise<{
    application?: string;
  }>;
};

export default async function AdminOperationsPage({
  searchParams,
}: OperationsPageProps) {
  const params = await searchParams;
  const { applications, operations } = await getAdminDataset();
  const selectedApplication =
    applications.find((application) => application.id === params?.application) ??
    applications.find((application) => application.status === "pending") ??
    applications[0];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Temel operasyon yönetimi"
        description="Ciddi builder başvurularını okuyun, onaylayın veya reddedin. Luma sync, rozet motoru ve eşleştirme gibi operasyonların durumunu takip edin."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ciddi builder başvuruları</CardTitle>
            <CardDescription>
              Başvuru metni, beklenti ve haftalık müsaitlik karar öncesi okunur.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-border bg-surface-muted p-4 transition hover:border-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Link
                      href={`/builders/${application.builderId}`}
                      className="font-semibold text-text transition hover:text-primary"
                    >
                      {application.builderName}
                    </Link>
                    <p className="text-sm text-text-muted">
                      {roleLabels[application.role]} ·{" "}
                      {tagLabels[application.activeTag]}
                    </p>
                  </div>
                  <StatusBadge
                    label={applicationStatusLabels[application.status]}
                    status={application.status}
                  />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-text-muted">
                  {application.motivation}
                </p>
                <Link
                  href={`/admin/operations?application=${application.id}`}
                  className="mt-3 inline-flex text-sm font-semibold text-primary transition hover:text-primary-700"
                >
                  Başvuruyu aç
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Başvuru detayı</CardTitle>
            <CardDescription>
              Onay, kullanıcıya ciddi builder etiketi verir ve havuza dahil eder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedApplication ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-surface-muted p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/builders/${selectedApplication.builderId}`}
                      className="text-xl font-semibold text-text transition hover:text-primary"
                    >
                      {selectedApplication.builderName}
                    </Link>
                    <StatusBadge
                      label={applicationStatusLabels[selectedApplication.status]}
                      status={selectedApplication.status}
                    />
                  </div>
                  <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                    <div>
                      <dt className="font-semibold text-text">Rol</dt>
                      <dd className="text-text-muted">
                        {roleLabels[selectedApplication.role]}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-text">Aktif etiket</dt>
                      <dd className="text-text-muted">
                        {tagLabels[selectedApplication.activeTag]}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-text">Başvuru tarihi</dt>
                      <dd className="text-text-muted">
                        {selectedApplication.submittedAt}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="grid gap-4">
                  <Field label="Motivasyon">
                    <Textarea
                      readOnly
                      rows={4}
                      value={selectedApplication.motivation}
                    />
                  </Field>
                  <Field label="Beklenti">
                    <Textarea
                      readOnly
                      rows={3}
                      value={selectedApplication.expectation}
                    />
                  </Field>
                  <Field label="Haftalık müsaitlik">
                    <Input readOnly value={selectedApplication.weeklyAvailability} />
                  </Field>
                </div>

                <div className="flex flex-wrap gap-2">
                  <form action={approveSeriousBuilderApplicationAction}>
                    <input
                      type="hidden"
                      name="applicationId"
                      value={selectedApplication.id}
                    />
                    <input
                      type="hidden"
                      name="builderId"
                      value={selectedApplication.builderId}
                    />
                    <Button
                      type="submit"
                      variant="success"
                      disabled={selectedApplication.status === "approved"}
                    >
                      Onayla ve ciddi builder yap
                    </Button>
                  </form>
                  <form action={rejectSeriousBuilderApplicationAction}>
                    <input
                      type="hidden"
                      name="applicationId"
                      value={selectedApplication.id}
                    />
                    <input
                      type="hidden"
                      name="builderId"
                      value={selectedApplication.builderId}
                    />
                    <Button
                      type="submit"
                      variant="danger"
                      disabled={selectedApplication.status === "rejected"}
                    >
                      Reddet
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted">Başvuru bulunamadı.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operasyon job&apos;ları</CardTitle>
          <CardDescription>
            Sync ve eşleştirme işlerinin son çalışma bilgisi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {operations.map((operation) => (
              <div
                key={operation.id}
                className="rounded-lg border border-border bg-surface-muted p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text">{operation.name}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {operation.description}
                    </p>
                  </div>
                  <StatusBadge
                    label={operationStatusLabels[operation.status]}
                    status={operation.status}
                  />
                </div>
                <p className="mt-4 text-xs text-text-soft">
                  {operation.owner} · {operation.lastRunAt}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
