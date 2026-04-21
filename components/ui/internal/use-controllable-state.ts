"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue: Dispatch<SetStateAction<T>> = (nextValue) => {
    const resolvedValue =
      typeof nextValue === "function"
        ? (nextValue as (previousValue: T) => T)(currentValue)
        : nextValue;

    if (!isControlled) {
      setInternalValue(resolvedValue);
    }

    if (resolvedValue !== currentValue) {
      onChange?.(resolvedValue);
    }
  };

  return [currentValue, setValue];
}
