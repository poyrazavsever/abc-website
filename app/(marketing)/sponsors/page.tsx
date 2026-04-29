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
  title: "Sponsorlar ve Partnerlik",
  description:
    "Ankara Build Club sponsor ve partner sayfası. Topluluğun yapısını, etkinlik ritmini ve iş birliği yüzeylerini hızlıca inceleyin.",
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
    eyebrow: "İş birliği alanları",
    heading: "Birlikte daha güçlü partnerlikler kuruyoruz.",
    highlightPhrase: "daha güçlü",
    description:
      "Ankara Build Club ile anlamlı bir partnerlik başlatmak istiyorsanız bize yazın.",
    ctaLabel: "İletişime Geç",
    pills: [
      {
        label: "Teknoloji & API Partneri",
        icon: "cube",
        accent: "violet",
        offsetClassName: "md:-translate-y-7 md:rotate-[-6deg]",
      },
      {
        label: "Hackathon Destekçisi",
        icon: "calendar",
        accent: "pink",
        offsetClassName: "md:translate-x-12 md:translate-y-1 md:rotate-[4deg]",
      },
      {
        label: "Mentorluk",
        icon: "users",
        accent: "violet",
        offsetClassName: "md:translate-x-24 md:-translate-y-1 md:rotate-[5deg]",
      },
      {
        label: "Mekan Sponsoru",
        icon: "pin",
        accent: "pink",
        offsetClassName: "md:-translate-x-3 md:translate-y-4 md:rotate-[-4deg]",
      },
      {
        label: "Topluluk Kredileri",
        icon: "spark",
        accent: "violet",
        offsetClassName: "md:translate-x-16 md:translate-y-8 md:rotate-[3deg]",
      },
      {
        label: "İçerik & Lansman İş Birliği",
        icon: "launch",
        accent: "pink",
        offsetClassName: "md:translate-x-6 md:translate-y-10 md:rotate-[-5deg]",
      },
    ],
  };

  const communitySummary = {
    eyebrow: "Topluluk Özeti",
    heading: "Sayıların arkasında görünür bir build ritmi var.",
    description:
      "Networking değil, tekrar eden üretim anları. ABC sponsor için daha net temas, daha gerçek geri bildirim ve daha doğal görünürlük üretir.",
    proofTitles: [
      "Builder odağı",
      "Fiziksel tekrar",
      "Görünür üretim",
      "Doğal partner teması",
    ],
    stats: [
      {
        value: 5,
        suffix: "+",
        label: "Üretim disiplini",
        detail:
          "Kod, ürün, tasarım, growth ve operasyon aynı build zemininde buluşuyor.",
      },
      {
        value: programs.items.length,
        label: "Çekirdek format",
        detail:
          "Deep Work, Build Sprint ve Ship Day ritmi düzenli olarak taşınıyor.",
      },
      {
        value: collaborationSection.pills.length,
        label: "Partnerlik alanı",
        detail:
          "API, mekan, mentorluk ve içerik tarafında doğrudan topluluğa temas eden net iş birliği yüzeyleri var.",
      },
      {
        value: 4,
        label: "Topluluk katmanı",
        detail:
          "Odak, tekrar, görünürlük ve partner teması aynı akışta birlikte çalışıyor.",
      },
    ],
  };

  const programsSection = {
    heading: "Topluluğun ritmi, üretim formatlarıyla kurulur.",
    highlightPhrase: "üretim formatlarıyla",
    description:
      "Deep Work, Build Sprint ve Ship Day aynı topluluğu üç farklı enerji modunda sürekli çalıştırır.",
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
