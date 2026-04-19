export const TOAST_POSITION = "top-right" as const;
export const TOAST_GUTTER = 12;

export const TOAST_DURATIONS = {
  default: 4000,
  success: 3000,
  warning: 5000,
  error: 5000,
  info: 4000,
} as const;

export type ToastVariant = keyof typeof TOAST_DURATIONS;

export const TOAST_BASE_CLASSNAME =
  "rounded-lg border px-4 py-3 text-sm font-medium shadow-sm";

export const TOAST_VARIANT_CLASSNAMES: Record<ToastVariant, string> = {
  default: "bg-primary text-primary-foreground border-primary-700",
  success: "bg-success-50 text-success border-success-200",
  warning: "bg-warning-50 text-warning border-warning-200",
  error: "bg-danger-50 text-danger border-danger-200",
  info: "bg-info-50 text-info border-info-200",
};
