import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventCover } from "@/components/events/event-cover";
import { LinkButton } from "@/components/ui/link-button";
import {
  formatCapacity,
  formatEventDateRange,
  getEventById,
} from "@/lib/services/events.service";

export const dynamic = "force-dynamic";

type EventDetailPageProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { eventId } = await params;
  const { event } = await getEventById(eventId);

  if (!event) {
    return {
      title: "Etkinlik",
    };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.coverUrl ? [event.coverUrl] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId } = await params;
  const result = await getEventById(eventId);

  if (!result.event) {
    if (result.status === "ready") {
      notFound();
    }

    return (
      <div className="space-y-6">
        <Link href="/events" className="text-sm font-semibold text-link">
          Etkinliklere don
        </Link>
        <div className="rounded-lg border border-border bg-surface p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-text">
            Luma baglantisi hazir degil
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  const event = result.event;

  return (
    <article className="space-y-10">
      <Link href="/events" className="text-sm font-semibold text-link">
        Etkinliklere don
      </Link>

      <header className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
        <div className="space-y-6">
          <EventCover
            src={event.coverUrl}
            alt={`${event.title} cover gorseli`}
            priority
          />

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {event.isPast ? "Gecmis etkinlik" : "Yaklasan etkinlik"}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
              {event.title}
            </h1>
            <p className="max-w-3xl whitespace-pre-line text-base leading-7 text-text-muted">
              {event.description}
            </p>
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                Tarih
              </p>
              <p className="mt-1 text-base font-semibold text-text">
                {formatEventDateRange(event)}
              </p>
              {event.timezone ? (
                <p className="mt-1 text-sm text-text-muted">{event.timezone}</p>
              ) : null}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                Konum
              </p>
              <p className="mt-1 text-base font-semibold text-text">
                {event.locationName}
              </p>
              {event.address ? (
                <p className="mt-1 text-sm leading-6 text-text-muted">
                  {event.address}
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                Kapasite
              </p>
              <p className="mt-1 text-base font-semibold text-text">
                {formatCapacity(event)}
              </p>
              {event.isAtCapacity ? (
                <p className="mt-1 text-sm text-danger">Kontenjan dolu.</p>
              ) : null}
            </div>

            <div className="grid gap-3 pt-2">
              <LinkButton
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                block
              >
                Luma Uzerinden Kaydol
              </LinkButton>
              <LinkButton
                href={event.lumaUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                block
              >
                Luma Detayi
              </LinkButton>
            </div>
          </div>
        </aside>
      </header>
    </article>
  );
}
