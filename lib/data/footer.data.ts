import type { FooterData } from "@/lib/types/footer";

const footerContactEmail = "ada.raimova@gmail.com";
const footerContactHref = `mailto:${footerContactEmail}`;

export const footerData: FooterData = {
  brand: {
    title: "Shipin",
    description:
      "A product and technology community based in Ankara. It brings builders, operators, and partners into the same ecosystem through events, collaboration, and product-building programs.",
  },
  sections: [
    {
      title: "Community",
      links: [
        { label: "Events", href: "/events" },
        { label: "Builder directory", href: "/builders" },
        { label: "Projects", href: "/projects" },
        { label: "Community guide", href: "/" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Build Sprint", href: "/events" },
        { label: "Mentorship", href: "/" },
        { label: "Builder matching", href: "/builders" },
        { label: "Badge program", href: "/profile" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Profile", href: "/profile" },
        { label: "Badges", href: "/profile" },
        { label: "LinkedIn card", href: "/profile" },
        { label: "Onboarding", href: "/onboarding/profile" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/#about" },
        { label: "Become a sponsor", href: "/sponsors" },
        { label: "Contact", href: footerContactHref },
        { label: "Press kit", href: "/" },
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
    title: "Partnerships and collaborations",
    email: footerContactEmail,
    location: "Ankara, Türkiye",
    cta: {
      label: "Email the partnerships team",
      href: footerContactHref,
    },
  },
  bottomLinks: [
    { label: "Contact", href: footerContactHref },
    { label: "Careers", href: "/" },
    { label: "Community rules", href: "/" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyright: "2026 Shipin. All rights reserved.",
};
