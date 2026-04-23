import {
  getLumaCalendarId,
  listLumaCalendarEvents,
  LumaConfigurationError,
  LumaSourceError,
  type LumaCalendarEvent,
} from "@/lib/integrations/luma";
import type { CommunityEvent, EventListResult } from "@/lib/types/events";

type JsonRecord = Record<string, unknown>;

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function asRecord(value: unknown): JsonRecord | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as JsonRecord;
  }

  return null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    const stringValue = asString(value);

    if (stringValue) {
      return stringValue;
    }
  }

  return null;
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    const numberValue = asNumber(value);

    if (numberValue !== null) {
      return numberValue;
    }
  }

  return null;
}

function isHttpUrl(value: string | null) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeLocation(event: LumaCalendarEvent) {
  const geoAddress = asRecord(event.geo_address_json);
  const addressInfo = asRecord(event.geo_address_info);
  const sourceLocationType = firstString(event.location_type, event.locationType);
  const meetingUrl = firstString(event.meeting_url, event.zoom_url);
  const address = firstString(
    geoAddress?.full_address,
    geoAddress?.address,
    geoAddress?.formatted_address,
    addressInfo?.full_address,
    addressInfo?.address,
  );
  const locationName = firstString(
    event.location_name,
    event.venue_name,
    event.geo_address,
    geoAddress?.name,
    geoAddress?.city,
    address,
  );

  if (sourceLocationType === "online" || meetingUrl) {
    return {
      address,
      locationName: "Online",
      locationType: "online" as const,
    };
  }

  if (sourceLocationType === "hybrid") {
    return {
      address,
      locationName: locationName ?? "Hibrit etkinlik",
      locationType: "hybrid" as const,
    };
  }

  return {
    address,
    locationName: locationName ?? "Konum Luma'da duyurulacak",
    locationType:
      sourceLocationType === "offline"
        ? ("in_person" as const)
        : ("unknown" as const),
  };
}

function normalizeDescription(event: LumaCalendarEvent) {
  return (
    firstString(
      event.description,
      event.description_md,
      event.short_description,
      event.subtitle,
    ) ?? "Etkinlik aciklamasi Luma uzerinden paylasiliyor."
  );
}

function normalizeLumaUrl(event: LumaCalendarEvent, id: string) {
  const url = firstString(event.url, event.event_url, event.registration_url);

  if (url && isHttpUrl(url)) {
    return url;
  }

  const urlName = firstString(event.url_name, event.slug);
  return `https://lu.ma/${urlName ?? id}`;
}

export function formatEventDateRange(event: CommunityEvent) {
  const startsAt = new Date(event.startsAt);
  const endsAt = event.endsAt ? new Date(event.endsAt) : null;

  if (!endsAt) {
    return dateFormatter.format(startsAt);
  }

  return `${dateFormatter.format(startsAt)} - ${dateFormatter.format(endsAt)}`;
}

export function formatCapacity(event: CommunityEvent) {
  if (event.capacity !== null && event.registeredCount !== null) {
    return `${event.registeredCount}/${event.capacity} kapasite`;
  }

  if (event.capacity !== null) {
    return `${event.capacity} kisi kapasite`;
  }

  if (event.registeredCount !== null) {
    return `${event.registeredCount} kayit`;
  }

  return "Kapasite Luma'da";
}

function normalizeLumaEvent(event: LumaCalendarEvent): CommunityEvent | null {
  const id = firstString(event.id, event.api_id, event.event_api_id);
  const title = firstString(event.name, event.title);
  const startsAt = firstString(event.start_at, event.starts_at, event.startAt);

  if (!id || !title || !startsAt) {
    return null;
  }

  const endsAt = firstString(event.end_at, event.ends_at, event.endAt);
  const coverUrl = firstString(event.cover_url, event.cover_image_url);
  const capacity = firstNumber(
    event.capacity,
    event.max_capacity,
    event.ticket_capacity,
  );
  const registeredCount = firstNumber(
    event.registered_count,
    event.registration_count,
    event.guest_count,
    event.approved_guest_count,
  );
  const { address, locationName, locationType } = normalizeLocation(event);
  const lumaUrl = normalizeLumaUrl(event, id);

  return {
    id,
    title,
    description: normalizeDescription(event),
    startsAt,
    endsAt,
    timezone: firstString(event.timezone),
    locationName,
    locationType,
    address,
    coverUrl: isHttpUrl(coverUrl) ? coverUrl : null,
    registrationUrl: lumaUrl,
    lumaUrl,
    capacity,
    registeredCount,
    isAtCapacity:
      capacity !== null &&
      registeredCount !== null &&
      registeredCount >= capacity,
    isPast: new Date(endsAt ?? startsAt).getTime() < Date.now(),
  };
}

export async function getEvents(): Promise<EventListResult> {
  const calendarId = getLumaCalendarId();

  try {
    const events = (await listLumaCalendarEvents())
      .map(normalizeLumaEvent)
      .filter((event): event is CommunityEvent => Boolean(event))
      .sort(
        (first, second) =>
          new Date(first.startsAt).getTime() -
          new Date(second.startsAt).getTime(),
      );

    return {
      status: "ready",
      events,
      calendarId,
    };
  } catch (error) {
    if (error instanceof LumaConfigurationError) {
      return {
        status: "configuration-error",
        events: [],
        calendarId,
        message: error.message,
      };
    }

    if (error instanceof LumaSourceError) {
      return {
        status: "source-error",
        events: [],
        calendarId,
        message: error.message,
      };
    }

    throw error;
  }
}

export async function getEventById(eventId: string) {
  const result = await getEvents();
  const event = result.events.find(
    (candidate) => candidate.id === decodeURIComponent(eventId),
  );

  return {
    ...result,
    event: event ?? null,
  };
}
