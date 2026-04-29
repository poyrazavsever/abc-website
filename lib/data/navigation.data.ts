import type { NavigationData } from "@/lib/types/navigation";

export const navigationData: NavigationData = {
  brand: {
    label: "Ankara Build Club",
    href: "/",
    imgUrl: "/brand/logo.png",
    scrolledImgUrl: "/brand/logoblack.png",
    footerImgUrl: "/brand/logoblack.png",
  },
  items: [
    {
      id: "about",
      label: "Hakkımızda",
      href: "/",
    },
    {
      id: "events",
      label: "Etkinlikler",
      href: "/events",
    },
    {
      id: "community",
      label: "Topluluk",
      groups: [
        {
          title: "Genel Bakış",
          links: [
            {
              label: "Topluluk Yaklaşımı",
              href: "/",
              description:
                "Ankara Build Club'ın üretim ritmini, çalışma biçimini ve topluluk çerçevesini inceleyin.",
              icon: "lucide:building-2",
            },
            {
              label: "Katılım ve Üyelik",
              href: "/register",
              description:
                "Topluluğa katılım sürecini başlatın ve builder profilinizi oluşturun.",
              icon: "lucide:user-plus",
            },
          ],
        },
        {
          title: "Programlar",
          links: [
            {
              label: "Etkinlik Takvimi",
              href: "/events",
              description:
                "Deep Work, Sprint ve diğer topluluk buluşmalarının takvimini takip edin.",
              icon: "lucide:calendar-days",
            },
            {
              label: "Partnerlik ve Sponsorlar",
              href: "/sponsors",
              description:
                "Kurumsal iş birliği modeli, sponsor görünürlüğü ve iletişim akışını inceleyin.",
              icon: "lucide:briefcase-business",
            },
          ],
        },
      ],
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
