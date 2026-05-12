"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import { addProjectAction, editProjectAction, deleteProjectAction } from "@/app/dashboard/my-projects/actions";
import { categoryLabels, statusLabels } from "./project-card";
import type { ProjectRecord, ProjectCategory, ProjectStatus } from "@/lib/types/profile";
import { appToast as toast } from "@/lib/utils/toast";
import { normalizeProjectUrl } from "@/lib/schemas/onboarding";

type ProjectFormProps = {
  project?: ProjectRecord;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!project;
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? "other");
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? "idea");
  const [url, setUrl] = useState(project?.url ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const input = {
      name,
      description,
      category,
      status,
      url: normalizeProjectUrl(url),
    };

    const result = isEditing
      ? await editProjectAction(project.id, input)
      : await addProjectAction(input);

    setLoading(false);

    if (result.status === "error") {
      toast.error(result.message ?? "Bir hata oluştu.");
    } else {
      toast.success(result.message ?? "Başarılı.");
      if (onSuccess) onSuccess();
      else router.refresh();
    }
  }

  async function handleDelete() {
    if (!isEditing || loading) return;
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    const result = await deleteProjectAction(project.id);
    setLoading(false);

    if (result.status === "error") {
      toast.error(result.message ?? "Silme işlemi başarısız.");
    } else {
      toast.success("Proje silindi.");
      if (onSuccess) onSuccess();
      else router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Proje Adı</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          placeholder="Örn: Ankara Build Club"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          placeholder="Projeniz ne yapıyor, hangi problemi çözüyor?"
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            disabled={loading}
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Durum</Label>
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            disabled={loading}
          >
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL (Opsiyonel)</Label>
        <Input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          placeholder="example.com"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEditing ? (
          <Button type="button" variant="ghost" onClick={handleDelete} disabled={loading} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            Sil
          </Button>
        ) : (
          <div /> // Spacer
        )}
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              İptal
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
