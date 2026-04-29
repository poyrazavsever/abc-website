import { Grainient } from "@/components/marketing/grainient";
import Masonry from "@/components/marketing/masonry";
import { RotatingText } from "@/components/marketing/rotating-text";
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

const sponsorNames = [
  "Builder Network",
  "Campus Labs",
  "GarajX",
  "OUOD",
  "Behumbo",
  "Lovable",
  "Supabase",
  "Vercel",
];

const analyticsHighlights = [
  {
    value: "1.2K+",
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
  {
    value: "92%",
    label: "return rate",
    detail: "The likelihood that someone who joins once comes back into the community.",
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
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
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
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
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
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
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
    img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 560,
  },
  {
    id: "demo-night",
    title: "Demo Night",
    eyebrow: "Showcase",
    description: "Builders presenting what shipped that week.",
    meta: "Community demos",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 680,
  },
  {
    id: "work-session",
    title: "Work Session",
    eyebrow: "Build",
    description: "Focused laptop session with the room in flow.",
    meta: "Open tables",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 540,
  },
  {
    id: "team-sync",
    title: "Team Sync",
    eyebrow: "Collab",
    description: "Quick alignment before a fast sprint starts.",
    meta: "Builder teams",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 620,
  },
  {
    id: "founder-corner",
    title: "Founder Corner",
    eyebrow: "Talk",
    description: "Small group discussion around product decisions.",
    meta: "Office hours",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 500,
  },
  {
    id: "late-night-build",
    title: "Late Night Build",
    eyebrow: "Energy",
    description: "Evening session with screens, notes, and momentum.",
    meta: "After hours",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    url: "/events",
    height: 760,
  },
  {
    id: "community-moment",
    title: "Community Moment",
    eyebrow: "People",
    description: "The social layer between sessions and shipping.",
    meta: "Meetups",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
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

export default function MarketingHomePage() {
  const sponsorLoop = [...sponsorNames, ...sponsorNames];

  return (
    <div className="bg-brand-black text-white">
      <section className="relative isolate min-h-screen overflow-hidden bg-brand-black text-primary-foreground">
        <div className="absolute inset-0 -z-30">
          <Grainient
            color1="var(--color-accent-500)"
            color2="var(--color-secondary-500)"
            color3="var(--color-primary-950)"
            timeSpeed={0.25}
            colorBalance={-0.16}
            warpStrength={1.15}
            warpFrequency={5.0}
            warpSpeed={2.0}
            warpAmplitude={59}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.1}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.5}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-primary/55 via-primary-800/40 to-primary-950/65" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-3xl" />

        <Container className="flex min-h-screen items-center justify-center py-24">
          <div className="flex w-full max-w-5xl flex-col items-center gap-8 text-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-white/80">
                SHIPIN
              </p>
              <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-balance text-white sm:text-5xl md:text-6xl">
                Ideas Don&apos;t Matter Shipping Does
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
                Shipin is where builders turn ideas into shipped products, real
                users, and actual traction.
              </p>
            </div>

            <div className="w-full max-w-2xl rounded-[1.6rem] border border-white/20 bg-white/8 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-2.5">
              <div className="flex flex-col gap-2 rounded-[1.3rem] border border-white/10 bg-white/6 p-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-3">
                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-[1rem] px-2 py-1.5 text-center sm:max-w-[10rem] sm:items-start sm:px-3 sm:text-left">
                  <div className="flex items-baseline justify-center text-[0.9rem] font-semibold tracking-[-0.04em] text-white/88 sm:justify-start sm:text-lg">
                    <span className="shrink-0">shipin.city/</span>
                    <RotatingText
                      items={featuredNames}
                      intervalMs={3200}
                      className="ml-0.5 inline-block min-w-[4.5ch] text-left text-accent-300 transition-all duration-500"
                    />
                  </div>
                </div>

                <LinkButton
                  href="/register"
                  className="h-11 shrink-0 rounded-[1.1rem] border-0 bg-[linear-gradient(90deg,var(--color-highlight-400),var(--color-accent-500),var(--color-info-400))] px-5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(213,82,163,0.28)] transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(131,28,145,0.26)] sm:px-6"
                >
                  Join the community
                </LinkButton>
              </div>
            </div>

            <p className="max-w-xl text-xs uppercase tracking-[0.22em] text-white/60 sm:text-sm">
              Community, events, builders, collaboration.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-b border-white/10 bg-brand-black py-5">
        <Container width="full" className="overflow-hidden px-0">
          <div className="mx-auto max-w-[110rem]">
            <p className="mb-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/45">
              Supporters and sponsors
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
                  {sponsorLoop.map((sponsor, index) => (
                    <span
                      key={`${sponsor}-${index}`}
                      className="inline-flex items-center gap-5 px-6 text-lg font-semibold tracking-[-0.03em] text-white/62 sm:px-8"
                    >
                      <span>{sponsor}</span>
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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    </div>
  );
}
