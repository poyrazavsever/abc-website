"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getOnboardingHref } from "@/lib/auth/shared";
import {
  projectCategoryOptions,
  projectIntentOptions,
} from "@/lib/data/onboarding.data";
import { trackClientEvent } from "@/lib/integrations/analytics/client";
import {
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
const selectOptionClassName = "bg-brand-black text-white";

const labelClassName = "text-xs font-semibold text-white";
const errorClassName = "mt-2 text-xs text-danger-300";

export function OnboardingProjectForm({
  profile,
  projects,
}: OnboardingProjectFormProps) {
  const router = useRouter();
  const firstProject = projects[0];
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
        url: firstProject?.url ?? "",
      },
    },
  });

  const hasProjects = useWatch({ control, name: "hasProjects" });

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase bağlantısı şu anda kullanılamıyor.");
      return;
    }

    try {
      if (values.hasProjects === "yes") {
        const payload = {
          category: values.project.category,
          description: values.project.description.trim(),
          name: values.project.name.trim(),
          owner_id: profile.id,
          status: "idea",
          technologies: null,
          image_path: null,
          image_url: null,
          url: values.project.url.trim() || null,
        };

        const query = firstProject
          ? supabase.from("projects").update(payload).eq("id", firstProject.id)
          : supabase.from("projects").insert(payload);

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
      router.replace("/dashboard/profile");
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
          İlk projeni şimdi ekleyebilir ya da dashboard üzerinden daha sonra
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
            <label htmlFor="projectDescription" className={labelClassName}>
              Açıklama
            </label>
            <Textarea
              id="projectDescription"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="projectCategory" className={labelClassName}>
                Kategori
              </label>
              <Select
                id="projectCategory"
                className={cn(
                  inputClassName,
                  errors.project?.category && "border-danger-400",
                )}
                {...register("project.category")}
              >
                {projectCategoryOptions.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                    className={selectOptionClassName}
                  >
                    {category.label}
                  </option>
                ))}
              </Select>
              {errors.project?.category?.message ? (
                <p className={errorClassName}>
                  {errors.project.category.message}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="projectUrl" className={labelClassName}>
                Bağlantı
              </label>
              <Input
                id="projectUrl"
                className={cn(
                  inputClassName,
                  errors.project?.url && "border-danger-400",
                )}
                placeholder="https://..."
                {...register("project.url")}
              />
              {errors.project?.url?.message ? (
                <p className={errorClassName}>{errors.project.url.message}</p>
              ) : null}
            </div>
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
