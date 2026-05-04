"use client";

import { forwardRef } from "react";

import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import type { ProfileRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CardColorTheme = "dark" | "light" | "vibrant" | "branded";

export type CardContentTemplate =
  | "default"
  | "cofounder"
  | "team"
  | "idea"
  | "launch"
  | "sprint";

type CardRendererProps = {
  profile: ProfileRecord;
  colorTheme: CardColorTheme;
  contentTemplate: CardContentTemplate;
};

/* ------------------------------------------------------------------ */
/*  Content template messages                                          */
/* ------------------------------------------------------------------ */

export const contentTemplateLabels: Record<CardContentTemplate, string> = {
  default: "Genel",
  cofounder: "Co-founder Arıyorum",
  team: "Ekip Kuruyorum",
  idea: "Fikir Aşamasındayım",
  launch: "Ürün Launch",
  sprint: "Build Sprint",
};

const contentTemplateMessages: Record<CardContentTemplate, string> = {
  default: "Üreten, paylaşan ve topluluk içinde görünür olan builder.",
  cofounder: "Teknik / iş geliştirme ortağı arıyorum.",
  team: "Ekibimi kuruyorum, doğru insanı bulmak için buradayım.",
  idea: "Fikir aşamasındayım — konuşmak ve test etmek istiyorum.",
  launch: "Ürünümü yayına aldım, build in public devam ediyor.",
  sprint: "Build Sprint'teydim — üretmeye devam.",
};

export function getContentMessage(template: CardContentTemplate) {
  return contentTemplateMessages[template];
}

/* ------------------------------------------------------------------ */
/*  Color-theme visual config                                          */
/* ------------------------------------------------------------------ */

export const colorThemeLabels: Record<CardColorTheme, string> = {
  dark: "Dark",
  light: "Light",
  vibrant: "Vibrant",
  branded: "Branded",
};

const themeConfig: Record<
  CardColorTheme,
  {
    card: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    tagBorder: string;
    tagText: string;
    accentLine: string;
    useWhiteLogo: boolean;
    gradient: string;
    dotColor: string;
    avatarRing: string;
  }
> = {
  dark: {
    card: "bg-[#0a0a0c]",
    textPrimary: "text-white",
    textSecondary: "text-white/68",
    textTertiary: "text-white/48",
    tagBorder: "border-white/14",
    tagText: "text-white/72",
    accentLine: "bg-white/12",
    useWhiteLogo: true,
    gradient:
      "radial-gradient(circle at 85% 15%, rgba(70,44,125,0.45), transparent 45%), radial-gradient(circle at 10% 85%, rgba(131,28,145,0.3), transparent 40%)",
    dotColor: "rgba(255,255,255,0.04)",
    avatarRing: "ring-white/20",
  },
  light: {
    card: "bg-white",
    textPrimary: "text-neutral-950",
    textSecondary: "text-neutral-500",
    textTertiary: "text-neutral-400",
    tagBorder: "border-neutral-200",
    tagText: "text-neutral-600",
    accentLine: "bg-neutral-200",
    useWhiteLogo: false,
    gradient:
      "radial-gradient(circle at 80% 20%, rgba(70,44,125,0.06), transparent 50%), radial-gradient(circle at 15% 80%, rgba(213,82,163,0.05), transparent 45%)",
    dotColor: "rgba(0,0,0,0.03)",
    avatarRing: "ring-neutral-200",
  },
  vibrant: {
    card: "bg-[#120817]",
    textPrimary: "text-white",
    textSecondary: "text-white/68",
    textTertiary: "text-white/48",
    tagBorder: "border-fuchsia-500/25",
    tagText: "text-fuchsia-300/80",
    accentLine: "bg-fuchsia-500/20",
    useWhiteLogo: true,
    gradient:
      "radial-gradient(circle at 18% 20%, rgba(255,112,191,0.34), transparent 30%), radial-gradient(circle at 82% 72%, rgba(70,44,125,0.52), transparent 34%), radial-gradient(circle at 50% 0%, rgba(213,82,163,0.18), transparent 50%)",
    dotColor: "rgba(255,255,255,0.03)",
    avatarRing: "ring-fuchsia-400/30",
  },
  branded: {
    card: "bg-[#1a1028]",
    textPrimary: "text-white",
    textSecondary: "text-white/72",
    textTertiary: "text-white/52",
    tagBorder: "border-accent-400/25",
    tagText: "text-accent-300/85",
    accentLine: "bg-accent-400/20",
    useWhiteLogo: true,
    gradient:
      "linear-gradient(135deg, #462c7d 0%, #831c91 40%, #d552a3 100%)",
    dotColor: "rgba(255,255,255,0.05)",
    avatarRing: "ring-white/25",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/u).filter(Boolean);
  return `${parts[0]?.[0] ?? "S"}${parts[1]?.[0] ?? "I"}`.toLocaleUpperCase(
    "tr",
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const CardRenderer = forwardRef<HTMLDivElement, CardRendererProps>(
  ({ profile, colorTheme, contentTemplate }, ref) => {
    const role = roleLabels[profile.role] || "Builder";
    const tag = profile.activeTag
      ? tagLabels[profile.activeTag]
      : null;
    const theme = themeConfig[colorTheme];
    const message = contentTemplateMessages[contentTemplate];
    const initials = getInitials(profile.fullName);

    const logoSrc = theme.useWhiteLogo
      ? "/brand/logo.png"
      : "/brand/logoblack.png";

    /* Dot pattern as CSS background */
    const dotPattern = `radial-gradient(circle, ${theme.dotColor} 1px, transparent 1px)`;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden font-sans",
          theme.card,
        )}
        style={{ transformOrigin: "top left" }}
      >
        {/* Gradient layer */}
        <div
          className="absolute inset-0"
          style={{ background: theme.gradient }}
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: dotPattern,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-16">
          {/* Top bar: Logo + domain */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="Ship In"
                className="h-12 w-12 object-contain"
                crossOrigin="anonymous"
              />
              <div>
                <p
                  className={cn(
                    "text-[22px] font-bold tracking-tight",
                    theme.textPrimary,
                  )}
                >
                  Ship In
                </p>
                <p
                  className={cn("text-sm", theme.textTertiary)}
                >
                  Builder Community
                </p>
              </div>
            </div>
            <p
              className={cn(
                "text-lg font-medium",
                theme.textTertiary,
              )}
            >
              shipin.club
            </p>
          </div>

          {/* Middle: Avatar + Name + Role */}
          <div className="flex items-center gap-8">
            {/* Avatar */}
            <div
              className={cn(
                "flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-full ring-4",
                theme.avatarRing,
              )}
            >
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center text-5xl font-bold",
                    colorTheme === "light"
                      ? "bg-neutral-100 text-neutral-700"
                      : "bg-white/[0.08] text-white/80",
                  )}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name block */}
            <div className="min-w-0 space-y-3">
              {tag ? (
                <span
                  className={cn(
                    "inline-flex rounded-full border px-5 py-1.5 text-lg font-semibold",
                    theme.tagBorder,
                    theme.tagText,
                  )}
                >
                  {tag}
                </span>
              ) : null}

              <h1
                className={cn(
                  "text-[72px] font-bold leading-[0.95] tracking-tight",
                  theme.textPrimary,
                )}
              >
                {profile.fullName}
              </h1>
              <p
                className={cn(
                  "text-3xl font-medium",
                  theme.textSecondary,
                )}
              >
                {role} · {profile.city}
              </p>
            </div>
          </div>

          {/* Bottom: Message + accent line */}
          <div className="flex items-end justify-between">
            <p
              className={cn(
                "max-w-2xl text-xl leading-8",
                theme.textTertiary,
              )}
            >
              {message}
            </p>
            <div
              className={cn(
                "ml-8 h-px w-44 shrink-0",
                theme.accentLine,
              )}
            />
          </div>
        </div>
      </div>
    );
  },
);

CardRenderer.displayName = "CardRenderer";
