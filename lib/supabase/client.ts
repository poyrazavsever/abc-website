import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getEnv } from "@/lib/utils/env";

let supabaseClient: SupabaseClient | undefined;

export function createSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );

  return supabaseClient;
}
