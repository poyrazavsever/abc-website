import { LandingHero } from "@/components/marketing/landing-hero";
import Masonry from "@/components/marketing/masonry";
import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";

const featuredNames = [
  "ada",
  "mustafa",
  "berkem",
  "poyraz",
  "defne",
  "ayfer",
];

const eventNames = [
  "Deep Work",
  "Ship Day",
  "Sprint",
  "Feedback Circle",
  "Demo Night",
  "Work Session",
  "Founder Corner",
  "Late Night Build",
];

const analyticsHighlights = [
  {
    value: "1K+",
    label: "community members",
    detail:
      "A builder network born in Ankara and connected at internet speed.",
  },
  {
    value: "64",
    label: "shipped projects",
    detail: "Landing pages, MVPs, side projects, and collaborative sprint outputs.",
  },
  {
    value: "18",
    label: "active event cycles",
    detail: "A steady rhythm powered by Deep Work, Ship Day, and Sprint formats.",
  },
];

const eventFormats = [
  {
    id: "deep-work",
    title: "Deep Work",
    eyebrow: "Focus",
    description:
      "Two uninterrupted hours of building. You declare your goal first, then stay locked in.",
    meta: "Weekly rhythm",
    img: "/events/events-pano.jpg",
    url: "/events",
    height: 640,
  },
  {
    id: "ship-day",
    title: "Ship Day",
    eyebrow: "Output",
    description:
      "One day, one decision, one delivery. Not perfect, but you leave with something shipped.",
    meta: "Demo + feedback",
    img: "/events/events-session-1.jpg",
    url: "/events",
    height: 500,
  },
  {
    id: "sprint",
    title: "Sprint",
    eyebrow: "Speed",
    description:
      "A fast, high-energy build marathon where teams form quickly and turn ideas into products.",
    meta: "Builder teams",
    img: "/events/events-session-2.jpg",
    url: "/events",
    height: 760,
  },
  {
    id: "feedback-circle",
    title: "Feedback Circle",
    eyebrow: "Clarity",
    description:
      "Builders bring a page, a prototype, or a launch problem and leave with sharp outside perspective.",
    meta: "Critique session",
    img: "/events/events-session-3.jpg",
    url: "/events",
    height: 560,
  },
  {
    id: "demo-night",
    title: "Demo Night",
    eyebrow: "Showcase",
    description: "Builders presenting what shipped that week.",
    meta: "Community demos",
    img: "/events/events-session-4.jpg",
    url: "/events",
    height: 680,
  },
  {
    id: "work-session",
    title: "Work Session",
    eyebrow: "Build",
    description: "Focused laptop session with the room in flow.",
    meta: "Open tables",
    img: "/events/events-pano.jpg",
    url: "/events",
    height: 540,
  },
  {
    id: "team-sync",
    title: "Team Sync",
    eyebrow: "Collab",
    description: "Quick alignment before a fast sprint starts.",
    meta: "Builder teams",
    img: "/events/events-session-2.jpg",
    url: "/events",
    height: 620,
  },
  {
    id: "founder-corner",
    title: "Founder Corner",
    eyebrow: "Talk",
    description: "Small group discussion around product decisions.",
    meta: "Office hours",
    img: "/events/events-session-3.jpg",
    url: "/events",
    height: 500,
  },
  {
    id: "late-night-build",
    title: "Late Night Build",
    eyebrow: "Energy",
    description: "Evening session with screens, notes, and momentum.",
    meta: "After hours",
    img: "/events/events-session-1.jpg",
    url: "/events",
    height: 760,
  },
  {
    id: "community-moment",
    title: "Community Moment",
    eyebrow: "People",
    description: "The social layer between sessions and shipping.",
    meta: "Meetups",
    img: "/events/events-session-4.jpg",
    url: "/events",
    height: 580,
  },
];

