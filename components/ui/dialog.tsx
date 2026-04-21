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

type DialogContextValue = {
  descriptionId: string;
  titleId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog compound components must be used inside Dialog.");
  }

  return context;
}

const dialogSizeClasses = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export type DialogSize = keyof typeof dialogSizeClasses;

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  overlayClassName?: string;
  showCloseButton?: boolean;
  size?: DialogSize;
};

export function Dialog({
  children,
  className,
  closeOnOverlayClick = true,
  defaultOpen = false,
  onOpenChange,
  onClick,
  open,
  overlayClassName,
  showCloseButton = true,
  size = "md",
  ...props
}: DialogProps) {
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
    <DialogContext.Provider
      value={{
        descriptionId: `dialog-description-${generatedId}`,
        titleId: `dialog-title-${generatedId}`,
      }}
    >
      <OverlayPortal>
        <div className={cn("fixed inset-0 z-50 p-4 sm:p-6", overlayClassName)}>
          <OverlayBackdrop
            onClick={() => {
              if (closeOnOverlayClick) {
                setIsOpen(false);
              }
            }}
          />

          <div className="relative flex min-h-full items-center justify-center">
            <div
              ref={contentRef}
              role="dialog"
              aria-modal="true"
              aria-describedby={`dialog-description-${generatedId}`}
              aria-labelledby={`dialog-title-${generatedId}`}
              tabIndex={-1}
              className={cn(
                "relative w-full rounded-xl border border-border bg-surface shadow-lg focus:outline-none",
                dialogSizeClasses[size],
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
                  aria-label="Pencereyi kapat"
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
        </div>
      </OverlayPortal>
    </DialogContext.Provider>
  );
}

type DialogSectionProps = HTMLAttributes<HTMLDivElement>;

export function DialogHeader({ className, ...props }: DialogSectionProps) {
  return <div className={cn("space-y-2 p-6 pb-0", className)} {...props} />;
}

export function DialogBody({ className, ...props }: DialogSectionProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: DialogSectionProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-3 p-6 pt-0", className)}
      {...props}
    />
  );
}

type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function DialogTitle({ className, id, ...props }: DialogTitleProps) {
  const context = useDialogContext();

  return (
    <h2
      id={id ?? context.titleId}
      className={cn("text-lg font-semibold text-text", className)}
      {...props}
    />
  );
}

type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function DialogDescription({
  className,
  id,
  ...props
}: DialogDescriptionProps) {
  const context = useDialogContext();

  return (
    <p
      id={id ?? context.descriptionId}
      className={cn("text-sm leading-relaxed text-text-muted", className)}
      {...props}
    />
  );
}
