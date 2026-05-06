import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
import type { BuilderRole } from "@/lib/types/admin";
import type {
  OnboardingProjectInput,
  ProjectCategory,
  ProjectRecord,
  ProjectStatus,
  ProjectWithOwner,
} from "@/lib/types/profile";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asProjectCategory(value: unknown): ProjectCategory {
  switch (value) {
    case "ai":
    case "saas":
    case "mobile":
    case "social_impact":
    case "other":
      return value;
    default:
      return "other";
  }
}

function asProjectStatus(value: unknown): ProjectStatus {
  switch (value) {
    case "idea":
    case "mvp":
    case "live":
    case "pivot":
    case "closed":
      return value;
    default:
      return "idea";
  }
}

function mapProjectRow(row: unknown): ProjectRecord {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    ownerId: asString(record.owner_id),
    name: asString(record.name),
    description: asString(record.description),
    category: asProjectCategory(record.category),
    url: asNullableString(record.url),
    status: asProjectStatus(record.status),
    createdAt: asString(record.created_at),
    updatedAt: asString(record.updated_at),
  };
}

function getSupabaseErrorMessage(message: string | null | undefined, fallback: string) {
  const trimmedMessage = message?.trim();
  return trimmedMessage && trimmedMessage.length > 0 ? trimmedMessage : fallback;
}

async function getSupabaseClientOrThrow() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase baglantisi su anda kullanilamiyor.");
  }
  return supabase;
}

export async function getPublicProjects(): Promise<ProjectWithOwner[]> {
  const supabase = await getSupabaseClientOrThrow();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(getSupabaseErrorMessage(error.message, "Projeler okunamadı."));
  }

  const projects = (data ?? []).map(mapProjectRow);
  const ownerIds = Array.from(new Set(projects.map((project) => project.ownerId).filter(Boolean)));

  const ownersById = new Map<string, { fullName: string; role: BuilderRole }>();

  if (ownerIds.length > 0) {
    const { data: owners, error: ownersError } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .in("id", ownerIds);

    if (ownersError) {
      throw new Error(getSupabaseErrorMessage(ownersError.message, "Proje sahipleri okunamadı."));
    }

    for (const owner of owners ?? []) {
      const ownerRecord = asRecord(owner);

      ownersById.set(asString(ownerRecord.id), {
        fullName: asString(ownerRecord.full_name, "Bilinmeyen Kullanıcı"),
        role: asString(ownerRecord.role, "other") as BuilderRole,
      });
    }
  }

  return projects.map((project) => {
    return {
      ...project,
      owner: ownersById.get(project.ownerId) ?? {
        fullName: "Bilinmeyen Kullanıcı",
        role: "other",
      },
    };
  });
}

export async function createProject(user: Pick<User, "id">, input: OnboardingProjectInput & { status?: ProjectStatus }) {
  const supabase = await getSupabaseClientOrThrow();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      owner_id: user.id,
      name: input.name.trim(),
      description: input.description.trim(),
      category: input.category,
      url: asNullableString(input.url),
      status: input.status ?? "idea",
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(getSupabaseErrorMessage(error.message, "Proje oluşturulamadı."));
  }

  return mapProjectRow(data);
}

export async function updateProject(
  user: Pick<User, "id">,
  projectId: string,
  input: Partial<OnboardingProjectInput> & { status?: ProjectStatus }
) {
  const supabase = await getSupabaseClientOrThrow();

  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name.trim();
  if (input.description !== undefined) updates.description = input.description.trim();
  if (input.category !== undefined) updates.category = input.category;
  if (input.url !== undefined) updates.url = asNullableString(input.url);
  if (input.status !== undefined) updates.status = input.status;

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .eq("owner_id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(getSupabaseErrorMessage(error.message, "Proje güncellenemedi."));
  }

  return mapProjectRow(data);
}

export async function deleteProject(user: Pick<User, "id">, projectId: string) {
  const supabase = await getSupabaseClientOrThrow();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("owner_id", user.id);

  if (error) {
    throw new Error(getSupabaseErrorMessage(error.message, "Proje silinemedi."));
  }
}
