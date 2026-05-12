import type { Metadata } from "next";
import { Suspense } from "react";

import { Providers } from "@/components/shared/providers";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shipin.city"),
  title: {
    default: "Shipin",
    template: "%s | Shipin",
  },
  description:
    "Shipin is a builder community where people turn momentum into shipped products through focused events, collaboration, and real execution.",
  openGraph: {
    title: "Shipin",
    description:
      "A builder community for focused events, collaboration, and real product execution.",
    url: "/",
    siteName: "Shipin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipin",
    description:
      "A builder community for focused events, collaboration, and real product execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
