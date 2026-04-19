import type { NavigationData } from "@/lib/types/navigation";

export const navigationData: NavigationData = {
  brand: {
    label: "Ankara Build Club",
    href: "/",
    imgUrl: "",
  },
  items: [
    {
      id: "about",
      label: "Hakkinda",
      href: "/",
    },
    {
      id: "community",
      label: "Topluluk",
      groups: [
        {
          title: "Kesfet",
          links: [
            {
              label: "Etkinlikler",
              href: "/events",
              description: "Deep Work ve Build Sprint akisini takip et.",
              icon: "lucide:calendar-days",
            },
            {
              label: "Builder Dizini",
              href: "/builders",
              description: "Ankara'daki builder profillerini incele.",
              icon: "lucide:users",
            },
            {
              label: "Projeler",
              href: "/projects",
              description:
                "Toplulugun urunlerini ve build hikayelerini kesfet.",
              icon: "lucide:rocket",
            },
          ],
        },
        {
          title: "Platform",
          links: [
            {
              label: "Profilim",
              href: "/dashboard/profile",
              description:
                "Rozetlerini, etiketlerini ve katilim gecmisini yonet.",
              icon: "lucide:id-card",
            },
            {
              label: "Ciddi Builder Eslesmesi",
              href: "/dashboard/matching",
              description: "Basvuru yap, onay surecini ve eslesmelerini gor.",
              icon: "lucide:handshake",
            },
            {
              label: "LinkedIn Karti",
              href: "/dashboard/linkedin-card",
              description: "Tek tikla paylasima hazir kart ve post uret.",
              icon: "lucide:image",
            },
          ],
        },
      ],
      featured: {
        title: "Build with us",
        description:
          "Ankara Build Club yolculuguna katil. Etkinliklere dahil ol, builder agini genislet.",
        href: "/register",
        icon: "lucide:sparkles",
      },
    },
    {
      id: "sponsors",
      label: "Sponsorlar",
      href: "/sponsors",
    },
  ],
  cta: {
    label: "Topluluga Katil",
    href: "/register",
  },
};
