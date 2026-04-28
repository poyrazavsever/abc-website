"use server";

import { revalidatePath } from "next/cache";
import { assignManualBadge, incrementAttendance } from "@/lib/services/badges.service";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getCurrentUser } from "@/lib/auth/server";

export async function addAttendanceAction(formData: FormData): Promise<void> {
  await requireAdminAccess();

  const builderId = formData.get("builderId") as string;
  if (!builderId) throw new Error("Builder ID gerekli");

  const result = await incrementAttendance(builderId);
  
  if (!result.success) {
    throw new Error(result.error || "Katılım eklenemedi");
  }

  revalidatePath("/admin/badges");
  revalidatePath("/dashboard/profile");
  revalidatePath(`/builders/${builderId}`);
}

export async function assignBadgeAction(formData: FormData): Promise<void> {
  await requireAdminAccess();
  const adminUser = await getCurrentUser();
  if (!adminUser) throw new Error("Yetkisiz islem");

  const builderId = formData.get("builderId") as string;
  const badgeId = formData.get("badgeId") as string;
  const note = formData.get("note") as string;

  if (!builderId || !badgeId) throw new Error("Eksik bilgi");

  const result = await assignManualBadge(builderId, badgeId, note, adminUser.id);
  
  if (!result.success) {
    throw new Error(result.error || "Rozet atanamadı");
  }

  revalidatePath("/admin/badges");
  revalidatePath("/dashboard/profile");
  revalidatePath(`/builders/${builderId}`);
}
