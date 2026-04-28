"use client";

import React, { forwardRef } from "react";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import type { ProfileRecord } from "@/lib/types/profile";

export type CardTemplate = "minimal" | "vibrant" | "dark";

type CardRendererProps = {
  profile: ProfileRecord;
  template: CardTemplate;
};

export const CardRenderer = forwardRef<HTMLDivElement, CardRendererProps>(
  ({ profile, template }, ref) => {
    // 1200x630 or 1080x1080, we use an aspect ratio box that scales down.
    // For LinkedIn feed, 1200x627 is standard. 
    
    const role = roleLabels[profile.role] || "Builder";
    const tag = profile.activeTag ? tagLabels[profile.activeTag] : "Sadece build ediyor";

    if (template === "minimal") {
      return (
        <div
          ref={ref}
          className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-white p-20 font-sans"
          style={{ transformOrigin: "top left" }}
        >
          {/* Logo / Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-black text-2xl font-bold text-white">
              ABC
            </div>
            <div className="text-2xl font-bold tracking-tight text-neutral-900">
              Ankara Build Club
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-7xl font-extrabold tracking-tight text-neutral-900">
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-3xl font-medium text-neutral-600">
              <span className="rounded-full bg-neutral-100 px-6 py-2">{role}</span>
              <span className="rounded-full bg-neutral-100 px-6 py-2">{tag}</span>
              <span className="rounded-full bg-neutral-100 px-6 py-2">{profile.city}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-2xl font-medium text-neutral-400">
            ankarabuildclub.com
          </div>
        </div>
      );
    }

    if (template === "dark") {
      return (
        <div
          ref={ref}
          className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-neutral-950 p-20 font-sans text-white"
          style={{ transformOrigin: "top left" }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          {/* Logo / Header */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-2xl font-bold text-black">
              ABC
            </div>
            <div className="text-2xl font-bold tracking-tight text-white/90">
              Ankara Build Club
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <h1 className="text-7xl font-extrabold tracking-tight text-white">
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-3xl font-medium">
              <span className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-white">{role}</span>
              <span className="rounded-full border border-primary/30 bg-primary/20 px-6 py-2 text-primary-200">{tag}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between text-2xl font-medium text-neutral-500">
            <span>{profile.city}</span>
            <span>ankarabuildclub.com</span>
          </div>
        </div>
      );
    }

    // Vibrant Template
    return (
      <div
        ref={ref}
        className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-20 font-sans text-white"
        style={{ transformOrigin: "top left" }}
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        
        {/* Logo / Header */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold text-white backdrop-blur-md">
            ABC
          </div>
          <div className="text-2xl font-bold tracking-tight text-white/90">
            Ankara Build Club
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="inline-block rounded-full bg-white/20 px-6 py-2 text-2xl font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {tag}
          </div>
          <h1 className="text-8xl font-black tracking-tight text-white drop-shadow-lg">
            {profile.fullName}
          </h1>
          <p className="text-4xl font-semibold text-white/90 drop-shadow-md">
            {role} • {profile.city}
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-2xl font-semibold text-white/80">
          ankarabuildclub.com
        </div>
      </div>
    );
  }
);
CardRenderer.displayName = "CardRenderer";
