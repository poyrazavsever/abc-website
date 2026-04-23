"use server";

import { revalidatePath } from "next/cache";

import {
  createManualBuilderMatch,
  decideSeriousBuilderApplication,
  setBuilderBanStatus,
  setSeriousBuilderStatus,
} from "@/lib/services/admin.service";
import { requireAdminAccess } from "@/lib/auth/admin";

type AdminMutationResult = {
  ok: boolean;
  error?: string;
};

function getRequiredString(formData: FormData, key: string, maxLength = 500) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required.`);
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length > maxLength) {
    throw new Error(`${key} is too long.`);
  }

  return trimmedValue;
}

function assertAdminMutation(result: AdminMutationResult) {
  if (!result.ok) {
    throw new Error(result.error ?? "Admin operation failed.");
  }
}

function revalidateAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/builders");
  revalidatePath("/admin/matching");
  revalidatePath("/admin/operations");
}

export async function banBuilderAction(formData: FormData) {
  await requireAdminAccess();

  const builderId = getRequiredString(formData, "builderId");
  const reason = getRequiredString(formData, "reason", 280);

  const result = await setBuilderBanStatus({
    builderId,
    isBanned: true,
    reason,
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function unbanBuilderAction(formData: FormData) {
  await requireAdminAccess();

  const builderId = getRequiredString(formData, "builderId");

  const result = await setBuilderBanStatus({
    builderId,
    isBanned: false,
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function markSeriousBuilderAction(formData: FormData) {
  await requireAdminAccess();

  const builderId = getRequiredString(formData, "builderId");

  const result = await setSeriousBuilderStatus({
    builderId,
    isSeriousBuilder: true,
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function removeSeriousBuilderAction(formData: FormData) {
  await requireAdminAccess();

  const builderId = getRequiredString(formData, "builderId");

  const result = await setSeriousBuilderStatus({
    builderId,
    isSeriousBuilder: false,
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function approveSeriousBuilderApplicationAction(formData: FormData) {
  await requireAdminAccess();

  const applicationId = getRequiredString(formData, "applicationId");
  const builderId = getRequiredString(formData, "builderId");

  const result = await decideSeriousBuilderApplication({
    applicationId,
    builderId,
    status: "approved",
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function rejectSeriousBuilderApplicationAction(formData: FormData) {
  await requireAdminAccess();

  const applicationId = getRequiredString(formData, "applicationId");
  const builderId = getRequiredString(formData, "builderId");

  const result = await decideSeriousBuilderApplication({
    applicationId,
    builderId,
    status: "rejected",
  });
  assertAdminMutation(result);
  revalidateAdmin();
}

export async function createManualBuilderMatchAction(formData: FormData) {
  await requireAdminAccess();

  const firstBuilderId = getRequiredString(formData, "firstBuilderId");
  const secondBuilderId = getRequiredString(formData, "secondBuilderId");
  const note = getRequiredString(formData, "note", 500);
  const matchedBy = getRequiredString(formData, "matchedBy", 120);

  if (firstBuilderId === secondBuilderId) {
    throw new Error("Aynı builder kendiyle eşleştirilemez.");
  }

  const result = await createManualBuilderMatch({
    firstBuilderId,
    secondBuilderId,
    note,
    matchedBy,
  });
  assertAdminMutation(result);
  revalidateAdmin();
}
