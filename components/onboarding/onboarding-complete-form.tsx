"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
} from "@/components/ui";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/auth/shared";
import { trackClientEvent } from "@/lib/integrations/analytics/client";

export function OnboardingCompleteForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleComplete = async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    const supabase = createSupabaseClient();

    if (!supabase) {
      setIsSubmitting(false);
      setSubmitError("Onboarding servisi şu anda kullanılamıyor.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        onboarding_completed: true,
      },
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitError(getAuthErrorMessage(error.message));
      return;
    }

    await trackClientEvent("onboarding_completed");

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      router.replace(`/profile/${userData.user.id}`);
    } else {
      router.replace("/builders");
    }
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {submitError ? (
        <Alert variant="danger">
          <AlertTitle>Onboarding tamamlanamadı</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="button" loading={isSubmitting} onClick={handleComplete}>
        Devam Et
      </Button>
    </div>
  );
}