const missionPillars = [
  {
    title: "Build a shipping rhythm",
    text: "We create a shared pace for consistently putting real work into the world, not just collecting inspiration.",
  },
  {
    title: "Create high-quality connections",
    text: "Getting the right people around the same table should not be luck. It should be designed into the community experience.",
  },
  {
    title: "Make the work visible",
    text: "Projects, profiles, and a strong shipping culture make sure meaningful work does not stay hidden.",
  },
];

const builderJourney = [
  {
    step: "01",
    title: "Show up with a real target",
    description:
      "Come in with a page to finish, a feature to polish, a launch to prepare, or a product question that needs pressure-tested thinking.",
  },
  {
    step: "02",
    title: "Work in public, not alone",
    description:
      "The room gives you urgency, outside perspective, and enough social energy to push through the fuzzy middle where most projects stall.",
  },
  {
    step: "03",
    title: "Leave with something shipped",
    description:
      "Every format is designed to end in movement: a demo, a clearer decision, a new collaborator, or a product asset that is finally live.",
  },
];

const memberProfiles = [
  {
    title: "Indie builders",
    description:
      "People turning nights and weekends into products with a stronger sense of pace, accountability, and momentum.",
    detail: "Solo, but no longer isolated.",
  },
  {
    title: "Student operators",
    description:
      "Curious students who want to move from ideas and inspiration into actual product work, team flow, and execution habits.",
    detail: "Learning by shipping, not watching.",
  },
  {
    title: "Design and product people",
    description:
      "Folks who want sharper feedback loops, better collaborators, and a more visible body of work than a hidden Figma tab.",
    detail: "Critique, context, and output.",
  },
  {
    title: "Early teams",
    description:
      "Small startup teams using the community as an external energy source for launches, recruiting, testing, and consistency.",
    detail: "A city-level support system.",
  },
];

const communitySignals = [
  "Weekly momentum without waiting for a conference-sized event",
  "Real names, real products, and visible work instead of vague networking",
  "A builder-friendly room where feedback turns into action fast",
  "A community archive that compounds through profiles, demos, and shipped projects",
];

