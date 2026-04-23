import { LinkButton } from "@/components/ui/link-button";

type EventEmptyStateProps = {
  title: string;
  description: string;
  calendarId: string;
};

export function EventEmptyState({
  title,
  description,
  calendarId,
}: EventEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-border-strong bg-surface/70 p-8 text-center">
      <div className="mx-auto max-w-xl space-y-4">
        <h2 className="text-2xl font-semibold text-text">{title}</h2>
        <p className="text-sm leading-6 text-text-muted">{description}</p>
        <LinkButton
          href={`https://luma.com/calendar/${calendarId}`}
          target="_blank"
          rel="noreferrer"
          variant="outline"
        >
          Luma Takvimini Ac
        </LinkButton>
      </div>
    </div>
  );
}
