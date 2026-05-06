"use client";

import { useEffect, useRef } from "react";

import lottie from "lottie-web";

type HeroBirdsProps = {
  className?: string;
};

export function HeroBirds({ className }: HeroBirdsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: 1,
      autoplay: true,
      path: "/animations/birds.json",
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={className}
      ref={containerRef}
    />
  );
}
