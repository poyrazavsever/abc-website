import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function trackServerEvent(eventName: string, properties?: Record<string, unknown>) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("analytics_events").insert({
      event_name: eventName,
      user_id: user?.id || null,
      properties: properties || {},
    });
  } catch (err) {
    console.error("Server analytics error:", err);
  }
}
