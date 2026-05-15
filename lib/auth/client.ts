"use client";

import {
  buildAuthCallbackUrl,
  getAuthErrorMessage,
} from "@/lib/auth/shared";
import { createSupabaseClient } from "@/lib/supabase/client";

const authUnavailableMessage =
  "Authentication is unavailable right now. Check your Supabase configuration.";

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.trim() || window.location.origin;
}

function getAuthClientOrThrow() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    throw new Error(authUnavailableMessage);
  }

  return supabase;
}

export async function loginWithPassword(input: {
  email: string;
  password: string;
}) {
  const supabase = getAuthClientOrThrow();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  if (!data.user) {
    throw new Error("Session could not be created. Please try again.");
  }

  return data.user;
}

export async function registerWithPassword(input: {
  email: string;
  fullName: string;
  nextPath: string | null;
  password: string;
}) {
  const supabase = getAuthClientOrThrow();
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      emailRedirectTo: buildAuthCallbackUrl(getAppUrl(), input.nextPath),
      data: {
        full_name: input.fullName.trim(),
        onboarding_completed: false,
      },
    },
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }

  return data;
}

export async function loginWithGoogle(nextPath: string | null) {
  const supabase = getAuthClientOrThrow();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: buildAuthCallbackUrl(getAppUrl(), nextPath),
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw new Error(getAuthErrorMessage(error.message));
  }
}
