import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type EventCoverProps = {
  src: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function EventCover({
  src,
  alt,
  priority = false,
  className,
}: EventCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden rounded-lg bg-primary-950",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 42rem, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-end bg-gradient-to-br from-primary-600 via-secondary-700 to-primary-950 p-5 text-primary-foreground">
          <span className="max-w-xs text-sm font-semibold uppercase tracking-wide">
            Ankara Build Club
          </span>
        </div>
      )}
    </div>
  );
}
