"use client";

import { useState } from "react";
import { ProjectForm } from "./project-form";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import type { ProjectRecord } from "@/lib/types/profile";
import { categoryLabels, statusLabels } from "./project-card";
import Link from "next/link";

export function ProjectManager({ initialProjects }: { initialProjects: ProjectRecord[] }) {
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text">Projeleriniz ({initialProjects.length})</h2>
        <Button onClick={() => setIsAdding(true)}>Yeni Proje Ekle</Button>
      </div>

      {(isAdding || editingProject) && (
        <Card className="border-primary/20 bg-surface shadow-md">
          <CardHeader>
            <CardTitle>{isAdding ? "Yeni Proje" : "Projeyi Düzenle"}</CardTitle>
            <CardDescription>Proje detaylarını girin ve kaydedin.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm
              project={editingProject ?? undefined}
              onCancel={() => {
                setIsAdding(false);
                setEditingProject(null);
              }}
              onSuccess={() => {
                setIsAdding(false);
                setEditingProject(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      {initialProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {initialProjects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1 text-xs">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                    <Badge variant="secondary" className="text-[10px]">{statusLabels[project.status] ?? project.status}</Badge>
                    <Badge variant="outline" className="text-[10px]">{categoryLabels[project.category] ?? project.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 items-end justify-between">
                <div>
                  {project.url && (
                    <Link href={project.url.startsWith("http") ? project.url : `https://${project.url}`} target="_blank" className="text-xs text-primary hover:underline">
                      Siteyi Aç
                    </Link>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                  Düzenle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-border p-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-text">Proje bulunamadı</h3>
          <p className="text-sm text-text-soft mb-6">
            Henüz bir proje eklemediniz. Hemen yeni bir tane ekleyerek portföyünüzü oluşturun.
          </p>
          <Button onClick={() => setIsAdding(true)}>Yeni Proje Ekle</Button>
        </div>
      )}
    </div>
  );
}
