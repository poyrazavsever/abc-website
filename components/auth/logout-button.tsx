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
  children = "Cikis Yap",
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
      appToast.error("Cikis servisi su anda kullanilamiyor.");
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoading(false);
      appToast.error("Cikis sirasinda bir hata olustu.");
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
