import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth/server";

export default async function SettingsPage() {
  const user = await requireAuthenticatedUser("/settings");
  redirect(`/profile/${user.id}`);
}
