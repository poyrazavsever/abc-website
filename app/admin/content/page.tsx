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
        title="Report Sharing"
        description="This screen is used only for sharing community, sprint, or sponsor reports. Other content types were removed from the admin scope."
        actions={
          <form className="flex flex-wrap gap-2">
            <Select name="status" defaultValue={params?.status ?? ""}>
              <option value="">All statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </Select>
            <Button type="submit" variant="outline">
              Filter
            </Button>
          </form>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminTable columns={["Report", "Status", "Share", "Updated", "Action"]}>
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
                    Report link
                  </a>
                ) : (
                  <span className="text-text-soft">No link</span>
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
                  Edit
                </LinkButton>
              </AdminTableCell>
            </tr>
          ))}
        </AdminTable>

        {selectedItem ? (
          <Card>
            <CardHeader>
              <CardTitle>Details / Update</CardTitle>
              <CardDescription>
                Title, link, summary, and publication status of the report to be shared.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <input type="hidden" name="contentId" value={selectedItem.id} />
                <Field label="Title" required>
                  <Input name="title" defaultValue={selectedItem.title} />
                </Field>
                <input type="hidden" name="type" value="report" />
                <Field label="Report link">
                  <Input
                    name="reportUrl"
                    type="url"
                    defaultValue={selectedItem.reportUrl}
                    placeholder="https://..."
                  />
                </Field>
                <Field label="Status">
                  <Select name="status" defaultValue={selectedItem.status}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </Select>
                </Field>
                <Field label="Share summary">
                  <Textarea
                    name="summary"
                    defaultValue={selectedItem.summary}
                    rows={5}
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline">
                    Share Report
                  </Button>
                  <Button type="button" variant="danger">
                    Archive
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <AdminEmptyState>No content record found.</AdminEmptyState>
        )}
      </div>
    </div>
  );
}
