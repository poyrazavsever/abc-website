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
        title="Serious Builder Matching"
        description="Manually match serious builders in the pool, track who was matched with whom, and keep operations notes."
      />

      <Card>
        <CardHeader>
          <CardTitle>Manual Matching</CardTitle>
          <CardDescription>
            Choose two different serious builders, explain the reason for the match, and add it to the log.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            action={createManualBuilderMatchAction}
            className="grid gap-4 lg:grid-cols-4"
          >
            <Field label="First builder" required>
              <Select name="firstBuilderId" required>
                {seriousBuilders.map((builder) => (
                  <option key={builder.id} value={builder.id}>
                    {builder.fullName} · {roleLabels[builder.role]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Second builder" required>
              <Select name="secondBuilderId" required>
                {seriousBuilders.map((builder) => (
                  <option key={builder.id} value={builder.id}>
                    {builder.fullName} · {roleLabels[builder.role]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Matched by" required>
              <Input
                name="matchedBy"
                defaultValue="ABC Ops"
                placeholder="Admin name"
                required
              />
            </Field>
            <div className="flex items-end">
              <Button type="submit" block>
                Match Manually
              </Button>
            </div>
            <Field label="Match note" className="lg:col-span-4" required>
              <Textarea
                name="note"
                rows={3}
                placeholder="Why were these two builders matched?"
                required
              />
            </Field>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Match Log</CardTitle>
          <CardDescription>
            Serious builder matches created by the admin team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminTable
            columns={["Matched Builders", "Status", "Matched By", "Date", "Note"]}
          >
            {matches.map((match) => (
              <tr key={match.id}>
                <AdminTableCell>
                  <div className="space-y-1">
                    <Link
                      href={`/profile/${match.firstBuilderId}`}
                      className="font-semibold text-text transition hover:text-primary"
                    >
                      {match.firstBuilderName}
                    </Link>
                    <Link
                      href={`/profile/${match.secondBuilderId}`}
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
