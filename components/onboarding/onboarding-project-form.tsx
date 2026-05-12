"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getOnboardingHref } from "@/lib/auth/shared";
import { projectIntentOptions } from "@/lib/data/onboarding.data";
import { trackClientEvent } from "@/lib/integrations/analytics/client";
import {
  normalizeProjectUrl,
  onboardingProjectsSchema,
  type OnboardingProjectsFormValues,
} from "@/lib/schemas/onboarding";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { ProfileRecord, ProjectRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

type OnboardingProjectFormProps = {
  profile: ProfileRecord;
  projects: ProjectRecord[];
};

const inputClassName =
  "rounded-md border-white/18 bg-white/[0.04] text-sm text-white shadow-none placeholder:text-white/38 hover:border-white/28 focus-visible:ring-accent/30 focus-visible:ring-offset-brand-black";
const labelClassName = "text-xs font-semibold text-white";
const errorClassName = "mt-2 text-xs text-danger-300";

function getImageExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension && ["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {
    return extension;
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/gif") {
    return "gif";
  }

  return "jpg";
}

export function OnboardingProjectForm({
  profile,
  projects,
}: OnboardingProjectFormProps) {
  const router = useRouter();
  const firstProject = projects[0];
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imagePreviewUrlRef = useRef<string | null>(null);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<OnboardingProjectsFormValues>({
    resolver: zodResolver(onboardingProjectsSchema),
    defaultValues: {
      hasProjects: firstProject ? "yes" : "no",
      project: {
        category: firstProject?.category ?? "other",
        description: firstProject?.description ?? "",
        name: firstProject?.name ?? "",
        technologies: firstProject?.technologies ?? "",
        url: firstProject?.url ?? "",
      },
    },
  });

  const hasProjects = useWatch({ control, name: "hasProjects" });
  const description = useWatch({ control, name: "project.description" });
  const descriptionLength = description?.length ?? 0;
  const projectImagePreview = imagePreviewUrl ?? firstProject?.imageUrl ?? null;

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase bağlantısı şu anda kullanılamıyor.");
      return;
    }

    try {
      if (values.hasProjects === "yes") {
        const projectId = firstProject?.id ?? crypto.randomUUID();
        let imagePath = firstProject?.imagePath ?? null;
        let imageUrl = firstProject?.imageUrl ?? null;

        if (imageFile) {
          if (!imageFile.type.startsWith("image/")) {
            appToast.error("Proje fotoğrafı bir görsel dosyası olmalı.");
            return;
          }

          if (imageFile.size > 5 * 1024 * 1024) {
            appToast.error("Proje fotoğrafı en fazla 5 MB olabilir.");
            return;
          }

          imagePath = `${profile.id}/${projectId}.${getImageExtension(imageFile)}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(imagePath, imageFile, {
              cacheControl: "3600",
              contentType: imageFile.type,
              upsert: true,
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data } = supabase.storage
            .from("project-images")
            .getPublicUrl(imagePath);
          imageUrl = data.publicUrl;
        }

        const payload = {
          category: "other",
          description: values.project.description.trim(),
          image_path: imagePath,
          image_url: imageUrl,
          name: values.project.name.trim(),
          owner_id: profile.id,
          status: "idea",
          technologies: values.project.technologies?.trim() || null,
          url: normalizeProjectUrl(values.project.url) || null,
        };

        const query = firstProject
          ? supabase.from("projects").update(payload).eq("id", firstProject.id)
          : supabase.from("projects").insert({ id: projectId, ...payload });

        const { error: projectError } = await query;

        if (projectError) {
          throw projectError;
        }
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString(),
          onboarding_step: "complete",
          project_onboarding_skipped: values.hasProjects === "no",
        })
        .eq("id", profile.id);

      if (profileError) {
        throw profileError;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: profile.fullName,
          onboarding_completed: true,
        },
      });

      await trackClientEvent("onboarding_completed");

      appToast.success("Onboarding tamamlandı.");
      router.replace(`/profile/${profile.id}`);
      router.refresh();
    } catch (error) {
      appToast.error(
        error instanceof Error ? error.message : "Onboarding tamamlanamadı.",
      );
    }
  });

  return (
    <form className="space-y-6" noValidate onSubmit={onSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-white">
          Projeni ekle
        </h1>
        <p className="text-sm text-white/66">
          İlk projeni şimdi ekleyebilir ya da profil menüsünden daha sonra
          tamamlayabilirsin.
        </p>
      </div>

      <fieldset className="grid gap-3">
        <legend className="sr-only">Proje ekleme tercihi</legend>
        {projectIntentOptions.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer gap-3 rounded-md border border-white/14 bg-white/[0.04] p-4 transition hover:border-white/28",
              hasProjects === option.value && "border-white/42 bg-white/[0.08]",
            )}
          >
            <input
              type="radio"
              value={option.value}
              className="mt-1 h-4 w-4 accent-accent"
              {...register("hasProjects")}
            />
            <span className="space-y-1">
              <span className="block text-sm font-semibold text-white">
                {option.label}
              </span>
              {option.description ? (
                <span className="block text-xs text-white/52">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </fieldset>

      {hasProjects === "yes" ? (
        <div className="space-y-4">
          <div>
            <p className={labelClassName}>Proje fotoğrafı</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center">
              <div
                className="aspect-square rounded-md border border-white/12 bg-white/[0.03] bg-cover bg-center"
                style={
                  projectImagePreview
                    ? { backgroundImage: `url(${projectImagePreview})` }
                    : undefined
                }
                aria-label="Proje fotoğrafı önizlemesi"
              />
              <div>
                <label
                  htmlFor="projectImage"
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-white/12 px-4 text-sm font-medium text-white/78 transition hover:border-white/24 hover:text-white"
                >
                  Fotoğraf seç
                </label>
                <input
                  id="projectImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="sr-only"
                  disabled={isSubmitting}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;

                    if (imagePreviewUrlRef.current) {
                      URL.revokeObjectURL(imagePreviewUrlRef.current);
                      imagePreviewUrlRef.current = null;
                    }

                    setImageFile(file);

                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      imagePreviewUrlRef.current = objectUrl;
                      setImagePreviewUrl(objectUrl);
                      return;
                    }

                    setImagePreviewUrl(null);
                  }}
                />
                <p className="mt-2 text-xs text-white/38">
                  PNG, JPG, WEBP veya GIF. Maksimum 5 MB.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="projectName" className={labelClassName}>
              Proje adı
            </label>
            <Input
              id="projectName"
              className={cn(
                inputClassName,
                errors.project?.name && "border-danger-400",
              )}
              placeholder="Proje adını girin"
              {...register("project.name")}
            />
            {errors.project?.name?.message ? (
              <p className={errorClassName}>{errors.project.name.message}</p>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="projectDescription" className={labelClassName}>
                Kısa açıklama
              </label>
              <span className="text-xs text-white/38">
                {descriptionLength}/150
              </span>
            </div>
            <Textarea
              id="projectDescription"
              maxLength={150}
              className={cn(
                inputClassName,
                "min-h-28 resize-none",
                errors.project?.description && "border-danger-400",
              )}
              placeholder="Proje ne yapıyor, kim için değer üretiyor?"
              {...register("project.description")}
            />
            {errors.project?.description?.message ? (
              <p className={errorClassName}>
                {errors.project.description.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="projectUrl" className={labelClassName}>
              Proje URL&apos;i
            </label>
            <Input
              id="projectUrl"
              type="text"
              className={cn(
                inputClassName,
                errors.project?.url && "border-danger-400",
              )}
              placeholder="example.com"
              {...register("project.url")}
            />
            {errors.project?.url?.message ? (
              <p className={errorClassName}>{errors.project.url.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="projectTechnologies" className={labelClassName}>
              Kullanılan teknolojiler
            </label>
            <Input
              id="projectTechnologies"
              className={cn(
                inputClassName,
                errors.project?.technologies && "border-danger-400",
              )}
              placeholder="Next.js, Supabase, Tailwind"
              {...register("project.technologies")}
            />
            {errors.project?.technologies?.message ? (
              <p className={errorClassName}>
                {errors.project.technologies.message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1">
        <Button
          href={getOnboardingHref("details")}
          variant="ghost"
          className="h-11 rounded-md border-white/16 bg-white/[0.04] px-5 text-white shadow-none hover:border-white/28 hover:bg-white/[0.08]"
        >
          Geri
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          className="h-11 min-w-32 rounded-md border-white bg-white px-6 text-brand-black shadow-none hover:border-white hover:bg-white/90"
        >
          Tamamla
        </Button>
      </div>
    </form>
  );
}
