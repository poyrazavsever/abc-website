import Link from "next/link";
import type { ReactNode } from "react";

import { Badge, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type {
  AdminContentType,
  AdminMetric,
  AdminStatus,
  BuilderMatchStatus,
  BuilderRole,
  BuilderTag,
  OperationStatus,
  SeriousBuilderApplicationStatus,
} from "@/lib/types/admin";

export const adminNavItems = [
  { href: "/admin", label: "Genel" },
  { href: "/admin/analytics", label: "Analitik" },
  { href: "/admin/content", label: "Rapor" },
  { href: "/admin/builders", label: "Builder" },
  { href: "/admin/badges", label: "Rozet" },
  { href: "/admin/matching", label: "Eşleştirme" },
  { href: "/admin/operations", label: "Operasyon" },
] as const;

export const roleLabels: Record<BuilderRole, string> = {
  developer: "Yazılımcı",
  designer: "Tasarımcı",
  sales: "Sales",
  product: "Ürün",
  student: "Öğrenci",
  other: "Diğer",
};

export const tagLabels: Record<BuilderTag, string> = {
  cofounder_looking: "Co-founder arıyor",
  idea_looking: "Fikir arıyor",
  team_complete: "Takım tamamlandı",
  just_building: "Sadece build ediyor",
};

export const contentTypeLabels: Record<AdminContentType, string> = {
  report: "Rapor",
};

export const statusLabels: Record<AdminStatus, string> = {
  draft: "Taslak",
  published: "Yayında",
  archived: "Arşiv",
};

export const applicationStatusLabels: Record<
  SeriousBuilderApplicationStatus,
  string
> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export const operationStatusLabels: Record<OperationStatus, string> = {
  queued: "Sırada",
  running: "Çalışıyor",
  completed: "Tamamlandı",
  failed: "Hatalı",
};

export const matchStatusLabels: Record<BuilderMatchStatus, string> = {
  active: "Aktif",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

export function statusVariant(
  status:
    | AdminStatus
    | SeriousBuilderApplicationStatus
    | OperationStatus
    | BuilderMatchStatus
    | "banned"
    | "active",
) {
  if (status === "published" || status === "approved" || status === "completed") {
    return "success";
  }

  if (status === "pending" || status === "running" || status === "queued") {
    return "warning";
  }

  if (
    status === "rejected" ||
    status === "failed" ||
    status === "banned" ||
    status === "cancelled"
  ) {
    return "danger";
  }

  if (status === "active") {
    return "info";
  }

  return "default";
}

export function AdminPageHeader({
  eyebrow = "Admin",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-semibold tracking-wide text-primary">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold text-text">{title}</h1>
        <p className="text-sm leading-6 text-text-muted">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminMetricGrid({ metrics }: { metrics: AdminMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} elevated={false}>
          <CardContent className="space-y-2">
            <p className="text-sm font-medium text-text-muted">{metric.label}</p>
            <p className="text-3xl font-semibold text-text">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminTable({
  columns,
  children,
}: {
  columns: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-xs">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-soft text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold tracking-wide text-text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminTableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-4 align-top", className)}>{children}</td>;
}

export function AdminEmptyState({ children }: { children: ReactNode }) {
  return (
    <Card elevated={false}>
      <CardContent className="text-sm text-text-muted">{children}</CardContent>
    </Card>
  );
}

export function AdminNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        active
          ? "bg-white/10 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

export function StatusBadge({
  label,
  status,
}: {
  label: string;
  status:
    | AdminStatus
    | SeriousBuilderApplicationStatus
    | OperationStatus
    | BuilderMatchStatus
    | "banned"
    | "active";
}) {
  return <Badge variant={statusVariant(status)}>{label}</Badge>;
}
