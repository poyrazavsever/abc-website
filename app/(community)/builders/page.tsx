import type { Metadata } from "next";

import { BuilderDirectory } from "@/components/builders/builder-directory";
import { getPublicBuilders } from "@/lib/services/builders.service";

export const metadata: Metadata = {
  title: "Builders",
  description: "Ankara Build Club topluluğundaki kayıtlı builder dizini.",
};

export default async function BuildersPage() {
  const builders = await getPublicBuilders();

  return (
    <main className="relative left-1/2 -mb-10 -mt-28 min-h-screen w-screen -translate-x-1/2 bg-brand-black px-4 pt-28 pb-10 sm:px-6 lg:px-8">
      <BuilderDirectory initialBuilders={builders} />
    </main>
  );
}
