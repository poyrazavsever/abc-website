"use client";

import { Container } from "@/components/shared/container";

const eventFormats = [
  {
    step: "01",
    title: "Build Sprint",
    rhythm: "Core builder format",
    description:
      "The main sprint format for builders who want clear momentum, tighter collaboration, and visible progress by the end.",
  },
  {
    step: "02",
    title: "Ship Sprint",
    rhythm: "Launch-focused format",
    description:
      "A sharper, deadline-led sprint built for finishing, shipping, and getting something real out into the world.",
  },
  {
    step: "03",
    title: "Roasting Day",
    rhythm: "Direct feedback",
    description: "Bring the work and get sharp, honest feedback.",
  },
  {
    step: "04",
    title: "Deep Work Session",
    rhythm: "Quiet focus",
    description: "Protected time for builders who need uninterrupted work.",
  },
] as const;

const featuredEventFormats = eventFormats.slice(0, 2);
const communityEventFormats = eventFormats.slice(2);

export function EventFormatsPreview() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-ink-950 py-18 scroll-mt-28 sm:py-22"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(131,28,145,0.12),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(255,112,191,0.08),transparent_22%),linear-gradient(180deg,rgba(10,10,11,0.94),rgba(11,11,12,0.98))]" />

      <Container width="wide" className="relative max-w-6xl">
        <div className="space-y-7">
          <div className="mx-auto grid max-w-[45rem] gap-3 md:grid-cols-2">
            {featuredEventFormats.map((format, index) => (
              <article
                key={format.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_48px_rgba(0,0,0,0.22)] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,112,191,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(131,28,145,0.18),transparent_30%)]" />
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold tracking-[0.18em] text-accent-300">
                      {format.step}
                    </span>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-secondary-300">
                      {index === 0 ? "Flagship format" : "Priority format"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45">
                      {format.rhythm}
                    </p>
                    <h3 className="text-[2rem] font-semibold tracking-tight text-white">
                      {format.title}
                    </h3>
                    <p className="text-sm leading-7 text-ink-200">
                      {format.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto max-w-4xl space-y-5 text-center">
            <div className="mx-auto max-w-xl">
              <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-white/42">
                Community events
              </p>
            </div>

            <div className="space-y-5 border-t border-white/8 pt-5">
              {communityEventFormats.map((format) => (
                <article
                  key={format.title}
                  className="space-y-2 border-b border-white/8 pb-5 last:border-b-0 last:pb-0"
                >
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/42">
                    {format.rhythm}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {format.title}
                  </h3>
                  <p className="mx-auto max-w-2xl text-sm leading-7 text-ink-300 sm:text-base">
                    {format.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
