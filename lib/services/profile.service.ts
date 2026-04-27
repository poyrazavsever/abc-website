import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

import { getAuthUserMetadata } from "@/lib/auth/shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BuilderRole } from "@/lib/types/admin";
import type {
  OnboardingProjectInput,
  OnboardingStep,
  ProfileRecord,
  ProjectCategory,
  ProjectRecord,
  ProjectStatus,
} from "@/lib/types/profile";
import { getOptionalEnv } from "@/lib/utils/env";

let profileAdminClient: SupabaseClient | null | undefined;

function getProfileAdminClient() {
  if (profileAdminClient !== undefined) {
    return profileAdminClient;
  }

  const supabaseUrl = getOptionalEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    profileAdminClient = null;
    return profileAdminClient;
  }

  profileAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return profileAdminClient;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asBuilderRole(value: unknown): BuilderRole {
  switch (value) {
    case "developer":
    case "designer":
    case "sales":
    case "product":
    case "student":
    case "other":
      return value;
    default:
      return "other";
  }
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

function toNullableText(value: string | null | undefined) {
  const trimmedValue = value?.trim() ?? "";
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function isValidEmail(value: string | null | undefined) {
  if (!value) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value);
}

function isValidLinkedInUrl(value: string | null | undefined) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return /^([a-z0-9-]+\.)?linkedin\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

function mapProfileRow(row: unknown): ProfileRecord {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    fullName: asString(record.full_name),
    city: asString(record.city),
    role: asBuilderRole(record.role),
    bio: asString(record.bio),
    linkedinUrl: asNullableString(record.linkedin_url),
    publicEmail: asNullableString(record.public_email),
    onboardingCompleted: asBoolean(record.onboarding_completed),
    createdAt: asString(record.created_at),
    updatedAt: asString(record.updated_at),
  };
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

function getSupabaseErrorMessage(
  message: string | null | undefined,
  fallback: string,
) {
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

async function selectProfileById(userId: string) {
  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(getSupabaseErrorMessage(error.message, "Profil okunamadi."));
  }

  return data ? mapProfileRow(data) : null;
}

export async function listProjectsForUser(userId: string) {
  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Projeler okunamadi."),
    );
  }

  return (data ?? []).map(mapProjectRow);
}

export async function ensureProfileForUser(
  user: Pick<User, "id" | "user_metadata">,
) {
  const existingProfile = await selectProfileById(user.id);

  if (existingProfile) {
    return existingProfile;
  }

  const metadata = getAuthUserMetadata(user);
  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: metadata.full_name ?? "",
      city: "",
      role: "other",
      bio: "",
      linkedin_url: null,
      public_email: null,
      onboarding_completed: false,
    })
    .select("*")
    .single();

  if (error) {
    // A concurrent request may have already created the row.
    const concurrentProfile = await selectProfileById(user.id);

    if (concurrentProfile) {
      return concurrentProfile;
    }

    throw new Error(getSupabaseErrorMessage(error.message, "Profil olusturulamadi."));
  }

  return mapProfileRow(data);
}

export async function getProfileSnapshotForUser(
  user: Pick<User, "id" | "user_metadata">,
) {
  const [profile, projects] = await Promise.all([
    ensureProfileForUser(user),
    listProjectsForUser(user.id),
  ]);

  return { profile, projects };
}

export function isProfileBasicsComplete(profile: ProfileRecord | null | undefined) {
  return Boolean(
    profile &&
      profile.fullName.trim().length >= 2 &&
      profile.fullName.trim().length <= 80 &&
      profile.city.trim().length > 0 &&
      profile.role.trim().length > 0,
  );
}

export function isProfileDetailsComplete(
  profile: ProfileRecord | null | undefined,
) {
  return Boolean(
    profile &&
      profile.bio.trim().length >= 20 &&
      profile.bio.trim().length <= 500 &&
      isValidLinkedInUrl(profile.linkedinUrl) &&
      isValidEmail(profile.publicEmail),
  );
}

export function getIncompleteOnboardingStep(
  profile: ProfileRecord | null | undefined,
): OnboardingStep | null {
  if (!isProfileBasicsComplete(profile)) {
    return "profile";
  }

  if (!isProfileDetailsComplete(profile)) {
    return "details";
  }

  if (!profile?.onboardingCompleted) {
    return "project";
  }

  return null;
}

export function isOnboardingProfileComplete(
  profile: ProfileRecord | null | undefined,
) {
  return getIncompleteOnboardingStep(profile) === null;
}

export async function saveProfileBasics(
  user: Pick<User, "id" | "user_metadata">,
  input: {
    city: string;
    fullName: string;
    role: BuilderRole;
  },
) {
  await ensureProfileForUser(user);

  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.fullName.trim(),
      city: input.city.trim(),
      role: input.role,
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Profil bilgileri kaydedilemedi."),
    );
  }

  return mapProfileRow(data);
}

export async function saveProfileDetails(
  user: Pick<User, "id" | "user_metadata">,
  input: {
    bio: string;
    linkedinUrl: string;
    publicEmail: string;
  },
) {
  await ensureProfileForUser(user);

  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      bio: input.bio.trim(),
      linkedin_url: toNullableText(input.linkedinUrl),
      public_email: toNullableText(input.publicEmail),
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Profil detaylari kaydedilemedi."),
    );
  }

  return mapProfileRow(data);
}

export async function replaceProjectsForUser(
  userId: string,
  projects: OnboardingProjectInput[],
) {
  const supabase = await getSupabaseClientOrThrow();

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("owner_id", userId);

  if (deleteError) {
    throw new Error(
      getSupabaseErrorMessage(deleteError.message, "Projeler guncellenemedi."),
    );
  }

  if (projects.length === 0) {
    return [] as ProjectRecord[];
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(
      projects.map((project) => ({
        owner_id: userId,
        name: project.name.trim(),
        description: project.description.trim(),
        category: project.category,
        url: toNullableText(project.url),
        status: "idea",
      })),
    )
    .select("*");

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Projeler kaydedilemedi."),
    );
  }

  return (data ?? []).map(mapProjectRow).sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );
}

export async function markProfileOnboardingComplete(
  user: Pick<User, "id" | "user_metadata">,
) {
  await ensureProfileForUser(user);

  const supabase = await getSupabaseClientOrThrow();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      onboarding_completed: true,
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Onboarding tamamlanamadi."),
    );
  }

  return mapProfileRow(data);
}

export async function syncAuthProfileMetadata(
  user: Pick<User, "id" | "user_metadata">,
  profile: Pick<ProfileRecord, "fullName" | "onboardingCompleted">,
) {
  const adminClient = getProfileAdminClient();

  if (!adminClient) {
    return;
  }

  const currentMetadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  const { error } = await adminClient.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...currentMetadata,
      full_name: profile.fullName,
      onboarding_completed: profile.onboardingCompleted,
    },
  });

  if (error) {
    throw new Error(
      getSupabaseErrorMessage(error.message, "Auth profili senkronize edilemedi."),
    );
  }
}
