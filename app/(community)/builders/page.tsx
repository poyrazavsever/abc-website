import type { Metadata } from "next";

import { BuilderDirectory } from "@/components/builders/builder-directory";
import { getPublicBuilders } from "@/lib/services/builders.service";

export const metadata: Metadata = {
  title: "Builders",
  description: "Ankara Build Club toplulugundaki kayitli builder dizini.",
};

export default async function BuildersPage() {
  const builders = await getPublicBuilders();

  return (
    <main className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 bg-brand-black px-4 py-10 sm:px-6 lg:px-8">
      <BuilderDirectory initialBuilders={builders} />
    </main>
  );
}
