import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Aurora } from "@/components/ui/aurora";

type PremiumRegisterShellProps = {
  children: ReactNode;
};

export function PremiumRegisterShell({
  children,
}: PremiumRegisterShellProps) {
  return (
    <main className="min-h-screen w-full bg-brand-black p-4 lg:p-6">
      <div className="relative flex min-h-[calc(100vh-2rem)] flex-col rounded-[2.75rem] border border-white/8 bg-brand-black shadow-[0_28px_90px_rgb(0_0_0_/_0.42)] lg:min-h-[calc(100vh-3rem)]">
        <div className="absolute left-6 top-6 z-20 hidden lg:block">
          <Link
            href="/register?message=Destek%20ekibi%20ile%20iletisime%20gecin."
            className="text-sm text-white/45 transition-colors hover:text-white/80"
          >
            Need help?
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-3 lg:flex-row">
          <section className="flex w-full rounded-[2.5rem] border border-white/8 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.02),rgb(255_255_255_/_0.01))] lg:w-1/2">
            <div className="flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-24">
              {children}
            </div>
          </section>

          <section className="relative flex min-h-[20rem] w-full items-stretch justify-end overflow-hidden rounded-[2.5rem] border border-white/8 bg-brand-black lg:h-full lg:w-1/2">
            <div className="absolute inset-0 -z-10 bg-brand-black">
              <Aurora
                colorStops={["#462c7d", "#462c7d", "#370c3d"]}
                blend={0.6}
                amplitude={1.2}
                speed={0.4}
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.02),rgb(0_0_0_/_0.34))]" />

            <div className="relative z-10 flex h-full w-full items-center justify-center p-8 sm:p-10">
              <div className="rounded-[2rem] border border-white/10 bg-black/12 px-8 py-6 shadow-[0_20px_60px_rgb(0_0_0_/_0.24)] backdrop-blur-md">
                <Image
                  src="/brand/logo.png"
                  alt="Ankara Build Club"
                  width={260}
                  height={78}
                  priority
                  className="h-auto w-[11rem] object-contain sm:w-[14rem]"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
