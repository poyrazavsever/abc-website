import type { Metadata } from "next";

import { Providers } from "@/components/shared/providers";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ABC Site",
    template: "%s | ABC Site",
  },
  description: "Ankara Build Club resmi web sitesi ve uye platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <AnalyticsTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
