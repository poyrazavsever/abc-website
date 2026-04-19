"use client";

import { Container } from "@/components/shared/container";
import { appToast } from "@/lib/utils/toast";

export default function MarketingHomePage() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="flex min-h-[78vh] items-center py-28 sm:py-32">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-white/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Toaster Test Area
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Sadece Hero + Toaster Deneme Butonlari
            </h1>
            <p className="text-base text-white/90 sm:text-lg">
              Bu alanda toast varyantlarini tek tikla test edebilirsin.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => appToast.default("Default toast calisti")}
              className="rounded-md bg-surface px-4 py-2 text-sm font-semibold text-primary transition hover:bg-surface-soft"
            >
              Default Toast
            </button>
            <button
              type="button"
              onClick={() => appToast.success("Success toast calisti")}
              className="rounded-md bg-success px-4 py-2 text-sm font-semibold text-success-foreground transition hover:bg-success-700"
            >
              Success Toast
            </button>
            <button
              type="button"
              onClick={() => appToast.warning("Warning toast calisti")}
              className="rounded-md bg-warning px-4 py-2 text-sm font-semibold text-warning-foreground transition hover:bg-warning-600"
            >
              Warning Toast
            </button>
            <button
              type="button"
              onClick={() => appToast.error("Error toast calisti")}
              className="rounded-md bg-danger px-4 py-2 text-sm font-semibold text-danger-foreground transition hover:bg-danger-700"
            >
              Error Toast
            </button>
            <button
              type="button"
              onClick={() => appToast.info("Info toast calisti")}
              className="rounded-md bg-info px-4 py-2 text-sm font-semibold text-info-foreground transition hover:bg-info-700"
            >
              Info Toast
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
