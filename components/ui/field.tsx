"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";

type FieldControlProps = {
  id?: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export type FieldHintProps = HTMLAttributes<HTMLParagraphElement>;

export function FieldHint({ className, ...props }: FieldHintProps) {
  return <p className={cn("text-sm text-text-muted", className)} {...props} />;
}

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <p className={cn("text-sm font-medium text-danger", className)} {...props} />
  );
}

export type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  invalid?: boolean;
  htmlFor?: string;
  controlId?: string;
};

export function Field({
  children,
  className,
  label,
  description,
  error,
  required = false,
  invalid = false,
  htmlFor,
  controlId,
  ...props
}: FieldProps) {
  const generatedId = useId().replace(/:/g, "");
  const resolvedControlId = controlId ?? htmlFor ?? `field-${generatedId}`;
  const descriptionId = description ? `${resolvedControlId}-description` : undefined;
  const errorId = error ? `${resolvedControlId}-error` : undefined;
  const child = Children.only(children);

  let resolvedChild = child;

  if (isValidElement<FieldControlProps>(child)) {
    const existingDescribedBy = child.props["aria-describedby"];
    const describedBy = [
      existingDescribedBy,
      descriptionId,
      errorId,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    resolvedChild = cloneElement(
      child as ReactElement<FieldControlProps>,
      {
        id: child.props.id ?? resolvedControlId,
        required: child.props.required ?? required,
        "aria-invalid": invalid || child.props["aria-invalid"] || undefined,
        "aria-describedby": describedBy || undefined,
      },
    );
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label ? (
        <Label htmlFor={resolvedControlId} required={required}>
          {label}
        </Label>
      ) : null}
      {resolvedChild}
      {description ? (
        <FieldHint id={descriptionId}>{description}</FieldHint>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}
