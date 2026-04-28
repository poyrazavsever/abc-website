import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProfileSnapshotForUser } from "@/lib/services/profile.service";

export async function getPublicBuilderProfile(id: string) {
  // Try to use getProfileSnapshotForUser since it fetches both profile and projects
  // But wait, getProfileSnapshotForUser creates a profile if it doesn't exist, we just want to fetch public data
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

  // Map to the types from profile.service.ts
  // Since we are not exposing mapProfileRow, we can just return the raw data and cast it, or better, we can export mapProfileRow from profile.service.ts
  // Let's just return the raw data mapped properly
  const profile = {
    id: profileData.id,
    fullName: profileData.full_name,
    city: profileData.city,
    role: profileData.role,
    bio: profileData.bio,
    linkedinUrl: profileData.linkedin_url,
    publicEmail: profileData.public_email,
    activeTag: profileData.active_tag,
    onboardingCompleted: profileData.onboarding_completed,
    createdAt: profileData.created_at,
    updatedAt: profileData.updated_at,
  };

  const projects = (projectsData ?? []).map((project) => ({
    id: project.id,
    ownerId: project.owner_id,
    name: project.name,
    description: project.description,
    category: project.category,
    url: project.url,
    status: project.status,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  }));

  return {
    profile,
    projects,
    isSeriousBuilder: false, // Will be implemented in matching module
    badgeCount: 0, // Will be implemented in badge module
  };
}
