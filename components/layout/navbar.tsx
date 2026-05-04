"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

import { NavbarMegaMenu } from "@/components/layout/navbar-mega-menu";
import { NavbarMobile } from "@/components/layout/navbar-mobile";
import {
  NavbarUserMenu,
  type NavbarProfileSummary,
} from "@/components/layout/navbar-user-menu";
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
  const [authProfile, setAuthProfile] = useState<NavbarProfileSummary | null>(null);
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
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("avatar_url, full_name")
          .eq("id", user.id)
          .maybeSingle();

        if (isMounted) {
          setAuthProfile({
            avatarUrl:
              typeof data?.avatar_url === "string" ? data.avatar_url : null,
            fullName:
              typeof data?.full_name === "string" ? data.full_name : null,
          });
        }
      } else {
        setAuthProfile(null);
      }
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
      setAuthProfile(null);
      setIsAuthReady(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [hasSupabaseAuthEnv]);

  const desktopTextClass = "text-text-inverse";
  const defaultBrandImageUrl = navigationData.brand.imgUrl?.trim() ?? "";
  const brandImageUrl = defaultBrandImageUrl;
  const hasBrandImage = brandImageUrl.length > 0;
  const isAuthenticated = isAuthReady && Boolean(authUser);
  const profileHref = authUser ? `/profile/${authUser.id}` : getProfileHref(authUser);

  return (
    <motion.header
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn("sticky inset-x-0 top-0 z-40", overlay && "-mb-10")}
      onMouseLeave={() => setActiveMenuId(null)}
    >
      <div className="relative">
        <div
          className={cn(
            "relative z-10 rounded-b-[1.8rem] border-b border-white/8 bg-brand-black text-text-inverse transition-all duration-300 sm:rounded-b-[2rem]",
            isScrolled && "bg-brand-black/96",
          )}
        >
          <div
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/12"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            <div
              className={cn(
                "flex items-center justify-between gap-6 transition-[height,padding] duration-300",
                isScrolled ? "h-18 py-3.5" : "h-22 py-4",
              )}
            >
              <div className="flex min-w-0 items-center gap-6 xl:gap-8">
                <Link
                  href={navigationData.brand.href}
                  className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
                >
                  {hasBrandImage ? (
                    <Image
                      src={brandImageUrl}
                      alt={navigationData.brand.label}
                      width={192}
                      height={48}
                      className={cn(
                        "w-auto transition-[height] duration-300",
                        isScrolled ? "h-8 sm:h-9" : "h-9 sm:h-11",
                      )}
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

                <nav className="hidden lg:block" aria-label="Main navigation">
                  <ul className="flex items-center gap-1.5">
                    {navigationData.items.map((item) => {
                      const hasDropdown = Boolean(item.groups?.length);

                      if (!hasDropdown) {
                        return (
                          <li key={item.id}>
                            <Link
                              href={item.href ?? "#"}
                              className={cn(
                                "rounded-full px-4 py-2 text-sm font-semibold transition",
                                desktopTextClass,
                                "hover:bg-white/10 hover:text-white",
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
                              "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                              desktopTextClass,
                              "hover:bg-white/10 hover:text-white",
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
                  authUser ? (
                    <NavbarUserMenu
                      user={authUser}
                      profile={authProfile}
                      profileHref={profileHref}
                    />
                  ) : null
                ) : (
                  <>
                    <Link
                      href={navigationData.auth.loginHref}
                      className={cn(
                        "hidden rounded-full border border-white/12 px-4 py-2.5 text-sm font-semibold transition lg:inline-flex",
                        desktopTextClass,
                        "bg-white text-brand-black hover:bg-white/90",
                      )}
                    >
                      {navigationData.auth.loginLabel}
                    </Link>
                    <Link
                      href={navigationData.cta.href}
                      className={cn(
                        "hidden rounded-full border border-highlight/30 bg-linear-to-r from-highlight via-accent to-secondary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition lg:inline-flex hover:brightness-110",
                      )}
                    >
                      {navigationData.cta.label}
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  aria-label="Open mobile menu"
                  aria-expanded={isMobileMenuOpen}
                  className={cn(
                    "inline-flex rounded-full p-2.5 text-text-inverse transition hover:bg-white/10 lg:hidden",
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
          hasSurface={false}
          item={activeMenuItem}
          isOpen={Boolean(activeMenuItem)}
          onClose={() => setActiveMenuId(null)}
        />
      </div>

      <NavbarMobile
        auth={navigationData.auth}
        cta={navigationData.cta}
        hasSurface={false}
        isAuthenticated={isAuthenticated}
        isOpen={isMobileMenuOpen}
        items={navigationData.items}
        profileHref={profileHref}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
}
