import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth/server";

export default async function DashboardProfilePage() {
  const user = await requireAuthenticatedUser("/dashboard/profile");
  redirect(`/profile/${user.id}`);
}
