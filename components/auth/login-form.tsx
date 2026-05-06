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
import { createSupabaseClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import {
  getAuthContinueHref,
  getAuthErrorMessage,
  getRegisterHref,
  getSafeNextPath,
} from "@/lib/auth/shared";

const authUnavailableMessage =
  "Sign-in is currently unavailable. Please try again shortly.";

function getQueryMessage(message: string | null) {
  const trimmedMessage = message?.trim();

  if (!trimmedMessage) {
    return null;
  }

  if (trimmedMessage === "callback") {
    return "We could not complete session verification. Please try the link again.";
  }

  return trimmedMessage;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      setSubmitError("We could not create your session. Please try again.");
      return;
    }

    router.replace(getAuthContinueHref(nextPath));
    router.refresh();
  });

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {queryMessage ? (
        <Alert
          variant="warning"
          className="border-white/12 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.2)]"
        >
          <AlertTitle className="text-white">Please sign in again</AlertTitle>
          <AlertDescription className="text-white/72">
            {queryMessage}
          </AlertDescription>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert
          variant="danger"
          className="border-danger/35 bg-danger/12 text-white shadow-[0_16px_36px_rgba(0,0,0,0.2)]"
        >
          <AlertTitle className="text-white">Sign-in failed</AlertTitle>
          <AlertDescription className="text-white/72">
            {submitError}
          </AlertDescription>
        </Alert>
      ) : null}

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
        error={errors.password?.message}
        required
        className="[&>label]:text-white [&_p]:text-white/58"
      >
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          invalid={Boolean(errors.password)}
          className="h-12 rounded-xl border-white/12 bg-white/7 text-white shadow-none placeholder:text-white/34 hover:border-white/18 focus-visible:ring-white/25 focus-visible:ring-offset-0"
          {...register("password")}
        />
      </Field>

      <Button
        type="submit"
        block
        loading={isSubmitting}
        className="h-12 rounded-[1rem] border-0 bg-[linear-gradient(90deg,var(--color-highlight-400),var(--color-accent-500),var(--color-info-400))] text-white shadow-[0_18px_40px_rgba(213,82,163,0.24)] hover:brightness-110"
      >
        Sign in
      </Button>

      <p className="text-sm leading-6 text-white/60">
        Don&apos;t have an account yet?{" "}
        <Link
          href={getRegisterHref(nextPath)}
          className="font-semibold text-accent-300 transition hover:text-white"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
