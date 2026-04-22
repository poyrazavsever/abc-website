import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function parseAllowlist(value: string | undefined) {
  return new Set(
    value
      ?.split(",")
      .map((email) => email.trim().toLocaleLowerCase("en"))
      .filter(Boolean) ?? [],
  );
}

export async function requireAdminAccess() {
  const allowlist = parseAllowlist(process.env.ADMIN_EMAIL_ALLOWLIST);

  if (allowlist.size === 0 && process.env.NODE_ENV !== "production") {
    return;
  }

  if (allowlist.size === 0) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLocaleLowerCase("en");

  if (!email || !allowlist.has(email)) {
    notFound();
  }
}
