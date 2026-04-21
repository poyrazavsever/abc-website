"use client";

import {
  type ButtonHTMLAttributes,
  createContext,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useControllableState } from "@/components/ui/internal/use-controllable-state";
import { cn } from "@/lib/utils/cn";

type TabsContextValue = {
  baseId: string;
  onValueChange?: (value: string) => void;
  orientation: "horizontal" | "vertical";
  setValue: (value: string) => void;
  value?: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs compound components must be used inside Tabs.");
  }

  return context;
}

export type TabsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange" | "value"
> & {
  children: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  value?: string;
};

export function Tabs({
  children,
  className,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  value,
  ...props
}: TabsProps) {
  const generatedId = useId().replace(/:/g, "");
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });

  return (
    <TabsContext.Provider
      value={{
        baseId: `tabs-${generatedId}`,
        onValueChange,
        orientation,
        setValue: setCurrentValue,
        value: currentValue,
      }}
    >
      <div className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export function TabsList({ className, onKeyDown, ...props }: TabsListProps) {
  const { orientation, setValue } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "inline-flex w-fit rounded-lg border border-border bg-surface-muted p-1",
        orientation === "vertical" && "flex-col",
        className,
      )}
      onKeyDown={(event) => {
        const nextKeyMap =
          orientation === "vertical"
            ? ["ArrowDown", "ArrowUp"]
            : ["ArrowRight", "ArrowLeft"];

        if (
          ![
            nextKeyMap[0],
            nextKeyMap[1],
            "Home",
            "End",
          ].includes(event.key)
        ) {
          onKeyDown?.(event);
          return;
        }

        const triggers = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>(
            "[role='tab']:not([disabled])",
          ),
        );

        if (triggers.length === 0) {
          onKeyDown?.(event);
          return;
        }

        const activeIndex = triggers.findIndex(
          (trigger) => trigger === document.activeElement,
        );
        const fallbackIndex = activeIndex === -1 ? 0 : activeIndex;

        let nextIndex = fallbackIndex;

        if (event.key === nextKeyMap[0]) {
          nextIndex = (fallbackIndex + 1) % triggers.length;
        } else if (event.key === nextKeyMap[1]) {
          nextIndex = (fallbackIndex - 1 + triggers.length) % triggers.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = triggers.length - 1;
        }

        const nextTrigger = triggers[nextIndex];
        const nextValue = nextTrigger.dataset.value;

        if (nextValue) {
          event.preventDefault();
          setValue(nextValue);
          nextTrigger.focus();
        }

        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function TabsTrigger({
  className,
  value,
  ...props
}: TabsTriggerProps) {
  const { baseId, setValue, value: currentValue } = useTabsContext();
  const isActive = currentValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-surface text-text shadow-xs"
          : "text-text-muted hover:text-text",
        className,
      )}
      onClick={() => setValue(value)}
      {...props}
    />
  );
}

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function TabsContent({
  className,
  value,
  ...props
}: TabsContentProps) {
  const { baseId, value: currentValue } = useTabsContext();
  const isActive = currentValue === value;

  return (
    <div
      id={`${baseId}-content-${value}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={!isActive}
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}
