"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeading } from "@/components/auth/auth-heading";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import {
  getAuthContinueHref,
  getAuthErrorMessage,
  getRegisterHref,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { createSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";
import { appToast } from "@/lib/utils/toast";

const authUnavailableMessage =
  "Giriş servisi şu anda kullanılamıyor. Lütfen kısa bir süre sonra tekrar deneyin.";

function getQueryMessage(message: string | null) {
  const trimmedMessage = message?.trim();

  if (!trimmedMessage) {
    return null;
  }

  if (trimmedMessage === "callback") {
    return "Oturum doğrulamasi tamamlanamadı. Google ile tekrar deneyin.";
  }

  return trimmedMessage;
}

const inputClassName =
  "h-12 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 text-sm text-brand-white outline-none transition placeholder:text-white/38 focus:border-accent focus:ring-2 focus:ring-accent/25";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams],
  );
  const queryMessage = useMemo(
    () => getQueryMessage(searchParams.get("message")),
    [searchParams],
  );

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (queryMessage) {
      appToast.error(queryMessage);
    }
  }, [queryMessage]);

  const onSubmit = handleSubmit(async (values) => {
    const supabase = createSupabaseClient();

    if (!supabase) {
      appToast.error(authUnavailableMessage);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      appToast.error(getAuthErrorMessage(error.message));
      return;
    }

    if (!data.user) {
      appToast.error("Oturum oluşturulamadı. Lütfen yeniden deneyin.");
      return;
    }

    appToast.success("Giriş başarılı.");
    router.replace(getAuthContinueHref(nextPath));
    router.refresh();
  });

  return (
    <div className="w-full">
      <AuthHeading title="Giriş yap" />

      <form className="space-y-4" noValidate onSubmit={onSubmit}>
        <div>
          <label htmlFor="login-email" className="sr-only">
            E-posta
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="E-posta"
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
          <label htmlFor="login-password" className="sr-only">
            Şifre
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Şifre"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_44px_rgb(70_44_125_/_0.28)] transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>

      <AuthDivider />
      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-white/58">
        Hesabın yok mu?{" "}
        <Link
          href={getRegisterHref(nextPath)}
          className="font-semibold text-white transition hover:text-accent-300"
        >
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}
