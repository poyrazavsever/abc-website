"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackClientEvent } from "@/lib/integrations/analytics/client";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string>("");

  useEffect(() => {
    const currentUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    // Yalnızca URL değiştiğinde track et
    if (lastTrackedUrl.current !== currentUrl) {
      lastTrackedUrl.current = currentUrl;
      
      trackClientEvent("page_view", {
        path: pathname,
        search: searchParams?.toString() || "",
        url: currentUrl,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
