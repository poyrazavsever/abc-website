"use client";

import {
  createContext,
  useContext,
  useId,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { useControllableState } from "@/components/ui/internal/use-controllable-state";
import { cn } from "@/lib/utils/cn";

type RadioGroupContextValue = {
  disabled: boolean;
  name: string;
  onValueChange?: (value: string) => void;
  setValue: (value: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroup compound components must be used inside RadioGroup.");
  }

  return context;
}

export type RadioGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange" | "value"
> & {
  disabled?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

export function RadioGroup({
  className,
  disabled = false,
  name,
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  const generatedName = useId().replace(/:/g, "");
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });

  return (
    <RadioGroupContext.Provider
      value={{
        disabled,
        name: name ?? `radio-group-${generatedName}`,
        onValueChange,
        setValue: setCurrentValue,
        value: currentValue,
      }}
    >
      <div
        role="radiogroup"
        className={cn(
          orientation === "horizontal"
            ? "flex flex-wrap items-start gap-4"
            : "space-y-3",
          className,
        )}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
}

export type RadioItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked" | "name" | "onChange" | "value"
> & {
  description?: ReactNode;
  label?: ReactNode;
  value: string;
};

export function RadioItem({
  className,
  description,
  disabled: itemDisabled = false,
  id,
  label,
  value,
  ...props
}: RadioItemProps) {
  const generatedId = useId().replace(/:/g, "");
  const { disabled, name, setValue, value: selectedValue } =
    useRadioGroupContext();
  const resolvedId = id ?? `${name}-${generatedId}`;
  const isDisabled = disabled || itemDisabled;
  const isChecked = selectedValue === value;

  return (
    <label
      htmlFor={resolvedId}
      className={cn(
        "flex items-start gap-3",
        isDisabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={resolvedId}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          className="peer sr-only"
          onChange={(event) => {
            if (event.currentTarget.checked) {
              setValue(value);
            }
          }}
          {...props}
        />
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface transition peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition peer-checked:opacity-100" />
        </span>
      </span>

      {(label || description) ? (
        <span className="space-y-1">
          {label ? (
            <span className="block text-sm font-semibold text-text">{label}</span>
          ) : null}
          {description ? (
            <span className="block text-sm text-text-muted">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
