import { Skeleton } from "@/components/ui";

export function AuthFormFallback() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-16 w-full rounded-lg" />
      <Skeleton className="h-16 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
