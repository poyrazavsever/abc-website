"use client";

import { toast, type ToastOptions } from "react-hot-toast";

import {
  TOAST_BASE_CLASSNAME,
  TOAST_DURATIONS,
  TOAST_VARIANT_CLASSNAMES,
  type ToastVariant,
} from "@/lib/config/toast.config";
import { cn } from "@/lib/utils/cn";

type ToastMessage = string;

function buildToastOptions(
  variant: ToastVariant,
  options?: ToastOptions,
): ToastOptions {
  return {
    ...options,
    duration: options?.duration ?? TOAST_DURATIONS[variant],
    className: cn(
      TOAST_BASE_CLASSNAME,
      TOAST_VARIANT_CLASSNAMES[variant],
      options?.className,
    ),
  };
}

export const appToast = {
  default(message: ToastMessage, options?: ToastOptions) {
    return toast(message, buildToastOptions("default", options));
  },
  success(message: ToastMessage, options?: ToastOptions) {
    return toast.success(message, buildToastOptions("success", options));
  },
  warning(message: ToastMessage, options?: ToastOptions) {
    return toast(message, {
      icon: "⚠",
      ...buildToastOptions("warning", options),
    });
  },
  error(message: ToastMessage, options?: ToastOptions) {
    return toast.error(message, buildToastOptions("error", options));
  },
  info(message: ToastMessage, options?: ToastOptions) {
    return toast(message, {
      icon: "i",
      ...buildToastOptions("info", options),
    });
  },
};
