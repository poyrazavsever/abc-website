"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import {
  builderRoleOptions,
  turkiyeCityOptions,
} from "@/lib/data/onboarding.data";
import {
  profileEditSchema,
  type ProfileEditFormValues,
} from "@/lib/schemas/onboarding";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { ProfileRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

type ProfileEditModalProps = {
  profile: ProfileRecord;
};

const inputClassName =
  "rounded-md border-white/14 bg-white/[0.05] text-sm text-white shadow-none placeholder:text-white/38 hover:border-white/28 focus-visible:ring-accent/30 focus-visible:ring-offset-ink-950";
const labelClassName = "text-xs font-semibold text-white";
const errorClassName = "mt-2 text-xs text-danger-300";
const selectOptionClassName = "bg-brand-black text-white";

function getAvatarExtension(file: File) {
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

function getInitialCity(city: string) {
  return turkiyeCityOptions.some((option) => option.value === city)
    ? city
    : "Ankara";
}

function EditIcon() {
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
      <path d="M4.25 13.75 3.5 16.5l2.75-.75L15 7l-2-2-8.75 8.75Z" />
      <path d="m11.75 6.25 2 2" />
    </svg>
  );
}

export function ProfileEditModal({ profile }: ProfileEditModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarObjectUrl, setAvatarObjectUrl] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      bio: profile.bio,
      city: getInitialCity(profile.city),
      fullName: profile.fullName,
      githubUsername: profile.githubUsername ?? "",
      instagramUsername: profile.instagramUsername ?? "",
      linkedinUsername: profile.linkedinUsername ?? "",
      role: profile.role,
    },
  });

  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  useEffect(() => {
    if (editParam === "true") {
      setOpen(true);
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [editParam, router]);

  useEffect(() => {
    return () => {
      if (avatarObjectUrl) {
        URL.revokeObjectURL(avatarObjectUrl);
      }
    };
  }, [avatarObjectUrl]);

  const avatarPreview = avatarObjectUrl ?? profile.avatarUrl;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      return;
    }

    reset();
    setAvatarFile(null);

    setAvatarObjectUrl(null);
  };

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase bağlantısı şu anda kullanılamıyor.");
      return;
    }

    try {
      let avatarPath = profile.avatarPath;
      let avatarUrl = profile.avatarUrl;

      if (avatarFile) {
        if (!avatarFile.type.startsWith("image/")) {
          appToast.error("Profil fotoğrafı bir görsel dosyası olmalı.");
          return;
        }

        if (avatarFile.size > 5 * 1024 * 1024) {
          appToast.error("Profil fotoğrafı en fazla 5 MB olabilir.");
          return;
        }

        const extension = getAvatarExtension(avatarFile);
        avatarPath = `${profile.id}/avatar.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-avatars")
          .upload(avatarPath, avatarFile, {
            cacheControl: "3600",
            contentType: avatarFile.type,
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("profile-avatars")
          .getPublicUrl(avatarPath);
        avatarUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_path: avatarPath,
          avatar_url: avatarUrl,
          bio: values.bio.trim(),
          city: values.city,
          full_name: values.fullName.trim(),
          github_username: values.githubUsername.trim() || null,
          instagram_username: values.instagramUsername.trim() || null,
          linkedin_username: values.linkedinUsername.trim() || null,
          role: values.role,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: values.fullName.trim(),
          onboarding_completed: profile.onboardingCompleted,
        },
      });

      appToast.success("Profil güncellendi.");
      handleOpenChange(false);
      router.refresh();
    } catch (error) {
      appToast.error(
        error instanceof Error ? error.message : "Profil güncellenemedi.",
      );
    }
  });

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        leadingIcon={<EditIcon />}
        className="h-11 rounded-full border-white/14 bg-white/[0.08] px-5 text-white shadow-none hover:border-white/28 hover:bg-white/[0.12]"
        onClick={() => setOpen(true)}
      >
        Düzenle
      </Button>

      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
        size="xl"
        className="border-white/12 bg-ink-950 text-white shadow-[0_32px_90px_rgb(0_0_0_/_0.55)]"
      >
        <DialogHeader className="border-b border-white/10 pr-16">
          <DialogTitle className="text-white">Profili düzenle</DialogTitle>
          <DialogDescription className="text-ink-300">
            Profil fotoğrafı, konum, bio ve sosyal kullanıcı adlarını güncelle.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <form className="space-y-6" noValidate onSubmit={onSubmit}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/14 bg-white/[0.06] text-lg font-semibold text-white",
                  avatarPreview && "bg-cover bg-center text-transparent",
                )}
                style={
                  avatarPreview
                    ? { backgroundImage: `url(${avatarPreview})` }
                    : undefined
                }
                aria-label="Profil fotoğrafı önizlemesi"
              >
                {profile.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <label
                  htmlFor="profile-avatar"
                  className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/16 bg-white/[0.05] px-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.1]"
                >
                  Fotoğraf seç
                </label>
                <input
                  id="profile-avatar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;

                    if (avatarObjectUrl) {
                      URL.revokeObjectURL(avatarObjectUrl);
                    }

                    setAvatarFile(file);

                    if (!file) {
                      setAvatarObjectUrl(null);
                      return;
                    }

                    const objectUrl = URL.createObjectURL(file);
                    setAvatarObjectUrl(objectUrl);
                  }}
                />
                <p className="mt-2 text-xs text-white/48">
                  PNG, JPG, WEBP veya GIF. Maksimum 5 MB.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-fullName" className={labelClassName}>
                  Ad soyad
                </label>
                <Input
                  id="edit-fullName"
                  className={cn(
                    inputClassName,
                    errors.fullName && "border-danger-400",
                  )}
                  {...register("fullName")}
                />
                {errors.fullName?.message ? (
                  <p className={errorClassName}>{errors.fullName.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="edit-city" className={labelClassName}>
                  Konum
                </label>
                <Select
                  id="edit-city"
                  className={cn(inputClassName, errors.city && "border-danger-400")}
                  {...register("city")}
                >
                  {turkiyeCityOptions.map((city) => (
                    <option
                      key={city.value}
                      value={city.value}
                      className={selectOptionClassName}
                    >
                      {city.label}
                    </option>
                  ))}
                </Select>
                {errors.city?.message ? (
                  <p className={errorClassName}>{errors.city.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="edit-role" className={labelClassName}>
                  Genel ünvan
                </label>
                <Select
                  id="edit-role"
                  className={cn(inputClassName, errors.role && "border-danger-400")}
                  {...register("role")}
                >
                  {builderRoleOptions.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                      className={selectOptionClassName}
                    >
                      {role.label}
                    </option>
                  ))}
                </Select>
                {errors.role?.message ? (
                  <p className={errorClassName}>{errors.role.message}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="edit-bio" className={labelClassName}>
                Bio
              </label>
              <Textarea
                id="edit-bio"
                className={cn(
                  inputClassName,
                  "min-h-32 resize-none",
                  errors.bio && "border-danger-400",
                )}
                {...register("bio")}
              />
              {errors.bio?.message ? (
                <p className={errorClassName}>{errors.bio.message}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="edit-github" className={labelClassName}>
                  GitHub
                </label>
                <Input
                  id="edit-github"
                  className={cn(
                    inputClassName,
                    errors.githubUsername && "border-danger-400",
                  )}
                  placeholder="octocat"
                  {...register("githubUsername")}
                />
              </div>
              <div>
                <label htmlFor="edit-linkedin" className={labelClassName}>
                  LinkedIn
                </label>
                <Input
                  id="edit-linkedin"
                  className={cn(
                    inputClassName,
                    errors.linkedinUsername && "border-danger-400",
                  )}
                  placeholder="ad-soyad"
                  {...register("linkedinUsername")}
                />
              </div>
              <div>
                <label htmlFor="edit-instagram" className={labelClassName}>
                  Instagram
                </label>
                <Input
                  id="edit-instagram"
                  className={cn(
                    inputClassName,
                    errors.instagramUsername && "border-danger-400",
                  )}
                  placeholder="ankarabuildclub"
                  {...register("instagramUsername")}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full border-white/14 bg-white/[0.04] text-white shadow-none hover:bg-white/[0.08]"
                onClick={() => handleOpenChange(false)}
              >
                Vazgeç
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                className="rounded-full"
              >
                Kaydet
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
