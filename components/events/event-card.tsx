import Link from "next/link";

import { EventCover } from "@/components/events/event-cover";
import { LinkButton } from "@/components/ui/link-button";
import {
  formatCapacity,
  formatEventDateRange,
} from "@/lib/services/events.service";
import type { CommunityEvent } from "@/lib/types/events";

type EventCardProps = {
  event: CommunityEvent;
  priority?: boolean;
};

export function EventCard({ event, priority = false }: EventCardProps) {
  return (
    <article className="group grid overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md lg:grid-cols-[minmax(16rem,0.8fr)_1fr]">
      <Link
        href={`/events/${encodeURIComponent(event.id)}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
        aria-label={`${event.title} detayina git`}
      >
        <EventCover
          src={event.coverUrl}
          alt={`${event.title} cover gorseli`}
          priority={priority}
          className="h-full rounded-none"
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-text-soft">
            <span>{event.isPast ? "Gecmis etkinlik" : "Yaklasan etkinlik"}</span>
            <span aria-hidden="true">/</span>
            <span>{event.locationName}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold leading-tight text-text">
              <Link
                href={`/events/${encodeURIComponent(event.id)}`}
                className="transition hover:text-link"
              >
                {event.title}
              </Link>
            </h2>
            <p className="line-clamp-3 text-sm leading-6 text-text-muted">
              {event.description}
            </p>
          </div>
        </div>

        <dl className="grid gap-3 text-sm text-text-muted sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-text">Tarih</dt>
            <dd>{formatEventDateRange(event)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text">Konum</dt>
            <dd>{event.locationName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text">Kapasite</dt>
            <dd>{formatCapacity(event)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-3">
          <LinkButton href={`/events/${encodeURIComponent(event.id)}`}>
            Detaylari Gor
          </LinkButton>
          <LinkButton
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            variant="outline"
          >
            Luma Kayit
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
