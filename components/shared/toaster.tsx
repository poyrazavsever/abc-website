"use client";

import { Toaster } from "react-hot-toast";

import {
  TOAST_BASE_CLASSNAME,
  TOAST_DURATIONS,
  TOAST_GUTTER,
  TOAST_POSITION,
  TOAST_VARIANT_CLASSNAMES,
} from "@/lib/config/toast.config";
import { cn } from "@/lib/utils/cn";

export function AppToaster() {
  return (
    <Toaster
      position={TOAST_POSITION}
      gutter={TOAST_GUTTER}
      containerClassName="z-50"
      toastOptions={{
        duration: TOAST_DURATIONS.default,
        className: cn(TOAST_BASE_CLASSNAME, TOAST_VARIANT_CLASSNAMES.default),
        iconTheme: {
          primary: "var(--color-primary-foreground)",
          secondary: "var(--color-primary)",
        },
        success: {
          duration: TOAST_DURATIONS.success,
          className: cn(TOAST_BASE_CLASSNAME, TOAST_VARIANT_CLASSNAMES.success),
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--color-success-foreground)",
          },
        },
        error: {
          duration: TOAST_DURATIONS.error,
          className: cn(TOAST_BASE_CLASSNAME, TOAST_VARIANT_CLASSNAMES.error),
          iconTheme: {
            primary: "var(--color-danger)",
            secondary: "var(--color-danger-foreground)",
          },
        },
      }}
    />
  );
}
