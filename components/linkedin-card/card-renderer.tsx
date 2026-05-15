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

export type CardDimension = "landscape" | "portrait" | "square";

type CardRendererProps = {
  profile: ProfileRecord;
  colorTheme: CardColorTheme;
  contentTemplate: CardContentTemplate;
  dimension?: CardDimension;
};

/* ------------------------------------------------------------------ */
/*  Content template messages                                          */
/* ------------------------------------------------------------------ */

export const contentTemplateLabels: Record<CardContentTemplate, string> = {
  default: "General",
  cofounder: "Looking for a Co-Founder",
  team: "Building My Team",
  idea: "Idea Stage",
  launch: "Product Launch",
  sprint: "Build Sprint",
};

const contentTemplateMessages: Record<CardContentTemplate, string> = {
  default: "A builder who creates, shares, and stays visible within the community.",
  cofounder: "I'm looking for a technical or business co-founder.",
  team: "I'm building my team and here to find the right people.",
  idea: "I'm at the idea stage and want to talk and test it out.",
  launch: "My product is live, and I'm still building in public.",
  sprint: "I joined Build Sprint and I'm still shipping.",
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
    gradient: "linear-gradient(135deg, #462c7d 0%, #831c91 40%, #d552a3 100%)",
    dotColor: "rgba(255,255,255,0.05)",
    avatarRing: "ring-white/25",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/u).filter(Boolean);
  return `${parts[0]?.[0] ?? "S"}${parts[1]?.[0] ?? "I"}`.toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const dimensionConfig: Record<
  CardDimension,
  {
    width: number;
    height: number;
    padding: string;
    gapLayout: string;
    logoSize: string;
    logoText: string;
    avatarSize: string;
    avatarTextSize: string;
    nameTextSize: string;
    roleTextSize: string;
    tagTextSize: string;
    messageTextSize: string;
    messageMaxWidth: string;
    bottomLayout: string;
    accentLineShow: boolean;
    headerLayout: string;
    mainLayout: string;
  }
> = {
  landscape: {
    width: 1200,
    height: 630,
    padding: "p-16",
    gapLayout: "gap-8",
    logoSize: "h-12 w-auto",
    logoText: "text-[26px]",
    avatarSize: "h-[130px] w-[130px]",
    avatarTextSize: "text-5xl",
    nameTextSize: "text-[72px]",
    roleTextSize: "text-3xl",
    tagTextSize: "text-xl px-5 py-2",
    messageTextSize: "text-[38px] leading-[1.3]",
    messageMaxWidth: "max-w-3xl",
    bottomLayout: "flex-row items-end justify-between",
    accentLineShow: true,
    headerLayout: "flex-row justify-start items-center",
    mainLayout: "flex-row items-center text-left",
  },
  square: {
    width: 1080,
    height: 1080,
    padding: "p-20",
    gapLayout: "gap-12",
    logoSize: "h-16 w-auto",
    logoText: "text-[32px]",
    avatarSize: "h-[180px] w-[180px]",
    avatarTextSize: "text-6xl",
    nameTextSize: "text-[85px]",
    roleTextSize: "text-[38px]",
    tagTextSize: "text-2xl px-6 py-2.5",
    messageTextSize: "text-[46px] leading-[1.4]",
    messageMaxWidth: "max-w-4xl",
    bottomLayout: "flex-col items-start gap-12",
    accentLineShow: true,
    headerLayout: "flex-row justify-start items-center",
    mainLayout: "flex-col items-start text-left",
  },
  portrait: {
    width: 1080,
    height: 1920,
    padding: "p-24 py-32",
    gapLayout: "gap-16",
    logoSize: "h-20 w-auto",
    logoText: "text-[40px]",
    avatarSize: "h-[240px] w-[240px]",
    avatarTextSize: "text-[80px]",
    nameTextSize: "text-[100px]",
    roleTextSize: "text-[44px]",
    tagTextSize: "text-3xl px-8 py-3",
    messageTextSize: "text-[52px] leading-[1.4]",
    messageMaxWidth: "max-w-full text-center",
    bottomLayout: "flex-col items-center text-center gap-16 mt-auto",
    accentLineShow: false,
    headerLayout: "flex-col justify-center items-center text-center gap-6",
    mainLayout: "flex-col items-center text-center mt-32",
  },
};

export const CardRenderer = forwardRef<HTMLDivElement, CardRendererProps>(
  ({ profile, colorTheme, contentTemplate, dimension = "landscape" }, ref) => {
    const role = roleLabels[profile.role] || "Builder";
    const tag = profile.activeTag ? tagLabels[profile.activeTag] : null;
    const theme = themeConfig[colorTheme];
    const message = contentTemplateMessages[contentTemplate];
    const initials = getInitials(profile.fullName);

    const dim = dimensionConfig[dimension];

    const logoSrc = theme.useWhiteLogo
      ? "/brand/logonew-w.png"
      : "/brand/logonew-b.png";

    /* Dot pattern as CSS background */
    const dotPattern = `radial-gradient(circle, ${theme.dotColor} 1px, transparent 1px)`;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col justify-between overflow-hidden font-sans",
          theme.card,
        )}
        style={{
          width: dim.width,
          height: dim.height,
          transformOrigin: "top left",
        }}
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
        <div
          className={cn(
            "relative flex h-full flex-col justify-between",
            dim.padding,
          )}
        >
          {/* Top bar: Logo */}
          <div className={cn("flex w-full", dim.headerLayout)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Shipin"
              className={cn("object-contain", dim.logoSize)}
              crossOrigin="anonymous"
            />
          </div>

          {/* Middle: Avatar + Name + Role */}
          <div className={cn("flex w-full", dim.mainLayout, dim.gapLayout)}>
            {/* Avatar */}
            <div
              className={cn(
                "flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-4 shadow-2xl",
                dim.avatarSize,
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
                    "flex h-full w-full items-center justify-center font-bold",
                    dim.avatarTextSize,
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
            <div
              className={cn(
                "min-w-0 space-y-4",
                dimension === "portrait" && "flex flex-col items-center mt-6",
              )}
            >
              {tag ? (
                <span
                  className={cn(
                    "inline-flex rounded-full border font-semibold",
                    dim.tagTextSize,
                    theme.tagBorder,
                    theme.tagText,
                  )}
                >
                  {tag}
                </span>
              ) : null}

              <h1
                className={cn(
                  "font-bold leading-[0.95] tracking-tight",
                  dim.nameTextSize,
                  theme.textPrimary,
                )}
              >
                {profile.fullName}
              </h1>
              <p
                className={cn(
                  "font-medium",
                  dim.roleTextSize,
                  theme.textSecondary,
                )}
              >
                {role} · {profile.city}
              </p>
            </div>
          </div>

          {/* Bottom: Message + accent line */}
          <div className={cn("flex w-full", dim.bottomLayout)}>
            <p
              className={cn(
                dim.messageMaxWidth,
                dim.messageTextSize,
                theme.textTertiary,
              )}
            >
              &quot;{message}&quot;
            </p>
            {dim.accentLineShow && (
              <div
                className={cn(
                  "ml-8 h-1 w-44 shrink-0 rounded-full",
                  theme.accentLine,
                )}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

CardRenderer.displayName = "CardRenderer";
