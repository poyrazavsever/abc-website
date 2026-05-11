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
    eyebrow: "Sponsors & Partnerships",
    title: "Build Partnerships With Ankara Build Club.",
    description:
      "We design sponsor relationships around real participation, not one-off logo placement. If you want to show up where builders gather, ship, and learn together, let's build a partnership that fits the rhythm of the community.",
    highlights: [
      "Ankara-based in-person community",
      "Event-led builder rhythm",
      "Partnerships built around visibility and real use",
    ],
    primaryCtaLabel: "Start a Partnership Conversation",
    secondaryCtaLabel: "Explore Our Event Formats",
    asideTitle: "Who this page is for",
    asideDescription:
      "A quick overview for teams that want to understand the community, spot the right entry point, and move fast.",
    asideItems: [
      "Brands exploring event partnerships",
      "Teams offering tools, credits, or infrastructure to builders",
      "Organizations looking to co-create content, reports, or custom programs",
    ],
  },
  community: {
    eyebrow: "Community Snapshot",
    heading:
      "ABC is not a networking showcase. It is a working environment built around making things together.",
    description:
      "The value of the community is not just bringing people into the same room. It is creating recurring formats that push people to build together. For partners, that means clearer touchpoints, more honest feedback, and visibility that feels earned.",
    proofItems: [
      {
        title: "Builder-first",
        description:
          "The room brings together people actively building across product, code, design, growth, and operations.",
      },
      {
        title: "In-person rhythm in Ankara",
        description:
          "Local meetups and repeat formats turn one-time attendance into an ongoing relationship with the community.",
      },
      {
        title: "Visible output",
        description:
          "The events create demos, launches, feedback loops, and build-in-public moments, not just attendance.",
      },
      {
        title: "Clear partner surface area",
        description:
          "Tool access, event support, and shared content can be woven directly into the natural flow of the community.",
      },
    ],
  },
  programs: {
    eyebrow: "Event Formats",
    heading: "The community moves through a stack of formats that keep builders in motion.",
    description:
      "Each format serves a different need: focus, fast execution, public output, and peer feedback. Partnerships can plug into each format in a distinct way.",
    items: [
      {
        name: "Deep Work",
        rhythm: "A recurring focus session",
        format:
          "Participants set a clear goal for the day, work in uninterrupted blocks, and close with a short social wrap-up.",
        outcome:
          "Focused progress, shared accountability, and continuity across the community.",
        partnerValue:
          "A natural setting for product trials, credits, and lightweight builder enablement.",
      },
      {
        name: "Build Sprint",
        rhythm: "A higher-energy collaborative build format",
        format:
          "Builders come together, iterate quickly, and move closer to a real output through sessions, support, and shared momentum.",
        outcome:
          "Prototypes, MVP progress, demo moments, and stronger team bonds.",
        partnerValue:
          "A strong fit for event sponsorships, technical infrastructure, and integrations that make product usage visible.",
      },
      {
        name: "Ship Day",
        rhythm: "A one-day shipping cadence",
        format:
          "Participants declare what they will ship at the start and publish or demo it by the end of the day.",
        outcome:
          "A clear deadline, concrete output, and highly shareable build stories.",
        partnerValue:
          "Creates a visible moment for demo-day support, content collaborations, and brand presence around the act of shipping.",
      },
    ],
  },
  showcase: {
    eyebrow: "Project Landscape",
    heading:
      "The value you see in the community comes from the range of things people build, not from one single product category.",
    description:
      "Instead of a polished sponsor wall or a fake portfolio, this section reflects the kinds of work that repeatedly emerge inside Ankara Build Club. The goal is to show the character of the community, not stage-manage proof.",
    noteTitle: "Note",
    noteDescription:
      "These are curated examples of recurring output categories and shareable build surfaces, not a literal client list.",
    items: [
      {
        title: "AI tools and automation workflows",
        description:
          "Automations, workflow assistants, and experimental AI products that help small teams move faster.",
        outputs: ["MVP workflows", "internal tools", "experimental integrations"],
      },
      {
        title: "SaaS and operator products",
        description:
          "Dashboards, operational layers, and workflow products built to solve real problems in a narrow, practical way.",
        outputs: ["operator dashboards", "niche SaaS concepts", "service layers"],
      },
      {
        title: "Launch and growth experiments",
        description:
          "Tests centered on landing pages, positioning, onboarding, and early user feedback.",
        outputs: [
          "landing page iterations",
          "go-to-market experiments",
          "copy tests",
        ],
      },
      {
        title: "Community build outputs",
        description:
          "Demos shared at events, small features shipped in public, and collaborative feedback loops.",
        outputs: ["demo moments", "feedback rounds", "build-in-public updates"],
      },
    ],
  },
  partnership: {
    eyebrow: "Partnership Models",
    heading: "Partnerships work best when they fit the flow of the community.",
    description:
      "The strongest partnerships at Ankara Build Club are the ones that plug into the community rhythm and create direct value for builders. We prioritize real interaction and product use over surface-level branding.",
    models: [
      {
        title: "Event partnership",
        summary:
          "A visible partnership model built around supporting a specific Deep Work, Build Sprint, or Ship Day format.",
        fit:
          "Best for teams that want to show up in the room, engage the community directly, and be present in a relevant context.",
      },
      {
        title: "Builder enablement",
        summary:
          "A support model built around mentorship, office hours, education, or resources that help the community build better.",
        fit:
          "Best for partners who want to contribute expertise or process support, not just brand presence.",
      },
      {
        title: "Tools, credits, or infrastructure",
        summary:
          "A model focused on software, API credits, infrastructure, datasets, or tools builders can actually use.",
        fit:
          "Best for partners looking for deeper product adoption where their tool becomes part of the builder workflow.",
      },
      {
        title: "Content, reports, or community programs",
        summary:
          "A collaboration model for packaging observations, build stories, and community insights into content, reports, or special programs.",
        fit:
          "Best for organizations that want to understand, document, or amplify the build culture emerging in Ankara.",
      },
    ],
    contactFlow: [
      {
        step: "01",
        title: "Send a short intro",
        description:
          "Tell us what you want to support, which format interests you, and what kind of value you can bring to the community.",
      },
      {
        step: "02",
        title: "Alignment call",
        description:
          "We look together at whether there is a real fit between your goals, the event structure, and the pace of the community.",
      },
      {
        step: "03",
        title: "Custom partnership plan",
        description:
          "If there is a strong fit, we shape a clear plan covering scope, timing, visibility, and responsibilities.",
      },
    ],
    closingTitle:
      "If you want to build a meaningful partnership with Ankara Build Club, reach out.",
    closingDescription:
      "From events and content to infrastructure and builder enablement, we can shape the right collaboration together. A short intro email is the best place to start.",
    responseWindow: "We usually reply within 24 hours on weekdays",
  },
};
