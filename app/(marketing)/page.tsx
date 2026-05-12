import { AboutCommunity } from "@/components/marketing/about-community";
import { AboutMission } from "@/components/marketing/about-mission";
import { AboutTimeline } from "@/components/marketing/about-timeline";
import { AboutValues } from "@/components/marketing/about-values";
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

const sponsorNames = [
  "Deep Work",
  "Ship Day",
  "Build Sprint",
  "Feedback Circle",
  "Demo Night",
  "Work Session",
  "Team Sync",
  "Founder Corner",
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

const aboutMission = {
  eyebrow: "Our Mission",
  heading: "We believe in the power of building and shipping together.",
  accentPhrase: "building and shipping together",
  description:
    "Ship In is more than a community. It is a shipping-driven ecosystem where people build, test, and launch together. We create the momentum builders need to turn ideas into real products.",
  imageSrc: "/about/mission.png",
  imageAlt: "Ship In community members working together",
  stats: [
    { value: "200+", label: "Active Builders" },
    { value: "5+", label: "Events" },
    { value: "5", label: "Core Formats" },
  ],
};

const aboutValues = {
  eyebrow: "Our Foundations",
  heading: "What We Build Around",
  items: [
    {
      title: "Making",
      description:
        "We do not gather just to talk. Every session is designed to push toward a real output and strengthen a culture of building together.",
    },
    {
      title: "Community",
      description:
        "Growth is collective. We move each other forward by sharing knowledge, experience, and momentum.",
    },
    {
      title: "Transparency",
      description:
        "Our process, decisions, and feedback stay visible. Trust is built through openness.",
    },
    {
      title: "Consistency",
      description:
        "We create a sustainable culture of execution through recurring rhythms, not one-off bursts of energy.",
    },
  ],
};

const aboutCommunity = {
  eyebrow: "Community",
  heading: "A community experience built around making.",
  accentPhrase: "built around making",
  description:
    "Ship In events are more than networking. They create demo moments, shipping pressure, peer feedback, and build-in-public energy. Each format serves a different need.",
  imageSrc: "/about/community.png",
  imageAlt: "Ship In community event",
  features: [
    {
      title: "Deep Work",
      description: "Build side by side through uninterrupted focus sessions.",
    },
    {
      title: "Build Sprint",
      description:
        "High-energy, team-based execution with fast iteration loops.",
    },
    {
      title: "Ship Day",
      description:
        "A shipping cadence centered on ending the day with something real.",
    },
  ],
  ctaLabel: "Explore Events",
  ctaHref: "/events",
};

const aboutTimeline = {
  eyebrow: "Our Journey",
  heading: "Timeline",
  description:
    "From the first gathering on International Women's Day to the long-term vision ahead, this is how the community is taking shape.",
  ctaLabel: "Join the Community",
  ctaHref: "/register",
  milestones: [
    {
      year: "8 Mar 2026",
      title: "First Gathering",
      description:
        "Our first event took place on International Women's Day, bringing together the earliest members of the community around an inclusive builder spirit.",
    },
    {
      year: "Spring 2026",
      title: "Building Momentum",
      description:
        "The next phase is turning that first energy into recurring meetups, stronger member connections, and a steady rhythm of building together.",
    },
    {
      year: "2026",
      title: "Shared Output",
      description:
        "As the network grows, events, collaborations, and member-led projects will create visible outcomes that strengthen the community identity.",
    },
    {
      year: "Future Vision",
      title: "A Lasting Builder Network",
      description:
        "Our vision is to grow into a lasting builder network that opens more space for women to learn, ship, collaborate, and lead across new formats and new cities.",
    },
  ],
};

export default function MarketingHomePage() {
  const sponsorLoop = [...sponsorNames, ...sponsorNames];

  return (
    <div className="bg-brand-black text-white">
      <LandingHero featuredNames={featuredNames} />

      <section className="border-t border-b border-white/10 bg-brand-black py-5">
        <Container width="full" className="overflow-hidden px-0">
          <div className="mx-auto max-w-[110rem]">
            <p className="mb-4 text-center text-[0.68rem] font-semibold tracking-[0.34em] text-white/45">
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
                  <div>
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-accent-300 sm:text-4xl">
                      {item.value}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-white/70">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <div id="about" className="scroll-mt-28">
        <AboutMission
          eyebrow={aboutMission.eyebrow}
          heading={aboutMission.heading}
          accentPhrase={aboutMission.accentPhrase}
          description={aboutMission.description}
          imageSrc={aboutMission.imageSrc}
          imageAlt={aboutMission.imageAlt}
          stats={aboutMission.stats}
        />

        <AboutValues
          eyebrow={aboutValues.eyebrow}
          heading={aboutValues.heading}
          description={aboutValues.description}
          values={aboutValues.items}
        />

        <AboutCommunity
          eyebrow={aboutCommunity.eyebrow}
          heading={aboutCommunity.heading}
          accentPhrase={aboutCommunity.accentPhrase}
          description={aboutCommunity.description}
          imageSrc={aboutCommunity.imageSrc}
          imageAlt={aboutCommunity.imageAlt}
          features={aboutCommunity.features}
          ctaLabel={aboutCommunity.ctaLabel}
          ctaHref={aboutCommunity.ctaHref}
        />

        <AboutTimeline
          eyebrow={aboutTimeline.eyebrow}
          heading={aboutTimeline.heading}
          description={aboutTimeline.description}
          ctaLabel={aboutTimeline.ctaLabel}
          ctaHref={aboutTimeline.ctaHref}
          milestones={aboutTimeline.milestones}
        />
      </div>

      <section className="border-t border-white/6 bg-brand-black py-20 sm:py-24">
        <Container width="wide" className="space-y-10">
          <SectionHeader
            eyebrow="Our photos"
            heading="Moments from the community."
            description="A quick look at the rooms, sessions, and builder energy that shape Shipin."
            actions={
              <LinkButton
                href="/events"
                variant="outline"
                className="border-white/12 bg-white/5 text-white hover:bg-white/10"
              >
                All events
              </LinkButton>
            }
            className="p-4 pt-0 [&_h2]:text-white [&_p]:text-white/70"
          />

          <div className="space-y-5 p-4 pt-0">
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
