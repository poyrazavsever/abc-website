import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/types/navigation";

type NavbarMegaMenuProps = {
  hasSurface: boolean;
  item: NavItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export function NavbarMegaMenu({
  hasSurface,
  item,
  isOpen,
  onClose,
}: NavbarMegaMenuProps) {
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
            className={cn(
              "w-screen border-y shadow-xl backdrop-blur-2xl",
              hasSurface
                ? "border-border/60 bg-surface/90"
                : "border-white/10 bg-[#0f0f10]/94 text-text-inverse",
            )}
          >
            <Container className="py-10">
              <div
                className={cn(
                  "grid gap-12",
                  item.featured
                    ? "grid-cols-1 xl:grid-cols-[minmax(0,2fr)_22rem]"
                    : "grid-cols-1",
                )}
              >
                <div
                  className={cn(
                    "grid gap-10",
                    groups.length > 1
                      ? "md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1",
                  )}
                >
                  {groups.map((group) => (
                    <div key={group.title} className="space-y-5">
                      <h3
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider",
                          hasSurface ? "text-text-soft/80" : "text-white/55",
                        )}
                      >
                        {group.title}
                      </h3>
                      <ul className="space-y-3">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-start gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-200",
                                hasSurface
                                  ? "hover:border-border/50 hover:bg-surface-muted/80 hover:shadow-sm"
                                  : "hover:border-white/20 hover:bg-white/10",
                              )}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noreferrer" : undefined}
                            >
                              {link.icon ? (
                                <div className={cn(
                                  "flex h-9 w-9 items-center justify-center rounded-lg",
                                  hasSurface ? "bg-primary/5 text-primary" : "bg-white/10 text-white"
                                )}>
                                  <Icon
                                    icon={link.icon}
                                    className="h-5 w-5 shrink-0"
                                  />
                                </div>
                              ) : null}
                              <span className="space-y-1">
                                <span
                                  className={cn(
                                    "block text-sm font-semibold",
                                    hasSurface ? "text-text" : "text-white",
                                  )}
                                >
                                  {link.label}
                                </span>
                                {link.description ? (
                                  <span
                                    className={cn(
                                      "block text-xs leading-relaxed",
                                      hasSurface
                                        ? "text-text-muted/90"
                                        : "text-white/62",
                                    )}
                                  >
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
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 group shadow-sm",
                      hasSurface
                        ? "border-border/60 bg-gradient-to-br from-surface-soft to-surface hover:bg-surface hover:shadow-md"
                        : "border-white/15 bg-gradient-to-br from-white/5 to-white/10 hover:bg-white/15",
                    )}
                  >
                    <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-5 text-primary pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      {item.featured.icon ? (
                        <Icon icon={item.featured.icon} className="h-40 w-40" />
                      ) : null}
                    </div>
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        {item.featured.icon ? (
                          <Icon icon={item.featured.icon} className="h-4 w-4" />
                        ) : null}
                        <span>Öne Çıkan</span>
                      </div>
                      <h3
                        className={cn(
                          "text-lg font-bold tracking-tight transition-colors group-hover:text-primary",
                          hasSurface ? "text-text" : "text-white",
                        )}
                      >
                        {item.featured.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-sm leading-relaxed",
                          hasSurface ? "text-text-muted/90" : "text-white/68",
                        )}
                      >
                        {item.featured.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        İncele
                        <Icon icon="lucide:arrow-right" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
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
