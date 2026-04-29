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
    detail:
      "A big enough window to enter flow quickly and make meaningful progress without hiding behind planning.",
  },
  {
    value: "1 day",
    label: "Shipping window",
    detail:
      "A short but serious timebox that turns intention into a decision and a visible result.",
  },
  {
    value: "Live",
    label: "Builder room",
    detail:
      "A room full of people bringing real products, prototypes, and unfinished work into the same space.",
  },
] as const;

const eventFormats = [
  {
    step: "01",
    title: "Deep Work",
    rhythm: "Quiet focus + natural connection after",
    description:
      "You begin by naming what you intend to finish, then move into a long block where your attention is actually protected. The visible win is not showing up, but moving the work forward.",
    bullets: [
      "Starts with a short goal declaration.",
      "The room turns into a true production block with minimal interruption.",
      "The final stretch opens up for conversation, feedback, and project matching.",
    ],
  },
  {
    step: "02",
    title: "Build Sprint",
    rhythm: "High energy, fast iteration",
    description:
      "A more collective and more intense format. The goal is not to keep talking about ideas, but to run more experiments and end the day with a tangible intermediate result.",
    bullets: [
      "Small teams organize quickly.",
      "The feedback loop is embedded directly into the build process.",
      "By the end of the day, the work is close enough to demo.",
    ],
  },
  {
    step: "03",
    title: "Ship Day",
    rhythm: "The deadline is real, the excuse space is small",
    description:
      "It does not need to be perfect, but it does need to exist outside your laptop before the day ends. The format is not about pressure for its own sake, but about forcing visible progress.",
    bullets: [
      "What you will ship becomes clear from the start.",
      "Time pressure speeds up decision-making.",
      "Closing demos create visible proof of progress.",
    ],
  },
] as const;

const eventFlow = [
  {
    label: "Before you join",
    text: "Bring your laptop, a clear goal, and a willingness to make your work visible.",
  },
  {
    label: "In the room",
    text: "Some days are built around quiet focus, some around demos, and some around fast team-based production.",
  },
  {
    label: "What stays constant",
    text: "The shared rule stays the same: leave the day able to point to real progress.",
  },
] as const;

const roomPrinciples = [
  "Show up with a half-finished feature, a prototype, a landing page, or a real product problem.",
  "Use the timebox to make clear decisions instead of endlessly discussing options.",
  "Even if the output is still rough, share what changed by the end of the session.",
  "The strongest social layer happens after the work becomes visible through feedback and conversation.",
] as const;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Ankara Build Club event rhythm, formats, and live Luma calendar.",
};

export default function EventsPage() {
  return (
    <div className="bg-brand-black text-brand-white">
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(131,28,145,0.42),transparent_26%),radial-gradient(circle_at_84%_20%,rgba(255,112,191,0.18),transparent_22%),radial-gradient(circle_at_50%_88%,rgba(70,44,125,0.36),transparent_34%),linear-gradient(180deg,rgba(12,8,22,0.72),rgba(0,0,0,0.96))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/24 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-brand-black via-brand-black/80 to-transparent" />

        <Container className="relative z-10 flex min-h-screen flex-col justify-center py-24 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-center">
            <div className="max-w-4xl space-y-8">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-200 backdrop-blur-md">
                Events Calendar
              </p>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl lg:text-6xl">
                  Ankara Build Club events are designed not just to gather, but to{" "}
                  <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                    ship
                  </SecondaryWordmark>{" "}
                  for real.
                </h1>
                <p className="max-w-2xl text-sm leading-8 text-ink-200 md:text-base">
                  This is not a passive meetup calendar. Every session is shaped
                  to help people focus harder, iterate faster, or make real
                  progress around the same table with the right collaborators.
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
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/48">
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

            <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(162,91,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(255,112,191,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
              <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-primary-200/45 to-transparent" />

              <div className="relative space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/44">
                    Before you join
                  </p>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    Come to the room for visible progress, not passive attendance.
                  </h2>
                </div>

                <div className="space-y-3">
                  {eventFlow.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.25rem] border border-white/10 bg-brand-black/40 p-4"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/76">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.18),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(255,112,191,0.12),transparent_24%)]" />

        <Container width="wide" className="relative">
          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                Event Structure
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
                The community rhythm is built by multiple formats working together.
              </h2>
              <p className="text-sm leading-7 text-ink-300 sm:text-base">
                Each format serves a different need: focus, speed, delivery, and
                shared visibility. The same rhythm language from the sponsor page
                now maps directly onto the events themselves.
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
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                            {format.rhythm}
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                            {format.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
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
        <Container width="wide">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:p-7">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                  Room energy
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  The day usually shifts away from small talk and toward real work.
                </h2>
                <p className="text-sm leading-7 text-white/70 sm:text-base">
                  The goal is more than putting people in the same room. As the
                  work becomes visible, conversations get sharper, feedback gets
                  better, and the community forms more naturally.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(70,44,125,0.92),rgba(131,28,145,0.86))] p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/48">
                Quick note
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                If you have been building alone for too long, this page is
                probably your signal to stop hiding the work and bring it into
                the room.
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
        <Container width="wide">
          <div className="overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col gap-4 border-b border-white/8 bg-black/18 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                  Live calendar
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  Track upcoming sessions directly in Luma.
                </h2>
                <p className="text-sm leading-6 text-white/70 sm:text-base">
                  Registration, schedule changes, and event details stay in sync
                  here, so this embed is the fastest path to the current calendar.
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
  );
}
