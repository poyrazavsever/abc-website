import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  getAuthContinueHref,
  getAuthErrorMessage,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function buildLoginRedirect(
  request: NextRequest,
  next: string | null,
  message: string,
) {
  const url = new URL("/login", request.url);
  const safeNext = getSafeNextPath(next);

  if (safeNext) {
    url.searchParams.set("next", safeNext);
  }

  url.searchParams.set("message", message);

  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next");

  if (!code) {
    return buildLoginRedirect(request, next, "callback");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return buildLoginRedirect(
      request,
      next,
      "Session could not be created because Supabase auth settings are missing.",
    );
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return buildLoginRedirect(
      request,
      next,
      getAuthErrorMessage(error?.message),
    );
  }

  return NextResponse.redirect(
    new URL(getAuthContinueHref(next), request.url),
  );
}
