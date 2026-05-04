"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  getAuthContinueHref,
  buildAuthCallbackUrl,
  getAuthErrorMessage,
  getLoginHref,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth";
import { createSupabaseClient } from "@/lib/supabase/client";
import { trackClientEvent } from "@/lib/integrations/analytics/client";
import { cn } from "@/lib/utils/cn";

const authUnavailableMessage =
  "Kayit servisi su anda kullanilamiyor. Lutfen kisa bir sure sonra tekrar deneyin.";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams],
  );

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = form;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -20,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.18 : 0.58,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const inputClassName =
    "w-full rounded-none border-b border-ink-800 bg-transparent px-2 py-3 text-brand-white placeholder:text-ink-400 transition-all outline-none focus:border-primary-500";
  const messageClassName =
    "rounded-2xl border px-4 py-3 text-sm leading-6";

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const supabase = createSupabaseClient();

    if (!supabase) {
      setSubmitError(authUnavailableMessage);
      return;
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() || window.location.origin;
    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        emailRedirectTo: buildAuthCallbackUrl(appUrl, nextPath),
        data: {
          full_name: values.fullName.trim(),
          onboarding_completed: false,
        },
      },
    });

    if (error) {
      setSubmitError(getAuthErrorMessage(error.message));
      return;
    }

    await trackClientEvent("user_registered");

    if (data.session && data.user) {
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
    setSuccessMessage(
      `${values.email.trim()} adresine dogrulama baglantisi gonderildi. E-postanizi onayladiktan sonra onboarding adimina yonlendirileceksiniz.`,
    );
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-md"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="mb-2 text-4xl font-medium text-brand-white">
          Bize Katil
        </h1>
        <p className="text-sm text-ink-300">
          Gelecegi insa edenlerin arasina katil.
        </p>
      </motion.div>

      {successMessage ? (
        <motion.div
          variants={itemVariants}
          className={cn(
            messageClassName,
            "mb-6 border-success-500/20 bg-success-500/10 text-brand-white",
          )}
        >
          {successMessage}
        </motion.div>
      ) : null}

      {submitError ? (
        <motion.div
          variants={itemVariants}
          className={cn(
            messageClassName,
            "mb-6 border-danger-500/20 bg-danger-500/10 text-danger-foreground",
          )}
        >
          {submitError}
        </motion.div>
      ) : null}

      <motion.form
        variants={containerVariants}
        noValidate
        onSubmit={onSubmit}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="register-full-name" className="sr-only">
            Ad Soyad
          </label>
          <input
            id="register-full-name"
            autoComplete="name"
            placeholder="Ad Soyad"
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
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="register-email" className="sr-only">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={cn(
              inputClassName,
              errors.email && "border-danger-400",
            )}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.email.message}
            </p>
          ) : null}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="register-password" className="sr-only">
            Sifre
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="Sifre"
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
          ) : (
            <p className="mt-2 text-xs text-ink-400">
              Minimum 8 karakter kullanin.
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-2">
          <label htmlFor="register-confirm-password" className="sr-only">
            Sifre Tekrari
          </label>
          <input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Sifre Tekrari"
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-full bg-brand-white px-5 py-3.5 font-medium text-brand-black transition-all hover:bg-ink-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Kayit olusturuluyor..." : "Kayit Ol"}
          </button>
        </motion.div>
      </motion.form>

      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-sm text-ink-300"
      >
        Zaten hesabin var mi?{" "}
        <Link
          href={getLoginHref(nextPath)}
          className="font-medium text-ink-300 transition-colors hover:text-brand-white"
        >
          Giris Yap
        </Link>
      </motion.p>
    </motion.div>
  );
}
