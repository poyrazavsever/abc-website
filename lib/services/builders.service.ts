import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BuilderRole, BuilderTag } from "@/lib/types/admin";
import type { ProjectCategory, ProjectRecord, ProjectStatus } from "@/lib/types/profile";

type BuilderProfileRecord = {
  id: string;
  fullName: string;
  city: string;
  role: BuilderRole;
  bio: string;
  linkedinUrl: string | null;
  publicEmail: string | null;
  activeTag: BuilderTag | null;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PublicBuilderDirectoryProfile = {
  id: string;
  fullName: string;
  city: string;
  role: BuilderRole;
  bio: string;
  linkedinUrl: string | null;
  publicEmail: string | null;
  activeTag: BuilderTag | null;
  badgeCount: number;
  projectCount: number;
  createdAt: string;
};

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

function asNullableBuilderTag(value: unknown): BuilderTag | null {
  switch (value) {
    case "cofounder_looking":
    case "idea_looking":
    case "team_complete":
    case "just_building":
      return value;
    default:
      return null;
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

function mapProfileRow(row: unknown): BuilderProfileRecord {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    fullName: asString(record.full_name),
    city: asString(record.city),
    role: asBuilderRole(record.role),
    bio: asString(record.bio),
    linkedinUrl: asNullableString(record.linkedin_url),
    publicEmail: asNullableString(record.public_email),
    activeTag: asNullableBuilderTag(record.active_tag),
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
    technologies: asNullableString(record.technologies),
    imagePath: asNullableString(record.image_path),
    imageUrl: asNullableString(record.image_url),
    status: asProjectStatus(record.status),
    createdAt: asString(record.created_at),
    updatedAt: asString(record.updated_at),
  };
}

export async function getPublicBuilders(): Promise<PublicBuilderDirectoryProfile[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const [profilesResult, projectsResult, userBadgesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id, full_name, city, role, bio, linkedin_url, public_email, active_tag, onboarding_completed, created_at, updated_at",
      )
      .order("created_at", { ascending: false }),
    supabase.from("projects").select("id, owner_id"),
    supabase.from("user_badges").select("id, user_id"),
  ]);

  if (profilesResult.error || projectsResult.error || userBadgesResult.error) {
    console.error("Error fetching public builders:", {
      profiles: profilesResult.error,
      projects: projectsResult.error,
      userBadges: userBadgesResult.error,
    });
    return [];
  }

  const projectCountByOwner = new Map<string, number>();
  for (const row of projectsResult.data ?? []) {
    const project = mapProjectRow(row);
    projectCountByOwner.set(
      project.ownerId,
      (projectCountByOwner.get(project.ownerId) ?? 0) + 1,
    );
  }

  const badgeCountByOwner = new Map<string, number>();
  for (const row of userBadgesResult.data ?? []) {
    const ownerId = asString(asRecord(row).user_id);
    if (!ownerId) {
      continue;
    }

    badgeCountByOwner.set(ownerId, (badgeCountByOwner.get(ownerId) ?? 0) + 1);
  }

  return (profilesResult.data ?? [])
    .map(mapProfileRow)
    .filter((profile) => profile.onboardingCompleted && profile.fullName.trim().length > 0)
    .map((profile) => ({
      id: profile.id,
      fullName: profile.fullName,
      city: profile.city,
      role: profile.role,
      bio: profile.bio,
      linkedinUrl: profile.linkedinUrl,
      publicEmail: profile.publicEmail,
      activeTag: profile.activeTag,
      badgeCount: badgeCountByOwner.get(profile.id) ?? 0,
      projectCount: projectCountByOwner.get(profile.id) ?? 0,
      createdAt: profile.createdAt,
    }))
    .sort((left, right) => left.fullName.localeCompare(right.fullName, "tr"));
}

export async function getPublicBuilderProfile(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (profileError || !profileData) {
    return null;
  }

  const { data: projectsData } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", id)
    .order("created_at", { ascending: true });

  const profile = mapProfileRow(profileData);
  const projects = (projectsData ?? []).map(mapProjectRow);

  return {
    profile,
    projects,
    isSeriousBuilder: false,
    badgeCount: 0,
  };
}
