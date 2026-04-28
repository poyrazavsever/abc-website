import type { Metadata } from "next";
import { requireAuthenticatedUser } from "@/lib/auth/server";
import { listProjectsForUser } from "@/lib/services/profile.service";
import { SectionHeader } from "@/components/ui";
import { ProjectManager } from "@/components/projects/project-manager";

export const metadata: Metadata = {
  title: "Projelerim",
  description: "Ankara Build Club üzerinde kayıtlı projelerinizi yönetin.",
};

export default async function MyProjectsPage() {
  const user = await requireAuthenticatedUser("/dashboard/my-projects");
  const projects = await listProjectsForUser(user.id);

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <SectionHeader
          eyebrow="Dashboard"
          heading="Projelerim"
          description="Sisteme kayıtlı projelerinizi buradan ekleyebilir, güncelleyebilir veya silebilirsiniz. Eklediğiniz projeler vitrinde görünecektir."
        />

        <ProjectManager initialProjects={projects} />
      </div>
    </main>
  );
}
