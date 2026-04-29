"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = {
  items: string[];
  className?: string;
  intervalMs?: number;
};

export function RotatingText({
  items,
  className,
  intervalMs = 1600,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, items.length]);

  return (
    <span className={className} key={items[index]}>
      {items[index]}
    </span>
  );
}
