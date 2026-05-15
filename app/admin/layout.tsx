import type { ReactNode } from "react";

import { AdminNavLink, adminNavItems } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";
import { Footer } from "@/components/layout/footer";
import { requireAdminAccess } from "@/lib/auth/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminAccess();

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="sticky top-0 z-50 bg-neutral-900 text-white">
        <AdminTopBar />
        <div className="mx-auto grid min-h-20 w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-2xl font-bold tracking-wide text-white">
              ABC Admin
            </p>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-1"
            aria-label="Admin navigation"
          >
            {adminNavItems.map((item) => (
              <AdminNavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
          <div className="flex justify-start lg:justify-end">
            <AdminNavLink href="/profile" label="Profile Page" />
          </div>
        </div>
      </header>
      <div className="relative z-40 w-full rounded-t-[2rem] bg-background">
        <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
