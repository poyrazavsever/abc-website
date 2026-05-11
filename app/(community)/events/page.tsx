import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { LinkButton } from "@/components/ui/link-button";

const LUMA_CALENDAR_ID = "cal-7VDaKLe8HABNOFw";
const LUMA_CALENDAR_URL = `https://lu.ma/embed/calendar/${LUMA_CALENDAR_ID}/events`;
const LUMA_PUBLIC_URL = "https://luma.com/ankarabuildclub";

const eventSignals = [
  {
    value: "2h",
    label: "Deep focus block",
    detail: "Protected time to get real work done.",
  },
  {
    value: "1 day",
    label: "Shipping window",
    detail: "A short sprint that ends with visible output.",
  },
  {
    value: "Live",
    label: "Builder room",
    detail: "Builders working on actual products together.",
  },
] as const;

const eventFormats = [
  {
    step: "01",
    title: "Sprints",
    rhythm: "Fast execution",
    description: "Short, intense work blocks built for momentum.",
    bullets: [
      "Pick a clear target.",
      "Move fast with a small team.",
      "End with visible output.",
    ],
  },
  {
    step: "02",
    title: "Mini Sprints",
    rhythm: "Smaller scope, faster loop",
    description: "A lighter version of sprint mode for quick progress.",
    bullets: [
      "Keep scope tight.",
      "Ship one small win.",
      "Review what changed.",
    ],
  },
  {
    step: "03",
    title: "Roasting Day",
    rhythm: "Direct feedback",
    description: "Bring the work and get sharp, honest feedback.",
    bullets: [
      "Show the real version.",
      "Get clear critique.",
      "Leave with next steps.",
    ],
  },
  {
    step: "04",
    title: "Fuckup Nights",
    rhythm: "Stories from failure",
    description: "A candid format about mistakes, lessons, and recovery.",
    bullets: [
      "Share what went wrong.",
      "Talk about what changed after.",
      "Turn failure into signal.",
    ],
  },
  {
    step: "05",
    title: "Deep Work Session",
    rhythm: "Quiet focus",
    description: "Protected time for builders who need uninterrupted work.",
    bullets: [
      "Arrive with a task.",
      "Work in silence.",
      "Wrap with progress check-ins.",
    ],
  },
  {
    step: "06",
    title: "Events",
    rhythm: "Community rhythm",
    description: "The broader flow of gatherings that keeps the club active.",
    bullets: [
      "Meet people building seriously.",
      "Stay close to the calendar.",
      "Find the right room for your pace.",
    ],
  },
] as const;

const roomPrinciples = [
  "Bring a real task, not just an idea.",
  "Use the timebox to make decisions.",
  "Share what changed by the end.",
  "Conversation gets better after the work is visible.",
] as const;

export const metadata: Metadata = {
  title: "Events",
  description: "Shipin event formats and live Luma calendar.",
};

