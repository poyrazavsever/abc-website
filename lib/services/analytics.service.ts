import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AnalyticsEvent = {
  id: string;
  event_name: string;
  user_id: string | null;
  properties: Record<string, any>;
  created_at: string;
};

export type AnalyticsOverview = {
  totalPageViews: number;
  totalRegistrations: number;
  totalOnboardings: number;
  recentEvents: AnalyticsEvent[];
};

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const supabase = await createSupabaseServerClient();
  
  if (!supabase) {
    throw new Error("Supabase is unavailable.");
  }

  // Admin access check is assumed to be handled by layout/middleware or RLS.
  // Actually, RLS policy for reading requires service_role or admin.
  // We'll use the service_role key to fetch analytics data for admin panel.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
     return {
        totalPageViews: 0,
        totalRegistrations: 0,
        totalOnboardings: 0,
        recentEvents: [],
     };
  }

  const { createClient } = await import("@supabase/supabase-js");
  const adminSupabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const [pageViewsRes, registrationsRes, onboardingsRes, recentEventsRes] = await Promise.all([
    adminSupabaseClient.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_name", "page_view"),
    adminSupabaseClient.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_name", "user_registered"),
    adminSupabaseClient.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_name", "onboarding_completed"),
    adminSupabaseClient.from("analytics_events").select("*").order("created_at", { ascending: false }).limit(20)
  ]);

  return {
    totalPageViews: pageViewsRes.count || 0,
    totalRegistrations: registrationsRes.count || 0,
    totalOnboardings: onboardingsRes.count || 0,
    recentEvents: recentEventsRes.data || [],
  };
}
