"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Field,
  Input,
} from "@/components/ui";
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

const authUnavailableMessage =
  "Registration is currently unavailable. Please try again shortly.";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      `A verification link was sent to ${values.email.trim()}. After confirming your email, you will be redirected to onboarding.`,
    );
  });

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {successMessage ? (
        <Alert
          variant="success"
          className="border-white/12 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.2)]"
        >
          <AlertTitle className="text-white">Registration complete</AlertTitle>
          <AlertDescription className="text-white/72">
            {successMessage}
          </AlertDescription>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert
          variant="danger"
          className="border-danger/35 bg-danger/12 text-white shadow-[0_16px_36px_rgba(0,0,0,0.2)]"
        >
          <AlertTitle className="text-white">Registration failed</AlertTitle>
          <AlertDescription className="text-white/72">
            {submitError}
          </AlertDescription>
        </Alert>
      ) : null}

      <Field
        label="Full name"
        error={errors.fullName?.message}
        required
        className="[&>label]:text-white [&_p]:text-white/58"
      >
        <Input
          autoComplete="name"
          placeholder="Your full name"
          invalid={Boolean(errors.fullName)}
          className="h-12 rounded-xl border-white/12 bg-white/7 text-white shadow-none placeholder:text-white/34 hover:border-white/18 focus-visible:ring-white/25 focus-visible:ring-offset-0"
          {...register("fullName")}
        />
      </Field>

      <Field
        label="Email"
        error={errors.email?.message}
        required
        className="[&>label]:text-white [&_p]:text-white/58"
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="hello@ankarabuildclub.com"
          invalid={Boolean(errors.email)}
          className="h-12 rounded-xl border-white/12 bg-white/7 text-white shadow-none placeholder:text-white/34 hover:border-white/18 focus-visible:ring-white/25 focus-visible:ring-offset-0"
          {...register("email")}
        />
      </Field>

      <Field
        label="Password"
        description="Use at least 8 characters."
        error={errors.password?.message}
        required
        className="[&>label]:text-white [&_p]:text-white/58"
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          invalid={Boolean(errors.password)}
          className="h-12 rounded-xl border-white/12 bg-white/7 text-white shadow-none placeholder:text-white/34 hover:border-white/18 focus-visible:ring-white/25 focus-visible:ring-offset-0"
          {...register("password")}
        />
      </Field>

      <Field
        label="Confirm password"
        error={errors.confirmPassword?.message}
        required
        className="[&>label]:text-white [&_p]:text-white/58"
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          invalid={Boolean(errors.confirmPassword)}
          className="h-12 rounded-xl border-white/12 bg-white/7 text-white shadow-none placeholder:text-white/34 hover:border-white/18 focus-visible:ring-white/25 focus-visible:ring-offset-0"
          {...register("confirmPassword")}
        />
      </Field>

      <Button
        type="submit"
        block
        loading={isSubmitting}
        className="h-12 rounded-[1rem] border-0 bg-[linear-gradient(90deg,var(--color-highlight-400),var(--color-accent-500),var(--color-info-400))] text-white shadow-[0_18px_40px_rgba(213,82,163,0.24)] hover:brightness-110"
      >
        Create account
      </Button>

      <p className="text-sm leading-6 text-white/60">
        Already have an account?{" "}
        <Link
          href={getLoginHref(nextPath)}
          className="font-semibold text-accent-300 transition hover:text-white"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
