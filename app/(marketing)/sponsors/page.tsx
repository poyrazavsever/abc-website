import type { Metadata } from "next";

import {
  SponsorsCollaborationPanel,
  type CollaborationPill,
} from "@/components/marketing/sponsors-collaboration-panel";
import { SponsorsCommunitySummary } from "@/components/marketing/sponsors-community-summary";
import { SponsorsHero } from "@/components/marketing/sponsors-hero";
import { SponsorsProgramsSection } from "@/components/marketing/sponsors-programs-section";
import { SponsorsPipelineSection } from "@/components/marketing/sponsors-pipeline-section";
import { SponsorsRoadmapSection } from "@/components/marketing/sponsors-roadmap-section";
import {
  sponsorsPageData,
} from "@/lib/data/sponsors.data";

export const metadata: Metadata = {
  title: "Sponsors & Partnership",
  description:
    "shipin sponsor and partner page. Quickly review the community structure, event cadence, and collaboration areas.",
};

export default function SponsorsPage() {
  const { hero, programs, pipeline, roadmap } = sponsorsPageData;
  const partnerContactEmail = "ada.raimova@gmail.com";
  const contactHref = `mailto:${partnerContactEmail}?subject=Ankara%20Build%20Club%20partnership%20inquiry`;

  const collaborationSection: {
    eyebrow: string;
    heading: string;
    highlightPhrase: string;
    description: string;
    ctaLabel: string;
    pills: CollaborationPill[];
  } = {
    eyebrow: "Collaboration areas",
    heading: "We are building stronger partnerships together.",
    highlightPhrase: "stronger",
    description:
      "Contact us if you want to start a meaningful partnership with shipin.",
    ctaLabel: "Contact Us",
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
        label: "Content & Launch Partner",
        icon: "launch",
        accent: "pink",
        offsetClassName: "md:translate-x-6 md:translate-y-10 md:rotate-[-5deg]",
      },
    ],
  };

  const communitySummary = {
    eyebrow: "Community Summary",
    heading: "Behind the numbers is a visible building cadence.",
    description:
      "This is not a networking event or a panel series. shipin provides sponsors with clearer contact, authentic feedback, and organic visibility.",
    proofTitles: [
      "Builder focus",
      "Physical repetition",
      "Visible production",
      "Natural partner contact",
    ],
    stats: [
      {
        value: 2,
        suffix: "",
        label: "Sprints Completed",
        detail:
          "160+ Builders and 40+ Projects created so far with strong retention.",
      },
      {
        value: 187,
        label: "Luma Registrants",
        detail: "Sprint #2 was sold-out. 102 registrants and 10 live projects.",
      },
      {
        value: 80,
        suffix: "+",
        label: "Active WhatsApp Builders",
        detail:
          "The builders in our WhatsApp rarely leave. That is the signal.",
      },
      {
        value: 3,
        label: "Core Building Formats",
        detail:
          "Deep Work Sessions, Build Sprints, and Mini Sprints run regularly.",
      },
    ],
  };

  const programsSection = {
    heading: "The rhythm of the community is built with building formats.",
    highlightPhrase: "building formats.",
    description:
      "Deep Work, Build Sprints, and Mini Sprints keep the same community working continuously across different energy modes.",
  };

  return (
    <div className="bg-background">
      <SponsorsHero
        hero={hero}
        primaryHref={contactHref}
        secondaryHref="/events"
      />

      <SponsorsCommunitySummary
        eyebrow={communitySummary.eyebrow}
        heading={communitySummary.heading}
        description={communitySummary.description}
        proofTitles={communitySummary.proofTitles}
        stats={communitySummary.stats}
      />

      <SponsorsPipelineSection
        eyebrow={pipeline.eyebrow}
        heading={pipeline.heading}
        description={pipeline.description}
        stages={pipeline.stages}
      />

      <SponsorsProgramsSection
        heading={programsSection.heading}
        highlightPhrase={programsSection.highlightPhrase}
        description={programsSection.description}
        items={programs.items}
      />

      <SponsorsRoadmapSection
        eyebrow={roadmap.eyebrow}
        heading={roadmap.heading}
        description={roadmap.description}
        events={roadmap.events}
        future={roadmap.future}
      />



      <SponsorsCollaborationPanel
        eyebrow={collaborationSection.eyebrow}
        heading={collaborationSection.heading}
        highlightPhrase={collaborationSection.highlightPhrase}
        description={collaborationSection.description}
        email={partnerContactEmail}
        ctaLabel={collaborationSection.ctaLabel}
        ctaHref={contactHref}
        pills={collaborationSection.pills}
      />
    </div>
  );
}
