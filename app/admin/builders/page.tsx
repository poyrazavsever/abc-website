import {
  banBuilderAction,
  markSeriousBuilderAction,
  removeSeriousBuilderAction,
  unbanBuilderAction,
} from "@/app/admin/actions";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
  StatusBadge,
  roleLabels,
  tagLabels,
} from "@/components/admin/admin-shell";
import {
  Badge,
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";

type BuildersPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    role?: string;
  }>;
};

export default async function AdminBuildersPage({
  searchParams,
}: BuildersPageProps) {
  const params = await searchParams;
  const { builders } = await getAdminDataset();
  const query = params?.q?.toLocaleLowerCase("tr") ?? "";
  const selectedStatus = params?.status ?? "";
  const selectedRole = params?.role ?? "";
  const filteredBuilders = builders.filter((builder) => {
    const matchesQuery = query
      ? `${builder.fullName} ${builder.email} ${builder.city}`
          .toLocaleLowerCase("tr")
          .includes(query)
      : true;
    const matchesStatus =
      selectedStatus === "banned"
        ? builder.isBanned
        : selectedStatus === "serious"
          ? builder.isSeriousBuilder
          : true;
    const matchesRole = selectedRole ? builder.role === selectedRole : true;

    return matchesQuery && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Builder yönetimi"
        description="Üyeleri arayın, ban durumunu yönetin, ciddi builder etiketini verin veya geri alın. Aksiyonlar server action üzerinden servis katmanına bağlıdır."
        actions={
          <form className="grid gap-2 sm:grid-cols-[180px_160px_160px_auto]">
            <Input name="q" placeholder="İsim, e-posta, şehir" defaultValue={params?.q} />
            <Select name="status" defaultValue={selectedStatus}>
              <option value="">Tüm durumlar</option>
              <option value="serious">Ciddi builder</option>
              <option value="banned">Banlı</option>
            </Select>
            <Select name="role" defaultValue={selectedRole}>
              <option value="">Tüm roller</option>
              <option value="developer">Yazılımcı</option>
              <option value="designer">Tasarımcı</option>
              <option value="sales">Sales</option>
              <option value="product">Ürün</option>
              <option value="student">Öğrenci</option>
              <option value="other">Diğer</option>
            </Select>
            <Button type="submit" variant="outline">
              Filtrele
            </Button>
          </form>
        }
      />

      <AdminTable
        columns={[
          "Builder",
          "Profil",
          "Durum",
          "Ciddi builder",
          "Ban yönetimi",
        ]}
      >
        {filteredBuilders.map((builder) => (
          <tr key={builder.id}>
            <AdminTableCell>
              <div className="space-y-1">
                <Link
                  href={`/builders/${builder.id}`}
                  className="font-semibold text-text transition hover:text-primary"
                >
                  {builder.fullName}
                </Link>
                <p className="text-sm text-text-muted">{builder.email}</p>
                <p className="text-xs text-text-soft">{builder.city}</p>
              </div>
            </AdminTableCell>
            <AdminTableCell>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{roleLabels[builder.role]}</Badge>
                <Badge>{tagLabels[builder.activeTag]}</Badge>
                <Badge variant="secondary">{builder.badgeCount} rozet</Badge>
                <Badge variant="secondary">{builder.projectCount} proje</Badge>
              </div>
              <p className="mt-2 text-xs text-text-soft">
                Son aktif: {builder.lastActiveAt}
              </p>
            </AdminTableCell>
            <AdminTableCell>
              <div className="flex flex-col gap-2">
                <StatusBadge
                  label={builder.isBanned ? "Banlı" : "Aktif"}
                  status={builder.isBanned ? "banned" : "active"}
                />
                {builder.banReason ? (
                  <p className="max-w-xs text-xs text-text-muted">
                    {builder.banReason}
                  </p>
                ) : null}
              </div>
            </AdminTableCell>
            <AdminTableCell>
              <form
                action={
                  builder.isSeriousBuilder
                    ? removeSeriousBuilderAction
                    : markSeriousBuilderAction
                }
                className="space-y-2"
              >
                <input type="hidden" name="builderId" value={builder.id} />
                <StatusBadge
                  label={builder.isSeriousBuilder ? "Etiketli" : "Etiketsiz"}
                  status={builder.isSeriousBuilder ? "approved" : "draft"}
                />
                <Button
                  type="submit"
                  size="sm"
                  variant={builder.isSeriousBuilder ? "outline" : "success"}
                >
                  {builder.isSeriousBuilder ? "Etiketi kaldır" : "Ciddi builder yap"}
                </Button>
              </form>
            </AdminTableCell>
            <AdminTableCell>
              <details className="group min-w-56">
                <summary className="cursor-pointer text-sm font-semibold text-text-muted transition hover:text-text">
                  Ban işlemleri
                </summary>
                <div className="mt-3 rounded-md border border-border bg-surface-muted p-3">
                  {builder.isBanned ? (
                    <form action={unbanBuilderAction}>
                      <input type="hidden" name="builderId" value={builder.id} />
                      <Button type="submit" size="sm" variant="outline">
                        Banı kaldır
                      </Button>
                    </form>
                  ) : (
                    <form action={banBuilderAction} className="space-y-2">
                      <input type="hidden" name="builderId" value={builder.id} />
                      <Field label="Ban nedeni">
                        <Textarea
                          name="reason"
                          rows={2}
                          placeholder="Kısa operasyon notu"
                          required
                        />
                      </Field>
                      <Button type="submit" size="sm" variant="danger">
                        Kullanıcıyı banla
                      </Button>
                    </form>
                  )}
                </div>
              </details>
            </AdminTableCell>
          </tr>
        ))}
      </AdminTable>

    </div>
  );
}
