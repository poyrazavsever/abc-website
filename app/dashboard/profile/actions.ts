"use server";

import { requireAuthenticatedUser } from "@/lib/auth/server";
import { saveProfileTag } from "@/lib/services/profile.service";
import type { BuilderTag } from "@/lib/types/admin";

export async function updateActiveTagAction(activeTag: BuilderTag | null) {
  try {
    const user = await requireAuthenticatedUser("/dashboard/profile");
    await saveProfileTag(user, activeTag);
    return { status: "success", message: "Profile updated." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Unknown error" };
  }
}
