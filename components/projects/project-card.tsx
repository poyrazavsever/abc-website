import Link from "next/link";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { roleLabels } from "@/components/admin/admin-shell";
import type { ProjectWithOwner } from "@/lib/types/profile";

export const categoryLabels: Record<string, string> = {
  ai: "Yapay Zeka (AI)",
  saas: "SaaS",
  mobile: "Mobil Uygulama",
  social_impact: "Sosyal Etki",
  other: "Diğer",
};

export const statusLabels: Record<string, string> = {
  idea: "Fikir",
  mvp: "MVP",
  live: "Canlı",
  pivot: "Pivot",
  closed: "Kapalı",
};

export function ProjectCard({ project }: { project: ProjectWithOwner }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="text-xs">
              {project.owner.fullName} • {roleLabels[project.owner.role] ?? "Builder"}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge variant="secondary" className="text-xs">{statusLabels[project.status] ?? project.status}</Badge>
            <Badge variant="outline" className="text-[10px]">{categoryLabels[project.category] ?? project.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-4">
        <p className="line-clamp-3 text-sm text-text-soft">
          {project.description}
        </p>
        
        {project.url && (
          <Link
            href={project.url.startsWith("http") ? project.url : `https://${project.url}`}
            target="_blank"
            className="text-sm font-medium text-primary hover:underline"
          >
            Projeyi İncele &rarr;
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
