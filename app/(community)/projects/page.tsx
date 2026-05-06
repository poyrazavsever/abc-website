import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/services/projects.service";
import { ProjectDirectory } from "@/components/projects/project-directory";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects that Ankara Build Club members are building.",
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="relative left-1/2 -mb-10 -mt-28 min-h-screen w-screen -translate-x-1/2 bg-brand-black px-4 pt-28 pb-10 sm:px-6 lg:px-8">
      <ProjectDirectory initialProjects={projects} />
    </main>
  );
}