export default function EventsPage() {
  return (
    <main className="relative left-1/2 -mb-10 -mt-28 min-h-screen w-screen -translate-x-1/2 bg-brand-black px-4 pt-28 pb-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 px-4 py-8 shadow-[0_24px_60px_rgb(0_0_0_/_0.3)] sm:px-6 lg:px-10 lg:py-12">
        <div className="absolute inset-0 bg-[#0b0b0c]" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(131,28,145,0.3),transparent_26%),radial-gradient(circle_at_84%_20%,rgba(255,112,191,0.14),transparent_22%),radial-gradient(circle_at_50%_88%,rgba(70,44,125,0.28),transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <section className="relative isolate overflow-hidden">
          <Container className="relative z-10 flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center py-10 sm:py-12">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] md:items-start lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
              <div className="max-w-4xl space-y-8">
                <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-ink-200 backdrop-blur-md">
                  Events Calendar
                </p>

                <div className="space-y-5">
                  <h1 className="max-w-4xl text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl lg:text-6xl">
                    Shipin events are built to{" "}
                    <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                      ship
                    </SecondaryWordmark>{" "}
                    for real.
                  </h1>
                  <p className="max-w-2xl text-sm leading-8 text-ink-200 md:text-base">
                    Focused sessions for builders.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {eventSignals.map((signal) => (
                    <div
                      key={signal.label}
                      className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em] text-accent-300">
                        {signal.value}
                      </p>
                      <p className="mt-1 text-[0.68rem] font-semibold tracking-[0.18em] text-white/48">
                        {signal.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/72">
                        {signal.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <LinkButton
                    href={LUMA_PUBLIC_URL}
                    target="_blank"
                    rel="noreferrer"
                    size="lg"
                    className="h-auto px-8 py-3 text-base text-brand-white shadow-[0_18px_48px_rgba(93,56,255,0.34)] hover:shadow-[0_24px_56px_rgba(93,56,255,0.42)]"
                  >
                    Open Luma Calendar
                  </LinkButton>
                  <LinkButton
                    href="#calendar"
                    size="lg"
                    variant="ghost"
                    className="h-auto border-white/14 bg-white/[0.08] px-8 py-3 text-base text-brand-white hover:bg-white/[0.12]"
                  >
                    Jump to Calendar
                  </LinkButton>
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-5 md:sticky md:top-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]" />
                <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-primary-200/45 to-transparent" />

                <div className="relative space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold tracking-[0.22em] text-white/44">
                        Live calendar
                      </p>
                      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                        Upcoming sessions, right here.
                      </h2>
                    </div>
                    <LinkButton
                      href={LUMA_PUBLIC_URL}
                      target="_blank"
                      rel="noreferrer"
                      variant="ghost"
                      className="border-white/14 bg-white/[0.08] text-brand-white hover:bg-white/[0.12]"
                    >
                      Open
                    </LinkButton>
                  </div>

                  <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
                    <iframe
                      src={LUMA_CALENDAR_URL}
                      title="Ankara Build Club events calendar"
                      width="100%"
                      height="760"
                      frameBorder="0"
                      allowFullScreen
                      className="block min-h-[760px] w-full bg-surface"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.06),transparent_28%),radial-gradient(circle_at_82%_30%,rgba(59,130,246,0.04),transparent_26%),linear-gradient(180deg,rgba(10,10,11,0.94),rgba(11,11,12,0.98))]" />

          <Container width="wide" className="relative max-w-6xl">
            <div className="space-y-10">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-accent-300">
                  Event Structure
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
                  Different formats, same momentum.
                </h2>
                <p className="text-sm leading-7 text-ink-300 sm:text-base">
                  Different formats for focus, speed, and shipping.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {eventFormats.map((format) => (
                  <article
                    key={format.title}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                    <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full border border-secondary-500/20 bg-secondary-500/8 blur-md transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-secondary-500),var(--color-accent-500))] text-xs font-semibold text-white">
                            {format.step}
                          </span>
                          <div>
                            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45">
                              {format.rhythm}
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                              {format.title}
                            </h3>
                          </div>
                        </div>

                        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-accent-300">
                          Builder format
                        </span>
                      </div>

                      <p className="text-sm leading-7 text-white/72 sm:text-base">
                        {format.description}
                      </p>

                      <div className="grid gap-3">
                        {format.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="rounded-[1.2rem] border border-white/8 bg-brand-black/24 p-4 text-sm leading-6 text-white/72"
                          >
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-4 sm:py-6">
          <Container width="wide" className="max-w-6xl">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:p-7">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-semibold tracking-[0.22em] text-accent-300">
                    Room energy
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">
                    Less talk, more building.
                  </h2>
                  <p className="text-sm leading-7 text-white/70 sm:text-base">
                    The room works best when progress is visible.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(70,44,125,0.92),rgba(131,28,145,0.86))] p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:p-7">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/48">
                  Quick note
                </p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  Bring the work into the room.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {roomPrinciples.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="calendar"
          className="relative overflow-hidden py-16 sm:py-20"
        >
          <Container width="wide" className="max-w-6xl">
            <div className="overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
              <div className="flex flex-col gap-4 border-b border-white/8 bg-black/18 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold tracking-[0.22em] text-accent-300">
                    Live calendar
                  </p>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                    Track upcoming sessions directly in Luma.
                  </h2>
                  <p className="text-sm leading-6 text-white/70 sm:text-base">
                    The fastest way to see the current calendar.
                  </p>
                </div>

                <LinkButton
                  href={LUMA_PUBLIC_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                >
                  Open Luma page
                </LinkButton>
              </div>

              <div className="bg-transparent p-2 sm:p-3">
                <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-white">
                  <iframe
                    src={LUMA_CALENDAR_URL}
                    title="Ankara Build Club events calendar"
                    width="100%"
                    height="980"
                    frameBorder="0"
                    allowFullScreen
                    className="block min-h-[980px] w-full bg-surface"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
