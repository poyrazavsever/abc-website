import type { Metadata } from "next";

import {
  SponsorsCollaborationPanel,
  type CollaborationPill,
} from "@/components/marketing/sponsors-collaboration-panel";
import { SponsorsCommunitySummary } from "@/components/marketing/sponsors-community-summary";
import { SponsorsHero } from "@/components/marketing/sponsors-hero";
import { SponsorsProgramsSection } from "@/components/marketing/sponsors-programs-section";
import {
  partnerContactEmail,
  partnerContactHref,
  sponsorsPageData,
} from "@/lib/data/sponsors.data";

export const metadata: Metadata = {
  title: "Sponsors & Partnerships",
  description:
    "Explore partnership opportunities with Ankara Build Club, from event sponsorships to builder enablement and community programs.",
};

export default function SponsorsPage() {
  const { hero, programs } = sponsorsPageData;

  const collaborationSection: {
    eyebrow: string;
    heading: string;
    highlightPhrase: string;
    description: string;
    ctaLabel: string;
    pills: CollaborationPill[];
  } = {
    eyebrow: "Partnership opportunities",
    heading: "Build stronger partnerships with the community.",
    highlightPhrase: "stronger partnerships",
    description:
      "If you want to support the Ankara Build Club ecosystem in a meaningful way, we'd love to hear from you.",
    ctaLabel: "Get in Touch",
    pills: [
      {
        label: "Technology & API Partner",
        icon: "cube",
        accent: "violet",
        offsetClassName: "md:-translate-y-7 md:rotate-[-6deg]",
      },
      {
        label: "Hackathon Supporter",
        icon: "calendar",
        accent: "pink",
        offsetClassName: "md:translate-x-12 md:translate-y-1 md:rotate-[4deg]",
      },
      {
        label: "Mentorship",
        icon: "users",
        accent: "violet",
        offsetClassName: "md:translate-x-24 md:-translate-y-1 md:rotate-[5deg]",
      },
      {
        label: "Venue Sponsor",
        icon: "pin",
        accent: "pink",
        offsetClassName: "md:-translate-x-3 md:translate-y-4 md:rotate-[-4deg]",
      },
      {
        label: "Community Credits",
        icon: "spark",
        accent: "violet",
        offsetClassName: "md:translate-x-16 md:translate-y-8 md:rotate-[3deg]",
      },
      {
        label: "Content & Launch Collaboration",
        icon: "launch",
        accent: "pink",
        offsetClassName: "md:translate-x-6 md:translate-y-10 md:rotate-[-5deg]",
      },
    ],
  };

  const communitySummary = {
    eyebrow: "Community Snapshot",
    heading: "Behind the numbers is a visible rhythm of building.",
    description:
      "This is not networking for its own sake. ABC creates recurring build moments that give partners clearer touchpoints, better feedback, and more organic visibility.",
    proofTitles: [
      "Builder-first",
      "In-person rhythm",
      "Visible output",
      "Natural partner touchpoints",
    ],
    stats: [
      {
        value: 5,
        suffix: "+",
        label: "Building disciplines",
        detail:
          "Code, product, design, growth, and operations all meet on the same build floor.",
      },
      {
        value: programs.items.length,
        label: "Core formats",
        detail:
          "Deep Work, Build Sprint, and Ship Day keep the community moving on a repeatable cadence.",
      },
      {
        value: collaborationSection.pills.length,
        label: "Partnership tracks",
        detail:
          "From APIs and venues to mentorship and content, there are clear ways to engage the community directly.",
      },
      {
        value: 4,
        label: "Community layers",
        detail:
          "Focus, repetition, visibility, and partner interaction work together inside the same system.",
      },
    ],
  };

  const programsSection = {
    heading: "The community rhythm is shaped by event formats.",
    highlightPhrase: "event formats",
    description:
      "Deep Work, Build Sprint, and Ship Day keep the same community activated through three distinct energy levels.",
  };

  return (
    <div className="bg-background">
      <SponsorsHero
        hero={hero}
        primaryHref={partnerContactHref}
        secondaryHref="/events"
      />

      <SponsorsCommunitySummary
        eyebrow={communitySummary.eyebrow}
        heading={communitySummary.heading}
        description={communitySummary.description}
        proofTitles={communitySummary.proofTitles}
        stats={communitySummary.stats}
      />

      <SponsorsProgramsSection
        heading={programsSection.heading}
        highlightPhrase={programsSection.highlightPhrase}
        description={programsSection.description}
        items={programs.items}
      />

      <SponsorsCollaborationPanel
        eyebrow={collaborationSection.eyebrow}
        heading={collaborationSection.heading}
        highlightPhrase={collaborationSection.highlightPhrase}
        description={collaborationSection.description}
        email={partnerContactEmail}
        ctaLabel={collaborationSection.ctaLabel}
        ctaHref={partnerContactHref}
        pills={collaborationSection.pills}
      />
    </div>
  );
}
