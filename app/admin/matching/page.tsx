import { createManualBuilderMatchAction } from "@/app/admin/actions";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
  StatusBadge,
  matchStatusLabels,
  roleLabels,
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
  Select,
  Textarea,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AdminMatchingPage() {
  const { builders, matches } = await getAdminDataset();
  const seriousBuilders = builders.filter(
    (builder) => builder.isSeriousBuilder && !builder.isBanned,
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Ciddi builder eşleştirme"
        description="Havuzdaki ciddi builder'ları manuel eşleştirin, kim kiminle eşleşmiş logunu takip edin ve operasyon notlarını saklayın."
      />

      <Card>
        <CardHeader>
          <CardTitle>Manuel eşleştirme</CardTitle>
          <CardDescription>
            İki farklı ciddi builder seçin, eşleşme sebebini yazın ve loga ekleyin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            action={createManualBuilderMatchAction}
            className="grid gap-4 lg:grid-cols-4"
          >
            <Field label="Birinci builder" required>
              <Select name="firstBuilderId" required>
                {seriousBuilders.map((builder) => (
                  <option key={builder.id} value={builder.id}>
                    {builder.fullName} · {roleLabels[builder.role]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="İkinci builder" required>
              <Select name="secondBuilderId" required>
                {seriousBuilders.map((builder) => (
                  <option key={builder.id} value={builder.id}>
                    {builder.fullName} · {roleLabels[builder.role]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Eşleştiren" required>
              <Input
                name="matchedBy"
                defaultValue="ABC Ops"
                placeholder="Admin adı"
                required
              />
            </Field>
            <div className="flex items-end">
              <Button type="submit" block>
                Manuel eşleştir
              </Button>
            </div>
            <Field label="Eşleşme notu" className="lg:col-span-4" required>
              <Textarea
                name="note"
                rows={3}
                placeholder="Neden bu iki builder eşleşti?"
                required
              />
            </Field>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eşleşme logu</CardTitle>
          <CardDescription>
            Admin tarafından oluşturulan ciddi builder eşleşmeleri.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminTable
            columns={["Eşleşenler", "Durum", "Eşleştiren", "Tarih", "Not"]}
          >
            {matches.map((match) => (
              <tr key={match.id}>
                <AdminTableCell>
                  <div className="space-y-1">
                    <Link
                      href={`/builders/${match.firstBuilderId}`}
                      className="font-semibold text-text transition hover:text-primary"
                    >
                      {match.firstBuilderName}
                    </Link>
                    <Link
                      href={`/builders/${match.secondBuilderId}`}
                      className="block text-sm text-text-muted transition hover:text-primary"
                    >
                      {match.secondBuilderName}
                    </Link>
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <StatusBadge
                    label={matchStatusLabels[match.status]}
                    status={match.status}
                  />
                </AdminTableCell>
                <AdminTableCell>{match.matchedBy}</AdminTableCell>
                <AdminTableCell>{match.matchedAt}</AdminTableCell>
                <AdminTableCell>
                  <p className="max-w-md text-text-muted">{match.note}</p>
                </AdminTableCell>
              </tr>
            ))}
          </AdminTable>
        </CardContent>
      </Card>
    </div>
  );
}
