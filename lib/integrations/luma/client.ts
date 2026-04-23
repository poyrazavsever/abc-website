import { getEnv } from "@/lib/utils/env";

const DEFAULT_LUMA_API_BASE_URL = "https://public-api.luma.com";
export const DEFAULT_LUMA_CALENDAR_ID = "cal-7VDaKLe8HABNOFw";

type JsonRecord = Record<string, unknown>;

type LumaListEventsResponse = {
  entries?: Array<{ event?: JsonRecord } & JsonRecord>;
  has_more?: boolean;
  next_cursor?: string | null;
};

export type LumaCalendarEvent = JsonRecord;

type ListLumaEventsOptions = {
  limit?: number;
};

export class LumaConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LumaConfigurationError";
  }
}

export class LumaSourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LumaSourceError";
  }
}

function getLumaApiBaseUrl() {
  return process.env.LUMA_API_BASE_URL ?? DEFAULT_LUMA_API_BASE_URL;
}

export function getLumaCalendarId() {
  return process.env.LUMA_CALENDAR_ID ?? DEFAULT_LUMA_CALENDAR_ID;
}

function getLumaApiKey() {
  try {
    return getEnv("LUMA_API_KEY");
  } catch {
    throw new LumaConfigurationError(
      "Luma etkinliklerini gostermek icin LUMA_API_KEY tanimli olmali.",
    );
  }
}

function buildListEventsUrl(cursor: string | null, limit: number) {
  const url = new URL("/v1/calendar/list-events", getLumaApiBaseUrl());
  url.searchParams.set("pagination_limit", String(limit));
  url.searchParams.set("sort_column", "start_at");
  url.searchParams.set("sort_direction", "asc");
  url.searchParams.set("status", "approved");
  url.searchParams.append("platforms", "luma");
  url.searchParams.append("platforms", "external");

  if (cursor) {
    url.searchParams.set("pagination_cursor", cursor);
  }

  return url;
}

export async function listLumaCalendarEvents({
  limit = 100,
}: ListLumaEventsOptions = {}): Promise<LumaCalendarEvent[]> {
  const apiKey = getLumaApiKey();
  const events: LumaCalendarEvent[] = [];
  let cursor: string | null = null;

  do {
    const response = await fetch(buildListEventsUrl(cursor, limit), {
      headers: {
        accept: "application/json",
        "x-luma-api-key": apiKey,
      },
    });

    if (!response.ok) {
      throw new LumaSourceError(
        `Luma etkinlikleri alinamadi. HTTP ${response.status}`,
      );
    }

    const payload = (await response.json()) as LumaListEventsResponse;
    const pageEvents = (payload.entries ?? [])
      .map((entry) => entry.event ?? entry)
      .filter((event): event is LumaCalendarEvent => Boolean(event));

    events.push(...pageEvents);
    cursor = payload.has_more ? (payload.next_cursor ?? null) : null;
  } while (cursor);

  return events;
}
