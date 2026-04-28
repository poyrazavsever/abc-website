"use client";

import { useState, useMemo } from "react";
import { ProjectCard, categoryLabels, statusLabels } from "./project-card";
import type { ProjectWithOwner, ProjectCategory, ProjectStatus } from "@/lib/types/profile";
import { Select } from "@/components/ui";

export function ProjectDirectory({ initialProjects }: { initialProjects: ProjectWithOwner[] }) {
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...initialProjects];

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialProjects, categoryFilter, statusFilter, sortOrder]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium text-text-soft">Kategori</label>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full text-sm"
            >
              <option value="all">Tümü</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium text-text-soft">Durum</label>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full text-sm"
            >
              <option value="all">Tümü</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex-1 space-y-1 sm:max-w-xs">
          <label className="text-xs font-medium text-text-soft">Sıralama</label>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full text-sm"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-text-soft">Bu kriterlere uygun proje bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
