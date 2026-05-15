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
        title="Admin Operations Center"
        description="Content, builder applications, badges, and operations jobs are summarized here so the ABC admin team can track day-to-day work from a single screen."
        actions={
          <>
            <LinkButton href="/admin/operations">Review Applications</LinkButton>
            <LinkButton href="/admin/builders" variant="outline">
              Manage Builders
            </LinkButton>
          </>
        }
      />

      <AdminMetricGrid metrics={overview.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pending Serious Builder Applications</CardTitle>
            <CardDescription>
              Decisions are made by reviewing motivation, expectations, and weekly availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminTable
              columns={["Builder", "Motivation", "Status", "Action"]}
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
                      Open
                    </LinkButton>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTable>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Operations</CardTitle>
            <CardDescription>
              Job and module statuses that are manually tracked by the admin team.
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
                  Last run: {operation.lastRunAt} · {operation.owner}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
