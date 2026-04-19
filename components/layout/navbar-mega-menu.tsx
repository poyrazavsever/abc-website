import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/types/navigation";

type NavbarMegaMenuProps = {
  item: NavItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export function NavbarMegaMenu({ item, isOpen, onClose }: NavbarMegaMenuProps) {
  const hasDropdown = isOpen && Boolean(item?.groups?.length);
  const groups = item?.groups ?? [];

  return (
    <AnimatePresence>
      {hasDropdown && item ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-40 w-full"
          onMouseLeave={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-screen border-y border-border bg-surface shadow-md"
          >
            <Container className="py-8">
              <div
                className={cn(
                  "grid gap-10",
                  item.featured
                    ? "grid-cols-1 xl:grid-cols-[minmax(0,2fr)_20rem]"
                    : "grid-cols-1",
                )}
              >
                <div
                  className={cn(
                    "grid gap-8",
                    groups.length > 1
                      ? "md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1",
                  )}
                >
                  {groups.map((group) => (
                    <div key={group.title} className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-text-soft">
                        {group.title}
                      </h3>
                      <ul className="space-y-2">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="flex items-start gap-3 rounded-md border border-transparent p-3 transition hover:border-border hover:bg-surface-muted"
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noreferrer" : undefined}
                            >
                              {link.icon ? (
                                <Icon
                                  icon={link.icon}
                                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                />
                              ) : null}
                              <span className="space-y-1">
                                <span className="block text-sm font-semibold text-text">
                                  {link.label}
                                </span>
                                {link.description ? (
                                  <span className="block text-sm text-text-muted">
                                    {link.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {item.featured ? (
                  <Link
                    href={item.featured.href}
                    className="rounded-xl border border-border bg-surface-soft p-6 transition hover:bg-surface"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                      {item.featured.icon ? (
                        <Icon icon={item.featured.icon} className="h-4 w-4" />
                      ) : null}
                      <span>On Plana Cikan</span>
                    </div>
                    <h3 className="text-lg font-semibold text-text">
                      {item.featured.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.featured.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Incele
                      <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                    </span>
                  </Link>
                ) : null}
              </div>
            </Container>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
