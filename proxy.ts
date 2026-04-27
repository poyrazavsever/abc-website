import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  getDefaultAuthedHref,
  getLoginHref,
  getOnboardingHref,
  getPostAuthRedirectTarget,
  isOnboardingComplete,
} from "@/lib/auth/shared";

function getOptionalEnv(name: string) {
  const value = process.env[name];

  return value && value.trim() !== "" ? value : undefined;
}

function isProtectedPath(pathname: string) {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/onboarding" ||
    pathname.startsWith("/onboarding/")
  );
}

function isAuthPage(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

function isOnboardingPath(pathname: string) {
  return pathname === "/onboarding" || pathname.startsWith("/onboarding/");
}

function withSupabaseCookies(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });

  return target;
}

export async function proxy(request: NextRequest) {
  const supabaseUrl = getOptionalEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getOptionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const requestedPath = `${pathname}${request.nextUrl.search}`;

  if (!user && isProtectedPath(pathname)) {
    return withSupabaseCookies(
      response,
      NextResponse.redirect(new URL(getLoginHref(requestedPath), request.url)),
    );
  }

  if (!user) {
    return response;
  }

  if (isAuthPage(pathname)) {
    return withSupabaseCookies(
      response,
      NextResponse.redirect(
        new URL(
          getPostAuthRedirectTarget(
            user,
            request.nextUrl.searchParams.get("next"),
          ),
          request.url,
        ),
      ),
    );
  }

  if (!isOnboardingComplete(user)) {
    if (isProtectedPath(pathname) && !isOnboardingPath(pathname)) {
      return withSupabaseCookies(
        response,
        NextResponse.redirect(new URL(getOnboardingHref(), request.url)),
      );
    }

    return response;
  }

  if (isOnboardingPath(pathname)) {
    return withSupabaseCookies(
      response,
      NextResponse.redirect(new URL(getDefaultAuthedHref(), request.url)),
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/onboarding/:path*",
    "/login",
    "/register",
    "/auth/callback",
  ],
};
