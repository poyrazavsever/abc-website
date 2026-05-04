"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  quickProjectSchema,
  type QuickProjectFormValues,
} from "@/lib/schemas/onboarding";
import { createSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

type AddProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const fieldClassName =
  "w-full rounded-md border border-white/12 bg-transparent px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/32 focus:border-white/34 disabled:cursor-not-allowed disabled:opacity-60";
const labelClassName = "text-xs font-medium text-white/78";
const errorClassName = "mt-1.5 text-xs text-red-300";

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

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m5 5 10 10" />
      <path d="m15 5-10 10" />
    </svg>
  );
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    control,
  } = useForm<QuickProjectFormValues>({
    resolver: zodResolver(quickProjectSchema),
    defaultValues: {
      description: "",
      name: "",
      technologies: "",
      url: "",
    },
  });

  const description = useWatch({ control, name: "description" });
  const descriptionLength = description?.length ?? 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const closeAndReset = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
    reset();
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase bağlantısı şu anda kullanılamıyor.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      appToast.error("Proje eklemek için giriş yapmalısınız.");
      return;
    }

    let imagePath: string | null = null;
    let imageUrl: string | null = null;
    const projectId = crypto.randomUUID();

    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        appToast.error("Proje fotoğrafı bir görsel dosyası olmalı.");
        return;
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        appToast.error("Proje fotoğrafı en fazla 5 MB olabilir.");
        return;
      }

      imagePath = `${user.id}/${projectId}.${getImageExtension(imageFile)}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(imagePath, imageFile, {
          cacheControl: "3600",
          contentType: imageFile.type,
          upsert: true,
        });

      if (uploadError) {
        appToast.error(uploadError.message || "Proje fotoğrafı yüklenemedi.");
        return;
      }

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(imagePath);
      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("projects").insert({
      id: projectId,
      category: "other",
      description: values.description.trim(),
      image_path: imagePath,
      image_url: imageUrl,
      name: values.name.trim(),
      owner_id: user.id,
      status: "idea",
      technologies: values.technologies?.trim() || null,
      url: values.url.trim(),
    });

    if (error) {
      appToast.error(error.message || "Proje eklenemedi.");
      return;
    }

    appToast.success("Proje eklendi.");
    onClose();
    reset();
    setImageFile(null);
    setImagePreviewUrl(null);
    router.refresh();
  });

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          aria-modal="true"
          role="dialog"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Modalı kapat"
            onClick={closeAndReset}
          />

          <motion.div
            className="relative w-full max-w-lg rounded-lg border border-white/12 bg-[#0b0b0c] text-white"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Kapat"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 transition hover:border-white/24 hover:text-white"
              onClick={closeAndReset}
            >
              <XIcon />
            </button>

            <div className="border-b border-white/10 px-6 py-5 pr-16">
              <h2 className="text-lg font-semibold text-white">
                Yeni Proje Ekle
              </h2>
              <p className="mt-1 text-sm leading-6 text-white/52">
                Profilinde sergilenecek kısa bir proje kaydı oluştur.
              </p>
            </div>

            <form className="space-y-5 px-6 py-5" noValidate onSubmit={onSubmit}>
              <div>
                <p className={labelClassName}>Proje Fotoğrafı</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center">
                  <div
                    className="aspect-square rounded-md border border-white/12 bg-white/[0.03] bg-cover bg-center"
                    style={
                      imagePreviewUrl
                        ? { backgroundImage: `url(${imagePreviewUrl})` }
                        : undefined
                    }
                    aria-label="Proje fotoğrafı önizlemesi"
                  />
                  <div>
                    <label
                      htmlFor="project-image"
                      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-white/12 px-4 text-sm font-medium text-white/78 transition hover:border-white/24 hover:text-white"
                    >
                      Fotoğraf seç
                    </label>
                    <input
                      id="project-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="sr-only"
                      disabled={isSubmitting}
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        setImageFile(file);

                        if (imagePreviewUrl) {
                          URL.revokeObjectURL(imagePreviewUrl);
                        }

                        setImagePreviewUrl(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    <p className="mt-2 text-xs text-white/38">
                      PNG, JPG, WEBP veya GIF. Maksimum 5 MB.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="project-name" className={labelClassName}>
                  Proje Adı
                </label>
                <input
                  id="project-name"
                  className={cn(
                    fieldClassName,
                    errors.name && "border-red-400/70",
                  )}
                  placeholder="Ankara Build Club"
                  disabled={isSubmitting}
                  {...register("name")}
                />
                {errors.name?.message ? (
                  <p className={errorClassName}>{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="project-url" className={labelClassName}>
                  Proje URL&apos;i
                </label>
                <input
                  id="project-url"
                  type="url"
                  className={cn(
                    fieldClassName,
                    errors.url && "border-red-400/70",
                  )}
                  placeholder="https://example.com"
                  disabled={isSubmitting}
                  {...register("url")}
                />
                {errors.url?.message ? (
                  <p className={errorClassName}>{errors.url.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="project-tech" className={labelClassName}>
                  Kullanılan Teknolojiler
                </label>
                <input
                  id="project-tech"
                  className={cn(
                    fieldClassName,
                    errors.technologies && "border-red-400/70",
                  )}
                  placeholder="Next.js, Supabase, Tailwind"
                  disabled={isSubmitting}
                  {...register("technologies")}
                />
                {errors.technologies?.message ? (
                  <p className={errorClassName}>{errors.technologies.message}</p>
                ) : null}
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="project-description" className={labelClassName}>
                    Kısa Açıklama
                  </label>
                  <span className="text-xs text-white/38">
                    {descriptionLength}/150
                  </span>
                </div>
                <textarea
                  id="project-description"
                  maxLength={150}
                  rows={4}
                  className={cn(
                    fieldClassName,
                    "resize-none",
                    errors.description && "border-red-400/70",
                  )}
                  placeholder="Proje ne yapıyor?"
                  disabled={isSubmitting}
                  {...register("description")}
                />
                {errors.description?.message ? (
                  <p className={errorClassName}>{errors.description.message}</p>
                ) : null}
              </div>

              <div className="flex justify-end gap-2 border-t border-white/10 pt-5">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-medium text-white/70 transition hover:border-white/24 hover:text-white disabled:pointer-events-none disabled:opacity-50"
                  disabled={isSubmitting}
                  onClick={closeAndReset}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/88 disabled:pointer-events-none disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Ekleniyor..." : "Ekle"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
