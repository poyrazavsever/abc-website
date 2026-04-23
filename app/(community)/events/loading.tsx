import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-border pb-10">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-12 w-full max-w-3xl" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>
      <div className="grid gap-5">
        <Skeleton className="h-72 w-full rounded-lg" />
        <Skeleton className="h-72 w-full rounded-lg" />
      </div>
    </div>
  );
}
