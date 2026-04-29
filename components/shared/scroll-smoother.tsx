"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollSmoother() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (mediaQuery.matches || lenis) {
        return;
      }

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        lerp: 0.085,
        wheelMultiplier: 0.9,
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };

    const handlePreferenceChange = () => {
      if (mediaQuery.matches) {
        stop();
        return;
      }

      start();
    };

    start();
    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      stop();
    };
  }, []);

  return null;
}
