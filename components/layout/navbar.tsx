"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { NavbarMegaMenu } from "@/components/layout/navbar-mega-menu";
import { NavbarMobile } from "@/components/layout/navbar-mobile";
import { Container } from "@/components/shared/container";
import { navigationData } from "@/lib/data/navigation.data";
import { cn } from "@/lib/utils/cn";

type NavbarProps = {
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
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

  const hasSurface = !overlay || isScrolled;
  const desktopTextClass = hasSurface ? "text-text" : "text-text-inverse";
  const brandImageUrl = navigationData.brand.imgUrl?.trim() ?? "";
  const hasBrandImage = brandImageUrl.length > 0;

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

              <div className="flex items-center gap-2">
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
          item={activeMenuItem}
          isOpen={Boolean(activeMenuItem)}
          onClose={() => setActiveMenuId(null)}
        />
      </div>

      <NavbarMobile
        cta={navigationData.cta}
        isOpen={isMobileMenuOpen}
        items={navigationData.items}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
}
