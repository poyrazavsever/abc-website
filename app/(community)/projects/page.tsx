import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/services/projects.service";
import { ProjectDirectory } from "@/components/projects/project-directory";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Ankara Build Club üyelerinin üzerinde çalıştığı projeler.",
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Topluluk Projeleri</h1>
          <p className="mt-4 text-lg text-text-soft">
            Ankara Build Club üyelerinin üzerinde çalıştığı, geliştirdiği veya canlıya aldığı projeleri keşfedin.
          </p>
        </div>

        <ProjectDirectory initialProjects={projects} />
      </div>
    </main>
  );
}
