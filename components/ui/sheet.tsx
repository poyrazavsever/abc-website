"use client";

import {
  createContext,
  useContext,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useControllableState } from "@/components/ui/internal/use-controllable-state";
import {
  OverlayBackdrop,
  OverlayPortal,
  useOverlayLifecycle,
} from "@/components/ui/internal/overlay";
import { cn } from "@/lib/utils/cn";

type SheetContextValue = {
  descriptionId: string;
  titleId: string;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);

  if (!context) {
    throw new Error("Sheet compound components must be used inside Sheet.");
  }

  return context;
}

const sheetPlacementClasses = {
  bottom: "bottom-0 left-0 right-0 mx-auto w-full max-w-4xl rounded-t-2xl",
  left: "left-0 top-0 h-full w-full max-w-xl rounded-r-2xl",
  right: "right-0 top-0 h-full w-full max-w-xl rounded-l-2xl",
} as const;

export type SheetSide = keyof typeof sheetPlacementClasses;

export type SheetProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  overlayClassName?: string;
  showCloseButton?: boolean;
  side?: SheetSide;
};

export function Sheet({
  children,
  className,
  closeOnOverlayClick = true,
  defaultOpen = false,
  onOpenChange,
  onClick,
  open,
  overlayClassName,
  showCloseButton = true,
  side = "right",
  ...props
}: SheetProps) {
  const generatedId = useId().replace(/:/g, "");
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  useOverlayLifecycle({
    contentRef,
    onOpenChange: setIsOpen,
    open: isOpen,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <SheetContext.Provider
      value={{
        descriptionId: `sheet-description-${generatedId}`,
        titleId: `sheet-title-${generatedId}`,
      }}
    >
      <OverlayPortal>
        <div className={cn("fixed inset-0 z-50", overlayClassName)}>
          <OverlayBackdrop
            onClick={() => {
              if (closeOnOverlayClick) {
                setIsOpen(false);
              }
            }}
          />

          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-describedby={`sheet-description-${generatedId}`}
            aria-labelledby={`sheet-title-${generatedId}`}
            tabIndex={-1}
            className={cn(
              "absolute border border-border bg-surface shadow-lg focus:outline-none",
              sheetPlacementClasses[side],
              className,
            )}
            {...props}
            onClick={(event) => {
              event.stopPropagation();
              onClick?.(event);
            }}
          >
            {showCloseButton ? (
              <button
                type="button"
                aria-label="Paneli kapat"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                  <path d="m5.97 4.91 4.03 4.03 4.03-4.03 1.06 1.06-4.03 4.03 4.03 4.03-1.06 1.06-4.03-4.03-4.03 4.03-1.06-1.06 4.03-4.03-4.03-4.03z" />
                </svg>
              </button>
            ) : null}

            {children}
          </div>
        </div>
      </OverlayPortal>
    </SheetContext.Provider>
  );
}

type SheetSectionProps = HTMLAttributes<HTMLDivElement>;

export function SheetHeader({ className, ...props }: SheetSectionProps) {
  return <div className={cn("space-y-2 p-6 pb-0", className)} {...props} />;
}

export function SheetBody({ className, ...props }: SheetSectionProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: SheetSectionProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-3 p-6 pt-0", className)}
      {...props}
    />
  );
}

type SheetTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function SheetTitle({ className, id, ...props }: SheetTitleProps) {
  const context = useSheetContext();

  return (
    <h2
      id={id ?? context.titleId}
      className={cn("text-lg font-semibold text-text", className)}
      {...props}
    />
  );
}

type SheetDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function SheetDescription({
  className,
  id,
  ...props
}: SheetDescriptionProps) {
  const context = useSheetContext();

  return (
    <p
      id={id ?? context.descriptionId}
      className={cn("text-sm leading-relaxed text-text-muted", className)}
      {...props}
    />
  );
}
