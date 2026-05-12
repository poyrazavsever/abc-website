import Image from "next/image";
import Link from "next/link";

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
    "Shipin is more than a community. It is a shipping-driven ecosystem where people build, test, and launch together. We create the momentum builders need to turn ideas into real products.",
  imageSrc: "/about/mission.png",
  imageAlt: "Shipin community members working together",
  stats: [
    { value: "200+", label: "Active Builders" },
    { value: "5+", label: "Events" },
    { value: "5", label: "Core Formats" },
  ],
};

const aboutValues = {
  eyebrow: "Our Foundations",
  heading: "What We Build Around",
  description:
    "Shipin is built on practical execution, visible learning, and recurring momentum that helps builders keep shipping.",
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
    "Shipin events are more than networking. They create demo moments, shipping pressure, peer feedback, and build-in-public energy. Each format serves a different need.",
  imageSrc: "/about/community.png",
  imageAlt: "Shipin community event",
  features: [
    {
      title: "Build Sprint",
      description:
        "High-energy, team-based execution with fast iteration loops.",
    },
    {
      title: "Shipathon",
      description:
        "A shipping cadence centered on ending the day with something real.",
    },
    {
      title: "Roasting Day",
      description:
        "A day where builders bring the work and get sharp, honest feedback from the community.",
    },
    {
      title: "Deep Work",
      description: "Build side by side through uninterrupted focus sessions.",
    },
    
    
  ],
  ctaLabel: "Explore Events",
  ctaHref: "/events",
};

const aboutTimeline = {
  eyebrow: "Our Journey",
  heading: "Timeline",
  description:
    "From the first gathering to the next shipping cycle, Shipin is becoming a recurring space for builders to meet, focus, and launch.",
  ctaLabel: "Join the Community",
  ctaHref: "/register",
  milestones: [
    {
      year: "8 March 2026",
      title: "First Event",
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
      year: "Q3 2026",
      title: "Branding and Community",
      description:
        "We change the name to Shipin and build a community around shipping, creating a new identity for the community.",
    },
    {
      year: "Future Vision",
      title: "A Lasting Builder Network",
      description:
        "Our vision is to grow into a lasting builder network that opens more space for women to learn, ship, collaborate, and lead across new formats and new cities.",
    },
  ],
};

const teamMembers = [
  {
    name: "Ada Raimova",
    role: "Founder & Community Lead",
    initials: "AR",
    imageSrc: "/team/ada1.jpeg",
    imageAlt: "Portrait of Ada Raimova",
    linkedinUrl: "https://www.linkedin.com/in/adalatraimova/",
  },
  {
    name: "Defne Erkan",
    role: "Founding Member & Operations",
    initials: "DE",
    imageSrc: "/team/defne.png",
    imageAlt: "Portrait of Defne Erkan",
    linkedinUrl: "https://www.linkedin.com/in/defneerkan/",
  },
  {
    name: "Berkem Peker",
    role: "Founding Member & Technical Lead",
    initials: "BP",
    imageSrc: "/team/berkem.jpeg",
    imageAlt: "Portrait of Berkem Peker",
    linkedinUrl: "https://www.linkedin.com/in/berkempeker/",
  },
  {
    name: "Ayfer Kaya",
    role: "Founding Member & Partnerships",
    initials: "AY",
    imageSrc: "/team/ayfer.png",
    imageAlt: "Portrait of Ayfer",
    imageClassName: "scale-[1.18] object-center",
    linkedinUrl: "https://www.linkedin.com/in/ayfer-kaya/",
  },
  {
    name: "Mustafa Kara",
    role: "Founding Member & Community",
    initials: "MK",
    imageSrc: "/team/mustafa.png",
    imageAlt: "Portrait of Mustafa Kara",
    linkedinUrl: "https://www.linkedin.com/in/mustafakaraa/",
  },
  {
    name: "Poyraz Avsever",
    role: "Founding Member & Technical",
    initials: "PO",
    imageSrc: "/team/poyraz.png",
    imageAlt: "Portrait of Poyraz",
    linkedinUrl: "https://www.linkedin.com/in/poyrazavsever",
  },
];

export default function MarketingHomePage() {
  const sponsorLoop = [...sponsorNames, ...sponsorNames];

  return (
    <div className="bg-brand-black text-white">
      <LandingHero />

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

      <section className="relative overflow-hidden border-t border-white/6 bg-brand-black py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,112,191,0.12),transparent_20%),radial-gradient(circle_at_15%_75%,rgba(70,44,125,0.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(131,28,145,0.16),transparent_28%)]" />

        <Container width="wide" className="relative space-y-12">
          <SectionHeader
            eyebrow="Our Team"
            heading="Our Team"
            description="The people building Shipin."
            className="mx-auto max-w-3xl text-center sm:items-center sm:justify-center [&_h2]:text-white [&_p]:text-white/70"
          />

          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                surface="transparent"
                elevated={false}
                className="rounded-[1.75rem] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-md"
              >
                <CardContent className="flex flex-col items-center gap-4 px-5 py-9 text-center">
                  {member.imageSrc ? (
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/12 shadow-[0_16px_35px_rgba(70,44,125,0.28)] ring-4 ring-accent-500/10">
                      <Image
                        src={member.imageSrc}
                        alt={member.imageAlt ?? member.name}
                        fill
                        className={`object-cover grayscale ${member.imageClassName ?? ""}`}
                        sizes="128px"
                      />
                    </div>
                  ) : (
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_30%_30%,rgba(255,112,191,0.32),rgba(131,28,145,0.14)_45%,rgba(70,44,125,0.1)_100%)] text-2xl font-semibold tracking-[-0.05em] text-white shadow-[0_16px_35px_rgba(70,44,125,0.28)]">
                      <div className="absolute inset-[6px] rounded-full border border-white/12 bg-brand-black/50" />
                      <span className="relative">{member.initials}</span>
                    </div>
                  )}

                  <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-[0.8rem] font-semibold tracking-[0.08em] text-white/72">
                    {member.role}
                  </span>

                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn profile`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/58 transition-colors hover:border-accent-400/30 hover:bg-accent-500/10 hover:text-accent-200"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.94 8.5A1.44 1.44 0 1 1 6.94 5.62a1.44 1.44 0 0 1 0 2.88ZM5.7 9.74h2.47V18H5.7V9.74Zm3.87 0h2.36v1.13h.03c.33-.62 1.13-1.28 2.33-1.28 2.49 0 2.95 1.64 2.95 3.77V18h-2.46v-4.03c0-.96-.02-2.2-1.34-2.2-1.35 0-1.56 1.05-1.56 2.13V18H9.57V9.74Z" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

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
