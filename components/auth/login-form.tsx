"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createSupabaseClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import {
  getAuthContinueHref,
  getAuthErrorMessage,
  getRegisterHref,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { cn } from "@/lib/utils/cn";

const authUnavailableMessage =
  "Giris servisi su anda kullanilamiyor. Lutfen kisa bir sure sonra tekrar deneyin.";

function getQueryMessage(message: string | null) {
  const trimmedMessage = message?.trim();

  if (!trimmedMessage) {
    return null;
  }

  if (trimmedMessage === "callback") {
    return "Oturum dogrulamasi tamamlanamadi. Baglantiyi yeniden deneyin.";
  }

  return trimmedMessage;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams],
  );
  const queryMessage = useMemo(
    () => getQueryMessage(searchParams.get("message")),
    [searchParams],
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = form;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.18 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const inputClassName =
    "w-full rounded-xl border border-ink-800 bg-ink-950/50 px-5 py-3.5 text-brand-white placeholder:text-ink-400 transition-all outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const messageClassName =
    "rounded-2xl border px-4 py-3 text-sm leading-6";

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const supabase = createSupabaseClient();

    if (!supabase) {
      setSubmitError(authUnavailableMessage);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      setSubmitError(getAuthErrorMessage(error.message));
      return;
    }

    if (!data.user) {
      setSubmitError("Oturum olusturulamadi. Lutfen yeniden deneyin.");
      return;
    }

    router.replace(getAuthContinueHref(nextPath));
    router.refresh();
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
          Welcome back
        </h1>
        <p className="text-sm text-ink-300">Tekrar hos geldin</p>
      </motion.div>

      {queryMessage ? (
        <motion.div
          variants={itemVariants}
          className={cn(
            messageClassName,
            "mb-5 border-warning-500/20 bg-warning-500/10 text-warning-foreground",
          )}
        >
          {queryMessage}
        </motion.div>
      ) : null}

      {submitError ? (
        <motion.div
          variants={itemVariants}
          className={cn(
            messageClassName,
            "mb-5 border-danger-500/20 bg-danger-500/10 text-danger-foreground",
          )}
        >
          {submitError}
        </motion.div>
      ) : null}

      <motion.form
        variants={containerVariants}
        className="w-full"
        noValidate
        onSubmit={onSubmit}
      >
        <motion.div variants={itemVariants} className="mb-4">
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-brand-white"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(
              inputClassName,
              errors.email && "border-danger-400 focus:border-danger-400 focus:ring-danger-400",
            )}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.email.message}
            </p>
          ) : null}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-brand-white"
          >
            Sifre
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className={cn(
              inputClassName,
              errors.password &&
                "border-danger-400 focus:border-danger-400 focus:ring-danger-400",
            )}
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="mt-2 text-xs text-danger-300">
              {errors.password.message}
            </p>
          ) : null}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 text-right">
          <Link
            href="/login?message=Sifre%20sifirlama%20akisi%20yakinda."
            className="text-sm text-ink-300 transition-colors hover:text-brand-white"
          >
            Sifremi Unuttum
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary-500 px-5 py-3.5 font-medium text-brand-white transition-all hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Giris yapiliyor..." : "Giris Yap"}
          </button>
        </motion.div>
      </motion.form>

      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-sm text-ink-300"
      >
        Hesabin yok mu?{" "}
        <Link
          href={getRegisterHref(nextPath)}
          className="font-medium text-ink-300 transition-colors hover:text-brand-white"
        >
          Kayit Ol
        </Link>
      </motion.p>
    </motion.div>
  );
}
