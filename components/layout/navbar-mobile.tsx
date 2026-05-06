"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import { LogoutButton } from "@/components/auth/logout-button";
import { cn } from "@/lib/utils/cn";
import type {
  NavItem,
  NavigationChapter,
  NavigationData,
} from "@/lib/types/navigation";

type NavbarMobileProps = {
  auth: NavigationData["auth"];
  cta: NavigationData["cta"];
  chapters: NavigationChapter[];
  hasSurface: boolean;
  isAuthenticated: boolean;
  isOpen: boolean;
  items: NavItem[];
  profileHref: string;
  onClose: () => void;
};

export function NavbarMobile({
  auth,
  cta,
  chapters,
  hasSurface,
  isAuthenticated,
  isOpen,
  items,
  profileHref,
  onClose,
}: NavbarMobileProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [panelDirection, setPanelDirection] = useState<1 | -1>(1);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeItemId) ?? null,
    [items, activeItemId],
  );

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPanelDirection(1);
      setActiveItemId(null);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => {
    setPanelDirection(1);
    setActiveItemId(null);
    onClose();
  };

  const handleBack = () => {
    if (activeItemId) {
      setPanelDirection(-1);
      setActiveItemId(null);
      return;
    }

    closeMenu();
  };

  const openItemPanel = (itemId: string) => {
    setPanelDirection(1);
    setActiveItemId(itemId);
  };

  const isSubPanel = Boolean(activeItem);
  const headerTitle = activeItem?.label ?? "Menu";
  const panelClass = hasSurface
    ? "border-border bg-surface/88"
    : "border-white/10 bg-[#0f0f10]/96 text-text-inverse";
  const overlayClass = hasSurface ? "bg-text/22" : "bg-text/14";
  const panelHoverClass = hasSurface
    ? "hover:bg-surface-muted"
    : "hover:bg-white/10";

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 lg:hidden"
          aria-hidden={!isOpen}
        >
          <motion.button
            type="button"
            aria-label="Close mobile menu"
            className={cn("absolute inset-0", overlayClass)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closeMenu}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className={cn(
              "absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-hidden border-l backdrop-blur-xl",
              panelClass,
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between border-b px-5 py-4",
                hasSurface ? "border-border" : "border-white/20",
              )}
            >
              <p
                className={cn(
                  "text-sm font-semibold",
                  hasSurface ? "text-text-soft" : "text-white/60",
                )}
              >
                {headerTitle}
              </p>

              {isSubPanel ? (
                <button
                  type="button"
                  aria-label="Go back"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition",
                    hasSurface ? "text-text" : "text-white",
                    panelHoverClass,
                  )}
                  onClick={handleBack}
                >
                  <Icon icon="lucide:arrow-left" className="h-4 w-4" />
                  <span>Go back</span>
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Close mobile menu"
                  className={cn(
                    "rounded-md p-2 transition",
                    hasSurface ? "text-text" : "text-white",
                    panelHoverClass,
                  )}
                  onClick={closeMenu}
                >
                  <Icon icon="lucide:x" className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence
                mode="wait"
                custom={panelDirection}
                initial={false}
              >
                {activeItem ? (
                  <motion.div
                    key={`panel-${activeItem.id}`}
                    custom={panelDirection}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute inset-0 overflow-y-auto px-5 py-6"
                  >
                    <div className="space-y-6">
                      {activeItem.groups?.map((group) => (
                        <div key={group.title} className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                            {group.title}
                          </p>
                          <div className="space-y-1">
                            {group.links.map((link, index) => (
                              <Link
                                key={`${group.title}-${link.href}-${index}`}
                                href={link.href}
                                className={cn(
                                  "block rounded-md border border-transparent px-3 py-2 text-sm font-medium transition",
                                  hasSurface
                                    ? "text-text-muted hover:text-text"
                                    : "text-white/78 hover:text-white",
                                  hasSurface
                                    ? "hover:border-border hover:bg-surface-muted"
                                    : "hover:border-white/25 hover:bg-white/10",
                                )}
                                onClick={closeMenu}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noreferrer" : undefined}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="panel-root"
                    custom={panelDirection}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-between overflow-y-auto px-5 py-6"
                  >
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                          Network
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {chapters.map((chapter) => {
                            const chapterClass = hasSurface
                              ? "text-text"
                              : "text-white/72";

                            if (chapter.href) {
                              return (
                                <Link
                                  key={chapter.label}
                                  href={chapter.href}
                                  className={cn(
                                    "inline-flex items-center gap-2 px-0 py-1 text-xs font-medium transition",
                                    chapterClass,
                                  )}
                                  onClick={closeMenu}
                                  target={
                                    chapter.external ? "_blank" : undefined
                                  }
                                  rel={
                                    chapter.external ? "noreferrer" : undefined
                                  }
                                >
                                  <span>{chapter.label}</span>
                                  {chapter.badge ? (
                                    <span
                                      className={cn(
                                        "text-[10px] font-medium uppercase tracking-[0.14em]",
                                        hasSurface
                                          ? "text-text-soft"
                                          : "text-white/55",
                                      )}
                                    >
                                      {chapter.badge}
                                    </span>
                                  ) : null}
                                </Link>
                              );
                            }

                            return (
                              <span
                                key={chapter.label}
                                className={cn(
                                  "inline-flex items-center gap-2 px-0 py-1 text-xs font-medium",
                                  hasSurface
                                    ? "text-text-soft"
                                    : "text-white/60",
                                )}
                              >
                                <span>{chapter.label}</span>
                                {chapter.badge ? (
                                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                                    {chapter.badge}
                                  </span>
                                ) : null}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {items.map((item) => {
                          if (!item.groups?.length) {
                            return (
                              <Link
                                key={item.id}
                                href={item.href ?? "#"}
                                className={cn(
                                  "block rounded-lg px-4 py-3.5 text-[17px] font-semibold tracking-tight transition-all",
                                  hasSurface ? "text-text" : "text-white",
                                  hasSurface
                                    ? "hover:bg-surface-muted active:bg-surface-muted/70"
                                    : "hover:bg-white/10 active:bg-white/15",
                                )}
                                onClick={closeMenu}
                              >
                                {item.label}
                              </Link>
                            );
                          }

                          return (
                            <button
                              key={item.id}
                              type="button"
                              className={cn(
                                "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-[17px] font-semibold tracking-tight transition-all",
                                hasSurface ? "text-text" : "text-white",
                                hasSurface
                                  ? "hover:bg-surface-muted active:bg-surface-muted/70"
                                  : "hover:bg-white/10 active:bg-white/15",
                              )}
                              onClick={() => openItemPanel(item.id)}
                            >
                              <span>{item.label}</span>
                              <Icon
                                icon="lucide:chevron-right"
                                className="h-5 w-5 text-white/50"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8 pb-4">
                      {isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                          <Link
                            href={profileHref}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
                              hasSurface
                                ? "bg-primary text-primary-foreground shadow-sm hover:brightness-110"
                                : "bg-white text-brand-black shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:bg-white/95",
                            )}
                            onClick={closeMenu}
                          >
                            <Icon icon="lucide:user" className="h-4 w-4" />
                            {auth.profileLabel}
                          </Link>
                          <LogoutButton
                            block
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
                              hasSurface
                                ? "border-border text-text hover:bg-surface-muted"
                                : "border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10",
                            )}
                            onComplete={closeMenu}
                          >
                            <span className="flex items-center gap-2">
                              <Icon icon="lucide:log-out" className="h-4 w-4" />
                              <span>{auth.logoutLabel}</span>
                            </span>
                          </LogoutButton>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Link
                            href={cta.href}
                            className={cn(
                              "flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold shadow-lg transition-all active:scale-[0.98]",
                              hasSurface
                                ? "bg-primary text-primary-foreground hover:brightness-110"
                                : "bg-linear-to-r from-highlight via-accent to-secondary text-primary-foreground hover:brightness-110 shadow-[0_8px_30px_rgb(213,82,163,0.3)]",
                            )}
                            onClick={closeMenu}
                          >
                            {cta.label}
                          </Link>
                          <Link
                            href={auth.loginHref}
                            className={cn(
                              "flex w-full items-center justify-center rounded-xl border px-5 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
                              hasSurface
                                ? "border-border bg-surface text-text hover:bg-surface-muted"
                                : "border-white/10 bg-transparent text-white hover:bg-white/5",
                            )}
                            onClick={closeMenu}
                          >
                            {auth.loginLabel}
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const panelVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
  }),
};
