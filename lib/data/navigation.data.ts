import type { NavigationData } from "@/lib/types/navigation";

export const navigationData: NavigationData = {
  brand: {
    label: "Ankara Build Club",
    href: "/",
    imgUrl: "/brand/logo.png",
  },
  items: [
    {
      id: "about",
      label: "Hakkımızda",
      href: "/",
    },
    {
      id: "community",
      label: "Topluluk",
      groups: [
        {
          title: "Keşfet",
          links: [
            {
              label: "Etkinlikler",
              href: "/events",
              description: "Deep Work ve Build Sprint akışını takip et.",
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
                "Topluluğun ürünlerini ve build hikayelerini keşfet.",
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
                "Rozetlerini, etiketlerini ve katılım geçmişini yönet.",
              icon: "lucide:id-card",
            },
            {
              label: "Ciddi Builder Eşleşmesi",
              href: "/dashboard/matching",
              description: "Başvuru yap, onay sürecini ve eşleşmelerini gör.",
              icon: "lucide:handshake",
            },
            {
              label: "LinkedIn Kartı",
              href: "/dashboard/linkedin-card",
              description: "Tek tıkla paylaşıma hazır kart ve post üret.",
              icon: "lucide:image",
            },
          ],
        },
      ],
      featured: {
        title: "Build with us",
        description:
          "Ankara Build Club yolculuğuna katıl. Etkinliklere dahil ol, builder ağını genişlet.",
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
  auth: {
    loginLabel: "Giriş Yap",
    loginHref: "/login",
    registerLabel: "Kayıt Ol",
    registerHref: "/register",
    profileLabel: "Profilim",
    logoutLabel: "Çıkış Yap",
  },
  cta: {
    label: "Topluluğa Katıl",
    href: "/register",
  },
};
