"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getOnboardingHref } from "@/lib/auth/shared";
import { createSupabaseClient } from "@/lib/supabase/client";
import {
  onboardingDetailsSchema,
  type OnboardingDetailsFormValues,
} from "@/lib/schemas/onboarding";
import type { ProfileRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

type OnboardingDetailsFormProps = {
  profile: ProfileRecord;
};

const inputClassName =
  "rounded-md border-white/18 bg-white/[0.04] text-sm text-white shadow-none placeholder:text-white/38 hover:border-white/28 focus-visible:ring-accent/30 focus-visible:ring-offset-brand-black";

const labelClassName = "text-xs font-semibold text-white";
const errorClassName = "mt-2 text-xs text-danger-300";

export function OnboardingDetailsForm({ profile }: OnboardingDetailsFormProps) {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<OnboardingDetailsFormValues>({
    resolver: zodResolver(onboardingDetailsSchema),
    defaultValues: {
      bio: profile.bio,
      githubUsername: profile.githubUsername ?? "",
      instagramUsername: profile.instagramUsername ?? "",
      linkedinUsername: profile.linkedinUsername ?? "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase is unavailable right now.");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          bio: values.bio.trim(),
          github_username: values.githubUsername.trim() || null,
          instagram_username: values.instagramUsername.trim() || null,
          linkedin_username: values.linkedinUsername.trim() || null,
          onboarding_step: "project",
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      appToast.success("Profile details saved.");
      router.push(getOnboardingHref("project"));
      router.refresh();
    } catch (error) {
      appToast.error(
        error instanceof Error
          ? error.message
          : "Profile details could not be saved.",
      );
    }
  });

  async function handleSkip() {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error("Supabase is unavailable right now.");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_step: "project" })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      router.push(getOnboardingHref("project"));
      router.refresh();
    } catch (error) {
      appToast.error(
        error instanceof Error ? error.message : "This step could not be skipped.",
      );
    }
  }

  return (
    <form className="space-y-6" noValidate onSubmit={onSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-white">
          Tell us about yourself
        </h1>
        <p className="text-sm text-white/66">
          Your bio and social handles will appear on your profile card.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="bio" className={labelClassName}>
            Bio
          </label>
          <Textarea
            id="bio"
            className={cn(
              inputClassName,
              "min-h-32 resize-none",
              errors.bio && "border-danger-400",
            )}
            placeholder="What are you building, and what are you focused on?"
            {...register("bio")}
          />
          {errors.bio?.message ? (
            <p className={errorClassName}>{errors.bio.message}</p>
          ) : null}
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="githubUsername" className={labelClassName}>
              GitHub username
            </label>
            <Input
              id="githubUsername"
              className={cn(
                inputClassName,
                errors.githubUsername && "border-danger-400",
              )}
              placeholder="octocat"
              {...register("githubUsername")}
            />
            {errors.githubUsername?.message ? (
              <p className={errorClassName}>{errors.githubUsername.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="linkedinUsername" className={labelClassName}>
              LinkedIn username
            </label>
            <Input
              id="linkedinUsername"
              className={cn(
                inputClassName,
                errors.linkedinUsername && "border-danger-400",
              )}
              placeholder="ad-soyad"
              {...register("linkedinUsername")}
            />
            {errors.linkedinUsername?.message ? (
              <p className={errorClassName}>
                {errors.linkedinUsername.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="instagramUsername" className={labelClassName}>
              Instagram username
            </label>
            <Input
              id="instagramUsername"
              className={cn(
                inputClassName,
                errors.instagramUsername && "border-danger-400",
              )}
              placeholder="ankarabuildclub"
              {...register("instagramUsername")}
            />
            {errors.instagramUsername?.message ? (
              <p className={errorClassName}>
                {errors.instagramUsername.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <Button
          href={getOnboardingHref("profile")}
          variant="ghost"
          className="h-11 rounded-md border-white/16 bg-white/[0.04] px-5 text-white shadow-none hover:border-white/28 hover:bg-white/[0.08]"
        >
          Back
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          className="h-11 min-w-28 rounded-md border-white bg-white px-6 text-brand-black shadow-none hover:border-white hover:bg-white/90"
        >
          Next
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={handleSkip}
          className="h-11 rounded-md border-white/16 bg-white/[0.04] px-5 text-white shadow-none hover:border-white/28 hover:bg-white/[0.08]"
        >
          Skip
        </Button>
      </div>
    </form>
  );
}
