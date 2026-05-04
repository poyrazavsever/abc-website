"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { CardGenerator } from "@/components/linkedin-card/card-generator";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { BuilderRole, BuilderTag } from "@/lib/types/admin";
import type { ProfileRecord } from "@/lib/types/profile";
import { appToast } from "@/lib/utils/toast";

type LinkedInCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBuilderRole(value: unknown): BuilderRole {
  switch (value) {
    case "developer":
    case "designer":
    case "sales":
    case "product":
    case "student":
    case "other":
      return value;
    default:
      return "other";
  }
}

function asBuilderTag(value: unknown): BuilderTag | null {
  switch (value) {
    case "cofounder_looking":
    case "idea_looking":
    case "team_complete":
    case "just_building":
      return value;
    default:
      return null;
  }
}

function mapProfileRow(row: unknown): ProfileRecord {
  const record = asRecord(row);

  return {
    activeTag: asBuilderTag(record.active_tag),
    avatarPath: asNullableString(record.avatar_path),
    avatarUrl: asNullableString(record.avatar_url),
    bio: asString(record.bio),
    city: asString(record.city),
    createdAt: asString(record.created_at),
    eventAttendanceCount: asNumber(record.event_attendance_count),
    fullName: asString(record.full_name),
    githubUrl: asNullableString(record.github_url),
    githubUsername: asNullableString(record.github_username),
    id: asString(record.id),
    instagramUrl: asNullableString(record.instagram_url),
    instagramUsername: asNullableString(record.instagram_username),
    linkedinUrl: asNullableString(record.linkedin_url),
    linkedinUsername: asNullableString(record.linkedin_username),
    onboardingCompleted: asBoolean(record.onboarding_completed),
    onboardingCompletedAt: asNullableString(record.onboarding_completed_at),
    onboardingStep: asString(record.onboarding_step, "profile"),
    projectOnboardingSkipped: asBoolean(record.project_onboarding_skipped),
    publicEmail: asNullableString(record.public_email),
    role: asBuilderRole(record.role),
    updatedAt: asString(record.updated_at),
  };
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m5 5 10 10" />
      <path d="m15 5-10 10" />
    </svg>
  );
}

export function LinkedInCardModal({
  isOpen,
  onClose,
  user,
}: LinkedInCardModalProps) {
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || profile) {
      return;
    }

    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase bağlantısı şu anda kullanılamıyor.");
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      setIsLoading(false);

      if (error || !data) {
        appToast.error("Profil bilgileri okunamadı.");
        return;
      }

      setProfile(mapProfileRow(data));
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [isOpen, profile, user.id]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          aria-modal="true"
          role="dialog"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Modalı kapat"
            onClick={onClose}
          />

          <motion.div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-lg border border-white/12 bg-[#0b0b0c] text-white"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Kapat"
              className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/24 hover:text-white"
              onClick={onClose}
            >
              <XIcon />
            </button>

            <div className="border-b border-white/10 px-6 py-5 pr-16">
              <h2 className="text-lg font-semibold text-white">
                LinkedIn Kartı Oluştur
              </h2>
              <p className="mt-1 text-sm leading-6 text-white/52">
                Profil bilgilerinle paylaşılabilir minimal bir ABC kartı üret.
              </p>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="rounded-md border border-white/10 p-10 text-center text-sm text-white/52">
                  Profil bilgileri yükleniyor...
                </div>
              ) : profile ? (
                <CardGenerator profile={profile} />
              ) : (
                <div className="rounded-md border border-white/10 p-10 text-center text-sm text-white/52">
                  Kart oluşturmak için profil bilgileri bulunamadı.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
