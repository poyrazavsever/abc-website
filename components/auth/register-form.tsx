"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeading } from "@/components/auth/auth-heading";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import {
  getAuthContinueHref,
  getLoginHref,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { registerWithPassword } from "@/lib/auth/client";
import { trackClientEvent } from "@/lib/integrations/analytics/client";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

const inputClassName =
  "h-12 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 text-sm text-brand-white outline-none transition placeholder:text-white/38 focus:border-accent focus:ring-2 focus:ring-accent/25";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams],
  );

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    let data;

    try {
      data = await registerWithPassword({
        email: values.email,
        fullName: values.fullName,
        nextPath,
        password: values.password,
      });
    } catch (error) {
      appToast.error(
        error instanceof Error ? error.message : "Sign-up could not be completed.",
      );
      return;
    }

    await trackClientEvent("user_registered");

    if (data.session && data.user) {
      appToast.success("Signed up successfully.");
      router.replace(getAuthContinueHref(nextPath));
      router.refresh();
      return;
    }

    reset({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      password: "",
      confirmPassword: "",
    });
    appToast.success("A verification link has been sent to your email address.");
  });

  return (
    <div className="w-full">
      <AuthHeading title="Sign up" />

      <form className="space-y-4" noValidate onSubmit={onSubmit}>
        <div>
          <label htmlFor="register-full-name" className="sr-only">
            Full name
          </label>
          <input
            id="register-full-name"
            autoComplete="name"
            placeholder="Full name"
            className={cn(
              inputClassName,
              errors.fullName && "border-danger-400",
            )}
            {...register("fullName")}
          />
          {errors.fullName?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="register-email" className="sr-only">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={cn(inputClassName, errors.email && "border-danger-400")}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="register-password" className="sr-only">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            className={cn(
              inputClassName,
              errors.password && "border-danger-400",
            )}
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="register-confirm-password" className="sr-only">
            Confirm password
          </label>
          <input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            className={cn(
              inputClassName,
              errors.confirmPassword && "border-danger-400",
            )}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_44px_rgb(70_44_125_/_0.28)] transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <AuthDivider />
      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-white/58">
        Already have an account?{" "}
        <Link
          href={getLoginHref(nextPath)}
          className="font-semibold text-white transition hover:text-accent-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
