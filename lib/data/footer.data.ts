import type { FooterData } from "@/lib/types/footer";

export const footerData: FooterData = {
  brand: {
    title: "Ankara Build Club",
    description:
      "Builder'lari bir araya getiren, urun odakli topluluk platformu.",
  },
  sections: [
    {
      title: "Topluluk",
      links: [
        { label: "Etkinlikler", href: "/events" },
        { label: "Builder Dizini", href: "/builders" },
        { label: "Projeler", href: "/projects" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Profil", href: "/dashboard/profile" },
        { label: "Rozetler", href: "/dashboard/profile" },
        { label: "Eslesmeler", href: "/dashboard/matching" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkimizda", href: "/" },
        { label: "Sponsorlar", href: "/sponsors" },
        { label: "Iletisim", href: "/contact" },
      ],
    },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "X", href: "https://x.com", external: true },
    { label: "Discord", href: "https://discord.com", external: true },
  ],
  bottomLinks: [
    { label: "Gizlilik", href: "/privacy" },
    { label: "Kullanim Kosullari", href: "/terms" },
  ],
  copyright: "2026 Ankara Build Club. Tum haklari saklidir.",
};
