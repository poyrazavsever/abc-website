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
        title="Builder Management"
        description="Search members, manage ban status, and add or remove the serious builder label. Actions are wired to the service layer through server actions."
        actions={
          <form className="grid gap-2 sm:grid-cols-[180px_160px_160px_auto]">
            <Input name="q" placeholder="Name, email, city" defaultValue={params?.q} />
            <Select name="status" defaultValue={selectedStatus}>
              <option value="">All statuses</option>
              <option value="serious">Serious builder</option>
              <option value="banned">Banned</option>
            </Select>
            <Select name="role" defaultValue={selectedRole}>
              <option value="">All roles</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="sales">Sales</option>
              <option value="product">Product</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </Select>
            <Button type="submit" variant="outline">
              Filter
            </Button>
          </form>
        }
      />

      <AdminTable
        columns={[
          "Builder",
          "Profile",
          "Status",
          "Serious builder",
          "Ban management",
        ]}
      >
        {filteredBuilders.map((builder) => (
          <tr key={builder.id}>
            <AdminTableCell>
              <div className="space-y-1">
                <Link
                  href={`/profile/${builder.id}`}
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
                <Badge variant="secondary">{builder.badgeCount} badges</Badge>
                <Badge variant="secondary">{builder.projectCount} projects</Badge>
              </div>
              <p className="mt-2 text-xs text-text-soft">
                Last active: {builder.lastActiveAt}
              </p>
            </AdminTableCell>
            <AdminTableCell>
              <div className="flex flex-col gap-2">
                <StatusBadge
                  label={builder.isBanned ? "Banned" : "Active"}
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
                  label={builder.isSeriousBuilder ? "Tagged" : "Untagged"}
                  status={builder.isSeriousBuilder ? "approved" : "draft"}
                />
                <Button
                  type="submit"
                  size="sm"
                  variant={builder.isSeriousBuilder ? "outline" : "success"}
                >
                  {builder.isSeriousBuilder ? "Remove Tag" : "Make Serious Builder"}
                </Button>
              </form>
            </AdminTableCell>
            <AdminTableCell>
              <details className="group min-w-56">
                <summary className="cursor-pointer text-sm font-semibold text-text-muted transition hover:text-text">
                  Ban Actions
                </summary>
                <div className="mt-3 rounded-md border border-border bg-surface-muted p-3">
                  {builder.isBanned ? (
                    <form action={unbanBuilderAction}>
                      <input type="hidden" name="builderId" value={builder.id} />
                      <Button type="submit" size="sm" variant="outline">
                        Remove Ban
                      </Button>
                    </form>
                  ) : (
                    <form action={banBuilderAction} className="space-y-2">
                      <input type="hidden" name="builderId" value={builder.id} />
                      <Field label="Ban reason">
                        <Textarea
                          name="reason"
                          rows={2}
                          placeholder="Short operations note"
                          required
                        />
                      </Field>
                      <Button type="submit" size="sm" variant="danger">
                        Ban User
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
