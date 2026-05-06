"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { loginWithGoogle } from "@/lib/auth/client";
import { getSafeNextPath } from "@/lib/auth/shared";
import { appToast } from "@/lib/utils/toast";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.14H12v4.05h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.44Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.89 6.62-2.33l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.99a6.01 6.01 0 0 1 0-3.98V7.42H3.07a10 10 0 0 0 0 9.16l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.89c1.47 0 2.79.5 3.83 1.5l2.86-2.87C16.96 2.91 14.7 2 12 2a10 10 0 0 0-8.93 5.42l3.34 2.59C7.2 7.65 9.4 5.89 12 5.89Z"
      />
    </svg>
  );
}

export function GoogleAuthButton() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nextPath = useMemo(
    () => getSafeNextPath(searchParams.get("next")),
    [searchParams],
  );

  async function handleGoogleAuth() {
    setIsSubmitting(true);

    try {
      await loginWithGoogle(nextPath);
    } catch (error) {
      appToast.error(
        error instanceof Error
          ? error.message
          : "Google ile giriş işlemi başlatılamadı.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={handleGoogleAuth}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-brand-white px-5 text-sm font-semibold text-brand-black shadow-[0_18px_44px_rgb(0_0_0_/_0.24)] transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:cursor-not-allowed disabled:opacity-65"
    >
      <GoogleIcon />
      <span>
        {isSubmitting ? "Google'a yönlendiriliyor..." : "Google ile devam et"}
      </span>
    </button>
  );
}
