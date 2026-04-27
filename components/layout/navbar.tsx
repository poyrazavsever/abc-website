"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

import { LogoutButton } from "@/components/auth/logout-button";
import { NavbarMegaMenu } from "@/components/layout/navbar-mega-menu";
import { NavbarMobile } from "@/components/layout/navbar-mobile";
import { Container } from "@/components/shared/container";
import { getProfileHref } from "@/lib/auth/shared";
import { navigationData } from "@/lib/data/navigation.data";
import { createSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";

type NavbarProps = {
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const hasSupabaseAuthEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(!hasSupabaseAuthEnv);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeMenuItem = useMemo(
    () => navigationData.items.find((item) => item.id === activeMenuId) ?? null,
    [activeMenuId],
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenuId(null);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const supabase = createSupabaseClient();

    if (!supabase) {
      return () => {
        isMounted = false;
      };
    }

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setAuthUser(user);
      setIsAuthReady(true);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      setAuthUser(session?.user ?? null);
      setIsAuthReady(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [hasSupabaseAuthEnv]);

  const hasSurface = !overlay || isScrolled;
  const desktopTextClass = hasSurface ? "text-text" : "text-text-inverse";
  const brandImageUrl = navigationData.brand.imgUrl?.trim() ?? "";
  const hasBrandImage = brandImageUrl.length > 0;
  const isAuthenticated = isAuthReady && Boolean(authUser);
  const profileHref = getProfileHref(authUser);

  return (
    <motion.header
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn("sticky inset-x-0 top-0 z-40", overlay && "-mb-20")}
      onMouseLeave={() => setActiveMenuId(null)}
    >
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: hasSurface ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 border-b border-border bg-surface/85 shadow-xs backdrop-blur-xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <Container>
            <div className="flex h-20 items-center justify-between gap-6">
              <div className="flex min-w-0 items-center gap-6 xl:gap-8">
                <Link
                  href={navigationData.brand.href}
                  className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
                >
                  {hasBrandImage ? (
                    <Image
                      src={brandImageUrl}
                      alt={navigationData.brand.label}
                      width={168}
                      height={40}
                      className="h-8 w-auto"
                      priority
                    />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-semibold uppercase tracking-[0.18em] transition-colors",
                        desktopTextClass,
                      )}
                    >
                      {navigationData.brand.label}
                    </span>
                  )}
                </Link>

                <nav className="hidden lg:block" aria-label="Ana navigasyon">
                  <ul className="flex items-center gap-1">
                    {navigationData.items.map((item) => {
                      const hasDropdown = Boolean(item.groups?.length);

                      if (!hasDropdown) {
                        return (
                          <li key={item.id}>
                            <Link
                              href={item.href ?? "#"}
                              className={cn(
                                "rounded-md px-3 py-2 text-sm font-medium transition",
                                desktopTextClass,
                                hasSurface
                                  ? "hover:bg-surface-muted"
                                  : "hover:bg-white/15",
                              )}
                              onMouseEnter={() => setActiveMenuId(null)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      }

                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition",
                              desktopTextClass,
                              hasSurface
                                ? "hover:bg-surface-muted"
                                : "hover:bg-white/15",
                            )}
                            aria-expanded={activeMenuId === item.id}
                            onMouseEnter={() => setActiveMenuId(item.id)}
                            onFocus={() => setActiveMenuId(item.id)}
                          >
                            {item.label}
                            <Icon
                              icon="lucide:chevron-down"
                              className={cn(
                                "h-4 w-4 transition-transform",
                                activeMenuId === item.id && "rotate-180",
                              )}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={profileHref}
                      className={cn(
                        "hidden rounded-md px-3 py-2 text-sm font-semibold transition lg:inline-flex",
                        desktopTextClass,
                        hasSurface
                          ? "hover:bg-surface-muted"
                          : "hover:bg-white/15",
                      )}
                    >
                      {navigationData.auth.profileLabel}
                    </Link>
                    <LogoutButton
                      variant="ghost"
                      className={cn(
                        "hidden lg:inline-flex",
                        hasSurface
                          ? ""
                          : "text-text-inverse hover:bg-white/15 hover:text-text-inverse",
                      )}
                    >
                      {navigationData.auth.logoutLabel}
                    </LogoutButton>
                  </>
                ) : (
                  <>
                    <Link
                      href={navigationData.auth.loginHref}
                      className={cn(
                        "hidden rounded-md px-3 py-2 text-sm font-semibold transition lg:inline-flex",
                        desktopTextClass,
                        hasSurface
                          ? "hover:bg-surface-muted"
                          : "hover:bg-white/15",
                      )}
                    >
                      {navigationData.auth.loginLabel}
                    </Link>
                    <Link
                      href={navigationData.cta.href}
                      className={cn(
                        "hidden rounded-md px-4 py-2 text-sm font-semibold transition lg:inline-flex",
                        hasSurface
                          ? "bg-primary text-primary-foreground hover:bg-primary-700"
                          : "bg-surface/95 text-primary hover:bg-surface",
                      )}
                    >
                      {navigationData.cta.label}
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  aria-label="Mobil menuyu ac"
                  aria-expanded={isMobileMenuOpen}
                  className={cn(
                    "inline-flex rounded-md p-2 transition lg:hidden",
                    hasSurface
                      ? "text-text hover:bg-surface-muted"
                      : "text-text-inverse hover:bg-white/15",
                  )}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Icon icon="lucide:menu" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Container>
        </div>

        <NavbarMegaMenu
          hasSurface={hasSurface}
          item={activeMenuItem}
          isOpen={Boolean(activeMenuItem)}
          onClose={() => setActiveMenuId(null)}
        />
      </div>

      <NavbarMobile
        auth={navigationData.auth}
        cta={navigationData.cta}
        hasSurface={hasSurface}
        isAuthenticated={isAuthenticated}
        isOpen={isMobileMenuOpen}
        items={navigationData.items}
        profileHref={profileHref}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
}
