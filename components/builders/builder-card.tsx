"use client";

import Link from "next/link";

import { Avatar, Badge, Card, CardContent } from "@/components/ui";
import { builderRoleLabels, builderTagLabels } from "@/lib/data/builders.data";
import type { PublicBuilderDirectoryProfile } from "@/lib/services/builders.service";

type BuilderCardProps = {
  builder: PublicBuilderDirectoryProfile;
};

export function BuilderCard({ builder }: BuilderCardProps) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 shadow-[0_18px_40px_rgb(0_0_0_/_0.22)] transition duration-200 hover:-translate-y-1 hover:border-white/16 hover:bg-white/7 hover:shadow-[0_22px_46px_rgb(0_0_0_/_0.3)]">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start gap-4">
          <Avatar
            alt={builder.fullName}
            size="xl"
            className="border-2 border-white/14 bg-white/6 text-white"
          />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-1">
              <Link
                href={`/builders/${builder.id}`}
                className="inline-block text-lg font-semibold text-white transition hover:text-accent-300"
              >
                {builder.fullName}
              </Link>
              <p className="text-sm text-white/50">{builder.city || "Location not shared"}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{builderRoleLabels[builder.role]}</Badge>
              {builder.activeTag ? (
                <Badge variant="success">{builderTagLabels[builder.activeTag]}</Badge>
              ) : null}
              {builder.projectCount > 0 ? (
                <Badge variant="secondary">{builder.projectCount} projects</Badge>
              ) : null}
              {builder.badgeCount > 0 ? (
                <Badge variant="info">{builder.badgeCount} badges</Badge>
              ) : null}
            </div>
          </div>
        </div>

        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-white/68">
          {builder.bio.trim().length > 0
            ? builder.bio
            : "This builder has not added a short bio yet, but is already part of the community directory."}
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">
            Ankara Build Club
          </div>
          <div className="flex items-center gap-3">
            {builder.linkedinUrl ? (
              <Link
                href={builder.linkedinUrl}
                target="_blank"
                className="text-sm font-medium text-white/72 transition hover:text-white"
              >
                LinkedIn
              </Link>
            ) : null}
            <Link
              href={`/builders/${builder.id}`}
              className="text-sm font-medium text-accent-300 transition hover:text-accent-200"
            >
              Open profile
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
