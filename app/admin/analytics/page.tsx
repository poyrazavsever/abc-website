import {
  AdminMetricGrid,
  AdminPageHeader,
  AdminTable,
  AdminTableCell,
} from "@/components/admin/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { getAnalyticsOverview } from "@/lib/services/analytics.service";

export const dynamic = "force-dynamic";

export default async function AnalyticsDashboardPage() {
  const overview = await getAnalyticsOverview();

  const metrics = [
    {
      label: "Page Views",
      value: String(overview.totalPageViews),
      hint: "Total clicks and views across all pages",
    },
    {
      label: "New Sign-Ups",
      value: String(overview.totalRegistrations),
      hint: "Users who successfully registered",
    },
    {
      label: "Completed Onboarding",
      value: String(overview.totalOnboardings),
      hint: "Users who completed their profile information",
    },
    {
      label: "Conversion Rate",
      value: overview.totalRegistrations > 0 
        ? `${Math.round((overview.totalOnboardings / overview.totalRegistrations) * 100)}%` 
        : "0%",
      hint: "Share of registered users who completed onboarding",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics & Data Collection"
        description="Track user interactions, registration flows, and overall usage metrics from here."
      />

      <AdminMetricGrid metrics={metrics} />

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>
            A detailed log of the most recent user and system events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {overview.recentEvents.length > 0 ? (
            <AdminTable columns={["Date", "Event Name", "User ID", "Details"]}>
              {overview.recentEvents.map((event) => (
                <tr key={event.id}>
                  <AdminTableCell className="whitespace-nowrap text-xs text-text-muted">
                    {new Date(event.created_at).toLocaleString('tr-TR')}
                  </AdminTableCell>
                  <AdminTableCell>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {event.event_name}
                    </span>
                  </AdminTableCell>
                  <AdminTableCell className="text-xs font-mono text-text-soft">
                    {event.user_id || "-"}
                  </AdminTableCell>
                  <AdminTableCell className="text-xs text-text-muted">
                    <pre className="max-w-xs truncate">{JSON.stringify(event.properties)}</pre>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTable>
          ) : (
            <div className="py-8 text-center text-sm text-text-muted">No data has been collected yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
