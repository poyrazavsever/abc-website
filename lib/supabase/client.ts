import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getOptionalEnv } from "@/lib/utils/env";

let supabaseClient: SupabaseClient | null | undefined;
const supabaseUrl = getOptionalEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getOptionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export function createSupabaseClient(): SupabaseClient | null {
  if (supabaseClient !== undefined) {
    return supabaseClient;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  );

  return supabaseClient;
}