export default function MarketingHomePage() {
  const eventLoop = [...eventNames, ...eventNames];

  return (
    <div className="bg-brand-black text-white">
      <LandingHero featuredNames={featuredNames} />

      <section className="border-t border-b border-white/10 bg-brand-black py-5">
        <Container width="full" className="overflow-hidden px-0">
          <div className="mx-auto max-w-[110rem]">
            <p className="mb-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/45">
              Our event formats
            </p>

            <div className="relative overflow-hidden border-y border-white/8 bg-white/3 py-5">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent sm:w-40"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent sm:w-40"
                aria-hidden="true"
              />

              <div className="abc-marquee">
                <div className="abc-marquee-track">
                  {eventLoop.map((eventName, index) => (
                    <span
                      key={`${eventName}-${index}`}
                      className="inline-flex items-center gap-5 px-6 text-lg font-semibold tracking-[-0.03em] text-white/62 sm:px-8"
                    >
                      <span>{eventName}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%)] py-20 sm:py-24">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Analytics"
            heading="See the community rhythm in numbers."
            description="Builder density, shipping culture, and return behavior show why Shipin works."
            align="center"
            className="mx-auto max-w-3xl [&_h2]:text-white [&_p]:text-white/70"
          />

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
            {analyticsHighlights.map((item) => (
              <Card
                key={item.label}
                surface="transparent"
                elevated={false}
                className="rounded-[1.5rem] border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-1">
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-accent-300 sm:text-4xl">
                      {item.value}
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-white/70">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/6 bg-brand-black pb-24 pt-4 sm:pb-28">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(17,17,17,0.98),rgba(70,44,125,0.82),rgba(131,28,145,0.72))] p-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/52">
              Our mission
            </p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.05em] text-balance sm:text-4xl">
              Make building in Ankara feel less like a solo effort.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/78 sm:text-base">
              Shipin is a community designed for people who launch products,
              form teams, test ideas, and build consistently to move in the
              same rhythm. The goal is not just to introduce people, but to
              help them create together.
            </p>
            <LinkButton
              href="/register"
              className="w-fit rounded-full bg-white px-5 text-primary hover:bg-white/92"
            >
              Join the rhythm
            </LinkButton>
          </div>

          <div className="grid gap-4">
            {missionPillars.map((pillar, index) => (
              <Card
                key={pillar.title}
                surface="transparent"
                elevated={false}
                className="rounded-[1.5rem] border-white/10 bg-white/5 shadow-[0_16px_44px_rgba(0,0,0,0.2)]"
              >
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-secondary-500),var(--color-accent-500))] text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/70 sm:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/6 bg-brand-black py-20 sm:py-24">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Our events"
            heading="Each format solves a different builder need."
            description="Sometimes you need focus, sometimes output, and sometimes a team to finish something in a single day."
            actions={
              <LinkButton
                href="/events"
                variant="outline"
                className="border-white/12 bg-white/5 text-white hover:bg-white/10"
              >
                All events
              </LinkButton>
            }
            className="[&_h2]:text-white [&_p]:text-white/70"
          />

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,112,191,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-3 shadow-[0_28px_72px_rgba(0,0,0,0.24)] sm:p-4">
              <Masonry
                items={eventFormats}
                ease="power3.out"
                duration={0.7}
                stagger={0.08}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.97}
                blurToFocus
                colorShiftOnHover
                showItemOverlay={false}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/6 bg-[radial-gradient(circle_at_top_left,rgba(255,126,196,0.12),transparent_28%),linear-gradient(180deg,#080808,#0d0d0d)] py-20 sm:py-24">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="How it works"
            heading="A community system built to move work forward."
            description="Shipin is not passive membership. It is a practical loop designed to turn intent into visible progress."
            className="[&_h2]:text-white [&_p]:text-white/70"
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {builderJourney.map((item) => (
              <Card
                key={item.step}
                surface="transparent"
                elevated={false}
                className="rounded-[1.7rem] border-white/10 bg-white/[0.04] shadow-[0_22px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm"
              >
                <CardContent className="space-y-8 p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/42">
                      Step
                    </span>
                    <span className="text-4xl font-semibold tracking-[-0.08em] text-accent-300">
                      {item.step}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/72 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/6 bg-brand-black py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-5">
            <SectionHeader
              eyebrow="Who it is for"
              heading="Different builder types, one shared tempo."
              description="The community works because it is broad enough to create collisions and focused enough to keep those collisions useful."
              className="[&_h2]:text-white [&_p]:text-white/70"
            />

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                Community signals
              </p>
              <div className="mt-5 grid gap-3">
                {communitySignals.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-accent-300" />
                    <p className="text-sm leading-6 text-white/72 sm:text-base">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {memberProfiles.map((profile) => (
              <Card
                key={profile.title}
                surface="transparent"
                elevated={false}
                className="rounded-[1.6rem] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_18px_48px_rgba(0,0,0,0.2)]"
              >
                <CardContent className="space-y-4 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    Profile
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">
                      {profile.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/72">
                      {profile.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-accent-300">
                    {profile.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/6 bg-[linear-gradient(180deg,#0b0b0b,rgba(81,24,85,0.72)_55%,#090909)] py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-12 left-10 h-36 w-36 rounded-full bg-secondary-400/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
                  Enter the room
                </p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[3.4rem]">
                  If you want more than inspiration, step into a room built for shipping.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                  Join upcoming events, create your builder profile, meet people
                  who are already making things, and turn your loose ideas into
                  a real weekly practice.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <LinkButton
                  href="/register"
                  className="rounded-full bg-white px-6 text-primary hover:bg-white/92"
                >
                  Join Shipin
                </LinkButton>
                <LinkButton
                  href="/events"
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/6 px-6 text-white hover:bg-white/10"
                >
                  Explore events
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
