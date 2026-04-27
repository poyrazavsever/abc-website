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
  buildAuthCallbackUrl,
  getAuthErrorMessage,
  getLoginHref,
  getPostAuthRedirectTarget,
  getSafeNextPath,
} from "@/lib/auth/shared";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth";
import { createSupabaseClient } from "@/lib/supabase/client";

const authUnavailableMessage =
  "Kayit servisi su anda kullanilamiyor. Lutfen kisa bir sure sonra tekrar deneyin.";

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

    if (data.session && data.user) {
      router.replace(getPostAuthRedirectTarget(data.user, nextPath));
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
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {successMessage ? (
        <Alert variant="success">
          <AlertTitle>Kayit tamamlandi</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert variant="danger">
          <AlertTitle>Kayit basarisiz</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      <Field label="Ad soyad" error={errors.fullName?.message} required>
        <Input
          autoComplete="name"
          placeholder="Ad Soyad"
          invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
      </Field>

      <Field label="E-posta" error={errors.email?.message} required>
        <Input
          type="email"
          autoComplete="email"
          placeholder="hello@ankarabuildclub.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <Field
        label="Sifre"
        description="Minimum 8 karakter kullanin."
        error={errors.password?.message}
        required
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="Guclu bir sifre belirleyin"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>

      <Field
        label="Sifre tekrari"
        error={errors.confirmPassword?.message}
        required
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="Sifrenizi tekrar girin"
          invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
      </Field>

      <Button type="submit" block loading={isSubmitting}>
        Kayit Ol
      </Button>

      <p className="text-sm leading-6 text-text-muted">
        Zaten hesabiniz varsa giris akisina gecin:{" "}
        <Link
          href={getLoginHref(nextPath)}
          className="font-semibold text-primary transition hover:text-primary-700"
        >
          Giris Yap
        </Link>
      </p>
    </form>
  );
}
