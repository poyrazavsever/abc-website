import { Skeleton } from "@/components/ui";

export function AuthFormFallback() {
  return (
    <div className="w-full">
      <Skeleton className="h-12 w-full rounded-full bg-white/12" />
    </div>
  );
}
