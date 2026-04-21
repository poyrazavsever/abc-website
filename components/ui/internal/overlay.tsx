"use client";

import {
  useEffect,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils/cn";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      return false;
    }

    return !element.hasAttribute("disabled");
  });
}

export function OverlayPortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

type UseOverlayLifecycleOptions = {
  contentRef: RefObject<HTMLElement | null>;
  lockScroll?: boolean;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  restoreFocus?: boolean;
};

export function useOverlayLifecycle({
  contentRef,
  lockScroll = true,
  onOpenChange,
  open,
  restoreFocus = true,
}: UseOverlayLifecycleOptions) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    const focusFrame = window.requestAnimationFrame(() => {
      const contentElement = contentRef.current;

      if (!contentElement) {
        return;
      }

      const focusableElements = getFocusableElements(contentElement);
      const initialTarget = focusableElements[0] ?? contentElement;
      initialTarget.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const contentElement = contentRef.current;

      if (!contentElement) {
        return;
      }

      const focusableElements = getFocusableElements(contentElement);

      if (focusableElements.length === 0) {
        event.preventDefault();
        contentElement.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (lockScroll) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);

      if (lockScroll) {
        document.body.style.overflow = previousOverflow;
      }

      if (restoreFocus) {
        window.requestAnimationFrame(() => previousActiveElement?.focus());
      }
    };
  }, [contentRef, lockScroll, onOpenChange, open, restoreFocus]);
}

export function OverlayBackdrop({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Overlay kapat"
      className={cn("absolute inset-0 bg-text/45 backdrop-blur-[1px]", className)}
      {...props}
    />
  );
}
