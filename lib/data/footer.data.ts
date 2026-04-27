import {
  partnerContactEmail,
  partnerContactHref,
} from "@/lib/data/sponsors.data";
import type { FooterData } from "@/lib/types/footer";

export const footerData: FooterData = {
  brand: {
    title: "Ankara Build Club",
    description:
      "Ankara merkezli urun ve teknoloji toplulugu. Builderlari, operatorleri ve partnerleri ayni ekosistemde bulusturur; etkinlik, is birligi ve urun gelistirme programlari sunar.",
  },
  sections: [
    {
      title: "Topluluk",
      links: [
        { label: "Etkinlikler", href: "/events" },
        { label: "Builder Dizini", href: "/builders" },
        { label: "Projeler", href: "/projects" },
        { label: "Topluluk Rehberi", href: "/" },
      ],
    },
    {
      title: "Programlar",
      links: [
        { label: "Build Sprint", href: "/events" },
        { label: "Mentorluk", href: "/" },
        { label: "Builder Eslesmeleri", href: "/dashboard/matching" },
        { label: "Rozet Programi", href: "/dashboard/profile" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Profil", href: "/dashboard/profile" },
        { label: "Rozetler", href: "/dashboard/profile" },
        { label: "LinkedIn Karti", href: "/dashboard/linkedin-card" },
        { label: "Onboarding", href: "/onboarding/profile" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkimizda", href: "/" },
        { label: "Sponsor Ol", href: "/sponsors" },
        { label: "Iletisim", href: partnerContactHref },
        { label: "Basin Kiti", href: "/" },
      ],
    },
  ],
  socialLinks: [
    { label: "X", href: "https://x.com/ankarabuildclub", external: true },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/ankara-build-club",
      external: true,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/ankarabuildclub",
      external: true,
    },
    { label: "Luma", href: "https://lu.ma/ankarabuildclub", external: true },
  ],
  contact: {
    title: "Is Birligi ve Partnerlik",
    email: partnerContactEmail,
    location: "Ankara, Turkiye",
    responseWindow: "Hafta ici 24 saat icinde geri donus",
    cta: {
      label: "Partnerlik maili gonder",
      href: partnerContactHref,
    },
  },
  bottomLinks: [
    { label: "Iletisim", href: partnerContactHref },
    { label: "Kariyer", href: "/" },
    { label: "Topluluk Kurallari", href: "/" },
    { label: "Gizlilik", href: "/privacy" },
    { label: "Kullanim Kosullari", href: "/terms" },
  ],
  copyright: "2026 Ankara Build Club. Tum haklari saklidir.",
};
