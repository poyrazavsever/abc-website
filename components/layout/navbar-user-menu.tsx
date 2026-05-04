"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { LogoutButton } from "@/components/auth/logout-button";
import { AddProjectModal } from "@/components/projects/add-project-modal";
import { getAuthUserMetadata } from "@/lib/auth/shared";
import { navigationData } from "@/lib/data/navigation.data";

export type NavbarProfileSummary = {
  avatarUrl: string | null;
  fullName: string | null;
};

type NavbarUserMenuProps = {
  profile: NavbarProfileSummary | null;
  profileHref: string;
  user: User;
};

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  const normalizedName = name?.trim();

  if (normalizedName) {
    const parts = normalizedName.split(/\s+/u);
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`
      .trim()
      .slice(0, 2)
      .toLocaleUpperCase("tr");
  }

  return (email?.[0] ?? "U").toLocaleUpperCase("tr");
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 7.25A2.75 2.75 0 1 0 10 12.75 2.75 2.75 0 0 0 10 7.25Z" />
      <path d="M15.5 10a5.5 5.5 0 0 0-.08-.92l1.34-1.03-1.35-2.34-1.57.64a5.4 5.4 0 0 0-1.58-.92L12.02 3H9.32l-.24 2.43a5.4 5.4 0 0 0-1.58.92l-1.57-.64-1.35 2.34 1.34 1.03a5.5 5.5 0 0 0 0 1.84l-1.34 1.03 1.35 2.34 1.57-.64c.48.4 1.01.7 1.58.92L9.32 17h2.7l.24-2.43a5.4 5.4 0 0 0 1.58-.92l1.57.64 1.35-2.34-1.34-1.03c.05-.3.08-.61.08-.92Z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 10.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z" />
      <path d="M4.75 16.25a5.25 5.25 0 0 1 10.5 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 4.5v11" />
      <path d="M4.5 10h11" />
    </svg>
  );
}

function UserAvatar({
  avatarUrl,
  email,
  name,
}: {
  avatarUrl: string | null;
  email: string | null;
  name: string | null;
}) {
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const initials = getInitials(name, email);
  const shouldShowImage = Boolean(avatarUrl) && failedAvatarUrl !== avatarUrl;

  return (
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/14 bg-[#101011] text-xs font-semibold text-white">
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl ?? ""}
          alt={name || email || "Kullanıcı"}
          className="h-full w-full object-cover"
          onError={() => setFailedAvatarUrl(avatarUrl)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}

function MenuItem({
  children,
  href,
  icon,
  onClick,
}: {
  children: string;
  href?: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  const className =
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-white/78 transition hover:bg-white/[0.06] hover:text-white";

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function NavbarUserMenu({
  profile,
  profileHref,
  user,
}: NavbarUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const metadata = getAuthUserMetadata(user);
  const fullName = profile?.fullName || metadata.full_name || "Kullanıcı";
  const email = user.email ?? null;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative hidden lg:block">
      <button
        type="button"
        className="rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/32"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <UserAvatar
          avatarUrl={profile?.avatarUrl ?? null}
          email={email}
          name={fullName}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-white/12 bg-[#0b0b0c] p-1.5 text-white"
            role="menu"
          >
            <div className="px-3 py-3">
              <p className="truncate text-sm font-medium text-white">{fullName}</p>
              <p className="mt-0.5 truncate text-xs text-white/42">{email}</p>
            </div>

            <div className="space-y-0.5">
              <MenuItem href={profileHref} icon={<ProfileIcon />} onClick={() => setIsOpen(false)}>
                Profil
              </MenuItem>
              <MenuItem href="/settings" icon={<SettingsIcon />} onClick={() => setIsOpen(false)}>
                Ayarlar
              </MenuItem>
            </div>

            <div className="my-1.5 border-t border-white/10" />

            <MenuItem
              icon={<PlusIcon />}
              onClick={() => {
                setIsOpen(false);
                setIsProjectModalOpen(true);
              }}
            >
              Proje Ekle
            </MenuItem>

            <div className="my-1.5 border-t border-white/10" />

            <LogoutButton
              variant="ghost"
              className="h-auto w-full justify-start rounded-md border-0 bg-transparent px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10 hover:text-red-200"
              onComplete={() => setIsOpen(false)}
            >
              {navigationData.auth.logoutLabel}
            </LogoutButton>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
