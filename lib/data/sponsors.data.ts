export const partnerContactEmail = "hello@ankarabuildclub.com";
export const partnerContactHref =
  "mailto:hello@ankarabuildclub.com?subject=Ankara%20Build%20Club%20partnership%20inquiry";

type SponsorHero = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  asideTitle: string;
  asideDescription: string;
  asideItems: string[];
};

type SponsorProofItem = {
  title: string;
  description: string;
};

type SponsorProgramItem = {
  name: string;
  rhythm: string;
  format: string;
  outcome: string;
  partnerValue: string;
};

type SponsorShowcaseItem = {
  title: string;
  description: string;
  outputs: string[];
};

type SponsorModelItem = {
  title: string;
  summary: string;
  fit: string;
};

type SponsorContactStep = {
  step: string;
  title: string;
  description: string;
};

type SponsorsPageData = {
  hero: SponsorHero;
  community: {
    eyebrow: string;
    heading: string;
    description: string;
    proofItems: SponsorProofItem[];
  };
  programs: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SponsorProgramItem[];
  };
  pipeline: {
    eyebrow: string;
    heading: string;
    description: string;
    stages: { step: string; title: string; subtitle: string }[];
  };
  roadmap: {
    eyebrow: string;
    heading: string;
    description: string;
    events: string[];
    future: string[];
  };
  partners: {
    eyebrow: string;
    heading: string;
    toolPartners: string[];
    communityPartners: string[];
  };
  showcase: {
    eyebrow: string;
    heading: string;
    description: string;
    noteTitle: string;
    noteDescription: string;
    items: SponsorShowcaseItem[];
  };
  partnership: {
    eyebrow: string;
    heading: string;
    description: string;
    models: SponsorModelItem[];
    contactFlow: SponsorContactStep[];
    closingTitle: string;
    closingDescription: string;
    responseWindow: string;
  };
};

