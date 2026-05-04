"use client";

import { forwardRef } from "react";

import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import type { ProfileRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";

export type CardTemplate = "minimal" | "vibrant" | "dark";

type CardRendererProps = {
  profile: ProfileRecord;
  template: CardTemplate;
};

const templateClassNames: Record<CardTemplate, string> = {
  dark: "border-neutral-800 bg-neutral-950 text-white",
  minimal: "border-neutral-200 bg-white text-neutral-950",
  vibrant: "border-fuchsia-500/30 bg-[#120817] text-white",
};

export const CardRenderer = forwardRef<HTMLDivElement, CardRendererProps>(
  ({ profile, template }, ref) => {
    const role = roleLabels[profile.role] || "Builder";
    const tag = profile.activeTag ? tagLabels[profile.activeTag] : "Build ediyorum";
    const isMinimal = template === "minimal";

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden border p-20 font-sans",
          templateClassNames[template],
        )}
        style={{ transformOrigin: "top left" }}
      >
        {template === "vibrant" ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,112,191,0.34),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(70,44,125,0.52),transparent_34%)]" />
        ) : null}

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-md border text-2xl font-bold",
                isMinimal
                  ? "border-neutral-200 bg-neutral-950 text-white"
                  : "border-white/12 bg-white/[0.04] text-white",
              )}
            >
              ABC
            </div>
            <div>
              <p
                className={cn(
                  "text-2xl font-semibold tracking-tight",
                  isMinimal ? "text-neutral-950" : "text-white",
                )}
              >
                Ankara Build Club
              </p>
              <p
                className={cn(
                  "mt-1 text-lg",
                  isMinimal ? "text-neutral-500" : "text-white/48",
                )}
              >
                Builder profile card
              </p>
            </div>
          </div>
          <p
            className={cn(
              "text-xl font-medium",
              isMinimal ? "text-neutral-400" : "text-white/42",
            )}
          >
            ankarabuildclub.com
          </p>
        </div>

        <div className="relative max-w-[920px] space-y-8">
          <div
            className={cn(
              "inline-flex rounded-full border px-6 py-2 text-xl font-semibold",
              isMinimal
                ? "border-neutral-200 text-neutral-600"
                : "border-white/12 text-white/72",
            )}
          >
            {tag}
          </div>
          <h1
            className={cn(
              "text-8xl font-semibold leading-[0.95] tracking-tight",
              isMinimal ? "text-neutral-950" : "text-white",
            )}
          >
            {profile.fullName}
          </h1>
          <p
            className={cn(
              "text-4xl font-medium",
              isMinimal ? "text-neutral-500" : "text-white/68",
            )}
          >
            {role} / {profile.city}
          </p>
        </div>

        <div className="relative flex items-center justify-between">
          <p
            className={cn(
              "max-w-2xl text-2xl leading-10",
              isMinimal ? "text-neutral-500" : "text-white/54",
            )}
          >
            Üreten, paylaşan ve topluluk içinde görünür olan builder profili.
          </p>
          <div
            className={cn(
              "h-px w-52",
              isMinimal ? "bg-neutral-200" : "bg-white/12",
            )}
          />
        </div>
      </div>
    );
  },
);

CardRenderer.displayName = "CardRenderer";
