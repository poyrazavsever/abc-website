import type { Metadata } from "next";
import { requireAuthenticatedUser } from "@/lib/auth/server";
import { getProfileSnapshotForUser } from "@/lib/services/profile.service";
import { SectionHeader } from "@/components/ui";
import { CardGenerator } from "@/components/linkedin-card/card-generator";

export const metadata: Metadata = {
  title: "LinkedIn Kartı Oluştur",
  description: "Ankara Build Club profilinizle LinkedIn'de paylaşılabilir görsel ve metin oluşturun.",
};

export default async function LinkedInCardPage() {
  const user = await requireAuthenticatedUser("/dashboard/linkedin-card");
  const { profile } = await getProfileSnapshotForUser(user);

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          eyebrow="Dashboard"
          heading="LinkedIn Kartı Oluştur"
          description="Profil verilerinizi kullanarak LinkedIn'de ağınızla paylaşabileceğiniz profesyonel bir duyuru kartı hazırlayın."
        />

        <CardGenerator profile={profile} />
      </div>
    </main>
  );
}
