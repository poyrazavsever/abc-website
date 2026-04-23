import type { Metadata } from "next";

import { EventCard } from "@/components/events/event-card";
import { EventEmptyState } from "@/components/events/event-empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { getEvents } from "@/lib/services/events.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description: "Ankara Build Club etkinlikleri ve Luma kayit akisi.",
};

export default async function EventsPage() {
  const result = await getEvents();
  const upcomingEvents = result.events.filter((event) => !event.isPast);
  const pastEvents = result.events.filter((event) => event.isPast).reverse();

  return (
    <div className="space-y-12">
      <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_20rem] lg:items-end">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Luma etkinlik takvimi
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
              Build ritmini takip et, etkinlige tikla, Luma uzerinden kaydol.
            </h1>
            <p className="text-base leading-7 text-text-muted sm:text-lg">
              Ankara Build Club etkinlikleri Luma kaynagindan canli okunur.
              Tarih, konum, kapasite, aciklama ve kayit linkleri tek akista
              gorunur.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
            Calendar ID
          </p>
          <p className="mt-2 break-all font-mono text-sm text-text">
            {result.calendarId}
          </p>
          <LinkButton
            href={`https://luma.com/calendar/${result.calendarId}`}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="mt-4 w-full"
          >
            Luma Takvimi
          </LinkButton>
        </div>
      </header>

      {result.status !== "ready" ? (
        <EventEmptyState
          title="Luma baglantisi hazir degil"
          description={result.message}
          calendarId={result.calendarId}
        />
      ) : null}

      {result.status === "ready" && result.events.length === 0 ? (
        <EventEmptyState
          title="Yayinlanmis etkinlik bulunamadi"
          description="Luma takviminde onayli etkinlik olustugunda bu sayfada otomatik gorunecek."
          calendarId={result.calendarId}
        />
      ) : null}

      {upcomingEvents.length > 0 ? (
        <section className="space-y-5" aria-labelledby="upcoming-events">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="upcoming-events"
                className="text-2xl font-semibold text-text"
              >
                Yaklasan etkinlikler
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Katilmak istedigin etkinligi acip Luma kayit akisine gecebilirsin.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                priority={index === 0}
              />
            ))}
          </div>
        </section>
      ) : null}

      {pastEvents.length > 0 ? (
        <section className="space-y-5" aria-labelledby="past-events">
          <div>
            <h2 id="past-events" className="text-2xl font-semibold text-text">
              Gecmis etkinlikler
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Toplulugun onceki bulusmalarini Luma kaydiyla birlikte incele.
            </p>
          </div>

          <div className="grid gap-5">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
