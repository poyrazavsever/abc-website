"use client";

import { useEffect, useState } from "react";

const topBarItems = [
  "Distribution",
  "Istanbul Build Club",
  "Izmir Build Club",
] as const;

export function AdminTopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHidden(true);
        return;
      }

      setHidden(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={[
        "origin-top overflow-hidden bg-neutral-950 text-neutral-100 transition-[max-height,opacity,transform] duration-200 ease-out",
        hidden
          ? "max-h-0 scale-y-0 opacity-0"
          : "max-h-8 scale-y-100 opacity-100",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex h-8 w-full max-w-7xl items-center gap-6 px-4 text-xs font-semibold sm:px-6 lg:px-8"
        aria-label="Build Club bağlantıları"
      >
        {topBarItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-neutral-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
