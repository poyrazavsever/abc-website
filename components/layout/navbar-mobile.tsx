"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import type { NavItem, NavigationData } from "@/lib/types/navigation";

type NavbarMobileProps = {
  cta: NavigationData["cta"];
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
};

export function NavbarMobile({
  cta,
  isOpen,
  items,
  onClose,
}: NavbarMobileProps) {
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
            aria-label="Mobil menuyu kapat"
            className="absolute inset-0 bg-text/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-soft">
                Menu
              </p>
              <button
                type="button"
                aria-label="Mobil menuyu kapat"
                className="rounded-md p-2 text-text transition hover:bg-surface-muted"
                onClick={onClose}
              >
                <Icon icon="lucide:x" className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-5 py-6">
              {items.map((item) => {
                if (!item.groups?.length) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href ?? "#"}
                      className="block rounded-md border border-transparent px-3 py-2 text-base font-semibold text-text transition hover:border-border hover:bg-surface-muted"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <details
                    key={item.id}
                    className="rounded-lg border border-border bg-surface-muted"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold text-text">
                      {item.label}
                      <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                    </summary>
                    <div className="space-y-4 border-t border-border px-4 py-4">
                      {item.groups.map((group) => (
                        <div key={group.title} className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                            {group.title}
                          </p>
                          <div className="space-y-1">
                            {group.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="block rounded-md px-2 py-2 text-sm text-text-muted transition hover:bg-surface hover:text-text"
                                onClick={onClose}
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
                  </details>
                );
              })}

              <Link
                href={cta.href}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-700"
                onClick={onClose}
              >
                {cta.label}
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