export const sponsorsPageData: SponsorsPageData = {
  hero: {
    eyebrow: "Builder Signal Report",
    title: "The Stage Before Everything Else.",
    description:
      "shipin operates at the earliest, least-visible stage of the pipeline. We find founders before the idea. Before the team. Before everything.",
    highlights: [
      "No spectators, just builders",
      "Pre-Idea / Pre-Team Stage",
      "Validating problem-solution signal",
    ],
    primaryCtaLabel: "Become a Partner",
    secondaryCtaLabel: "Review Event Structure",
    asideTitle: "What is shipin?",
    asideDescription:
      "This is not a networking event or a panel series. It is a space for people who actually build - who come with a laptop, ship something, and bring others who can do the same.",
    asideItems: [
      "Stage 1: Individual with capability and curiosity",
      "Stage 2: Exploration",
      "Stage 3: Rapid product creation via AI tools",
      "Stage 4: Company formation from evidence, not assumption",
    ],
  },
  community: {
    eyebrow: "Community Summary",
    heading: "Retention is showing up in the numbers.",
    description:
      "Sprint #2 was sold-out and we closed at 102 registrants. 10 projects published live. The 80 builders in our WhatsApp rarely leave. That is the signal.",
    proofItems: [
      {
        title: "The Non-Technical Barrier Is Visibly Shrinking",
        description:
          "Sprint #1 had people discovering vibe coding for the first time. Sprint #2 had builders arriving with prototypes already in mind. Non-technical builders are shipping.",
      },
      {
        title: "Community Owns Its Own Growth",
        description:
          "WhatsApp has doubled. Instagram launched organically – builders making reels, promoting within the community. Community infrastructure replaced event infrastructure.",
      },
      {
        title: "New Formats Create A Building Cadence",
        description:
          "Deep Work sessions fill the gap between sprints. Sprints generate new projects. Deep Work generates momentum. Together they form a rhythm that doesn't depend on a single event.",
      },
      {
        title: "Zero Budget Confirms The Model",
        description:
          "Two Sprints on zero budget confirms the model works. Monetization starts after PoC, who come in now are at the pre-revenue stage.",
      },
    ],
  },
  programs: {
    eyebrow: "Building Cadence",
    heading: "Two Formats. One Building Cadence.",
    description:
      "The cadence is what keeps the pipeline flowing. Each format serves a different kind of momentum.",
    items: [
      {
        name: "Build Sprint",
        rhythm: "Team-Run · Core",
        format:
          "Full-day intensive. Builders ship from scratch or meaningfully advance a project. Structured curriculum, facilitated by the core team. Vetted intake – serious builders only. No spectators.",
        outcome:
          "Prototypes, MVP iteration, demo moments, and strong team bonding.",
        partnerValue:
          "Ideal for tool integrations, APIs, mentoring, and identifying top talent or early products.",
      },
      {
        name: "Ship Sprint",
        rhythm: "Launch-Focused · Core",
        format:
          "A tighter sprint built around finishing, launching, and turning momentum into something publicly shipped. Deadline-led, sharper in scope, and focused on visible release energy.",
        outcome:
          "Launch moments, sharper deadlines, public accountability, and products that leave the room more real than they entered.",
        partnerValue:
          "Ideal for launch tooling, distribution support, GTM mentors, media partners, and API usage stories tied to real shipping moments.",
      },
    ],
  },
  pipeline: {
    eyebrow: "The Pipeline",
    heading: "The Stage Before Everything Else.",
    description:
      "We find founders before the idea. Before the team. Before everything. We build the environment where builders discover what they are capable of, ship their first product, and connect to a global ecosystem.",
    stages: [
      {
        step: "Stage 1",
        title: "Build Sprint",
        subtitle: "Minimal viable product",
      },
      {
        step: "Stage 2",
        title: "Ship Sprint",
        subtitle: "Minimal viable distribution",
      },
      {
        step: "Stage 3",
        title: "Market Readiness",
        subtitle: "Validated problem-solution signal",
      },
    ],
  },
  roadmap: {
    eyebrow: "4-Event Arc – 2026",
    heading: "The path towards validation and scale.",
    description:
      "Our planned event sequence leads to a major pivot point, bridging raw builders to real venture capital and scaling.",
    events: [
      "Sprint #1",
      "Sprint #2",
      "Sprint #3",
      "GTM/MVD Sprint",
      "VCs + Builders",
    ],
    future: [
      "Pre-Accelerator",
      "VC Pipeline",
      "Licensing",
      "City Chapters / Ambassador Program",
    ],
  },
  partners: {
    eyebrow: "Our Network",
    heading: "Partners in the Ecosystem",
    toolPartners: ["Lovable", "fal.ai", "Garaj Teknoloji Geliştirme Merkezi"],
    communityPartners: [
      "BetaDash",
      "Pitchless",
      "Habitat",
      "Behumbo",
      "VC Scout Network",
      "XFounders",
      "The Brutally Honest Group",
    ],
  },
  showcase: {
    eyebrow: "Project Showcase",
    heading: "The GTM/MVD Event Is The Pivot Point.",
    description:
      "Sprint #3 is still a build sprint – builders ship more and wrap up current projects. It is not the pivot. The pivot is what comes after: a dedicated GTM/MVD event.",
    noteTitle: "Note",
    noteDescription:
      "This is where the builder pipeline goes public. After it, we bring in VCs, experts, and mentors to engage directly with what has been built. That handoff is the proof of concept – and the gate before City Chapters.",
    items: [
      {
        title: "Sprint #1",
        description:
          "Discovery. Exploring what builders are capable of starting from scratch.",
        outputs: ["60 Builders", "30 Projects", "116 Registrants (Luma)"],
      },
      {
        title: "Sprint #2",
        description:
          "Retention. Sold-out event with high conversion to active WhatsApp members.",
        outputs: ["~100 Builders", "10 Live Projects", "187 Registrants"],
      },
      {
        title: "Sprint #3",
        description:
          "Coming soon. Builders ship more and wrap up current projects.",
        outputs: ["TBD Builders", "TBD Projects", "TBD Registrants"],
      },
      {
        title: "GTM/MVD Sprint",
        description:
          "The pivot point. Bringing in VCs, experts, and mentors to engage directly.",
        outputs: ["GTM Strategies", "MVD Check", "VC Pipeline Hand-off"],
      },
    ],
  },
  partnership: {
    eyebrow: "Collaboration Models",
    heading:
      "Partnership becomes more meaningful when it fits the rhythm of the community.",
    description:
      "The models that work best within shipin are those that integrate into the community's rhythm and offer direct value to the builder. We prefer partnerships that generate genuine interaction and use over superficial branding.",
    models: [
      {
        title: "Event Partnership",
        summary:
          "A visible partnership model that supports a specific Deep Work, Build Sprint, or Mini Sprint format.",
        fit: "For organizations looking to have a presence at the event, touch the community directly, and position themselves in relevant contexts.",
      },
      {
        title: "Builder Enablement Support",
        summary:
          "An education, mentoring, office hours, or resource support model that helps the community build better.",
        fit: "For partners wanting to provide expertise or process support that accelerates work, not just a logo.",
      },
      {
        title: "Tool / Credit / Infrastructure Support",
        summary:
          "A model providing access to software, API credits, infrastructure, datasets, or tools that builders can actually use.",
        fit: "For partners seeking deeper engagement through product trials and workflows directly embedded in builder processes.",
      },
      {
        title: "Content / Report / Community Collaboration",
        summary:
          "A special program, report, or content model built together, packaging observations and production stories originating from the community.",
        fit: "For institutions looking to better understand the building culture or produce a unique community story.",
      },
    ],
    contactFlow: [
      {
        step: "01",
        title: "Brief intro email",
        description:
          "Send a short email explaining what you want to do, which format you're interested in, and what kind of value you can offer the community.",
      },
      {
        step: "02",
        title: "Alignment discussion",
        description:
          "We review whether there is a genuine fit between the community's rhythm, event structure, and your expectations.",
      },
      {
        step: "03",
        title: "Custom partnership plan & feedback",
        description:
          "If the suitable format is clear, we create a solid partnership plan detailing the scope, timing, visibility, and responsibilities.",
      },
    ],
    closingTitle:
      "Write to us if you want to start a meaningful partnership with shipin.",
    closingDescription:
      "From content to events, infrastructure to builder enablement, we can design different models together. A short introductory email is enough for the first step.",
    responseWindow: "Response within 24 hours on weekdays",
  },
};
