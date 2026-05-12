"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";

import { BuilderCard } from "@/components/builders/builder-card";
import { Input } from "@/components/ui";
import { builderRoleLabels, builderTagLabels } from "@/lib/data/builders.data";
import type { PublicBuilderDirectoryProfile } from "@/lib/services/builders.service";
import type { BuilderRole, BuilderTag } from "@/lib/types/admin";

type BuilderDirectoryProps = {
  initialBuilders: PublicBuilderDirectoryProfile[];
};

type FilterPillProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

const roleFilterOrder: Array<BuilderRole | "all"> = [
  "all",
  "developer",
  "designer",
  "product",
  "sales",
  "student",
  "other",
];

const tagFilterOrder: Array<BuilderTag | "all"> = [
  "all",
  "cofounder_looking",
  "idea_looking",
  "team_complete",
  "just_building",
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function FilterPill({ active, label, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-white/10 bg-white text-sm font-semibold text-brand-black shadow-sm px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      }
    >
      {label}
    </button>
  );
}

export function BuilderDirectory({ initialBuilders }: BuilderDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<BuilderRole | "all">("all");
  const [selectedTag, setSelectedTag] = useState<BuilderTag | "all">("all");
  const deferredQuery = useDeferredValue(query);

  const filteredBuilders = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase("tr");

    return initialBuilders.filter((builder) => {
      const matchesQuery = normalizedQuery
        ? `${builder.fullName} ${builder.city} ${builder.bio}`
            .toLocaleLowerCase("tr")
            .includes(normalizedQuery)
        : true;
      const matchesRole = selectedRole === "all" ? true : builder.role === selectedRole;
      const matchesTag = selectedTag === "all" ? true : builder.activeTag === selectedTag;

      return matchesQuery && matchesRole && matchesTag;
    });
  }, [deferredQuery, initialBuilders, selectedRole, selectedTag]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/8 px-4 py-8 shadow-[0_24px_60px_rgb(0_0_0_/_0.3)] sm:px-6 lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-[#0b0b0c]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,112,191,0.12),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-white/68">
            Community Directory
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Builders
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
              Discover registered builders inside Shipin, see what
              people are working on, and reach the right collaborators faster.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <label className="relative block">
            <span className="sr-only">Search builders</span>
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                startTransition(() => {
                  setQuery(nextValue);
                });
              }}
              placeholder="Search by name, city, or bio..."
              className="h-14 rounded-full border-white/10 bg-white/6 pl-14 pr-5 text-base text-white shadow-none placeholder:text-white/38 hover:border-white/20 focus-visible:ring-white/20"
            />
          </label>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {roleFilterOrder.map((role) => (
                <FilterPill
                  key={role}
                  active={selectedRole === role}
                  label={role === "all" ? "All" : builderRoleLabels[role]}
                  onClick={() => setSelectedRole(role)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {tagFilterOrder.map((tag) => (
                <FilterPill
                  key={tag}
                  active={selectedTag === tag}
                  label={tag === "all" ? "All intents" : builderTagLabels[tag]}
                  onClick={() => setSelectedTag(tag)}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-white/48">
            {filteredBuilders.length} builders found
          </p>
        </div>

        {filteredBuilders.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredBuilders.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-dashed border-white/12 bg-white/4 px-6 py-16 text-center shadow-xs">
            <p className="text-lg font-semibold text-white">No builders matched your filters</p>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Try adjusting the search term or changing the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
