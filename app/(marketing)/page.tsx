import Image from "next/image";
import Link from "next/link";

import { AboutTimeline } from "@/components/marketing/about-timeline";
import { EventFormatsPreview } from "@/components/marketing/event-formats-preview";
import { LandingHero } from "@/components/marketing/landing-hero";
import Masonry from "@/components/marketing/masonry";
import { Container } from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeader } from "@/components/ui/section-header";

const analyticsHighlights = [
  {
    value: "200+",
    label: "community members",
    detail: "A 200-person builder community growing through shared momentum.",
  },
  {
    value: "64",
    label: "shipped projects",
    detail:
      "Landing pages, MVPs, side projects, and collaborative sprint outputs.",
  },
  {
    value: "5+",
    label: "active event cycles",
    detail:
      "A steady rhythm powered by Build Sprint, Shipathon, Roasting Day, and Feedback Circle formats.",
  },
];

const eventFormats = [
  {
    id: "build-sprint",
    title: "Build Sprint",
    eyebrow: "Output",
    description:
      "One day, one decision, one delivery. Not perfect, but you leave with something shipped.",
    meta: "Demo + feedback",
    img: "/events/events-session-1.jpg",
    url: "/events",
    height: 500,
  },
  {
    id: "Shipathon",
    title: "Ship Sprint",
    eyebrow: "Shipping",
    description:
      "A shipping event centered on ending the day with something real.",
    meta: "End of day ship sprint",
    img: "/events/events-session-2.jpg",
    url: "/events",
    height: 760,
  },
];

const photoGalleryItems = [
  {
    id: "lovable-logo",
    img: "/events/lovable.jpg",
    url: "/events",
    height: 420,
  },
  {
    id: "events-pano",
    img: "/events/events-pano.jpg",
    url: "/events",
    height: 520,
    imagePosition: "50% 38%",
  },
  {
    id: "events-session-3",
    img: "/events/events-session-3.jpg",
    url: "/events",
    height: 760,
  },
  {
    id: "events-session-4",
    img: "/events/events-session-4.jpg",
    url: "/events",
    height: 760,
  },
  {
    id: "shebuilds-group",
    img: "/events/shebuilds-group.png",
    url: "/events",
    height: 760,
  },
  {
    id: "shebuilds-room-1",
    img: "/events/shebuilds-room-1.jpg",
    url: "/events",
    height: 700,
  },
  {
    id: "shebuilds-room-2",
    img: "/events/shebuilds-room-2.jpg",
    url: "/events",
    height: 700,
  },
  {
    id: "fal-logo",
    img: "/events/fal.png",
    url: "/events",
    height: 420,
  },
];

const aboutTimeline = {
  eyebrow: "Our Journey",
  heading: "Timeline",
  description: "",
  ctaLabel: "Join the Community",
  ctaHref: "/register",
  milestones: [
    {
      year: "Build Sprint 1",
      title: "SheBuilds on Lovable",
      description:
        "Our first Build Sprint brought early builders together around SheBuilds with Lovable.",
    },
    {
      year: "Build Sprint 2",
      title: "Vibe-coding with Fal",
      description:
        "The second Build Sprint focused on vibe-coding with Fal and pushing ideas into working outputs.",
    },
    {
      year: "Hackathon 1",
      title: "Sport Tech with the Federation & METU",
      description:
        "Our first hackathon centered on sport tech with the Federation and METU.",
    },
    {
      year: "Ship Sprint",
      title: "GTM shipathon",
      description:
        "A go-to-market Ship Sprint focused on turning real products into launch momentum.",
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
  return (
    <div className="bg-brand-black text-white">
      <LandingHero />

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
                  <p className="text-sm leading-6 text-white/70">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <div>
        <EventFormatsPreview />
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
                <CardContent className="flex items-center gap-4 px-4 py-5 text-left sm:flex-col sm:items-center sm:gap-4 sm:px-5 sm:py-9 sm:text-center">
                  {member.imageSrc ? (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/12 shadow-[0_16px_35px_rgba(70,44,125,0.28)] ring-4 ring-accent-500/10 sm:h-32 sm:w-32">
                      <Image
                        src={member.imageSrc}
                        alt={member.imageAlt ?? member.name}
                        fill
                        className={`object-cover grayscale ${member.imageClassName ?? ""}`}
                        sizes="(max-width: 640px) 80px, 128px"
                      />
                    </div>
                  ) : (
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_30%_30%,rgba(255,112,191,0.32),rgba(131,28,145,0.14)_45%,rgba(70,44,125,0.1)_100%)] text-lg font-semibold tracking-[-0.05em] text-white shadow-[0_16px_35px_rgba(70,44,125,0.28)] sm:h-28 sm:w-28 sm:text-2xl">
                      <div className="absolute inset-[6px] rounded-full border border-white/12 bg-brand-black/50" />
                      <span className="relative">{member.initials}</span>
                    </div>
                  )}

                  <div className="min-w-0 flex-1 space-y-2 sm:flex-none">
                    <h3 className="text-lg font-bold tracking-tight text-white sm:mt-2 sm:text-xl">
                      {member.name}
                    </h3>

                    <span className="inline-flex max-w-full rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.08em] text-white/72 sm:px-4 sm:text-[0.8rem]">
                      {member.role}
                    </span>
                  </div>

                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn profile`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/58 transition-colors hover:border-accent-400/30 hover:bg-accent-500/10 hover:text-accent-200 sm:mt-1"
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
            description="A quick look at our two main formats: Build Sprint and Ship Sprint."
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
                items={photoGalleryItems}
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
