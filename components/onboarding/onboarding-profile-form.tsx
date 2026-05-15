"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { builderRoleOptions, turkiyeCityOptions } from "@/lib/data/onboarding.data";
import { getOnboardingHref } from "@/lib/auth/shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import {
  onboardingProfileSchema,
  type OnboardingProfileFormValues,
} from "@/lib/schemas/onboarding";
import type { ProfileRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

type OnboardingProfileFormProps = {
  profile: ProfileRecord;
  userEmail: string | null;
};

const inputClassName =
  "h-10 rounded-md border-white/18 bg-white/[0.04] text-sm text-white shadow-none placeholder:text-white/38 hover:border-white/28 focus-visible:ring-accent/30 focus-visible:ring-offset-brand-black";
const selectOptionClassName = "bg-brand-black text-white";

const labelClassName = "text-xs font-semibold text-white";
const errorClassName = "mt-2 text-xs text-danger-300";

function getInitialCity(city: string) {
  return turkiyeCityOptions.some((option) => option.value === city)
    ? city
    : "Ankara";
}

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

export function OnboardingProfileForm({
  profile,
  userEmail,
}: OnboardingProfileFormProps) {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarObjectUrl, setAvatarObjectUrl] = useState<string | null>(null);
  const avatarObjectUrlRef = useRef<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<OnboardingProfileFormValues>({
    resolver: zodResolver(onboardingProfileSchema),
    defaultValues: {
      fullName: profile.fullName,
      city: getInitialCity(profile.city),
      role: profile.role,
    },
  });

  useEffect(() => {
    return () => {
      if (avatarObjectUrlRef.current) {
        URL.revokeObjectURL(avatarObjectUrlRef.current);
      }
    };
  }, []);

  const avatarPreview = avatarObjectUrl ?? profile.avatarUrl;

  const initials = useMemo(() => {
    const parts = profile.fullName.trim().split(/\s+/u).filter(Boolean);
    return (parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "B");
  }, [profile.fullName]);

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase is unavailable right now.");
      return;
    }

    try {
      let avatarPath = profile.avatarPath;
      let avatarUrl = profile.avatarUrl;

      if (avatarFile) {
        if (!avatarFile.type.startsWith("image/")) {
          appToast.error("Profile photo must be an image file.");
          return;
        }

        if (avatarFile.size > 5 * 1024 * 1024) {
          appToast.error("Profile photo must be 5 MB or smaller.");
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
          city: values.city,
          full_name: values.fullName.trim(),
          onboarding_step: "details",
          role: values.role,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: values.fullName.trim(),
          onboarding_completed: false,
        },
      });

      appToast.success("Profile information saved.");
      router.push(getOnboardingHref("details"));
      router.refresh();
    } catch (error) {
      appToast.error(
        error instanceof Error
          ? error.message
          : "Profile information could not be saved.",
      );
    }
  });

  return (
    <form className="space-y-6" noValidate onSubmit={onSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-white">
          Create your profile
        </h1>
        <p className="text-sm text-white/66">
          Add the core details that define how you appear in ABC.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white/[0.05] text-lg font-semibold text-white",
            avatarPreview && "bg-cover bg-center text-transparent",
          )}
          style={
            avatarPreview ? { backgroundImage: `url(${avatarPreview})` } : undefined
          }
          aria-label="Profile photo preview"
        >
          {initials.toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <label
            htmlFor="avatar"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-4 text-sm font-semibold text-white transition hover:border-white/32 hover:bg-white/[0.08]"
          >
            Choose photo
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;

              if (avatarObjectUrlRef.current) {
                URL.revokeObjectURL(avatarObjectUrlRef.current);
                avatarObjectUrlRef.current = null;
              }

              setAvatarFile(file);

              if (file) {
                const objectUrl = URL.createObjectURL(file);
                avatarObjectUrlRef.current = objectUrl;
                setAvatarObjectUrl(objectUrl);
                return;
              }

              setAvatarObjectUrl(null);
            }}
          />
          <p className="mt-2 text-xs text-white/48">
            PNG, JPG, WEBP, or GIF. Maximum 5 MB.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className={labelClassName}>
            Full name
          </label>
          <Input
            id="fullName"
            autoComplete="name"
            className={cn(inputClassName, errors.fullName && "border-danger-400")}
            placeholder="Enter your full name"
            {...register("fullName")}
          />
          {errors.fullName?.message ? (
            <p className={errorClassName}>{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <Input
            id="email"
            className={cn(inputClassName, "text-white/58")}
            disabled
            value={userEmail ?? ""}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className={labelClassName}>
              Location
            </label>
            <Select
              id="city"
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
            <label htmlFor="role" className={labelClassName}>
              Role
            </label>
            <Select
              id="role"
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
      </div>

      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          loading={isSubmitting}
          className="h-11 min-w-28 rounded-md border-white bg-white px-6 text-brand-black shadow-none hover:border-white hover:bg-white/90"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
