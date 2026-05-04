"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "@/components/ui";
import { createSupabaseClient } from "@/lib/supabase/client";
import { appToast } from "@/lib/utils/toast";

type LogoutButtonProps = Omit<ButtonProps, "loading" | "onClick" | "type"> & {
  onComplete?: () => void;
  redirectTo?: string;
};

export function LogoutButton({
  children = "Çıkış Yap",
  onComplete,
  redirectTo = "/login",
  ...props
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    const supabase = createSupabaseClient();

    if (!supabase) {
      setIsLoading(false);
      appToast.error("Çıkış servisi şu anda kullanılamıyor.");
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoading(false);
      appToast.error("Çıkış sırasında bir hata oluştu.");
      return;
    }

    onComplete?.();
    router.replace(redirectTo);
    router.refresh();
  };

  return (
    <Button type="button" loading={isLoading} onClick={handleLogout} {...props}>
      {children}
    </Button>
  );
}
