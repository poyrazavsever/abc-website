import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon_url: string | null;
  trigger: string;
  required_attendance_count: number;
  is_manual: boolean;
  status: string;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  assigned_by: string | null;
  note: string | null;
  created_at: string;
  badge: Badge;
};

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("user_badges")
    .select(`
      *,
      badge:badges(*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user badges:", error);
    return [];
  }

  return (data as any) || [];
}

export async function incrementAttendance(userId: string): Promise<{ success: boolean; error?: string }> {
  // Use service role to bypass RLS for updating profiles and assigning badges automatically
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase configuration is missing" };
  }

  const { createClient } = await import("@supabase/supabase-js");
  const adminClient = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // 1. Get current count
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("event_attendance_count")
    .eq("id", userId)
    .single();

  if (profileError) {
    return { success: false, error: "Profil bulunamadı." };
  }

  const newCount = (profile.event_attendance_count || 0) + 1;

  // 2. Update count
  const { error: updateError } = await adminClient
    .from("profiles")
    .update({ event_attendance_count: newCount })
    .eq("id", userId);

  if (updateError) {
    return { success: false, error: "Katılım güncellenemedi." };
  }

  // 3. Check for automatic badges
  const { data: autoBadges } = await adminClient
    .from("badges")
    .select("*")
    .eq("is_manual", false)
    .eq("status", "published")
    .lte("required_attendance_count", newCount);

  if (autoBadges && autoBadges.length > 0) {
    // 4. Get existing user badges
    const { data: existingBadges } = await adminClient
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", userId);

    const existingBadgeIds = new Set(existingBadges?.map((b) => b.badge_id) || []);

    const newBadgesToAssign = autoBadges.filter((b) => !existingBadgeIds.has(b.id));

    if (newBadgesToAssign.length > 0) {
      const inserts = newBadgesToAssign.map((b) => ({
        user_id: userId,
        badge_id: b.id,
        note: "Otomatik atama (Etkinlik Katılımı)",
      }));

      await adminClient.from("user_badges").insert(inserts);
    }
  }

  return { success: true };
}

export async function assignManualBadge(
  userId: string,
  badgeId: string,
  note: string,
  assignedBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase configuration is missing" };
  }

  const { createClient } = await import("@supabase/supabase-js");
  const adminClient = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await adminClient.from("user_badges").insert({
    user_id: userId,
    badge_id: badgeId,
    assigned_by: assignedBy,
    note: note,
  });

  if (error) {
    // Check for unique constraint violation
    if (error.code === '23505') {
      return { success: false, error: "Kullanıcı bu rozete zaten sahip." };
    }
    return { success: false, error: "Rozet atanamadı." };
  }

  return { success: true };
}
