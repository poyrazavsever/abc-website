import {
  AdminEmptyState,
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
  StatusBadge,
  statusLabels,
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
  LinkButton,
  Select,
  Textarea,
} from "@/components/ui";
import { getAdminDataset } from "@/lib/services/admin.service";

type ContentPageProps = {
  searchParams?: Promise<{
    selected?: string;
    status?: string;
  }>;
};

export default async function AdminContentPage({ searchParams }: ContentPageProps) {
  const params = await searchParams;
  const { contentItems } = await getAdminDataset();
  const filteredItems = params?.status
    ? contentItems.filter((item) => item.status === params.status)
    : contentItems;
  const selectedItem =
    contentItems.find((item) => item.id === params?.selected) ?? contentItems[0];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Rapor paylaşımı"
        description="Bu ekran yalnızca topluluk, sprint veya sponsor raporlarını paylaşmak için kullanılır. Diğer içerik türleri admin kapsamından çıkarıldı."
        actions={
          <form className="flex flex-wrap gap-2">
            <Select name="status" defaultValue={params?.status ?? ""}>
              <option value="">Tüm durumlar</option>
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="archived">Arşiv</option>
            </Select>
            <Button type="submit" variant="outline">
              Filtrele
            </Button>
          </form>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminTable columns={["Rapor", "Durum", "Paylaşım", "Güncelleme", "Aksiyon"]}>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <AdminTableCell>
                <div className="space-y-1">
                  <p className="font-semibold text-text">{item.title}</p>
                  <p className="max-w-md text-sm text-text-muted">{item.summary}</p>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <StatusBadge label={statusLabels[item.status]} status={item.status} />
              </AdminTableCell>
              <AdminTableCell>
                {item.reportUrl ? (
                  <a
                    href={item.reportUrl}
                    className="font-semibold text-link hover:text-link-hover"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rapor linki
                  </a>
                ) : (
                  <span className="text-text-soft">Link yok</span>
                )}
              </AdminTableCell>
              <AdminTableCell>
                <p className="text-text-muted">{item.updatedAt}</p>
                <p className="text-xs text-text-soft">{item.ownerName}</p>
              </AdminTableCell>
              <AdminTableCell>
                <LinkButton
                  href={`/admin/content?selected=${item.id}`}
                  size="sm"
                  variant="outline"
                >
                  Düzenle
                </LinkButton>
              </AdminTableCell>
            </tr>
          ))}
        </AdminTable>

        {selectedItem ? (
          <Card>
            <CardHeader>
              <CardTitle>Detay / güncelleme</CardTitle>
              <CardDescription>
                Paylaşılacak rapor başlığı, linki, özeti ve yayın durumu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <input type="hidden" name="contentId" value={selectedItem.id} />
                <Field label="Başlık" required>
                  <Input name="title" defaultValue={selectedItem.title} />
                </Field>
                <input type="hidden" name="type" value="report" />
                <Field label="Rapor linki">
                  <Input
                    name="reportUrl"
                    type="url"
                    defaultValue={selectedItem.reportUrl}
                    placeholder="https://..."
                  />
                </Field>
                <Field label="Durum">
                  <Select name="status" defaultValue={selectedItem.status}>
                    <option value="draft">Taslak</option>
                    <option value="published">Yayında</option>
                    <option value="archived">Arşiv</option>
                  </Select>
                </Field>
                <Field label="Paylaşım özeti">
                  <Textarea
                    name="summary"
                    defaultValue={selectedItem.summary}
                    rows={5}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button type="submit">Kaydet</Button>
                  <Button type="button" variant="outline">
                    Raporu paylaş
                  </Button>
                  <Button type="button" variant="danger">
                    Arşivle
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <AdminEmptyState>İçerik kaydı bulunamadı.</AdminEmptyState>
        )}
      </div>
    </div>
  );
}
