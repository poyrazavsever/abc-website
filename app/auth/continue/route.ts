import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resolveAuthenticatedRedirect } from "@/lib/auth/server";

export async function GET(request: NextRequest) {
  const target = await resolveAuthenticatedRedirect(
    request.nextUrl.searchParams.get("next"),
  );

  return NextResponse.redirect(new URL(target, request.url));
}
