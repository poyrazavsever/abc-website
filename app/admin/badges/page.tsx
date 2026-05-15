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
        title="Badge Management"
        description="Automatic badge rules are tracked here, and manual badges such as Core Builder can be assigned to builder profiles."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminTable columns={["Badge", "Trigger", "Assignments", "Status"]}>
          {badges.map((badge) => (
            <tr key={badge.id}>
              <AdminTableCell>
                <div className="space-y-1">
                  <p className="font-semibold text-text">{badge.name}</p>
                  <Badge variant={badge.isManual ? "warning" : "info"}>
                    {badge.isManual ? "Manual" : "Automatic"}
                  </Badge>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <p className="max-w-md text-text-muted">{badge.trigger}</p>
              </AdminTableCell>
              <AdminTableCell>{badge.assignmentCount} profiles</AdminTableCell>
              <AdminTableCell>
                <StatusBadge label={statusLabels[badge.status]} status={badge.status} />
              </AdminTableCell>
            </tr>
          ))}
        </AdminTable>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assign Manual Badge</CardTitle>
              <CardDescription>
                For admin-controlled labels such as Serious Builder or Core Builder.
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
                <Field label="Badge" required>
                  <Select name="badgeId" required>
                    {badges.map((badge) => (
                      <option key={badge.id} value={badge.id}>
                        {badge.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Operations note">
                  <Textarea
                    name="note"
                    rows={4}
                    placeholder="Write a short note explaining the assignment"
                  />
                </Field>
                <Button type="submit">Assign Badge</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Attendance</CardTitle>
              <CardDescription>
                Increases the selected builder&apos;s event attendance count by 1. If a threshold is reached, automatic badges are calculated and assigned.
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
                <Button type="submit" variant="secondary" className="w-full">Increase Attendance by +1</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Badge Rule</CardTitle>
          <CardDescription>
            Basic form for managing automatic thresholds and visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 lg:grid-cols-4">
            <Field label="Badge name">
              <Input name="name" placeholder="e.g. Sprint Veteran" />
            </Field>
            <Field label="Trigger">
              <Input name="trigger" placeholder="e.g. 5 Build Sprints" />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="published">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Select>
            </Field>
            <div className="flex items-end">
              <Button type="submit" variant="outline" block>
                Save Rule
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
