"use server";

import { revalidatePath } from "next/cache";
import { assignManualBadge, incrementAttendance } from "@/lib/services/badges.service";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getCurrentUser } from "@/lib/auth/server";

export async function addAttendanceAction(formData: FormData): Promise<void> {
  await requireAdminAccess();

  const builderId = formData.get("builderId") as string;
  if (!builderId) throw new Error("Builder ID is required");

  const result = await incrementAttendance(builderId);
  
  if (!result.success) {
    throw new Error(result.error || "Attendance could not be added");
  }

  revalidatePath("/admin/badges");
  revalidatePath("/dashboard/profile");
  revalidatePath(`/profile/${builderId}`);
  revalidatePath(`/profile/${builderId}`);
}

export async function assignBadgeAction(formData: FormData): Promise<void> {
  await requireAdminAccess();
  const adminUser = await getCurrentUser();
  if (!adminUser) throw new Error("Unauthorized action");

  const builderId = formData.get("builderId") as string;
  const badgeId = formData.get("badgeId") as string;
  const note = formData.get("note") as string;

  if (!builderId || !badgeId) throw new Error("Missing information");

  const result = await assignManualBadge(builderId, badgeId, note, adminUser.id);
  
  if (!result.success) {
    throw new Error(result.error || "Badge could not be assigned");
  }

  revalidatePath("/admin/badges");
  revalidatePath("/dashboard/profile");
  revalidatePath(`/profile/${builderId}`);
  revalidatePath(`/profile/${builderId}`);
}
