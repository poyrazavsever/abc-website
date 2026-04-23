export type EventLocationType = "online" | "in_person" | "hybrid" | "unknown";

export type CommunityEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  timezone: string | null;
  locationName: string;
  locationType: EventLocationType;
  address: string | null;
  coverUrl: string | null;
  registrationUrl: string;
  lumaUrl: string;
  capacity: number | null;
  registeredCount: number | null;
  isAtCapacity: boolean;
  isPast: boolean;
};

export type EventListResult =
  | {
      status: "ready";
      events: CommunityEvent[];
      calendarId: string;
    }
  | {
      status: "configuration-error" | "source-error";
      events: CommunityEvent[];
      calendarId: string;
      message: string;
    };
