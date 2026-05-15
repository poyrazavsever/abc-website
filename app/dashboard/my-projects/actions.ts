"use server";

import { requireAuthenticatedUser } from "@/lib/auth/server";
import { createProject, updateProject, deleteProject } from "@/lib/services/projects.service";
import type { OnboardingProjectInput, ProjectStatus } from "@/lib/types/profile";
import { revalidatePath } from "next/cache";

export async function addProjectAction(input: OnboardingProjectInput & { status?: ProjectStatus }) {
  try {
    const user = await requireAuthenticatedUser("/dashboard/my-projects");
    await createProject(user, input);
    revalidatePath("/dashboard/my-projects");
    revalidatePath("/dashboard/profile");
    revalidatePath("/projects");
    return { status: "success", message: "Project added successfully." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Project could not be added." };
  }
}

export async function editProjectAction(projectId: string, input: Partial<OnboardingProjectInput> & { status?: ProjectStatus }) {
  try {
    const user = await requireAuthenticatedUser("/dashboard/my-projects");
    await updateProject(user, projectId, input);
    revalidatePath("/dashboard/my-projects");
    revalidatePath("/dashboard/profile");
    revalidatePath("/projects");
    return { status: "success", message: "Project updated." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Project could not be updated." };
  }
}

export async function deleteProjectAction(projectId: string) {
  try {
    const user = await requireAuthenticatedUser("/dashboard/my-projects");
    await deleteProject(user, projectId);
    revalidatePath("/dashboard/my-projects");
    revalidatePath("/dashboard/profile");
    revalidatePath("/projects");
    return { status: "success", message: "Project deleted." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Project could not be deleted." };
  }
}
