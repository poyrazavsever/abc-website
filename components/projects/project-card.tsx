import Link from "next/link";

import { Badge, Card, CardContent } from "@/components/ui";
import { roleLabels } from "@/components/admin/admin-shell";
import type { ProjectWithOwner } from "@/lib/types/profile";

export const categoryLabels: Record<string, string> = {
  ai: "AI",
  saas: "SaaS",
  mobile: "Mobile",
  social_impact: "Social Impact",
  other: "Other",
};

export const statusLabels: Record<string, string> = {
  idea: "Idea",
  mvp: "MVP",
  live: "Live",
  pivot: "Pivot",
  closed: "Closed",
};

function getProjectUrl(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

function getStatusVariant(status: ProjectWithOwner["status"]) {
  switch (status) {
    case "live":
      return "success";
    case "mvp":
      return "info";
    case "pivot":
      return "warning";
    case "closed":
      return "secondary";
    case "idea":
    default:
      return "default";
  }
}

export function ProjectCard({ project }: { project: ProjectWithOwner }) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 shadow-[0_18px_40px_rgb(0_0_0_/_0.22)] transition duration-200 hover:-translate-y-1 hover:border-white/16 hover:bg-white/7 hover:shadow-[0_22px_46px_rgb(0_0_0_/_0.3)]">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <CardContent className="flex h-full flex-col space-y-5 p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={getStatusVariant(project.status)}
                  className="border-white/10 bg-white/8 text-white"
                >
                  {statusLabels[project.status] ?? project.status}
                </Badge>
                <Badge className="border-white/10 bg-white/6 text-white/72">
                  {categoryLabels[project.category] ?? project.category}
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {project.name}
                </h3>
                <p className="text-sm text-white/50">
                  by {project.owner.fullName} •{" "}
                  {roleLabels[project.owner.role] ?? "Builder"}
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-white/46">
              ABC
            </div>
          </div>

          <p className="line-clamp-4 min-h-24 text-sm leading-6 text-white/68">
            {project.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <Link
            href={`/builders/${project.ownerId}`}
            className="text-sm font-medium text-white/72 transition hover:text-white"
          >
            Open builder profile
          </Link>
          {project.url ? (
            <Link
              href={getProjectUrl(project.url)}
              target="_blank"
              className="text-sm font-medium text-accent-300 transition hover:text-accent-200"
            >
              Visit project
            </Link>
          ) : (
            <span className="text-sm font-medium text-white/34">Link not added yet</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
