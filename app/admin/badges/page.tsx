import {
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
  StatusBadge,
  statusLabels,
} from "@/components/admin/admin-shell";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";
import { assignBadgeAction, addAttendanceAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBadgesPage() {
  const { badges, builders } = await getAdminDataset();
  const eligibleBuilders = builders.filter((builder) => !builder.isBanned);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Rozet yönetimi"
        description="Otomatik rozet kuralları izlenir, manuel Core Builder gibi rozetler builder profiline atanır."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminTable columns={["Rozet", "Tetikleyici", "Atama", "Durum"]}>
          {badges.map((badge) => (
            <tr key={badge.id}>
              <AdminTableCell>
                <div className="space-y-1">
                  <p className="font-semibold text-text">{badge.name}</p>
                  <Badge variant={badge.isManual ? "warning" : "info"}>
                    {badge.isManual ? "Manuel" : "Otomatik"}
                  </Badge>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <p className="max-w-md text-text-muted">{badge.trigger}</p>
              </AdminTableCell>
              <AdminTableCell>{badge.assignmentCount} profil</AdminTableCell>
              <AdminTableCell>
                <StatusBadge label={statusLabels[badge.status]} status={badge.status} />
              </AdminTableCell>
            </tr>
          ))}
        </AdminTable>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manuel rozet ata</CardTitle>
              <CardDescription>
                Ciddi builder veya Core Builder gibi admin kontrollü etiketler için.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={assignBadgeAction} className="space-y-5">
                <Field label="Builder" required>
                  <Select name="builderId" required>
                    {eligibleBuilders.map((builder) => (
                      <option key={builder.id} value={builder.id}>
                        {builder.fullName}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Rozet" required>
                  <Select name="badgeId" required>
                    {badges.map((badge) => (
                      <option key={badge.id} value={badge.id}>
                        {badge.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Operasyon notu">
                  <Textarea
                    name="note"
                    rows={4}
                    placeholder="Atama sebebini kısa not olarak yaz"
                  />
                </Field>
                <Button type="submit">Rozeti ata</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Katılım Ekle (Yoklama)</CardTitle>
              <CardDescription>
                Seçilen builder'ın etkinlik katılım sayısını 1 artırır. Eğer eşik aşılırsa otomatik rozetleri hesaplayıp atar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addAttendanceAction} className="space-y-5">
                <Field label="Builder" required>
                  <Select name="builderId" required>
                    {eligibleBuilders.map((builder) => (
                      <option key={builder.id} value={builder.id}>
                        {builder.fullName}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Button type="submit" variant="secondary" className="w-full">Katılımı +1 Artır</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rozet kuralı düzenle</CardTitle>
          <CardDescription>
            Otomatik eşiklerin ve görünürlük durumunun yönetileceği temel form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 lg:grid-cols-4">
            <Field label="Rozet adı">
              <Input name="name" placeholder="Örn. Sprint Veteran" />
            </Field>
            <Field label="Tetikleyici">
              <Input name="trigger" placeholder="Örn. 5 Build Sprint" />
            </Field>
            <Field label="Durum">
              <Select name="status" defaultValue="published">
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
                <option value="archived">Arşiv</option>
              </Select>
            </Field>
            <div className="flex items-end">
              <Button type="submit" variant="outline" block>
                Kuralı kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
