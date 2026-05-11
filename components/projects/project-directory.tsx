"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";

import { Input } from "@/components/ui";
import type { ProjectCategory, ProjectStatus, ProjectWithOwner } from "@/lib/types/profile";

import { ProjectCard, categoryLabels, statusLabels } from "./project-card";

type ProjectDirectoryProps = {
  initialProjects: ProjectWithOwner[];
};

type FilterPillProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

const categoryFilterOrder: Array<ProjectCategory | "all"> = [
  "all",
  "ai",
  "saas",
  "mobile",
  "social_impact",
  "other",
];

const statusFilterOrder: Array<ProjectStatus | "all"> = [
  "all",
  "idea",
  "mvp",
  "live",
  "pivot",
  "closed",
];

const sortOrderOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

type SortOrder = (typeof sortOrderOptions)[number]["value"];

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
          ? "rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      }
    >
      {label}
    </button>
  );
}

function StatsPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/44">
        {label}
      </p>
    </div>
  );
}

export function ProjectDirectory({ initialProjects }: ProjectDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const deferredQuery = useDeferredValue(query);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase("tr");
    const result = initialProjects.filter((project) => {
      const matchesQuery = normalizedQuery
        ? [
            project.name,
            project.description,
            project.owner.fullName,
            categoryLabels[project.category] ?? project.category,
            statusLabels[project.status] ?? project.status,
          ]
            .join(" ")
            .toLocaleLowerCase("tr")
            .includes(normalizedQuery)
        : true;
      const matchesCategory =
        selectedCategory === "all" ? true : project.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" ? true : project.status === selectedStatus;

      return matchesQuery && matchesCategory && matchesStatus;
    });

    result.sort((left, right) => {
      const leftDate = new Date(left.createdAt).getTime();
      const rightDate = new Date(right.createdAt).getTime();
      return sortOrder === "newest" ? rightDate - leftDate : leftDate - rightDate;
    });

    return result;
  }, [deferredQuery, initialProjects, selectedCategory, selectedStatus, sortOrder]);

  const liveProjectCount = useMemo(
    () => initialProjects.filter((project) => project.status === "live").length,
    [initialProjects],
  );
  const founderCount = useMemo(
    () => new Set(initialProjects.map((project) => project.ownerId)).size,
    [initialProjects],
  );

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/8 px-4 py-8 shadow-[0_24px_60px_rgb(0_0_0_/_0.3)] sm:px-6 lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-[#0b0b0c]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-10">
        <div className="space-y-5 text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-white/68">
            COMMUNITY PROJECTS
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Projects
            </h1>
          </div>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            <StatsPill value={String(initialProjects.length)} label="Total Projects" />
            <StatsPill value={String(liveProjectCount)} label="Live Products" />
            <StatsPill value={String(founderCount)} label="Active Builders" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
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
              placeholder="Search by project, category, or builder name..."
              className="h-14 rounded-full border-white/10 bg-white/6 pl-14 pr-5 text-base text-white shadow-none placeholder:text-white/38 hover:border-white/20 focus-visible:ring-white/20"
            />
          </label>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categoryFilterOrder.map((category) => (
                <FilterPill
                  key={category}
                  active={selectedCategory === category}
                  label={category === "all" ? "All categories" : categoryLabels[category]}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {statusFilterOrder.map((status) => (
                <FilterPill
                  key={status}
                  active={selectedStatus === status}
                  label={status === "all" ? "All stages" : statusLabels[status]}
                  onClick={() => setSelectedStatus(status)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {sortOrderOptions.map((option) => (
                <FilterPill
                  key={option.value}
                  active={sortOrder === option.value}
                  label={option.label}
                  onClick={() => setSortOrder(option.value)}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-white/48">
            {filteredProjects.length} projects shown
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-dashed border-white/12 bg-white/4 px-6 py-16 text-center shadow-xs">
            <p className="text-lg font-semibold text-white">No projects matched your filters</p>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Try adjusting the search term or changing the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
