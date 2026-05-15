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
        title="Core Operations Management"
        description="Review serious builder applications, approve or reject them, and track the status of operations such as Luma sync, the badge engine, and matching."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Serious Builder Applications</CardTitle>
            <CardDescription>
              Review application text, expectations, and weekly availability before making a decision.
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
                      href={`/profile/${application.builderId}`}
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
                  Open Application
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Approval gives the user the serious builder label and adds them to the pool.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedApplication ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-surface-muted p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/profile/${selectedApplication.builderId}`}
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
                      <dt className="font-semibold text-text">Role</dt>
                      <dd className="text-text-muted">
                        {roleLabels[selectedApplication.role]}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-text">Active tag</dt>
                      <dd className="text-text-muted">
                        {tagLabels[selectedApplication.activeTag]}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-text">Application date</dt>
                      <dd className="text-text-muted">
                        {selectedApplication.submittedAt}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="grid gap-4">
                  <Field label="Motivation">
                    <Textarea
                      readOnly
                      rows={4}
                      value={selectedApplication.motivation}
                    />
                  </Field>
                  <Field label="Expectation">
                    <Textarea
                      readOnly
                      rows={3}
                      value={selectedApplication.expectation}
                    />
                  </Field>
                  <Field label="Weekly availability">
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
                      Approve and mark as serious builder
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
                      Reject
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted">No application found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operations Jobs</CardTitle>
          <CardDescription>
            Last run information for sync and matching jobs.
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
