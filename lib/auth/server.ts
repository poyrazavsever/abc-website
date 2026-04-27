import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLoginHref } from "@/lib/auth/shared";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireAuthenticatedUser(nextPath: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(getLoginHref(nextPath));
  }

  return user;
}
