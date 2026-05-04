import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth/server";

export default async function ProfileRedirectPage() {
  const user = await requireAuthenticatedUser("/profile");
  redirect(`/profile/${user.id}`);
}
