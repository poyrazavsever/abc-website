import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-4 w-32" />
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <Skeleton className="aspect-[16/9] w-full rounded-lg" />
          <Skeleton className="h-12 w-full max-w-3xl" />
          <Skeleton className="h-28 w-full max-w-3xl" />
        </div>
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
}
