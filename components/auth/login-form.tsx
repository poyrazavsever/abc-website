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
      setSubmitError("Oturum olusturulamadi. Lutfen yeniden deneyin.");
      return;
    }

    router.replace(getAuthContinueHref(nextPath));
    router.refresh();
  });

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {queryMessage ? (
        <Alert variant="warning">
          <AlertTitle>Devam etmek icin tekrar giris yapin</AlertTitle>
          <AlertDescription>{queryMessage}</AlertDescription>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert variant="danger">
          <AlertTitle>Giris basarisiz</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      <Field label="E-posta" error={errors.email?.message} required>
        <Input
          type="email"
          autoComplete="email"
          placeholder="hello@ankarabuildclub.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <Field label="Sifre" error={errors.password?.message} required>
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Sifrenizi girin"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>

      <Button type="submit" block loading={isSubmitting}>
        Giris Yap
      </Button>

      <p className="text-sm leading-6 text-text-muted">
        Henuz hesabiniz yoksa kayit akisini baslatin:{" "}
        <Link
          href={getRegisterHref(nextPath)}
          className="font-semibold text-primary transition hover:text-primary-700"
        >
          Kayit Ol
        </Link>
      </p>
    </form>
  );
}
