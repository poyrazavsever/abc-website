"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useInView } from "framer-motion";

const seenSections = new Set<string>();
const listeners = new Set<() => void>();

type InViewOptions = Parameters<typeof useInView>[1];

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function markSectionAsSeen(sectionKey: string) {
  if (seenSections.has(sectionKey)) {
    return;
  }

  seenSections.add(sectionKey);
  emitChange();
}

export function useOnceInView(sectionKey: string, options?: InViewOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, options);
  const hasEntered = useSyncExternalStore(
    subscribe,
    () => seenSections.has(sectionKey),
    () => seenSections.has(sectionKey),
  );

  useEffect(() => {
    if (!isInView) {
      return;
    }

    markSectionAsSeen(sectionKey);
  }, [isInView, sectionKey]);

  return {
    ref,
    hasEntered,
  };
}
