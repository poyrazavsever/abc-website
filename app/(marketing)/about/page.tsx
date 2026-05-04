import type { Metadata } from "next";

import { AboutCommunity } from "@/components/marketing/about-community";
import { AboutHero } from "@/components/marketing/about-hero";
import { AboutMission } from "@/components/marketing/about-mission";
import { AboutTimeline } from "@/components/marketing/about-timeline";
import { AboutValues } from "@/components/marketing/about-values";

export const metadata: Metadata = {
  title: "Hakkımızda — Ship In",
  description:
    "Ship In, Ankara merkezli bir ürün ve teknoloji topluluğudur. Builder'ları, operatörleri ve partnerleri aynı ekosistemde buluşturur.",
};

export default function AboutPage() {
  const hero = {
    eyebrow: "Hakkımızda",
    title: "Fikirleri ürüne dönüştüren bir topluluk.",
    accentPhrase: "dönüştüren",
    description:
      "Ship In, Ankara merkezli bir ürün ve teknoloji topluluğudur. Builder'ları, operatörleri ve partnerleri aynı ekosistemde etkinlikler, iş birlikleri ve ürün geliştirme programlarıyla buluşturur.",
    primaryCtaLabel: "Topluluğa Katıl",
    primaryCtaHref: "/register",
    secondaryCtaLabel: "Builder'ları Keşfet",
    secondaryCtaHref: "/builders",
  };

  const mission = {
    eyebrow: "Misyonumuz",
    heading: "Birlikte inşa etmenin gücüne inanıyoruz.",
    accentPhrase: "inşa etmenin",
    description:
      "Ship In, yalnızca bir topluluk değil; birlikte üreten, öğrenen ve büyüyen bir ekosistem. Ankara'dan başlayarak builder'ları bir araya getiriyor, fikirlerini somut ürünlere dönüştürmeleri için zemin hazırlıyoruz.",
    imageSrc: "/about/mission.png",
    imageAlt: "Ship In topluluğu birlikte çalışırken",
    stats: [
      { value: "50+", label: "Aktif Builder" },
      { value: "20+", label: "Etkinlik" },
      { value: "3", label: "Program Formatı" },
    ],
  };

  const values = {
    eyebrow: "Temellerimiz",
    heading: "Temel Değerlerimiz",
    description:
      "Topluluğumuzun her kararına ve deneyimine yön veren ilkeler.",
    items: [
      {
        title: "Üretim",
        description:
          "Konuşmak değil, inşa etmek. Her buluşma somut bir çıktıya odaklanır ve birlikte üretme kültürünü besler.",
      },
      {
        title: "Topluluk",
        description:
          "Bireysel değil, birlikte büyüme. Bilgiyi ve deneyimi paylaşarak birbirimizi ileri taşıyoruz.",
      },
      {
        title: "Şeffaflık",
        description:
          "Süreçlerimiz, kararlarımız ve geri bildirimlerimiz her zaman açık. Güven şeffaflıkla kurulur.",
      },
      {
        title: "Süreklilik",
        description:
          "Tek seferlik değil, tekrar eden ritimlerle sürdürülebilir bir üretim kültürü kuruyoruz.",
      },
    ],
  };

  const community = {
    eyebrow: "Topluluk",
    heading: "Üretim odaklı bir topluluk deneyimi.",
    accentPhrase: "topluluk deneyimi",
    description:
      "Ship In etkinlikleri yalnızca networking değil; demo, ship, feedback ve build-in-public anları üretir. Her format farklı bir ihtiyaca hizmet eder.",
    imageSrc: "/about/community.png",
    imageAlt: "Ship In topluluk etkinliği",
    features: [
      {
        title: "Deep Work",
        description: "Kesintisiz odak seansları ile birlikte üretim.",
      },
      {
        title: "Build Sprint",
        description: "Yüksek enerjili, ekip bazlı hızlı iterasyonlar.",
      },
      {
        title: "Ship Day",
        description: "Gün sonunda somut çıktı ile teslim ritmi.",
      },
    ],
    ctaLabel: "Etkinlikleri Keşfet",
    ctaHref: "/events",
  };

  const timeline = {
    eyebrow: "Yolculuğumuz",
    heading: "Zaman Çizelgesi",
    description: "Topluluğumuzu şekillendiren önemli dönüm noktaları.",
    ctaLabel: "Topluluğa Katıl",
    ctaHref: "/register",
    milestones: [
      {
        year: "2024",
        title: "Kuruluş",
        description:
          "Ankara'da küçük bir builder grubuyla ilk Deep Work buluşması gerçekleşti.",
      },
      {
        year: "2025 Q1",
        title: "İlk Büyüme",
        description:
          "Düzenli etkinlikler, ilk Build Sprint ve topluluk platformunun lansmanı.",
      },
      {
        year: "2025 Q2",
        title: "Ship In",
        description:
          "Yeni isim, yeni vizyon. Topluluğun ölçeklenme ve genişleme dönemi başladı.",
      },
      {
        year: "2026",
        title: "Gelecek",
        description:
          "Yeni şehirler, yeni formatlar ve daha güçlü bir builder ağı hedefleniyor.",
      },
    ],
  };

  return (
    <div className="bg-background">
      <AboutHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        accentPhrase={hero.accentPhrase}
        description={hero.description}
        primaryCtaLabel={hero.primaryCtaLabel}
        primaryCtaHref={hero.primaryCtaHref}
        secondaryCtaLabel={hero.secondaryCtaLabel}
        secondaryCtaHref={hero.secondaryCtaHref}
      />

      <AboutMission
        eyebrow={mission.eyebrow}
        heading={mission.heading}
        accentPhrase={mission.accentPhrase}
        description={mission.description}
        imageSrc={mission.imageSrc}
        imageAlt={mission.imageAlt}
        stats={mission.stats}
      />

      <AboutValues
        eyebrow={values.eyebrow}
        heading={values.heading}
        description={values.description}
        values={values.items}
      />

      <AboutCommunity
        eyebrow={community.eyebrow}
        heading={community.heading}
        accentPhrase={community.accentPhrase}
        description={community.description}
        imageSrc={community.imageSrc}
        imageAlt={community.imageAlt}
        features={community.features}
        ctaLabel={community.ctaLabel}
        ctaHref={community.ctaHref}
      />

      <AboutTimeline
        eyebrow={timeline.eyebrow}
        heading={timeline.heading}
        description={timeline.description}
        ctaLabel={timeline.ctaLabel}
        ctaHref={timeline.ctaHref}
        milestones={timeline.milestones}
      />
    </div>
  );
}
